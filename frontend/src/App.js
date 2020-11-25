import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-inner">
          <NavBar/>
          <HomePage/>
        </div>
      </header>
    </div>
  );
}

export default App;
