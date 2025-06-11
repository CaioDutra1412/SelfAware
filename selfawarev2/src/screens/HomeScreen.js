import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Bem-vindo ao SelfAware!</Text>
        <Text style={styles.subtitle}>
          Uma aplicação para autoconhecimento e saúde emocional.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>O que é o SelfAware?</Text>
          <Text style={styles.cardText}>
            O SelfAware é um aplicativo criado para ajudar você a identificar e refletir sobre possíveis padrões de dependência emocional em diferentes áreas da vida:
          </Text>
          <Text style={styles.cardList}>• Relacionamentos amorosos{"\n"}• Trabalho{"\n"}• Amizades{"\n"}• Família{"\n"}• Autoestima geral</Text>
          <Text style={styles.cardText}>
            Faça testes rápidos, receba feedbacks e descubra recursos para fortalecer sua autonomia emocional.
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Atenção: Suas respostas são confidenciais e nenhum dado sensível é compartilhado. Lembre-se sempre de procurar a ajuda de um profissional (Psicólogo)
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate('Drawer', { screen: 'Testes' })}
          activeOpacity={0.85}
        >
          <Text style={styles.bottomButtonText}>Conhecer os testes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181b', paddingHorizontal: 16, paddingTop: 24 },
  menuButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: '#23232b',
    borderRadius: 8,
    padding: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32,
  },
  logoContainer: {
    width: windowWidth * 0.5,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 16,
  },
  logo: {
    width: '50%',
    height: '50%',
  },
  title: { color: '#b983ff', fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { color: '#fff', fontSize: 18, marginBottom: 18, textAlign: 'center' },
  card: { backgroundColor: '#23232b', borderRadius: 16, padding: 22, marginBottom: 18, width: '100%', elevation: 2 },
  cardTitle: { color: '#b983ff', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  cardText: { color: '#fff', fontSize: 16, marginBottom: 8, textAlign: 'justify' },
  cardList: { color: '#b983ff', fontSize: 16, marginBottom: 8, marginLeft: 8 },
  infoBox: { backgroundColor: '#29293a', borderRadius: 10, padding: 14, marginBottom: 18, width: '100%' },
  infoText: { color: '#fff', fontSize: 15, textAlign: 'center' },
  bottomButton: {
    backgroundColor: '#a18cd1',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 42,
    elevation: 4,
    marginTop: 22,
    alignSelf: 'center',
  },
  bottomButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
});
