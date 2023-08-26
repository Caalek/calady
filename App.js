import { useEffect, useState } from "react";
import HomeScreen from "./components/HomeScreen";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameSettingsScreen from "./components/GameSettingsScreen";
import GameScreen from "./components/GameScreen";
import GameFinishScreen from "./components/GameFinishScreen";
import SettingsScreen from "./components/Settings";
import MenuButton from "./components/MenuButton";
import ImageCreditScreen from "./components/ImageCreditScreen";
import PhraseListScreen from "./components/PhraseListScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { openDatabase } from "./utils/openDatabase"

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        TitanOne: require("./assets/fonts/TitanOne-Regular.ttf"),
        Inter: require("./assets/fonts/Inter.ttf")
      });
      setFontsLoaded(true);
    }
    loadFonts();

    async function setDefaultValues() {

      // settings
      let keys = [];
      try {
        keys = await AsyncStorage.getAllKeys();
      } catch (e) {
        console.error(error)
      }
      if (keys.length !== 5) {
        await AsyncStorage.setItem("settingPhrases", "10")
        await AsyncStorage.setItem("settingSeconds", "180")
        await AsyncStorage.setItem("settingShowBackButton", "1")
        await AsyncStorage.setItem("settingSoundEffects", "1")
        await AsyncStorage.setItem("instances", JSON.stringify({}))
      }

      if (!await AsyncStorage.getItem("instances")) {
        let instancesObject = {}
        let ids = []
        const db = await openDatabase()
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT id FROM phrases",
            [],
            async (_, results) => {
              for (result of results.rows._array) {
                ids.push(result["id"])
              }
              for (id of ids) {
                instancesObject[id] = 0
              }
              await AsyncStorage.setItem("instances", JSON.stringify(instancesObject))
            },
            (error) => {
              console.log("Query error:", error);
            }
          );
        });

      }
    }
    setDefaultValues()
  }, []);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#52a9ff",
            },
            headerTitleStyle: {
              fontFamily: "TitanOne",
              fontSize: 25,
              color: "white",
            },
            headerBackTitleVisible: false,
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Calady",
              headerRight: () => <MenuButton />,
            }}
          />
          <Stack.Screen
            name="GameSettings"
            component={GameSettingsScreen}
            options={{ title: "Ustawienia gry" }}
          ></Stack.Screen>
          <Stack.Screen
            name="GameScreen"
            component={GameScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="GameFinishScreen"
            component={GameFinishScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ title: "Ustawienia" }}
          ></Stack.Screen>
          <Stack.Screen
            name="ImageCreditScreen"
            component={ImageCreditScreen}
            options={{ title: "Źródła" }}
          ></Stack.Screen>
          <Stack.Screen
            name="PhraseListScreen"
            component={PhraseListScreen}
            options={{ title: "Hasła" }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
