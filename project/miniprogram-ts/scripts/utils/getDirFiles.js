const path = require('path');
const fs = require('fs');

/**
 *
 * @param dirPath 获取目标文件目录
 */

function getDirFiles(dirPath) {
    const dir = path.normalize(dirPath);

    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);
    const fileList = [];

    files.forEach((fileName) => {
        const filePath = path.join(dir, fileName);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isFile()) {
            fileList.push(fileName);
        } else {
            const FileRecursive = getDirFiles(filePath);

            fileList.concat(FileRecursive);
        }
    });

    return fileList;
}

module.exports = getDirFiles;
