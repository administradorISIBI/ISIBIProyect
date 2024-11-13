from fastapi import APIRouter, HTTPException, Header, Depends
from app.database import obtener_credenciales
from app.models import SearchCreate
from app.utils.auth import validate_token
from fastapi.encoders import jsonable_encoder
import pytz
from datetime import datetime
from bson import ObjectId


router = APIRouter(prefix="/search")

def transformar_documento(documento):
    documento["_id"] = str(documento["_id"])
    return documento

@router.post("")
def searchCreate(request: SearchCreate, db=Depends(obtener_credenciales)):
    timezone = pytz.timezone("America/Bogota") 
    request.dateCreated = request.dateCreated or datetime.now(timezone)
    
    record = {
        "email": request.email,
        "catalogs": request.catalogs,
        "params": request.params,
        "dateCreated": request.dateCreated,
        "advanced": request.advanced,
        "status": request.status
    }
    
    # Insertar en la base de datos
    result = db['Searchs'].insert_one(record)
    record["_id"] = str(result.inserted_id)  
    record.pop("_id", None)
    
    return record

@router.get("/{email}")
def searchSearchs(email: str, authorization: str = Header(None), db=Depends(obtener_credenciales)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    token = authorization.split(" ")[1]  # Extraer el token
    result= validate_token(token)

    if result.get("active"):
        searchs_collection = db.Searchs
        resultados = searchs_collection.find({"email": email, "status": True})
        resultados_list = [transformar_documento(doc) for doc in resultados] 
        return {"success": True, "message": "Búsquedas cargadas satisfactoriamente", "results": resultados_list}
        
    else:
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")


@router.put("/delete/{_id}")
def deleteSearch(_id: str, authorization: str = Header(None), db=Depends(obtener_credenciales)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    token = authorization.split(" ")[1] 
    result = validate_token(token)

    if result.get("active"):
        searchs_collection = db.Searchs
        if not ObjectId.is_valid(_id):
            raise HTTPException(status_code=400, detail="ID inválido")
        
        update_result = searchs_collection.update_one(
            {"_id": ObjectId(_id)},
            {"$set": {"status": False}}
        )

        if update_result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Búsqueda no encontrada")

        return {"success": True, "message": "Búsqueda eliminada satisfactoriamente"}

    else:
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

@router.put("/deleteall/{email}")
def deleteSearchesByEmail(email: str, authorization: str = Header(None), db=Depends(obtener_credenciales)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    token = authorization.split(" ")[1] 
    result = validate_token(token)

    if result.get("active"):
        searchs_collection = db.Searchs

        update_result = searchs_collection.update_many(
            {"email": email},
            {"$set": {"status": False}}
        )

        if update_result.matched_count == 0:
            raise HTTPException(status_code=404, detail="No se encontraron búsquedas para el email proporcionado")

        return {
            "success": True,
            "message": f"{update_result.modified_count} búsqueda(s) eliminada(s) satisfactoriamente"
        }

    else:
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")
