import { defineConfig } from 'tsup';
import { dependencies, devDependencies, peerDependencies } from './package.json';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  external: [...Object.keys(peerDependencies), ...Object.keys(devDependencies)],
  noExternal: Object.keys(dependencies),
  dts: true,
  treeshake: true,
  clean: true,
});
