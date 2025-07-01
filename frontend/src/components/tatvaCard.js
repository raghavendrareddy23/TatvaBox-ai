import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./header";
import { Loader} from "./loader";
import ReactMarkdown from "react-markdown";
import {
  ArchiveBoxXMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import api from "../API/api";
import { toast } from "react-toastify";

function TatvaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tatva, setTatva] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const token = sessionStorage.getItem("Token");
  const role = sessionStorage.getItem("Role")?.replace(/"/g, "").toLowerCase();

  useEffect(() => {
    const fetchTatva = async () => {
      try {
        const res = await api.get(`/tatva/${id}`);
        setTatva(res.data.data);
      } catch (err) {
        console.error("Failed to load Tatva", err);
      }
    };

    fetchTatva();
  }, [id]);

  const handleAsk = async () => {
    if (!token) {
      toast.error("Please login to ask questions.");
      navigate("/auth");
      return;
    }

    if (!question.trim()) return;

    setLoadingAI(true);
    try {
      const res = await api.post(
        "/ai/ask",
        {
          tatvaId: id,
          question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnswer(res.data.answer);
    } catch (err) {
      console.error("AI request failed", err);
      toast.error("AI failed to respond. Try again.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleDelete = async () => {
    if (!token || role !== "admin") {
      toast.error("You are not authorized to delete this Tatva.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this Tatva?")) return;

    try {
      await api.delete(`/tatva/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Tatva deleted successfully.");
      navigate("/");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete Tatva.");
    }
  };

  const handleUpdate = ()=>{
    navigate(`/tatva/update/${id}`)
  }

  if (!tatva) return <Loader />;

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-start text-white px-4 pt-10">
        <div className="flex flex-col md:flex-row bg-black/40 rounded-xl shadow-lg p-6 w-full max-w-5xl">
          <img
            src={tatva.tatvaUrl}
            alt={tatva.title}
            className="w-64 h-64 object-cover mb-6 md:mb-0 md:mr-8 rounded-lg shadow-md"
          />
          <div className="flex flex-col justify-between w-full">
            <div>
              <h2 className="text-3xl font-bold mb-2">{tatva.title}</h2>
              <div className="prose prose-invert max-w-none text-white/90">
                <ReactMarkdown>{tatva.description}</ReactMarkdown>
              </div>
            </div>

            {token && role === "admin" && (
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm shadow-md"
                >
                  <ArchiveBoxXMarkIcon className="w-5 h-5" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex items-center space-x-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-md"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                  <span>Update</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Ask Question Section */}
        <div className="mt-8 w-full max-w-5xl text-center mb-4">
          <div className="flex w-full justify-center">
            <input
              type="text"
              placeholder="Ask a question about this Tatva..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 rounded bg-black/80 border border-white/20 text-white placeholder-gray-300 focus:outline-none"
            />
            <button
              onClick={handleAsk}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded ml-4"
            >
              Ask
            </button>
          </div>

          {loadingAI && <p className="mt-5 text-sm text-orange-300">Fetching insight...</p>}
          {answer && !loadingAI && (
            <div className="mt-6 mb-6 bg-black/60 border border-white/20 rounded p-4 text-left text-white/90">
              <h3 className="font-semibold mb-2 text-orange-300">
                Mystical Insight:
              </h3>
              <p className="whitespace-pre-line">{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TatvaPage;
