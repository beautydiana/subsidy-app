'use client';
import { useState } from 'react';

export default function QuestionnairePage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [questionsType, setQuestionsType] = useState(''); // 'business' or 'personal'
  const [answers, setAnswers] = useState({
    type: '',
    industry: '',
    employees: '',
    annualRevenue: '',
    businessAge: '',
    prefecture: '',
    age: '',
    housing: '',
    children: '',
    pregnancy: ''
  });
  
  const [feedback, setFeedback] = useState('');

  // 最初の質問：仕事用かプライベート用か
  const initialQuestion = {
    id: 'type',
    question: 'どちらの補助金を探していますか？',
    options: ['仕事・事業用の補助金', 'プライベート・生活用の補助金'],
    type: 'select'
  };

  // 仕事用の質問セット
  const businessQuestions = [
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
      type: 'select',
      feedback: {
        '1人（個人事業主）': 'お一人で頑張っていますね！個人事業主向けの補助金は意外と多いですよ。',
        '101人以上': 'なかなかの大所帯ですね！規模に合った補助金を探しましょう。'
      }
    },
    // 質問3: 年間売上
    {
      id: 'annualRevenue',
      question: '年間売上を教えてください',
      options: ['300万円未満', '300万円〜1,000万円', '1,000万円〜3,000万円', '3,000万円〜1億円', '1億円〜3億円', '3億円以上'],
      type: 'select',
      feedback: {
        '3億円以上': '素晴らしい売上ですね！それでも補助金はもらえますよ。'
      }
    },
    // 質問4: 事業年数
    {
      id: 'businessAge',
      question: '創業してからの年数を教えてください',
      options: ['1年未満', '1〜3年', '3〜5年', '5〜10年', '10年以上'],
      type: 'select',
      feedback: {
        '1年未満': '創業間もないんですね！スタートアップ向けの補助金を探しましょう。',
        '10年以上': '長く続けていらっしゃるんですね。素晴らしい！'
      }
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
      type: 'select',
      feedback: {
        '東京都': '東京は地方自治体の補助金も充実していますよ！',
        '沖縄県': '沖縄県は地域振興の補助金が豊富ですよ！'
      }
    }
  ];

  // プライベート用の質問セット
  const personalQuestions = [
    // 質問1: 年齢
    {
      id: 'age',
      question: 'あなたの年齢を教えてください',
      options: ['20代', '30代', '40代', '50代', '60代以上'],
      type: 'select',
      feedback: {
        '20代': '若いですね！これからが楽しみです。',
        '30代': 'ライフプランを考え始める時期ですね。',
        '40代': '人生の充実期ですね！',
        '50代': '次のステージに向けた準備の時期かもしれませんね。',
        '60代以上': '人生の経験を活かすチャンスがたくさんありますよ！'
      }
    },
    // 質問2: 住居
    {
      id: 'housing',
      question: '住居の状況を教えてください',
      options: ['持ち家（一戸建て）', '持ち家（マンション）', '賃貸', '実家・その他'],
      type: 'select',
      feedback: {
        '持ち家（一戸建て）': 'リフォーム補助金などが活用できるかもしれませんね！',
        '賃貸': '住宅購入支援や家賃補助の制度もありますよ。'
      }
    },
    // 質問3: 子どもの有無
    {
      id: 'children',
      question: 'お子さんはいらっしゃいますか？',
      options: ['いる', 'いない', '妊娠中／予定あり'],
      type: 'select',
      feedback: {
        'いる': '子育て支援の補助金を探しましょう！',
        '妊娠中／予定あり': 'おめでとうございます！出産・育児関連の補助金が活用できますよ。'
      }
    },
    // 質問4: 子どもの年齢（子どもがいる場合）
    {
      id: 'childrenAge',
      question: 'お子さんの年齢を教えてください（複数いる場合は一番小さいお子さん）',
      options: ['0〜3歳', '4〜6歳', '小学生', '中学生', '高校生以上'],
      type: 'select',
      condition: answers => answers.children === 'いる',
      feedback: {
        '0〜3歳': '小さいお子さんの子育て、大変ですね。保育関連の補助金も充実しています！',
        '小学生': '教育関連の補助金も探してみましょう！'
      }
    },
    // 質問5: 所在地
    {
      id: 'prefecture',
      question: 'お住まいの都道府県を教えてください',
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
    const newAnswers = {
      ...answers,
      [id]: value
    };
    setAnswers(newAnswers);
    
    // フィードバックの表示
    const currentQuestions = questionsType === 'business' ? businessQuestions : 
                           questionsType === 'personal' ? personalQuestions : 
                           [initialQuestion];
    
    const currentQuestion = currentQuestions.find(q => q.id === id);
    if (currentQuestion && currentQuestion.feedback && currentQuestion.feedback[value]) {
      setFeedback(currentQuestion.feedback[value]);
    } else {
      setFeedback('');
    }
    
    // タイプの選択時に質問タイプを設定
    if (id === 'type') {
      setQuestionsType(value === '仕事・事業用の補助金' ? 'business' : 'personal');
    }
  };

  const handleNext = () => {
    if (step === 0 && !questionsType) {
      // 最初のステップで、仕事用かプライベート用かを決定
      const selectedType = answers.type === '仕事・事業用の補助金' ? 'business' : 'personal';
      setQuestionsType(selectedType);
      setStep(1);
    } else {
      const currentQuestions = questionsType === 'business' ? businessQuestions : personalQuestions;
      
      // 条件付き質問をスキップするためのロジック
      let nextStep = step + 1;
      while (
        nextStep < currentQuestions.length && 
        currentQuestions[nextStep].condition && 
        !currentQuestions[nextStep].condition(answers)
      ) {
        nextStep++;
      }
      
      if (nextStep < currentQuestions.length) {
        setStep(nextStep);
        setFeedback(''); // 次の質問に進む時はフィードバックをクリア
      } else {
        // 質問完了、プロファイル作成
        const profile = processAnswersToProfile(answers, questionsType);
        onComplete(profile);
      }
    }
  };

  // 現在の質問を取得
  const getCurrentQuestion = () => {
    if (step === 0 && !questionsType) {
      return initialQuestion;
    }
    
    const questions = questionsType === 'business' ? businessQuestions : personalQuestions;
    return questions[step - 1] || questions[0];
  };

  const currentQuestion = getCurrentQuestion();
  const questions = questionsType === 'business' ? businessQuestions : 
                   questionsType === 'personal' ? personalQuestions : 
                   [initialQuestion];

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          質問 {step + 1}/{questionsType ? questions.length + 1 : 1}
        </p>
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
      
      {/* フィードバック吹き出し */}
      {feedback && (
        <div className="mb-4 relative bg-yellow-100 p-3 rounded-lg">
          <div className="absolute -top-2 left-5 w-4 h-4 bg-yellow-100 transform rotate-45"></div>
          <p className="text-sm text-gray-800">{feedback}</p>
        </div>
      )}

      <div className="flex justify-between">
        {step > 0 && (
          <button
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md"
            onClick={() => {
              setStep(step - 1);
              setFeedback('');
            }}
          >
            戻る
          </button>
        )}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-auto"
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
        >
          {(questionsType === 'business' && step >= businessQuestions.length) || 
           (questionsType === 'personal' && step >= personalQuestions.length) ? 
            '結果を見る' : '次へ'}
        </button>
      </div>
    </div>
  );
}

// 回答をプロファイルに変換する関数
function processAnswersToProfile(answers, type) {
  if (type === 'business') {
    // ビジネスプロファイルの作成
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
      type: 'business',
      industry: answers.industry,
      employees: employeesMap[answers.employees] || 0,
      annualRevenue: revenueMap[answers.annualRevenue] || 0,
      businessAge: ageMap[answers.businessAge] || 0,
      prefecture: answers.prefecture
    };
  } else {
    // パーソナルプロファイルの作成
    return {
      type: 'personal',
      age: answers.age,
      housing: answers.housing,
      children: answers.children,
      childrenAge: answers.childrenAge,
      prefecture: answers.prefecture
    };
  }
}