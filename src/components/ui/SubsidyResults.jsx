'use client';
import Link from 'next/link';

export default function SubsidyResults({ likedSubsidies, userProfile }) {
  const needsSupport = likedSubsidies.filter(s => s.applicationSupport === true);
  const selfApply = likedSubsidies.filter(s => s.applicationSupport !== true);
  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">あなたにおすすめの補助金</h1>
      
      {likedSubsidies.length === 0 ? (
        <p>興味のある補助金が見つかりませんでした。</p>
      ) : (
        <>
          {selfApply.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">自分で申請できる補助金</h2>
              <div className="space-y-4">
                {selfApply.map(subsidy => (
                  <div key={subsidy.id} className="border p-4 rounded-lg">
                    <h3 className="font-medium">{subsidy.title}</h3>
                    <p className="text-sm text-gray-600">{subsidy.description}</p>
                    <p className="text-sm">支給額: {subsidy.amount}</p>
                    <a 
                      href={subsidy.applicationUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm block mt-2"
                    >
                      申請サイトへ
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {needsSupport.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">申請をサポートできる補助金</h2>
              <p className="text-sm text-gray-600 mb-4">
                以下の補助金は申請が複雑なため、専門家によるサポートをご用意しています。
                成功報酬型なので、採択されなければ費用は発生しません。
              </p>
              <div className="space-y-4">
                {needsSupport.map(subsidy => (
                  <div key={subsidy.id} className="border p-4 rounded-lg">
                    <h3 className="font-medium">{subsidy.title}</h3>
                    <p className="text-sm text-gray-600">{subsidy.description}</p>
                    <p className="text-sm">支給額: {subsidy.amount}</p>
                    <button 
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md text-sm"
                      onClick={() => alert(`「${subsidy.title}」の申請サポートを依頼しました`)}
                    >
                      申請サポートを依頼する
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="mt-8">
        <button 
          className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          onClick={() => window.location.reload()}
        >
          もう一度最初から
        </button>
      </div>
    </div>
  );
}