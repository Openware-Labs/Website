const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const EXCLUDED_DIRS = [
    ".git",
    "node_modules",
];

const EXCLUDED_FILES = [
    ".gitignore",
    "vercel.json",
];

function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(1) + " KB";
    if (bytes < 1024 * 1024 * 1024)
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";

    return (bytes / (1024 ** 3)).toFixed(1) + " GB";
}

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function getEntries(directory) {
    return fs.readdirSync(directory, {
        withFileTypes: true
    }).filter(entry => {
        if (entry.isDirectory()) {
            return !EXCLUDED_DIRS.includes(entry.name);
        }

        if (entry.isFile()) {
            return !EXCLUDED_FILES.includes(entry.name);
        }

        return true;
    });
}

function generateIndex(directory) {
    const entries = getEntries(directory);

    const folders = entries.filter(entry =>
    entry.isDirectory()
    );

    const files = entries.filter(entry =>
    entry.isFile() && entry.name !== "index.html"
    );

    let rows = `
    <tr>
    <td><a href="./index.html">./</a></td>
    <td>-</td>
    <td>-</td>
    </tr>
    `;

    if (directory !== ROOT) {
        rows += `
        <tr>
        <td><a href="../index.html">../</a></td>
        <td>-</td>
        <td>-</td>
        </tr>
        `;
    }

    for (const folder of folders) {
        rows += `
        <tr>
        <td><a href="${encodeURIComponent(folder.name)}/index.html">${escapeHTML(folder.name)}/</a></td>
        <td>-</td>
        <td>-</td>
        </tr>
        `;
    }

    for (const file of files) {
        const fullPath = path.join(directory, file.name);
        const stats = fs.statSync(fullPath);

        const modified = stats.mtime
        .toISOString()
        .replace("T", " ")
        .slice(0, 19);

        rows += `
        <tr>
        <td><a href="${encodeURIComponent(file.name)}">${escapeHTML(file.name)}</a></td>
        <td>${modified}</td>
        <td>${formatSize(stats.size)}</td>
        </tr>
        `;
    }

    const relativePath = path.relative(ROOT, directory)
    .split(path.sep)
    .filter(Boolean);

    const url = "/" + relativePath
    .map(encodeURIComponent)
    .join("/");

    const title = "Index of " + (url === "/" ? "/" : url);

    const html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

    <html>
    <head>
    <title>${escapeHTML(title)}</title>
    <meta http-equiv="Content-Type"
    content="text/html; charset=UTF-8">
    </head>

    <body bgcolor="#FFFFFF" text="#000000"
    link="#0000EE" vlink="#551A8B">

    <h1>${escapeHTML(title)}</h1>

    <table border="0" cellpadding="4" cellspacing="0">
    <tr>
    <th align="left">Name</th>
    <th align="left">Last modified</th>
    <th align="left">Size</th>
    </tr>

    <tr>
    <td colspan="3"><hr></td>
    </tr>

    ${rows}
    </table>

    <hr>

    <address>
    Openware Labs Server
    </address>

    </body>
    </html>`;

    fs.writeFileSync(
        path.join(directory, "index.html"),
                     html
    );

    console.log("[INDEX] Generated: " + (url || "/"));

    for (const folder of folders) {
        generateIndex(path.join(directory, folder.name));
    }
}

function scanDirectories(directory) {
    const entries = getEntries(directory);

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const fullPath = path.join(directory, entry.name);

        generateIndex(fullPath);
    }
}

console.log("[INDEX] Scanning Website directories...\n");

generateIndex(ROOT);

console.log("\n[INDEX] Generation complete.");
