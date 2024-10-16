from pydantic import BaseModel


class Article(BaseModel):
    title: str
    date: str
    content: str

