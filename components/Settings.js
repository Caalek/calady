import { View, Text, StyleSheet, Image } from "react-native";
export default function SettingsScreen() {
  return (

    <View style={styles.container}>
      <View style={styles.settings}></View>
      <Text style={styles.text}>Obrazki kategorii</Text>
      <Text style={styles.text}>Przycisk "wyjdź" w grze</Text>

      <View style={styles.iconContainer}>
        <Image style={{height: 50, width: 50}}   source={require("../assets/github-mark.png")}></Image>
        <Image style={styles.discordIcon} source={require("../assets/discord-mark-black.png")}></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    margin: "5%",
    // justifyContent: "center",
    // alignItems: "center"
    textAlign: "left"
  },
  settings: {
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 20,
    fontFamily: "TitanOne",
    alignSelf: "flex-end"
  },
  iconContainer: {
    marginTop: "100%",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    gap: 20
  },
  discordIcon: {
    marginTop: 7,
    height: 37, width: 52
  }
});
