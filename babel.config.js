module.exports = function(api) {
  api.cache(true);
  const web = ['scripts', 'start'].every( thing => process.argv[1].includes(thing))
  const plugins = [ ]

  if(!web) plugins.push([
    'babel-plugin-module-resolver',
    {
      alias: {
        'react-native-vector-icons': '@expo/vector-icons',
      },
    },
  ])

  return {
    presets: [ 'module:metro-react-native-babel-preset' ],
    plugins
  };
};
