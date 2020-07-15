import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "../types";
import SignUp from "../screens/Auth/SignUp";
import LogIn from "../screens/Auth/LogIn";

export default function AuthNavigator() {
    const AuthStack = createStackNavigator<AuthStackParamList>();

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="SignUpScreen" component={SignUp} />
            <AuthStack.Screen name="LogInScreen" component={LogIn} />
        </AuthStack.Navigator>
    );
}
