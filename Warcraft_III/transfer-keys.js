const fs = require('fs');
const text =fs.readFileSync('CustomKeys.txt').toString();

const source = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const dest = '\',.PYFGCRLAOEUIDHTN;QJKXBM';

function replace(s) {
    const index = source.indexOf(s)
    return index > 0 ? dest.charAt(index) : s;
}

const lines = text.split('\r\n');
for(let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const index = line.indexOf('otkey=');
    if (index > 0) {
        const ss = line.substring(index + 6);
        let newS;
        if (ss.length > 0) {
            if (ss.length > 1) {
                newS = ss.split(',').map(s => replace(s)).join(',');
            } else {
                newS = replace(ss);
            }
        } else {
            newS = '';
        }
        lines[i] = line.substring(0, index + 6) + newS;
    }
}

console.log(lines);

fs.writeFileSync('newCustomKeys.txt', lines.join('\r\n'))
