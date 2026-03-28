const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        let fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;

    newContent = newContent.replace(/\btext-\[\d+px\]/g, (match) => {
        const px = parseInt(match.match(/\d+/)[0], 10);
        if (px <= 10) return 'text-[0.7rem]';
        if (px === 11) return 'text-[0.75rem]';
        if (px === 12) return 'text-sm';
        if (px === 13) return 'text-sm';
        if (px === 14) return 'text-base';
        if (px === 15) return 'text-base';
        if (px === 16) return 'text-lg';
        if (px === 18) return 'text-xl';
        if (px === 20) return 'text-2xl';
        if (px === 24) return 'text-3xl';
        const rem = parseFloat((px * 1.15 / 16).toFixed(3));
        return `text-[${rem}rem]`;
    });

    const isSidebar = file.includes('Sidebar') || file.includes('Navbar');
    const isTable = file.includes('Table') || file.includes('Grid');

    newContent = newContent.replace(/\b(text-xs|text-sm|text-base)\b/g, (match) => {
        if (isSidebar || isTable) {
            // "Navbar/sidebar: small increase only (avoid crowding)"
            // "Table text: increase minimally to avoid overflow"
            // We just keep them same or only increase xs?
            // Actually, "increase all font sizes by ~10-15%", so even here we can just use the standard map
            // user: "increase minimally to avoid overflow".
            if (match === 'text-xs') return 'text-[13px]';
            if (match === 'text-sm') return 'text-[15px]';
            if (match === 'text-base') return 'text-[17px]';
        }
        if (match === 'text-xs') return 'text-sm';
        if (match === 'text-sm') return 'text-base';
        if (match === 'text-base') return 'text-lg';
        return match;
    });

    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
    }
});

console.log('Class replacement completed.');
