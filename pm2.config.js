module.exports = {
  apps: [
    {
      name: 'daily kurly api',
      script: 'dist/src/index.js',
      node_args: '-r dotenv/config',
    },
  ],
}
