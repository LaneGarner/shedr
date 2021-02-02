import React from "react";
import { View, StyleSheet } from "react-native";
import Record from "../assets/images/record.svg";
import Metdrone from "../assets/images/metdrone.svg";
import Fork from "../assets/images/fork.svg";

export const Footer = () => {
    return (
        <View style={styles.footer}>
            <Record />
            <Metdrone />
            <Fork />
        </View>
    )    
}

const styles = StyleSheet.create({
    footer : {
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingBottom: 20,
        flex: 1,
    },
});