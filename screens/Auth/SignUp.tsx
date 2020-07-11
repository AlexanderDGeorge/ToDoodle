import React from "react";
import { StyleSheet, TextInput, Button } from "react-native";
import { View, Text } from "../../components/Themed";
import { Formik } from "formik";

export default function SignUp({ navigation }) {
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => console.log(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                    />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                    />
                    <Button onPress={handleSubmit} title="Submit" />
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    textinput: {
        borderColor: "black",
        borderWidth: 1,
        width: 300,
        height: 50,
    },
});
