import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { auth } from '../services/firebase';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get('window');

const CLIENT_ID = '634831787910-bq059j7krjq34kper829v0bs1i3pntav.apps.googleusercontent.com';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: CLIENT_ID,
    iosClientId: CLIENT_ID,
    androidClientId: CLIENT_ID,
    webClientId: CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          //navigation.replace('Home');
        })
        .catch(() => setError('Erro ao autenticar com Google.'));
    }
  }, [response]);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
       //navigation.replace('Home');
    } catch (err) {
      setError('E-mail ou senha inválidos.');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoArea}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.formArea}>
        <Text style={styles.title}>
          Faça seu <Text style={styles.titleHighlight}>Login</Text>
        </Text>
        <Text style={styles.label}>E-mail</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} activeOpacity={0.9} disabled={loading}>
          <LinearGradient colors={['#a18cd1', '#fbc2eb']} style={styles.button}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.googleWrapper}>
          <Text style={styles.googleLabel}>Entrar com</Text>
          <TouchableOpacity
            style={styles.googleButtonContainer}
            onPress={() => promptAsync()}
            disabled={!request}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#fff', '#fff']} style={styles.googleButton}>
              <Image
                source={require('../../assets/Logo-Google.png')}
                style={styles.googleLogo}
                resizeMode="contain"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkSecondary}>Ainda não tenho uma conta</Text>
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
  // Google custom button styles
  googleWrapper: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  googleLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  googleButtonContainer: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  googleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  googleLogo: {
    width: 32,
    height: 32,
  },
});
