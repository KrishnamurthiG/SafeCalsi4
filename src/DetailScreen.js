import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { name, imageUrl, address, phoneNumber } = route.params;



  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, []);

  const handleCallButtonPress = () => {

    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Name: {name}</Text>
      <Image source={imageUrl} style={styles.profileImage} />

      <Text style={styles.boldText}>Address:</Text>
      <Text style={styles.addressText}>{address}</Text>
      <Text style={styles.boldText}>Phone Number:</Text>
      <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
      <Text style={styles.infoText}>Saw this Person anywhere??</Text>
      <Text style={styles.infoText}>(If Yes, Inform us by Clicking the Below Button!!!)</Text>


      <TouchableOpacity
        style={styles.callButton}
        onPress={handleCallButtonPress}
      >
        <Text style={styles.buttonText}>Call and Inform</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 380,
    height: 380,
    borderRadius: 30,
    marginBottom: 20,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    paddingBottom: 25,
  },
  boldText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addressText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    alignItems: 'center',
    alignContent: 'center'
  },
  phoneNumberText: {
    color: 'white',
  },
  infoText: {
    color: 'green',
    fontSize: 12,
    marginTop: 5,
  },
  callButton: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetailScreen;
