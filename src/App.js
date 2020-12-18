import { Route, BrowserRouter as Router } from 'react-router-dom'

// own module imports
import Navigation from './components/navigation/Navigation';
import ArticleListPage from './components/pages/articleList/ArticleListPage';
import RegisterPage from './components/pages/register/RegisterPage';
import LoginPage from './components/pages/login/LoginPage';

// css imports
import './App.css';

function App() {
  return (
    <Router>
      <div className="page">
        <div className="navigation">
          <Navigation />
        </div>
        <Route path="/articleList" component={ArticleListPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </div>
    </Router>
  );
}

export default App;
