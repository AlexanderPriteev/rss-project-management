import { getUsersById } from './requests';
import { reduxUser, StateReduxInterface } from '../state';
import { userLogOut } from '../companents/hedear/menus/user-menu';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const checkUser = async (dispatch: Dispatch) => {
  const userId = localStorage.getItem('userId') || '';
  const token = localStorage.getItem('token') || '';
  if (token) {
    try {
      const data = await getUsersById(userId, token);
      dispatch(reduxUser(data));
    } catch {
      userLogOut(dispatch);
    }
  }
};

export const useCheckUser = () => {
  const router = useNavigate();
  const userId = useSelector((state: StateReduxInterface) => state.user);
  useEffect(() => {
    if (!userId._id) {
      router('/');
    }
  }, [router, userId._id]);
};
