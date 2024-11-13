from pydantic import BaseModel, EmailStr
from typing import Dict, Optional, List
from datetime import datetime

class SelectorData(BaseModel):
    nombre: str
    selector: str

# Modelo para la estructura de selectores completos
class Selectors(BaseModel):
    selectors_data: List[SelectorData]
    num_results_element: Optional[str]

# Modelo para la creación del catálogo
class CatalogCreate(BaseModel):
    nombre: str
    imagen: Optional[str]
    large_name: Optional[str]
    URLFullDisplay: Optional[str]=None
    instCode: Optional[str]=None
    vidCode: Optional[str]=None
    url: str
    urlCatalogo: Optional[str]
    catalog_system: str
    status: bool = True
    selectors: Selectors
    
class SearchCreate(BaseModel):
    email: EmailStr
    catalogs: List[Dict]  
    params: dict
    dateCreated: Optional[datetime] = None
    status: bool = True
    advanced: bool

class URLRequest(BaseModel):
    university_name: str
    search_param: str
    
class URLRequestFullPrimo(BaseModel):
    university_name: str
    search_param: str
    recordid: str

class FavoriteCreate(BaseModel):
    email: EmailStr
    resource: Dict
    imagen: str
    nombre: str
    large_name: str  
    dateCreated: Optional[datetime] = None
    status: bool = True
    
class URLRequestAdvanced(BaseModel):
    catalog: str
    params: dict