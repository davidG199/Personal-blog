import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Link, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ModalDelete from "../components/modalDelete";
import { IoMdArrowForward } from "react-icons/io";

function Admin() {
  const [articles, setArticles] = useState([]);
  const [modal, setModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Obtener los artículos del servidor (autenticación incluida)
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/articles", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const data = await response.json();
        // console.log(data.articles);
        setArticles(data.articles);
      } catch (error) {
        console.error("Error al obtener los artículos", error);
        navigate("/");
      }
    };
    fetchArticles();
  }, [navigate, token]);

  const OpenModal = (articleId) => {
    setArticleToDelete(articleId);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setArticleToDelete(null);
  };

  const handleDeleteSuccess = () => {
    setArticles(articles.filter((article) => article.id !== articleToDelete));
    closeModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Layout>
      <div className="lg:mt-12">
        <span className=" inline-flex items-center text-yellow-200 group font-semibold mb-2">
          <IoMdArrowForward className=" inline-block h-4 w-4 transition-transform rotate-180 mr-1 group-hover:-translate-x-1 "/>
          <button onClick={handleLogout} className="block">
            Logout
          </button>
        </span>
        <div className="flex justify-between items-center">
          <p className="text-3xl md:text-5xl text-yellow-200">Personal blog</p>
          <Link
            to={"/admin/new"}
            className="font-bold inline-block px-4 py-2 bg-[var(--btn-color)] rounded-lg shadow-xl hover:bg-[var(--btn-color-hover)] transition-colors"
          >
            Add
          </Link>
        </div>
        <div className="flex flex-col mt-8 gap-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex items-center justify-between border-b border-gray-600 pb-2 max-h-14"
            >
              <div className="w-1/2 overflow-hidden h-full">
                <Link
                  to={"/article/" + article.id}
                  className="hover:text-yellow-200/90 focus-visible:text-yellow-200 group/link"
                >
                  <span className="flex justify-between overflow-hidden">
                    <p className="font-bold overflow-hidden clamped-title">
                      {article.title}
                    </p>
                  </span>
                </Link>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/admin/edit/${article.id}`}
                  className=" inline-flex items-center hover:text-yellow-200"
                >
                  Edit
                  <CiEdit className=" inline-block ml-1" />
                </Link>
                |
                <button
                  onClick={() => OpenModal(article.id)}
                  className=" inline-flex items-center hover:text-red-400"
                >
                  Delete
                  <MdOutlineDeleteOutline className=" inline-block ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {modal && (
          <ModalDelete
            articleId={articleToDelete}
            closeModal={closeModal}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
      </div>
    </Layout>
  );
}

export default Admin;
