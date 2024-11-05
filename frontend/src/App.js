import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './components/CheckoutForm';
import Login from './components/Login';
import Register from './components/Register';
import ProjectList from './components/ProjectList';
import CreateProjectForm from './components/CreateProjectForm';
import EditProjectForm from './components/EditProjectForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/create-project" element={<CreateProjectForm />} />
          <Route path="/edit-project" element={<EditProjectForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
