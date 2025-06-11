import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { auth } from '../services/firebase';
import { UserProfileContext } from '../contexts/UserProfileContext';

export default function CustomDrawer(props) {
  const context = useContext(UserProfileContext);
  const profile = context ? context.profile : null;

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.userBox}>
        {profile?.photoURL ? (
          <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
        <Text style={styles.label}>Logado como:</Text>
        <Text style={styles.name}>
          {profile?.firstName
            ? `${profile.firstName} ${profile.lastName || ''}`
            : auth.currentUser?.email}
        </Text>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181b', paddingTop: 40 },
  userBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#29293a',
    paddingBottom: 18,
    marginBottom: 18,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  avatar: { width: 54, height: 54, borderRadius: 27, marginBottom: 6 },
  avatarPlaceholder: {
    width: 54, height: 54, borderRadius: 27, marginBottom: 6, backgroundColor: '#29293a'
  },
  label: { color: '#b983ff', fontWeight: 'bold', fontSize: 15, marginBottom: 2 },
  name: { color: '#fff', fontSize: 16, marginBottom: 2, textAlign: 'center' },
  logoutButton: {
    backgroundColor: '#a18cd1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 32,
  },
  logoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
