from fastapi import FastAPI
from app.api.routes import router as user_router

app = FastAPI()

# Incluir las rutas de usuario
app.include_router(user_router)

@app.get("/test")
def test():
    return {"message": "Users Service activo s"}
