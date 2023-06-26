import { useNavigation, useRoute } from '@react-navigation/native';
import {
    useSendbirdChat,
    createGroupChannelListFragment,
    createGroupChannelCreateFragment,
    createGroupChannelFragment,
} from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';

const GroupChannelListFragment = createGroupChannelListFragment();
const GroupChannelCreateFragment = createGroupChannelCreateFragment();
const GroupChannelFragment = createGroupChannelFragment();

const GroupChannelListScreen = () => {
    const navigation = useNavigation<any>();
    return (
        <GroupChannelListFragment
            onPressCreateChannel={(channelType) => {
                // Navigate to GroupChannelCreate function.
                navigation.navigate('GroupChannelCreate', { channelType });
            }}
            onPressChannel={(channel) => {
                // Navigate to GroupChannel function.
                navigation.navigate('GroupChannel', { channelUrl: channel.url });
            }}
        />
    );
};

const GroupChannelCreateScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <GroupChannelCreateFragment
            onCreateChannel={async (channel) => {
                // Navigate to GroupChannel function.
                navigation.replace('GroupChannel', { channelUrl: channel.url });
            }}
            onPressHeaderLeft={() => {
                // Go back to the previous screen.
                navigation.goBack();
            }}
        />
    );
};

const GroupChannelScreen = () => {
    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();

    const { sdk } = useSendbirdChat();
    const { channel } = useGroupChannel(sdk, params.channelUrl);
    if (!channel) return null;

    return (
        <GroupChannelFragment
            channel={channel}
            onChannelDeleted={() => {
                // Navigate to GroupChannelList function.
                navigation.navigate('GroupChannelList');
            }}
            onPressHeaderLeft={() => {
                // Go back to the previous screen.
                navigation.goBack();
            }}
            onPressHeaderRight={() => {
                // Navigate to GroupChannelSettings function.
                navigation.navigate('GroupChannelSettings', { channelUrl: params.channelUrl });
            }}
        />
    );
};