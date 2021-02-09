// own module imports
import EditingprofilePage from './components/pages/userprofile/editingprofile/EditingprofilePage';
import ForgotPasswordPage from './components/pages/forgotPassword/ForgotPasswordPage';
import UserprofilePage from './components/pages/userprofile/profile/UserprofilePage';
import CreateArticlePage from './components/pages/createArticle/CreateArticlePage';
import ArticleListPage from './components/pages/articleList/ArticleListPage';
import Settings from './components/pages/userprofile/settings/SettingsPage';
import RegisterPage from './components/pages/register/RegisterPage';
import ArticlePage from './components/pages/article/ArticlePage';
import Navigation from './components/navigation/Navigation';
import LoginPage from './components/pages/login/LoginPage';
import HomePage from './components/pages/home/HomePage';
import TagsPage from './components/pages/tags/TagsPage';

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
        <Route path="/editinguserprofile" component={EditingprofilePage} />
        <Route path="/forgotPassword" component={ForgotPasswordPage} />
        <Route path="/createArticle" component={CreateArticlePage} />
        <Route path="/userprofile/:id" component={UserprofilePage} />
        <Route path="/articleList" component={ArticleListPage} />
        <Route path="/article/:id" component={ArticlePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/settings" component={Settings} />
        <Route path="/login" component={LoginPage} />
        <Route path="/tags" component={TagsPage} />
        <Route exact path="/" component={HomePage} />
      </div>
    </Router>
  );
}

export default App;