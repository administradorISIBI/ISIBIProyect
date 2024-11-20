from fastapi import APIRouter,Header, HTTPException
import httpx
from app.models import SearchRequest, URLRequest
from app.services import search_university, build_search_url
import asyncio
from fastapi.responses import StreamingResponse
import json
from app.repositories import config_repo
import os

from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.post("/search-url")
async def get_search_url(request: URLRequest):
    search_url = build_search_url(request.university_name, request.search_param)
    if not search_url:
        raise HTTPException(status_code=404, detail="University not found")
    return {"search_url": search_url}

@router.post("/search-and-crawl")
async def search_and_crawl(request: SearchRequest):
    print(f"**************> ",request.params)
    return await search_university( request.catalog, request.params, request.advanced)
    async def result_streamer():
        tasks = [search_university(university, request.search_param) for university in request.universities]
        
        for task in asyncio.as_completed(tasks):
            result = await task
            
            if "error" in result:
                yield json.dumps({"university": result["university"], "error": result["error"]}) + "\n"
            else:
                yield json.dumps(result) + "\n"

    return StreamingResponse(result_streamer(), media_type="application/json")

@router.get("/universities")
def getUniversities():
    return config_repo.get_all_universities()

@router.get("/systcatalogs")
def getCatalogs():
    return config_repo.get_all_catalogs()

