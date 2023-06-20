import { useEffect, useState } from 'react';
import HomeScreen from './components/HomeScreen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GameSettingsScreen from './components/GameSettingsScreen';
import GameScreen from './components/GameScreen';
import GameFinishScreen from './components/GameFinishScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Lexend': require("./assets/fonts/LexendDeca-Regular.ttf"),
        'TitanOne': require("./assets/fonts/TitanOne-Regular.ttf")
      })
      setFontsLoaded(true)
    }
    loadFonts()
      , []
  })

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerStyle: {
            backgroundColor: "#52a9ff"
          },
          headerTitleStyle: {
            fontFamily: "Lexend",
            fontSize: 25,
            color: "white"
          },
          headerBackTitleVisible: false,

        }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Czółko" }}
          />
          <Stack.Screen name="GameSettings" component={GameSettingsScreen} options={{title: "Ustawienia gry"}}></Stack.Screen>
          <Stack.Screen name="GameScreen" component={GameScreen} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="GameFinishScreen" component={GameFinishScreen} options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

