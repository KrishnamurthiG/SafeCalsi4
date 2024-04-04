// previous uploading code

// import React, { useState } from 'react';
// import { View, Text, Button, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';
// import { useNavigation } from '@react-navigation/native';

// export default function Upload() {
//   const [imageData, setImageData] = useState([]);
//   const [fullImgRefPaths, setFullImgRefPaths] = useState([]);
//   const [photoNames, setPhotoNames] = useState([]);
//   const [photoDetails, setPhotoDetails] = useState([]);
//   const navigation = useNavigation();

//   const pickImage = async () => {
//     try {
//       const response = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images],
//       });

//       const imageName = `my_image_${imageData.length + 1}.jpg`;
//       const destPath = `${RNFS.DocumentDirectoryPath}/${imageName}`;

//       await RNFS.copyFile(response.uri, destPath);

//       setImageData([...imageData, response]);
//       setFullImgRefPaths([...fullImgRefPaths, destPath]);
//       setPhotoNames([...photoNames, '']);
//       setPhotoDetails([...photoDetails, '']);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteImage = async (index) => {
//     try {
//       if (fullImgRefPaths[index]) {
//         await RNFS.unlink(fullImgRefPaths[index]); // Delete the image file
//         const updatedImageData = [...imageData];
//         updatedImageData.splice(index, 1);
//         setImageData(updatedImageData);
//         const updatedPaths = [...fullImgRefPaths];
//         updatedPaths.splice(index, 1);
//         setFullImgRefPaths(updatedPaths);
//         const updatedPhotoNames = [...photoNames];
//         updatedPhotoNames.splice(index, 1);
//         setPhotoNames(updatedPhotoNames);
//         const updatedPhotoDetails = [...photoDetails];
//         updatedPhotoDetails.splice(index, 1);
//         setPhotoDetails(updatedPhotoDetails);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const uploadImage = async (index) => {
//     if (fullImgRefPaths[index]) {
//       // Pass the image URI, name, and details to the ImageScreen using navigation state
//       navigation.navigate('ImageScreen', {
//         imageUri: fullImgRefPaths[index],
//         name: photoNames[index],
//         details: photoDetails[index],
//       });
//     }
//   };

//   const saveImage = async (index) => {
//     if (fullImgRefPaths[index]) {
//       const imageUri = fullImgRefPaths[index];
//       const imageName = photoNames[index] || `image_${index + 1}.jpg`;
//       const destPath = `${RNFS.DocumentDirectoryPath}/${imageName}`;

//       try {
//         await RNFS.copyFile(imageUri, destPath);
//         alert(`Image "${imageName}" saved successfully!`);
//         // After saving, navigate to the ImageScreen with the saved image
//         // navigation.navigate('ImageScreen', { imageUri: destPath });
//       } catch (err) {
//         console.log(err);
//         alert(`Error saving the image "${imageName}"`);
//       }
//     }
//   };


//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={{ alignItems: 'center', marginLeft: 0 }}>
//         {imageData.map((image, index) => (
//           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} key={index}>
//             <TouchableOpacity onPress={() => uploadImage(index)}>
//               <Image
//                 source={{ uri: image.uri }}
//                 style={{ height: 200, width: 200, marginBottom: 20 }}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => uploadImage(index)}>
//               <Text>Image {index + 1}</Text>
//             </TouchableOpacity>
//             <TextInput
//               placeholder="Name"
//               value={photoNames[index]}
//               onChangeText={(text) => {
//                 const updatedNames = [...photoNames];
//                 updatedNames[index] = text;
//                 setPhotoNames(updatedNames);
//               }}
//             />
//             <TextInput
//               placeholder="Details"
//               value={photoDetails[index]}
//               onChangeText={(text) => {
//                 const updatedDetails = [...photoDetails];
//                 updatedDetails[index] = text;
//                 setPhotoDetails(updatedDetails);
//               }}
//             />
//             <View
//               style={{
//                 width: '100%',
//                 flexDirection: 'row',
//                 justifyContent: 'space-around',
//                 marginBottom: 10,
//               }}
//             >
//               <Button title="Delete Image" onPress={() => deleteImage(index)} />
//               <Button title="Upload" onPress={() => uploadImage(index)} />
//               <Button title="Save" onPress={() => saveImage(index)} />
//             </View>
//           </View>
//         ))}
//         {imageData.length === 0 && <Text>No Images Found</Text>}
//         <Button title="Select Image" onPress={pickImage} />
//       </View>
//     </ScrollView>
//   );
// }










// import React, { useState, useEffect, useRef } from 'react';
// import { View, ScrollView, Image, TouchableOpacity, Text, TextInput, Button, Alert } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import ImageScreen1 from './ImageScreen1'; // Import the new component

// export default function Profile() {
//   const navigation = useNavigation();
//   const scrollViewRef = useRef(null);

//   const [imageData, setImageData] = useState([]);
//   const [photoNames, setPhotoNames] = useState([]);
//   const [photoDetails, setPhotoDetails] = useState([]);
//   const [photoAddresses, setPhotoAddresses] = useState([]);
//   const [photoPhoneNumbers, setPhotoPhoneNumbers] = useState([]);

//   useEffect(() => {
//     loadFromStorage();
//   }, []);

//   const saveToStorage = async () => {
//     try {
//       console.log('Saving data to AsyncStorage...');
//       await AsyncStorage.setItem('imageData', JSON.stringify(imageData));
//       await AsyncStorage.setItem('photoNames', JSON.stringify(photoNames));
//       await AsyncStorage.setItem('photoDetails', JSON.stringify(photoDetails));
//       await AsyncStorage.setItem('photoAddresses', JSON.stringify(photoAddresses));
//       await AsyncStorage.setItem('photoPhoneNumbers', JSON.stringify(photoPhoneNumbers));
//       console.log('Data saved successfully.');
//     } catch (error) {
//       console.error('Error saving data to AsyncStorage:', error);
//     }
//   };

//   const loadFromStorage = async () => {
//     try {
//       console.log('Loading data from AsyncStorage...');
//       const loadedImageData = JSON.parse(await AsyncStorage.getItem('imageData')) || [];
//       const loadedPhotoNames = JSON.parse(await AsyncStorage.getItem('photoNames')) || [];
//       const loadedPhotoDetails = JSON.parse(await AsyncStorage.getItem('photoDetails')) || [];
//       const loadedPhotoAddresses = JSON.parse(await AsyncStorage.getItem('photoAddresses')) || [];
//       const loadedPhotoPhoneNumbers = JSON.parse(await AsyncStorage.getItem('photoPhoneNumbers')) || [];

//       setImageData(loadedImageData);
//       setPhotoNames(loadedPhotoNames);
//       setPhotoDetails(loadedPhotoDetails);
//       setPhotoAddresses(loadedPhotoAddresses);
//       setPhotoPhoneNumbers(loadedPhotoPhoneNumbers);

//       console.log('Data loaded successfully.');
//     } catch (error) {
//       console.error('Error loading data from AsyncStorage:', error);
//     }
//   };

//   const pickImage = async (index) => {
//     try {
//       console.log('Picking image...');
//       const response = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images],
//       });

//       console.log('Response:', response);

//       const updatedImageData = [...imageData];
//       updatedImageData[index] = response;
//       setImageData(updatedImageData);

//       saveToStorage();
//     } catch (err) {
//       console.log('Error picking image:', err);
//     }
//   };

//   const handleNameChange = (index, text) => {
//     const updatedNames = [...photoNames];
//     updatedNames[index] = text;
//     setPhotoNames(updatedNames);

