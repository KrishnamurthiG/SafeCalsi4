//Last
// import React, { useState, useEffect } from 'react';
// import { View, Text, Switch, TouchableOpacity, Image, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const colors = {
//   dark: '#22252D',
//   dark1: '#292B36',
//   dark2: '#272B33',
//   light: '#FFF',
//   light1: 'rgb(220, 220, 220)',
//   light2: '#F7F7F7',
// };

// export default function Calsi1() {
//   const [imageData, setImageData] = useState([]);
//   const [photoNames, setPhotoNames] = useState([]);
//   const [photoDetails, setPhotoDetails] = useState([]);
//   const [photoAddresses, setPhotoAddresses] = useState([]);
//   const [photoPhoneNumbers, setPhotoPhoneNumbers] = useState([]);
//   const [darkTheme, setDarkTheme] = useState(false);
//   const [result, setResult] = useState('');
//   const navigation = useNavigation();

//   const personImages = {
//     1: 'person 1',
//     2: 'person 2',
//     3: 'person 3',
//     4: 'person 4',
//     5: 'person 5',
//   };

//   const handleIconPress = async () => {
//     if (result.trim() === '') {
//       Alert.alert('Enter Number', 'Please enter a number before pressing Yes.');
//       return;
//     }
  
//     const sectorNumber = parseInt(result);
  
//     if (!isNaN(sectorNumber)) {
//       // Load the latest sector details
//       await loadFromStorage();
  
//       if (sectorNumber <= imageData.length) {
//         navigation.navigate('ImageScreen1', {
//           name: photoNames[sectorNumber - 1],
//           details: photoDetails[sectorNumber - 1],
//           address: photoAddresses[sectorNumber - 1],
//           phoneNumber: photoPhoneNumbers[sectorNumber - 1],
//         });
//       } else {
//         Alert.alert('Invalid Number', `Sector ${sectorNumber} does not exist.`);
//       }
//     } else {
//       Alert.alert('Invalid Number', 'Please enter a valid number before pressing Yes.');
//     }
//   };
  
//   const loadFromStorage = async () => {
//     try {
//       console.log('Loading data from AsyncStorage...');
//       const loadedImageData = JSON.parse(await AsyncStorage.getItem('imageData')) || [];
//       // ... (your existing code to load other data)
//       setImageData(loadedImageData);
//       console.log('Data loaded successfully.');
//     } catch (error) {
//       console.error('Error loading data from AsyncStorage:', error);
//       throw error;
//     }
//   };
  
  

//   const calculate = async (title) => {
//     try {
//       const sectorNumber = parseInt(title);
//       if (!isNaN(sectorNumber)) {
//         await loadFromStorage();

//         if (sectorNumber <= imageData.length) {
//           // Instead of navigating directly, pass the sectorIndex as a parameter
//           navigation.navigate('Profile', {
//             sectorIndex: sectorNumber - 1,
//           });
//         } else {
//           Alert.alert('Invalid Number', `Sector ${sectorNumber} does not exist.`);
//         }
//       } else {
//         Alert.alert('Invalid Number', 'Please enter a valid number before pressing Yes.');
//       }
//     } catch (error) {
//       console.error('Error in handleCalculatorButtonClick:', error);
//       // Handle the error as needed
//     }
//   };
  
  

//   const Btn = ({ title, type }) => (
//     <TouchableOpacity
//       onPress={() => calculate(title)}
//       style={{
//         backgroundColor: 'white',
//         height: 50,
//         width: 50,
//         borderRadius: 10,
//         margin: 16,
//         padding: 0,
//         elevation: 20,
//       }}>
//       <Text
//         style={{
//           fontSize: 37,
//           textAlign: 'center',
//           textAlignVertical: 'center',
//           color: getBtnColor(type),
//         }}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );

//   const getBtnColor = (type) => {
//     if (type === 'top') {
//       return 'blue';
//     } else if (type === 'right') {
//       return 'blue';
//     }
//     return 'black';
//   };

