from fastapi import APIRouter, HTTPException, Header, Depends
from app.database import obtener_credenciales
from app.models import SearchCreate
from app.utils.auth import validate_token
from fastapi.encoders import jsonable_encoder
import pytz
from datetime import datetime
from bson import ObjectId


router = APIRouter(prefix="/catalogs-systems")

def transformar_documento(documento):
    documento["_id"] = str(documento["_id"])
    return documento

@router.get("")
def getCatalogsSystems( db=Depends(obtener_credenciales)):
    catalosgs_systems_Coleccion= db.Catalogs
    
    catalogs_systems=catalosgs_systems_Coleccion.find({"status": True})
    
    resultados_list = [transformar_documento(doc) for doc in catalogs_systems]
    print(resultados_list)
    return {"success": True, "message": "Sistemas de catálogos cargados satisfactoriamente", "results": resultados_list}