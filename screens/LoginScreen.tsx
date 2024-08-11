import { Button, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/Navigation';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleLogin = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      'https://finance-tracking-production.up.railway.app/api/v1/auth/google',
      'finance-tracking-mobile://auth'
    );

    if (result.type !== 'success') return;
    const url = Linking.parse(result.url);
    const token = url.queryParams?.token?.toString() ?? null;
    if (!token) return;

    await SecureStore.setItemAsync('token', token);
    navigation.navigate('Home');
  };

  return (
    <View>
      <Button title="Login with Google" onPress={handleLogin} />
    </View>
  );
}
