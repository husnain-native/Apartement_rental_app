import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button, CheckBox } from 'react-native-elements';
import { auth, firestore } from '../services/firebase';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRealtor, setIsRealtor] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);
      await firestore().collection('users').doc(user.uid).set({
        role: isRealtor ? 'realtor' : 'user',
      });
      // navigation.navigate('Home');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Register</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        containerStyle={styles.input}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
      />
      <CheckBox
        title="Register as Realtor"
        checked={isRealtor}
        onPress={() => setIsRealtor(!isRealtor)}
        containerStyle={styles.checkbox}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Register" onPress={handleRegister} loading={loading} containerStyle={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { marginBottom: 20, textAlign: 'center' },
  input: { marginVertical: 10 },
  checkbox: { marginVertical: 10, backgroundColor: 'transparent', borderWidth: 0 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  button: { marginVertical: 10 },
});

export default RegisterScreen;
