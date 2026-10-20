import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';


export default function PracticeScreen() {
    const [gold, setGold] = useState(0);
  return (
    <View style={{ padding: 50
      
    }}>
      <Text>나의 연습장</Text>
      <Text> GOLD : {gold} </Text>
      <Pressable onPress={() => setGold(gold + 1)}> 
        <Text>Gold +1</Text>
      </Pressable>
    </View>
  );
}

// 여기부터 혼자 연습내용



