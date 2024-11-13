from fastapi import APIRouter, HTTPException, Depends
from app.database import obtener_credenciales
from app.models import URLRequest, URLRequestFullPrimo, URLRequestAdvanced
from urllib.parse import quote

router = APIRouter(prefix="/create-url")

@router.post("")
def getUrl(request: URLRequest, db=Depends(obtener_credenciales)):
    print(request.university_name)
    university_name = request.university_name
    search_param = request.search_param

    universities_collection = db.Universities
    university = universities_collection.find_one({"nombre": university_name})
    if not university:
        raise HTTPException(status_code=404, detail="University not found")
    print(university)

    catalog_type = university.get('catalog_system')
    print(catalog_type)

    if not catalog_type:
        raise HTTPException(
            status_code=404, detail="Este catalog no especificó su tipo")

    catalog = db.Catalogs.find_one({"nombre": catalog_type})

    print(catalog)

    # Aquí entra el programador
    if catalog_type == 'koha':
        base_url = university.get('url')
        if not base_url:
            raise HTTPException(
                status_code=404, detail="Este catalogo no especificó su url de búsqueda")

        encoded_search_param = quote(search_param)

        # if 'advqueryparams' not in catalog or 'searchtemplate' not in catalog:
        #     return None

        # query_params = catalog['advqueryparams'].replace(
        #     '{PARAMETRO}', encoded_search_param)
        # search_template = catalog['searchtemplate'].replace(
        #     '{QUERY_PARAMS}', query_params)
        search_template=  catalog['basicSearchTemplate'].replace('{QUERY_PARAMS}', encoded_search_param)
        return f"{base_url}{search_template}"
    #versión 1
    if catalog_type == "PRIMO":
        encoded_search_param = quote(search_param)
        base_url = university.get('url')
        instCode = university.get('instCode')
        vidCode = university.get('vidCode')
        search_template = catalog['searchtemplate'].format(
            QUERY_PARAMS=encoded_search_param,
            instCode=instCode,
            vidCode=vidCode
        )
        return f"{base_url}{search_template}"
    #versión 2
    # if catalog_type == "PRIMO":
    #     base_url = university.get('url')
    #     if not base_url:
    #         raise HTTPException(
    #             status_code=404, detail="Este catalogo no especificó su url de búsqueda")
            
    #     encoded_search_param = quote(search_param)
    #     search_template = catalog['searchtemplate'].replace(
    #         '{QUERY_PARAMS}', encoded_search_param)
        # return f"{base_url}{search_template}"
    else:
        base_url = university.get('url')
        return f"{base_url}"
    
@router.post("/adv-url")
def build_advanced_search_url(request: URLRequestAdvanced, db=Depends(obtener_credenciales)):
    university_name = request.catalog
    universities_collection = db.Universities
    university = universities_collection.find_one({"nombre": university_name})
    
    if not university:
        raise HTTPException(status_code=404, detail="University not found")
    
    catalog_type = university.get('catalog_system')
    if not catalog_type:
        raise HTTPException(status_code=404, detail="Este catálogo no especificó su tipo")
    
    catalog = db.Catalogs.find_one({"nombre": catalog_type})
    
    if catalog_type != "koha":
        raise HTTPException(status_code=400, detail="Solo se soporta el tipo de catálogo 'koha' por ahora")
    
    base_url = university.get("url", "")
    url = f"{base_url}"

    url += catalog.get("advqueryparamstemplate", "")

    date_range = request.params.get("dateRange", {})
    start = date_range.get("start")
    end = date_range.get("end")
    
    if start or end:
        year_range = f"limit-yr={start or ''}-{end or ''}"
        url += f"&{year_range}"
    
    search_params = request.params.get("params", [])
    if search_params:
        idx_param = catalog["advqueryparams"].get("idx", "idx=kw")
        query_param = catalog["advqueryparams"].get("query", "q={QUERY_PARAM}")
        logic_operator_param = catalog["advqueryparams"].get("logicOperator", "op={LOGICOPERATOR}")

        search_query = f"{idx_param}&{query_param.format(QUERY_PARAM=quote(search_params[0]))}"

        for i in range(1, len(search_params), 2):
            operator = search_params[i]
            next_term = search_params[i + 1]

            encoded_operator = quote(operator)
            encoded_term = quote(next_term)

            search_query += f"&{logic_operator_param.format(LOGICOPERATOR=encoded_operator)}&{idx_param}&{query_param.format(QUERY_PARAM=encoded_term)}"
        
        url += f"&{search_query}"
    
    sort_order = request.params.get("sortOrder")
    if sort_order:
        sort_by_param = catalog["filters"]["sort_by"].get(sort_order, "relevance")
        
        relevance_param = catalog["advqueryparams"]["relevance"].replace("{ORDER_BY}", quote(sort_by_param))
        
        url += f"&{relevance_param}"

    # Todavía no está implementado
    language = request.params.get("language")
    if language:
        language_param = catalog["filters"]["idiom"].get(language.lower())
        if language_param:
            url += f"&{language_param}"
    
    return url

@router.post("/primo")
def getUrlPrimo(request: URLRequestFullPrimo, db=Depends(obtener_credenciales)):
    university_name = request.university_name
    search_param = request.search_param
    record_id= request.recordid
    universities_collection = db.Universities
    university = universities_collection.find_one({"nombre": university_name})
    
    if not university:
        raise HTTPException(status_code=404, detail="University not found")
    
    catalog_type = university.get('catalog_system')
    
    if not catalog_type:
        raise HTTPException(
            status_code=404, detail="Este catalogo no especificó su tipo")
        
    catalog = db.Catalogs.find_one({"nombre": catalog_type})
    print(catalog)
    encoded_search_param = quote(search_param)
    base_url = university.get('URLFullDisplay')
    vidCode = university.get('vidCode')
    search_template = catalog['URLFullDisplayTemplate'].format(
        QUERY_PARAMS=encoded_search_param,
        vidCode=vidCode,
        recordid=record_id
    )
    return (f"{base_url}{search_template}")