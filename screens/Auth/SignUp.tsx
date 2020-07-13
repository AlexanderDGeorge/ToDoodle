import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { View, Text, Input, Button } from "../../components/Themed";
import { Formik } from "formik";

export default function SignUp({ navigation }) {
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => console.log(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        placeholder="user@gmail.com"
                    />
                    <Text style={styles.label}>Password</Text>
                    <Input
                        style={styles.input}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholder="password"
                    />
                    <Button
                        style={{ borderWidth: 1, width: 50, height: 50 }}
                        onPress={handleSubmit}
                        title="Submit"
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
        justifyContent: "space-evenly",
        padding: "5%",
    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        width: "100%",
        height: 50,
    },
    label: {
        alignSelf: "flex-start",
    },
});
