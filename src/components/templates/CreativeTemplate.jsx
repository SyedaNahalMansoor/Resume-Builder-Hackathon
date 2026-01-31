export default function CreativeTemplate({ resume }) {
  const { personalInfo, education, experience, skills, projects, languages, certifications } =
    resume;

  const formatMonthYear = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="template creative-template">
      {/* Sidebar */}
      <div className="creative-sidebar">
        <div className="sidebar-header">
          <h1 className="name creative-name">{personalInfo?.name || "Your Name"}</h1>
        </div>

        {/* Contact Info */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">CONTACT</h3>
          {personalInfo?.email && (
            <div className="sidebar-item">
              <span className="sidebar-icon">📧</span>
              <span className="sidebar-text">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div className="sidebar-item">
              <span className="sidebar-icon">📱</span>
              <span className="sidebar-text">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div className="sidebar-item">
              <span className="sidebar-icon">📍</span>
              <span className="sidebar-text">{personalInfo.location}</span>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div className="sidebar-item">
              <span className="sidebar-icon">🔗</span>
              <span className="sidebar-text sidebar-link">LinkedIn</span>
            </div>
          )}
          {personalInfo?.portfolio && (
            <div className="sidebar-item">
              <span className="sidebar-icon">💼</span>
              <span className="sidebar-text sidebar-link">Portfolio</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">SKILLS</h3>
            <div className="sidebar-skills">
              {skills.map((skill, index) => (
                <div key={index} className="sidebar-skill">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">LANGUAGES</h3>
            {languages.map((lang, index) => (
              <div key={index} className="sidebar-item">
                <div className="sidebar-text">
                  <strong>{lang.name}</strong>
                  {lang.proficiency && (
                    <div className="lang-proficiency-creative">{lang.proficiency}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="creative-main">
        {/* Summary */}
        {personalInfo?.summary && (
          <div className="creative-section">
            <h2 className="creative-section-title">PROFILE</h2>
            <p className="creative-summary">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="creative-section">
            <h2 className="creative-section-title">EXPERIENCE</h2>
            {experience.map((exp, index) => (
              <div key={index} className="creative-exp-item">
                <div className="creative-exp-header">
                  <div>
                    <h3 className="creative-exp-title">{exp.title}</h3>
                    <p className="creative-exp-company">
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <div className="creative-exp-date">
                    {formatMonthYear(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatMonthYear(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="creative-exp-description">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="creative-section">
            <h2 className="creative-section-title">PROJECTS</h2>
            {projects.map((project, index) => (
              <div key={index} className="creative-project-item">
                <h3 className="creative-project-name">
                  {project.name}
                  {project.link && <span className="creative-link-icon"> 🔗</span>}
                </h3>
                {project.description && (
                  <p className="creative-project-description">{project.description}</p>
                )}
                {project.technologies && (
                  <p className="creative-project-tech">
                    <strong>Tech:</strong> {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="creative-section">
            <h2 className="creative-section-title">EDUCATION</h2>
            {education.map((edu, index) => (
              <div key={index} className="creative-edu-item">
                <div className="creative-edu-header">
                  <div>
                    <h3 className="creative-edu-degree">{edu.degree}</h3>
                    <p className="creative-edu-institution">{edu.institution}</p>
                  </div>
                  <div className="creative-edu-meta">
                    {edu.year && <div className="creative-edu-year">{edu.year}</div>}
                    {edu.gpa && <div className="creative-edu-gpa">GPA: {edu.gpa}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="creative-section">
            <h2 className="creative-section-title">CERTIFICATIONS</h2>
            {certifications.map((cert, index) => (
              <div key={index} className="creative-cert-item">
                <h3 className="creative-cert-name">{cert.name}</h3>
                <p className="creative-cert-issuer">
                  {cert.issuer}
                  {cert.date && ` • ${formatMonthYear(cert.date)}`}
                </p>
                {cert.credentialId && (
                  <p className="creative-cert-id">ID: {cert.credentialId}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}