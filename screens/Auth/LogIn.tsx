import React from "react";
import { StyleSheet, Button } from "react-native";
import { View, Text } from "../../components/Themed";

export default function LogIn({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>LogIn</Text>
            <Text>
                Don't have an account?
                <Text
                    onPress={() => navigation.push("SignUpScreen")}
                    style={styles.buttonLink}
                >
                    Sign Up
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonLink: {
        color: "#0000EE",
    },
});
