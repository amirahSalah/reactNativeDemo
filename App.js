/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  Header,
} from 'react-native/Libraries/NewAppScreen';

// material UI paper sheet for react native
import { Provider as PaperProvider } from "react-native-paper";


// app navigation and routing
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QueryScreen from './components/QueryBuilder';
import GraphsScreen from './components/GraphicalReports';




const App: () => Node = () => {

  //create routing history for the app navigation
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Header />
        <Stack.Navigator>
          <Stack.Screen
            name="Query"
            component={QueryScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen 
            name="Graphs" 
            component={GraphsScreen}
            options={{ title: 'Graphical Reports' }}
          />
        </Stack.Navigator>        
      </NavigationContainer>  
    </PaperProvider>
  );
};

export default App;
