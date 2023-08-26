import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Setting from "./Setting";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({navigation}) {
  const [settingShowBackButton, setSettingShowBackButton] = useState()
  const [settingSoundEffects, setSettingSoundEffects] = useState()

  const [loading, setLoading] = useState(true)

  const GITHUB_URL = "https://github.com/Caalek"
  const DISCORD_URL = "mailto:calekdev@gmail.com"

  useEffect(() => {
    async function setData() {
      const showBackButton = parseInt(await AsyncStorage.getItem("settingShowBackButton"))
      setSettingShowBackButton(showBackButton)
      const soundEffects = parseInt(await AsyncStorage.getItem("settingSoundEffects"))
      setSettingSoundEffects(soundEffects)
      setLoading(false)
    }
    setData()
  }, [])

  async function setSetting(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.error(e)
    }
  }

  if (!loading) {
    return (
      <View style={styles.container}>
        <View style={styles.settings}>
          <Setting
            defaultChecked={settingShowBackButton}
            onCheck={() => setSetting("settingShowBackButton", "1")}
            onUncheck={() => setSetting("settingShowBackButton", "0")}
            title={`Przycisk "wyjdź" w grze`}
          />
          <Setting
            defaultChecked={settingSoundEffects}
            onCheck={() => setSetting("settingSoundEffects", "1")}
            onUncheck={() => setSetting("settingSoundEffects", "0")}
            title={"Efekty dźwiękowe"}
          />
        </View>
        <View style={styles.middleContainer}>
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
    height: "15%"
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
