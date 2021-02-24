// own module imports
import PortfolioHistorySettingsPage from './components/pages/userprofile/settings/portfolioHistorySettings/PortfolioHistorySettingsPage';
import DeleteProfileSettingsPage from './components/pages/userprofile/settings/deleteProfileSettings/DeleteProfileSettingsPage';
import PasswordSettingsPage from './components/pages/userprofile/settings/passwordSettings/PasswordSettingsPage';
import ProfileSettingsPage from './components/pages/userprofile/settings/profileSettings/ProfileSettingsPage';
import EmailSettingsPage from './components/pages/userprofile/settings/emailSettings/EmailSettingsPage';
import PortfolioHistoryPage from './components/pages/userprofile/portfolioHistory/PortfolioHistoryPage';
import ForgotPasswordPage from './components/pages/forgotPassword/ForgotPasswordPage';
import UserprofilePage from './components/pages/userprofile/profile/UserprofilePage';
import CreateArticlePage from './components/pages/createArticle/CreateArticlePage';
import ArticleListPage from './components/pages/articleList/ArticleListPage';
import RegisterPage from './components/pages/register/RegisterPage';
import ArticlePage from './components/pages/article/ArticlePage';
import MessagePage from './components/pages/message/MessagePage';
import Navigation from './components/navigation/Navigation';
import LoginPage from './components/pages/login/LoginPage';
import HomePage from './components/pages/home/HomePage';
import TagsPage from './components/pages/tags/TagsPage';
import HelpPage from './components/pages/help/HelpPage';


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
        <Route path="/settings/portfolioHistorySettings" component={PortfolioHistorySettingsPage} />
        <Route path="/settings/deleteProfileSettings" component={DeleteProfileSettingsPage} />
        <Route path="/settings/passwordSettings" component={PasswordSettingsPage} />
        <Route path="/settings/profileSettings" component={ProfileSettingsPage} />
        <Route path="/settings/emailSettings" component={EmailSettingsPage} />
        <Route path="/portfolioHistory" component={PortfolioHistoryPage} />
        <Route path="/forgotPassword" component={ForgotPasswordPage} />
        <Route path="/createArticle" component={CreateArticlePage} />
        <Route path="/userprofile/:id" component={UserprofilePage} />
        <Route path="/articleList" component={ArticleListPage} />
        <Route path="/messages/:id" component={MessagePage} />
        <Route path="/article/:id" component={ArticlePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/tags" component={TagsPage} />
        <Route path="/help" component={HelpPage} />
        <Route exact path="/" component={HomePage} />
      </div>
    </Router>
  );
}

export default App;