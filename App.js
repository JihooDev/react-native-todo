/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import TodoList from './component/TodoList';


const App = () => {

  const [data, setData] = useState([
    {
    id: 0,
    content: "1번 일기",
    }
  ])


  return (
    <SafeAreaView>
      <TodoList data={data} setData={setData} />
    </SafeAreaView>
  );
};


export default App;
