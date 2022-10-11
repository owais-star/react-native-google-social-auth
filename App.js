import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '700210532814-ohar08rsnu0ive9euujdma8ibposi2ur.apps.googleusercontent.com',
    });
  }, []);

  const googleSignIn = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Text>App</Text>
      <TouchableOpacity
        onPress={() => {
          googleSignIn()
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }}
        style={styles.buttonStyle}>
        <Text style={styles.textStyle}>Login with google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    // backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default App;
