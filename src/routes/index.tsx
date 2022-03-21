import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages';

export const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
};
