const http = require('http');
const fs = require('fs');
const url = require('url');
const post = process.argv[2]

if (!post) {
    console.log('请指定端口号')
    process.exit(1);
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathWithQuery = req.url;
    let queryStr = '';
    if (pathWithQuery.indexOf('?') >= 0) {
        queryStr = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    const path = parsedUrl.pathname;

    console.log(`请求路径为: ${pathWithQuery}`);

    res.statusCode = 200;
    const filePath = path === '/' ? 'index.html' : path;
    const index = filePath.lastIndexOf('.');
    const suffix = filePath.substring(index);
    const fileTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
    }

    res.setHeader('Content-Type',
        `${fileTypes[suffix] || 'text/html'};charset=utf-8`);
    let content;
    try {
        content = fs.readFileSync(`./public/${filePath}`);
    } catch (error) {
        content = '文件不存在';
        res.statusCode = 404;
    }
    res.write(content);
    res.end();
})

server.listen(post);
console.log('监听 ' + post + ' 成功\n请打开 http://localhost:' + post);