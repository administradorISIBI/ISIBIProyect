from pydantic import BaseModel
from typing import List
class CrawlRequest(BaseModel):
    url: str
    university_name: str
    catalog_system: str
    search_param:  List[str]
