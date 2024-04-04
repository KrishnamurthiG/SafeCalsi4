import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './Background';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Please make sure your passwords match.');
      return;
    }

    // Store the user's data (username and password) securely
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('password', password);

    // Navigate to the Login screen
    navigation.navigate('Calsi');
  };

  return (
    <Background>
      <View style={{ alignItems: "center", width: 405 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'azure', fontSize: 64, paddingTop: 30 }}>Welcome to</Text>
          <Text style={{ color: 'azure', fontSize: 64 }}>Safe Calsi</Text>

          <View style={{
            backgroundColor: 'white', height: 440, width: 395,
            borderTopLeftRadius: 200, borderBottomRightRadius: 200, alignItems: 'center', paddingTop: 50
          }}>
            <Text style={{ color: "purple", fontSize: 65, fontWeight: 'bold', marginBottom: 20 }}>Register</Text>

            <TextInput
              style={styles.input}
              placeholder="Email/Username"
              onChangeText={text => setUsername(text)}
              value={username}
              placeholderTextColor="purple"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry
              placeholderTextColor="purple"
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry
              placeholderTextColor="purple"
            />
          </View>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingTop: 40, paddingLeft: 0 }}>
          <TouchableOpacity onPress={handleSignup} style={{
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

export default Signup;
