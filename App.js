import { useEffect, useState } from 'react';
import {Button, Image} from "react-native"
import HomeScreen from './components/HomeScreen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GameSettingsScreen from './components/GameSettingsScreen';
import GameScreen from './components/GameScreen';
import GameFinishScreen from './components/GameFinishScreen';
import SettingsScreen from './components/Settings';
import MenuButton from './components/MenuButton';

const Stack = createNativeStackNavigator();


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'TitanOne': require("./assets/fonts/TitanOne-Regular.ttf")
      })
      setFontsLoaded(true)
    }
    loadFonts()
  }, [])

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerStyle: {
            backgroundColor: "#52a9ff"
          },
          headerTitleStyle: {
            fontFamily: "TitanOne",
            fontSize: 25,
            color: "white"
          },
          headerBackTitleVisible: false,
          headerTintColor: "white"
        }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Czółko",
              headerRight: () => (
                <MenuButton/>
              )
            }
            }
          />
          <Stack.Screen name="GameSettings" component={GameSettingsScreen} options={{title: "Ustawienia gry"}}></Stack.Screen>
          <Stack.Screen name="GameScreen" component={GameScreen} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="GameFinishScreen" component={GameFinishScreen} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{title: "Ustawienia"}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

