import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useColorScheme } from '@/hooks/use-color-scheme';

const TAB_ACTIVE_COLOR = '#7a0002';

function tabIcon(source: number, focused: boolean, color: string) {
  return (
    <Image
      source={source}
      style={{
        width: focused ? 32 : 26,
        height: focused ? 32 : 26,
        tintColor: focused ? TAB_ACTIVE_COLOR : color,
      }}
    />
  );
}

export default function TabLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const inactiveColor = colorScheme === 'dark' ? '#9BA1A6' : '#687076';

  return (
    <Tabs
      initialRouteName="events"
      screenOptions={{
        tabBarActiveTintColor: TAB_ACTIVE_COLOR,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="events"
        options={{
          title: t('tabs.events'),
          tabBarIcon: ({ color, focused }) =>
            tabIcon(require('@/assets/icons/list-outline.png'), focused, color),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: t('tabs.map'),
          tabBarIcon: ({ color, focused }) =>
            tabIcon(require('@/assets/icons/earth-outline.png'), focused, color),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          tabBarIcon: ({ color, focused }) =>
            tabIcon(require('@/assets/icons/settings-outline.png'), focused, color),
        }}
      />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
