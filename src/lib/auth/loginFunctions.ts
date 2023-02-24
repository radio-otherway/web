const LoginFunctions = {
  // PROVIDER_ID of auth provider, the credential object, and the email of the user
  signInOrLink: async function(provider, credential, email) {
    this.saveCredential(provider, credential);
    await auth().signInWithCredential(credential).catch(
      async (error) => {
        try {
          if (error.code != "auth/account-exists-with-different-credential") {
            throw error;
          }
          let methods = await auth().fetchSignInMethodsForEmail(email);
          let oldCred = await this.getCredential(methods[0]);
          let prevUser = await auth().signInWithCredential(oldCred);
          auth().currentUser.linkWithCredential(credential);
        } catch (error) {
          throw error;
        }
      }
    );
  },

  getCredential: async function(provider) {
    try {
      let value = await AsyncStorage.getItem(provider);
      if (value !== null) {
        let [token, secret] = JSON.parse(value);
        return this.getProvider(provider).credential(token, secret);
      }
    } catch (error) {
      throw error;
    }
  },

  saveCredential: async function(provider, credential) {
    try {
      let saveData = JSON.stringify([credential.token, credential.secret]);
      await AsyncStorage.setItem(
        provider,
        saveData
      );
    } catch (error) {
      throw error;
    }

  },

  getProvider: function(providerId) {
    switch (providerId) {
      case auth.GoogleAuthProvider.PROVIDER_ID:
        return auth.GoogleAuthProvider;
      case auth.FacebookAuthProvider.PROVIDER_ID:
        return auth.FacebookAuthProvider;
      case auth.TwitterAuthProvider.PROVIDER_ID:
        return auth.TwitterAuthProvider;
      default:
        throw new Error(`No provider implemented for ${providerId}`);
    }
  }
};
export default LoginFunctions;
