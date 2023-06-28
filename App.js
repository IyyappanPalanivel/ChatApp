import React, { useEffect } from 'react';
import {
  Platform
} from 'react-native';
import Root from './src/stacks/Root';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFBMessaging from '@react-native-firebase/messaging';
import * as Permissions from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { SendbirdUIKitContainer, 
  createNativeClipboardService, 
  createNativeNotificationService 
} from '@sendbird/uikit-react-native';
import { APP_ID } from './src/utils/Constant';

const ClipboardService = createNativeClipboardService(Clipboard);


const NotificationService = createNativeNotificationService({
  messagingModule: RNFBMessaging,
  permissionModule: Permissions,
});


messaging().setBackgroundMessageHandler(async (message) => {
  const isSendbirdNotification = Boolean(message.data.sendbird);
  if (!isSendbirdNotification) return;

  const text = message.data.message;
  const payload = JSON.parse(message.data.sendbird);

  const channelId = await notifee.createChannel({
    id: 'NOTIFICATION_CHANNEL_ID',
    name: 'NOTIFICATION_CHANNEL_NAME',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    id: message.messageId,
    title: 'New message has arrived!',
    subtitle: `Number of unread messages: ${payload.unread_message_count}`,
    body: payload.message,
    data: payload,
    android: {
      channelId,
      smallIcon: NOTIFICATION_ICON_RESOURCE_ID,
      importance: AndroidImportance.HIGH,
    },
    ios: {
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
    },
  });
});

// const onNotificationIOS = (notification) => {
//   const data = notification?.getData();
//   if (data && data.userInteraction === 1 && Boolean(data.sendbird)) {
//       // Navigate to channel.
//       // const channelUrl = data.sendbird.channel.channel_url;
//   }
// }

const onNotificationAndroid = async (event) => {
  if (event.type === EventType.PRESS && Boolean(event.detail.notification?.data?.sendbird)) {
    // Navigate to channel.
    // const channelUrl = event.detail.notification.data.sendbird.channel.channel_url;
  }
}


const App = () => {

  useEffect(() => {
    console.log('....');
    const initializeSendbird = async () => {

      const sb = {
        registerFCMPushTokenForCurrentUser: async (token) => {
          console.log('>>>>>>>>>>>>>', token);
        },
      };
      
      //const sb = new SendBird({ appId:APP_ID });
      if (Platform.OS === 'android') {
        const token = await messaging().getToken();
        console.log('>>>>>>>>>>>>>',token)
        await sb.registerFCMPushTokenForCurrentUser(token);
      }

      // if (Platform.OS === 'ios') {
      //   const token = await messaging().getAPNSToken();
      //   await sb.registerAPNSPushTokenForCurrentUser(token);
      // } else {
      //   const token = await messaging().getToken();
      //   await sb.registerFCMPushTokenForCurrentUser(token);
      // }
    };

    initializeSendbird();

    const unsubscribe = notifee.onForegroundEvent(onNotificationAndroid);
    return () => {
      PushNotificationIOS.removeEventListener('localNotification');
      unsubscribe();
    }

  }, []);

  return (
    <SendbirdUIKitContainer
      appId={APP_ID}

      chatOptions={{
        localCacheStorage: AsyncStorage,
        enableChannelListTypingIndicator: true,
        enableChannelListMessageReceiptStatus: true,
        enableChannelListMessageReceiptStatus: true,
        enableUserMention: true
      }}
      platformServices={{
        clipboard: ClipboardService,
        notification: NotificationService,
        clipboard: ClipboardService,
      }}
      userProfile={{
        onCreateChannel: (user) => {
          // Logic to create a new channel for the user
          // You can implement your own logic to create a channel or use the SendBird SDK methods.
        },
      }}
    >
      <Root />
    </SendbirdUIKitContainer>
  );

};

notifee.onBackgroundEvent(onNotificationAndroid)

export default App;