//   const getColor = (light, dark) => (darkTheme ? dark : light);

//   useEffect(() => {
//     const imageNumber = parseInt(result);
//     if (!isNaN(imageNumber) && personImages[imageNumber]) {
//       // Display the corresponding image
//       navigation.navigate('ImageScreen1', { imageNumber: personImages[imageNumber] });
//     }
//   }, [result]);



//   return (
    

//     <View
      
//       style={{
//         height: '100%',
//         width: '100%',
//         paddingVertical: 30,
//         backgroundColor: getColor(colors.light, colors.dark),
//         alignItems: 'center',
//       }}>
//       <Switch
//         value={darkTheme}
//         onValueChange={() => setDarkTheme(!darkTheme)}
//         trackColor={{ true: colors.light2, false: colors.dark2 }}
//         thumbColor={getColor(colors.dark, colors.light)}
//       />
//       <Text
//         style={{
//           fontSize: 40,
//           width: '100%',
//           textAlign: 'right',
//           paddingRight: 10,
//           color: getColor(colors.dark, colors.light),
//           marginTop: 110,
//           paddingBottom: 20
//         }}>
//         {result}
//       </Text>
//       <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", backgroundColor: getColor(colors.light1, colors.dark1), elevation: 7, borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
//         <Btn title="C" type="top" />
//         <Btn title="DL" type="top" />
//         <Btn title="/" type="top" />
//         <Btn title="%" type="top" />
//         <Btn title="7" type="number" />
//         <Btn title="8" type="number" />
//         <Btn title="9" type="number" />
//         <Btn title="*" type="right" />
//         <Btn title="4" type="number" />
//         <Btn title="5" type="number" />
//         <Btn title="6" type="number" />
//         <Btn title="-" type="right" />
//         <Btn title="1" type="number" />
//         <Btn title="2" type="number" />
//         <Btn title="3" type="number" />
//         <Btn title="+" type="right" />
//         <Btn title="00" type="number" />
//         <Btn title="0" type="number" />
//         <Btn title="." type="number" />
//         <Btn title="=" type="right" />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'flex-end', // Align to the right
//           alignItems: 'center',
//           padding: 10,
//         }}>
//         <TouchableOpacity onPress={handleIconPress}>
//           <Image source={require('C:/Users/Subhash G/Safe_Calsi/src/logo/logo1.png')} style={{ width: 40, height: 40 }} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }







//LAST
// import React, { useState, useEffect } from 'react';
// import { View, Text, Switch, TouchableOpacity, Image, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const colors = {
//   dark: '#22252D',
//   dark1: '#292B36',
//   dark2: '#272B33',
//   light: '#FFF',
//   light1: 'rgb(220, 220, 220)',
//   light2: '#F7F7F7',
// };

// export default function Calsi1() {
//   const [imageData, setImageData] = useState([]);
//   const [photoNames, setPhotoNames] = useState([]);
//   const [photoDetails, setPhotoDetails] = useState([]);
//   const [photoAddresses, setPhotoAddresses] = useState([]);
//   const [photoPhoneNumbers, setPhotoPhoneNumbers] = useState([]);
//   const [darkTheme, setDarkTheme] = useState(false);
//   const [result, setResult] = useState('');
//   const navigation = useNavigation();

//   const personImages = {
//     1: 'person 1',
//     2: 'person 2',
//     3: 'person 3',
//     4: 'person 4',
//     5: 'person 5',
//   };

//   const handleIconPress = async () => {
//     if (result.trim() === '') {
//       Alert.alert('Enter Number', 'Please enter a number before pressing Yes.');
//       return;
//     }
  
//     const sectorNumber = parseInt(result);
  
//     if (!isNaN(sectorNumber)) {
//       // Load the latest sector details
//       await loadFromStorage();
  
