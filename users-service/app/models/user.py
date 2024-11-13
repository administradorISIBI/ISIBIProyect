from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    dateCreated: Optional[datetime] = None
    dateModified: Optional[datetime] = None
    role: str = "user"
    status: bool = True

class UserUpdate(BaseModel):
    username: Optional[str]
    email: Optional[EmailStr]
    role: Optional[str]  
    
class UserResponse(BaseModel):
    success: bool
    email: str
    username: str
    rol: str
    token: str
    message: str
    
class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    username: str
    email: str
    role: str
    status: bool