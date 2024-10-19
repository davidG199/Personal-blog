import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import { IoMdArrowForward } from "react-icons/io";

function Article() {
  let { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/articles/${id}`);
        if (!response.ok) {
          throw new Error("Artículo no encontrado");
        }
        const data = await response.json();
        setArticle(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <p>Cargando...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p>Error: {error}</p>
      </Layout>
    );
  }

  let isAdmin = localStorage.getItem("token");
  let navigate;
  if (isAdmin) {
    navigate = "/admin/articles";
  } else {
    navigate = "/";
  }

  return (
    <Layout>
      <div className="lg:mt-12">
        <Link
          to={navigate}
          className="group text-yellow-200 inline-flex items-center font-semibold leading-tight mb-2"
        >
          <IoMdArrowForward className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-2 rotate-[180deg]" />
          Articulos
        </Link>
        <h1 className=" font-bold text-3xl tracking-tight md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-2 mb-4 text-gray-400/90 tracking-widest">
          {article.date}
        </p>
        <div className="w-full">
        <p className=" tracking-wider whitespace-pre-wrap break-words">{article.content}</p>
        </div>
      </div>
    </Layout>
  );
}

export default Article;
