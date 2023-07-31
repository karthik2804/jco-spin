import ignore from "rollup-plugin-ignore"
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'handler.ts',
	output: {
		file: 'dist/bundle.js',
	},
	plugins: [ignore(["sendRequest, Config"]), nodeResolve(), typescript({
		tsconfig: './tsconfig.json',
		declaration: true,
		declarationDir: 'dist',
	})],
};