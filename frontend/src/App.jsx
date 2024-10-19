import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Article from "./pages/article";
import Admin from "./pages/admin";
import Login from "./pages/login";
import ProtectedRoute from "./components/protectedRoute";
import EditArticle from "./pages/editArticle";
import NewArticle from "./pages/newArticle";

function App() {
  const token = localStorage.getItem("token");
  let isAdmin;

  if (!token) {
    isAdmin = false;
  } else {
    isAdmin = true;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/articles" element={<Admin />} />
        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute isAllowed={isAdmin}>
              <EditArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/new"
          element={
            <ProtectedRoute isAllowed={isAdmin}>
              <NewArticle />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
