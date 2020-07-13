import React from "react";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { View, Text, Input } from "../../components/Themed";

export default function LogIn({ navigation }) {
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => console.log(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    <Text>Email</Text>
                    <Input
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        placeholder="user@email.com"
                    />
                    <Text>Password</Text>
                    <Input
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholder="password"
                    />
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: "5%",
    },
    buttonLink: {
        color: "#0000EE",
    },
});