//       if (sectorNumber <= imageData.length) {
//         navigation.navigate('ImageScreen1', {
//           name: photoNames[sectorNumber - 1],
//           details: photoDetails[sectorNumber - 1],
//           address: photoAddresses[sectorNumber - 1],
//           phoneNumber: photoPhoneNumbers[sectorNumber - 1],
//         });
//       } else {
//         Alert.alert('Invalid Number', `Sector ${sectorNumber} does not exist.`);
//       }
//     } else {
//       Alert.alert('Invalid Number', 'Please enter a valid number before pressing Yes.');
//     }
//   };
  
//   const loadFromStorage = async () => {
//     try {
//       console.log('Loading data from AsyncStorage...');
//       const loadedImageData = JSON.parse(await AsyncStorage.getItem('imageData')) || [];
//       // ... (your existing code to load other data)
//       setImageData(loadedImageData);
//       console.log('Data loaded successfully.');
//     } catch (error) {
//       console.error('Error loading data from AsyncStorage:', error);
//       throw error;
//     }
//   };
  
  

//   const calculate = async (title) => {
//     try {
//       const sectorNumber = parseInt(title);
//       if (!isNaN(sectorNumber)) {
//         await loadFromStorage();

//         if (sectorNumber <= imageData.length) {
//           // Instead of navigating directly, pass the sectorIndex as a parameter
//           navigation.navigate('Profile', {
//             sectorIndex: sectorNumber - 1,
//           });
//         } else {
//           Alert.alert('Invalid Number', `Sector ${sectorNumber} does not exist.`);
//         }
//       } else {
//         Alert.alert('Invalid Number', 'Please enter a valid number before pressing Yes.');
//       }
//     } catch (error) {
//       console.error('Error in handleCalculatorButtonClick:', error);
//       // Handle the error as needed
//     }
//   };
  
  

//   const Btn = ({ title, type }) => (
//     <TouchableOpacity
//       onPress={() => calculate(title)}
//       style={{
//         backgroundColor: 'white',
//         height: 50,
//         width: 50,
//         borderRadius: 10,
//         margin: 16,
//         padding: 0,
//         elevation: 20,
//       }}>
//       <Text
//         style={{
//           fontSize: 37,
//           textAlign: 'center',
//           textAlignVertical: 'center',
//           color: getBtnColor(type),
//         }}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );

//   const getBtnColor = (type) => {
//     if (type === 'top') {
//       return 'blue';
//     } else if (type === 'right') {
//       return 'blue';
//     }
//     return 'black';
//   };

//   const getColor = (light, dark) => (darkTheme ? dark : light);

//   useEffect(() => {
//     const imageNumber = parseInt(result);
//     if (!isNaN(imageNumber) && personImages[imageNumber]) {
//       // Display the corresponding image
//       navigation.navigate('ImageScreen1', { imageNumber: personImages[imageNumber] });
//     }
//   }, [result]);



//   return (
    

//     <View
      
//       style={{
//         height: '100%',
//         width: '100%',
//         paddingVertical: 30,
//         backgroundColor: getColor(colors.light, colors.dark),
//         alignItems: 'center',
//       }}>
//       <Switch
//         value={darkTheme}
//         onValueChange={() => setDarkTheme(!darkTheme)}
//         trackColor={{ true: colors.light2, false: colors.dark2 }}
//         thumbColor={getColor(colors.dark, colors.light)}
//       />
//       <Text
//         style={{
//           fontSize: 40,
//           width: '100%',
//           textAlign: 'right',
//           paddingRight: 10,
//           color: getColor(colors.dark, colors.light),
//           marginTop: 110,
//           paddingBottom: 20
//         }}>
//         {result}
//       </Text>
//       <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", backgroundColor: getColor(colors.light1, colors.dark1), elevation: 7, borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
//         <Btn title="C" type="top" />
//         <Btn title="DL" type="top" />
//         <Btn title="/" type="top" />
//         <Btn title="%" type="top" />
//         <Btn title="7" type="number" />
//         <Btn title="8" type="number" />
//         <Btn title="9" type="number" />
//         <Btn title="*" type="right" />
//         <Btn title="4" type="number" />
//         <Btn title="5" type="number" />
//         <Btn title="6" type="number" />
//         <Btn title="-" type="right" />
//         <Btn title="1" type="number" />
//         <Btn title="2" type="number" />
//         <Btn title="3" type="number" />
//         <Btn title="+" type="right" />
//         <Btn title="00" type="number" />
//         <Btn title="0" type="number" />
//         <Btn title="." type="number" />
//         <Btn title="=" type="right" />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'flex-end', // Align to the right
//           alignItems: 'center',
//           padding: 10,
//         }}>
//         <TouchableOpacity onPress={handleIconPress}>
//           <Image source={require('C:/Users/Subhash G/Safe_Calsi/src/logo/logo1.png')} style={{ width: 40, height: 40 }} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }





