import * as client from 'scp2';

import config from './deployment.config';

function deploy(endpoint: any): void {
  const devPlatform = process.env.DEV_PLATFORM;
  endpoint.copyPaths.forEach((filePath) => {
    const {
      pathTransform,
      projectPath,
      serverSuffix,
    } = config.platform[devPlatform];

    if (projectPath) {
      const { user, password, host, path } = endpoint;
      const remotePath = `${host}${serverSuffix}:${path}${filePath}`;
      let localPath = `${projectPath}/${filePath}`;
      if (pathTransform instanceof Function) {
        localPath = pathTransform(localPath);
      }

      const uri = `${user}:${password}@${remotePath}`;

      const getTime = () => (new Date()).getTime();
      const start = getTime();

      client.scp(localPath, uri, (err: Error) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${host} [${getTime() - start} ms]: copied ${localPath} to ${remotePath}`);
        }
      });
    } else {
      console.error(`No DEV_PLATFORM set for ${devPlatform || 'this environment'}.`);
    }
  });
}

deploy(config.controller);
deploy(config.server);
