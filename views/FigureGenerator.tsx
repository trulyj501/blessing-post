
import React, { useState, useEffect } from 'react';
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
      const url = await generateFigureImage(selectedCard.theme, selectedCard.recipient);
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
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-pink-100 rounded-xl animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-cube text-4xl text-pink-500 animate-bounce"></i>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">피규어를 조각하고 있어요...</h2>
        <p className="text-gray-500">축복의 메시지를 형상화한 입체 아트가 탄생 중입니다.</p>
      </div>
    );
  }

  if (figureUrl) {
    return (
      <div className="animate-fade-in text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 font-serif-kr">세상에 단 하나뿐인 피규어</h2>
        
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-pink-100 max-w-lg mx-auto relative mb-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            LIMITED EDITION
          </div>
          <img src={figureUrl} alt="Figure Art" className="w-full rounded-2xl shadow-inner bg-gray-50" />
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-700">Blessing For {selectedCard?.recipient}</h3>
            <p className="text-gray-400 text-sm mt-1">#AI_Figure #BlessingPostOffice</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setFigureUrl(null)}
            className="px-8 py-3 bg-white border-2 border-pink-200 text-pink-700 font-bold rounded-full hover:bg-pink-50 transition-all"
          >
            다시 제작하기
          </button>
          <button
            onClick={() => {
                const link = document.createElement('a');
                link.href = figureUrl;
                link.download = `figure_${selectedCard?.recipient}.png`;
                link.click();
            }}
            className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full transition-all"
          >
            이미지 저장하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif-kr">카드 피규어 제작하기</h2>
      <p className="text-gray-500 mb-8">생성된 축복 카드를 바탕으로 특별한 디지털 피규어를 만들어 보세요.</p>

      {savedCards.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border-2 border-dashed border-amber-200 text-center">
          <i className="fas fa-envelope-open text-4xl text-amber-200 mb-4"></i>
          <p className="text-gray-500">아직 생성된 카드가 없습니다.<br/>먼저 카드를 생성해주세요.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">어떤 카드를 피규어로 만들까요?</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {savedCards.map(card => (
              <div 
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
                  selectedCard?.id === card.id ? 'border-pink-500 scale-105 shadow-lg' : 'border-transparent opacity-60'
                }`}
              >
                <img src={card.imageUrl} alt={card.recipient} className="w-full aspect-square object-cover" />
                <div className="bg-white p-2 text-center text-xs font-bold truncate">
                  To. {card.recipient}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCreateFigure}
            disabled={!selectedCard}
            className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all mt-8 ${
              selectedCard 
                ? 'bg-pink-600 hover:bg-pink-700 text-white' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            피규어 제작 시작
          </button>
        </div>
      )}
    </div>
  );
};

export default FigureGenerator;
