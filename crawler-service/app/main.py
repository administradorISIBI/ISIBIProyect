
from fastapi import FastAPI
from app.routes import router

app = FastAPI()

app.include_router(router)

@app.get("/test")
def test():
    return {"message": "Crawler Service Activo"}