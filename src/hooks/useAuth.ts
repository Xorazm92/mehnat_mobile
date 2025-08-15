import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { loginUser, registerUser, logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    return dispatch(loginUser({ email, password }));
  };

  const register = async (email: string, password: string, name: string) => {
    return dispatch(registerUser({ email, password, name }));
  };

  const signOut = () => {
    dispatch(logout());
  };

  return {
    ...auth,
    login,
    register,
    signOut,
  };
};
