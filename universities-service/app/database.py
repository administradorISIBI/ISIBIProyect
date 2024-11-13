import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def obtener_credenciales():
    mongo_user = os.getenv("MONGO_ROOT_USERNAME")
    mongo_password = os.getenv("MONGO_ROOT_PASSWORD")
    mongo_host = os.getenv("MONGO_HOST")
    mongo_port = os.getenv("MONGO_PORT")
    mongo_database = os.getenv("MONGO_DATABASE")

    mongo_uri = f"mongodb://{mongo_user}:{mongo_password}@{mongo_host}:{mongo_port}/{mongo_database}"
    return MongoClient(mongo_uri)[mongo_database]
