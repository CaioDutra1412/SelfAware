import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleResetPassword = async () => {
    if (!auth.currentUser?.email) {
      setModalVisible(false);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      setModalVisible(true);
    } catch (e) {
      setModalVisible(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Configurações</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Segurança</Text>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Ionicons name="key-outline" size={22} color="#fff" />
          <Text style={styles.resetText}>Redefinir senha</Text>
        </TouchableOpacity>
      </View>

      {/* Modal customizado */}
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
              <Text style={styles.modalTitle}>Verifique seu e-mail!</Text>
              <Text style={styles.modalMessage}>
                Enviamos um link para redefinir sua senha.
              </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181b', padding: 24 },
  menuButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 8,
  },
  title: { color: '#b983ff', fontSize: 26, fontWeight: 'bold', marginBottom: 18, marginTop: 16, alignSelf: 'center' },
  section: { marginVertical: 18 },
  sectionTitle: { color: '#b983ff', fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  resetButton: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  resetText: { color: '#fff', fontSize: 16, marginLeft: 8 },

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
