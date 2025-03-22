import { HomePageData } from '@/types/api';

export interface RankingItem {
  id: string;
  title: string;
  votes: number;
  hasVoted: boolean;
  description: string;
}

export const dummyData: HomePageData = {
  news: [
    {
      id: '1',
      title: '新商品「ぽんまつスペシャル」発売のお知らせ',
      content: '待望の新商品「ぽんまつスペシャル」が発売されました。特別な製法で作られた本商品は、従来の商品とは一味違う美味しさを実現しています。',
      date: '2024-03-20',
    },
    {
      id: '2',
      title: '春のキャンペーン開催決定！',
      content: '3月21日から4月21日までの1ヶ月間、春の特別キャンペーンを開催します。期間中は特別価格でお求めいただけます。',
      date: '2024-03-19',
    },
    {
      id: '3',
      title: 'ぽんまつカフェ 新宿店オープン',
      content: '4月1日、新宿に待望のぽんまつカフェがオープンします。オープン記念として先着100名様にオリジナルグッズをプレゼント！',
      date: '2024-03-18',
    },
    {
      id: '4',
      title: '新レシピコンテスト開催のお知らせ',
      content: 'ご自慢のレシピを募集します。グランプリ受賞者には豪華賞品をご用意しています。',
      date: '2024-03-17',
    },
    {
      id: '5',
      title: 'テレビ出演情報',
      content: '3月25日放送の「クッキング！」にて当店の商品が紹介されます。ぜひご覧ください。',
      date: '2024-03-16',
    },
    {
      id: '6',
      title: '新メニュー開発プロジェクト始動',
      content: 'お客様のご要望にお応えし、新メニューの開発プロジェクトを開始しました。',
      date: '2024-03-15',
    },
    {
      id: '7',
      title: 'SNSフォロワー10万人達成！',
      content: 'おかげさまでSNSのフォロワーが10万人を突破しました。記念キャンペーンを実施します。',
      date: '2024-03-14',
    },
    {
      id: '8',
      title: '夏季限定メニュー先行告知',
      content: '今年の夏季限定メニューの詳細が決定しました。乞うご期待！',
      date: '2024-03-13',
    },
    {
      id: '9',
      title: 'オンラインショップリニューアル',
      content: 'お客様により便利にお買い物いただけるよう、オンラインショップをリニューアルしました。',
      date: '2024-03-12',
    },
    {
      id: '10',
      title: '新商品アイデア募集開始',
      content: '次の新商品のアイデアを募集します。採用された方には素敵な商品をプレゼント！',
      date: '2024-03-11',
    },
    {
      id: '11',
      title: '創業10周年記念イベント開催',
      content: '創業10周年を記念して、特別イベントを開催します。多数のご来場をお待ちしております。',
      date: '2024-03-10',
    },
    {
      id: '12',
      title: '新パッケージデザイン採用',
      content: '環境に配慮した新パッケージデザインを採用しました。順次切り替えを行っています。',
      date: '2024-03-09',
    },
    {
      id: '13',
      title: 'ぽんまつ公式アプリリリース',
      content: 'お得な情報をいち早くお届けする公式アプリをリリースしました。',
      date: '2024-03-08',
    },
    {
      id: '14',
      title: '新商品モニター募集',
      content: '開発中の新商品のモニターを募集します。詳細は記事をご覧ください。',
      date: '2024-03-07',
    },
    {
      id: '15',
      title: '海外展開計画発表',
      content: '2024年秋より、アジア地域への展開を開始します。第一弾は台湾での出店を予定しています。',
      date: '2024-03-06',
    },
    {
      id: '16',
      title: '新商品「ぽんまつライト」発売',
      content: 'カロリーを抑えた新商品「ぽんまつライト」が発売開始となりました。',
      date: '2024-03-05',
    },
    {
      id: '17',
      title: '新規スタッフ募集開始',
      content: '事業拡大に伴い、新規スタッフを募集します。詳細は採用ページをご確認ください。',
      date: '2024-03-04',
    },
    {
      id: '18',
      title: 'ぽんまつ食堂 営業時間変更',
      content: '4月より営業時間を延長します。より多くのお客様にご利用いただけるようになりました。',
      date: '2024-03-03',
    },
    {
      id: '19',
      title: '新商品開発秘話公開',
      content: '人気商品が生まれるまでの開発秘話を特別公開します。',
      date: '2024-03-02',
    },
    {
      id: '20',
      title: 'お客様感謝デー開催',
      content: '毎月20日はお客様感謝デー。全商品10%オフでご提供します。',
      date: '2024-03-01',
    }
  ],
  rankings: [
    {
      id: '1',
      title: 'ぽんまつの料理配信',
      votes: 42,
      hasVoted: false,
      description: 'ぽんまつさんが得意な料理を紹介する配信。和食から洋食まで、視聴者と一緒に楽しく料理を作る企画です。食材の選び方から盛り付けまで、細かいポイントも解説します。'
    },
    {
      id: '2',
      title: 'ゲーム実況配信',
      votes: 38,
      hasVoted: false,
      description: '新作から懐かしのレトロゲームまで、ぽんまつさんが実況プレイ。視聴者参加型の企画も織り交ぜながら、ゲームの面白さを共有していきます。'
    },
    {
      id: '3',
      title: '特製ぽんまつ定食',
      votes: 1250,
      hasVoted: false,
    },
    {
      id: '4',
      title: 'ぽんまつカレー',
      votes: 1180,
      hasVoted: true,
    },
    {
      id: '5',
      title: 'ぽんまつパスタ',
      votes: 1120,
      hasVoted: false,
    },
    {
      id: '6',
      title: '季節の天ぷら定食',
      votes: 980,
      hasVoted: false,
    },
    {
      id: '7',
      title: 'ぽんまつうどん',
      votes: 920,
      hasVoted: false,
    },
    {
      id: '8',
      title: '特製サラダ',
      votes: 850,
      hasVoted: false,
    },
    {
      id: '9',
      title: 'ぽんまつ丼',
      votes: 820,
      hasVoted: false,
    },
    {
      id: '10',
      title: '野菜たっぷりスープ',
      votes: 780,
      hasVoted: false,
    },
    {
      id: '11',
      title: 'ぽんまつピザ',
      votes: 750,
      hasVoted: false,
    },
    {
      id: '12',
      title: '特製デザート',
      votes: 720,
      hasVoted: false,
    },
    {
      id: '13',
      title: 'ぽんまつサンドイッチ',
      votes: 680,
      hasVoted: false,
    },
    {
      id: '14',
      title: '季節の炊き込みご飯',
      votes: 650,
      hasVoted: false,
    },
    {
      id: '15',
      title: 'ぽんまつオムライス',
      votes: 620,
      hasVoted: false,
    },
    {
      id: '16',
      title: '特製グラタン',
      votes: 580,
      hasVoted: false,
    },
    {
      id: '17',
      title: 'ぽんまつラーメン',
      votes: 550,
      hasVoted: false,
    },
    {
      id: '18',
      title: '季節の煮物',
      votes: 520,
      hasVoted: false,
    },
    {
      id: '19',
      title: 'ぽんまつ焼き魚定食',
      votes: 480,
      hasVoted: false,
    },
    {
      id: '20',
      title: '特製スイーツ',
      votes: 450,
      hasVoted: false,
    },
    {
      id: '21',
      title: 'ぽんまつ餃子',
      votes: 420,
      hasVoted: false,
    },
    {
      id: '22',
      title: '季節の和菓子',
      votes: 400,
      hasVoted: false,
    }
  ],
  recipes: [
    {
      id: '1',
      title: 'ぽんまつ特製カレー',
      description: '秘伝のスパイスを使用した特製カレー。野菜の旨味がたっぷり詰まった一品です。',
      imageUrl: 'https://placehold.co/600x400',
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-01'),
    },
    {
      id: '2',
      title: 'ぽんまつパスタ',
      description: '和風だしと洋風ソースを絶妙にブレンドした創作パスタ。新しい味わいをお楽しみください。',
      imageUrl: 'https://placehold.co/600x400',
      createdAt: new Date('2024-03-02'),
      updatedAt: new Date('2024-03-02'),
    },
    {
      id: '3',
      title: '季節の天ぷら定食',
      description: '旬の食材を使用した天ぷら定食。サクサクの衣と素材の味わいをお楽しみください。',
      imageUrl: 'https://placehold.co/600x400',
      createdAt: new Date('2024-03-03'),
      updatedAt: new Date('2024-03-03'),
    },
  ]
}; 