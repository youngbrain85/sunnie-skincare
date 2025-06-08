#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building for production...');

// Build the client
console.log('📦 Building client...');
execSync('npm run build', { stdio: 'inherit' });

// Copy server files
console.log('📁 Copying server files...');
const serverFiles = [
  'server',
  'shared',
  'package.json',
  'package-lock.json'
];

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

serverFiles.forEach(file => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(distDir, file);
  
  if (fs.existsSync(srcPath)) {
    if (fs.lstatSync(srcPath).isDirectory()) {
      execSync(`cp -r "${srcPath}" "${destPath}"`);
    } else {
      execSync(`cp "${srcPath}" "${destPath}"`);
    }
  }
});

// Copy built client to dist
execSync(`cp -r dist/client dist/public`);

console.log('✅ Build complete!');