import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions,
  KeyboardAvoidingView, Platform, Image, ActivityIndicator, Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';

const { width } = Dimensions.get('window');

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleReset = async () => {
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setModalVisible(true);
    } catch (err) {
      setError('Não foi possível enviar o e-mail. Verifique o endereço informado.');
    }
    setLoading(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.replace('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoArea}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formArea}>
        <Text style={styles.title}>
          Recuperar <Text style={styles.titleHighlight}>Senha</Text>
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
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity onPress={handleReset} activeOpacity={0.9} disabled={loading}>
          <LinearGradient colors={['#a18cd1', '#fbc2eb']} style={styles.button}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Enviar e-mail de recuperação</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkSecondary}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <LinearGradient colors={['#23232b', '#18181b']} style={styles.modalContent}>
              <Text style={styles.modalTitle}>Alerta!</Text>
              <Text style={styles.modalMessage}>
                E-mail de recuperação enviado!{'\n'}Verifique sua caixa de entrada.
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                <LinearGradient colors={['#a18cd1', '#fbc2eb']} style={styles.modalButtonGradient}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(24,24,27,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: width > 500 ? 350 : '80%',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 10,
  },
  modalContent: {
    padding: 28,
    borderRadius: 18,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#b983ff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    color: '#f3f3f3',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 28,
  },
  modalButton: {
    width: '100%',
  },
  modalButtonGradient: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
