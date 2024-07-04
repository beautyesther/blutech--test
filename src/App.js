import React from 'react';
import { DepartmentProvider } from './context/DepartmentContext';
import Header from './components/Header';
import DepartmentList from './components/DepartmentList';
import './styles/main.scss';

function App() {
  return (
    <DepartmentProvider>
      <div className="app">
        <Header />
        <div className="container">
          <DepartmentList />
        </div>
      </div>
    </DepartmentProvider>
  );
}

export default App;