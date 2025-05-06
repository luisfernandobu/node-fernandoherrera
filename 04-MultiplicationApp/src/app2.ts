import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const writeToFile = (outputPath: string, filename: string, data: string) => {
    const filePath = outputPath + filename;

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    fs.writeFileSync(filePath, data, 'utf-8');
    console.log('File created!');
}

const { b:base, l:limit, s:showTable } = yarg;
const outPath = './outputs/';
const filename = `tabla-${base}.txt`;
const headerDivider = ''.padEnd(30, '=');
let headerMessage = 'Tabla del ' + base;
headerMessage = headerMessage.padStart((headerMessage.length + 30)/2).padEnd(30);

let outputMessage = `
${headerDivider}
${headerMessage}
${headerDivider}\n
`;

for (let i = 1; i <= limit; i++) {
    const result = base * i;
    const resultText = `${base} x ${i} = ${result}`;
    outputMessage += resultText + '\n';
}

(showTable) && console.log(outputMessage);
writeToFile(outPath, filename, outputMessage);
