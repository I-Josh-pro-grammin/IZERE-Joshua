const fs = require('fs');
const content = fs.readFileSync('d:/CODES/Javascript/My Own/My Portfolio/client/pages/Index.tsx', 'utf-8');

// 1. Insert PORTFOLIO_PROJECTS
const arrayStart = content.indexOf('{[');
const arrayEndMatch = content.match(/\]\.map\(\(project, i\)/);
if (!arrayEndMatch) {
  console.log("Could not find ].map((project, i)");
  process.exit(1);
}
const arrayEnd = arrayEndMatch.index + 1; // get the ']'
const arrayContent = content.slice(content.indexOf('[', arrayStart), arrayEnd);

let newContent = content.replace('];\n\n// Reusable Technical HUD Card', '];\n\nexport const PORTFOLIO_PROJECTS = ' + arrayContent + ';\n\n// Reusable Technical HUD Card');

// 2. Replace state variable
newContent = newContent.replace(
  'const [selectedProject, setSelectedProject] = useState<any | null>(null);',
  'const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);\n  const selectedProject = selectedProjectIndex !== null ? PORTFOLIO_PROJECTS[selectedProjectIndex] : null;'
);

// 3. Replace ProjectModal props
newContent = newContent.replace(
  '      <ProjectModal\n        isOpen={!!selectedProject}\n        onClose={() => setSelectedProject(null)}\n        project={selectedProject}\n      />',
  '      <ProjectModal\n        isOpen={selectedProjectIndex !== null}\n        onClose={() => setSelectedProjectIndex(null)}\n        project={selectedProject}\n        onNext={selectedProjectIndex !== null && selectedProjectIndex < PORTFOLIO_PROJECTS.length - 1 ? () => setSelectedProjectIndex(selectedProjectIndex + 1) : undefined}\n        onPrev={selectedProjectIndex !== null && selectedProjectIndex > 0 ? () => setSelectedProjectIndex(selectedProjectIndex - 1) : undefined}\n      />'
);

// 4. Replace mapping
newContent = newContent.replace(/\{\[[\s\S]*?\]\.map\(\(project, i\) => \([\s\S]*?onClick=\{[\s\S]*?\}/, (match) => {
  return '{PORTFOLIO_PROJECTS.map((project, i) => (\n                      <motion.div\n                        key={i}\n                        initial={{ opacity: 0, y: 30 }}\n                        whileInView={{ opacity: 1, y: 0 }}\n                        transition={{ delay: i * 0.1 }}\n                        className={`${project.colSpan} ${project.rowSpan} group cursor-pointer`}\n                        onClick={() => setSelectedProjectIndex(i)}';
});

fs.writeFileSync('d:/CODES/Javascript/My Own/My Portfolio/client/pages/Index.tsx', newContent);
console.log('Update complete');
