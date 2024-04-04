// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// class CameraApp extends Component {
//   constructor(props) {
//     super(props);
//     this.camera = null;
//   }

//   takePicture = async () => {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   };

//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <RNCamera
//           ref={(ref) => {
//             this.camera = ref;
//           }}
//           style={{ flex: 1, width: '100%' }}
//           type={RNCamera.Constants.Type.back}
//         />
//         <TouchableOpacity
//           onPress={this.takePicture}
//           style={{ flex: 0, alignSelf: 'center' }}
//         >
//           <Text>Take Picture</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// export default CameraApp;
