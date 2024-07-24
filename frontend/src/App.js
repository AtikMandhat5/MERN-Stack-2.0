import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import User from './components/User';
// theme css
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<div>Hello, default page</div>} />
            <Route path='/home' element={<Home />} />
            <Route path='/users' element={<User />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
