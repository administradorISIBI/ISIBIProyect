import httpx
from fastapi import HTTPException
import os

def validate_token(authorization: str):
    # print("*****************Barer*****************")
    # print(authorization)
    with httpx.Client(timeout=httpx.Timeout(60, connect=60)) as client:
        response = client.get(f'{os.getenv("SERVICE_USERS")}/session/active', headers={"Authorization": f"Bearer {authorization}"})
        response.raise_for_status()
        return response.json()
        
    if not result.get("active"):
        raise HTTPException(status_code=401, detail="Validate Token: Invalid or expired token")
    return True
