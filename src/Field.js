import React from 'react';
import {TextInput} from 'react-native';

export default Field = () => {
    return (
        <TextInput>
            
            style={{borderRadius: 100, color: 'black', paddingHorizontal: 10, 
            width: '78%', backgroundColor: 'purple', marginevertical: 10 }}
            placeholderTextColor={'white'}

        </TextInput>
    );
}