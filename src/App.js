// own module imports
import Navigation from './components/navigation/Navigation';
import ForgotPasswordPage from './components/pages/forgotPassword/ForgotPasswordPage';
import CreateArticlePage from './components/pages/createArticle/CreateArticlePage';
import ArticleListPage from './components/pages/articleList/ArticleListPage';
import RegisterPage from './components/pages/register/RegisterPage';
import LoginPage from './components/pages/login/LoginPage';

// css imports
import './App.css';

// third party imports
import { Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="page">
        <div className="navigation">
          <Navigation />
        </div>
        <Route path="/forgotPassword" component={ForgotPasswordPage} />
        <Route path="/createArticle" component={CreateArticlePage} />
        <Route path="/articleList" component={ArticleListPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  );
}

export default App;