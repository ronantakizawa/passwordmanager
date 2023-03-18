import * as React from 'react';
import {StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './pages/Home'
import Login from "./pages/Login"
import NewPassword from "./pages/NewPassword"
import NewUser from "./pages/NewUser"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  
  const Stack = createNativeStackNavigator();
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NewUser">
          <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            headerBackVisible:false,
          }}
         />
         <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerBackVisible:false,
          }}
          
         /> 
         <Stack.Screen 
          name="NewPassword" 
          component={NewPassword} 
         /> 
         <Stack.Screen 
          name="NewUser" 
          component={NewUser} 
         /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  gear: {
    paddingBottom:10

},

})