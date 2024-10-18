from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str

class UserInDb(BaseModel):
    username: str
    hashed_password: str