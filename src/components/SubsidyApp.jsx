"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SubsidyApp() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const questions = [
    { key: "child", text: "お子さんはいらっしゃいますか？" },
    { key: "income", text: "世帯年収はおおよそいくらですか？", type: "input" },
    { key: "job", text: "今、お仕事はされていますか？" },
    { key: "area", text: "お住まいの地域はどちらですか？", type: "select", options: ["東京都", "大阪府", "愛知県", "福岡県", "その他"] }
  ]

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[step].key]: value })
    setStep(step + 1)
  }

  const renderQuestion = () => {
    const question = questions[step]
    return (
      <div 
        key={step} 
        className="text-center animate-fadeIn"
        style={{
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        <h2 className="text-xl font-bold mb-4">{question.text}</h2>
        
        {question.type === "input" ? (
          <div className="mb-4">
            <Input 
              type="text" 
              placeholder="例: 500万円" 
              className="max-w-xs mx-auto mb-4"
              onKeyDown={(e) => e.key === "Enter" && handleAnswer(e.target.value)}
            />
            <Button onClick={(e) => handleAnswer(e.target.previousSibling.value)}>次へ</Button>
          </div>
        ) : question.type === "select" ? (
          <div className="flex flex-col items-center gap-2 mb-4">
            {question.options.map((option) => (
              <Button 
                key={option} 
                onClick={() => handleAnswer(option)}
                className="w-48"
              >
                {option}
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <Button onClick={() => handleAnswer("はい")} className="w-24">はい</Button>
            <Button onClick={() => handleAnswer("いいえ")} className="w-24">いいえ</Button>
          </div>
        )}
      </div>
    )
  }

  const renderResult = () => {
    // 回答に基づいて表示する補助金を決定
    const subsidies = []
    
    if (answers.child === "はい") {
      subsidies.push({ name: "出産育児一時金", detail: "直接申請なし", amount: "42万円〜" })
      subsidies.push({ name: "児童手当", detail: "中学生まで", amount: "月1万円〜" })
    }
    
    if (answers.income && parseInt(answers.income.replace(/[^0-9]/g, "")) < 600) {
      subsidies.push({ name: "住民税非課税世帯向け給付", detail: "条件あり", amount: "5万円" })
    }
    
    if (answers.job === "いいえ") {
      subsidies.push({ name: "求職者支援制度", detail: "職業訓練中の生活支援", amount: "月10万円前後" })
    }
    
    if (answers.area === "東京都") {
      subsidies.push({ name: "東京都子育て支援手当", detail: "都独自の支援制度", amount: "年3万円" })
    }

    return (
      <div
        className="text-center animate-fadeIn"
        style={{
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">あなたがもらえるかもしれない補助金</h2>
        
        {subsidies.length > 0 ? (
          <div className="max-w-md mx-auto bg-green-50 p-4 rounded-lg">
            <ul className="text-left">
              {subsidies.map((subsidy, index) => (
                <li key={index} className="mb-3 border-b border-green-100 pb-2 last:border-b-0">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <div>
                      <span className="font-bold">{subsidy.name}</span>
                      <div className="text-sm text-gray-600 flex justify-between">
                        <span>{subsidy.detail}</span>
                        <span className="font-semibold">{subsidy.amount}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mb-4 text-gray-600">条件に合う補助金が見つかりませんでした。</p>
        )}
        
        <div className="mt-6">
          <Button className="bg-green-600 hover:bg-green-700">申請方法を確認する</Button>
          <Button 
            variant="outline" 
            className="ml-2 border-green-600 text-green-600"
            onClick={() => {
              setStep(0)
              setAnswers({})
            }}
          >
            もう一度やり直す
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-xl shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
            オレでも<span className="text-green-700">もらえた</span>補助金
          </h1>
          
          {step < questions.length ? (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <span className="text-sm text-gray-500">質問 {step + 1}/{questions.length}</span>
                <span className="text-sm text-gray-500">簡単4ステップ</span>
              </div>
              {renderQuestion()}
            </div>
          ) : (
            renderResult()
          )}
        </CardContent>
      </Card>
      
      {step < questions.length && (
        <button 
          onClick={() => setStep(step + 1)} 
          className="mt-4 text-sm text-gray-500 underline"
        >
          この質問をスキップ
        </button>
      )}
      
      <p className="mt-8 text-xs text-gray-400 text-center max-w-md">
        ※このサイトは補助金の受給を保証するものではありません。詳細は各自治体にお問い合わせください。
      </p>
    </div>
  )
}