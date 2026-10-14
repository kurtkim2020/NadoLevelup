import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);
  const [gold, setGold] = useState(100);
  const earnGold = () => {
    setGold(gold + 10);
  };
  const [hp, setHp] = useState(50);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>⚔️</Text>

      <Text style={styles.title}>나도 레벨업</Text>
      <Text style={styles.subtitle}>현실 성장 RPG</Text>

      <View style={styles.character}>
        <Text style={styles.characterEmoji}>🧙‍♂️</Text>
      </View>

      <Text style={styles.level}>LV. {level}</Text>
      <Text style={styles.exp}>EXP {exp} / 10</Text>
      <Text style={styles.hp}>HP {hp} / 100</Text>
      <Text style={styles.exp}>GOLD {gold}</Text>

      <View style={styles.expBar}>
        <View
          style={[
            styles.expFill,
            { width: `${Math.min(exp * 10, 100)}%` },
          ]}
        />
      </View>
      
      <View style={styles.hpBar}>
        <View
          style={[
            styles.hpFill,
            { width: `${hp}%` },
       ]}
  />
      </View>

      <View style={styles.questCard}>
        <Text style={styles.questTitle}>오늘의 퀘스트</Text>
        <Text style={styles.quest}>🚶 30분 걷기</Text>

        <Pressable
          style={styles.button}
          onPress={() => setExp(exp + 1)}
        >
          <Text style={styles.buttonText}>퀘스트 완료 +1 EXP </Text>
        </Pressable>
           <Pressable
          style={styles.button}
          onPress={earnGold}
                    >
          <Text style={styles.buttonText}>골드 +10 </Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setHp(Math.min(hp + 10, 100))}
                    >
          <Text style={styles.buttonText}>HP +10  </Text>
        </Pressable>
      </View>

      <Text style={styles.message}>
        오늘의 나를 경험치로 바꾸자!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  logo: {
    fontSize: 34,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#9CA3AF',
    marginTop: 5,
    marginBottom: 25,
  },

  character: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },

  characterEmoji: {
    fontSize: 65,
  },

  level: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FBBF24',
    marginTop: 16,
  },

  exp: {
    color: 'white',
    marginTop: 5,
  },

  hp: {
    color:'#ef4444',
    fontSize: 18,
    marginTop: 10,
  },  
  expBar: {
    width: '80%',
    height: 12,
    backgroundColor: '#374151',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 10,
  },

  expFill: {
    height: '100%',
    backgroundColor: '#FBBF24',
  },

  questCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1F2937',
    padding: 20,
    borderRadius: 16,
    marginTop: 30,
  },

  questTitle: {
    color: '#FBBF24',
    fontSize: 14,
    fontWeight: 'bold',
  },

  quest: {
    color: 'white',
    fontSize: 19,
    marginTop: 12,
    marginBottom: 18,
  },

  button: {
    backgroundColor: '#16A34A',
    padding: 15,
    borderRadius: 10,   
    marginBottom: 10, 
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  message: {
    color: '#9CA3AF',
    marginTop: 25,
  },
  hpBar: {
    width: '80%',
    height: 12,
    backgroundColor: '#374151',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 10,
  },

  hpFill: {
    height: '100%',
    backgroundColor: '#EF4444',
  },

  
});