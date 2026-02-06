import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import GoogleMapPage from './pages/GoogleMapPage';
import CommentPage from './pages/CommentPage';
import CalculatePage from './pages/CalculatePage';

type Page = 'login' | 'home' | 'profile' | 'map' | 'comment' | 'calculate';

export interface ProfileData {
  name: string;
  dob: string;
  gender: string;
  imagePreview: string | null;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={() => navigateTo('home')} />;
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'profile':
        return <ProfilePage onClose={() => navigateTo('home')} />;
      case 'map':
        return <GoogleMapPage onClose={() => navigateTo('home')} />;
      case 'comment':
        return <CommentPage onClose={() => navigateTo('home')} />;
      case 'calculate':
        return <CalculatePage onClose={() => navigateTo('home')} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return <>{renderPage()}</>;
}

export default App;
