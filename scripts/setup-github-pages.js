#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up SMB Compliance Hub for GitHub Pages deployment...\n');

// Read package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get GitHub username from command line or prompt
const args = process.argv.slice(2);
let githubUsername = args[0];

if (!githubUsername) {
  console.log('Please provide your GitHub username:');
  console.log('Usage: node scripts/setup-github-pages.js <your-github-username>');
  console.log('\nExample: node scripts/setup-github-pages.js johndoe');
  process.exit(1);
}

// Update homepage in package.json
packageJson.homepage = `https://${githubUsername}.github.io/SMBComplianceHub`;

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('✅ Updated package.json with GitHub Pages URL');
console.log(`📝 Homepage set to: ${packageJson.homepage}`);
console.log('\n📋 Next steps:');
console.log('1. Push your code to GitHub');
console.log('2. Go to your repository Settings → Pages');
console.log('3. Set Source to "GitHub Actions"');
console.log('4. Push to main branch to trigger deployment');
console.log('\n🌐 Your site will be available at:');
console.log(packageJson.homepage);
console.log('\n📖 For more details, see DEPLOYMENT.md'); 