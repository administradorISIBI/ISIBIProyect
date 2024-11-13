from datetime import datetime
from app.db.database import get_db
from app.models.user import UserCreate, UserUpdate
from fastapi import HTTPException
from app.security.verifications import verify_password, create_access_token, hash_password, verify_access_token

# Función para registrar un nuevo usuario


def register_new_user(user: UserCreate):
    db = get_db()

    # Verificar si el usuario o email ya existen
    if db['Users'].find_one({"$or": [{"username": user.username}, {"email": user.email}]}):
        # raise ValueError("El nombre de usuario o el correo electrónico ya existen.")
        return {"message": "El nombre de usuario o el correo electrónico ya están registrados.", "success": False}
    
    # Crear el nuevo usuario
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hash_password(user.password),
        "dateCreated": datetime.utcnow().strftime("%d/%m/%Y"),
        "dateModified": datetime.utcnow().strftime("%d/%m/%Y"),
        "role": "user",
        "status": True
    }

    # Insertar en la base de datos
    db['Users'].insert_one(new_user)
    return {"message": "Usuario registrado exitosamente", "success": True}


def authenticate_user(email: str, password: str):
    db = get_db()
    # print("******************** Encontrado usuario ********************")
    user = db["Users"].find_one({"email": email})
    # print("email", user["email"], " password: ",user["password"], user["username"])
    # print("contraseña recibida: ", password)
    if not user:
        # raise HTTPException(status_code=400, detail="Usuario no encontrado")
        return {"success": False, "email": "", "username": "", "rol": "", "token": "", "message": "Usuario no encontrado"}
    if not verify_password(password, user["password"]):
        # raise HTTPException(status_code=400, detail="Contraseña incorrecta")
        return {"success": False, "email": "", "username": "", "rol": "", "token": "", "message": "Contraseña incorrecta"}
    # Crear un token JWT
    access_token = create_access_token(data={"sub": user["email"]})
    return {"success": True, "email": user["email"], "username": user["username"], "rol": user["role"], "token": access_token, "message": "Sesión iniciada"}

# Función para obtener todos los usuarios


def get_all_users():
    db = get_db()
    users = list(db['Users'].find({}, {"_id": 0, "password": 0}))
    return users

# Función para obtener un usuario por email


def get_user_by_email(email: str):
    db = get_db()
    user = db['Users'].find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")
    return user

# Función para actualizar un usuario


def update_user(email: str, user_data: UserUpdate):
    db = get_db()
    user = db['Users'].find_one({"email": email})

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    # Actualizar los campos del usuario
    update_fields = {key: value for key, value in user_data.dict().items() if value is not None}
    db['Users'].update_one({"email": email}, {"$set": update_fields})

    return {**user, **update_fields}

def is_user_session_active(token: str) -> bool:
    return verify_access_token(token) is not None