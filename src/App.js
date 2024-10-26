import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import AppRoutes from './routes';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;