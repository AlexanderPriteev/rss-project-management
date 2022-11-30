import React from 'react';
import './style.scss';
import { ProjectBoard } from './pages/board';
import { Main } from './pages/main';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Profile } from './pages/profile';
import { Welcome } from './pages/welcome';
import { Login } from './pages/auth/login';
import { SignUp } from './pages/auth/sign-up';
import { Index } from './pages/layout';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<SignUp />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          {/*<Route path="/sign-up" element={<SignUp />} />*/}
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<Main />} />
          <Route path="/board" element={<ProjectBoard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
