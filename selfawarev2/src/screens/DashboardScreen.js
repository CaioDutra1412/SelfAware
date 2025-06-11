import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getTestHistory } from '../services/testHistory';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase';

// Níveis ajustados para a escala 8-40
function getLevel(pontuacao) {
  if (pontuacao <= 16) return { label: 'Baixo', color: '#b9fbc0' };
  if (pontuacao <= 24) return { label: 'Moderado', color: '#ffe066' };
  return { label: 'Alto', color: '#ff6f91' };
}

export default function DashboardScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Loga o UID do usuário autenticado ao renderizar a tela
  useEffect(() => {
    console.log('Dashboard renderizado para UID:', auth.currentUser?.uid);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getTestHistory();
        console.log('Histórico retornado:', data); // LOG DE DEPURAÇÃO
        setHistory(Array.isArray(data) ? data : []);
      } catch (e) {
        console.log('Erro ao buscar histórico:', e);
        setHistory([]);
      }
      setLoading(false);
    })();
  }, []);

  // Média geral na escala 8-40
  const mean = useMemo(() => {
    if (!history.length) return 0;
    return Math.round(
      history.reduce((acc, item) => acc + (item.pontuacao || 0), 0) / history.length
    );
  }, [history]);

  const renderItem = ({ item }) => {
    const level = getLevel(item.pontuacao);
    return (
      <View style={styles.testCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.context}>{item.contexto}</Text>
          <View style={styles.levelRow}>
            <View style={[styles.levelBadge, { backgroundColor: level.color + '22', borderColor: level.color }]}>
              <Text style={[styles.levelText, { color: level.color }]}>{level.label}</Text>
            </View>
            <Text style={styles.date}>{new Date(item.data).toLocaleDateString()}</Text>
          </View>
        </View>
        <Text style={styles.score}>{item.pontuacao}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Botão do menu lateral */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Seu Progresso</Text>
      <Text style={styles.subtitle}>Acompanhe sua jornada de desenvolvimento emocional</Text>

      <View style={styles.cardsRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Média Geral</Text>
          <Text style={styles.summaryValue}>
            <Text style={{ color: '#fff' }}>{mean}</Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>/40</Text>
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#4461ea' }]}>
          <Text style={styles.summaryLabel}>Testes Feitos</Text>
          <Text style={styles.summaryValue}>{history.length}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Histórico de Testes</Text>
      {loading ? (
        <ActivityIndicator color="#b983ff" size="large" style={{ marginTop: 32 }} />
      ) : history.length === 0 ? (
        <Text style={styles.empty}>Nenhum teste realizado ainda.</Text>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      <View style={styles.congratsBox}>
        <Text style={styles.congratsTitle}>Parabéns pela sua jornada! 🎉</Text>
        <Text style={styles.congratsText}>
          Cada teste que você faz é um passo importante para conhecer melhor seus padrões emocionais.
          Continue explorando e crescendo — você está no caminho certo!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181b', padding: 18 },
  menuButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: '#23232b',
    borderRadius: 8,
    padding: 8,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#bdbdbd',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 18,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#b983ff',
    borderRadius: 18,
    marginHorizontal: 4,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  summaryLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sectionTitle: {
    color: '#b983ff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  list: { paddingBottom: 24 },
  testCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23232b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 1,
  },
  context: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 2 },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    marginTop: 2,
  },
  levelBadge: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  levelText: { fontWeight: 'bold', fontSize: 13 },
  date: { color: '#bdbdbd', fontSize: 13 },
  score: {
    color: '#b983ff',
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
  congratsBox: {
    backgroundColor: '#e0c3fc22',
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  congratsTitle: {
    color: '#b983ff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  congratsText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  empty: { color: '#fff', textAlign: 'center', marginTop: 40, fontSize: 16 },
});
