// AccessTokenContext.js
import { createContext, useContext, useState } from 'react';
import { API_URL } from '../config/constants';
import axios from 'axios';

const AccessTokenContext = createContext();

export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};

export const isActiveToken = async (accessToken) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, {
      accessToken: accessToken
    });
    const result = response.data.result;
    console.log(result);
    if(result.id){
      return { 'accessResult' : true , 'user_id' : result.id }
    } else {
      return { 'accessResult' : false }
    }
  } catch (error) {
    console.error(error);
    return false; // 에러 발생 시 유효하지 않은 것으로 처리
  }
}
export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};