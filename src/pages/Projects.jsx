import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-center mb-10">My Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <ProjectCard title="AI Finance Assistant" />
        <ProjectCard title="Library Management System" />
        <ProjectCard title="Rulif Tech Store" />
      </div>
    </section>
  );
}