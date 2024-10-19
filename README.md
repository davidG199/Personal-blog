# Personal blog

Personal blog application created with fastApi, react and tailwind Css, allows to create, edit, list and edit articles using the authentication of exclusive endpoints for the administrator, 
who will enter the application through a login with their personal credentials.

## uso

Clone this repository
```
git clone https://github.com/davidG199/Personal-blog.git
```
Once cloned, we are going to raise the frontend, for this we are going to move to our folder
```
cd frontend
```
we install node modules
```
npm i
```
We execute the command to start the frontend
```
npm run dev
```

For now we don't see anything, in order to interact with the application we must start our server
For this, we will go to our backend folder
```
cd backend
```
We will create a virtual environment
```
py -m venv venv
```
we activate it
```
venv/Scripts/activate
```
Now we install the dependencies
```
pip install -r  requirements.txt
```
we start the server
```
uvicorn main:app
```
This is all.


challenge link[link](https://roadmap.sh/projects/personal-blog)





