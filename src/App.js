import './App.css';
import {Firstchat, Main} from './Components';
import { AuthProvider } from './Context/AuthContext';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MM from './Components/MM';
function App() {
  return (
  //   <AuthProvider> 
  //     <BrowserRouter>
  //     <div className="App">
  //      <Routes>
  //       <Route path="/Let-s-Chatt-New/" element={<Main/>}></Route>
  //       </Routes>
  //     {/* <Main/> */}
  //    </div> 
  //  </BrowserRouter>
  //   </AuthProvider>
    <AuthProvider> 
    <div className="App">
    {/* <Main/> */}
    <MM/>
   </div> 
  </AuthProvider>
  );
}

export default App;
