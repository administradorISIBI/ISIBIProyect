from fastapi import APIRouter, HTTPException
from app.models.request_models import SearchRequest, URLRequest
from app.services.search_service import search_university, build_search_url
from fastapi.responses import StreamingResponse
import asyncio
import json

router = APIRouter()

@router.post("/url")
async def get_search_url(request: URLRequest):
    search_url = build_search_url(request.university_name, request.search_param)
    if not search_url:
        raise HTTPException(status_code=404, detail="University not found")
    return {"search_url": search_url}

@router.post("/crawl")
async def search_and_crawl(request: SearchRequest):
    async def result_streamer():
        tasks = [search_university(university, request.search_param) for university in request.universities]
        for task in asyncio.as_completed(tasks):
            result = await task
            yield json.dumps(result) + "\n"
    return StreamingResponse(result_streamer(), media_type="application/json")
