export const subsidies = [
    {
      id: 1,
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
    {
      id: 4,
      title: "創業助成金",
      description: "都内で創業する中小企業者を支援",
      amount: "最大300万円",
      deadline: "2025-05-31",
      difficulty: "medium",
      requiredIndustry: null, // 全業種対応
      maxEmployees: 10,
      maxAnnualRevenue: 30000000, // 3000万円以下
      minBusinessAge: 0, // 創業予定〜創業間もない
      limitedPrefectures: ["東京都"], // 東京都限定
      applicationSupport: true,
      applicationUrl: "https://example.com/subsidy/4",
      tags: ["創業", "スタートアップ"]
    },
    {
      id: 5,
      title: "事業再構築補助金",
      description: "ポストコロナ・ウィズコロナ時代の経済社会の変化に対応するための企業の思い切った事業再構築を支援",
      amount: "最大1億円",
      deadline: "2025-08-31",
      difficulty: "hard",
      requiredIndustry: null, // 全業種対応
      maxEmployees: 200,
      maxAnnualRevenue: 500000000, // 5億円以下
      minBusinessAge: 3, // 創業3年以上
      limitedPrefectures: [], // 全国対象
      applicationSupport: true,
      applicationUrl: "https://example.com/subsidy/5",
      tags: ["事業再構築", "業態転換", "新分野展開"]
    },
    {
      id: 6,
      title: "省エネ設備投資補助金",
      description: "省エネルギー設備への更新を支援",
      amount: "最大5,000万円",
      deadline: "2025-09-30",
      difficulty: "medium",
      requiredIndustry: "製造業",
      maxEmployees: 300,
      maxAnnualRevenue: 300000000, // 3億円以下
      minBusinessAge: 5, // 創業5年以上
      limitedPrefectures: [], // 全国対象
      applicationSupport: true,
      applicationUrl: "https://example.com/subsidy/6",
      tags: ["省エネ", "設備投資", "環境対策"]
    }
  ];