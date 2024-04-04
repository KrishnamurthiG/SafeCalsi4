import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import Backgroundthree from './Backgroundthree';
import Field2 from './Field2';
import database from '@react-native-firebase/database';
import { SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Feed from './Feed';


const Post = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [skinColor, setSkinColor] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [health, setHealth] = useState('');
    const [imageData, setImageData] = useState('');
    const [fullImgRefPath, setFullImgRefPath] = useState('');
    const [imgDownloadUrl, setImgDownloadUrl] = useState('');
    const [postId, setPostId] = useState('');

    const navigation = useNavigation();

    const writeToDatabase = async () => {
        try {
            // Define the data you want to store in the database
            const data = {
                name,
                age,
                skinColor,
                address,
                contactNumber,
                health,
                imageUrl: imgDownloadUrl, // Store the image URL
            };

            // Reference to the Firebase database path where you want to store the data
            const databaseRef = database().ref('/missingPersons');

            // Push the data to the database and get the unique key
            const newPostRef = await databaseRef.push();
            const postId = newPostRef.key;
            setPostId(postId);

            // Create a folder in Firebase Storage with the same unique key
            const storageRef = storage().ref(`/post/${postId}`);

            // Upload the data as JSON
            await storageRef.child('data.json').putString(JSON.stringify(data), 'raw');

            const imageResponse = storageRef.child(`${imageData.name}`);
            const imagePut = await imageResponse.putFile(imageData.fileCopyUri);
            setFullImgRefPath(imagePut.metadata.fullPath);
            const imageUrl = await imageResponse.getDownloadURL();
            setImgDownloadUrl(imageUrl);

            // Alert the user
            alert('Data and Image Uploaded Successfully');

            // Navigate to the Feed.js page
            navigation.navigate('Feed');
        } catch (err) {
            console.log(err);
        }
    };
    const pickImage = async () => {
        try {
            const response = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
                copyTo: "cachesDirectory"
            });
            console.log(response);
            setImageData(response);
        } catch (err) {
            console.log(err);
        }
    };



    const uploadImage = async () => {
        try {
            // Create a folder in Firebase Storage with the same unique key


            // After successfully uploading the image, write the data to the database
            writeToDatabase();
        } catch (err) {
            console.log(err);
        }
    };







    const deleteImage = async () => {
        try {
            const response = await storage().ref(fullImgRefPath).delete();
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Backgroundthree>

            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Enter Missing Person Details</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Feed') }} style={styles.arrowContainer}>
                        <Image
                            source={require('D:/Kittu/MissingPerson_App/assets/icons/arrow.png')}
                            resizeMode='contain'
                            style={{
                                width: 40, height: 40, paddingLeft: 120
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.form}>
                    <Field2 placeholder="Full Name" value={name} onChangeText={value => setName(value)} />
                    <Field2 placeholder="Age" value={age} keyboardType="number-pad" onChangeText={value => setAge(value)} />
                    <Field2 placeholder="Skin Color" value={skinColor} onChangeText={value => setSkinColor(value)} />
                    <Field2 placeholder="Address" value={address} onChangeText={value => setAddress(value)} />
                    <Field2 placeholder="Contact Number" keyboardType="number-pad" value={contactNumber} onChangeText={value => setContactNumber(value)} />
                    <Field2 placeholder="Any Health Condition(If there's Nothing, Type NO)" value={health} onChangeText={value => setHealth(value)} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {imageData ? (
                        <Image
                            source={{ uri: imageData.uri }}
                            style={{ height: 100, width: 100, marginBottom: 20 }}
                        />
                    ) : (
                        <Text>No Image Found</Text>
                    )}
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}>
                        <Button title="Select Image" onPress={() => pickImage()} />
                        <Button title="Upload" onPress={() => uploadImage()} />
                        <Button
                            title="Delete Post"
                            onPress={() => deleteImage()}
                            color="red"
                        />
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text>
                            Url = {imgDownloadUrl.length > 0 ? imgDownloadUrl : 'not found'}
                        </Text>
                    </View>

                    <Image source={{ uri: imgDownloadUrl }} style={{ height: 300, width: 300 }} />
                </View>
            </View>

        </Backgroundthree>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    arrowContainer: {
        paddingRight: 20,
    },
    form: {
        marginBottom: 20,
    },
    imagePickerButton: {
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        marginTop: 10,
    },
    imagePickerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginTop: 10,
        alignSelf: 'center',
    },
    uploadButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
    },
    uploadButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Post;














