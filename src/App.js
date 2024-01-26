import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import './App.css';
import Profile from './Pages/Profile';

function App() {
  return (
    <> 
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
      </BrowserRouter>    
    </>
  );
}

export default App;
