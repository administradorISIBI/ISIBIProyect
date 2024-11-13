from fastapi import APIRouter, HTTPException, Depends
from app.database import obtener_credenciales
from app.models import CatalogCreate
from fastapi.encoders import jsonable_encoder

router = APIRouter(prefix="/universities")


def transformar_documento(documento):
    documento["_id"] = str(documento["_id"])
    return documento


@router.get("")
def get_universities(db=Depends(obtener_credenciales)):
    try:
        universities_collection = db.Universities
        universities = universities_collection.find().sort("large_name", 1)
        universities_list = []

        for university in universities:
            university["_id"] = str(university["_id"])
            universities_list.append(university)

        return universities_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("")
def create_university(university: CatalogCreate, db=Depends(obtener_credenciales)):
    try:
        universities_collection = db.Universities

        # Verificar si ya existe una universidad con el mismo nombre
        if universities_collection.find_one({"nombre": university.nombre}):
            return {"message": "El Nombre de este catálogo ya está en uso", "success": False}

        # Convertir el objeto Pydantic a un diccionario
        new_university = university.dict(by_alias=True)

        # Insertar en la base de datos
        result = universities_collection.insert_one(new_university)

        # Obtener el documento recién insertado usando el `inserted_id`
        inserted_catalog = universities_collection.find_one(
            {"_id": result.inserted_id})

        # Convertir el documento de MongoDB a un diccionario y eliminar el campo "_id" si no quieres retornarlo
        if inserted_catalog:
            inserted_catalog["_id"] = str(inserted_catalog["_id"])

        return {
            "message": "Catálogo registrado exitosamente",
            "success": True,
            "result": inserted_catalog
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{university_name}")
def update_university(university_name: str, university: CatalogCreate, db=Depends(obtener_credenciales)):
    try:
        universities_collection: Collection = db.Universities

        # Convertir el objeto Pydantic a un diccionario
        updated_university = university.dict(by_alias=True)

        # Actualizar la universidad y devolver el documento actualizado
        updated_document = universities_collection.find_one_and_update(
            {"nombre": university_name},
            {"$set": updated_university},
            return_document=True  # Devuelve el documento actualizado
        )

        # Verificar si se encontró y actualizó un documento
        if updated_document is None:
            return {"message": f"El catálogo {university_name} no se encuentra registrado aún", "success": False}

        # Convertir ObjectId a string antes de devolver el documento
        updated_document["_id"] = str(updated_document["_id"])

        return {
            "message": f"Catálogo actualizado correctamente.",
            "success": True,
            "catalog": updated_document
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/{university_name}")
def partial_update_university(university_name: str, university: dict, db=Depends(obtener_credenciales)):
    try:
        universities_collection = db.Universities

        # Actualizar solo los campos proporcionados de la universidad
        result = universities_collection.update_one(
            {"nombre": university_name},
            {"$set": university}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="University not found")

        # Obtener el objeto actualizado
        updated_university = universities_collection.find_one(
            {"nombre": university_name})

        if updated_university is None:
            raise HTTPException(
                status_code=404, detail="University not found after update")

        # Convertir ObjectId a string para evitar problemas de serialización
        updated_university["_id"] = str(updated_university["_id"])

        # Retornar el objeto actualizado
        return jsonable_encoder(updated_university)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{university_name}")
def get_university(university_name: str, db=Depends(obtener_credenciales)):
    try:
        universities_collection = db.Universities

        # Buscar universidad por nombre
        university = universities_collection.find_one(
            {"nombre": university_name})
        if not university:
            raise HTTPException(status_code=404, detail="University not found")

        university["_id"] = str(university["_id"])
        return university
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
