import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './assets/css/App.css';
import {Index} from './components/user/Index'

function App() {

  const headers = [
    { id: 'idx', label: '#' , sortable:false},
    { id: "picture", label: "Picture" , sortable:false},
    { id: "Full Name", label: "Full name" , sortable:true},
    { id: "email", label: "Email" , sortable:false},
    
]


  return (
    <div className="App">
      <Index headers={headers} />
    </div>
  );
}

export default App;
