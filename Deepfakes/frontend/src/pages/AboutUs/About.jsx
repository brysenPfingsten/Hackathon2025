import './About.css';

export default function About() {
  const members = [
    { name: "Brysen Pfingsten", role: "Lead Developer", bio: "Full-stack engineer with a passion for AI and data visualization." },
    { name: "Jane Smith", role: "ML Engineer", bio: "Works on training and evaluating deepfake detection models." },
    { name: "Tom Johnson", role: "Frontend Engineer", bio: "Designs sleek interfaces and ensures seamless UX." },
    { name: "Emily Chen", role: "Data Scientist", bio: "Prepares datasets and performs statistical evaluations." },
    { name: "Liam Patel", role: "DevOps", bio: "Handles deployment, scaling, and system reliability." },
  ];

  return (
    <section id="about">
      <h2>👥 Meet the Team</h2>
      <div className="team-container">
        {members.map((member, idx) => (
          <div key={idx} className="team-member">
            <div className="profile-pic" />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p>{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
