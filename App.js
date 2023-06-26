/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { SendbirdUIKitContainer, createNativeClipboardService, createNativeNotificationService } from '@sendbird/uikit-react-native';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import Root from './src/stacks/Root';
import { APP_ID } from './src/utils/Constant';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFBMessaging from '@react-native-firebase/messaging';
import * as Permissions from 'react-native-permissions';

const ClipboardService = createNativeClipboardService(Clipboard);

const NotificationService = createNativeNotificationService({
  messagingModule: RNFBMessaging,
  permissionModule: Permissions,
});

const App = () => {
  return (
    <SendbirdUIKitContainer
      appId={APP_ID}
      chatOptions={{ localCacheStorage: AsyncStorage }}
      platformServices={{
        clipboard: ClipboardService,
        notification: NotificationService,
      }}
    >
      <Root />
    </SendbirdUIKitContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
