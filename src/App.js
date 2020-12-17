import { Route, BrowserRouter as Router } from 'react-router-dom'

// own module imports
import Navigation from './components/navigation/Navigation';
import Register from './components/pages/register/RegisterPage';
import Login from './components/pages/login/LoginPage';

// css imports
import './App.css';

function App() {
  return (
    <Router>
      <div className="page">
        <div className="navigation">
          <Navigation />
        </div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  );
}

export default App;
