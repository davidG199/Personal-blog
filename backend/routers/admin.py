from typing import Annotated, Optional
from fastapi.responses import JSONResponse
from models.token import TokenData
from models.article import Article
from fastapi import APIRouter, Depends, HTTPException, Response
from security.auth import get_current_user, admin, UserInDb, get_user, create_access_token, verify_password
from fastapi.security import OAuth2PasswordRequestForm 
from services.articles import ArticleService


router = APIRouter()
message = {"mensaje": "Articulo no encontrado"}

@router.post("/login")
def login(form_data:  Annotated[OAuth2PasswordRequestForm,  Depends()]):

    user = get_user(admin, form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/articles", response_model=dict, status_code=200)
def get_articles(current_user: TokenData = Depends(get_current_user)):
    data = ArticleService.readDb()

    return JSONResponse(status_code=200, content=data)

@router.post("/new", response_model=dict, status_code=200)
def add_article(article:Article, current_user: TokenData = Depends(get_current_user)):
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
def edit_article(id: int, update_article: Article, current_user: TokenData = Depends(get_current_user)):
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
def delete_article(id: int, current_user: TokenData = Depends(get_current_user)):
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



