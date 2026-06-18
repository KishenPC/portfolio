module.exports = {
  apps: [
    {
      name: 'structured-portfolio',
      script: 'node_modules/.bin/next',
      args: 'start',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
