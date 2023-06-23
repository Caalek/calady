import { useState } from "react";
import { Pressable, Image, StyleSheet, Text } from "react-native";

export default function Checkbox({ defaultChecked, onCheck, onUncheck }) {
  const [checked, setChecked] = useState(toBool(defaultChecked));

  const styles = StyleSheet.create({
    checkmark: {
      height: 30,
      width: 30,
    },
    container: {
      borderWidth: 5,
      borderColor: "black",
      borderRadius: 7,
      width: 40,
      height: 40,
    },
  });

  function checkCheckbox() {
    if (checked) {
      setChecked(false);
      onUncheck();
    } else {
      setChecked(true);
      onCheck();
    }
  }

  function toBool(i) {
    if (i === 1) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Pressable onPress={checkCheckbox} style={styles.container}>
      {checked && (
        <Image
          style={styles.checkmark}
          source={require("../assets/check.png")}
        ></Image>
      )}
    </Pressable>
  );
}
