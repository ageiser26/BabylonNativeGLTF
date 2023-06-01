/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 module.exports = {
  resolver: {
    assetExts: ['gltf', 'glb', 'jpg', 'png', 'jpeg', 'gif', 'bmp', 'tiff', 'bin', 'ttf', 'test'],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
  },
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, 
      },
    }),
  }
};