//     saveToStorage();
//   };

//   const handleDetailsChange = (index, text) => {
//     const updatedDetails = [...photoDetails];
//     updatedDetails[index] = text;
//     setPhotoDetails(updatedDetails);

//     saveToStorage();
//   };

//   const handleAddressChange = (index, text) => {
//     const updatedAddresses = [...photoAddresses];
//     updatedAddresses[index] = text;
//     setPhotoAddresses(updatedAddresses);

//     saveToStorage();
//   };

//   const handlePhoneNumberChange = (index, text) => {
//     const updatedPhoneNumbers = [...photoPhoneNumbers];
//     updatedPhoneNumbers[index] = text;
//     setPhotoPhoneNumbers(updatedPhoneNumbers);

//     saveToStorage();
//   };

//   const addNewSector = () => {
//     setImageData([...imageData, null]);
//     setPhotoNames([...photoNames, '']);
//     setPhotoDetails([...photoDetails, '']);
//     setPhotoAddresses([...photoAddresses, '']);
//     setPhotoPhoneNumbers([...photoPhoneNumbers, '']);

//     saveToStorage();
//   };

//   const deleteSector = (index) => {
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
//             const updatedImageData = imageData.filter((_, i) => i !== index);
//             setImageData(updatedImageData);
  
//             const updatedNames = photoNames.filter((_, i) => i !== index);
//             setPhotoNames(updatedNames);
  
//             const updatedDetails = photoDetails.filter((_, i) => i !== index);
//             setPhotoDetails(updatedDetails);
  
//             const updatedAddresses = photoAddresses.filter((_, i) => i !== index);
//             setPhotoAddresses(updatedAddresses);
  
//             const updatedPhoneNumbers = photoPhoneNumbers.filter((_, i) => i !== index);
//             setPhotoPhoneNumbers(updatedPhoneNumbers);
  
//             saveToStorage();
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };
  

//   const loadSelectedPersonDetails = async () => {
//     try {
//       const selectedPersonNumber = await AsyncStorage.getItem('selectedPersonNumber');
//       if (selectedPersonNumber) {
//         // Display details for the selected person
//         scrollViewRef.current.scrollToEnd();
//         scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
//       }
//     } catch (error) {
//       console.error('Error loading selected person details:', error);
//     }
//   };

