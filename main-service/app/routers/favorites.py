from fastapi import APIRouter, HTTPException, Header
import httpx
import os

router = APIRouter()

@router.post("/")
def create_favorite(body: dict, authorization: str = Header(None)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")
    token = authorization.split(" ")[1]
    with httpx.Client() as client:
        response = client.post(
            f'{os.getenv("CATALOG_SERVICE")}/favorite', 
            json=body, 
            headers={"Authorization": f"Bearer {token}"}
        )
        response.raise_for_status()
        return response.json()

@router.get("/favorite/{email}")
def getFavorites(email: str , authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")
    
    token = authorization.split(" ")[1] 
    with httpx.Client(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response = client.get(
                f'{os.getenv("CATALOG_SERVICE")}/favorite/{email}', 
                headers={"Authorization": f"Bearer {token}"}  
            )
            response.raise_for_status()
            try:
                return response.json()
            except ValueError:
                return {"error": "Invalid JSON response"}
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=e.response.text)

