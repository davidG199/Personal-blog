from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from routers import public, admin

app = FastAPI()
app.title = "Personal blog "
app.version = "0.0.1"

app.include_router(public.router, tags=["Public"])
app.include_router(admin.router, tags=["Admin"], prefix="/admin")



@app.get("/", tags=["Home"])
def message():
    return HTMLResponse("<h1>Hello world</h1>")










