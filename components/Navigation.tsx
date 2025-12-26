
import React from 'react';
import { ViewType } from '../types';

interface NavigationProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', label: '홈', icon: 'fa-home' },
    { id: 'card-gen', label: '축복 카드 생성', icon: 'fa-envelope-open-text' },
    { id: 'figure-gen', label: '카드 피규어 제작', icon: 'fa-cube' },
    { id: 'mail-service', label: '우편함', icon: 'fa-mailbox' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-100 flex justify-around items-center h-20 px-4 md:static md:flex-col md:h-full md:w-64 md:border-t-0 md:border-r md:pt-10 z-50">
      <div className="hidden md:block mb-10 text-center">
        <h1 className="text-2xl font-bold text-amber-700 font-serif-kr">블레싱 우체국</h1>
        <p className="text-xs text-amber-500">따뜻한 마음을 배달합니다</p>
      </div>
      
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id as ViewType)}
          className={`flex flex-col md:flex-row items-center justify-center md:justify-start md:w-full md:px-6 md:py-4 transition-all duration-200 ${
            currentView === item.id 
              ? 'text-amber-600 md:bg-amber-50 md:rounded-l-full' 
              : 'text-gray-400 hover:text-amber-400'
          }`}
        >
          <i className={`fas ${item.icon} text-xl md:mr-4`}></i>
          <span className="text-[10px] mt-1 md:mt-0 md:text-base font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
