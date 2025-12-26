
import React, { useState } from 'react';
import { BlessingCard } from '../types';
import { generateFigureImage } from '../services/geminiService';

interface FigureGeneratorProps {
  initialCard: BlessingCard | null;
  savedCards: BlessingCard[];
}

const FigureGenerator: React.FC<FigureGeneratorProps> = ({ initialCard, savedCards }) => {
  const [selectedCard, setSelectedCard] = useState<BlessingCard | null>(initialCard);
  const [loading, setLoading] = useState(false);
  const [figureUrl, setFigureUrl] = useState<string | null>(null);

  const handleCreateFigure = async () => {
    if (!selectedCard) return;

    setLoading(true);
    try {
      const url = await generateFigureImage(selectedCard.theme, selectedCard.recipient, selectedCard.style);
      setFigureUrl(url);
    } catch (error) {
      console.error("Figure generation failed", error);
      alert("피규어 제작 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-8 border-pink-50 rounded-full border-t-pink-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-cube text-4xl text-pink-500 animate-bounce"></i>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-serif-kr">축복의 형상을 빚는 중...</h2>
        <p className="text-gray-500 max-w-sm">디지털 아트를 바탕으로 특별한 3D 스타일 피규어를 조각하고 있습니다.</p>
      </div>
    );
  }

  if (figureUrl) {
    return (
      <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif-kr">세상에 단 하나뿐인 피규어</h2>
        <p className="text-gray-500 mb-10">당신의 축복이 아름다운 입체 조형물로 탄생했습니다.</p>
        
        <div className="bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl border border-pink-50 max-w-xl mx-auto relative mb-12 overflow-hidden">
          <div className="absolute top-8 right-8 bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
            Art Toy Edition
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-pink-50 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <img src={figureUrl} alt="Figure Art" className="relative w-full rounded-3xl shadow-lg bg-gray-50 border border-white" />
          </div>

          <div className="mt-10 border-t border-gray-100 pt-8">
            <h3 className="text-2xl font-bold text-gray-800 font-serif-kr">Blessing: {selectedCard?.recipient}</h3>
            <p className="text-gray-400 text-sm mt-2 italic">"{selectedCard?.theme}"</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setFigureUrl(null)}
            className="px-10 py-4 bg-white border-2 border-pink-100 text-pink-600 font-bold rounded-2xl hover:bg-pink-50 transition-all shadow-sm"
          >
            다른 카드로 제작
          </button>
          <button
            onClick={() => {
                const link = document.createElement('a');
                link.href = figureUrl;
                link.download = `blessing_figure_${selectedCard?.recipient}.png`;
                link.click();
            }}
            className="px-10 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center"
          >
            <i className="fas fa-download mr-3 text-pink-400"></i> 고화질 이미지 저장
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif-kr">카드 피규어 제작</h2>
        <p className="text-gray-500">생성된 축복 카드를 3D 아트 토이 스타일의 피규어로 변환합니다.</p>
      </header>

      {savedCards.length === 0 ? (
        <div className="bg-white p-16 rounded-[2.5rem] border-2 border-dashed border-amber-100 text-center">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-envelope-open text-3xl text-amber-200"></i>
          </div>
          <p className="text-gray-500 font-medium">아직 생성된 카드가 없습니다.<br/><span className="text-amber-600">축복 카드 생성</span> 메뉴를 먼저 이용해주세요.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-5 flex items-center">
              <i className="fas fa-images mr-2 text-pink-500"></i> 제작할 카드 선택
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {savedCards.map(card => (
                <button 
                  key={card.id}
                  onClick={() => setSelectedCard(card)}
                  className={`group relative rounded-2xl overflow-hidden border-4 transition-all duration-300 text-left ${
                    selectedCard?.id === card.id ? 'border-pink-500 ring-4 ring-pink-50 scale-105 shadow-xl' : 'border-transparent opacity-70 grayscale hover:grayscale-0 hover:opacity-100'
                  }`}
                >
                  <img src={card.imageUrl} alt={card.recipient} className="w-full aspect-square object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-[10px] font-bold truncate">To. {card.recipient}</p>
                  </div>
                  {selectedCard?.id === card.id && (
                    <div className="absolute top-2 right-2 bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                      <i className="fas fa-check text-[10px]"></i>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreateFigure}
            disabled={!selectedCard}
            className={`w-full py-5 font-bold rounded-2xl shadow-xl transition-all mt-6 flex items-center justify-center group ${
              selectedCard 
                ? 'bg-pink-600 hover:bg-pink-700 text-white transform hover:scale-[1.01]' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            피규어 제작 시작 <i className="fas fa-magic ml-3 group-hover:rotate-12 transition-transform"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default FigureGenerator;
