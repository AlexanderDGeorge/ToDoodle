import * as React from "react";
import {
    Text as DefaultText,
    View as DefaultView,
    TextInput as DefaultInput,
    Button as DefaultButton,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
    const theme = useColorScheme();
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type InputProps = ThemeProps & InputInterface & DefaultInput["props"];
export interface InputInterface {
    label: string;
}
export type ButtonProps = ThemeProps &
    DefaultButton["props"] &
    DefaultView["props"];

export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background"
    );

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Input(props: InputProps) {
    const { style, lightColor, darkColor, label, ...otherProps } = props;

    return (
        <View style={[{ width: "100%", padding: 10 }, style]}>
            <Text style={{ paddingBottom: 10 }}>{label}</Text>
            <DefaultInput
                style={[
                    {
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 10,
                        width: "100%",
                    },
                ]}
                {...otherProps}
            />
        </View>
    );
}

export function Button(props: ButtonProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;

    return (
        <DefaultView
            style={[
                {
                    borderWidth: 1,
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
                style,
            ]}
        >
            <DefaultButton {...otherProps} />
        </DefaultView>
    );
}
