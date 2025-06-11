import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

const { width } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Login');
    } catch (err) {
      setError('Erro ao cadastrar. Verifique os dados.');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.logoArea}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.formArea}>
        <Text style={styles.title}>
          Crie sua <Text style={styles.titleHighlight}>Conta</Text>
        </Text>
        <Text style={styles.label}>Email</Text>
        <LinearGradient colors={['#a18cd1', '#fbc2eb']} style={styles.inputGradient}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </LinearGradient>
        <Text style={styles.label}>Senha</Text>
        <LinearGradient colors={['#a18cd1', '#fbc2eb']} style={styles.inputGradient}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </LinearGradient>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity onPress={handleRegister} activeOpacity={0.9} disabled={loading}>
          <LinearGradient colors={['#a18cd1', '#fbc2eb']} style={styles.button}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkSecondary}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoArea: {
    marginTop: 40,
    marginBottom: 12,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  formArea: {
    width: width > 500 ? 400 : '90%',
    backgroundColor: '#23232b',
    borderRadius: 16,
    padding: 32,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    color: '#f3f3f3',
    fontWeight: 'bold',
    marginBottom: 32,
  },
  titleHighlight: {
    color: '#b983ff',
  },
  label: {
    color: '#f3f3f3',
    marginBottom: 8,
    marginTop: 16,
    fontSize: 16,
  },
  inputGradient: {
    borderRadius: 12,
    padding: 2,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#18181b',
    color: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 8,
    alignSelf: 'flex-end',
    fontSize: 14,
  },
  linkSecondary: {
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 24,
    alignSelf: 'center',
    fontSize: 16,
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 8,
  },
});
