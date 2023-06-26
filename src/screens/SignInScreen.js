import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, StyleSheet, Alert } from 'react-native';
import { useConnection } from '@sendbird/uikit-react-native';

const SignInScreen = () => {
    const { connect } = useConnection();
    const [userId, setUserId] = useState();
    const [nickName, setNickName] = useState();
    const [token, setToken] = useState()

    const signin = async () => {
        if (userId == '') {
            Alert.alert('Enter your useid');
        } else if (nickName == '') {
            Alert.alert('Enter your nickname');
        } else if (nickName.length >= 25) {
            Alert.alert('Your nickname is too long');
        } else {
            console.log("before connection");
            try {
              const response = await connect(userId, {
                nickname: nickName,
                accessToken: token,
              });
              console.log("after successful connection", response);
            } catch (error) {
              console.log(error);
            }
        }
    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <TextInput placeholder='Enter User_id'
                style={style.input}
                placeholderTextColor={'black'}
                onChangeText={id => setUserId(id)}
                defaultValue={userId} />

            <TextInput placeholder='Enter Nickname'
                style={style.input}
                placeholderTextColor={'black'}
                onChangeText={name => setNickName(name)}
                defaultValue={nickName} />

            <TextInput placeholder='Enter Accesstoken'
                style={style.input}
                placeholderTextColor={'black'}
                onChangeText={access => setToken(access)}
                defaultValue={token} />

            <Pressable
                style={{
                    width: 120,
                    height: 30,
                    backgroundColor: '#742DDD',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => signin()}
            >
                <Text>{'Sign in'}</Text>
            </Pressable>
        </View>
    );
};

export default SignInScreen;

const style = StyleSheet.create({
    input: {
        borderWidth: 1,
        width: '80%',
        alignSelf: 'center',
        marginVertical: 10, 
        
    }
})