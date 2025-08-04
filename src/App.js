import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from './pages/Index'
import List from './pages/List';
import Article from './pages/Article';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" exact element={<Index />} />
      <Route path="/list/:id" basename="list" element={<List />} />
      <Route path="/blog/:id" basename="blog" element={<Article />} />
    </Routes>
  </Router>
);

export default App;