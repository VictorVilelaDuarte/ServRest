import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import './config/ReactotronConfig';

import App from './App';

export default function src() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#552C6E" />
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </>
  );
}
