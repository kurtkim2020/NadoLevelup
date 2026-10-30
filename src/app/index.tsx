// 1. import ========================================================================
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

// 2. 컴포넌트 함수 ============================================================
export default function HomeScreen() {

// 3. 상태 변수 ============================================================
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);
  const [gold, setGold] = useState(100);
  const earnGold = () => {
    setGold(gold + 10);
  };
  const [hp, setHp] = useState(50);
  const [questDone, setQuestDone] = useState(false);
  const [readDone, setReadDone] = useState(false);
  const [meditationDone, setMeditationDone] = useState(false);
  const [questName, setQuestName] = useState('');
  const [registeredQuest, setRegisteredQuest] = useState('');
  type Quest = {
    name: string;
    completed: boolean;
  };

const [quests, setQuests] = useState<Quest[]>([]);
  

// 4. 화면 구성 ============================================================
  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={styles.contentContainer}
>
      <Text style={styles.logo}>⚔️</Text>

      <Text style={styles.title}>나도 레벨업</Text>
      <Text style={styles.subtitle}>현실 성장 RPG</Text>
      <TextInput
        placeholder="새로운 퀘스트를 입력하세요"
        value={questName}
        onChangeText={setQuestName}
        placeholderTextColor="#AAAAAA"
        style={{ color: 'white', borderWidth: 1, borderColor: 'white', padding: 10, width: 250}}
      />
      <Text style={{ color: 'white' }}>
         입력한 퀘스트 : {questName}
      </Text>
      <Pressable onPress={() => {
        setRegisteredQuest(questName);
        setQuests([
          ...quests,
          {
            name: questName,
            completed: false,
          },
        ]);
        setQuestName('');
        }}>
         <Text style={{ color: 'white' }}>퀘스트 등록</Text>
      </Pressable>
      <Text style={{ color: 'white' }}>
        등록된 퀘스트 : {registeredQuest}
      </Text>
      <Text style={{ color: 'white' }}>
        등록된 퀘스트 개수 : {quests.length}개
      </Text>
     {quests.map((quest, index) => (
  <View
    key={index}
    style={{ flexDirection: 'row', alignItems: 'center' }}
  >
    <Text style={{ color: 'white' }}>
      {index + 1}. {quest.name}
    </Text>

    <Pressable
      onPress={() => {
        setQuests(
          quests.map((item, i) =>
            i === index
              ? { ...item, completed: true }
              : item
          )
        );
      }}
      disabled={quest.completed}
    >
      <Text style={{ color: quest.completed ? 'gray' : 'yellow' }}>
        {quest.completed ? '완료!' : '완료'}
      </Text>
    </Pressable>
    <Pressable
      onPress={() => {
      setQuests(
      quests.filter((item, i) => i !== index)
      );
      }}
      style={{ marginLeft: 15 }}
>
    <Text style={{ color: 'red' }}>삭제</Text>
    </Pressable>
  </View>
))}
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
            <View>  
        <Text style={styles.quest}>🚶 30분 걷기</Text>
        <Text style={styles.quest}>
           {questDone ? '퀘스트 완료!' : '아직 완료하지 않음'}
        </Text>
       <Text
  style={[
    styles.quest,
    questDone
      ? { color: '#FBBF24' }
      : { color: '#9CA3AF' }
  ]}
>
  {!questDone
    ? '🎁 걷기하면 EXP +1'
    : '🎉 경험치 1 획득 완료!'}
</Text>
              <Pressable
          style={[
            styles.button,
            questDone ? { backgroundColor: '#4B5563' } : {}
          ]}
          onPress={() => {
            if (!questDone) {
            setExp(exp + 1);
            setQuestDone(true);
           }
          }}
          disabled={questDone}
        > 
         <Text style={styles.buttonText}>
           {questDone ? '✓ 완료한 퀘스트' : '퀘스트 완료 +1 EXP'}
         </Text>
         </Pressable>        
      </View>

      <View>
         <Text style={styles.quest}>📖 책 10분 읽기</Text>
         <Text style={styles.quest}>
           {readDone ? '퀘스트 완료!' : '아직 완료하지 않음'}
        </Text>
 <Text
  style={[
    styles.quest,
    readDone
      ? { color: '#60A5FA' }
      : { color: '#9CA3AF' }
  ]}
>
  {!readDone
    ? '🎁 독서하면 EXP +1'
    : '🌟 지식이 쌓였습니다!'}
</Text>
         <Pressable
          style={[
            styles.button,
            readDone ? { backgroundColor: '#4B5563' } : {}
          ]}
          onPress={() => {
            if (!readDone) {
            setExp(exp + 1);
            setReadDone(true);
           }
          }}
          disabled={readDone}
        > 
         <Text style={styles.buttonText}>
           {readDone ? '✓ 완료한 퀘스트' : '퀘스트 완료 +1 EXP'}
         </Text>
        </Pressable>
        </View>

      <View>
         <Text style={styles.quest}>🧘 명상 5분</Text>
         <Text style={styles.quest}>
           {meditationDone ? '퀘스트 완료!' : '아직 완료하지 않음'}
        </Text>
 <Text
  style={[
    styles.quest,
    meditationDone
      ? { color: '#60A5FA' }
      : { color: '#9CA3AF' }
  ]}
>
  {!meditationDone
    ? '🎁 명상하면 EXP +1'
    : '🌟 마음이 편안해졌습니다!'}
</Text>
         <Pressable
          style={[
            styles.button,
            meditationDone ? { backgroundColor: '#4B5563' } : {}
          ]}
          onPress={() => {
            if (!meditationDone) {
            setExp(exp + 1);
            setMeditationDone(true);
           }
          }}
          disabled={meditationDone}
        > 
         <Text style={styles.buttonText}>
           {meditationDone ? '✓ 완료한 퀘스트' : '퀘스트 완료 +1 EXP'}
         </Text>
        </Pressable>
              </View>
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
    </ScrollView>
  );
}

// 6. 스타일 설정 ============================================================

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#111827',
},

contentContainer: {
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
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