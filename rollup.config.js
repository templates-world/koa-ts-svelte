import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';
import svelte from 'rollup-plugin-svelte';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

import kill from 'tree-kill';
import chokidar from 'chokidar';
import chalk from 'chalk';
import open from 'open';

import { config as loadDotenv } from 'dotenv';

loadDotenv();

const production = !process.env.ROLLUP_WATCH;
const { PORT } = process.env;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		// ========= Utilities =========
        buildTypescript(),

        // ========= Svelte Compilation =========
        svelte({
            dev: !production,
            css: css => {
                css.write('public/build/bundle.css');
            }
        }),
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),

        // ========= Dev server =========
        !production && serve(),
        !production && livereload('public'),

        // ========= Production build =========
        production && buble({ // Support old versions and IE11
            transforms: { dangerousForOf: true }
        }),
        production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function buildTypescript() {
	let started = false;
	return {
		buildStart() {
			if (!production && !started) {
				started = true;
				require('child_process').spawn('tsc', ['--watch'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			} else {
                require('child_process').spawn('tsc', [], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
            }
		}
	};
}

function serve() {
    let started = false;
    let server;
	return {
		buildEnd() {
			if (!started) {
                started = true;
                open('http://localhost:' + PORT);
                chokidar.watch('dist').addListener('change', () => {
                    if (server) kill(server.pid);
                    server = startServer();
                    console.log(chalk.green('> Server listening at ') + chalk.bold.blueBright('http://localhost:' + PORT));
                });
			}
		}
	};
}

function startServer() {
    return require('child_process').spawn('node', ['dist'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
    });
}