//   return (
//     <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         {imageData.map((image, index) => (
//           <View key={index} style={{ width: '50%', padding: 10, borderWidth: 1, borderColor: 'blue', marginBottom: 10, borderRadius: 20 }}>
//             <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>{`Person ${index + 1}`}</Text>
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate('ImageScreen1', {
//                   name: photoNames[index],
//                   details: photoDetails[index],
//                   imageUrl: image?.uri,
//                   address: photoAddresses[index],
//                   phoneNumber: photoPhoneNumbers[index],
//                 });
//               }}
              
//             >
//               <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'blue' }}>View</Text>
//             </TouchableOpacity>
//             {image ? (
//               <Image source={{ uri: image.uri }} style={{ width: '100%', height: 200, resizeMode: 'cover' }} />
//             ) : (
//               <TouchableOpacity onPress={() => pickImage(index)}>
//                 <View style={{ width: '100%', height: 200, borderWidth: 1, borderColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}>
//                   <Text>Add Photo</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//             <TextInput
//               placeholder="Name"
//               value={photoNames[index]}
//               onChangeText={(text) => handleNameChange(index, text)}
//               style={{ textAlign: 'center' }}
//               multiline={true}
//               />
//               <TextInput
//                 placeholder="Details"
//                 value={photoDetails[index]}
//                 onChangeText={(text) => handleDetailsChange(index, text)}
//                 style={{
//                   textAlign: 'center',
//                 }}
//                 multiline={true}
//               />
//               <TextInput
//                 placeholder="Phone Number"
//                 value={photoPhoneNumbers[index]}
//                 onChangeText={(text) => handlePhoneNumberChange(index, text)}
//                 style={{ textAlign: 'center' }}
//               />
//               <TextInput
//                 placeholder="Address"
//                 value={photoAddresses[index]}
//                 onChangeText={(text) => handleAddressChange(index, text)}
//                 style={{ textAlign: 'center' }}
//                 multiline={true}
//               />
//               <Button title='Delete' onPress={() => deleteSector(index)} style={{ marginTop: 10, alignSelf: 'center' }}/>
//             <View style={{ borderBottomWidth: 1, borderBottomColor: 'blue', marginBottom: 5 }} />
//           </View>
//         ))}
//         <Button title="Add Images..." onPress={addNewSector} />
//       </View>
//       </ScrollView>
//     );
//   }
  








// import React, { useState, useEffect, useRef } from 'react';
// import { View, ScrollView, Image, TouchableOpacity, Text, TextInput, Button, Alert } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import ImageScreen1 from './ImageScreen1'; // Import the new component

// export default function Profile() {
//   const navigation = useNavigation();
//   const scrollViewRef = useRef(null);

//   const [imageData, setImageData] = useState([]);
//   const [photoNames, setPhotoNames] = useState([]);
//   const [photoDetails, setPhotoDetails] = useState([]);
//   const [photoAddresses, setPhotoAddresses] = useState([]);
//   const [photoPhoneNumbers, setPhotoPhoneNumbers] = useState([]);

//   useEffect(() => {
//     loadFromStorage();
//   }, []);

//   const saveToStorage = async () => {
//     try {
//       console.log('Saving data to AsyncStorage...');
//       await AsyncStorage.setItem('imageData', JSON.stringify(imageData));
//       await AsyncStorage.setItem('photoNames', JSON.stringify(photoNames));
//       await AsyncStorage.setItem('photoDetails', JSON.stringify(photoDetails));
//       await AsyncStorage.setItem('photoAddresses', JSON.stringify(photoAddresses));
//       await AsyncStorage.setItem('photoPhoneNumbers', JSON.stringify(photoPhoneNumbers));
//       console.log('Data saved successfully.');
//     } catch (error) {
//       console.error('Error saving data to AsyncStorage:', error);
//     }
//   };

//   const loadFromStorage = async () => {
//     try {
//       console.log('Loading data from AsyncStorage...');
//       const loadedImageData = JSON.parse(await AsyncStorage.getItem('imageData')) || [];
//       const loadedPhotoNames = JSON.parse(await AsyncStorage.getItem('photoNames')) || [];
//       const loadedPhotoDetails = JSON.parse(await AsyncStorage.getItem('photoDetails')) || [];
//       const loadedPhotoAddresses = JSON.parse(await AsyncStorage.getItem('photoAddresses')) || [];
//       const loadedPhotoPhoneNumbers = JSON.parse(await AsyncStorage.getItem('photoPhoneNumbers')) || [];

//       setImageData(loadedImageData);
//       setPhotoNames(loadedPhotoNames);
//       setPhotoDetails(loadedPhotoDetails);
//       setPhotoAddresses(loadedPhotoAddresses);
//       setPhotoPhoneNumbers(loadedPhotoPhoneNumbers);

//       console.log('Data loaded successfully.');
//     } catch (error) {
//       console.error('Error loading data from AsyncStorage:', error);
//     }
//   };

//   const pickImage = async (index) => {
//     try {
//       console.log('Picking image...');
//       const response = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images],
//       });

//       console.log('Response:', response);

//       const updatedImageData = [...imageData];
//       updatedImageData[index] = response;
//       setImageData(updatedImageData);

//       saveToStorage();
//     } catch (err) {
//       console.log('Error picking image:', err);
//     }
//   };

//   const handleNameChange = (index, text) => {
//     const updatedNames = [...photoNames];
//     updatedNames[index] = text;
//     setPhotoNames(updatedNames);

//     saveToStorage();
//   };

//   const handleDetailsChange = (index, text) => {
//     const updatedDetails = [...photoDetails];
//     updatedDetails[index] = text;
//     setPhotoDetails(updatedDetails);

//     saveToStorage();
//   };

//   const handleAddressChange = (index, text) => {
//     const updatedAddresses = [...photoAddresses];
//     updatedAddresses[index] = text;
//     setPhotoAddresses(updatedAddresses);

//     saveToStorage();
//   };

//   const handlePhoneNumberChange = (index, text) => {
//     const updatedPhoneNumbers = [...photoPhoneNumbers];
//     updatedPhoneNumbers[index] = text;
//     setPhotoPhoneNumbers(updatedPhoneNumbers);

//     saveToStorage();
//   };

//   const addNewSector = () => {
//     setImageData([...imageData, null]);
//     setPhotoNames([...photoNames, '']);
//     setPhotoDetails([...photoDetails, '']);
//     setPhotoAddresses([...photoAddresses, '']);
//     setPhotoPhoneNumbers([...photoPhoneNumbers, '']);

//     saveToStorage();
//   };

//   const deleteSector = (index) => {
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
//             const updatedImageData = imageData.filter((_, i) => i !== index);
//             setImageData(updatedImageData);
  
//             const updatedNames = photoNames.filter((_, i) => i !== index);
//             setPhotoNames(updatedNames);
  
//             const updatedDetails = photoDetails.filter((_, i) => i !== index);
//             setPhotoDetails(updatedDetails);
  
//             const updatedAddresses = photoAddresses.filter((_, i) => i !== index);
//             setPhotoAddresses(updatedAddresses);
  
//             const updatedPhoneNumbers = photoPhoneNumbers.filter((_, i) => i !== index);
//             setPhotoPhoneNumbers(updatedPhoneNumbers);
  
//             saveToStorage();
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };
  

//   const loadSelectedPersonDetails = async () => {
//     try {
//       const selectedPersonNumber = await AsyncStorage.getItem('selectedPersonNumber');
//       if (selectedPersonNumber) {
//         // Display details for the selected person
//         scrollViewRef.current.scrollToEnd();
//         scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
//       }
//     } catch (error) {
//       console.error('Error loading selected person details:', error);
//     }
//   };

//   return (
//     <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         {imageData.map((image, index) => (
//           <View key={index} style={{ width: '90%', padding: 10, borderWidth: 1, borderColor: 'blue', marginBottom: 10, borderRadius: 20 }}>
//             {/* <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>{`Person ${index + 1}`}</Text> */}
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate('ImageScreen', {
//                   name: photoNames[index],
//                   details: photoDetails[index],
//                   imageUrl: image?.uri,
//                   address: photoAddresses[index],
//                   phoneNumber: photoPhoneNumbers[index],
//                 });
//               }}
//             >
//               <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'blue' }}>View</Text>
//             </TouchableOpacity>
//             {image ? (
//               <Image source={{ uri: image.uri }} style={{ width: '100%', height: 200, resizeMode: 'cover' }} />
//             ) : (
//               <TouchableOpacity onPress={() => pickImage(index)}>
//                 <View style={{ width: '100%', height: 200, borderWidth: 1, borderColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}>
//                   <Text>Add Photo</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//             <TextInput
//               placeholder="Name"
//               value={photoNames[index]}
//               onChangeText={(text) =>
//                 handleNameChange(index, text)}
//                 style={{ textAlign: 'center', fontWeight: 'bold'}}
//                 multiline={true}
//               />
//               <TextInput
//                 placeholder="Details"
//                 value={photoDetails[index]}
//                 onChangeText={(text) => handleDetailsChange(index, text)}
//                 style={{
//                   textAlign: 'center',
//                 }}
//                 multiline={true}
//               />
//               <TextInput
//                 placeholder="Phone Number"
//                 value={photoPhoneNumbers[index]}
//                 onChangeText={(text) => handlePhoneNumberChange(index, text)}
//                 style={{ textAlign: 'center' }}
//               />
//               <TextInput
//                 placeholder="Address"
//                 value={photoAddresses[index]}
//                 onChangeText={(text) => handleAddressChange(index, text)}
//                 style={{ textAlign: 'center' }}
//                 multiline={true}
//               />
//               <Button title='Delete' onPress={() => deleteSector(index)} style={{ marginTop: 10, alignSelf: 'center' }}/>
//               <View style={{ borderBottomWidth: 1, borderBottomColor: 'blue', marginBottom: 5 }} />
//               {/* Display the number below the sector */}
//               <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>{`${index + 1}`}</Text>
//             </View>
//           ))}
//           <Button title="Add Images..." onPress={addNewSector} />
//         </View>
//       </ScrollView>
//     );
//   }
  




// import React, { useState, useEffect, useRef } from 'react';
// import { View, ScrollView, Image, TouchableOpacity, Text, TextInput, Button, Alert } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker'; // Import the image picker library
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import ImageScreen1 from './ImageScreen1'; // Import the new component

// export default function Profile() {
//   const navigation = useNavigation();
//   const scrollViewRef = useRef(null);

//   const [imageData, setImageData] = useState([]);
//   const [photoNames, setPhotoNames] = useState([]);
//   const [photoDetails, setPhotoDetails] = useState([]);
//   const [photoAddresses, setPhotoAddresses] = useState([]);
//   const [photoPhoneNumbers, setPhotoPhoneNumbers] = useState([]);

//   useEffect(() => {
//     loadFromStorage();
//   }, []);

//   const saveToStorage = async () => {
//     try {
//       console.log('Saving data to AsyncStorage...');
//       await AsyncStorage.setItem('imageData', JSON.stringify(imageData));
//       await AsyncStorage.setItem('photoNames', JSON.stringify(photoNames));
//       await AsyncStorage.setItem('photoDetails', JSON.stringify(photoDetails));
//       await AsyncStorage.setItem('photoAddresses', JSON.stringify(photoAddresses));
//       await AsyncStorage.setItem('photoPhoneNumbers', JSON.stringify(photoPhoneNumbers));
//       console.log('Data saved successfully.');
//     } catch (error) {
//       console.error('Error saving data to AsyncStorage:', error);
//     }
//   };

//   const loadFromStorage = async () => {
//     try {
//       console.log('Loading data from AsyncStorage...');
//       const loadedImageData = JSON.parse(await AsyncStorage.getItem('imageData')) || [];
//       const loadedPhotoNames = JSON.parse(await AsyncStorage.getItem('photoNames')) || [];
//       const loadedPhotoDetails = JSON.parse(await AsyncStorage.getItem('photoDetails')) || [];
//       const loadedPhotoAddresses = JSON.parse(await AsyncStorage.getItem('photoAddresses')) || [];
//       const loadedPhotoPhoneNumbers = JSON.parse(await AsyncStorage.getItem('photoPhoneNumbers')) || [];

//       setImageData(loadedImageData);
//       setPhotoNames(loadedPhotoNames);
//       setPhotoDetails(loadedPhotoDetails);
//       setPhotoAddresses(loadedPhotoAddresses);
//       setPhotoPhoneNumbers(loadedPhotoPhoneNumbers);

//       console.log('Data loaded successfully.');
//     } catch (error) {
//       console.error('Error loading data from AsyncStorage:', error);
//     }
//   };

//   const pickImage = async (index) => {
//     try {
//       console.log('Picking image...');
//       const response = await ImagePicker.openPicker({
//         mediaType: 'photo',
//         cropping: true,
//       });
  
//       console.log('Response:', response);
  
//       if (response && response.path) {
//         // Check if the response has valid path property
//         const updatedImageData = [...imageData];
//         // Use 'path' instead of 'uri' for the Image component
//         updatedImageData[index] = { uri: response.path, ...response };
//         setImageData(updatedImageData);
  
//         saveToStorage();
//       } else {
//         console.warn('Invalid image response:', response);
//       }
//     } catch (err) {
//       console.log('Error picking image:', err);
//     }
//   };
  

//   const handleNameChange = (index, text) => {
//     const updatedNames = [...photoNames];
//     updatedNames[index] = text;
//     setPhotoNames(updatedNames);

//     saveToStorage();
//   };

//   const handleDetailsChange = (index, text) => {
//     const updatedDetails = [...photoDetails];
//     updatedDetails[index] = text;
//     setPhotoDetails(updatedDetails);

//     saveToStorage();
//   };

//   const handleAddressChange = (index, text) => {
//     const updatedAddresses = [...photoAddresses];
//     updatedAddresses[index] = text;
//     setPhotoAddresses(updatedAddresses);

//     saveToStorage();
//   };

//   const handlePhoneNumberChange = (index, text) => {
//     const updatedPhoneNumbers = [...photoPhoneNumbers];
//     updatedPhoneNumbers[index] = text;
//     setPhotoPhoneNumbers(updatedPhoneNumbers);

//     saveToStorage();
//   };

//   const addNewSector = () => {
//     setImageData([...imageData, null]);
//     setPhotoNames([...photoNames, '']);
//     setPhotoDetails([...photoDetails, '']);
//     setPhotoAddresses([...photoAddresses, '']);
//     setPhotoPhoneNumbers([...photoPhoneNumbers, '']);

//     saveToStorage();
//   };

//   const deleteSector = (index) => {
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
//             const updatedImageData = imageData.filter((_, i) => i !== index);
//             setImageData(updatedImageData);
  
//             const updatedNames = photoNames.filter((_, i) => i !== index);
//             setPhotoNames(updatedNames);
  
//             const updatedDetails = photoDetails.filter((_, i) => i !== index);
//             setPhotoDetails(updatedDetails);
  
//             const updatedAddresses = photoAddresses.filter((_, i) => i !== index);
//             setPhotoAddresses(updatedAddresses);
  
//             const updatedPhoneNumbers = photoPhoneNumbers.filter((_, i) => i !== index);
//             setPhotoPhoneNumbers(updatedPhoneNumbers);
  
//             saveToStorage();
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };
  

//   const loadSelectedPersonDetails = async () => {
//     try {
//       const selectedPersonNumber = await AsyncStorage.getItem('selectedPersonNumber');
//       if (selectedPersonNumber) {
//         // Display details for the selected person
//         scrollViewRef.current.scrollToEnd();
//         scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
//       }
//     } catch (error) {
//       console.error('Error loading selected person details:', error);
//     }
//   };

//   return (
//     <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         {imageData.map((image, index) => (
//           <View key={index} style={{ width: '90%', padding: 10, borderWidth: 1, borderColor: 'blue', marginBottom: 10, borderRadius: 20 }}>
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate('ImageScreen', {
//                   name: photoNames[index],
//                   details: photoDetails[index],
//                   imageUrl: image?.uri,
//                   address: photoAddresses[index],
//                   phoneNumber: photoPhoneNumbers[index],
//                 });
//               }}
//             >
//               <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'blue' }}>View</Text>
//             </TouchableOpacity>
//             <View style={{ height: 200, borderWidth: 1, borderColor: 'lightgray', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
//               {image ? (
//                 <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
//               ) : (
//                 <TouchableOpacity onPress={() => pickImage(index)}>
//                   <Text>Add Photo</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//             <TextInput
//               placeholder="Name"
//               value={photoNames[index]}
//               onChangeText={(text) => handleNameChange(index, text)}
//               style={{ textAlign: 'center', fontWeight: 'bold' }}
//               multiline={true}
//             />
//             <TextInput
//               placeholder="Details"
//               value={photoDetails[index]}
//               onChangeText={(text) => handleDetailsChange(index, text)}
//               style={{ textAlign: 'center' }}
//               multiline={true}
//             />
//             <TextInput
//               placeholder="Phone Number"
//               value={photoPhoneNumbers[index]}
//               onChangeText={(text) => handlePhoneNumberChange(index, text)}
//               style={{ textAlign: 'center' }}
//             />
//             <TextInput
//               placeholder="Address"
//               value={photoAddresses[index]}
//               onChangeText={(text) => handleAddressChange(index, text)}
//               style={{ textAlign: 'center' }}
//               multiline={true}
//             />
//             <Button title='Delete' onPress={() => deleteSector(index)} style={{ marginTop: 10, alignSelf: 'center' }} />
//             <View style={{ borderBottomWidth: 1, borderBottomColor: 'blue', marginBottom: 5 }} />
//             <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>{`${index + 1}`}</Text>
//           </View>
//         ))}
//         <Button title="Add Images..." onPress={addNewSector} />
//       </View>
//     </ScrollView>
//   );
// }









// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Text,
//   TextInput,
//   Button,
//   Alert,
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import { Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// export default function Profile({ route }) {
//   const { sectorIndex } = route.params ?? { sectorIndex: 0 };
//   const navigation = useNavigation();
//   const scrollViewRef = useRef(null);

//   const [imageData, setImageData] = useState([]);
//   const [photoNames, setPhotoNames] = useState([]);
//   const [photoDetails, setPhotoDetails] = useState([]);
//   const [photoAddresses, setPhotoAddresses] = useState([]);
//   const [photoPhoneNumbers, setPhotoPhoneNumbers] = useState([]);

//   useEffect(() => {
//     loadFromStorage();

//     // Access the sectorIndex from the route.params
//     const sectorIndex = route.params?.sectorIndex ?? 0;

//     // Get the width of the screen
//     const deviceWidth = Dimensions.get('window').width;

//     // Scroll to the corresponding frame based on sectorIndex
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({ x: sectorIndex * deviceWidth, animated: true });
//     }
//   }, [route.params?.sectorIndex]);

//   const saveToStorage = async () => {
//     try {
//       console.log('Saving data to AsyncStorage...');
//       await AsyncStorage.setItem('imageData', JSON.stringify(imageData));
//       await AsyncStorage.setItem('photoNames', JSON.stringify(photoNames));
//       await AsyncStorage.setItem('photoDetails', JSON.stringify(photoDetails));
//       await AsyncStorage.setItem('photoAddresses', JSON.stringify(photoAddresses));
//       await AsyncStorage.setItem('photoPhoneNumbers', JSON.stringify(photoPhoneNumbers));
//       console.log('Data saved successfully.');
//     } catch (error) {
//       console.error('Error saving data to AsyncStorage:', error);
//     }
//   };

//   const loadFromStorage = async () => {
//     try {
//       console.log('Loading data from AsyncStorage...');
//       const loadedImageData = JSON.parse(await AsyncStorage.getItem('imageData')) || [];
//       const loadedPhotoNames = JSON.parse(await AsyncStorage.getItem('photoNames')) || [];
//       const loadedPhotoDetails = JSON.parse(await AsyncStorage.getItem('photoDetails')) || [];
//       const loadedPhotoAddresses = JSON.parse(await AsyncStorage.getItem('photoAddresses')) || [];
//       const loadedPhotoPhoneNumbers = JSON.parse(await AsyncStorage.getItem('photoPhoneNumbers')) || [];

//       setImageData(loadedImageData);
//       setPhotoNames(loadedPhotoNames);
//       setPhotoDetails(loadedPhotoDetails);
//       setPhotoAddresses(loadedPhotoAddresses);
//       setPhotoPhoneNumbers(loadedPhotoPhoneNumbers);

//       console.log('Data loaded successfully.');
//     } catch (error) {
//       console.error('Error loading data from AsyncStorage:', error);
//     }
//   };

//   const editImage = async (index) => {
//     try {
//       console.log('Editing image...');
//       const response = await ImagePicker.openCropper({
//         path: imageData[index]?.uri,
//         width: 300,
//         height: 400,
//         cropping: true,
//       });
  
//       console.log('Response:', response);
  
//       if (response && response.path) {
//         const updatedImageData = [...imageData];
//         updatedImageData[index] = { uri: response.path, ...response };
//         setImageData(updatedImageData);
  
//         saveToStorage();
//       } else {
//         console.warn('Invalid image response:', response);
//       }
//     } catch (err) {
//       console.log('Error editing image:', err);
//     }
//   };
  

//   const handleNameChange = (index, text) => {
//     const updatedNames = [...photoNames];
//     updatedNames[index] = text;
//     setPhotoNames(updatedNames);

//     saveToStorage();
//   };

//   const handleDetailsChange = (index, text) => {
//     const updatedDetails = [...photoDetails];
//     updatedDetails[index] = text;
//     setPhotoDetails(updatedDetails);

//     saveToStorage();
//   };

//   const handleAddressChange = (index, text) => {
//     const updatedAddresses = [...photoAddresses];
//     updatedAddresses[index] = text;
//     setPhotoAddresses(updatedAddresses);

//     saveToStorage();
//   };

//   const handlePhoneNumberChange = (index, text) => {
//     const updatedPhoneNumbers = [...photoPhoneNumbers];
//     updatedPhoneNumbers[index] = text;
//     setPhotoPhoneNumbers(updatedPhoneNumbers);

//     saveToStorage();
//   };

//   const addNewSector = () => {
//     setImageData([...imageData, null]);
//     setPhotoNames([...photoNames, '']);
//     setPhotoDetails([...photoDetails, '']);
//     setPhotoAddresses([...photoAddresses, '']);
//     setPhotoPhoneNumbers([...photoPhoneNumbers, '']);

//     saveToStorage();
//   };

//   const deleteSector = (index) => {
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
//             const updatedImageData = imageData.filter((_, i) => i !== index);
//             setImageData(updatedImageData);

//             const updatedNames = photoNames.filter((_, i) => i !== index);
//             setPhotoNames(updatedNames);

//             const updatedDetails = photoDetails.filter((_, i) => i !== index);
//             setPhotoDetails(updatedDetails);

//             const updatedAddresses = photoAddresses.filter((_, i) => i !== index);
//             setPhotoAddresses(updatedAddresses);

//             const updatedPhoneNumbers = photoPhoneNumbers.filter((_, i) => i !== index);
//             setPhotoPhoneNumbers(updatedPhoneNumbers);

//             saveToStorage();
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const renderImageItem = (image, index) => (
//     <View key={index} style={{ width: '90%', padding: 10, borderWidth: 1, borderColor: 'blue', marginBottom: 10, borderRadius: 20 }}>
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('ImageScreen', {
//             name: photoNames[index],
//             details: photoDetails[index],
//             imageUrl: image?.uri,
//             address: photoAddresses[index],
//             phoneNumber: photoPhoneNumbers[index],
//           });
//         }}
//       >
//         <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'blue' }}>View</Text>
//       </TouchableOpacity>
//       <View style={{ height: 200, borderWidth: 1, borderColor: 'lightgray', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
//         {image ? (
//           <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
//         ) : (
//           <TouchableOpacity onPress={() => pickImage(index)}>
//             <Text>Add Photo</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//       <Button title='Edit' onPress={() => editImage(index)} style={{ marginBottom: 10, alignSelf: 'center' }} />
//       <TextInput
//         placeholder="Name"
//         value={photoNames[index]}
//         onChangeText={(text) => handleNameChange(index, text)}
//         style={{ textAlign: 'center', fontWeight: 'bold' }}
//         multiline={true}
//       />
//       <TextInput
//         placeholder="Details"
//         value={photoDetails[index]}
//         onChangeText={(text) =>        handleDetailsChange(index, text)}
//         style={{ textAlign: 'center' }}
//         multiline={true}
//       />
//       <TextInput
//         placeholder="Phone Number"
//         value={photoPhoneNumbers[index]}
//         onChangeText={(text) => handlePhoneNumberChange(index, text)}
//         style={{ textAlign: 'center' }}
//       />
//       <TextInput
//         placeholder="Address"
//         value={photoAddresses[index]}
//         onChangeText={(text) => handleAddressChange(index, text)}
//         style={{ textAlign: 'center' }}
//         multiline={true}
//       />
//       <Button title='Delete' onPress={() => deleteSector(index)} style={{ marginTop: 10, alignSelf: 'center' }} />
//       <View style={{ borderBottomWidth: 1, borderBottomColor: 'blue', marginBottom: 5 }} />
//       <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>{`${index + 1}`}</Text>
//     </View>
//   );

//   return (
//     <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         {/* Render only the selected frame based on sectorIndex */}
//         {renderImageItem(imageData[sectorIndex], sectorIndex)}
//         <Button title="Add Images..." onPress={addNewSector} />
//       </View>
//     </ScrollView>
//   );
// }

  







//LAST
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Text,
//   TextInput,
//   Button,
//   Alert,
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import { Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// export default function Profile({ route }) {
//   const { sectorIndex } = route.params ?? { sectorIndex: undefined };
//   const navigation = useNavigation();
//   const scrollViewRef = useRef(null);

//   const [imageData, setImageData] = useState([]);
//   const [photoNames, setPhotoNames] = useState([]);
//   const [photoDetails, setPhotoDetails] = useState([]);
//   const [photoAddresses, setPhotoAddresses] = useState([]);
//   const [photoPhoneNumbers, setPhotoPhoneNumbers] = useState([]);

//   useEffect(() => {
//     loadFromStorage();

//     // Access the sectorIndex from the route.params
//     const currentSectorIndex = route.params?.sectorIndex;

//     // Get the width of the screen
//     const deviceWidth = Dimensions.get('window').width;

//     // Scroll to the corresponding frame based on sectorIndex
//     if (scrollViewRef.current && currentSectorIndex !== undefined) {
//       scrollViewRef.current.scrollTo({ x: currentSectorIndex * deviceWidth, animated: true });
//     }
//   }, [route.params?.sectorIndex]);

//   const saveToStorage = async () => {
//     try {
//       console.log('Saving data to AsyncStorage...');
//       await AsyncStorage.setItem('imageData', JSON.stringify(imageData));
//       await AsyncStorage.setItem('photoNames', JSON.stringify(photoNames));
//       await AsyncStorage.setItem('photoDetails', JSON.stringify(photoDetails));
//       await AsyncStorage.setItem('photoAddresses', JSON.stringify(photoAddresses));
//       await AsyncStorage.setItem('photoPhoneNumbers', JSON.stringify(photoPhoneNumbers));
//       console.log('Data saved successfully.');
//     } catch (error) {
//       console.error('Error saving data to AsyncStorage:', error);
//     }
//   };

//   const loadFromStorage = async () => {
//     try {
//       console.log('Loading data from AsyncStorage...');
//       const loadedImageData = JSON.parse(await AsyncStorage.getItem('imageData')) || [];
//       const loadedPhotoNames = JSON.parse(await AsyncStorage.getItem('photoNames')) || [];
//       const loadedPhotoDetails = JSON.parse(await AsyncStorage.getItem('photoDetails')) || [];
//       const loadedPhotoAddresses = JSON.parse(await AsyncStorage.getItem('photoAddresses')) || [];
//       const loadedPhotoPhoneNumbers = JSON.parse(await AsyncStorage.getItem('photoPhoneNumbers')) || [];

//       setImageData(loadedImageData);
//       setPhotoNames(loadedPhotoNames);
//       setPhotoDetails(loadedPhotoDetails);
//       setPhotoAddresses(loadedPhotoAddresses);
//       setPhotoPhoneNumbers(loadedPhotoPhoneNumbers);

//       console.log('Data loaded successfully.');
//     } catch (error) {
//       console.error('Error loading data from AsyncStorage:', error);
//     }
//   };

//   const editImage = async (index) => {
//     try {
//       console.log('Editing image...');
//       const response = await ImagePicker.openCropper({
//         path: imageData[index]?.uri,
//         width: 300,
//         height: 400,
//         cropping: true,
//       });
  
//       console.log('Response:', response);
  
//       if (response && response.path) {
//         const updatedImageData = [...imageData];
//         updatedImageData[index] = { uri: response.path, ...response };
//         setImageData(updatedImageData);
  
//         saveToStorage();
//       } else {
//         console.warn('Invalid image response:', response);
//       }
//     } catch (err) {
//       console.log('Error editing image:', err);
//     }
//   };
  

//   const handleNameChange = (index, text) => {
//     const updatedNames = [...photoNames];
//     updatedNames[index] = text;
//     setPhotoNames(updatedNames);

//     saveToStorage();
//   };

//   const handleDetailsChange = (index, text) => {
//     const updatedDetails = [...photoDetails];
//     updatedDetails[index] = text;
//     setPhotoDetails(updatedDetails);

//     saveToStorage();
//   };

//   const handleAddressChange = (index, text) => {
//     const updatedAddresses = [...photoAddresses];
//     updatedAddresses[index] = text;
//     setPhotoAddresses(updatedAddresses);

//     saveToStorage();
//   };

//   const handlePhoneNumberChange = (index, text) => {
//     const updatedPhoneNumbers = [...photoPhoneNumbers];
//     updatedPhoneNumbers[index] = text;
//     setPhotoPhoneNumbers(updatedPhoneNumbers);

//     saveToStorage();
//   };

//   const addNewSector = () => {
//     setImageData([...imageData, null]);
//     setPhotoNames([...photoNames, '']);
//     setPhotoDetails([...photoDetails, '']);
//     setPhotoAddresses([...photoAddresses, '']);
//     setPhotoPhoneNumbers([...photoPhoneNumbers, '']);

//     saveToStorage();
//   };

//   const deleteSector = (index) => {
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
//             const updatedImageData = imageData.filter((_, i) => i !== index);
//             setImageData(updatedImageData);

//             const updatedNames = photoNames.filter((_, i) => i !== index);
//             setPhotoNames(updatedNames);

//             const updatedDetails = photoDetails.filter((_, i) => i !== index);
//             setPhotoDetails(updatedDetails);

//             const updatedAddresses = photoAddresses.filter((_, i) => i !== index);
//             setPhotoAddresses(updatedAddresses);

//             const updatedPhoneNumbers = photoPhoneNumbers.filter((_, i) => i !== index);
//             setPhotoPhoneNumbers(updatedPhoneNumbers);

//             saveToStorage();
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const renderImageItem = (image, index) => (
//     <View key={index} style={{ width: '90%', padding: 10, borderWidth: 1, borderColor: 'blue', marginBottom: 10, borderRadius: 20 }}>
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('ImageScreen', {
//             name: photoNames[index],
//             details: photoDetails[index],
//             imageUrl: image?.uri,
//             address: photoAddresses[index],
//             phoneNumber: photoPhoneNumbers[index],
//           });
//         }}
//       >
//         <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'blue' }}>View</Text>
//       </TouchableOpacity>
//       <View style={{ height: 200, borderWidth: 1, borderColor: 'lightgray', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
//         {image ? (
//           <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
//         ) : (
//           <TouchableOpacity onPress={() => pickImage(index)}>
//             <Text>Add Photo</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//       <Button title='Edit' onPress={() => editImage(index)} style={{ marginBottom: 10, alignSelf: 'center' }} />
//       <TextInput
//         placeholder="Name"
//         value={photoNames[index]}
//         onChangeText={(text) => handleNameChange(index, text)}
//         style={{ textAlign: 'center', fontWeight: 'bold' }}
//         multiline={true}
//       />
//       <TextInput
//         placeholder="Details"
//         value={photoDetails[index]}
//         onChangeText={(text) =>        handleDetailsChange(index, text)}
//         style={{ textAlign: 'center' }}
//         multiline={true}
//       />
//       <TextInput
//         placeholder="Phone Number"
//         value={photoPhoneNumbers[index]}
//         onChangeText={(text) => handlePhoneNumberChange(index, text)}
//         style={{ textAlign: 'center' }}
//       />
//       <TextInput
//         placeholder="Address"
//         value={photoAddresses[index]}
//         onChangeText={(text) => handleAddressChange(index, text)}
//         style={{ textAlign: 'center' }}
//         multiline={true}
//       />
//       <Button title='Delete' onPress={() => deleteSector(index)} style={{ marginTop: 10, alignSelf: 'center' }} />
//       <View style={{ borderBottomWidth: 1, borderBottomColor: 'blue', marginBottom: 5 }} />
//       <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>{`${index + 1}`}</Text>
//     </View>
//   );

//   return (
//     <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         {/* Render all frames if sectorIndex is not defined */}
//         {sectorIndex === undefined
//           ? imageData.map((image, index) => renderImageItem(image, index))
//           : renderImageItem(imageData[sectorIndex], sectorIndex)}
//         <Button title="Add Images..." onPress={addNewSector} />
//       </View>
//     </ScrollView>
//   );
// }






import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SendIntentAndroid from 'react-native-send-intent';

export default function Profile({ route }) {
  const [showAddButton, setShowAddButton] = useState(true);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const [imageData, setImageData] = useState([]);
  const [photoNames, setPhotoNames] = useState([]);
  const [photoDetails, setPhotoDetails] = useState([]);
  const [photoAddresses, setPhotoAddresses] = useState([]);
  const [photoPhoneNumbers, setPhotoPhoneNumbers] = useState([]); // Ensure photoPhoneNumbers is defined
  const [showSendButton, setShowSendButton] = useState(false);

  useEffect(() => {
    loadFromStorage();

    const { sectorIndex, showDeleteButton } = route.params || {};
    const deviceWidth = Dimensions.get('window').width;

    if (scrollViewRef.current && sectorIndex !== undefined) {
      scrollViewRef.current.scrollTo({ x: sectorIndex * deviceWidth, animated: true });
    }
    setShowAddButton(!route.params || route.params.sectorIndex === undefined);

    setShowSendButton(route.params?.sectorIndex !== undefined);
  }, [route.params?.sectorIndex, route.params?.showDeleteButton]);



  const handleSendButtonPress = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('contactList');
      const contactList = storedContacts ? JSON.parse(storedContacts) : [];
  
      if (contactList.length === 0) {
        Alert.alert('No Contacts', 'Please add phone numbers in the Contacts page.');
        return;
      }
  
      // Construct a message using the data from the current profile
      const currentIndex = route.params?.sectorIndex || 0;
      const currentProfile = {
        name: photoNames[currentIndex],
        details: photoDetails[currentIndex],
        address: photoAddresses[currentIndex],
        phoneNumber: photoPhoneNumbers[currentIndex],
      };
  
      const message = `Name: ${currentProfile.name}\nDetails: ${currentProfile.details}\nAddress: ${currentProfile.address}\nPhoneNumber: ${currentProfile.phoneNumber}\n`;
  
      const phoneNumbersToSend = contactList.map((contact) => contact.phoneNumber);
  
      console.log('Attempting to send messages to:', phoneNumbersToSend);
  
      const sendIntent = await SendIntentAndroid.sendSms(
        phoneNumbersToSend.join(';'),
        message
      );
  
      console.log('SendIntent response:', sendIntent);
  
      if (sendIntent && sendIntent.includes('error')) {
        throw new Error(`Failed to send messages. Error: ${sendIntent}`);
      }
  
      Alert.alert('Success', 'Messages sent successfully!');
    } catch (error) {
      console.error('Error sending messages:', error);
      Alert.alert('Error', `Failed to send messages. Error: ${error.message}`);
    }
  };
  

  const saveToStorage = async () => {
    try {
      console.log('Saving data to AsyncStorage...');
      await AsyncStorage.setItem('imageData', JSON.stringify(imageData));
      await AsyncStorage.setItem('photoNames', JSON.stringify(photoNames));
      await AsyncStorage.setItem('photoDetails', JSON.stringify(photoDetails));
      await AsyncStorage.setItem('photoAddresses', JSON.stringify(photoAddresses));
      await AsyncStorage.setItem('photoPhoneNumbers', JSON.stringify(photoPhoneNumbers));
      console.log('Data saved successfully.');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const loadFromStorage = async () => {
    try {
      console.log('Loading data from AsyncStorage...');
      const loadedImageData = JSON.parse(await AsyncStorage.getItem('imageData')) || [];
      const loadedPhotoNames = JSON.parse(await AsyncStorage.getItem('photoNames')) || [];
      const loadedPhotoDetails = JSON.parse(await AsyncStorage.getItem('photoDetails')) || [];
      const loadedPhotoAddresses = JSON.parse(await AsyncStorage.getItem('photoAddresses')) || [];
      const loadedPhotoPhoneNumbers = JSON.parse(await AsyncStorage.getItem('photoPhoneNumbers')) || [];

      setImageData(loadedImageData);
      setPhotoNames(loadedPhotoNames);
      setPhotoDetails(loadedPhotoDetails);
      setPhotoAddresses(loadedPhotoAddresses);
      setPhotoPhoneNumbers(loadedPhotoPhoneNumbers);

      console.log('Data loaded successfully.');
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  // Function to handle picking an image
  const pickImage = async (index) => {
    try {
      console.log('Picking an image...');
      const response = await ImagePicker.openPicker({
        width: 800,
        height: 500,
        cropping: true,
      });

      console.log('Response:', response);

      if (response && response.path) {
        const updatedImageData = [...imageData];
        updatedImageData[index] = { uri: response.path, ...response };
        setImageData(updatedImageData);

        // If the photo name is empty, set it to a default value
        // const updatedNames = [...photoNames];
        // if (!updatedNames[index]) {
        //   updatedNames[index] = 'Photo ' + (index + 1);
        // }
        // setPhotoNames(updatedNames);

        saveToStorage();
      } else {
        console.warn('Invalid image response:', response);
      }
    } catch (err) {
      console.log('Error picking an image:', err);
    }
  };

  // Function to handle editing an image
  const editImage = async (index) => {
    try {
      console.log('Editing image...');
      const response = await ImagePicker.openCropper({
        path: imageData[index]?.uri,
        width: 800,
        height: 500,
        cropping: true,
      });

      console.log('Response:', response);

      if (response && response.path) {
        const updatedImageData = [...imageData];
        updatedImageData[index] = { uri: response.path, ...response };
        setImageData(updatedImageData);

        saveToStorage();
      } else {
        console.warn('Invalid image response:', response);
      }
    } catch (err) {
      console.log('Error editing image:', err);
    }
  };

  


  const handleNameChange = (index, text) => {
    const updatedNames = [...photoNames];
    updatedNames[index] = text;
    setPhotoNames(updatedNames);

    saveToStorage();
  };

  const handleDetailsChange = (index, text) => {
    const updatedDetails = [...photoDetails];
    updatedDetails[index] = text;
    setPhotoDetails(updatedDetails);

    saveToStorage();
  };

  const handleAddressChange = (index, text) => {
    const updatedAddresses = [...photoAddresses];
    updatedAddresses[index] = text;
    setPhotoAddresses(updatedAddresses);

    saveToStorage();
  };

  const handlePhoneNumberChange = (index, text) => {
    const updatedPhoneNumbers = [...photoPhoneNumbers];
    updatedPhoneNumbers[index] = text;
    setPhotoPhoneNumbers(updatedPhoneNumbers);

    saveToStorage();
  };

  const addNewSector = () => {
    setImageData([...imageData, null]);
    setPhotoNames([...photoNames, '']);
    setPhotoDetails([...photoDetails, '']);
    setPhotoAddresses([...photoAddresses, '']);
    setPhotoPhoneNumbers([...photoPhoneNumbers, '']);

    saveToStorage();
  };

  const deleteSector = (index) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this sector?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedImageData = imageData.filter((_, i) => i !== index);
            setImageData(updatedImageData);

            const updatedNames = photoNames.filter((_, i) => i !== index);
            setPhotoNames(updatedNames);

            const updatedDetails = photoDetails.filter((_, i) => i !== index);
            setPhotoDetails(updatedDetails);

            const updatedAddresses = photoAddresses.filter((_, i) => i !== index);
            setPhotoAddresses(updatedAddresses);

            const updatedPhoneNumbers = photoPhoneNumbers.filter((_, i) => i !== index);
            setPhotoPhoneNumbers(updatedPhoneNumbers);

            saveToStorage();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderImageItem = (image, index, showButtons) => (
    <View key={index} style={{ width: '90%', padding: 10, borderWidth: 1, borderColor: '#00008B', marginBottom: 10, borderRadius: 20 }}>
      {!route.params?.hideViewButton ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ImageScreen', {
              name: photoNames[index],
              details: photoDetails[index],
              imageUrl: image?.uri,
              address: photoAddresses[index],
              phoneNumber: photoPhoneNumbers[index],
            });
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center',color: "#00008B", fontSize: 20}}>View</Text>
        </TouchableOpacity>
      ) : null}
      <View style={{ height: 200, borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        {image ? (
          <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
        ) : (
          <TouchableOpacity onPress={() => pickImage(index)}>
  <Text style={{color: "black"}}>Add Photo</Text>
</TouchableOpacity>
        )}
      </View>
      {showButtons && (
        <>
          {/* <Button title='Edit' onPress={() => showEditButtons(index)} style={{ flex: 1, marginBottom: 10, alignSelf: 'center', color: "#00008B", fontSize: 20 }} /> */}
          
          <TouchableOpacity onPress={() => showEditButtons(index)} style={{
            backgroundColor: '#00008B', width: 330, height: 40,
            borderRadius: 30, flex: 1, justifyContent: 'center', alignItems: 'center',
          }}>
            <Text style={{ color: "white", fontSize: 20 }}>Edit</Text>
          </TouchableOpacity>
          
          {route.params?.showDeleteButton && (
            <Button title='Delete' onPress={() => deleteSector(index)} style={{ marginTop: 10, alignSelf: 'center', color: "#00008B", fontSize: 20 }} />
          )}
        </>
      )}

      <TextInput
        placeholder="Name"
        value={photoNames[index]}
        onChangeText={(text) => handleNameChange(index, text)}
        style={{ textAlign: 'center', fontWeight: 'bold' }}
        multiline={true}
      />
      <TextInput
        placeholder="Details"
        value={photoDetails[index]}
        onChangeText={(text) => handleDetailsChange(index, text)}
        style={{ textAlign: 'center' , fontWeight: 'bold' }}
        multiline={true}
      />
      <TextInput
        placeholder="Phone Number"
        value={photoPhoneNumbers[index]}
        onChangeText={(text) => handlePhoneNumberChange(index, text)}
        style={{ textAlign: 'center', fontWeight: 'bold'  }}
      />
      <TextInput
        placeholder="Address"
        value={photoAddresses[index]}
        onChangeText={(text) => handleAddressChange(index, text)}
        style={{ textAlign: 'center', fontWeight: 'bold'  }}
        multiline={true}
      />
      
      {showButtons && (
      <TouchableOpacity onPress={() => deleteSector(index)} style={{
            backgroundColor: '#00008B', width: 330, height: 40,
            borderRadius: 30, flex: 1, justifyContent: 'center', alignItems: 'center',
          }}>
            <Text style={{ color: "white", fontSize: 20 }}>Delete</Text>
          </TouchableOpacity>
      )}

      <View style={{ borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 5 }} />
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>{`${index + 1}`}</Text>
    </View>
  );
  
  // Function to show edit buttons
  const showEditButtons = (index) => {
    const options = [
      {
        text: 'Choose from Library',
        onPress: () => chooseFromLibrary(index),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ];
  
    // Only show "Edit Photo" if the image exists
    if (imageData[index] && imageData[index].uri) {
      options.unshift({
        text: 'Edit Photo',
        onPress: () => editImage(index)
      });
    }
  
    Alert.alert('Edit Photo', 'Choose an option', options, { cancelable: true });
  };
  
  
  // Function to handle choosing image from library
  // Function to handle choosing image from library
const chooseFromLibrary = async (index) => {
  try {
    console.log('Choosing image from library...');
    const response = await ImagePicker.openPicker({
      width: 800,
      height: 500,
      cropping: true,
    });

    console.log('Response:', response);

    if (response && response.path) {
      const updatedImageData = [...imageData];
      updatedImageData[index] = { uri: response.path, ...response };
      setImageData(updatedImageData);

      saveToStorage();
    } else {
      console.warn('Invalid image response:', response);
    }
  } catch (err) {
    console.log('Error choosing image from library:', err);
  }
};

  
  

return (
  <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {(!route.params || route.params.sectorIndex === undefined)
        ? imageData.map((image, index) => renderImageItem(image, index, true))
        : renderImageItem(imageData[route.params.sectorIndex], route.params.sectorIndex, false)}
      {showAddButton &&
        <TouchableOpacity onPress={addNewSector} style={{
          backgroundColor: '#00008B', width: 150, height: 40,
          borderRadius: 30, justifyContent: 'center', alignItems: 'center',
        }}>
          <Text style={{ color: "white", fontSize: 20 }}>Add Images...</Text>
        </TouchableOpacity>
      }
      {showSendButton && (
        <TouchableOpacity
          onPress={handleSendButtonPress}
          style={{
            backgroundColor: '#00008B',
            width: 150,
            height: 40,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{ color: 'white', fontSize: 20 }}>Send</Text>
        </TouchableOpacity>
      )}
    </View>
  </ScrollView>
);
}































//Image url is displayed
// import React, { useState, useEffect, useRef } from 'react';
// import { View, ScrollView, Image, TouchableOpacity, Text, TextInput, Button, Alert } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';


// export default function Profile() {
//   const navigation = useNavigation();
//   const scrollViewRef = useRef(null);

//   const [imageData, setImageData] = useState([]);

//   useEffect(() => {
//     loadFromStorage();
//   }, []);

//   const saveToStorage = async () => {
//     try {
//       console.log('Saving data to AsyncStorage...');
//       await AsyncStorage.setItem('imageData', JSON.stringify(imageData));
//       console.log('Data saved successfully.');
//     } catch (error) {
//       console.error('Error saving data to AsyncStorage:', error);
//     }
//   };

//   const loadFromStorage = async () => {
//     try {
//       console.log('Loading data from AsyncStorage...');
//       const loadedImageData = JSON.parse(await AsyncStorage.getItem('imageData'));

//       if (loadedImageData) {
//         setImageData(loadedImageData);
//       }
//       console.log('Data loaded successfully.');
//     } catch (error) {
//       console.error('Error loading data from AsyncStorage:', error);
//     }
//   };

//   const pickImage = async (index) => {
//     try {
//       console.log('Picking image...');
//       const response = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images],
//       });

//       console.log('Response:', response);

//       const updatedImageData = [...imageData];
//       updatedImageData[index] = { ...response, name: '', details: '', phoneNumber: '', address: '' };
//       setImageData(updatedImageData);

//       saveToStorage();
//     } catch (err) {
//       console.log('Error picking image:', err);
//     }
//   };

//   const deleteSector = (index) => {
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
//             const updatedImageData = [...imageData];
//             updatedImageData.splice(index, 1);
//             setImageData(updatedImageData);

//             saveToStorage();
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const addNewSector = () => {
//     setImageData([...imageData, null]);

//     saveToStorage();
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedImageData = [...imageData];
//     updatedImageData[index][field] = value;
//     setImageData(updatedImageData);
//   };

//   return (
//     <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         {imageData.map((image, index) => (
//           <View key={index} style={{ width: '50%', padding: 10, borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}>
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate('ImageScreen', {
//                   imageUrl: image?.uri,
//                 });
//               }}
//             >
//               <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'blue' }}>
//                 Person {index + 1}
//               </Text>
//             </TouchableOpacity>
//             {image ? (
//               <Image
//                 source={{ uri: image.uri }}
//                 style={{ width: '100%', height: 200, resizeMode: 'cover' }}
//               />
//             ) : (
//               <TouchableOpacity onPress={() => pickImage(index)}>
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
//               </TouchableOpacity>
//             )}
//             <View style={{ borderBottomWidth: 1, borderBottomColor: 'blue', marginBottom: 5 }} />
//             <TextInput
//               placeholder="Name"
//               value={image?.name}
//               onChangeText={(value) => handleInputChange(index, 'name', value)}
//             />
//             <TextInput
//               placeholder="Details"
//               value={image?.details}
//               onChangeText={(value) => handleInputChange(index, 'details', value)}
//             />
//             <TextInput
//               placeholder="Phone Number"
//               value={image?.phoneNumber}
//               onChangeText={(value) => handleInputChange(index, 'phoneNumber', value)}
//             />
//             <TextInput
//               placeholder="Address"
//               value={image?.address}
//               onChangeText={(value) => handleInputChange(index, 'address', value)}
//             />
//             <Button title="Delete" onPress={() => deleteSector(index)} />
//           </View>
//         ))}
//         <Button title="Add Images..." onPress={addNewSector} />
//       </View>
//     </ScrollView>
//   );
// }