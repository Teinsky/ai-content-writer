// ai-content-writer/packages/frontend/src/App.jsx
import React, { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './components/pages/HomePage';
import { ChatInterface } from './components/chat/ChatInterface';
import { SettingsPage } from './components/pages/SettingsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { HistoryPage } from './components/pages/HistoryPage'; // ✅ IMPORT TRANG LỊCH SỬ
import { ThemeProvider } from './context/ThemeContext';

import { LoginPage } from './components/pages/auth/LoginPage';
import { RegisterPage } from './components/pages/auth/RegisterPage';

function AppContent({ onNavigateToAuth }) {
  const [activeNav, setActiveNav] = useState('home');

  const renderPage = () => {
    switch (activeNav) {
      case 'home':
        return <HomePage onNavigate={setActiveNav} />;
      case 'chat':
        return <ChatInterface />;
      case 'history': // ✅ THÊM CASE CHO TRANG LỊCH SỬ
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={setActiveNav} />;
    }
  };

  return (
    <MainLayout 
        activeNav={activeNav} 
        setActiveNav={setActiveNav}
        onNavigateToAuth={onNavigateToAuth}
    >
      {renderPage()}
    </MainLayout>
  );
}

function AuthFlow({ onAuthSuccess }) {
    const [authPage, setAuthPage] = useState('login');

    const handleSuccess = (e) => {
        if(e) e.preventDefault();
        onAuthSuccess();
    };
    
    return authPage === 'login' ? (
        <LoginPage 
          onLoginSuccess={handleSuccess} 
          onSwitchToRegister={() => setAuthPage('register')} 
        />
      ) : (
        <RegisterPage 
          onRegisterSuccess={handleSuccess} 
          onSwitchToLogin={() => setAuthPage('login')} 
        />
      );
}

export default function App() {
  const [view, setView] = useState('mainApp');

  return (
    <ThemeProvider>
      {view === 'mainApp' ? (
        <AppContent 
            onNavigateToAuth={() => setView('auth')}
        />
      ) : (
        <AuthFlow 
            onAuthSuccess={() => setView('mainApp')}
        />
      )}
    </ThemeProvider>
  );
}
