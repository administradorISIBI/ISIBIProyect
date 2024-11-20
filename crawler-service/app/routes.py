# app/routes.py

from fastapi import APIRouter, HTTPException
from app.models import CrawlRequest
from app.services.kohaService import crawl_resources
from app.services.abcService import crawl_resources_abc
from app.services.primoService import crawl_resources_primo

router = APIRouter()

@router.post("/crawl/")
def crawl(request: CrawlRequest):
    catalog_system= request.catalog_system
    #print(catalog_system)
    if(catalog_system == 'koha'):
        return crawl_resources(request)
    if(catalog_system =='ABC'):
        #print("************************ Sistema Catalogo ABC************************")
        #print(catalog_system)
        return crawl_resources_abc(request)
    if(catalog_system =='PRIMO'):
        #print("************************ Sistema Catalogo Primo************************")
        #debe ser await para que pueda funcionar
        #si se agrega el await relentiza las otras consultas
        return  crawl_resources_primo(request)
    else:
        #print("************************ Sistema Catalogo no implementado************************")
        return {"error": "Sistema de catalos no implementado aún", "catalog_system": catalog_system}
