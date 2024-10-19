import { useNavigate } from "react-router-dom";

function ModalDelete({ articleId, closeModal, onDeleteSuccess }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/admin/delete/${articleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      alert("Successfully deleted");
      onDeleteSuccess();
    } catch (e) {
      console.error("Error deleting the article", e);
      alert("Error deleting the article");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-color)] p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-lg mb-4">
          Are you sure you want to delete this article?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300/30 rounded-lg hover:bg-gray-400 font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
