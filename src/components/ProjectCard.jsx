export default function ProjectCard({ title }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg hover:scale-105 transition">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        React + Tailwind Project
      </p>
    </div>
  );
}