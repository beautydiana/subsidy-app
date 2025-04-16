'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from '../SwipeCard'; // 正しいパスに修正
import SubsidyResults from './SubsidyResults';

const SubsidySwiper = ({ filteredSubsidies, userProfile }) => {
  const [likedSubsidies, setLikedSubsidies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipingCompleted, setSwipingCompleted] = useState(false);
  const [direction, setDirection] = useState(null);

  // デバッグ用
  console.log("SubsidySwiper received:", filteredSubsidies);

  // フィルタリングされた補助金がない場合または undefined/null の場合
  if (!filteredSubsidies || filteredSubsidies.length === 0) {
    // テスト段階のためにダミーデータを使用
    const dummySubsidies = [
      {
        id: 'dummy1',
        title: 'テスト補助金1',
        description: 'これはテスト用の補助金データです。新規創業や事業拡大を検討している中小企業向けの支援金です。',
        amount: '最大100万円',
        eligibility: 'すべての人',
        deadline: '2025年12月31日',
        type: 'business'
      },
      {
        id: 'dummy2',
        title: 'テスト補助金2',
        description: '別のテスト用補助金データです。テレワークの導入やデジタル化を促進する企業に対する補助金制度になります。',
        amount: '最大50万円',
        eligibility: '個人事業主',
        deadline: '2025年10月15日',
        type: 'business'
      },
      {
        id: 'dummy3',
        title: 'テスト補助金3',
        description: '3つ目のテスト用補助金データです。環境に配慮した設備投資や省エネ対策に取り組む企業向けの支援制度です。',
        amount: '最大30万円',
        eligibility: '中小企業',
        deadline: '2025年9月30日',
        type: 'business'
      },
      {
        id: 'dummy4',
        title: 'テスト補助金4',
        description: '4つ目のテスト用補助金データです。海外展開や輸出促進を目指す企業に対する支援金制度です。',
        amount: '最大200万円',
        eligibility: '中小企業',
        deadline: '2025年11月30日',
        type: 'business'
      },
      {
        id: 'dummy5',
        title: 'テスト補助金5',
        description: '5つ目のテスト用補助金データです。地域活性化や地方創生に貢献する事業に対する補助金制度です。',
        amount: '最大80万円',
        eligibility: '法人・個人事業主',
        deadline: '2025年8月31日',
        type: 'business'
      }
    ];

    // テスト段階ではダミーデータを使用
    const activeSubsidies = dummySubsidies;
    
    const handleSwipe = (dir, subsidy) => {
      setDirection(dir);
      
      if (dir === 'right') {
        setLikedSubsidies(prev => [...prev, subsidy]);
      }
      
      setTimeout(() => {
        setCurrentIndex(prev => {
          const newIndex = prev + 1;
          if (newIndex >= activeSubsidies.length) {
            setSwipingCompleted(true);
          }
          return newIndex;
        });
        setDirection(null);
      }, 300);
    };
    
    return (
      <div className="subsidy-swiper-container w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">テストモード: ダミー補助金</h2>
        
        {!swipingCompleted ? (
          <>
            <div className="relative h-[550px] w-full">
              <AnimatePresence>
                {currentIndex < activeSubsidies.length && (
                  <SwipeCard 
                    key={activeSubsidies[currentIndex].id}
                    subsidy={activeSubsidies[currentIndex]} 
                    onSwipe={handleSwipe}
                  />
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex justify-between mt-6 px-4">
              <button 
                className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:bg-red-600 transition-colors"
                onClick={() => handleSwipe('left', activeSubsidies[currentIndex])}
              >
                ✕
              </button>
              <button 
                className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:bg-green-600 transition-colors"
                onClick={() => handleSwipe('right', activeSubsidies[currentIndex])}
              >
                ♥
              </button>
            </div>
            
            <div className="mt-4 text-center text-gray-500">
              {currentIndex + 1} / {activeSubsidies.length}
            </div>
          </>
        ) : (
          <SubsidyResults likedSubsidies={likedSubsidies} />
        )}
      </div>
    );
  }

  // 通常の処理（実際のデータがある場合）
  const handleSwipe = (dir, subsidy) => {
    setDirection(dir);
    
    if (dir === 'right') {
      setLikedSubsidies(prev => [...prev, subsidy]);
    }
    
    setTimeout(() => {
      setCurrentIndex(prev => {
        const newIndex = prev + 1;
        if (newIndex >= filteredSubsidies.length) {
          setSwipingCompleted(true);
        }
        return newIndex;
      });
      setDirection(null);
    }, 300);
  };

  return (
    <div className="subsidy-swiper-container w-full max-w-md mx-auto">
      {!swipingCompleted ? (
        <>
          <div className="relative h-[550px] w-full">
            <AnimatePresence>
              {currentIndex < filteredSubsidies.length && (
                <SwipeCard 
                  key={filteredSubsidies[currentIndex].id}
                  subsidy={filteredSubsidies[currentIndex]} 
                  onSwipe={handleSwipe}
                />
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex justify-between mt-6 px-4">
            <button 
              className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:bg-red-600 transition-colors"
              onClick={() => handleSwipe('left', filteredSubsidies[currentIndex])}
            >
              ✕
            </button>
            <button 
              className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:bg-green-600 transition-colors"
              onClick={() => handleSwipe('right', filteredSubsidies[currentIndex])}
            >
              ♥
            </button>
          </div>
          
          <div className="mt-4 text-center text-gray-500">
            {currentIndex + 1} / {filteredSubsidies.length}
          </div>
        </>
      ) : (
        <SubsidyResults likedSubsidies={likedSubsidies} />
      )}
    </div>
  );
};

export default SubsidySwiper;