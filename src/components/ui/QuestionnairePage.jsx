'use client';
import { useState } from 'react';

export default function QuestionnairePage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    industry: '',
    employees: '',
    annualRevenue: '',
    businessAge: '',
    prefecture: '',
  });

  const questions = [
    // 質問1: 業種
    {
      id: 'industry',
      question: 'あなたの事業の業種を教えてください',
      options: ['製造業', 'IT・情報通信', '小売業', '飲食業', 'サービス業', '建設業', '農林水産業', 'その他'],
      type: 'select'
    },
    // 質問2: 従業員数
    {
      id: 'employees',
      question: '従業員数を教えてください',
      options: ['1人（個人事業主）', '2〜5人', '6〜20人', '21〜50人', '51〜100人', '101人以上'],
      type: 'select'
    },
    // 質問3: 年間売上
    {
      id: 'annualRevenue',
      question: '年間売上を教えてください',
      options: ['300万円未満', '300万円〜1,000万円', '1,000万円〜3,000万円', '3,000万円〜1億円', '1億円〜3億円', '3億円以上'],
      type: 'select'
    },
    // 質問4: 事業年数
    {
      id: 'businessAge',
      question: '創業してからの年数を教えてください',
      options: ['1年未満', '1〜3年', '3〜5年', '5〜10年', '10年以上'],
      type: 'select'
    },
    // 質問5: 所在地
    {
      id: 'prefecture',
      question: '事業所の所在地を教えてください',
      options: [
        '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
        '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
        '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
        '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
        '鳥取県', '島根県', '岡山県', '広島県', '山口県',
        '徳島県', '香川県', '愛媛県', '高知県',
        '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
      ],
      type: 'select'
    }
  ];

  const handleAnswerChange = (id, value) => {
    setAnswers({
      ...answers,
      [id]: value
    });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // 質問完了、プロファイル作成
      const profile = processAnswersToProfile(answers);
      onComplete(profile);
    }
  };

  const currentQuestion = questions[step];

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <p className="text-sm text-gray-500">質問 {step + 1}/{questions.length}</p>
        <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
      </div>

      <div className="mb-6">
        {currentQuestion.type === 'select' && (
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-3 text-left rounded-md border ${
                  answers[currentQuestion.id] === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
                }`}
                onClick={() => handleAnswerChange(currentQuestion.id, option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {step > 0 && (
          <button
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md"
            onClick={() => setStep(step - 1)}
          >
            戻る
          </button>
        )}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-auto"
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
        >
          {step < questions.length - 1 ? '次へ' : '結果を見る'}
        </button>
      </div>
    </div>
  );
}

// 回答をプロファイルに変換する関数
function processAnswersToProfile(answers) {
  // 回答データを整形してプロファイルを作成
  const employeesMap = {
    '1人（個人事業主）': 1,
    '2〜5人': 5,
    '6〜20人': 20,
    '21〜50人': 50,
    '51〜100人': 100,
    '101人以上': 200
  };

  const revenueMap = {
    '300万円未満': 3000000,
    '300万円〜1,000万円': 10000000,
    '1,000万円〜3,000万円': 30000000,
    '3,000万円〜1億円': 100000000,
    '1億円〜3億円': 300000000,
    '3億円以上': 500000000
  };

  const ageMap = {
    '1年未満': 0,
    '1〜3年': 2,
    '3〜5年': 4,
    '5〜10年': 7,
    '10年以上': 15
  };

  return {
    industry: answers.industry,
    employees: employeesMap[answers.employees] || 0,
    annualRevenue: revenueMap[answers.annualRevenue] || 0,
    businessAge: ageMap[answers.businessAge] || 0,
    prefecture: answers.prefecture
  };
}