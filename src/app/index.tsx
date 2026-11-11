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
  const [category, setCategory] = useState<Category>('근력');
  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [int, setInt] = useState(0);
  const [mental, setMental] = useState(0);
  const [screen, setScreen] = useState<'home' | 'character'>('home');
  type Category = '근력' | '유산소' | '공부' | '명상';

type Quest = {
  name: string;
  completed: boolean;
  category: Category;
};

type ItemType = '검' | '활' | '지팡이' | '방패' | '갑옷';
type ItemRarity = '일반' | '고급' | '희귀' | '전설' | '고유';
type StatType = 'STR' | 'DEX' | 'INT' | 'MENTAL';

type Item = {
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  option: {
    stat: StatType;
    value: number;
  };
};

type CompletedQuest = {
  name: string;
  category: Category;
};

const [quests, setQuests] = useState<Quest[]>([]);

const [completedQuests, setCompletedQuests] =
  useState<CompletedQuest[]>([]);
  
  const testItem: Item = {
  name: '훈련용 목검',
  type: '검',
  rarity: '희귀',
  option: {
    stat: 'STR',
    value: 1,
  },
};

const testBow: Item = {
  name: '낡은 사냥활',
  type: '활',
  rarity: '전설',
  option: {
    stat: 'DEX',
    value: 2,
  },
};

const createRandomOption = () => {
  const stats: StatType[] = ['STR', 'DEX', 'INT', 'MENTAL'];

  const randomIndex = Math.floor(Math.random() * stats.length);

  const randomValue = Math.floor(Math.random() * 3) + 1;

  return {
    stat: stats[randomIndex],
    value: randomValue,
  };
};

const createRandomRarity = (): ItemRarity => {
  const rarities: ItemRarity[] = [
    '일반',
    '고급',
    '희귀',
    '전설',
    '고유',
  ];

  const randomIndex = Math.floor(Math.random() * rarities.length);

  return rarities[randomIndex];
};

const createRandomItem = (): Item => {
  const itemTypes: ItemType[] = [
    '검',
    '활',
    '지팡이',
    '방패',
    '갑옷',
  ];

  const randomIndex = Math.floor(
    Math.random() * itemTypes.length
  );

  const selectedType = itemTypes[randomIndex];

  return {
    name: `${selectedType} 아이템`,
    type: selectedType,
    rarity: createRandomRarity(),
    option: createRandomOption(),
  };
};

const [randomRarity, setRandomRarity] =
  useState<ItemRarity | null>(null);

const [randomOption, setRandomOption] =
  useState<ReturnType<typeof createRandomOption> | null>(null);

const [generatedItem, setGeneratedItem] = useState<Item | null>(null);

const [inventory, setInventory] = useState<Item[]>([]);

const [playerHp, setPlayerHp] = useState(100);
const [monsterHp, setMonsterHp] = useState(50);

const attackMonster = () => {
  if (monsterHp <= 0 || playerHp <= 0) return;

  const damage = 10;
  const counterDamage = 5;

  const remainingMonsterHp = Math.max(0, monsterHp - damage);

  // 1. 플레이어 공격
  setMonsterHp(remainingMonsterHp);

  // 2. 몬스터가 살아 있다면 반격
  if (remainingMonsterHp > 0) {
    setPlayerHp((prevHp) =>
      Math.max(0, prevHp - counterDamage)
    );
  }
};

const restartBattle = () => {
  setPlayerHp(100);
  setMonsterHp(50);
};

const [rewardMessage, setRewardMessage] = useState('');

const createQuestReward = (): Item => {
  const types: ItemType[] = ['검', '활', '지팡이', '방패', '갑옷'];

  const randomType =
    types[Math.floor(Math.random() * types.length)];

  return {
    name: `보상 ${randomType}`,
    type: randomType,
    rarity: createRandomRarity(),
    option: createRandomOption(),
  };
};

const [equippedItem, setEquippedItem] = useState<Item | null>(null);

const getEquipmentBonus = (stat: string): number => {
  if (equippedItem?.option.stat === stat) {
    return equippedItem.option.value;
  }

  return 0;
};

const getRarityColor = (rarity: ItemRarity): string => {
  switch (rarity) {
    case '일반':
      return '#9CA3AF';
    case '고급':
      return '#22C55E';
    case '희귀':
      return '#3B82F6';
    case '전설':
      return '#F59E0B';
    case '고유':
      return '#A855F7';
    default:
      return '#FFFFFF';
  }
};

// 4. 화면 구성 ============================================================
  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={styles.contentContainer}
>
      <Text style={styles.logo}>⚔️</Text>
