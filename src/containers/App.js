import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/layout/header.component'
import Navigation from '../navigation'

const App = () => (
    <Router>
      <Header />
      <Navigation />
    </Router>
);

export default App;
