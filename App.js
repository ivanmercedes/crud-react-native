import 'react-native-gesture-handler';
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Home from './views/Home';
import ClientDetails from './views/ClientDetails';
import NewClient from './views/NewClient';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// Definir tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};
// console.log(theme.colors);
const App = () => {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.surface,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          options={({navigation, route}) => ({
            headerTitleAlign: 'center',
            // headerLeft: props => <Bar {...props} navigation={navigation} route={roue} />
            
          })}
          component={Home}
        />
        <Stack.Screen name="NewClient"  options={{ title: '' }} component={NewClient} />
        <Stack.Screen name="ClientDetail"  options={{ title: 'Client Details' }} component={ClientDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