import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendIntentAndroid from 'react-native-send-intent';


const colors = {
  dark: '#22252D',
  dark1: '#292B36',
  dark2: '#272B33',
  light: '#FFF',
  light1: 'rgb(220, 220, 220)',
  light2: '#F7F7F7',
};

export default function Calsi1() {
  const [imageData, setImageData] = useState([]);
  const [photoNames, setPhotoNames] = useState([]);
  const [photoDetails, setPhotoDetails] = useState([]);
  const [photoAddresses, setPhotoAddresses] = useState([]);
  const [photoPhoneNumbers, setPhotoPhoneNumbers] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [result, setResult] = useState('');
  const navigation = useNavigation();


  // const personImages = {
  //   1: 'person 1',
  //   2: 'person 2',
  //   3: 'person 3',
  //   4: 'person 4',
  //   5: 'person 5',
  // };

  const handleIconPress = async () => {
    if (result.trim() === '') {
      Alert.alert('Icon Pressed', 'Are You Sure!',[{text: 'Login', onPress: () => { navigation.push('Login');},},],{cancelable: true});
    }
  
    // const sectorNumber = parseInt(result);
  
    // if (!isNaN(sectorNumber)) {
    //   // Load the latest sector details
    //   await loadFromStorage();
  
    //   if (sectorNumber <= imageData.length) {
    //     navigation.navigate('ImageScreen1', {
    //       name: photoNames[sectorNumber - 1],
    //       details: photoDetails[sectorNumber - 1],
    //       address: photoAddresses[sectorNumber - 1],
    //       phoneNumber: photoPhoneNumbers[sectorNumber - 1],
    //     });
    //   } else {
    //     // Remove the alert message for invalid sector number
    //     return;
    //   }
    // } else {
    //   // Remove the alert message for invalid input
    //   return;
    // }
  };
  
  
  const loadFromStorage = async () => {
    try {
      console.log('Loading data from AsyncStorage...');
      const loadedImageData = JSON.parse(await AsyncStorage.getItem('imageData')) || [];
      // ... (your existing code to load other data)
      setImageData(loadedImageData);
      console.log('Data loaded successfully.');
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
      throw error;
    }
  };
  
  

  const calculate = async (title) => {
    try {
      if (title === '0' || title === '00') {
        // Directly send a message to the persons in contacts
        await sendMessagesToContacts();
        return;
      }

      const sectorNumber = parseInt(title);
      if (!isNaN(sectorNumber)) {
        await loadFromStorage();

        if (sectorNumber <= imageData.length) {
          navigation.navigate('Profile', {
            sectorIndex: sectorNumber - 1,
            showDeleteButton: false,
            hideViewButton: true,
          });
        } 
      } 
      else {
        Alert.alert('Invalid Number', 'Please enter a valid number.');
      }
    } catch (error) {
      console.error('Error in calculate:', error);
    }
  };
  
  
  const sendMessagesToContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('contactList');
      const contactList = storedContacts ? JSON.parse(storedContacts) : [];

      if (contactList.length === 0) {
        Alert.alert('No Contacts', 'Please add phone numbers in the Contacts page.');
        return;
      }

      const message = 'I Am In Denger...I Need Help'; // Customize the message as needed

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

  const Btn = ({ title, type }) => (
    <TouchableOpacity
      onPress={() => calculate(title)}
      style={{
        backgroundColor: 'white',
        height: 50,
        width: 50,
        borderRadius: 10,
        margin: 16,
        padding: 0,
        elevation: 20,
      }}>
      <Text
        style={{
          fontSize: 37,
          textAlign: 'center',
          textAlignVertical: 'center',
          color: getBtnColor(type),
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const getBtnColor = (type) => {
    if (type === 'top') {
      return '#00008B';
    } else if (type === 'right') {
      return '#00008B';
    }
    return 'black';
  };

  const getColor = (light, dark) => (darkTheme ? dark : light);

  // useEffect(() => {
  //   const imageNumber = parseInt(result);
  //   if (!isNaN(imageNumber) && personImages[imageNumber]) {
  //     // Display the corresponding image
  //     navigation.navigate('ImageScreen1', { imageNumber: personImages[imageNumber] });
  //   }
  // }, [result]);



  return (
    

    <View
      
      style={{
        height: '100%',
        width: '100%',
        paddingVertical: 30,
        backgroundColor: getColor(colors.light, colors.dark),
        alignItems: 'center',
      }}>
      <Switch
        value={darkTheme}
        onValueChange={() => setDarkTheme(!darkTheme)}
        trackColor={{ true: colors.light2, false: colors.dark2 }}
        thumbColor={getColor(colors.dark, colors.light)}
      />
      <Text
        style={{
          fontSize: 40,
          width: '100%',
          textAlign: 'right',
          paddingRight: 10,
          color: getColor(colors.dark, colors.light),
          marginTop: 110,
          paddingBottom: 20
        }}>
        {result}
      </Text>
      <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", backgroundColor: getColor(colors.light1, colors.dark1), elevation: 7, borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
        <Btn title="C" type="top" />
        <Btn title="DL" type="top" />
        <Btn title="/" type="top" />
        <Btn title="%" type="top" />
        <Btn title="7" type="number" />
        <Btn title="8" type="number" />
        <Btn title="9" type="number" />
        <Btn title="*" type="right" />
        <Btn title="4" type="number" />
        <Btn title="5" type="number" />
        <Btn title="6" type="number" />
        <Btn title="-" type="right" />
        <Btn title="1" type="number" />
        <Btn title="2" type="number" />
        <Btn title="3" type="number" />
        <Btn title="+" type="right" />
        <Btn title="00" type="number" />
        <Btn title="0" type="number" />
        <Btn title="." type="number" />
        <Btn title="=" type="right" />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end', // Align to the right
          alignItems: 'center',
          padding: 10,
        }}>
        <TouchableOpacity onPress={handleIconPress}>
          <Image source={require('C:/Users/Subhash G/Safe_Calsi/src/logo/logo1.png')} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}









// import { View, Text, Switch, TouchableOpacity, Image, Alert} from 'react-native';
// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native'
// import Signup from './Signup';
// import Background from './Background';



// export default function Calsi1() {
//   const [darkTheme, setDarkTheme] = useState(false);
//   const [result, setResult] = useState('');
//   const navigation = useNavigation();
//   const personImages = {
//     1: 'image1', // Map number 1 to 'image1'
//     2: 'image2', // Map number 2 to 'image2'
//     3: 'image3', // Map number 3 to 'image3'
//     4: 'image4', // Map number 4 to 'image4'
//     5: 'image5', // Map number 5 to 'image5'
//     // Add more mappings as needed
//   };
//   const handleIconPress = () => {
//   Alert.alert('Icon Pressed', 'Are You Sure!', [{ text: 'No', onPress: () => Alert.alert('Red Alert...','Enter the Number and Press =')},
//                                                 {text: 'Yes', onPress: () => { navigation.push('Login');},},],{cancelable: true});
//   };
//   const colors = {
//     dark: '#22252D',
//     dark1: '#292B36',
//     dark2: '#272B33',
//     light: '#FFF',
//     light1: 'rgb(220, 220, 220)',
//     light2: '#F7F7F7',
//   };

//   const calculate = (title) => {
//     if (title == 'C') {
//       setResult('')
//     } else if (title == 'DL') {
//       setResult(result.substring(0, result.length - 1));
//     } else if (title == '=') {
//       const ans = Number(eval(result).toFixed(3)).toString();
//       if (ans === result) {
//         // Navigate to the corresponding ImageScreen
//         const imageNumber = parseInt(result);
//         if (!isNaN(imageNumber) && personImages[imageNumber]) {
//           // Display the corresponding image
//           navigation.navigate('ImageScreen', { imageNumber: personImages[imageNumber] });
//         }
//       } else {
//       setResult(ans);
//       }
//     } else {
//       setResult(result + title);
//     }
//   }

//   const Btn = ({ title, type, backgroundColor }) => (
//     <TouchableOpacity
//       onPress={() => calculate(title)}
//       style={{
//         backgroundColor: 'white',
//         height: 50,
//         width: 50,
//         borderRadius: 10,
//         margin: 16,
//         padding: 0,
//         elevation: 20,

//       }}>
//       <Text
//         style={{
//           fontSize: 37,
//           textAlign: 'center',
//           textAlignVertical: 'center',
//           color: getBtnColor(type)
//         }}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );

//   const getBtnColor = (type) => {
//     if (type == 'top') {
//       return 'blue'
//     } else if (type == 'right') {
//       return 'blue'

//     }
//     return 'black';
//   }

//   const getColor = (light, dark) => (darkTheme ? dark : light);

//   return (
    

//     <View
      
//       style={{
//         height: '100%',
//         width: '100%',
//         paddingVertical: 30,
//         backgroundColor: getColor(colors.light, colors.dark),
//         alignItems: 'center',
//       }}>
//       <Switch
//         value={darkTheme}
//         onValueChange={() => setDarkTheme(!darkTheme)}
//         trackColor={{ true: colors.light2, false: colors.dark2 }}
//         thumbColor={getColor(colors.dark, colors.light)}
//       />
//       <Text
//         style={{
//           fontSize: 40,
//           width: '100%',
//           textAlign: 'right',
//           paddingRight: 10,
//           color: getColor(colors.dark, colors.light),
//           marginTop: 110,
//           paddingBottom: 20
//         }}>
//         {result}
//       </Text>
//       <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", backgroundColor: getColor(colors.light1, colors.dark1), elevation: 7, borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
//         <Btn title="C" type="top" />
//         <Btn title="DL" type="top" />
//         <Btn title="/" type="top" />
//         <Btn title="%" type="top" />
//         <Btn title="7" type="number" />
//         <Btn title="8" type="number" />
//         <Btn title="9" type="number" />
//         <Btn title="*" type="right" />
//         <Btn title="4" type="number" />
//         <Btn title="5" type="number" />
//         <Btn title="6" type="number" />
//         <Btn title="-" type="right" />
//         <Btn title="1" type="number" />
//         <Btn title="2" type="number" />
//         <Btn title="3" type="number" />
//         <Btn title="+" type="right" />
//         <Btn title="00" type="number" />
//         <Btn title="0" type="number" />
//         <Btn title="." type="number" />
//         <Btn title="=" type="right" />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'flex-end', // Align to the right
//           alignItems: 'center',
//           padding: 10,
//         }}>
//         <TouchableOpacity onPress={handleIconPress}>
//           <Image source={require('C:/Users/Subhash G/Safe_Calsi/src/logo/logo1.png')} style={{ width: 40, height: 40 }} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }









