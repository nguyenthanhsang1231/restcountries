import './App.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Home from "./restcountries/Home";

function App() {
  return (
   <>
       <Router>
           <div>
               <Routes>
                   <Route path={'/home'} element={<Home/>}>Home</Route>
               </Routes>
           </div>
       </Router>


   </>
  );
}

export default App;
