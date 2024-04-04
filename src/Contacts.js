// import React from 'react';
// import {View, Text} from 'react-native';

// export default Main = () => {
//     return (
        

//                 <View>
//                     <Text>This is Alert Screen</Text>
//                 </View>
       
//     );
// }








// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Contacts = () => {
//   const [email, setEmail] = useState('');
//   const [emailList, setEmailList] = useState([]);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     // Load stored emails when the component mounts
//     loadEmails();
    
//     // Focus on the input box when the component mounts
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   const loadEmails = async () => {
//     try {
//       const storedEmails = await AsyncStorage.getItem('emailList');
//       if (storedEmails) {
//         setEmailList(JSON.parse(storedEmails));
//       }
//     } catch (error) {
//       console.error('Error loading emails:', error);
//     }
//   };

//   const saveEmails = async () => {
//     try {
//       await AsyncStorage.setItem('emailList', JSON.stringify(emailList));
//     } catch (error) {
//       console.error('Error saving emails:', error);
//     }
//   };

//   const handleAddEmail = () => {
//     if (email.trim() !== '') {
//       setEmailList([...emailList, email]);
//       setEmail('');
//       saveEmails(); // Save emails after adding an email
//       // Focus on the input box after adding an email
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }
//   };

//   const handleDeleteEmail = (index) => {
//     const updatedEmailList = [...emailList];
//     updatedEmailList.splice(index, 1);
//     setEmailList(updatedEmailList);
//     saveEmails(); // Save emails after deleting an email
//   };

//   const handleSendEmail = async (recipient) => {
//     const sendGridApiKey = 'YOUR_SENDGRID_API_KEY'; // Replace with your SendGrid API key
//     const sendGridUrl = 'https://api.sendgrid.com/v3/mail/send';
  
//     const defaultSubject = 'Emergency';
//     const defaultMessage = 'I am in danger, need help!';
  
//     const body = {
//       personalizations: [
//         {
//           to: [{ email: recipient }],
//           subject: defaultSubject,
//         },
//       ],
//       from: { email: 'your-email@example.com' }, // Replace with your email
//       content: [
//         {
//           type: 'text/plain',
//           value: defaultMessage,
//         },
//       ],
//     };
  
//     try {
//       const response = await fetch(sendGridUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${sendGridApiKey}`,
//         },
//         body: JSON.stringify(body),
//       });
  
//       console.log('SendGrid Response:', response);
  
//       if (response.ok) {
//         console.log('Email sent successfully');
//       } else {
//         console.error('Error sending email:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   };
  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Enter Gmail ID:</Text>
//       <TextInput
//         ref={inputRef}
//         style={styles.input}
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//         placeholder="Enter Gmail ID"
//         keyboardType="email-address"
//       />
//       <Button title="Add Email ID" onPress={handleAddEmail} />

//       <Text style={styles.header}>Added Email IDs:</Text>
//       <FlatList
//         data={emailList}
//         renderItem={({ item, index }) => (
//           <View style={styles.emailContainer}>
//             <Text style={styles.emailItem}>{item}</Text>
//             <TouchableOpacity onPress={() => handleSendEmail(item)}>
//               <Text style={styles.sendButton}>Send Email</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleDeleteEmail(index)}>
//               <Text style={styles.deleteButton}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 8,
//     paddingHorizontal: 8,
//   },
//   emailContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   emailItem: {
//     flex: 1,
//     fontSize: 16,
//     marginRight: 8,
//   },
//   sendButton: {
//     color: 'blue',
//     marginRight: 8,
//   },
//   deleteButton: {
//     color: 'red',
//   },
// });

// export default Contacts;















// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Mailer from 'react-native-mail';

// const Contacts = () => {
//   const [email, setEmail] = useState('');
//   const [emailList, setEmailList] = useState([]);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     // Load stored emails when the component mounts
//     loadEmails();
    
//     // Focus on the input box when the component mounts
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   const loadEmails = async () => {
//     try {
//       const storedEmails = await AsyncStorage.getItem('emailList');
//       if (storedEmails) {
//         setEmailList(JSON.parse(storedEmails));
//       }
//     } catch (error) {
//       console.error('Error loading emails:', error);
//     }
//   };

//   const saveEmails = async () => {
//     try {
//       await AsyncStorage.setItem('emailList', JSON.stringify(emailList));
//     } catch (error) {
//       console.error('Error saving emails:', error);
//     }
//   };

//   const handleAddEmail = () => {
//     if (email.trim() !== '') {
//       setEmailList([...emailList, email]);
//       setEmail('');
//       saveEmails(); // Save emails after adding an email
//       // Focus on the input box after adding an email
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }
//   };

//   const handleDeleteEmail = (index) => {
//     const updatedEmailList = [...emailList];
//     updatedEmailList.splice(index, 1);
//     setEmailList(updatedEmailList);
//     saveEmails(); // Save emails after deleting an email
//   };

