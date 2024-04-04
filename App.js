import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/Main';
import Calsi from './src/Calsi';
import Calsi1 from './src/Calsi1'
import Singup from './src/Signup';
import Upload from './src/Upload';
import Login from './src/Login';
import forgotpassword from './src/forgotpassword'
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import HomeScreen from './src/HomeScreen';
import DetailScreen from './src/DetailScreen';
import ImageScreen from './src/ImageScreen';
import Profile from './src/Profile';
import ImageScreen1 from './src/ImageScreen1';
import Contacts from './src/Contacts';


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Signup" component={Singup}/>
        <Stack.Screen name="Calsi" component={Calsi} />
        <Stack.Screen name="Calsi1" component={Calsi1}/>
        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="forgotpassword" component={forgotpassword} />
        {/* <Stack.Screen name="Upload" component={Upload} /> */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
        <Stack.Screen name="ImageScreen1" component={ImageScreen1} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Contacts" component={Contacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

