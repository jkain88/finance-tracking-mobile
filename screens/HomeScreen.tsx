import { Text, View } from 'react-native';

import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function HomeScreen() {
  const { data, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const token = await SecureStore.getItemAsync('token');
      const response = await fetch(
        process.env.EXPO_PUBLIC_API_URL + '/api/v1/user/me',
        {
          headers: {
            Authorization: token!,
          },
        }
      );
      return response.json();
    },
  });
  if (isPending || data === undefined) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Hi, {data.email}</Text>
    </View>
  );
}
