import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../companents/hedear';
import { Footer } from '../../companents/footer';

export const Index = function () {
  return (
    <>
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
