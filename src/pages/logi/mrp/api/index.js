// E:\20240814 리액트 프로젝트\78th_acc_react\account_next_front\src\pages\logi\mrp\api\index.js

import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_ACC_URL}/api/account/budget/mrp/mrplist`; // API 엔드포인트

export const handleMrpData = async () => {
  try {
    const response = await axios.get(API_URL); // 데이터를 가져오는 POST 요청
    return response.data; // API에서 응답받은 데이터 반환
  } catch (error) {
    console.error('Error fetching MRP data:', error);
    throw error; // 에러 발생 시 처리
  }
};

// 서버에서 MRP 데이터를 받는 API 엔드포인트 설정
export const receiveMrpData = (data) => {
  // 데이터를 받으면 여기에서 상태를 업데이트하거나 UI를 변경하는 로직을 추가합니다.
  console.log('Received MRP Data:', data);

  // 예: 상태 관리 라이브러리 사용 (예: Redux, Context API 등)
  // dispatch(updateMrpData(data)); // 예시
};
