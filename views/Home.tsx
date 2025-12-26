
import React from 'react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
        <i className="fas fa-paper-plane text-4xl text-amber-600"></i>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-serif-kr">
        블레싱 우체국에 오신 것을 <br/>환영합니다
      </h1>
      
      <p className="text-lg text-gray-600 mb-12 max-w-xl leading-relaxed">
        AI의 힘으로 소중한 사람을 위한 세상에 하나뿐인 축복 카드를 만들고, 
        입체 피규어로 형상화하여 마음을 전해보세요. 
        당신의 진심이 아름다운 디지털 예술로 탄생합니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-50">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-magic text-xl"></i>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">디지털 카드 생성</h3>
          <p className="text-sm text-gray-500">메시지와 주제만 입력하면 AI가 아름다운 이미지와 문구를 만듭니다.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-50">
          <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-puzzle-piece text-xl"></i>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">피규어 제작</h3>
          <p className="text-sm text-gray-500">생성된 축복의 의미를 담은 독특한 3D 피규어 이미지를 간직하세요.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-50">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-shipping-fast text-xl"></i>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">마음 전달하기</h3>
          <p className="text-sm text-gray-500">정성스레 만든 축복을 우편함에 보관하고 언제든 꺼내보세요.</p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full shadow-lg shadow-amber-200 transition-all transform hover:scale-105 active:scale-95"
      >
        첫 번째 축복 만들기
      </button>

      <div className="mt-20 opacity-30 grayscale pointer-events-none">
        <img src="https://picsum.photos/seed/postoffice/800/200" alt="decoration" className="rounded-lg shadow-xl" />
      </div>
    </div>
  );
};

export default Home;
