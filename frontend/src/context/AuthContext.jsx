import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      
      const response = await authService.checkLoginStatus();
      if (response.loggedIn) {

        const userData = await authService.getCurrentUser();
        setUser(userData);
      }
    } catch (err) {

      setError(err.message);
    } finally {

      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const userData = await authService.getCurrentUser();
      setUser(userData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      const response = await authService.updateUser(userData);
      setUser(response);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
const changePassword = async(changedata)=>{
  try {
    const  response= await authService.changePassword(changedata)
    setUser(response)
    return response
  } catch (error) {
     setError(err.message);
      throw err;
    
  }
 
 }
const forgetPasswords = async(email)=>{
          try {
            const response = await authService.forgetPassword(email)
            setUser(response)
            return response
            
          } catch (error) {
            
          }







}
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
    changePassword,
    forgetPasswords
  };

  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 