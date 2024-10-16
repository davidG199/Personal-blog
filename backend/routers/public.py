from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from models.article import Article
from services.articles import ArticleService

router = APIRouter()

message = {"mensaje": "Articulo no encontrado"}

@router.get("/articles", response_model=Article, status_code=200)
def get_articles():
    data = ArticleService.readDb()
    return JSONResponse(status_code=200, content=data)

@router.get("/articles/{id}", response_model=Article, status_code=200)
def get_article_id(id: int):
    data = ArticleService.readDb()

    for article in data["articles"]:
        if article["id"] == id:
            return JSONResponse(status_code=200, content=article)
        
    raise HTTPException(status_code=404, detail=message)





