const fs = require('fs');

const initialFolders = ['backend'];
const deletePattern = [
  'node_modules',
  'build',
  'dist',
  '.svelte-kit',
  '.turbo',
];

const purgeFolder = (folder) => {
  const files = fs.readdirSync(folder);

  files.forEach((entry) => {
    const stats = fs.lstatSync(`${folder}/${entry}`);
    const shouldDelete = deletePattern.includes(entry);

    if (stats.isDirectory() && !shouldDelete) {
      return purgeFolder(`${folder}/${entry}`);
    }

    if (shouldDelete) {
      fs.rmSync(`${folder}/${entry}`, { recursive: true, force: true });
      console.log(`removed ${folder}/${entry}`);
    }
  });
};

const purge = () => {
  initialFolders.forEach(purgeFolder);
};

if (require.main === module) {
  purge();
}
