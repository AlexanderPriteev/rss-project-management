import React from 'react';
import './style.scss';
import { Header } from './companents/hedear';
import { Footer } from './companents/footer';
import { Welcome } from './pages/welcome';

function App() {
  return (
    <>
      <Header />
      <main className="content">
        <Welcome />
      </main>
      <Footer />
    </>
  );
}

export default App;
