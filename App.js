import { useEffect, useState } from 'react';
import HomeScreen from './components/HomeScreen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ConfigScreen from './components/GameSettingsScreen';
import GameSettingsScreen from './components/GameSettingsScreen';
import GameScreen from './components/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {

    async function loadFonts() {
      await Font.loadAsync({
        'Montserrat': require("./assets/fonts/Montserrat-Regular.ttf"),
        'Lexend': require("./assets/fonts/LexendDeca-Regular.ttf")
      })
      setFontsLoaded(true)
      console.log("shit")
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
          <Stack.Screen name="GameScreen" component={GameScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

