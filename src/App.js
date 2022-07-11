import './App.css';
import {Main} from './Components';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Main/>
    </div>
    </AuthProvider>
  );
}

export default App;
