import { Button, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const handleLogin = async () => {
    const redirectUri =
      Constants.appOwnership === 'expo'
        ? AuthSession.makeRedirectUri({ scheme: 'finance-tracking-mobile' })
        : 'finance-tracking-mobile://auth';
    const result = await WebBrowser.openAuthSessionAsync(
      'http://localhost:8080/api/v1/auth/google',
      // 'https://finance-tracking-production.up.railway.app/api/v1/auth/google',
      'finance-tracking-mobile://auth'
    );

    if (result.type !== 'success') return;
    const url = Linking.parse(result.url);
    const token = url.queryParams?.token?.toString() ?? null;
    if (!token) return;

    await SecureStore.setItemAsync('token', token);
  };

  const token = SecureStore.getItemAsync('token');
  console.log('TOKEN', token);

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Google" onPress={handleLogin} />
    </View>
  );
}
