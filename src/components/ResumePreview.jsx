import "../styles/Templates.css";

export default function ResumePreview({ resume, onClose, onEdit }) {
  return (
    <div className="preview-overlay">
      <div className="preview-container">

        {/* Header */}
        <div className="preview-header">
          <h1>{resume.personalInfo?.name}</h1>
          <p>{resume.personalInfo?.email} | {resume.personalInfo?.phone}</p>
          <p>{resume.personalInfo?.location}</p>

          <div className="preview-actions">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>

        {/* Summary */}
        <section>
          <h2>Summary</h2>
          <p>{resume.personalInfo?.summary}</p>
        </section>

        {/* Skills */}
        <section>
          <h2>Skills</h2>
          <ul>
            {resume.skills?.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section>
          <h2>Education</h2>
          {resume.education?.map((edu, i) => (
            <div key={i}>
              <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
            </div>
          ))}
        </section>

        {/* Experience */}
        <section>
          <h2>Experience</h2>
          {resume.experience?.map((exp, i) => (
            <div key={i}>
              <strong>{exp.title}</strong> — {exp.company}
              <p>{exp.description}</p>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section>
          <h2>Projects</h2>
          {resume.projects?.map((p, i) => (
            <div key={i}>
              <strong>{p.name}</strong>
              <p>{p.description}</p>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
