import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupChannelListScreen from '../components/GroupChannelListScreen';
import GroupChannelCreateScreen from '../components/GroupChannelCreateScreen';
import GroupChannelScreen from '../components/GroupChannelScreen';
import SignInScreen from '../screens/SignInScreen';
import { useSendbirdChat } from '@sendbird/uikit-react-native';

const RootStack = createNativeStackNavigator();

const Root = () => {
    const { currentUser } = useSendbirdChat();
    console.log('////////////',currentUser);

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {!currentUser ? (
                    <RootStack.Screen name={'SignIn'} component={SignInScreen} />
                ) : (
                    <>
                        <RootStack.Screen name={'GroupChannelList'} component={GroupChannelListScreen} />
                        <RootStack.Screen name={'GroupChannelCreate'} component={GroupChannelCreateScreen} />
                        <RootStack.Screen name={'GroupChannel'} component={GroupChannelScreen} />
                    </>
                )}  
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default Root;