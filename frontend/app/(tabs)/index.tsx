// frontend/app/(tabs)/index.tsx

import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

// ⚠️ 실제 PC의 IP 주소로 변경할 것.
const BACKEND_URL = 'http://192.168.35.164:8000';

export default function HomeScreen() {
  // 화면에 표시될 메시지를 저장할 변수 (초기값 설정)
  const [message, setMessage] = useState('서버에서 데이터를 불러오는 중...');

  // 화면이 처음 렌더링될 때 한 번만 실행되는 효과
  useEffect(() => {
    fetch(BACKEND_URL) // GET
      .then((response) => response.json()) // 응답을 JSON 형태로 변환
      .then((data) => setMessage(data.Hello)) // JSON 데이터에서 "Hello" 키의 값("World")을 message 변수에 저장
      .catch((error) => {
        console.error(error); // 에러가 발생하면 콘솔에 출력
        setMessage('서버 연결 실패!'); // 에러 메시지를 화면에 표시
      });
  }, []); // 빈 배열은 이 효과가 컴포넌트 마운트 시 한 번만 실행되도록 함

  return (
    <View style={styles.container}>
      <Text style={styles.title}>백엔드 서버 응답:</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: '#333',
  },
});