<View style={{
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 10,
  marginBottom: 20,
}}>
  <Pressable
    onPress={() => setScreen('home')}
    style={{
      backgroundColor: screen === 'home' ? '#16A34A' : '#374151',
      padding: 12,
      borderRadius: 8,
    }}
  >
    <Text style={{ color: 'white' }}>홈</Text>
  </Pressable>

  <Pressable
    onPress={() => setScreen('character')}
    style={{
      backgroundColor: screen === 'character' ? '#16A34A' : '#374151',
      padding: 12,
      borderRadius: 8,
    }}
  >
    <Text style={{ color: 'white' }}>캐릭터</Text>
  </Pressable>
</View>

{screen === 'home' && (
  <>
      <Text style={styles.title}>나도 레벨업</Text>
      <Text style={styles.subtitle}>현실 성장 RPG</Text>
      <TextInput
        placeholder="새로운 퀘스트를 입력하세요"
        value={questName}
        onChangeText={setQuestName}
        placeholderTextColor="#AAAAAA"
        style={{ color: 'white', borderWidth: 1, borderColor: 'white', padding: 10, width: 250}}
      />
      <View style={{
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 8,
  marginTop: 10,
}}>
  {(['근력', '유산소', '공부', '명상'] as Category[]).map((item) => (
    <Pressable
      key={item}
      onPress={() => setCategory(item)}
      style={{
        backgroundColor: category === item ? '#16A34A' : '#374151',
        padding: 10,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: 'white' }}>{item}</Text>
    </Pressable>
  ))}
</View>
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
    category: category,
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
      {index + 1}. [{quest.category}] {quest.name}
    </Text>

    <Pressable
      onPress={() => {
        if (quest.completed) return;
        const rewardItem = createQuestReward();
        setRewardMessage(`🎁 ${rewardItem.name} 획득!`);

setInventory((prevInventory) => [
  ...prevInventory,
  rewardItem,
]);
        setCompletedQuests((prev) => [
          { name: quest.name, category: quest.category },
          ...prev,
        ].slice(0, 3));

        setQuests(
          quests.map((item, i) =>
            i === index
              ? { ...item, completed: true }
              : item
        )
      );

        setExp((prevExp) => {
        const nextExp = exp + 1;

        if (nextExp >= 10) {
          setLevel((prevLevel) => prevLevel + 1);
          setExp(nextExp - 10);
        } else {
          setExp(nextExp);
        }
        if (quest.category === '근력') {
          setStr((prevStr) => prevStr + 1);
        }
        if (quest.category === '유산소') {
          setDex((prevDex) => prevDex + 1);
        }
        if (quest.category === '공부') {
           setInt((prevInt) => prevInt + 1);
        }
        if (quest.category === '명상') {
  setMental((prevMental) => prevMental + 1);
}
        return nextExp;
      });
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

{rewardMessage !== '' && (
  <Text
    style={{
      color: '#FBBF24',
      textAlign: 'center',
      marginTop: 10,
      fontWeight: 'bold',
    }}
  >
    {rewardMessage}
  </Text>
)}

<View
  style={{
    backgroundColor: '#1F2937',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  }}
>
  <Text
    style={{
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
    }}
  >
    ⚔️ 전투 테스트
  </Text>

  <Text style={{ color: '#22C55E', fontSize: 18 }}>
    🧑 플레이어 HP: {playerHp} / 100
  </Text>

  <Text
    style={{
      color: '#EF4444',
      fontSize: 18,
      marginTop: 10,
    }}
  >
    👾 몬스터 HP: {monsterHp} / 50
  </Text>

<Pressable
  onPress={attackMonster}
  disabled={monsterHp === 0 || playerHp === 0}
  style={{
    backgroundColor:
  monsterHp === 0 || playerHp === 0
    ? '#4B5563'
    : '#DC2626',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  }}
>
  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
    ⚔️ 공격하기
  </Text>
</Pressable>

{monsterHp === 0 && (
  <Text
    style={{
      color: '#FBBF24',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 15,
    }}
  >
    🏆 전투 승리!
  </Text>
)}

{playerHp === 0 && (
  <Text
    style={{
      color: '#EF4444',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 15,
    }}
  >
    💀 전투 패배!
  </Text>
)}

<Pressable
  onPress={restartBattle}
  style={{
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  }}
>
  <Text
    style={{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    }}
  >
    🔄 전투 재시작
  </Text>
</Pressable>

</View>

  </>
)}

{screen === 'character' && (
  <>

      <View style={styles.character}>
        <Text style={styles.characterEmoji}>🧙‍♂️</Text>
      </View>

     <View style={{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'baseline',
  gap: 15,
  marginBottom: 12,
}}>
  <Text style={styles.level}>LV. {level}</Text>
  <Text style={{
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
}}>
  EXP {exp} / 10
</Text>
</View>
      <Text style={styles.hp}>HP {hp} / 100</Text>
      <View style={{
  backgroundColor: '#1F2937',
  padding: 15,
  borderRadius: 12,
  marginTop: 15,
  width: 350,
  alignSelf: 'center',
}}>
  <Text style={{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  }}>
    캐릭터 능력치
  </Text>

<View style={{ flexDirection: 'row', marginBottom: 10 }}>
  {[
    { label: 'STR', name: '근력', value: str + getEquipmentBonus('STR'), color: '#FBBF24' },
{ label: 'DEX', name: '민첩', value: dex + getEquipmentBonus('DEX'), color: '#38BDF8' },
  ].map((stat) => (
    <View key={stat.label} style={{ width: '50%', padding: 5 }}>
      <View style={{
        backgroundColor: '#111827',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
      }}>
        <Text style={{ color: stat.color, fontWeight: 'bold' }}>
          {stat.label}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
  <Text style={{ color: 'white', fontSize: 24 }}>
    {stat.value}
  </Text>

  {getEquipmentBonus(stat.label) > 0 && (
    <Text style={{ color: '#22C55E', fontSize: 14 }}>
      (+{getEquipmentBonus(stat.label)})
    </Text>
  )}
</View>
        <Text style={{ color: '#9CA3AF' }}>
          {stat.name}
        </Text>
      </View>
    </View>
  ))}
</View>


<View style={{ flexDirection: 'row' }}>
  {[
    { label: 'INT', name: '지능', value: int + getEquipmentBonus('INT'), color: '#A78BFA' },
    { label: 'MENTAL', name: '정신력', value: mental + getEquipmentBonus('MENTAL'), color: '#34D399' },
  ].map((stat) => (
    <View key={stat.label} style={{ width: '50%', padding: 5 }}>
      <View style={{
        backgroundColor: '#111827',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
      }}>
        <Text style={{ color: stat.color, fontWeight: 'bold' }}>
          {stat.label}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
  <Text style={{ color: 'white', fontSize: 24 }}>
    {stat.value}
  </Text>

  {getEquipmentBonus(stat.label) > 0 && (
    <Text style={{ color: '#22C55E', fontSize: 14 }}>
      (+{getEquipmentBonus(stat.label)})
    </Text>
  )}
</View>
        <Text style={{ color: '#9CA3AF' }}>
          {stat.name}
        </Text>
      </View>
    </View>
  ))}
</View>
<View style={{
  borderTopWidth: 1,
  borderTopColor: '#374151',
  marginTop: 15,
  paddingTop: 12,
  alignItems: 'center',
}}>
  <Text style={{
    color: '#FBBF24',
    fontWeight: 'bold',
    fontSize: 16,
  }}>
    GOLD {gold}
  </Text>
</View>
</View>
      
      <View style={{
  backgroundColor: '#1F2937',
  padding: 15,
  borderRadius: 12,
  marginTop: 15,
  width: 350,
  alignSelf: 'center',
}}>
  <Text style={{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  }}>
    최근 완료 기록
  </Text>

  {completedQuests.length === 0 ? (
    <Text style={{ color: '#9CA3AF', textAlign: 'center' }}>
      아직 완료한 퀘스트가 없습니다.
    </Text>
  ) : (
    completedQuests.map((item, index) => (
      <Text
        key={index}
        style={{ color: 'white', marginBottom: 8 }}
      >
        ✓ [{item.category}] {item.name}
      </Text>
    ))
  )}
</View>

<View style={{
  backgroundColor: '#1F2937',
  padding: 15,
  borderRadius: 12,
  marginTop: 15,
  width: 350,
  alignSelf: 'center',
}}>
  <Text style={{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  }}>
    🎒 인벤토리 ({inventory.length}개)
  </Text>

<View style={{
  backgroundColor: '#111827',
  padding: 12,
  borderRadius: 8,
  marginBottom: 15,
  borderWidth: 1,
  borderColor: '#4B5563',
}}>
  <Text style={{
    color: '#FBBF24',
    fontWeight: 'bold',
    textAlign: 'center',
  }}>
    ⚔️ 현재 장착 장비
  </Text>

  <Text style={{
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  }}>
    {equippedItem
      ? `${equippedItem.name} (${equippedItem.option.stat} +${equippedItem.option.value})`
      : '장착한 아이템이 없습니다.'}
  </Text>

  {equippedItem && (
  <Text
    style={{
      color: '#22C55E',
      textAlign: 'center',
      marginTop: 5,
      fontWeight: 'bold',
    }}
  >
    적용 중: {equippedItem.option.stat}
    {' +'}
    {equippedItem.option.value}
  </Text>
)}

</View>

  {inventory.length === 0 ? (
    <Text style={{ color: '#9CA3AF', textAlign: 'center' }}>
      보유한 아이템이 없습니다.
    </Text>
  ) : (
    inventory.map((item, index) => (
  <View
    key={index}
    style={{
      borderWidth: 2,
      borderColor: getRarityColor(item.rarity),
      backgroundColor: '#111827',
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
    }}
  >
    <Text
      style={{
        color: getRarityColor(item.rarity),
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      }}
    >
      [{item.rarity}] {item.name}
    </Text>

    <Text style={{ color: 'white' }}>
      종류: {item.type}
    </Text>

    <Text style={{ color: '#9CA3AF' }}>
      옵션: {item.option.stat} +{item.option.value}
    </Text>

<Pressable
  onPress={() => setEquippedItem(item)}
  style={{
    backgroundColor:
      equippedItem === item ? '#16A34A' : '#374151',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  }}
>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>
    {equippedItem === item ? '✓ 장착 중' : '장착하기'}
  </Text>
</Pressable>

  </View>
))
  )}
</View>

<Text style={{ color: 'white', textAlign: 'center' }}>
  테스트 아이템: {testItem.name}
  {'\n'}
  종류: {testItem.type}
  {'\n'}
  등급: {testItem.rarity}
  {'\n'}
  옵션: {testItem.option.stat} +{testItem.option.value}
</Text>

<Text style={{ color: 'white', textAlign: 'center', marginTop: 12 }}>
  테스트 아이템: {testBow.name}
  {'\n'}
  종류: {testBow.type}
  {'\n'}
  등급: {testBow.rarity}
  {'\n'}
  옵션: {testBow.option.stat} +{testBow.option.value}
</Text>

<Pressable
  onPress={() => setRandomOption(createRandomOption())}
  style={{
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignSelf: 'center',
  }}
>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>
    🎲 랜덤 옵션 생성
  </Text>
</Pressable>

{randomOption && (
  <Text
    style={{
      color: '#FBBF24',
      textAlign: 'center',
      marginTop: 10,
    }}
  >
    생성된 옵션: {randomOption.stat} +{randomOption.value}
  </Text>
)}

<Pressable
  onPress={() => setRandomRarity(createRandomRarity())}
  style={{
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'center',
  }}
>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>
    🎲 랜덤 등급 생성
  </Text>
</Pressable>

{randomRarity && (
  <Text
    style={{
      color: '#FBBF24',
      textAlign: 'center',
      marginTop: 10,
    }}
  >
    생성된 등급: {randomRarity}
  </Text>
)}

<Pressable
  onPress={() => setGeneratedItem(createRandomItem())}
  style={{
    backgroundColor: '#16A34A',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  }}
>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>
    🎁 랜덤 아이템 생성
  </Text>
</Pressable>

{generatedItem && (
  <View style={{
    alignItems: 'center',
    marginTop: 15,
    gap: 5,
  }}>
    <Text style={{ color: 'white', fontWeight: 'bold' }}>
      획득 아이템: {generatedItem.name}
    </Text>

    <Text style={{ color: 'white' }}>
      종류: {generatedItem.type}
    </Text>

    <Text style={{ color: '#FBBF24' }}>
      등급: {generatedItem.rarity}
    </Text>

    <Text style={{ color: '#38BDF8' }}>
      옵션: {generatedItem.option.stat} +{generatedItem.option.value}
    </Text>

<Pressable
  onPress={() => {
    if (!generatedItem) return;
    
    setInventory((prev) => [...prev, generatedItem]);
    setGeneratedItem(null);
  }}
  style={{
    backgroundColor: '#16A34A',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  }}
>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>
    🎒 인벤토리에 보관
  </Text>
</Pressable>

  </View>
)}

      <View style={[styles.expBar, { width: 350, alignSelf: 'center' }]}>
        <View
          style={[
            styles.expFill,
            { width: `${Math.min(exp * 10, 100)}%` },
          ]}
        />
      </View>
      <Text style={{
        color: '#9CA3AF',
        fontSize: 12,
        marginTop: 6,
        marginBottom: 12,
      }}>
        다음 레벨까지 {Math.max(10 - exp, 0)} EXP
      </Text>

      <View style={[styles.hpBar, { width: 350, alignSelf: 'center' }]}>
        <View
          style={[
            styles.hpFill,
            { width: `${hp}%` },
       ]}
  />
      </View>

  </>
)}
{screen === 'home' && (
  <>
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
        </>
)}
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