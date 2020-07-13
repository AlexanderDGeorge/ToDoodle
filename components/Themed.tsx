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
export type InputProps = ThemeProps & DefaultInput["props"];
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
    const { style, lightColor, darkColor, ...otherProps } = props;

    return (
        <DefaultInput
            style={[
                {
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: "100%",
                    minHeight: 50,
                },
                style,
            ]}
            {...otherProps}
        />
    );
}

export function Button(props: ButtonProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;

    return (
        <DefaultView
            style={[
                {
                    borderWidth: 1,
                },
                style,
            ]}
        >
            <DefaultButton {...otherProps} />
        </DefaultView>
    );
}
