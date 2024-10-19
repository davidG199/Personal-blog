function Form({formdata, setFormData}) {

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form className="flex flex-col gap-4 my-6 lg:my-8">
      <div>
        <input
          type="text"
          placeholder="Article Title"
          name="title"
          value={formdata.title}
          onChange={handleInputChange}
          className="w-full block bg-[var(--bg-color)] outline-none px-2 py-1 border-b-2 border-0 focus:border-gray-400 focus:outline-none border-gray-600/50"
        />
      </div>
      <div>
        <input
          type="date"
          name="date"
          value={formdata.date}
          onChange={handleInputChange}
          placeholder="Publishing Date"
          className="w-full block bg-[var(--bg-color)] outline-none px-2 py-1 border-b-2 border-0 focus:border-gray-400 focus:outline-none border-gray-600/50"
        />
      </div>
      <div className="mt-2">
        <textarea
          name="content"
          value={formdata.content}
          onChange={handleInputChange}
          placeholder="Content"
          className="w-full block bg-[var(--bg-color)] outline-none p-2 px-3 border rounded-md focus:border-gray-400 focus:outline-none border-gray-600/50 h-64"
        />
      </div>
      
    </form>
  );
}

export default Form;
