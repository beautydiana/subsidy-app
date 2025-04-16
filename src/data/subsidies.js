export const subsidies = [
    // ビジネス向け補助金
    {
      id: 1,
      type: 'business',
      title: "小規模事業者持続化補助金",
      description: "小規模事業者の販路開拓等の取組を支援",
      amount: "最大50万円",
      deadline: "2025-06-30",
      difficulty: "easy",
      requiredIndustry: null, // 全業種対応
      maxEmployees: 20, // 従業員20人以下（商業・サービス業は5人以下）
      maxAnnualRevenue: null, // 年間売上制限なし
      minBusinessAge: 1, // 創業1年以上
      limitedPrefectures: [], // 全国対象
      applicationSupport: false, // 申請サポートが必要か
      applicationUrl: "https://example.com/subsidy/1",
      tags: ["販路開拓", "設備投資"]
    },
    {
      id: 2,
      type: 'business',
      title: "ものづくり補助金",
      description: "中小企業・小規模事業者の設備投資等を支援",
      amount: "最大1,000万円",
      deadline: "2025-05-15",
      difficulty: "medium",
      requiredIndustry: "製造業",
      maxEmployees: 100,
      maxAnnualRevenue: 300000000, // 3億円以下
      minBusinessAge: 3, // 創業3年以上
      limitedPrefectures: [], // 全国対象
      applicationSupport: true, // 申請サポートが必要
      applicationUrl: "https://example.com/subsidy/2",
      tags: ["設備投資", "IoT", "生産性向上"]
    },
    {
      id: 3,
      type: 'business',
      title: "IT導入補助金",
      description: "ITツール導入による業務効率化を支援",
      amount: "最大450万円",
      deadline: "2025-07-31",
      difficulty: "easy",
      requiredIndustry: null, // 全業種対応
      maxEmployees: 50,
      maxAnnualRevenue: 100000000, // 1億円以下
      minBusinessAge: 1, // 創業1年以上
      limitedPrefectures: [], // 全国対象
      applicationSupport: false,
      applicationUrl: "https://example.com/subsidy/3",
      tags: ["IT導入", "業務効率化", "DX"]
    },
    
    // プライベート向け補助金
    {
      id: 101,
      type: 'personal',
      title: "子育て世帯応援給付金",
      description: "子育て世帯の生活を支援するための給付金",
      amount: "子ども1人あたり10万円",
      deadline: "2025-09-30",
      difficulty: "easy",
      requiredChildren: true, // 子どもがいる必要あり
      childrenAgeLimit: "中学生以下", // 対象の子どもの年齢
      limitedPrefectures: [], // 全国対象
      applicationSupport: false,
      applicationUrl: "https://example.com/subsidy/101",
      tags: ["子育て", "給付金"]
    },
    {
      id: 102,
      type: 'personal',
      title: "住宅リフォーム補助金",
      description: "省エネ・バリアフリーリフォームを対象とした補助金",
      amount: "工事費の10%（最大30万円）",
      deadline: "2025-08-15",
      difficulty: "medium",
      requiredHousing: ["持ち家（一戸建て）", "持ち家（マンション）"], // 持ち家が必要
      limitedPrefectures: [], // 全国対象
      applicationSupport: false,
      applicationUrl: "https://example.com/subsidy/102",
      tags: ["住宅", "リフォーム", "省エネ"]
    },
    {
      id: 103,
      type: 'personal',
      title: "結婚新生活支援事業",
      description: "新婚世帯の住居費・引越費用を支援",
      amount: "最大60万円",
      deadline: "2025-07-31",
      difficulty: "easy",
      ageRequirement: "40代未満", // 年齢制限
      limitedPrefectures: [], // 全国対象だが自治体により異なる
      applicationSupport: false,
      applicationUrl: "https://example.com/subsidy/103",
      tags: ["結婚", "新生活", "住居費"]
    },
    {
      id: 104,
      type: 'personal',
      title: "出産育児一時金",
      description: "出産にかかる費用を支援する給付金",
      amount: "子ども1人あたり50万円",
      deadline: "出産後1年以内",
      difficulty: "easy",
      pregnancyRequired: true, // 妊娠中または出産予定
      limitedPrefectures: [], // 全国対象
      applicationSupport: false,
      applicationUrl: "https://example.com/subsidy/104",
      tags: ["出産", "育児", "給付金"]
    },
    {
      id: 105,
      type: 'personal',
      title: "若者マイホーム購入支援事業",
      description: "35歳未満の若者の住宅取得を支援",
      amount: "最大100万円",
      deadline: "2025-12-31",
      difficulty: "medium",
      ageRequirement: "35歳未満", // 年齢制限
      housing: ["賃貸", "実家・その他"], // 現在持ち家でない人向け
      limitedPrefectures: ["東京都", "神奈川県", "千葉県", "埼玉県"], // 首都圏限定
      applicationSupport: true,
      applicationUrl: "https://example.com/subsidy/105",
      tags: ["住宅購入", "若者支援"]
    }
  ];