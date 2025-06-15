import axios from './axiosInstance';
import type { LoginData, LoginResponse, RegisterData, RegisterResponse, UserResponse } from './types';

export const login = async (data: LoginData) => { 
  const res = await axios.post<LoginResponse>('/auth/login', data)
  return res.data;
};

export const register = async (data: RegisterData) => {
  const res = await axios.post<RegisterResponse>('/auth/register', data);
  return res.data;
};

export const getUser = async (id: string) => {
  const res = await axios.get<UserResponse>(`/auth/user/${id}`);
  return res.data;
};
