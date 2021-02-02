import React from "react";
import { View, StyleSheet } from "react-native";
import Home from "../assets/images/home.svg";
import User from "../assets/images/user.svg";
import Bars from "../assets/images/bars.svg";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const Nav = () => {
    return (
        <SafeAreaProvider>
            {<View style={styles.header}>
                <View style={styles.icons}>
                    <Home height={100} style={styles.icon}/>
                    <User height={100} style={styles.icon}/>
                </View>
                <Bars height={100} style={styles.veggieBurger} />
            </View>}
        </SafeAreaProvider>
    )    
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#272727',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 30,
        top: Platform.OS === 'android' ? -20 : 0,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        alignContent: 'center',
    },
    icons: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 20,
        marginLeft: 5,
    },
    veggieBurger: {
    },
});