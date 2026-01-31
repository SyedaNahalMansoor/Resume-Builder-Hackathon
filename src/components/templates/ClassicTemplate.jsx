export default function ClassicTemplate({ resume }) {
  const { personalInfo, education, experience, skills, projects, languages, certifications } =
    resume;

  const formatMonthYear = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="template classic-template">
      {/* Header */}
      <div className="template-header classic-header">
        <h1 className="name classic-name">{personalInfo?.name || "Your Name"}</h1>
        <div className="contact-info classic-contact">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>|</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>|</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo?.linkedin || personalInfo?.portfolio) && (
          <div className="links classic-links">
            {personalInfo?.linkedin && (
              <span>LinkedIn: {personalInfo.linkedin}</span>
            )}
            {personalInfo?.portfolio && personalInfo?.linkedin && <span> | </span>}
            {personalInfo?.portfolio && (
              <span>Portfolio: {personalInfo.portfolio}</span>
            )}
          </div>
        )}
      </div>

      <hr className="classic-divider" />

      {/* Summary */}
      {personalInfo?.summary && (
        <div className="template-section">
          <h2 className="section-title classic-title">PROFESSIONAL SUMMARY</h2>
          <p className="summary-text classic-text">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="template-section">
          <h2 className="section-title classic-title">PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp, index) => (
            <div key={index} className="experience-item classic-exp-item">
              <div className="exp-header classic-exp-header">
                <h3 className="exp-title classic-exp-title">{exp.title}</h3>
                <span className="exp-date classic-date">
                  {formatMonthYear(exp.startDate)} -{" "}
                  {exp.current ? "Present" : formatMonthYear(exp.endDate)}
                </span>
              </div>
              <p className="exp-company classic-exp-company">
                {exp.company}
                {exp.location && ` | ${exp.location}`}
              </p>
              {exp.description && (
                <p className="exp-description classic-description">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="template-section">
          <h2 className="section-title classic-title">EDUCATION</h2>
          {education.map((edu, index) => (
            <div key={index} className="education-item classic-edu-item">
              <div className="edu-header classic-edu-header">
                <h3 className="edu-degree classic-edu-degree">{edu.degree}</h3>
                {edu.year && <span className="edu-year classic-date">{edu.year}</span>}
              </div>
              <p className="edu-institution classic-institution">
                {edu.institution}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="template-section">
          <h2 className="section-title classic-title">SKILLS</h2>
          <p className="classic-skills">{skills.join(" • ")}</p>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="template-section">
          <h2 className="section-title classic-title">PROJECTS</h2>
          {projects.map((project, index) => (
            <div key={index} className="project-item classic-project-item">
              <h3 className="project-name classic-project-name">
                {project.name}
                {project.link && ` | ${project.link}`}
              </h3>
              {project.description && (
                <p className="project-description classic-description">
                  {project.description}
                </p>
              )}
              {project.technologies && (
                <p className="project-tech classic-tech">
                  Technologies: {project.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="template-section">
          <h2 className="section-title classic-title">CERTIFICATIONS</h2>
          {certifications.map((cert, index) => (
            <div key={index} className="cert-item classic-cert-item">
              <h3 className="cert-name classic-cert-name">{cert.name}</h3>
              <p className="cert-issuer classic-cert-issuer">
                {cert.issuer}
                {cert.date && ` | ${formatMonthYear(cert.date)}`}
                {cert.credentialId && ` | ID: ${cert.credentialId}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div className="template-section">
          <h2 className="section-title classic-title">LANGUAGES</h2>
          <p className="classic-languages">
            {languages.map((lang, index) => (
              <span key={index}>
                {lang.name}
                {lang.proficiency && ` (${lang.proficiency})`}
                {index < languages.length - 1 && " • "}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}