import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Modal, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import emailjs from '@emailjs/react-native';
import { UserProfileContext } from '../contexts/UserProfileContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AjudaScreen() {
  const navigation = useNavigation();
  const { profile } = useContext(UserProfileContext);

  const [nome, setNome] = useState(profile?.firstName ? `${profile.firstName} ${profile.lastName || ''}` : '');
  const [email, setEmail] = useState(profile?.email || '');
  const [pergunta, setPergunta] = useState('');
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  const handleEnviar = async () => {
    if (!nome.trim() || !email.trim() || !pergunta.trim()) {
      setModalMsg('Preencha todos os campos.');
      setModalVisible(true);
      return;
    }
    setLoading(true);
    try {
      await emailjs.send(
        'service_aet6yzi',
        'template_nx41wdi',
        {
          from_name: nome,
          from_email: email,
          message: pergunta,
        },
        { publicKey: 'CQtmtam15aeUzTk91' }
      );
      setLoading(false);
      setPergunta('');
      setModalMsg('Sua dúvida foi enviada com sucesso! Você receberá uma resposta por e-mail.');
      setModalVisible(true);
    } catch (error) {
      setLoading(false);
      setModalMsg('Não foi possível enviar sua pergunta. Tente novamente.');
      setModalVisible(true);
      // LOG para depuração:
      console.log('Erro ao enviar pergunta via EmailJS:', error);
    }
  };

  const closeModal = () => setModalVisible(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Ajuda</Text>
      <Text style={styles.text}>
        Envie sua dúvida para nossa equipe de suporte. Responderemos por e-mail o mais breve possível.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Digite sua pergunta"
        placeholderTextColor="#aaa"
        value={pergunta}
        onChangeText={setPergunta}
        multiline
        numberOfLines={5}
        maxLength={500}
      />

      <TouchableOpacity style={styles.button} onPress={handleEnviar} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Enviar pergunta</Text>
        )}
      </TouchableOpacity>

      {/* Modal customizado para feedback */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <LinearGradient
              colors={['#23232b', '#18181b']}
              style={styles.modalContent}
            >
              <Text style={styles.modalTitle}>Ajuda</Text>
              <Text style={styles.modalMessage}>{modalMsg}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <LinearGradient
                  colors={['#b983ff', '#a18cd1']}
                  style={styles.modalButtonGradient}
                >
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
  container: { flex: 1, backgroundColor: '#18181b', padding: 24, alignItems: 'center', justifyContent: 'center' },
  menuButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: '#23232b',
    borderRadius: 8,
    padding: 8,
  },
  title: { color: '#b983ff', fontSize: 26, fontWeight: 'bold', marginBottom: 10, marginTop: 16 },
  text: { color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 24 },
  input: {
    backgroundColor: '#23232b',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#b983ff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
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


