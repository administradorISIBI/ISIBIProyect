import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def get_db():
    mongo_user = os.getenv("MONGO_ROOT_USERNAME")
    mongo_password = os.getenv("MONGO_ROOT_PASSWORD")
    mongo_host = os.getenv("MONGO_HOST")
    mongo_port = os.getenv("MONGO_PORT")
    mongo_database = os.getenv("MONGO_DATABASE")
    mongo_protocol = os.getenv("MONGO_PROTOCOL")
    
    # Parámetros adicionales
    retry_writes = os.getenv("MONGO_RETRY_WRITES", "true")
    write_concern = os.getenv("MONGO_WRITE_CONCERN", "majority")
    app_name = os.getenv("MONGO_APP_NAME", "Cluster0")

    # Construcción de la URI según el protocolo y si se especifica el puerto
    if mongo_protocol == "mongodb+srv":
        # Si es un clúster SRV, no incluimos el puerto
        # mongo_uri = f"{mongo_protocol}://{mongo_user}:{mongo_password}@{mongo_host}/?retryWrites={retry_writes}&w={write_concern}&appName={app_name}"
        mongo_uri = f"{mongo_protocol}://{mongo_user}:{mongo_password}@{mongo_host}/?retryWrites={retry_writes}&w={write_concern}&appName={app_name}"
    else:
        # Si es el protocolo estándar y el puerto está presente
        if mongo_port:
            mongo_uri = f"{mongo_protocol}://{mongo_user}:{mongo_password}@{mongo_host}:{mongo_port}/{mongo_database}"
        else:
            mongo_uri = f"{mongo_protocol}://{mongo_user}:{mongo_password}@{mongo_host}/{mongo_database}"

    # print("******************** Conectando a MongoDB ********************")
    # print(mongo_uri)

    # Conectarse a la base de datos
    client = MongoClient(mongo_uri)
    return client[mongo_database]