import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SobreScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>
      <Ionicons name="information-circle-outline" size={60} color="#b983ff" style={{ marginBottom: 20, marginTop: 40 }} />
      <Text style={styles.title}>Sobre o App</Text>
      <Text style={styles.text}>
        SelfAware - Versão: v2.0{"\n"}
        Desenvolvido para promover autoconhecimento e saúde emocional.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181b', alignItems: 'center', justifyContent: 'center', padding: 24 },
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
  text: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
