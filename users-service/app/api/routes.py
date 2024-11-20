from fastapi import APIRouter, HTTPException,Depends
from app.models.user import UserCreate, UserResponse, UserLogin,User,UserUpdate
from app.services.user_service import register_new_user, authenticate_user,get_all_users, get_user_by_email,update_user, is_user_session_active
from app.security.verifications import get_current_user, oauth2_scheme
from app.db.database import get_db
from pymongo.database import Database

router = APIRouter()

# Ruta para registrar un nuevo usuario
@router.post("/register")
def register_user(user: UserCreate):
    try:
        return register_new_user(user)
        # return {"message": "Usuario registrado exitosamente."}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/login", response_model=UserResponse)
def login_user(form_data: UserLogin):
    try:
        return authenticate_user(form_data.email, form_data.password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/users", response_model=list[User])
def get_users(current_user: dict = Depends(get_current_user), db: Database = Depends(get_db)):
    # print("******************** Current user ********************")
    # print(current_user)
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="No tienes permisos para acceder a este recurso.")
    try:
        return get_all_users()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/users/{email}", response_model=User)
def get_user(email: str, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="No tienes permisos para acceder a este recurso.")
    try:
        return get_user_by_email(email)
    except HTTPException as e:
        raise e
    
@router.put("/users/{email}", response_model=User)
def update_user_data(email: str, user_data: UserUpdate, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="No tienes permisos para acceder a este recurso.")
    try:
        return update_user(email, user_data)
    except HTTPException as e:
        raise e

@router.get("/session/active")
def check_session_active(authorization: str = Depends(oauth2_scheme)):
    # print("*****************Barer*****************")
    # print(authorization)
    is_active = is_user_session_active(authorization)
    return {"active": is_active}