import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useConnection } from '@sendbird/uikit-react-native';

const SignInScreen = () => {
    const { connect } = useConnection();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Pressable
                style={{
                    width: 120,
                    height: 30,
                    backgroundColor: '#742DDD',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => connect('USER_ID', { nickname: 'NICKNAME' })}
            >
                <Text>{'Sign in'}</Text>
            </Pressable>
        </View>
    );
};

export default SignInScreen;