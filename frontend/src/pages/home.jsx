import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function Home() {
  const [articles, setArticles] = useState([]);

  //Obtener los articulos del servidor
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:8000/articles");
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error al obtener los artículos", error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
      <Layout>
        <div className="lg:mt-12">
          <div className="flex items-center justify-between">
            <p className=" text-3xl md:text-5xl text-yellow-200">Personal blog</p>
            <Link to={"/login"} className="font-bold inline-block px-4 py-2 bg-[var(--btn-color)] rounded-lg shadow-xl hover:bg-[var(--btn-color-hover)] transition-colors">Login</Link>
          </div>
          <div className=" flex flex-col mt-8 gap-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex items-center cursor-pointer border-b border-gray-600 pb-2"
              >
                <Link
                  to={"/article/" + article.id}
                  className=" leading-tight w-full hover:text-yellow-200/90 focus-visible:text-yellow-200 group/link"
                >
                  <span className="inline-flex justify-between w-full">
                    <p className=" overflow-hidden w-[60%] font-bold clamped-title">
                      {article.title}
                    </p>
                    <span className="flex items-center gap-1">
                      <p>{article.date}</p>
                      <IoMdArrowForward className="h-4 w-4 inline-block shrink-0 transition-transform group-hover/link:translate-x-1 group-focus-visible/link:-translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
