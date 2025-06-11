import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getGeminiFeedback } from '../services/gemini';
import { saveTestResult } from '../services/testHistory';
import { TESTS } from '../data/tests';

const INTRO = `Olá! 😊 Antes de começarmos, quero te lembrar que este é um espaço seguro e acolhedor.
Vou te apresentar algumas afirmações sobre sentimentos e comportamentos.
Responda cada uma de acordo com o quanto ela se aplica a você no momento, usando a escala abaixo:

(1) Nunca
(2) Raramente
(3) Às vezes
(4) Frequentemente
(5) Sempre

Pronto(a)? Vamos começar!`;

export default function TestChatScreen({ navigation, route }) {
  const { context } = route.params || { context: 'amoroso' };
  const testData = TESTS[context] || TESTS['amoroso'];
  const QUESTIONS = testData.perguntas;
  const contextName = testData.nome;

  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([{ from: 'bot', text: INTRO }]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleAnswer = async (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    setMessages(prev => [
      ...prev,
      { from: 'user', text: `(${value})` }
    ]);

    if (currentQuestion < QUESTIONS.length) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { from: 'bot', text: QUESTIONS[currentQuestion] }
        ]);
        setCurrentQuestion(prev => prev + 1);
      }, 400);
    }

    if (newAnswers.length === QUESTIONS.length) {
      setLoading(true);
      const pontuacao = newAnswers.reduce((acc, v) => acc + v, 0);
      setScore(pontuacao);

      let feedbackText = '';
      try {
        const resp = await getGeminiFeedback(newAnswers, contextName);
        feedbackText = resp || 'Não foi possível gerar um feedback personalizado no momento.';
      } catch (e) {
        feedbackText = 'Não foi possível gerar um feedback personalizado no momento.';
      }
      setFeedback(feedbackText);

      try {
        await saveTestResult({
          contexto: contextName,
          data: new Date().toISOString(),
          respostas: newAnswers,
          pontuacao,
          feedback: feedbackText,
        });
      } catch (e) {}

      setLoading(false);
      setShowResult(true);
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: 'Analisando suas respostas...' }
      ]);
    }
  };

  useEffect(() => {
    if (currentQuestion === 0) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { from: 'bot', text: QUESTIONS[0] }
        ]);
        setCurrentQuestion(1);
      }, 1200);
    }
  }, []);

  // Função para sair do teste
  const handleExitTest = () => {
    navigation.navigate('Drawer', { screen: 'Testes' });
  };

  return (
    <View style={styles.container}>
      {/* Botão "Sair do teste" no topo direito */}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={handleExitTest}
        accessibilityLabel="Sair do teste"
      >
        <Ionicons name="close" size={28} color="#b983ff" />
        <Text style={styles.exitButtonText}>Sair do teste</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, idx) => (
          <View key={idx} style={[styles.msg, msg.from === 'bot' ? styles.bot : styles.user]}>
            <Text style={styles.msgText}>{msg.text}</Text>
          </View>
        ))}
        {loading && (
          <View style={[styles.msg, styles.bot]}>
            <ActivityIndicator color="#b983ff" />
            <Text style={styles.msgText}>Gerando feedback personalizado...</Text>
          </View>
        )}
        {showResult && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Pontuação: {score} pontos</Text>
            <Text style={styles.resultFeedback}>
              {feedback.replace(/\*/g, '').trim()}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Drawer', { screen: 'Home' })}
            >
              <Text style={styles.buttonText}>Voltar para a Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {!showResult && !loading && currentQuestion > 0 && currentQuestion <= QUESTIONS.length && (
        <View style={styles.options}>
          {[1, 2, 3, 4, 5].map(val => (
            <TouchableOpacity
              key={val}
              style={styles.optionBtn}
              onPress={() => handleAnswer(val)}
            >
              <Text style={styles.optionText}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181b', paddingTop: 24 },
  exitButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: '#23232b',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  exitButtonText: {
    color: '#b983ff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  chat: { flex: 1, paddingHorizontal: 16, marginTop: 0 },
  chatContent: { paddingTop: 56, paddingBottom: 24 },
  msg: {
    marginBottom: 12,
    maxWidth: '85%',
    borderRadius: 14,
    padding: 14,
  },
  bot: { alignSelf: 'flex-start', backgroundColor: '#23232b' },
  user: { alignSelf: 'flex-end', backgroundColor: '#b983ff' },
  msgText: { color: '#fff', fontSize: 16 },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#23232b',
    paddingVertical: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  optionBtn: {
    backgroundColor: '#b983ff',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 22,
    marginHorizontal: 6,
  },
  optionText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  resultBox: {
    marginTop: 18,
    backgroundColor: '#29293a',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  resultTitle: {
    color: '#b983ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultFeedback: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 18,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#a18cd1',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
