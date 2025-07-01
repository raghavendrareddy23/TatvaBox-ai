import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../API/api";
import { toast } from "react-toastify";
import Header from "./header";
import { MiniLoader } from "./loader";
import MDEditor from "@uiw/react-md-editor";

export default function CreateOrUpdateTatva() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = sessionStorage.getItem("Token");
  const role = sessionStorage.getItem("Role")?.replace(/"/g, "").toLowerCase();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    tatvaUrl: "", 
  });

  const [loading, setLoading] = useState(false);
  const isUpdate = Boolean(id);

  useEffect(() => {
    if (isUpdate) {
      const fetchTatva = async () => {
        setLoading(true);
        try {
          const res = await api.get(`/tatva/${id}`);
          const data = res.data.data;
          setFormData({
            title: data.title,
            description: data.description,
            image: null,
            tatvaUrl: data.tatvaUrl,
          });
        } catch (err) {
          console.error("Failed to fetch Tatva", err);
          toast.error("Failed to fetch Tatva");
        } finally {
          setLoading(false);
        }
      };
      fetchTatva();
    }
  }, [id, isUpdate]);

  if (!token || role !== "admin") {
    return (
      <div>
        <Header/>
        <div className="min-h-screen flex items-center justify-center text-white">
          <p>You are not authorized to access this page.</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      (!formData.image && !isUpdate)
    ) {
      toast.error("All fields are required.");
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    if (formData.image) payload.append("image", formData.image);

    setLoading(true);
    try {
      if (isUpdate) {
        await api.put(`/tatva/${id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Tatva updated successfully");
      } else {
        await api.post("/tatva/create", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Tatva created successfully");
      }
      navigate("/");
    } catch (err) {
      console.error("Error submitting Tatva:", err);
      toast.error("Failed to submit Tatva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {loading && <MiniLoader />}
      <div className="min-h-screen bg-black/40 text-white flex flex-col items-center py-10 px-4">
        <h2 className="text-3xl font-bold mb-6">
          {isUpdate ? "Update Tatva" : "Create New Tatva"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-6 rounded-xl w-full max-w-3xl space-y-6"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/70 border border-white/20 text-white placeholder-gray-300"
            required
          />

          {formData.tatvaUrl && !formData.image && (
            <img
              src={formData.tatvaUrl}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-lg"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-white"
            required={!isUpdate}
          />

          <div data-color-mode="dark">
            <MDEditor
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              height={300}
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
          >
            {isUpdate ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
