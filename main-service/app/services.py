from typing import Dict, Any, Optional
import httpx
from app.repositories import config_repo
from urllib.parse import quote
from fastapi import HTTPException
import os

def build_search_url(university_name: str, search_param: str) -> Optional[str]:
    university = config_repo.get_university(university_name)
    if not university:
        return None

    catalog_type = university.get('catalog_system')
    catalog = config_repo.get_catalog(catalog_type)
    
    if not catalog:
        return None

    base_url = university.get('url')
    if not base_url:
        return None

    encoded_search_param = quote(search_param)

    if 'advqueryparams' not in catalog or 'searchtemplate' not in catalog:
        return None

    query_params = catalog['advqueryparams'].replace('{PARAMETRO}', encoded_search_param)
    search_template = catalog['searchtemplate'].replace('{QUERY_PARAMS}', query_params)

    return f"{base_url}{search_template}"

async def search_university(university_name: str, params, advanced: bool) -> Dict[str, Any]:
    #print(params)
    #print("Request********************", university_name, params, advanced)
    
    search_param = params.get("searchParam") if params else None
    if not search_param:
        raise HTTPException(status_code=400, detail="Missing 'search_param' in parameters")
    if not advanced:
        # if not isinstance(search_param, str):
        #     raise HTTPException(status_code=400, detail="'search_param' must be a string")

        #print("university_name*******************************",university_name)
        async with httpx.AsyncClient(timeout=httpx.Timeout(60, connect=60)) as client:
            
            try:
                response = await client.post(
                    f'{os.getenv("CATALOG_SERVICE")}/create-url', 
                    json={
                        "university_name": university_name,
                        "search_param": " ".join(search_param)
                    }
                )
                response.raise_for_status()
                try:
                    search_url = response.json()
                except ValueError:
                    raise HTTPException(status_code=500, detail="Invalid JSON response")
            except httpx.RequestError as e:
                raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
            except httpx.HTTPStatusError as e:
                raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error occurred: {e.response.text}")
    else: 
        #print("************************ADvanced url", f'{os.getenv("CATALOG_SERVICE")}/create-url/adv-url')
        async with httpx.AsyncClient(timeout=httpx.Timeout(60, connect=60)) as client:
            try:
                response = await client.post(
                    f'{os.getenv("CATALOG_SERVICE")}/create-url/adv-url', 
                    json={
                        "catalog": university_name,
                        "params": params,
                    }
                )
                response.raise_for_status()
                try:
                    search_url = response.json()
                except ValueError:
                    raise HTTPException(status_code=500, detail="Invalid JSON response")
            except httpx.RequestError as e:
                raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
            except httpx.HTTPStatusError as e:
                raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error occurred: {e.response.text}")
    if not search_url:
        raise HTTPException(status_code=400, detail="Can't build URL for this catalog")

    university = config_repo.get_university(university_name)
    #print("************************URL a Crawling ", search_url)
    # Obtener la el crawling.
    async with httpx.AsyncClient(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response = await client.post(
                f'{os.getenv("CRAWLER_SERVICE")}/crawl/', 
                json={
                    "url": search_url, 
                    "university_name": university_name, 
                    'catalog_system': university.get('catalog_system'),
                    "search_param": search_param
                }
            )
            response.raise_for_status()
            try:
                return {"university": university_name, "data": response.json()}
            except ValueError:
                raise HTTPException(status_code=500, detail="Invalid JSON response")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"In petition to Crawler from Main HTTP error occurred: {e.response.text}")
