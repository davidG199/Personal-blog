import { useState } from "react";
import Layout from "../components/layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "../components/form";
import { IoMdArrowForward } from "react-icons/io";

function EditArticle() {
  const { id } = useParams();
  const [formdata, setFormData] = useState({
    title: "",
    date: "",
    content: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!formdata.title || !formdata.content || !formdata.date) {
      alert("All fields are required");
      return;
    } else {
      try {
        const response = await fetch(`http://localhost:8000/admin/edit/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formdata),
        });
        if (response.ok) {
          alert("Article update successfully");
          navigate("/admin/articles");
        } else {
          console.error("Error al crear el artículo", response.statusText);
        }
      } catch (e) {
        console.error("Error en la solicitud", e);
      }
    }
  };

  return (
    <Layout>
      <div className="lg:mt-12">
        <Link
          to={"/admin/articles"}
          className="group inline-flex items-center mb-1 md:mb-2 lg:mb-3 hover:text-yellow-200 font-bold"
        >
          <IoMdArrowForward className="h-4 w-4 rotate-180 inline-block mr-1 shrink-0 transition-transform group-hover:-translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
          <p>Back</p>
        </Link>
        <div className="">
          <h1 className="text-3xl text-yellow-200 md:text-4xl">
            Update Article
          </h1>
          <Form formdata={formdata} setFormData={setFormData} />
          <div className="w-full text-center">
            <button
              onClick={handleSubmit}
              className="p-3 px-4 bg-[var(--btn-color)] hover:bg-[var(--btn-color-hover)] rounded-lg font-bold w-1/2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EditArticle;