//   const handleSendEmail = (recipient) => {
//     const subject = 'Emergency';
//     const body = 'I am in danger, need help!';

//     // Use the Mailer component to send an email
//     Mailer.mail({
//       subject: subject,
//       recipients: [recipient],
//       body: body,
//       isHTML: false,
//     }, (error, event) => {
//       if (error) {
//         console.error('Error sending email:', error);
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Enter Gmail ID:</Text>
//       <TextInput
//         ref={inputRef}
//         style={styles.input}
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//         placeholder="Enter Gmail ID"
//         keyboardType="email-address"
//       />
//       <Button title="Add Email ID" onPress={handleAddEmail} />

//       <Text style={styles.header}>Added Email IDs:</Text>
//       <FlatList
//         data={emailList}
//         renderItem={({ item, index }) => (
//           <View style={styles.emailContainer}>
//             <Text style={styles.emailItem}>{item}</Text>
//             <TouchableOpacity onPress={() => handleSendEmail(item)}>
//               <Text style={styles.sendButton}>Send Email</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleDeleteEmail(index)}>
//               <Text style={styles.deleteButton}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 8,
//     paddingHorizontal: 8,
//   },
//   emailContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   emailItem: {
//     flex: 1,
//     fontSize: 16,
//     marginRight: 8,
//   },
//   sendButton: {
//     color: 'blue',
//     marginRight: 8,
//   },
//   deleteButton: {
//     color: 'red',
//   },
// });

// export default Contacts;












import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendIntentAndroid from 'react-native-send-intent';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Contacts = () => {
  const [countryCode, setCountryCode] = useState('+91');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contactList, setContactList] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    loadContacts();
    requestPermissions();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const requestPermissions = async () => {
    const status = await request(PERMISSIONS.ANDROID.SEND_SMS);
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow the app to send SMS messages.');
    }
  };

  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('contactList');
      if (storedContacts) {
        setContactList(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const saveContacts = async () => {
    try {
      await AsyncStorage.setItem('contactList', JSON.stringify(contactList));
    } catch (error) {
      console.error('Error saving contacts:', error);
    }
  };

  const handleAddContact = () => {
    if (phoneNumber.trim() !== '' && name.trim() !== '') {
      const formattedNumber = `${countryCode}${phoneNumber}`;
      setContactList([...contactList, { name, phoneNumber: formattedNumber }]);
      setPhoneNumber('');
      setName('');
      saveContacts();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleDeleteContact = (index) => {
    const updatedContactList = [...contactList];
    updatedContactList.splice(index, 1);
    setContactList(updatedContactList);
    saveContacts();
  };

  const handleSendAllMessages = async () => {
    if (contactList.length === 0) {
      Alert.alert('No Contacts', 'Please add phone numbers before sending messages.');
      return;
    }
  
    const message = 'I am in Danger... I need help.';
  
    try {
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
      // Alert.alert('Error', `Failed to send messages. Error: ${error.message}`);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Phone Number:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.countryCodeInput}
          value={countryCode}
          onChangeText={(text) => setCountryCode(text)}
          placeholder="Code"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.phoneInput}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
        />
      </View>
      <Text style={styles.header }>Enter Name:</Text>
      <TextInput
        style={styles.nameInput}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter Name"
      />
      {/* <Button title="Add Phone Number" onPress={handleAddContact} /> */}
      <TouchableOpacity onPress={handleAddContact} style={{
            backgroundColor: '#00008B', width: 360, height: 40,
            borderRadius: 30, justifyContent: 'center', alignItems: 'center',
          }}>
            <Text style={{ color: "white", fontSize: 20 }}>Add Phone Number</Text>
          </TouchableOpacity>

      <Text style={styles.header}>Added Phone Numbers:</Text>
      <FlatList
        data={contactList}
        renderItem={({ item, index }) => (
          <View style={styles.contactContainer}>
            <Text style={styles.nameItem}>{item.name}</Text>
            <Text style={styles.phoneNumberItem}>{item.phoneNumber}</Text>
            <TouchableOpacity onPress={() => handleDeleteContact(index)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      
      <TouchableOpacity onPress={handleSendAllMessages} style={{
            backgroundColor: '#00008B', width: 360, height: 40,
            borderRadius: 30, justifyContent: 'center', alignItems: 'center',
          }}>
            <Text style={{ color: "white", fontSize: 20 }}>Send All</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: 'black'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  countryCodeInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  phoneInput: {
    flex: 2,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  nameInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameItem: {
    flex: 1,
    fontSize: 16,
    color: 'blue',
    marginRight: 8,
  },
  phoneNumberItem: {
    flex: 2,
    fontSize: 16,
    marginRight: 8,
  },
  deleteButton: {
    color: 'red',
  },
});

export default Contacts;