@router.patch("/universities/{university_name}")
async def updateCatalog(university_name: str, university: dict):
    async with httpx.AsyncClient(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response = await client.patch(
                f'{os.getenv("CATALOG_SERVICE")}/universities/'+university_name, 
                json=university
            )
            response.raise_for_status()
            try:
                return response.json()
            except ValueError:
                raise HTTPException(status_code=500, detail="Invalid JSON response")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error occurred: {e.response.text}")

@router.post("/login")
async def updateCatalog(cred: dict):
    async with httpx.AsyncClient(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response = await client.post(
                f'{os.getenv("USERS_SERVICE")}/login', 
                json=cred
            )
            response.raise_for_status()
            try:
                return response.json()
            except ValueError:
                raise HTTPException(status_code=500, detail="Invalid JSON response")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error occurred: {e.response.text}")
        
@router.post("/register")
async def updateCatalog(body: dict):
    async with httpx.AsyncClient(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response = await client.post(
                f'{os.getenv("USERS_SERVICE")}/register', 
                json=body
            )
            response.raise_for_status()
            try:
                return response.json()
            except ValueError:
                raise HTTPException(status_code=500, detail="Invalid JSON response")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error occurred: {e.response.text}")

@router.post("/search")
async def createSearch(body: dict):
    async with httpx.AsyncClient(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response = await client.post(
                f'{os.getenv("CATALOG_SERVICE")}/search', 
                json=body
            )
            response.raise_for_status()
            try:
                return response.json()
            except ValueError:
                raise HTTPException(status_code=500, detail="Invalid JSON response")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error occurred: {e.response.text}")

@router.get("/users")
async def getUsers(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    token = authorization.split(" ")[1]  # Extraer el token

    async with httpx.AsyncClient(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response = await client.get(
                f'{os.getenv("USERS_SERVICE")}/users',
                headers={"Authorization": f"Bearer {token}"}  
            )
            response.raise_for_status()  
            
            try:
                return response.json()
            except ValueError:
                raise HTTPException(status_code=500, detail="Invalid JSON response")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error occurred: {e.response.text}")
        
@router.put("/users/{email}")
async def getUniversities( body: dict, email: str, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    token = authorization.split(" ")[1]  # Extraer el token
    
    async with httpx.AsyncClient(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response = await client.put(
                f'{os.getenv("USERS_SERVICE")}/users/{email}',
                headers={"Authorization": f"Bearer {token}"},
                json=body
            )
            response.raise_for_status()  
            
            try:
                return response.json()
            except ValueError:
                raise HTTPException(status_code=500, detail="Invalid JSON response")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Main: An error occurred: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Main: HTTP error occurred: {e.response.text}")
    

@router.get("/search/{email}")
def getSearchs(email: str, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    token = authorization.split(" ")[1] 
    with httpx.Client(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response =  client.get(
                f'{os.getenv("CATALOG_SERVICE")}/search/{email}',
                headers={"Authorization": f"Bearer {token}"}  
            )
            response.raise_for_status()  
            
            try:
                return response.json()
            except ValueError:
                raise HTTPException(status_code=500, detail="Invalid JSON response")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error occurred: {e.response.text}")
        
@router.put("/search/delete/{_id}")
def deleteSearch(_id: str, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    token = authorization.split(" ")[1] 
    with httpx.Client(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response =  client.put(
                f'{os.getenv("CATALOG_SERVICE")}/search/delete/{_id}',
                headers={"Authorization": f"Bearer {token}"}  
            )
            response.raise_for_status()  
            
            try:
                return response.json()
            except ValueError:
                raise HTTPException(status_code=500, detail="Invalid JSON response")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error occurred: {e.response.text}")
        
@router.put("/search/deleteall/{email}")
def deleteSearch(email: str, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    token = authorization.split(" ")[1] 
    with httpx.Client(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response =  client.put(
                f'{os.getenv("CATALOG_SERVICE")}/search/deleteall/{email}',
                headers={"Authorization": f"Bearer {token}"}  
            )
            response.raise_for_status()  
            
            try:
                return response.json()
            except ValueError:
                raise HTTPException(status_code=500, detail="Invalid JSON response")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error occurred: {e.response.text}")

@router.post("/favorite")
def createFavorite(body: dict, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")
    
    token = authorization.split(" ")[1] 
    with httpx.Client(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response = client.post(
                f'{os.getenv("CATALOG_SERVICE")}/favorite', 
                json=body,
                headers={"Authorization": f"Bearer {token}"}  
            )
            response.raise_for_status()
            try:
                return response.json()
            except ValueError:
                return {"error": "Invalid JSON response"}
        except httpx.RequestError as e:
            return {"error": f"An error occurred: {str(e)}"}
        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error occurred: {str(e)}"}
        
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

@router.put("/favorite/{_id}")
def disable_favorite(_id: str, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")
    
    token = authorization.split(" ")[1]
    with httpx.Client(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response = client.put(
                f'{os.getenv("CATALOG_SERVICE")}/favorite/{_id}', 
                headers={"Authorization": f"Bearer {token}"}
            )
            response.raise_for_status() 
            return response.json()
        
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
        
@router.get("/catalogs-systems")
def getCatalogsSystems( ):
    with httpx.Client(timeout=httpx.Timeout(60, connect=60)) as client:
        try:
            response = client.get(
                f'{os.getenv("CATALOG_SERVICE")}/catalogs-systems', 
            )
            response.raise_for_status() 
            return response.json()
        
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
        
        
        
@router.post("/universities")
def create_university(body: dict, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")
    
    token = authorization.split(" ")[1] 
    with httpx.Client(timeout=httpx.Timeout(10, connect=10)) as client:
        try:
            response = client.post(
                f'{os.getenv("CATALOG_SERVICE")}/universities', 
                json=body,
                headers={"Authorization": f"Bearer {token}"}  
            )
            response.raise_for_status()
            try:
                return response.json()
            except ValueError:
                return {"error": "Invalid JSON response"}
        except httpx.RequestError as e:
            return {"error": f"An error occurred: {str(e)}"}
        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error occurred: {str(e)}"}
        
        
@router.put("/universities/{university_name}")
def update_university(body: dict, university_name: str, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")
    
    token = authorization.split(" ")[1] 
    with httpx.Client(timeout=httpx.Timeout(10, connect=10)) as client:
        try:
            response = client.put(
                f'{os.getenv("CATALOG_SERVICE")}/universities/{university_name}', 
                json=body,
                headers={"Authorization": f"Bearer {token}"}  
            )
            response.raise_for_status()
            try:
                return response.json()
            except ValueError:
                return {"error": "Invalid JSON response"}
        except httpx.RequestError as e:
            return {"error": f"An error occurred: {str(e)}"}
        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error occurred: {str(e)}"}