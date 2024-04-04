import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DetailScreen from './DetailScreen';
import Background from './Background';
import Upload from './Upload';


const HomeScreen = () => {
    const navigation = useNavigation();
    const handleMoreDetails = (name, imageUrl, address, phoneNumber) => {
        navigation.navigate('DetailScreen', { name, imageUrl, address, phoneNumber });
    };

    const posts = [
        {
            id: 1,
            username: 'Karnataka, Bangalore-560066',
            imageUrl: require("C:/Users/Subhash G/Safe_Calsi/src/icon/yash1.jpg"),
            caption: 'Name: Rahul.S.M',
            address: '1st main road kempanna layout, Jayanagara, Bangalore-560041',
            phoneNumber: '080-22942096',
        },
        {
            id: 2,
            username: 'Palace Guttahalli, Bangalore-560020',
            imageUrl: require("C:/Users/Subhash G/Safe_Calsi/src/icon/yash2.png"),
            caption: 'Name: Kittu',
            address: 'kempanna layout, Jayanagara, Bangalore-560041',
            phoneNumber: '9875462255',
        },
        {
            id: 3,
            username: 'Golf Stadium, Bangalore-560020',
            imageUrl: require("C:/Users/Subhash G/Safe_Calsi/src/icon/yash3.jpg"),
            caption: 'Name: Naveen Gowda',
            address: '4th main road, Hebbala, Bangalore-560041',
            phoneNumber: '080-65551455',
        },
        {
            id: 4,
            username: 'Malleshwaram, Bangalore-560001',
            imageUrl: require("C:/Users/Subhash G/Safe_Calsi/src/icon/yash4.jpg"),
            caption: 'Name: Sudeep',
            address: '3rd cross, Malleshwaram, Bangalore-560041',
            phoneNumber: '8455541533',
        },
        {
            id: 5,
            username: 'Vyalikaval, Bangalore-560020',
            imageUrl: require("C:/Users/Subhash G/Safe_Calsi/src/icon/yash5.jpg"),
            caption: 'Name: Darshan Thoogudeepa',
            address: '1st main road kempanna layout, Jayanagara, Bangalore-560041',
            phoneNumber: '080-22942096',
        },
        {
            id: 6,
            username: 'Palace Ground, Bangalore-560020',
            imageUrl: require("C:/Users/Subhash G/Safe_Calsi/src/icon/yash6.jpg"),
            caption: 'Name: Shiva Rajkumar',
            address: '1st main road kempanna layout, Jayanagara, Bangalore-560041',
            phoneNumber: '080-225641654',
        },
        // Add more posts here...
    ];

    return (
        <View style={styles.container}>
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Safe Calsi</Text>
            </View> */}
            <ScrollView>
                {posts.map((post) => (
                    <View key={post.id} style={styles.postContainer}>
                        <View style={styles.postHeader}>
                            <Image
                                source={require('C:/Users/Subhash G/Safe_Calsi/src/logo/logo1.png')}
                                style={styles.profileImage}
                            />
                            <Text style={styles.username}>{post.username}</Text>
                        </View>
                        <Image
                            source={post.imageUrl}
                            style={styles.postImage}
                        />
                        <Text style={styles.caption}>{post.caption}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                handleMoreDetails(
                                    post.caption.replace('Name: ', ''),
                                    post.imageUrl,
                                    post.address,
                                    post.phoneNumber
                                )
                            }
                        >
                            <Text style={styles.buttonText}>For More Details, Click Here</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    header: {
        padding: 10,
        borderBottomWidth: 1,
        backgroundColor: '#00ccff',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingRight: 270,
        color: 'black',
    },
    postContainer: {
        backgroundColor: '#fff',


        borderColor: 'rgb(0, 0, 0)',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    postImage: {
        width: '100%',
        height: 300,
    },
    caption: {
        padding: 10,
        color: 'blue',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 100
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
