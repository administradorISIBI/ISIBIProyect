from fastapi import APIRouter, HTTPException, Header
import httpx
import os

router = APIRouter()

@router.post("/login")
async def login(cred: dict):
    async with httpx.AsyncClient() as client:
        response = await client.post(f'{os.getenv("USERS_SERVICE")}/login', json=cred)
        response.raise_for_status()
        return response.json()
