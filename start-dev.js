
const { spawn } = require('child_process');
const path = require('path');

// Run vite with the appropriate configuration
const vite = spawn('npx', ['vite', '--config', path.join(__dirname, 'vite.config.ts')], {
  stdio: 'inherit',
  shell: true
});

console.log('Development server starting...');

vite.on('close', (code) => {
  console.log(`Development server exited with code ${code}`);
});
