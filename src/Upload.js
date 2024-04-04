// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, Image, TouchableOpacity, Text, TextInput, Button, Alert } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Corrected import
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// export default function Profile() {
//   const navigation = useNavigation(); // Initialize navigation
//   const [imageData, setImageData] = useState([]);
//   const [photoNames, setPhotoNames] = useState([]);
//   const [photoDetails, setPhotoDetails] = useState([]);
//   // navigation.navigate('DetailScreen', { name, imageUrl, address, phoneNumber });

//   useEffect(() => {
//     // Load the data from AsyncStorage when the component mounts
//     loadFromStorage();
//   }, []);

//   const saveToStorage = async () => {
//     try {
//       // Save the data to AsyncStorage
//       await AsyncStorage.setItem('imageData', JSON.stringify(imageData));
//       await AsyncStorage.setItem('photoNames', JSON.stringify(photoNames));
//       await AsyncStorage.setItem('photoDetails', JSON.stringify(photoDetails));
//     } catch (error) {
//       console.error('Error saving data to AsyncStorage:', error);
//     }
//   };

//   const loadFromStorage = async () => {
//     try {
//       // Load the data from AsyncStorage
//       const loadedImageData = JSON.parse(await AsyncStorage.getItem('imageData'));
//       const loadedPhotoNames = JSON.parse(await AsyncStorage.getItem('photoNames'));
//       const loadedPhotoDetails = JSON.parse(await AsyncStorage.getItem('photoDetails'));

//       if (loadedImageData && loadedPhotoNames && loadedPhotoDetails) {
//         setImageData(loadedImageData);
//         setPhotoNames(loadedPhotoNames);
//         setPhotoDetails(loadedPhotoDetails);
//       }
//     } catch (error) {
//       console.error('Error loading data from AsyncStorage:', error);
//     }
//   };

//   const pickImage = async (index) => {
//     try {
//       const response = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images],
//       });

//       const updatedImageData = [...imageData];
//       updatedImageData[index] = response;
//       setImageData(updatedImageData);

//       // Save the updated data to AsyncStorage
//       saveToStorage();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleNameChange = (index, text) => {
//     const updatedNames = [...photoNames];
//     updatedNames[index] = text;
//     setPhotoNames(updatedNames);

//     // Save the updated data to AsyncStorage
//     saveToStorage();
//   };

//   const handleDetailsChange = (index, text) => {
//     const updatedDetails = [...photoDetails];
//     updatedDetails[index] = text;
//     setPhotoDetails(updatedDetails);

//     // Save the updated data to AsyncStorage
//     saveToStorage();
//   };

//   const addNewSector = () => {
//     // Add a new sector by extending the state arrays with default values
//     setImageData([...imageData, null]);
//     setPhotoNames([...photoNames, '']);
//     setPhotoDetails([...photoDetails, '']);

//     // Save the updated data to AsyncStorage
//     saveToStorage();
//   };

//   const deleteSector = (index) => {
//     // Ask for confirmation before deleting
//     Alert.alert(
//       'Confirm Deletion',
//       'Are you sure you want to delete this sector?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           onPress: () => {
//             // Create new arrays excluding the sector to be deleted
//             const updatedImageData = [...imageData];
//             updatedImageData.splice(index, 1);
//             setImageData(updatedImageData);

//             const updatedNames = [...photoNames];
//             updatedNames.splice(index, 1);
//             setPhotoNames(updatedNames);

//             const updatedDetails = [...photoDetails];
//             updatedDetails.splice(index, 1);
//             setPhotoDetails(updatedDetails);

//             // Save the updated data to AsyncStorage
//             saveToStorage();
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         {imageData.map((image, index) => (
          
//           <View key={index} 
//             style={{ width: '50%', padding: 10 }}>
//             <TouchableOpacity
//             onPress={() => {
//               // Navigate to ImageScreen and pass the necessary data as params
//               navigation.navigate('ImageScreen', {
//                 name: photoNames[index],
//                 details: photoDetails[index],
//                 imageUrl: image.uri,
//                 address: 'whitefiled banglore 560066', // Add the address data if you have it
//                 phoneNumber: '8884882321', // Add the phone number data if you have it
//               });
//             }}
//             >
//             <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'blue' }}>
//             Person {index + 1}
//             </Text>
//             </TouchableOpacity>
//             {image ? (
//               <Image
//                 source={{ uri: image.uri }}
//                 style={{ width: '100%', height: 200, resizeMode: 'cover' }}
//               />
             
//             ) : (
//               // <TouchableOpacity onPress={() => pickImage(index)}>
//                 <View
//                   style={{
//                     width: '100%',
//                     height: 200,
//                     borderWidth: 1,
//                     borderColor: 'lightgray',
//                     alignItems: 'center',
//                     justifyContent: 'center',
                    
//                   }}
                  
//                 >
                  
//                   <Text>Add Photo</Text>
//                 </View>
              
//             )}
//             <TextInput
//               placeholder="Name"
//               value={photoNames[index]}
//               onChangeText={(text) => handleNameChange(index, text)}
//               style={{ textAlign: 'center' }}
//               multiline={true}
//             />
//             <TextInput
//               placeholder="Details"
//               value={photoDetails[index]}
//               onChangeText={(text) => handleDetailsChange(index, text)}
//               style={{
//                 textAlign: 'center',
//                 height: 80,
//               }}
//               multiline={true}
//             />
//             <Button title="Delete" onPress={() => deleteSector(index)} />
//             {/* </TouchableOpacity> */}
//             <View style={{ borderBottomWidth: 1, borderBottomColor: 'blue' }} />
//             </View>
            
//         ))}
//         <Button title="Add Images..." onPress={addNewSector} />
//       </View>
    
//     </ScrollView>
//   );
// }
// ButtonComponent.js













// import React from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const Upload = () => {
//   const navigation = useNavigation();

//   const handleButtonPress = () => {
//     // Navigate to the Profile screen
//     navigation.navigate('Profile');
//     // navigation.navigate('Contacts');
//   };
  

//   return (
//     <View style={styles.container}>
//       <Button title="Go to Profile" onPress={handleButtonPress} />
//       <Button title="Go to Contacts" onPress={handleButtonPress} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 0,
    
//   },
// });

// export default Upload;






// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// const Upload = () => {
//   const navigation = useNavigation();

//   const handleViewPress = (personNumber) => {
//     // Navigate to 'ImageScreen' with parameters for the respective person
//     navigation.navigate('ImageScreen', {
//       name: `Person ${personNumber} Name`,
//       details: `Details for Person ${personNumber}`,
//       imageUrl: `URL for Person ${personNumber}`, // Replace with the correct URL
//       address: 'whitefield Bangalore 560066',
//       phoneNumber: '8884882321',
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {[1, 2, 3, 4, 5].map((number) => (
//         <TouchableOpacity
//           key={number}
//           style={styles.button}
//           onPress={() => handleViewPress(number)}
//         >
//           <Text style={styles.buttonText}>View {number}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 20,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
// });

// export default Upload;





// Upload.js
// import React from 'react';
// import { View, StyleSheet } from 'react-native';

// const Upload = () => {
//   return (
//     <View style={styles.container}>
//       {/* Removed the "View" buttons */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Upload;





// import React from 'react';
// import { View, Button } from 'react-native';

// const Upload = ({ navigation }) => {
//   const handlePress = () => {
//     // Navigate to the Contacts screen
//     navigation.navigate('Contacts');
//   };

//   return (
//     <View>
//       <Button title="Go to Contacts" onPress={handlePress} />
//     </View>
//   );
// };

// export default Upload;
