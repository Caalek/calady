import { View, Text, StyleSheet, Image } from "react-native";
import Checkbox from "./Checkbox";
export default function Setting({ defaultChecked, onCheck, onUncheck, title }) {
  return (
    <View style={styles.settingsContainer}>
      <Checkbox
        defaultChecked={defaultChecked}
        onCheck={onCheck}
        onUncheck={onUncheck}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: "25%",
  },
  text: {
    fontSize: 20,
    fontFamily: "TitanOne",
  },
});
