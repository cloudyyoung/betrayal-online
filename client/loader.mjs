import { resolve as resolveTs } from 'ts-node/esm/transpile-only.mjs'
import * as path from 'path';
import { pathToFileURL } from 'url';
import { fileURLToPath } from 'url';
import fs from 'fs';

export { load, transformSource, getFormat } from 'ts-node/esm/transpile-only.mjs'

export async function resolve(specifier, ctx, defaultResolve) {
    // Fix boardgame.io imports to use CJS paths
    if (specifier === 'boardgame.io/server') {
        return {
            url: pathToFileURL(path.resolve('./node_modules/boardgame.io/dist/cjs/server.js')).href,
            shortCircuit: true
        };
    }
    if (specifier === 'boardgame.io/core') {
        return {
            url: pathToFileURL(path.resolve('./node_modules/boardgame.io/dist/cjs/core.js')).href,
            shortCircuit: true
        };
    }

    // Add .js extension to relative imports if missing
    if (specifier.startsWith('./') || specifier.startsWith('../')) {
        const parentURL = ctx.parentURL;
        if (parentURL) {
            const parentPath = fileURLToPath(parentURL);
            const parentDir = path.dirname(parentPath);
            let resolvedPath = path.resolve(parentDir, specifier);

            // Check if file exists with .js extension
            if (!fs.existsSync(resolvedPath) && fs.existsSync(resolvedPath + '.js')) {
                return {
                    url: pathToFileURL(resolvedPath + '.js').href,
                    shortCircuit: true
                };
            }
        }
    }

    return resolveTs(specifier, ctx, defaultResolve);
}