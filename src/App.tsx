import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '@vkontakte/vkui/dist/vkui.css';
import { AppRoot } from '@vkontakte/vkui';
import { Encoder } from './Encoder';

export const App: React.FC = () => {
  return (
    <AppRoot>
      <Routes>
        <Route path="/" element={<Encoder />} />
      </Routes>
    </AppRoot>
  );
};
