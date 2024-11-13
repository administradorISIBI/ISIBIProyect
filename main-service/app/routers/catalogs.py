from fastapi import APIRouter
import httpx
import os

router = APIRouter()

@router.get("/systems")
def get_catalogs_systems():
    with httpx.Client() as client:
        response = client.get(f'{os.getenv("CATALOG_SERVICE")}/catalogs-systems')
        response.raise_for_status()
        return response.json()
