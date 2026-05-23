const fs = require('fs');
const path = 'd:/CODES/Javascript/My Own/My Portfolio/client/pages/Index.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Use Regex to capture the array
const arrayRegex = /<div className="grid grid-cols-1 md:grid-cols-12 gap-10">\s*\{\[\s*(\{[\s\S]*?\})\s*\]\.map\(\(project, i\) => \(/;
const match = content.match(arrayRegex);
if (!match) {
    console.error("Could not match the array regex");
    process.exit(1);
}

const arrayContent = '[ ' + match[1] + ' ]';

// 1. Insert PORTFOLIO_PROJECTS
const insertTarget = /\];\s*\/\/ Reusable Technical HUD Card/;
content = content.replace(insertTarget, '];\n\nexport const PORTFOLIO_PROJECTS = ' + arrayContent + ';\n\n// Reusable Technical HUD Card');

// 2. Replace the mapping block in JSX
content = content.replace(arrayRegex, '<div className="grid grid-cols-1 md:grid-cols-12 gap-10">\n                    {PORTFOLIO_PROJECTS.map((project, i) => (');

// 3. Replace setSelectedProject(project) with setSelectedProjectIndex(i) inside the map
// We just need to replace `onClick={() => setSelectedProject(project)}` in the PORTFOLIO_PROJECTS map
content = content.replace(/onClick=\{\(\) => setSelectedProject\(project\)\}/, 'onClick={() => setSelectedProjectIndex(i)}');

// 4. Replace State
content = content.replace('const [selectedProject, setSelectedProject] = useState<any | null>(null);', 'const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);\n  const selectedProject = selectedProjectIndex !== null ? PORTFOLIO_PROJECTS[selectedProjectIndex] : null;');

// 5. Replace ProjectModal props
content = content.replace(/<ProjectModal[\s\S]*?\/>/, `<ProjectModal
        isOpen={selectedProjectIndex !== null}
        onClose={() => setSelectedProjectIndex(null)}
        project={selectedProject}
        onNext={selectedProjectIndex !== null && selectedProjectIndex < PORTFOLIO_PROJECTS.length - 1 ? () => setSelectedProjectIndex(selectedProjectIndex + 1) : undefined}
        onPrev={selectedProjectIndex !== null && selectedProjectIndex > 0 ? () => setSelectedProjectIndex(selectedProjectIndex - 1) : undefined}
      />`);

fs.writeFileSync(path, content);
console.log('Successfully updated Index.tsx');
