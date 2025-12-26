
import React, { useState } from 'react';
import { ViewType, BlessingCard } from './types';
import Navigation from './components/Navigation';
import Home from './views/Home';
import CardGenerator from './views/CardGenerator';
import FigureGenerator from './views/FigureGenerator';
import MailService from './views/MailService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [savedCards, setSavedCards] = useState<BlessingCard[]>([]);
  const [activeCard, setActiveCard] = useState<BlessingCard | null>(null);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
  };

  const addCard = (card: BlessingCard) => {
    setSavedCards(prev => [card, ...prev]);
    setActiveCard(card);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onStart={() => setCurrentView('card-gen')} />;
      case 'card-gen':
        return <CardGenerator onCardCreated={addCard} goToFigure={() => setCurrentView('figure-gen')} />;
      case 'figure-gen':
        return <FigureGenerator initialCard={activeCard} savedCards={savedCards} />;
      case 'mail-service':
        return <MailService savedCards={savedCards} />;
      default:
        return <Home onStart={() => setCurrentView('card-gen')} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fffaf0]">
      <Navigation currentView={currentView} onNavigate={handleNavigate} />
      <main className="flex-1 pb-24 md:pb-0 h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
