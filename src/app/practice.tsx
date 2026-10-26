import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';


export default function PracticeScreen() {
    const [gold, setGold] = useState(0);
    const [questName, setQuestName] = useState('');
    const [registeredQuest, setRegisteredQuest] = useState('');
    const [quests, setQuests] = useState<string[]>([]); 
  return (
    <View style={{ padding: 50
      
    }}>
      <Text>나의 연습장</Text>
      <Text> GOLD : {gold} </Text>
      <Pressable onPress={() => setGold(gold + 1)}> 
        <Text>Gold +1</Text>
      </Pressable>
      <TextInput 
      placeholder="새로운 퀘스트를 입력하세요"
      value={questName}
      onChangeText={setQuestName}
      maxLength={10}
      />
      <Pressable onPress={() => 
        {setRegisteredQuest(questName);
         setQuests([...quests, questName]);
         setQuestName('');
        }}  >
      <Text>퀘스트 등록</Text>
      </Pressable>
      <Text>등록된 퀘스트 {registeredQuest}</Text>
      <Text>등록된 퀘스트 개수 : {quests.length}개</Text>
      {quests.map((quest, index) => (
      <Text key={index}>{index +1}. {quest}</Text>
    ))}
      <Text>입력한 퀘스트 : {questName}</Text>
    </View>
     );
}





