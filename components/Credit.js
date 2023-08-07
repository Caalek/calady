import {View, Text, Pressable, StyleSheet} from "react-native"
import * as Linking from "expo-linking"

export default function Credit({title, link, desc}) {
    return (
        <View style={styles.creditItem}>
          <Text style={styles.textItem}>{title}</Text>
          <Pressable onPress={() => Linking.openURL(link)}>
            <Text style={styles.descItem}>{desc}</Text>
          </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
      flex: 1,
      alignItems: "center",
    },
    creditItem: {
      flex: 1,
      alignItems: "center",
    },
    textItem: {
      padding: 5,
      fontFamily: "TitanOne",
      fontSize: 20,
    },
    descItem: {
      padding: 10,
      color: "blue",
    },
  });