import { View, Text, StyleSheet, Button } from "react-native";
import CategoryButton from "./CategoryButton";
import { FlatList } from "react-native";


export default function HomeScreen({ navigation }) {

    const CATEGORIES = [
        {
            id: "1",
            title: "Muzyka lat 70.",
            color: "green",
            imageFilename: "house.png"
        },
        {
            id: "2",
            title: "Muzyka lat 80.",
            color: "blue",
            imageFilename: "house.png"
        },
        {
            id: "3",
            title: "Muzyka lat 90.",
            color: "red",
            imageFilename: "house.png"
        }
    ]

    return (
        <FlatList data={CATEGORIES} renderItem={({ item }) => <CategoryButton navigation=
            {navigation} title={item.title} color={item.color} />} keyExtractor={item => item.id} />
    )
}


const styles = StyleSheet.create({
    center: {
        textAlign: "center"
    },
    container: {
        justifyContent: "center",
        textAlign: "center"
    },
    subtitle: {
        paddingTop: "5%",
        fontSize: 20,
        textAlign: "center",
        // fontFamily: "Montserrat"
    },
    flexContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    flexItem: {
        margin: "5%"
    }
})
