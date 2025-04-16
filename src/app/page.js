'use client';
import { subsidies } from '../data/subsidies';
import { useState } from 'react';
import QuestionnairePage from '../components/ui/QuestionnairePage';
import SubsidySwiper from '../components/ui/SubsidySwiper';

export default function Home() {
  const [userProfile, setUserProfile] = useState(null);
  const [filteredSubsidies, setFilteredSubsidies] = useState(null);
  const [showSwiper, setShowSwiper] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  
  const handleQuestionnaireComplete = (profileType, answers) => {
    // ユーザープロファイルを設定
    setUserProfile({
      type: profileType,
      ...answers
    });
    
    // テスト段階ではフィルタリングを完全に無効化
    // すべての補助金を表示するため
    setFilteredSubsidies(subsidies);
    
    console.log("補助金データ:", subsidies); // デバッグ用
    console.log("フィルタリング後:", subsidies); // デバッグ用
    
    // 質問フォームの完了状態を更新
    setQuestionnaireCompleted(true);
    // スワイパーを表示
    setShowSwiper(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center w-full mb-8">オレでももらえた補助金</h1>
        <p className="text-center w-full mb-12">あなたにぴったりの補助金を見つけよう</p>
      </div>

      {!showSwiper ? (
        <QuestionnairePage onComplete={handleQuestionnaireComplete} />
      ) : (
        <SubsidySwiper filteredSubsidies={filteredSubsidies} userProfile={userProfile} />
      )}

      <footer className="mt-10 text-center text-gray-500">
        <p>© 2025 補助金マッチングサービス</p>
      </footer>
    </main>
  );
}