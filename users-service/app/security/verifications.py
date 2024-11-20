# app/core/security.py

from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
import os
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, Depends
from app.db.database import get_db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "DiegoPapi69")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Función para hashear contraseñas
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Función para verificar contraseñas
def verify_password(plain_password: str, hashed_password: str) -> bool:
    var=pwd_context.verify(plain_password, hashed_password)
    # print("******************",var)
    return var

# Función para crear un token JWT
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Función para verificar el token JWT
def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None
    
#Funcion para crear el Token JWT
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
def get_current_user(token: str = Depends(oauth2_scheme)):
    username = verify_access_token(token)
    if username is None:
        raise HTTPException(
            status_code=401,
            detail="Credenciales de usuario no válidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    db = get_db()
    user = db["Users"].find_one({"email": username})
    if user is None:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")

    return user  