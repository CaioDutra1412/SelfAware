import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CONTEXTS = [
  {
    key: 'amoroso',
    title: 'Relacionamentos Amorosos',
    icon: require('../../assets/context-love.png'),
    color: '#ff80ab',
    borderColor: '#ff80ab',
    textColor: '#ff80ab',
  },
  {
    key: 'trabalho',
    title: 'Trabalho',
    icon: require('../../assets/context-work.png'),
    color: '#64b5f6',
    borderColor: '#64b5f6',
    textColor: '#64b5f6',
  },
  {
    key: 'amizades',
    title: 'Amizades',
    icon: require('../../assets/context-friends.png'),
    color: '#ffd54f',
    borderColor: '#ffd54f',
    textColor: '#ffd54f',
  },
  {
    key: 'familia',
    title: 'Família',
    icon: require('../../assets/context-family.png'),
    color: '#81c784',
    borderColor: '#81c784',
    textColor: '#81c784',
  },
  {
    key: 'autoestima',
    title: 'Autoestima Geral',
    icon: require('../../assets/context-self.png'),
    color: '#ba68c8',
    borderColor: '#ba68c8',
    textColor: '#ba68c8',
  },
];

export default function ContextListScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { borderColor: item.borderColor },
      ]}
      onPress={() => navigation.navigate('Test', { context: item.key })}
      activeOpacity={0.85}
    >
      <View style={styles.cardContent}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={[styles.cardTitle, { color: item.textColor }]}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={28} color={item.textColor} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botão de menu lateral igual ao da Home */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={CONTEXTS}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.title}>
            Escolha um contexto para iniciar o teste:
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
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
    color: '#b983ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 26,
    textAlign: 'center',
    marginTop: 32, // espaço extra para não ficar colado no menu
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#23232b',
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 38,
    height: 38,
    marginRight: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
