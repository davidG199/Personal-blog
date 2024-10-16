from fastapi.responses import JSONResponse
from models.article import Article
from services.articles import ArticleService
from fastapi import APIRouter, Depends, HTTPException
from security.auth import get_current_admin


router = APIRouter()
message = {"mensaje": "Articulo no encontrado"}

@router.post("/new", response_model=dict, status_code=200)
def add_article(article:Article, admin: str = Depends(get_current_admin)):
    data = ArticleService.readDb()

    article_id = len(data["articles"]) + 1
    new_article = {
        "id": article_id,
        "title": article.title,
        "date": article.date,
        "content": article.content
    }

    data["articles"].append(new_article)
    ArticleService.writeDb(data)
    return JSONResponse(status_code=201, content={"message": "Articulo agregado exitosamente"})

@router.put("/edit/{id}", response_model=dict, status_code=200)
def edit_article(id: int, update_article: Article, admin: str = Depends(get_current_admin)):
    data = ArticleService.readDb()

    for article in data["articles"]:
        if article["id"] == id:
            article["title"] = update_article.title
            article["date"] = update_article.date
            article["content"] = update_article.content

            ArticleService.writeDb(data)
            return JSONResponse(status_code=200, content={"message": "Articulo editado exitosamente"})
        
    raise HTTPException(status_code=404, detail=message)

@router.delete("/delete/{id}", response_model=dict, status_code=200)
def delete_article(id: int, admin: str = Depends(get_current_admin)):
    data = ArticleService.readDb()

    # Buscar el artículo por id
    for article in data["articles"]:
        if article["id"] == id:
            data["articles"].remove(article)  
            
            # Guardar cambios en el archivo JSON
            ArticleService.writeDb(data)
            
            return JSONResponse(status_code=200, content={"message": "Artículo eliminado exitosamente"})
    
    # Si no se encuentra el artículo, devolver error 404
    raise HTTPException(status_code=404, detail="Artículo no encontrado")



