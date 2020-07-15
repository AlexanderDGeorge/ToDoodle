import React from "react";
import { StyleSheet, Button } from "react-native";
import { View, Input } from "../../components/Themed";
import { FormikProps, Formik, Form, Field } from "formik";
import useFormManagement from "./formManagement";

export default function SignUp() {
    const {
        handleSubmit,
        initialValues,
        validationSchema,
    } = useFormManagement();

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Input
                            label="First Name"
                            placeholder="Alexander"
                            style={{ width: "50%" }}
                            onChangeText={handleChange("first")}
                            onBlur={handleBlur("first")}
                            value={values.first}
                        />
                        <Input
                            label="Last Name"
                            placeholder="George"
                            style={{ width: "50%" }}
                            onChangeText={handleChange("last")}
                            onBlur={handleBlur("last")}
                            value={values.last}
                        />
                    </View>
                    <Input
                        label="Email"
                        placeholder="user@gmail.com"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                    />
                    <Input
                        label="Password"
                        placeholder="password"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                    />
                    <Input
                        label="Confirm Password"
                        placeholder="confirm password"
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                    />
                    <Button
                        style={{ borderWidth: 1, height: 50 }}
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
        padding: "5%",
    },
    row: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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
