const remote = {
  password: 'autobot',
  path: '/home/dinobot/zynet/',
  user: 'dinobot',
};
const copyPaths = [
  'core/config.ts',
  'core/models/',
  'core/constants/',
  'package.json',
];

function remoteConfig(host: string, paths: string[]) {
  return {
    host,
    copyPaths: paths.concat(copyPaths),
    password: remote.password,
    path: remote.path,
    user: remote.user,
  };
}

export default {
  controller: remoteConfig('swoop', ['controller/']),
  server: remoteConfig('grimlock', ['server/']),
  platform: {
    osx: {
      projectPath: '/Users/andy/projects/zynet',
      serverSuffix: '.local',
    },
    windows: {
      pathTransform: (path) => path.replace(/\//g, '\\'),
      projectPath: 'C:\\projects\\zynet',
    }
  }
};
