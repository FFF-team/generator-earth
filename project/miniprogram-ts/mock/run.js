const path = require('path');
const fs = require('fs');
const vm = require('vm');
const Koa = require('koa');
const mimeType = require('./mimeType');
const devConf = require('../config/dev');

const app = new Koa();

// app.use(cors());

app.use((koaCtx) => {
    function out(ctx, content, type) {
        const { callback } = ctx.query;

        if (type) {
            ctx.set('Content-Type', `${type};charset=UTF-8;`);
        }

        if (callback) {
            // ctx.write(callback+"("+content+");");
            return `${callback}(${content});`;
        }

        // ctx.write(content);
        // ctx.body = content;
        return content;
    }

    function mock(ctx, file) {
        console.log(`mock ${ctx.path};${file}`);
        const ext = path.extname(file);

        if (ext === '.js') {
            return runMockFile(ctx, file);
        }

        if (ext === '.json') {
            const content = fs.readFileSync(file);

            return outputJson(ctx, content);
        }
        // res.sendFile(file)
    }

    function runMockFile(ctx, file) {
        fs.readFile(file, {
            charset: 'utf-8',
        }, (err, content) => {
            if (err) {
                return out(ctx, err.message, 'text/html');
            }

            const exports = {};
            const sandbox = {
                req: ctx.request,
                res: ctx.response,
                exports: exports,
                module: { exports: exports },
            };

            try {
                vm.runInNewContext(content, sandbox);

                return out(ctx, JSON.stringify(sandbox.module.exports), mimeType.json);
            } catch (e) {
                return out(ctx, e.message, 'text/html');
            }
        });
    }

    function outputJson(ctx, content) {
        const sandbox = {
            result: {},
        };

        try {
            vm.runInNewContext(`result = (${content});`, sandbox);
            const json = JSON.stringify(sandbox.result);

            return out(ctx, json, mimeType.json);
        } catch (e) {
            return out(ctx, e.message, 'text/html');
        }
    }

    const rPath = path.join(__dirname, `/db${koaCtx.path}.json`);

    if (fs.existsSync(rPath)) {
        if (!fs.statSync(rPath).isDirectory()) {
            const content = mock(koaCtx, rPath);

            koaCtx.body = content;
        }
    }
});


const port = devConf.mockPort || 3001;

app.listen(port);
