from pydantic import BaseModel
from typing import List

# class SearchRequest(BaseModel):
#     universities: List[str]
#     search_param: str
class SearchRequest(BaseModel):
    catalog: str
    params: dict
    advanced: bool

class URLRequest(BaseModel):
    catalog: str
    search_param: str
