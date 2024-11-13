import httpx
import os
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()
class ConfigRepository:
    def __init__(self, url: str):
        self.url = url

    def load_config(self) -> List[Dict[str, Any]]:
        response = httpx.get(self.url)
        response.raise_for_status() 
        return response.json() 

    def get_university(self, name: str) -> Optional[Dict[str, Any]]:
        config = self.load_config()  
        for university in config:
            if university.get("nombre") == name:  
                return university
        return None  

    def get_catalog(self, catalog_type: str) -> Optional[Dict[str, Any]]:
        config = self.load_config()  
        for university in config:
            catalogs = university.get("catalogs", []) 
            for catalog in catalogs:
                if catalog.get("nombre") == catalog_type:  
                    return catalog
        return None  

    def get_selectors(self, university_name: str) -> Dict[str, Any]:
        university = self.get_university(university_name)  
        if university:
            return university.get('selectors', {})  
        return {}
    
    def get_request_body(self, university_name: str)-> Dict[str, Any]:
        university = self.get_university(university_name)  
        if university:
            return university.get('request_body', {})  
        return {}

# Inicialización
config_repo = ConfigRepository(f'{os.getenv("CATALOGS_SERVICE")}/universities')
