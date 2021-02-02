import React from 'react';
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { StyleSheet, Text, View, Alert, SafeAreaView, Platform, StatusBar, Image, Button } from 'react-native';
import Logo from "./assets/images/logo.svg";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <Nav />
      </View>
      <View style={styles.mainContainer}>
        <Logo style={styles.logo}/>
        {/* <BsTriangle /> */}
          <View>
            <Text 
            onPress={()=> 
              Alert.prompt("New practice session", "What are you practicing?", text => console.log(text))
            }
            style={styles.button}>New practice session</Text>
          </View>
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  nav: {
    flex: .25,
  },
  mainContainer: {
    backgroundColor: '#333',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    color: '#333',
    backgroundColor: 'orange',
    borderRadius: 30,
    overflow: 'hidden',
    padding: 20,
    top: -40,
  },
  logo: {
    top: -80,
  },
  footer: {
    flex: .3,
    backgroundColor: '#111'
  }
});
