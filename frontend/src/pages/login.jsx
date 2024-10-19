import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { IoMdArrowForward } from "react-icons/io";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("username", formdata.username);
    formData.append("password", formdata.password);

    try {
      
      const response = await fetch("http://localhost:8000/admin/login", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: formData.toString()
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        navigate("/admin/articles");
      } else {
        alert("Error al iniciar sesión");
      }
    } catch (e) {
      console.error("Error al iniciar sesión", e);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <Layout>
      <div className="lg:mt-24">
        <div className="w-full md:w-2/3 md:mx-auto">
          <Link
            to={"/"}
            className="group inline-flex items-center text-yellow-200 font-bold text-start"
          >
            <IoMdArrowForward className="h-4 w-4 inline-block mr-1 shrink-0 transition-transform group-hover:-translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none rotate-180" />
            <p>Back</p>
          </Link>
          <h1 className=" font-semibold text-3xl md:text-5xl text-yellow-200 tracking-wider mb-8 text-center">
            Login
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--login-card)] rounded-md p-5 shadow-xl text-center"
          >
            <div className="flex flex-col mb-4">
              <label
                htmlFor="username"
                className="text-start font-semibold mb-2"
              >
                Username:
              </label>
              <input
                type="username"
                id="username"
                name="username"
                required
                onChange={handleChange}
                value={formdata.username}
                className="block bg-[var(--login-card)] outline-none px-2 py-1 border-b-2 border-0 focus:border-gray-400 focus:outline-none border-gray-600 "
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-start font-semibold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={handleChange}
                value={formdata.password}
                className="block bg-[var(--login-card)] outline-none px-2 py-1 border-b-2 border-0 focus:border-gray-400 focus:outline-none border-gray-600"
              />
            </div>
            <button
              type="submit"
              className="mt-5 w-1/2 bg-[var(--btn-color)] rounded font-bold py-2 hover:bg-[var(--btn-color-hover)] "
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
