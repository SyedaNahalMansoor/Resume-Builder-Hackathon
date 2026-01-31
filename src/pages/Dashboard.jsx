import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth.jsx";
import { db } from "../config/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import ResumeForm from "../components/ResumeForm";
import ResumeCard from "../components/ResumeCard";
import ResumePreview from "../components/ResumePreview";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingResume, setEditingResume] = useState(null);
  const [previewResume, setPreviewResume] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTemplate, setFilterTemplate] = useState("all");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (user) {
    loadResumes();
  }
}, [user]);


 const loadResumes = async () => {
  if (!user) return;

  try {
    setLoading(true);
    const q = query(
      collection(db, "resumes"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    const resumeData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setResumes(resumeData);
  } catch (error) {
    console.error("Error loading resumes:", error);
    Swal.fire("Error", "Failed to load resumes", "error");
  } finally {
    setLoading(false);
  }
};


  const handleSaveResume = async (resumeData) => {
      console.log("handleSaveResume CALLED", resumeData);

    try {
      if (editingResume) {
        await updateDoc(doc(db, "resumes", editingResume.id), {
          ...resumeData,
          updatedAt: new Date().toISOString(),
        });
        Swal.fire("Success", "Resume updated successfully!", "success");
      } else {
          console.log("ADDING TO FIRESTORE", user?.uid);

        await addDoc(collection(db, "resumes"), {
          ...resumeData,
          userId: user.uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
          console.log("FIRESTORE ADD SUCCESS");

        Swal.fire("Success", "Resume created successfully!", "success");
      }
      setShowForm(false);
      setEditingResume(null);
      loadResumes();
    } catch (error) {
      console.error("Error saving resume:", error);
      Swal.fire("Error", "Failed to save resume", "error");
    }
  };

  const handleDeleteResume = async (resumeId) => {
    const result = await Swal.fire({
      title: "Delete Resume?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "resumes", resumeId));
        Swal.fire("Deleted!", "Resume has been deleted.", "success");
        loadResumes();
      } catch (error) {
        console.error("Error deleting resume:", error);
        Swal.fire("Error", "Failed to delete resume", "error");
      }
    }
  };

  const handleEditResume = (resume) => {
    setEditingResume(resume);
    setShowForm(true);
  };

  const handlePreviewResume = (resume) => {
    setPreviewResume(resume);
  };

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire("Logged Out", "See you again soon!", "success");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const filteredResumes = resumes.filter((resume) => {
    const matchesSearch =
      resume.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resume.personalInfo?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      resume.skills?.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTemplate =
      filterTemplate === "all" || resume.template === filterTemplate;

    return matchesSearch && matchesTemplate;
  });

  if (previewResume) {
    return (
      <ResumePreview
        resume={previewResume}
        onClose={() => setPreviewResume(null)}
        onEdit={() => {
          handleEditResume(previewResume);
          setPreviewResume(null);
        }}
      />
    );
  }

  if (showForm) {
    return (
      <ResumeForm
        initialData={editingResume}
        onSave={handleSaveResume}
        onCancel={() => {
          setShowForm(false);
          setEditingResume(null);
        }}
      />
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Resume Builder</h1>
            <p>Welcome back, {user?.displayName || user?.email}!</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="controls-section">
        <div className="controls-content">
          <input
            type="text"
            placeholder="Search by title, name, or skills..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="filter-select"
            value={filterTemplate}
            onChange={(e) => setFilterTemplate(e.target.value)}
          >
            <option value="all">All Templates</option>
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="creative">Creative</option>
          </select>
          <button className="create-btn" onClick={() => setShowForm(true)}>
            + Create New Resume
          </button>
        </div>
      </div>

      {/* Resumes Grid */}
      <div className="resumes-content">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your resumes...</p>
          </div>
        ) : filteredResumes.length === 0 ? (
          <div className="empty-state">
            <svg
              className="empty-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2>No resumes found</h2>
            <p>
              {searchQuery || filterTemplate !== "all"
                ? "Try adjusting your search or filter"
                : "Create your first resume to get started"}
            </p>
            {!searchQuery && filterTemplate === "all" && (
              <button className="create-btn" onClick={() => setShowForm(true)}>
                Create Your First Resume
              </button>
            )}
          </div>
        ) : (
          <div className="resumes-grid">
            {filteredResumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onPreview={handlePreviewResume}
                onEdit={handleEditResume}
                onDelete={handleDeleteResume}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}