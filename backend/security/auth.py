
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials


security = HTTPBasic()

# Definimos las credenciales de administrador para la autenticación
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin"

# Definimos la función para autenticar a los usuarios
def authenticate_user(credentials: HTTPBasicCredentials) -> Optional[str]:
    #Recibimos las credenciales enviadas por el usuario
    #luego verificamos si las credenciales coinciden 
    if credentials.username == ADMIN_USERNAME and credentials.password == ADMIN_PASSWORD:
        #Si las credenciales son válidas, retornamos el nombre del usuario
        return credentials.username
    #Si las credenciales no coinciden manda un 401, indicando que el acceso esta prohibido
    raise HTTPException(
        status_code= status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales incorrectas",
        headers={"WWW-Authenticate": "Basic"}
    )

#Esta funcion actua como una dependencia para las rutas que necesitan autenticacion, recibe las crendeciales usando (depends(security))
def get_current_admin(credentials: HTTPBasicCredentials = Depends(security)) -> str:
    #usamos la funcion para verificar al usuario
    username = authenticate_user(credentials)
    
    #si las credenciales son correctas permite acceso a la ruta protegidas, si no lo son devuelve un 401 indicando que la auth fallo
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return username

