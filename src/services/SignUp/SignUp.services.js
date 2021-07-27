import axios from 'axios';
import { API_URL } from '../../utils';

export const signUpService = (firstName, lastName, email, password) => {
  return axios.post(`${API_URL}/signup`, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
};
