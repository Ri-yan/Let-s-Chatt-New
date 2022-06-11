import './App.css';
import {Main} from './Components';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Main/>
      </AuthProvider>
    </div>
  );
}

export default App;
