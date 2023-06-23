import { Text, StyleSheet, Pressable, ImageBackground } from "react-native";
import images from "../utils/images";
export default function CategoryButton({
  navigation,
  title,
  categoryId,
  imageFilename,
}) {
  const styles = StyleSheet.create({
    container: {
      margin: "2%",
      color: "white",
    },
    image: {
      border: "1%",
      borderStyle: "solid",
      //borderRadius: "15%",
      overflow: "hidden",
    },
    text: {
      padding: "8%",
      color: "white",
      fontFamily: "TitanOne",
      fontSize: 25,
      textShadowColor: "black",
      textShadowRadius: 20,
    },
  });

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("GameSettings", {
          gameTitle: title,
          categoryId: categoryId,
          imageFilename: imageFilename,
        })
      }
      style={styles.container}
    >
      <ImageBackground style={styles.image} source={images[imageFilename]}>
        <Text style={styles.text}>{title}</Text>
      </ImageBackground>
    </Pressable>
  );
}
