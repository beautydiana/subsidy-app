'use client';
import { useState } from 'react';
import QuestionnairePage from '../components/ui/QuestionnairePage';
import SubsidySwiper from '../components/ui/SubsidySwiper';
import { subsidies } from '../data/subsidies';

export default function Home() {
  const [userProfile, setUserProfile] = useState(null);
  const [filteredSubsidies, setFilteredSubsidies] = useState(null);
  const [showSwiper, setShowSwiper] = useState(false);
  
  const handleQuestionnaireComplete = (profile) => {
    setUserProfile(profile);
    // プロファイルに基づいて補助金をフィルタリング
    const filtered = filterSubsidiesByProfile(profile, subsidies);
    setFilteredSubsidies(filtered);
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

// 補助金フィルタリング関数
function filterSubsidiesByProfile(profile, allSubsidies) {
  // プロファイルデータに基づいてフィルタリングロジックを実装
  return allSubsidies.filter(subsidy => {
    // 例: 業種マッチング
    if (subsidy.requiredIndustry && subsidy.requiredIndustry !== profile.industry) {
      return false;
    }
    // 例: 企業規模マッチング (従業員数)
    if (subsidy.maxEmployees && profile.employees > subsidy.maxEmployees) {
      return false;
    }
    // 例: 年間売上のマッチング
    if (subsidy.maxAnnualRevenue && profile.annualRevenue > subsidy.maxAnnualRevenue) {
      return false;
    }
    // 例: 創業年数のマッチング
    if (subsidy.minBusinessAge && profile.businessAge < subsidy.minBusinessAge) {
      return false;
    }
    // 例: 地域限定の補助金
    if (subsidy.limitedPrefectures && 
        subsidy.limitedPrefectures.length > 0 && 
        !subsidy.limitedPrefectures.includes(profile.prefecture)) {
      return false;
    }
    
    // 上記の条件をすべて満たす場合、この補助金は該当する
    return true;
  });
}