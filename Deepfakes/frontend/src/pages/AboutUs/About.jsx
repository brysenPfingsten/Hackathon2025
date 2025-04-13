import './About.css';

export default function About() {
  const members = [
    { 
      name: "Aaron Stanway", 
      role: "Sophomore", 
      bio: "Full-stack engineer with a passion for AI and data visualization." },
    { 
      name: "Brysen Pfingsten", 
      role: "Sophomore", 
      bio: "Works on training and evaluating deepfake detection models." },
    { 
      name: "Collin Delbridge", 
      role: "Junior", 
      bio: "Designs sleek interfaces and ensures seamless UX." },
    { 
      name: "Dimitri Short", 
      role: "Senior", 
      bio: "Prepares datasets and performs statistical evaluations." },
    { 
      name: "Thorin Collins", 
      role: "Sophomore", 
      bio: "Handles deployment, scaling, and system reliability." },
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
