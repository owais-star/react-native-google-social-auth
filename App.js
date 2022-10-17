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

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      console.log('User signed out!');
      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoutBtnContainer}>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          style={[styles.buttonStyle, { marginHorizontal: 4 }]}>
          <Text style={styles.textStyle}>Logout of Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('Logout of Facebook');
          }}
          style={[styles.buttonStyle, { marginHorizontal: 4 }]}>
          <Text style={styles.textStyle}>Logout</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.backgroundStyle}>
        <Text>App</Text>
        <TouchableOpacity
          onPress={() => {
            googleSignIn()
              .then(res => {
                console.log(res.user);
              })
              .catch(err => {
                console.log(err);
              });
          }}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Login with google</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutBtnContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
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
