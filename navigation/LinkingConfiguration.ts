import * as Linking from "expo-linking";

export default {
    prefixes: [Linking.makeUrl("/")],
    config: {
        screens: {
            Auth: {
                screens: {
                    SignUp: "SignUp",
                    LogIn: "LogIn",
                },
            },
            Root: {
                screens: {
                    TabOne: {
                        screens: {
                            TabOneScreen: "one",
                        },
                    },
                    TabTwo: {
                        screens: {
                            TabTwoScreen: "two",
                        },
                    },
                },
            },
            NotFound: "*",
        },
    },
};
