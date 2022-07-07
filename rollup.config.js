export default [
  {
    input: './src/y-websocket.js',
    external: id => /^(lib0|yjs|y-protocols)/.test(id),
    output: [{
      name: 'y-websocket',
      file: './dist/y-websocket.cjs',
      format: 'cjs',
      sourcemap: true,
      paths: path => {
        if (/^lib0\//.test(path)) {
          return `lib0/dist${path.slice(4)}.cjs`
        } else if (/^y-protocols\//.test(path)) {
          return `y-protocols/dist${path.slice(11)}.cjs`
        }
        return path
      }
    }]
  },
  {
    input: './src/server/utils.js',
    external: () => true,
    output: [{
      file: './dist/server/utils.cjs',
      format: 'cjs',
      sourcemap: true,
      paths: path => {
        if (/^lib0\//.test(path)) {
          return `lib0/dist${path.slice(4)}.cjs`
        } else if (/^y-protocols\//.test(path)) {
          return `y-protocols/dist${path.slice(11)}.cjs`
        } else if (path === `${__dirname}/src/server/callback.js`) {
          return './callback.js'
        }
        return path
      }
    }]
  },
  {
    input: './src/server/callback.js',
    external: () => true,
    output: [{
      file: './dist/server/callback.cjs',
      format: 'cjs',
      sourcemap: true,
      paths: path => {
        if (/^lib0\//.test(path)) {
          return `lib0/dist${path.slice(4)}.cjs`
        } else if (/^y-protocols\//.test(path)) {
          return `y-protocols/dist${path.slice(11)}.cjs`
        } else if (path === `${__dirname}/src/server/utils.js`) {
          return './utils.js'
        }
        return path
      }
    }]
  }
]
