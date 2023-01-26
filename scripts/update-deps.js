const fs = require('fs');

const blacklist = ['node_modules', 'build', 'dist', '.svelte-kit'];
const initialFolders = ['frontend'];

let ncu;
try {
  const root = require('child_process')
    .execSync('npm root -g')
    .toString()
    .trim();
  ncu = require(root + '/npm-check-updates');
} catch (err) {
  console.error(
    `Install npm-check-updates globally first with: npm install -g npm-check-updates`
  );
  process.exit(1);
}

const updateWorkspace = async (folder) => {
  const files = fs.readdirSync(folder);
  const isWorkspace = files.includes('package.json');

  if (isWorkspace) {
    const upgraded = await ncu.run({
      packageFile: `${folder}/package.json`,
      upgrade: true,
    });

    if (Object.keys(upgraded).length !== 0) {
      console.log(`Updating workspace ${folder}...`);
      console.log(upgraded);
    }
  }

  files.forEach((entry) => {
    const stats = fs.lstatSync(`${folder}/${entry}`);
    const isBlacklisted = blacklist.includes(entry);

    if (stats.isDirectory() && !isBlacklisted) {
      return updateWorkspace(`${folder}/${entry}`);
    }
  });
};

const update = () => {
  initialFolders.forEach(updateWorkspace);
};

if (require.main === module) {
  update();
}
