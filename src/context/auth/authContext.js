import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router';

const AuthContext = createContext();

const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common['Authorization'] = token);
  }
  delete axios.defaults.headers.common['Authorization'];
};

const loginService = (email, password) => {
  return axios.post('https://shoemeup.pranshudobhal.repl.co/login', {
    email: email,
    password: password,
  });
};

const signUpService = (firstName, lastName, email, password) => {
  return axios.post('https://shoemeup.pranshudobhal.repl.co/signup', {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
};

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage?.getItem('login'));
  const [token, setToken] = useState(localStorageToken?.token);
  token && setupAuthHeaderForServiceCalls(token);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    token && getUserData();
  }, []);

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 403) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const getUserData = async () => {
    try {
      const {
        data: { user },
      } = await axios.get('https://shoemeup.pranshudobhal.repl.co/user');

      setUser(user);
    } catch (error) {
      console.error('Error getting user data ', error.response);
    }
  };

  const signUpUser = async (firstName, lastName, email, password) => {
    try {
      const {
        data: { token },
        status,
      } = await signUpService(firstName, lastName, email, password);

      if (status === 201) {
        localStorage?.setItem('login', JSON.stringify({ token: token }));
        setToken(token);
        setupAuthHeaderForServiceCalls(token);
        navigate('/');
      }
      return status;
    } catch (error) {
      const {
        data: { message },
        status,
      } = error.response;

      if (status === 409) {
        return status;
      }

      console.error(message);
    }
  };

  const loginUser = async (email, password, state) => {
    try {
      const {
        data: { token },
        status,
      } = await loginService(email, password);

      if (status === 200) {
        localStorage?.setItem('login', JSON.stringify({ token: token }));
        setToken(token);
        setupAuthHeaderForServiceCalls(token);
        state === null ? navigate('/') : navigate(state.from ? state.from : '/');
      }
      return status;
    } catch (error) {
      const {
        data: { message },
        status,
      } = error.response;

      if (status === 401) {
        return status;
      }
      console.error('Error', message);
    }
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    setupAuthHeaderForServiceCalls(null);
    localStorage?.removeItem('login');
    navigate('/');
  };

  return <AuthContext.Provider value={{ token, user, loginUser, signUpUser, logoutUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
