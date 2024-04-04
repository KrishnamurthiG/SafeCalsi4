const photo = async () => {
    if (fullImgRefPath) {
      try {
        // Prepare the image data to send to the server
        const formData = new FormData();
        formData.append('image', {
          uri: fullImgRefPath,
          type: 'image/jpeg', // Adjust the content type based on your image type
          name: 'my_image.jpg',
        });
  
        // Make a POST request to your backend API
        const response = await fetch('YOUR_BACKEND_UPLOAD_ENDPOINT', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          // Image successfully uploaded
          console.log('Image uploaded successfully');
          // You can navigate to another screen or perform other actions here
        } else {
          // Handle upload failure
          console.log('Image upload failed');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  










  import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';

export default function Upload() {
  const [imageData, setImageData] = useState(null);
  const [fullImgRefPath, setFullImgRefPath] = useState('');
  const navigation = useNavigation();

  const pickImage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log(response);
      setImageData(response);

      const imageName = 'my_image.jpg';
      const destPath = `${RNFS.DocumentDirectoryPath}/${imageName}`;

      await RNFS.copyFile(response.uri, destPath);
      setFullImgRefPath(destPath);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = async () => {
    try {
      if (fullImgRefPath) {
        await RNFS.unlink(fullImgRefPath); // Delete the image file
        setFullImgRefPath('');
        setImageData(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = () => {
    if (fullImgRefPath) {
      // Pass the image URI to the home screen using navigation state
      navigation.navigate('HomeScreen', { imageUri: fullImgRefPath });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageData ? (
        <Image
          source={{ uri: imageData.uri }}
          style={{ height: 200, width: 200, marginBottom: 20 }}
        />
      ) : (
        <Text>No Image Found</Text>
      )}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Button title="Select Image" onPress={() => pickImage()} />
        <Button title="Delete Image" onPress={() => deleteImage()} />
        <Button title="Upload" onPress={() => uploadImage()} />
      </View>
    </View>
  );
}


















//Firebase video code
// import {View, Text, Button, Image} from 'react-native';
// import React, {useState} from 'react';
// import DocumentPicker from 'react-native-document-picker';
// import storage from '@react-native-firebase/storage';

// export default function ImageUpload() {
//   const [imageData, setImageData] = useState(null);
//   const [fullImgRefPath, setFullImgRefPath] = useState('');
//   const [imgDownloadUrl, setImgDownloadUrl] = useState('');

//   const pickImage = async () => {
//     try {
//       const response = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images],
//         copyTo: 'cachesDirectory',
//       });
//       console.log(response);
//       setImageData(response);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const uploadImage = async () => {
//     try {
//       const response = storage().ref(`/profile/${imageData.name}`);

//       const put = await response.putFile(imageData.fileCopyUri);

//       setFullImgRefPath(put.metadata.fullPath);
//       const url = await response.getDownloadURL();

//       setImgDownloadUrl(url);

//       alert('Image Uploaded Successfully');
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteImage = async () => {
//     try {
//       const response = await storage().ref(fullImgRefPath).delete();
//       console.log(response);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       {imageData ? (
//         <Image
//           source={{uri: imageData.uri}}
//           style={{height: 200, width: 200, marginBottom: 20}}
//         />
//       ) : (
//         <Text>No Image Found</Text>
//       )}
//       <View
//         style={{
//           width: '100%',
//           flexDirection: 'row',
//           justifyContent: 'space-around',
//         }}>
//         <Button title="Select Image" onPress={() => pickImage()} />
//         <Button title="Upload Image" onPress={() => uploadImage()} />
//         <Button
//           title="Delete Image"
//           onPress={() => deleteImage()}
//           color="red"
//         />
//       </View>

//       <View style={{marginTop: 30}}>
//         <Text>
//           Url = {imgDownloadUrl.length > 0 ? imgDownloadUrl : 'not found'}
//         </Text>
//       </View>

//       <Image source={{uri: imgDownloadUrl}} style={{height: 300, width: 300}} />
//     </View>
//   );
// }