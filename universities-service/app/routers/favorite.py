from fastapi import APIRouter, HTTPException, Header, Depends
from app.database import obtener_credenciales
from app.models import FavoriteCreate
from app.utils.auth import validate_token
import pytz
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/favorite")

def transformar_documento(documento):
    documento["_id"] = str(documento["_id"])
    return documento

@router.post("")
def favoriteCreate(request: FavoriteCreate, authorization: str = Header(None), db=Depends(obtener_credenciales)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")
    
    timezone = pytz.timezone("America/Bogota") 
    request.dateCreated = request.dateCreated or datetime.now(timezone)
    
    token = authorization.split(" ")[1] 
    result= validate_token(token)

    record = {
        "email": request.email,
        "resource": request.resource,
        "imagen": request.imagen,
        "nombre": request.nombre,
        "large_name": request.large_name,
        "dateCreated": request.dateCreated,
        "status": request.status
    }
    
    # Insertar en la base de datos
    result = db['Favorites'].insert_one(record)
    record["_id"] = str(result.inserted_id)  
    record.pop("_id", None)
    
    return record

@router.get("/{email}")
def getFavorites(email: str, authorization: str = Header(None), db=Depends(obtener_credenciales)):
    # print("*****************Barer*****************")
    # print(authorization)
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Bearer no fount ")

    token = authorization.split(" ")[1]  
    result = validate_token(token)
    # print("*****************result*****************")
    # print(result)
    if result.get("active"):
        favorites_collection = db['Favorites']
        
        favorites = favorites_collection.find({"email": email, "status": True})
        favorites_list = [transformar_documento(doc) for doc in favorites]  

        return {
            "success": True,
            "message": "Favoritos cargados satisfactoriamente",
            "results": favorites_list
        }
    else:
        raise HTTPException(status_code=401, detail="Favorite: Token Expired")

@router.put("/{_id}")
def disable_favorite(
    _id: str, 
    authorization: str = Header(None), 
    db=Depends(obtener_credenciales)
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")
    
    token = authorization.split(" ")[1]
    result = validate_token(token)

    if not result.get("active"):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    favorites_collection = db['Favorites']

    try:
        favorite_id = ObjectId(_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    update_result = favorites_collection.update_one(
        {"_id": favorite_id},
        {"$set": {"status": False}}
    )

    if update_result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Favorite not found")

    return {
        "success": True,
        "message": "Favorite status updated to false"
    }