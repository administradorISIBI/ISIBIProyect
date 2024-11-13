import httpx
from typing import List, Dict, Any, Optional
import os
from dotenv import load_dotenv

load_dotenv()

class ConfigRepository:
    def __init__(self, universities_url: str, catalogs_url: str):
        self.universities_url = universities_url
        self.catalogs_url = catalogs_url

    def load_universities(self) -> List[Dict[str, Any]]:
        response = httpx.get(self.universities_url)
        response.raise_for_status()
        return response.json()  

    def load_catalogs(self) -> List[Dict[str, Any]]:
        response = httpx.get(self.catalogs_url)
        response.raise_for_status()
        return response.json()  

    def get_university(self, name: str) -> Optional[Dict[str, Any]]:
        universities = self.load_universities()  
        for university in universities:
            if university.get("nombre") == name:  
                return university
        return None 
    
    def get_university_catalog(self, name: str) -> Optional[Dict[str, Any]]:
        universities = self.load_universities()  
        for university in universities:
            if university.get("nombre") == name:  
                return university.get("catalog_system")
        return None   

    def get_catalog(self, catalog_name: str) -> Optional[Dict[str, Any]]:
        catalogs = self.load_catalogs()  
        for catalog in catalogs:
            if catalog.get("nombre") == catalog_name: 
                return catalog
        return None  
    
    def get_all_universities(self):
        return self.load_universities() 
    
    def get_all_catalogs(self):
        return self.load_catalogs()  
print(f'{os.getenv("CATALOG_SERVICE")}/universities',f'{os.getenv("CATALOG_SERVICE")}/sistcatalogs' )
# Inicialización
config_repo = ConfigRepository(f'{os.getenv("CATALOG_SERVICE")}/universities', f'{os.getenv("CATALOG_SERVICE")}/sistcatalogs')
