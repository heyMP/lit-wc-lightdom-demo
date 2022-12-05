// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import { litCss } from 'web-dev-server-plugin-lit-css';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: '/demo/',
  /** Use regular watch mode if HMR is not enabled. */
  watch: !hmr,
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  // appIndex: 'demo/index.html',
  mimeTypes: {
    // serve .module.css files as js
    '**/*-copy.css': 'css',
  },


  plugins: [
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
    litCss({
      exclude: ['**/*.css'],
      exclude: ['**/*-copy.css']
    }),
  ],

  // See documentation for all available options
});
