import React, { useEffect } from 'react';
import './style.scss';
import { ProjectBoard } from './pages/board';
import { Main } from './pages/main';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Profile } from './pages/profile';
import { Welcome } from './pages/welcome';
import { Login } from './pages/auth/login';
import { SignUp } from './pages/auth/sign-up';
import { Index } from './pages/layout';
import { useDispatch, useSelector } from 'react-redux';
import { StateReduxInterface } from './state';
import { checkUser } from './api/checkAuth';
import { QuoteApp } from './aadnd/test';

function App() {
  const userId = useSelector((state: StateReduxInterface) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    void checkUser(dispatch);
  }, [dispatch]);

  return (
    <HashRouter>
      <Routes>
        {!userId._id ? (
          <Route path="/" element={<Index />}>
            <Route index element={<QuoteApp />} />
            {/*<Route index element={<Welcome />} />*/}
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<Welcome />} />
          </Route>
        ) : (
          <Route path="/" element={<Index />}>
            <Route path="/profile" element={<Profile />} />
            <Route index element={<Main />} />
            <Route path="/board-:id" element={<ProjectBoard />} />
            <Route path="*" element={<Main />} />
          </Route>
        )}
      </Routes>
    </HashRouter>
  );
}

export default App;
