from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
from fastapi.responses import HTMLResponse

app = FastAPI(docs_url=None)

app.include_router(router)

# Agregar el middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get("/", response_class=HTMLResponse)
def test():
    return """
    <html>
        <head>
            <title>Service active</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f0f0f0;
                    transition: background-color 1s, color 1s;
                }
                h1 {
                    width: 100%;
                    text-align: center;
                    font-family: Arial, sans-serif;
                    color: #333;
                    font-size: 3rem;
                    transition: color 1s;
                }
            </style>
        </head>
        <body>
            <h1>¡Servicio Main Activo!</h1>
            <script>
                let colors = ["#f0f0f0", "#3498db", "#2ecc71", "#e74c3c", "#9b59b6"];
                let textColors = ["#333", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];
                let index = 0;

                function changeBackgroundColor() {
                    document.body.style.backgroundColor = colors[index];
                    document.body.style.color = textColors[index];
                    document.querySelector("h1").style.color = textColors[index];
                    
                    index = (index + 1) % colors.length;
                }

                setInterval(changeBackgroundColor, 1000);
            </script>
        </body>
    </html>
    """

# from fastapi import FastAPI
# from dotenv import load_dotenv
# from app.routers import search, universities, users, favorites, catalogs
# from fastapi.middleware.cors import CORSMiddleware

# load_dotenv()

# app = FastAPI()

# app.include_router(search.router, prefix="/search", tags=["Search"])
# app.include_router(universities.router, prefix="/universities", tags=["Universities"])
# app.include_router(users.router, prefix="/users", tags=["Users"])
# app.include_router(favorites.router, prefix="/favorites", tags=["Favorites"])
# app.include_router(catalogs.router, prefix="/catalogs", tags=["Catalogs"])

# # Agregar el middleware de CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  
#     allow_credentials=True,
#     allow_methods=["*"],  
#     allow_headers=["*"],  
# )

# @app.get("/test")
# def test():
#     return {"message": "Servicio Principal Activo"}

