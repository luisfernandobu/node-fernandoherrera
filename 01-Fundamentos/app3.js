const fs = require('fs');
/* 
const content = fs.readFileSync('lorem.txt', 'utf-8');
const wordCount = content.split(' ').length;
console.log(`Cantiad de palabras: ${wordCount}`);
 */
const readmeContent = fs.readFileSync('README.md', 'utf-8');
// const wordsInContent = readmeContent.split(' ');
// const reactCount = wordsInContent.filter(currentWord => currentWord.toLowerCase().includes('react')).length;
const reactCount = readmeContent.match(/react/gi ?? []).length;
console.log(reactCount);
