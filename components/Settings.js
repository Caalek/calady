import { View, Text, StyleSheet, Image, Pressable, BackHandler } from "react-native";
import Setting from "./Setting";
import settings from "../utils/settings";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking"
export default function SettingsScreen({navigation}) {
  const [settingShowBackButtonGame, setSettingShowBackButtonGame] = useState()
  const [settingShowImagesHome, setSettingShowImagesHome] = useState()
  const [loading, setLoading] = useState(true)

  const GITHUB_URL = "https://github.com/Caalek"
  const DISCORD_URL = "mailto:calekdev@gmail.com"

  useEffect(() => {
    async function setData() {
      const set1 = await settings.getNumber("settingShowBackButtonGame")
      const set2 = await settings.getNumber("settingShowImagesHome")
      setSettingShowBackButtonGame(set1)
      setSettingShowImagesHome(set2)
      setLoading(false)
    }
    setData()
  }, [])

  async function changeSetting(key, value) {
    await settings.setNumber(key, value);
  }

  if (!loading) {
    return (
      <View style={styles.container}>
        <View style={styles.settings}>
          <Setting
            defaultChecked={settingShowBackButtonGame}
            onCheck={() => changeSetting("settingShowBackButtonGame", 1)}
            onUncheck={() => changeSetting("settingShowBackButtonGame", 0)}
            title={`Przycisk "wyjdź" w grze`}
          />
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.bottomTextSmall}>Made with ♥️ by Calek</Text>
          <Text style={styles.bottomText}>Kontakt</Text>
          <View style={styles.iconContainer}>
              <Pressable onPress={() => Linking.openURL(GITHUB_URL)}>
              <Image
                style={{ height: 50, width: 50 }}
                source={require("../assets/github-mark.png")}
              ></Image>
              </Pressable>
            <Pressable onPress={() => Linking.openURL(DISCORD_URL)}>
            <Image
              style={styles.mailIcon}
              source={require("../assets/mail.png")}
            ></Image>
            </Pressable>
          </View>
          <Pressable onPress={() => navigation.navigate("ImageCreditScreen")} style={styles.credits}>
            <Text style={styles.creditsText}>Źródła zdjęć</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    flexDirection: "column",
    margin: "2%",
    height: '90%',
    gap: 100
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
  mailIcon: {
    marginTop: 7,
    height: 37,
    width: 52,
  },
  credits: {
    marginTop: 10,
  },
  creditsText: {
    fontFamily: "TitanOne"
  },
  settings: {
    height: "10%",
  },
  bottomText: {
    fontSize: 23,
    fontFamily: "TitanOne"
  },
  bottomTextSmall: {
    fontSize: 13,
    fontFamily: "TitanOne"
  },
  middleContainer: {
    bottom: 0,
    position: 'absolute',
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    gap: 10,
    flexDirection: 'column'
  }
});
