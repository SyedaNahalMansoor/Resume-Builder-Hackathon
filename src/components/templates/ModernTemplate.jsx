export default function ModernTemplate({ resume }) {
  const { personalInfo, education, experience, skills, projects, languages, certifications } =
    resume;

  const formatMonthYear = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="template modern-template">
      {/* Header */}
      <div className="template-header modern-header">
        <h1 className="name">{personalInfo?.name || "Your Name"}</h1>
        <div className="contact-info">
          {personalInfo?.email && (
            <span className="contact-item">📧 {personalInfo.email}</span>
          )}
          {personalInfo?.phone && (
            <span className="contact-item">📱 {personalInfo.phone}</span>
          )}
          {personalInfo?.location && (
            <span className="contact-item">📍 {personalInfo.location}</span>
          )}
        </div>
        {(personalInfo?.linkedin || personalInfo?.portfolio) && (
          <div className="links">
            {personalInfo?.linkedin && (
              <a href={personalInfo.linkedin} className="link-item">
                🔗 LinkedIn
              </a>
            )}
            {personalInfo?.portfolio && (
              <a href={personalInfo.portfolio} className="link-item">
                💼 Portfolio
              </a>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo?.summary && (
        <div className="template-section">
          <h2 className="section-title modern-title">Professional Summary</h2>
          <p className="summary-text">{personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="template-section">
          <h2 className="section-title modern-title">Skills</h2>
          <div className="skills-container modern-skills">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag modern-skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="template-section">
          <h2 className="section-title modern-title">Work Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="experience-item modern-exp-item">
              <div className="exp-header">
                <div>
                  <h3 className="exp-title">{exp.title}</h3>
                  <p className="exp-company">{exp.company}</p>
                </div>
                <div className="exp-meta">
                  <p className="exp-date">
                    {formatMonthYear(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatMonthYear(exp.endDate)}
                  </p>
                  {exp.location && <p className="exp-location">{exp.location}</p>}
                </div>
              </div>
              {exp.description && <p className="exp-description">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="template-section">
          <h2 className="section-title modern-title">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="project-item modern-project-item">
              <h3 className="project-name">
                {project.name}
                {project.link && (
                  <a href={project.link} className="project-link">
                    🔗
                  </a>
                )}
              </h3>
              {project.description && (
                <p className="project-description">{project.description}</p>
              )}
              {project.technologies && (
                <p className="project-tech">
                  <strong>Technologies:</strong> {project.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="template-section">
          <h2 className="section-title modern-title">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="education-item modern-edu-item">
              <div className="edu-header">
                <div>
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <p className="edu-institution">{edu.institution}</p>
                </div>
                <div className="edu-meta">
                  {edu.year && <p className="edu-year">{edu.year}</p>}
                  {edu.gpa && <p className="edu-gpa">GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="template-section">
          <h2 className="section-title modern-title">Certifications</h2>
          {certifications.map((cert, index) => (
            <div key={index} className="cert-item modern-cert-item">
              <h3 className="cert-name">{cert.name}</h3>
              <p className="cert-issuer">
                {cert.issuer}
                {cert.date && ` | ${formatMonthYear(cert.date)}`}
              </p>
              {cert.credentialId && (
                <p className="cert-id">Credential ID: {cert.credentialId}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div className="template-section">
          <h2 className="section-title modern-title">Languages</h2>
          <div className="languages-container">
            {languages.map((lang, index) => (
              <div key={index} className="language-item">
                <span className="lang-name">{lang.name}</span>
                {lang.proficiency && (
                  <span className="lang-proficiency"> - {lang.proficiency}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}