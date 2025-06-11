import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

import HomeScreen from '../screens/HomeScreen';
import ContextListScreen from '../screens/ContextListScreen';
import TestChatScreen from '../screens/TestChatScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PerfilScreen from '../screens/PerfilScreen';
import AjudaScreen from '../screens/AjudaScreen';
import SobreScreen from '../screens/SobreScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import CustomDrawer from '../components/CustomDrawer';
import { UserProfileProvider } from '../contexts/UserProfileContext';
import { ToastProvider } from 'react-native-toast-notifications';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const AuthContext = createContext(null);

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: '#18181b' },
        drawerActiveTintColor: '#b983ff',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: { fontSize: 16, fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Testes" component={ContextListScreen} />
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Configurações" component={SettingsScreen} />
      <Drawer.Screen name="Ajuda" component={AjudaScreen} />
      <Drawer.Screen name="Sobre" component={SobreScreen} />
    </Drawer.Navigator>
  );
}

function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <ToastProvider>
      <UserProfileProvider>
        <AuthContext.Provider value={user}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {user ? (
                <>
                  <Stack.Screen name="Drawer" component={DrawerRoutes} />
                  <Stack.Screen name="Test" component={TestChatScreen} />
                </>
              ) : (
                <Stack.Screen name="Auth" component={AuthRoutes} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </UserProfileProvider>
    </ToastProvider>
  );
}
