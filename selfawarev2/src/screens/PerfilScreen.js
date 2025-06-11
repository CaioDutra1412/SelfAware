import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { auth, db, storage } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { UserProfileContext } from '../contexts/UserProfileContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useToast } from 'react-native-toast-notifications';

export default function PerfilScreen() {
  const navigation = useNavigation();
  const { profile, setProfile } = useContext(UserProfileContext);
  const toast = useToast();
  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [birthDate, setBirthDate] = useState(profile?.birthDate || '');
  const [photo, setPhoto] = useState(profile?.photoURL || null);
  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setBirthDate(profile.birthDate || '');
      setPhoto(profile.photoURL || null);
    }
  }, [profile]);

  const pickImage = async () => {
    console.log('Abrindo ImagePicker...');
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      console.log('Resultado do ImagePicker:', result);

      if (result.canceled) {
        console.log('Usuário cancelou a seleção de imagem.');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const { uri } = result.assets[0];
        console.log('URI da imagem selecionada:', uri);

        // Lê o arquivo como base64 usando expo-file-system
        const fileBase64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        console.log('Base64 lido do FileSystem:', fileBase64 ? '[ok]' : '[vazio]');

        const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}.jpg`);
        await uploadString(storageRef, fileBase64, 'base64', { contentType: 'image/jpeg' });
        const url = await getDownloadURL(storageRef);
        setPhoto(url);
        console.log('Upload de foto feito:', url);
        toast.show('Foto alterada com sucesso!', { type: 'success' });
      } else {
        console.log('Nenhuma imagem selecionada.');
      }
    } catch (err) {
      console.log('Erro no processo de seleção/upload da foto:', err);
      toast.show('Erro ao enviar foto', { type: 'danger' });
    }
  };

  const handleSave = async () => {
    console.log('Iniciando handleSave');
    try {
      if (!auth.currentUser) {
        console.log('Usuário não autenticado!');
        toast.show('Usuário não autenticado!', { type: 'danger' });
        return;
      }
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const data = {
        firstName,
        lastName,
        birthDate,
        photoURL: photo,
        email: auth.currentUser.email,
      };
      console.log('Salvando no Firestore:', data);

      await setDoc(userRef, data, { merge: true });
      setProfile(data);

      toast.show('Informações salvas com sucesso!', {
        type: 'success',
        placement: 'top',
        duration: 2500,
        animationType: 'slide-in',
        icon: <Ionicons name="checkmark-circle" size={22} color="#fff" />,
      });
      console.log('Salvo com sucesso!');
    } catch (err) {
      console.log('Erro ao salvar perfil:', err);
      toast.show('Erro ao salvar perfil!', { type: 'danger' });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center' }}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <Ionicons name="person-circle-outline" size={90} color="#b983ff" />
        )}
        <Text style={styles.photoText}>Alterar foto</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#aaa"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        placeholderTextColor="#aaa"
        value={lastName}
        onChangeText={setLastName}
      />
      <TouchableOpacity onPress={() => setShowDate(true)} style={styles.dateInput}>
        <Text style={{ color: birthDate ? '#fff' : '#aaa', fontSize: 16 }}>
          {birthDate ? `Nascimento: ${birthDate}` : 'Data de Nascimento'}
        </Text>
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={birthDate ? new Date(birthDate) : new Date()}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowDate(false);
            if (date) setBirthDate(date.toISOString().slice(0, 10));
          }}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181b', alignItems: 'center', padding: 24 },
  menuButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: '#23232b',
    borderRadius: 8,
    padding: 8,
  },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  photoText: { color: '#b983ff', marginBottom: 18, textAlign: 'center' },
  input: {
    backgroundColor: '#23232b',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    fontSize: 16,
    marginBottom: 10,
  },
  dateInput: {
    backgroundColor: '#23232b',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    marginBottom: 10,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#b983ff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
