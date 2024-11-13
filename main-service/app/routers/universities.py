from fastapi import APIRouter, HTTPException
from app.repositories.config_repo import get_all_universities

router = APIRouter()

@router.get("/")
def get_universities():
    return get_all_universities()
