import React, {useEffect, useReducer, useState} from 'react';

import {SafeAreaView, StatusBar, Text} from 'react-native';
import RNFS from 'react-native-fs';
import EngineScreen from './components/EngineScreen';
import {LogBox} from 'react-native';
import StaticServer from 'react-native-static-server';

const App = () => {
  const path = RNFS.MainBundlePath + '/www';
  console.log('Path::: ', path);
  const server = new StaticServer(8080, path);
  server.start().then((url: any) => {
    console.log(url);
  });

  const [screen, setScreen] = useState('Home');

  const navigate = (selectedScreen: string) => {
    console.log('navigate to ' + screen);

    setScreen(selectedScreen);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <EngineScreen style={{flex: 1}} />
      </SafeAreaView>
    </>
  );
};

export default App;
