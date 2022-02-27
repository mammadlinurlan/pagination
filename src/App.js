import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './assets/css/App.css';
import {Index} from './components/user/Index'

function App() {

  const headers = [
    { id: 'idx', label: '#' },
    { id: "picture", label: "Picture" },
    { id: "fullname", label: "Full name" },
    { id: "email", label: "Email" }
]


  return (
    <div className="App">
      <Index headers={headers} />
    </div>
  );
}

export default App;
