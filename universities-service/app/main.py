from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import universities, search, urls, favorite, catalogsSistems

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar routers
app.include_router(universities.router)
app.include_router(search.router)
app.include_router(urls.router)
app.include_router(favorite.router)
app.include_router(catalogsSistems.router)

@app.get("/test")
def test():
    return {"message": "Institutions service activo"}
