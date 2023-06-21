import { StyleSheet} from "react-native";
import CategoryButton from "./CategoryButton";
import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { openDatabase } from "../utils/openDatabase";
import * as ScreenOrientation from "expo-screen-orientation"
import { useIsFocused } from "@react-navigation/native";
import MenuButton from "./MenuButton";
import * as StatusBar from "expo-status-bar"

export default function HomeScreen({ route, navigation }) {
    const [categories, setCategories] = useState([])
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            async function lockLandscapeOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
                console.log("lock")
            }
            lockLandscapeOrientation()
            StatusBar.setStatusBarHidden(false)
        }
    }, [isFocused])

    useEffect(() => {
        async function getCategories() {
            let categoryList = []
            const db = await openDatabase()
            db.transaction((tx) => {
                tx.executeSql(
                  'SELECT * FROM CATEGORIES',
                  [],
                  (tx, results) => {
                    setCategories(results.rows._array)
                  },
                  (error) => {
                    console.log('Query error:', error);
                  }
                );
              });
              setCategories(categoryList)
        }
        getCategories();
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MenuButton onPress={() => navigation.navigate("SettingsScreen")}></MenuButton>
            )   
        })
    })

    return (
        <>
        <FlatList data={categories} renderItem={({ item }) => <CategoryButton navigation=
            {navigation} title={item.name} color="red" categoryId={item.id} imageFilename={item["image_filename"]}/>} keyExtractor={item => item.id} />
        </>
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
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    flexItem: {
        margin: "5%"
    }
})
