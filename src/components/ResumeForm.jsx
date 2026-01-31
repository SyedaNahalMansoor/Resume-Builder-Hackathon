import { useState, useEffect } from "react";
import "../styles/ResumeForm.css";

export default function ResumeForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    template: "modern",
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (section, field, value) => {
    if (section === "personalInfo") {
      setFormData({
        ...formData,
        personalInfo: { ...formData.personalInfo, [field]: value },
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, [section]: updated });
  };

  const addItem = (section) => {
    const newItem = getEmptyItem(section);
    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };

  const removeItem = (section, index) => {
    const updated = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updated });
  };

  const getEmptyItem = (section) => {
    switch (section) {
      case "education":
        return { degree: "", institution: "", year: "", gpa: "" };
      case "experience":
        return {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        };
      case "projects":
        return { name: "", description: "", technologies: "", link: "" };
      case "certifications":
        return { name: "", issuer: "", date: "", credentialId: "" };
      case "languages":
        return { name: "", proficiency: "" };
      default:
        return {};
    }
  };

  const handleSkillsChange = (value) => {
    const skillsArray = value.split(",").map((s) => s.trim()).filter(Boolean);
    setFormData({ ...formData, skills: skillsArray });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log("FORM SUBMITTED");
  onSave(formData);
};


  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{initialData ? "Edit Resume" : "Create New Resume"}</h2>
        <button className="close-btn" onClick={onCancel}>
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="resume-form">
        {/* Basic Info */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="Resume Title (e.g., Software Developer Resume)"
              value={formData.title}
              onChange={(e) =>
                handleInputChange(null, "title", e.target.value)
              }
              required
            />
          </div>
          <div className="form-row">
            <select
              value={formData.template}
              onChange={(e) =>
                handleInputChange(null, "template", e.target.value)
              }
              required
            >
              <option value="modern">Modern Template</option>
              <option value="classic">Classic Template</option>
              <option value="creative">Creative Template</option>
            </select>
          </div>
        </div>

        {/* Personal Info */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.personalInfo.name}
              onChange={(e) =>
                handleInputChange("personalInfo", "name", e.target.value)
              }
              required
            />
          </div>
          <div className="form-row two-col">
            <input
              type="email"
              placeholder="Email *"
              value={formData.personalInfo.email}
              onChange={(e) =>
                handleInputChange("personalInfo", "email", e.target.value)
              }
              required
            />
            <input
              type="tel"
              placeholder="Phone *"
              value={formData.personalInfo.phone}
              onChange={(e) =>
                handleInputChange("personalInfo", "phone", e.target.value)
              }
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Location (City, Country)"
              value={formData.personalInfo.location}
              onChange={(e) =>
                handleInputChange("personalInfo", "location", e.target.value)
              }
            />
          </div>
          <div className="form-row two-col">
            <input
              type="url"
              placeholder="LinkedIn URL (optional)"
              value={formData.personalInfo.linkedin}
              onChange={(e) =>
                handleInputChange("personalInfo", "linkedin", e.target.value)
              }
            />
            <input
              type="url"
              placeholder="Portfolio URL (optional)"
              value={formData.personalInfo.portfolio}
              onChange={(e) =>
                handleInputChange("personalInfo", "portfolio", e.target.value)
              }
            />
          </div>
          <div className="form-row">
            <textarea
              placeholder="Professional Summary *"
              rows="4"
              value={formData.personalInfo.summary}
              onChange={(e) =>
                handleInputChange("personalInfo", "summary", e.target.value)
              }
              required
            />
          </div>
        </div>

        {/* Education */}
        <div className="form-section">
          <div className="section-header">
            <h3>Education</h3>
            <button
              type="button"
              className="add-btn"
              onClick={() => addItem("education")}
            >
              + Add Education
            </button>
          </div>
          {formData.education.map((edu, index) => (
            <div key={index} className="array-item">
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem("education", index)}
              >
                ✕
              </button>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Degree/Certification"
                  value={edu.degree}
                  onChange={(e) =>
                    handleArrayChange("education", index, "degree", e.target.value)
                  }
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Institution Name"
                  value={edu.institution}
                  onChange={(e) =>
                    handleArrayChange("education", index, "institution", e.target.value)
                  }
                  required
                />
              </div>
              <div className="form-row two-col">
                <input
                  type="text"
                  placeholder="Year (e.g., 2020-2024)"
                  value={edu.year}
                  onChange={(e) =>
                    handleArrayChange("education", index, "year", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="GPA (optional)"
                  value={edu.gpa}
                  onChange={(e) =>
                    handleArrayChange("education", index, "gpa", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="form-section">
          <div className="section-header">
            <h3>Work Experience</h3>
            <button
              type="button"
              className="add-btn"
              onClick={() => addItem("experience")}
            >
              + Add Experience
            </button>
          </div>
          {formData.experience.map((exp, index) => (
            <div key={index} className="array-item">
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem("experience", index)}
              >
                ✕
              </button>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) =>
                    handleArrayChange("experience", index, "title", e.target.value)
                  }
                  required
                />
              </div>
              <div className="form-row two-col">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) =>
                    handleArrayChange("experience", index, "company", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) =>
                    handleArrayChange("experience", index, "location", e.target.value)
                  }
                />
              </div>
              <div className="form-row two-col">
                <input
                  type="month"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleArrayChange("experience", index, "startDate", e.target.value)
                  }
                  required
                />
                <input
                  type="month"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleArrayChange("experience", index, "endDate", e.target.value)
                  }
                  disabled={exp.current}
                />
              </div>
              <div className="form-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "current", e.target.checked)
                    }
                  />
                  Currently working here
                </label>
              </div>
              <div className="form-row">
                <textarea
                  placeholder="Job Description / Responsibilities"
                  rows="3"
                  value={exp.description}
                  onChange={(e) =>
                    handleArrayChange("experience", index, "description", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="form-section">
          <h3>Skills</h3>
          <div className="form-row">
            <textarea
              placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js, Python)"
              rows="3"
              value={formData.skills.join(", ")}
              onChange={(e) => handleSkillsChange(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Projects */}
        <div className="form-section">
          <div className="section-header">
            <h3>Projects</h3>
            <button
              type="button"
              className="add-btn"
              onClick={() => addItem("projects")}
            >
              + Add Project
            </button>
          </div>
          {formData.projects.map((project, index) => (
            <div key={index} className="array-item">
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem("projects", index)}
              >
                ✕
              </button>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) =>
                    handleArrayChange("projects", index, "name", e.target.value)
                  }
                />
              </div>
              <div className="form-row">
                <textarea
                  placeholder="Project Description"
                  rows="2"
                  value={project.description}
                  onChange={(e) =>
                    handleArrayChange("projects", index, "description", e.target.value)
                  }
                />
              </div>
              <div className="form-row two-col">
                <input
                  type="text"
                  placeholder="Technologies Used"
                  value={project.technologies}
                  onChange={(e) =>
                    handleArrayChange("projects", index, "technologies", e.target.value)
                  }
                />
                <input
                  type="url"
                  placeholder="Project Link (optional)"
                  value={project.link}
                  onChange={(e) =>
                    handleArrayChange("projects", index, "link", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="form-section">
          <div className="section-header">
            <h3>Languages</h3>
            <button
              type="button"
              className="add-btn"
              onClick={() => addItem("languages")}
            >
              + Add Language
            </button>
          </div>
          {formData.languages.map((lang, index) => (
            <div key={index} className="array-item">
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem("languages", index)}
              >
                ✕
              </button>
              <div className="form-row two-col">
                <input
                  type="text"
                  placeholder="Language"
                  value={lang.name}
                  onChange={(e) =>
                    handleArrayChange("languages", index, "name", e.target.value)
                  }
                />
                <select
                  value={lang.proficiency}
                  onChange={(e) =>
                    handleArrayChange("languages", index, "proficiency", e.target.value)
                  }
                >
                  <option value="">Select Proficiency</option>
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="form-section">
          <div className="section-header">
            <h3>Certifications</h3>
            <button
              type="button"
              className="add-btn"
              onClick={() => addItem("certifications")}
            >
              + Add Certification
            </button>
          </div>
          {formData.certifications.map((cert, index) => (
            <div key={index} className="array-item">
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem("certifications", index)}
              >
                ✕
              </button>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={cert.name}
                  onChange={(e) =>
                    handleArrayChange("certifications", index, "name", e.target.value)
                  }
                />
              </div>
              <div className="form-row two-col">
                <input
                  type="text"
                  placeholder="Issuing Organization"
                  value={cert.issuer}
                  onChange={(e) =>
                    handleArrayChange("certifications", index, "issuer", e.target.value)
                  }
                />
                <input
                  type="month"
                  placeholder="Issue Date"
                  value={cert.date}
                  onChange={(e) =>
                    handleArrayChange("certifications", index, "date", e.target.value)
                  }
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Credential ID (optional)"
                  value={cert.credentialId}
                  onChange={(e) =>
                    handleArrayChange("certifications", index, "credentialId", e.target.value)
                  }
                />
              </div>xxxx
            </div>
          ))}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            {initialData ? "Update Resume" : "Create Resume"}
          </button>
        </div>
      </form>
    </div>
  );
}