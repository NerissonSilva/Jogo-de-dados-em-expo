import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import Dado from './Dado';

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [d1j1, setD1j1] = useState(1);
  const [d2j1, setD2j1] = useState(1);
  const [d1j2, setD1j2] = useState(1);
  const [d2j2, setD2j2] = useState(1);
  const [j1jogou, setJ1jogou] = useState(false);
  const [j2jogou, setJ2jogou] = useState(false);
  const [msg, setMsg] = useState('');
  const [ptsJ1, setPtsJ1] = useState(0);
  const [ptsJ2, setPtsJ2] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [fim, setFim] = useState(false);

  function jogar1() {
    const n1 = Math.floor(Math.random() * 6) + 1;
    const n2 = Math.floor(Math.random() * 6) + 1;
    setD1j1(n1);
    setD2j1(n2);
    setJ1jogou(true);
    setMsg('');
  }

  function jogar2() {
    const n1 = Math.floor(Math.random() * 6) + 1;
    const n2 = Math.floor(Math.random() * 6) + 1;
    setD1j2(n1);
    setD2j2(n2);
    setJ2jogou(true);

    const s1 = d1j1 + d2j1;
    const s2 = n1 + n2;

    if (s1 > s2) {
      setMsg('Jogador 1 Ganhou!');
      setPtsJ1(ptsJ1 + 1);
    } else if (s2 > s1) {
      setMsg('Jogador 2 Ganhou!');
      setPtsJ2(ptsJ2 + 1);
    } else {
      setMsg('Empatou!');
      setEmpates(empates + 1);
    }
  }

  function proxima() {
    if (rodada < 5) {
      setRodada(rodada + 1);
      setJ1jogou(false);
      setJ2jogou(false);
      setMsg('');
      setD1j1(1);
      setD2j1(1);
      setD1j2(1);
      setD2j2(1);
    } else {
      setFim(true);
      if (ptsJ1 > ptsJ2) {
        setMsg('FIM! Jogador 1 Venceu!!!');
      } else if (ptsJ2 > ptsJ1) {
        setMsg('FIM! Jogador 2 Venceu!!!');
      } else {
        setMsg('FIM! Empate Geral!!!');
      }
    }
  }

  function denovo() {
    setRodada(1);
    setD1j1(1);
    setD2j1(1);
    setD1j2(1);
    setD2j2(1);
    setJ1jogou(false);
    setJ2jogou(false);
    setMsg('');
    setPtsJ1(0);
    setPtsJ2(0);
    setEmpates(0);
    setFim(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>JOGO DE DADOS EM EXPO</Text>

        <View style={styles.info}>
          <Text style={styles.txtInfo}>Rodada: {rodada}/5</Text>
          <Text style={styles.txtInfo}>
            Placar - J1: {ptsJ1} | J2: {ptsJ2} | Empates: {empates}
          </Text>
        </View>

        <View style={styles.jogador}>
          <Text style={styles.nome}>JOGADOR 1</Text>
          <View style={styles.dados}>
            <Dado valor={d1j1} />
            <Dado valor={d2j1} />
          </View>
          <Text style={styles.soma}>Soma: {d1j1 + d2j1}</Text>
          <Button
            title="Jogar"
            onPress={jogar1}
            disabled={j1jogou || fim}
            color={j1jogou || fim ? 'gray' : 'green'}
          />
        </View>

        <View style={styles.jogador}>
          <Text style={styles.nome}>JOGADOR 2</Text>
          <View style={styles.dados}>
            <Dado valor={d1j2} />
            <Dado valor={d2j2} />
          </View>
          <Text style={styles.soma}>Soma: {d1j2 + d2j2}</Text>
          <Button
            title="Jogar"
            onPress={jogar2}
            disabled={!j1jogou || j2jogou || fim}
            color={!j1jogou || j2jogou || fim ? 'gray' : 'blue'}
          />
        </View>

        {msg !== '' && (
          <View style={styles.msg}>
            <Text style={styles.txtMsg}>{msg}</Text>
          </View>
        )}

        {j2jogou && !fim && (
          <View style={styles.btnArea}>
            <Button title="Proxima Rodada" onPress={proxima} color="orange" />
          </View>
        )}

        {fim && (
          <View style={styles.btnArea}>
            <Button title="Jogar Novamente" onPress={denovo} color="red" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scroll: {
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  info: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  txtInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 3,
  },
  jogador: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  dados: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  soma: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  btnArea: {
    marginVertical: 10,
  },
  msg: {
    backgroundColor: '#FFEB3B',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    borderWidth: 3,
    borderColor: '#FBC02D',
  },
  txtMsg: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F57C00',
  },
});
