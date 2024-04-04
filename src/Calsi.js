// import { View, Text, Switch, TouchableOpacity, Image, Alert} from 'react-native';
// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import Signup from './Signup';
// import Background from './Background';
// import Calsi1 from './Calsi1';



// export default function Calsi() {
//   const [darkTheme, setDarkTheme] = useState(false);
//   const [result, setResult] = useState('');
//   const navigation = useNavigation();
//   const handleIconPress = () => {
//   Alert.alert('Icon Pressed', 'Are You Sure!', [{ text: 'No', onPress: () => Alert.alert('Red Alert...','Enter the Number and press =',[{text: 'OK', onPress: () => { navigation.push('Calsi1');},}],{cancelable: true})},
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
//       setResult(ans);
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







import { View, Text, Switch, TouchableOpacity, Image, Alert, BackHandler} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Signup from './Signup';
import Background from './Background';
import Calsi1 from './Calsi1';



export default function Calsi() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [result, setResult] = useState('');
  const navigation = useNavigation();
  const handleIconPress = () => {
  Alert.alert('Icon Pressed', 'Are You Sure!', [{ text: 'Alert', onPress: () => Alert.alert('Red Alert...','Enter the Number',[{text: 'OK', onPress: () => { navigation.push('Calsi1');},}],{cancelable: true})},
                                                {text: 'Login', onPress: () => { navigation.push('Login');},},],{cancelable: true});
  };

  // const handleIconPress = () => {
  //   Alert.alert('Icon Pressed', 'Are You Sure!', [ {text: 'Alert', onPress: () => { navigation.push('Calsi1');}},
  //                                                 {text: 'Login', onPress: () => { navigation.push('Login');},},],{cancelable: true});
  //   };

  const colors = {
    dark: '#22252D',
    dark1: '#292B36',
    dark2: '#272B33',
    light: '#FFF',
    light1: 'rgb(220, 220, 220)',
    light2: '#F7F7F7',
  };

  const calculate = (title) => {
    if (title == 'C') {
      setResult('')
    } else if (title == 'DL') {
      setResult(result.substring(0, result.length - 1));
    } else if (title == '=') {
      const ans = Number(eval(result).toFixed(3)).toString();
      setResult(ans);
    } else {
      setResult(result + title);
    }
  }

  const Btn = ({ title, type, backgroundColor }) => (
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
          color: getBtnColor(type)
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const getBtnColor = (type) => {
    if (type == 'top') {
      return '#00008B'
    } else if (type == 'right') {
      return '#00008B'

    }
    return 'black';
  }

  const getColor = (light, dark) => (darkTheme ? dark : light);

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







