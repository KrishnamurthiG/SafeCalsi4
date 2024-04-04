

// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// export default function ImageScreen({ route }) {
//   const { name, details, imageUrl, address, phoneNumber } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.nameText}>Name: {name}</Text>
//       <View style={{ marginTop: 10, marginBottom: 10 }}>
//         <Image source={{ uri: imageUrl }} style={styles.image} />
//       </View>
//       <Text style={styles.boldText}>Details: {details}</Text>
//       <Text style={styles.boldText}>Address: {address}</Text>
//       <Text style={styles.boldText}>Phone Number: {phoneNumber}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'black',
//   },
//   nameText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   boldText: {
//     fontSize: 16,
//     color: 'white',
//     fontWeight: 'bold', // Add fontWeight: 'bold' to make text elements bold
//   },
//   image: {
//     width: 300,
//     height: 340,
//     resizeMode: 'cover',
//     borderRadius: 30,
//   },
// });





// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function ImageScreen({ route }) {
//   const { name, details, imageUrl, address, phoneNumber } = route.params;
//   const navigation = useNavigation();

//   // State to store person data
//   const [personData, setPersonData] = useState({ name: '', details: '', imageUrl: '', address: '', phoneNumber: '' });

//   useEffect(() => {
//     // Update state when route parameters change
//     setPersonData({ name, details, imageUrl, address, phoneNumber });
//   }, [name, details, imageUrl, address, phoneNumber]);

//   const handleConfirmPress = () => {
//     navigation.navigate('Main');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.nameText}>Name: {personData.name}</Text>
//       <View style={{ marginTop: 10, marginBottom: 10 }}>
//         {personData.imageUrl !== '' ? (
//           <Image source={{ uri: personData.imageUrl }} style={styles.image} />
//         ) : (
//           <Text>No Image Available</Text>
//         )}
//       </View>
//       <Text style={styles.boldText}>Details: {personData.details}</Text>
//       <Text style={styles.boldText}>Address: {personData.address}</Text>
//       <Text style={styles.boldText}>Phone Number: {personData.phoneNumber}</Text>
//       <View style={{ marginTop: 50 }}>
//         <Button title="Back" onPress={handleConfirmPress} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'black',
//   },
//   nameText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   boldText: {
//     fontSize: 16,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   image: {
//     width: 300,
//     height: 340,
//     resizeMode: 'cover',
//     borderRadius: 30,
//   },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ImageScreen({ route }) {
  const { name, details, imageUrl, address, phoneNumber } = route.params;
  const navigation = useNavigation();

  // State to store person data
  const [personData, setPersonData] = useState({ name: '', details: '', imageUrl: '', address: '', phoneNumber: '' });

  // Add this log statement inside the ImageScreen component
  useEffect(() => {
    console.log('Image URL:', imageUrl);
    // Update state when route parameters change
    setPersonData({ name, details, imageUrl, address, phoneNumber });
  }, [name, details, imageUrl, address, phoneNumber]);

  const handleConfirmPress = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boldBlueText}>Name: {personData.name}</Text>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>
      <Text style={styles.boldBlueText}>Details: </Text>
      <Text style={styles.normalText}>{personData.details}</Text>
      <Text style={styles.boldBlueText}>Address: </Text>
      <Text style={styles.normalText}>{personData.address}</Text>
      <Text style={styles.boldBlueText}>Phone Number: </Text>
      <Text style={styles.normalText}>{personData.phoneNumber}</Text>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity
          onPress={handleConfirmPress}
          style={{
            backgroundColor: '#00008B',
            width: 150,
            height: 40,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  boldBlueText: {
    fontSize: 16,
    color: '#00008B',
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: 16,
    color: 'black',
  },
  image: {
    width: 300,
    height: 340,
    resizeMode: 'cover',
    borderRadius: 30,
  },
});
