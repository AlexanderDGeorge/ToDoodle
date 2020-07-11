import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "../types";
import LogIn from "../screens/Auth/LogIn";
import SignUp from "../screens/Auth/SignUp";

export default function AuthNavigator() {
    const AuthStack = createStackNavigator<AuthStackParamList>();

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="LogInScreen" component={LogIn} />
            <AuthStack.Screen name="SignUpScreen" component={SignUp} />
        </AuthStack.Navigator>
    );
}
