import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './Background';

const Login = ({ navigation }) => {
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Retrieve the stored password
    const storedPassword = await AsyncStorage.getItem('password');

    if (password === storedPassword) {
      // Login successful, navigate to the logged-in screen
      navigation.navigate('Login');
      navigation.navigate('Main');
    } else {
      // Login failed, display an error message or take appropriate action
      console.log('Login failed');
      alert("Incorrect Password. Please try again");
    }
  };

  const handleForgotPassword = () => {
    // Navigate to the signup page (password reset page)
    navigation.navigate('forgotpassword');
  };

  return (
    <Background>
      <View style={{ alignItems: "center", width: 405 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'azure', fontSize: 64, paddingTop: 30 }}>Welcome</Text>
          <Text style={{ color: 'azure', fontSize: 64 }}>Back</Text>

          <View style={{
            backgroundColor: 'white', height: 440, width: 395,
            borderTopLeftRadius: 200, borderBottomRightRadius: 200, alignItems: 'center', paddingTop: 50
          }}>
            <Text style={{ color: "purple", fontSize: 60, fontWeight: 'bold' }}>Enter your</Text>
            <Text style={{ color: "purple", fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>Password</Text>

            <View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
                placeholderTextColor="purple"
              />
            </View>

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={{ color: "purple", fontSize: 15, fontWeight: 'bold', marginBottom: 30 }}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingTop: 40, paddingLeft: 0 }}>
          <TouchableOpacity onPress={handleLogin} style={{
            backgroundColor: 'white', width: 150, height: 40,
            borderRadius: 30, flex: 1, justifyContent: 'center', alignItems: 'center',
          }}>
            <Text style={{ color: "#00008B", fontSize: 20 }}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 240,
    height: 40,
    borderColor: '#00008B',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: 'black',
    paddingBottom: 10,
  },
});

export default Login;
