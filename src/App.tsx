import React from 'react';
import './style.scss';
import { Header } from './companents/hedear';
import { Footer } from './companents/footer';
import { Profile } from './pages/profile';
// import { Welcome } from './pages/welcome';
// import { Login } from './pages/auth/login';
// import { SignUp } from './pages/auth/sign-up';

function App() {
  return (
    <>
      <Header />
      <main className="content">
        {/*<Welcome />*/}
        {/*<Login />*/}
        {/*<SignUp />*/}
        <Profile />
      </main>
      <Footer />
    </>
  );
}

export default App;
