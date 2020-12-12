import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import ViewPage from './components/ViewPage';
import NavBar from './components/NavBar';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-inner">
          <NavBar/>
          <Router basename={"/"}>
            <Switch>
              <Route path="/view" component={ViewPage}/>
              <Route path="/" component={HomePage}/>
            </Switch>
          </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
