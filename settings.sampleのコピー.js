/**
 * ============================================================
 *  見積もりシミュレーター - 設定ファイル
 *
 *  【初回セットアップ】
 *  admin.html を開いて設定し、「ユーザー設定を保存」でJSONファイルを
 *  ダウンロードしてください。次回以降は「ユーザー設定を読込」で
 *  そのJSONファイルを読み込むだけで設定が反映されます。
 *
 *  【テンプレートの切り替え】
 *  admin.html の「テンプレートを読込」から templates/ フォルダ内の
 *  JSONファイルを読み込むと、見積もりの種類を切り替えられます。
 *  ・flex-estimate.json: 汎用版（フリーStep形式）
 *  ・web-estimate.json:  Web制作版（4ステップ固定＋フリーStep）
 * ============================================================
 */

/* ============================================================
   ① 会社・ブランド情報
   （コピーテキスト・PDF見積書のフッターに使用されます）
============================================================ */
const SETTINGS = {
    /* 社名 */
    companyName: '株式会社〇〇',
    /* 担当者名 */
    personName: '山田 太郎',
    /* メールアドレス */
    email: 'info@example.com',
    /* WebサイトURL */
    url: 'https://example.com/',
    /* 担当部署 */
    department: '',
    /* 郵便番号 */
    postalCode: '',
    /* 住所 */
    address: '',
    /* 電話番号 */
    tel: '',
    /* FAX番号 */
    fax: '',
    /* 問い合わせページURL（「この内容で相談する」ボタンの遷移先） */
    contactUrl: 'https://example.com/contact/',

    /* SNS（任意：不要な行は削除、追加も可能）
       { label: '表示名', url: 'https://...' } の形式で配列に追加 */
    sns: [
        { label: 'Twitter',   url: '' },
        { label: 'Instagram', url: '' },
    ],

    /* ロゴ画像（Base64形式）
       ・admin.html のロゴアップロード機能で自動設定されます
       ・未設定（空文字）の場合は、社名テキストを表示します */
    logoBase64: '',

    /* PDF見積書タイトル */
    pdfTitle: '概算お見積書',
    /* PDF注記（見積書下部に表示される注意書き） */
    pdfNote: '・本お見積りはシミュレーターによる概算です。実際の費用は要件確認後に正式なお見積りをご提示いたします。\n・掲載金額はすべて税抜表記です。',

    /* 結果ページ 注意書き（見積もり結果ページ下部に表示） */
    disclaimer: '※ 本ツールの見積もりは概算です。実際の金額はヒアリング内容・要件定義により変動します。正式なお見積もりはお問い合わせください。',

    /* ツールタイトル（ブラウザタブ・ヘッダーに表示） */
    toolTitle: '見積もりシミュレーター',
    /* ツールサブタイトル */
    toolSubtitle: '選択するだけで概算金額を即座に算出。',

    /* localStorage キー（複数インストール時の衝突防止。基本変更不要） */
    storageKey: 'mitsurimo_v1',

    /* テンプレートタイプ（'flex': 汎用版 / 'web': Web制作版） */
    templateType: 'flex',
    /* テンプレート名（表示用） */
    templateName: '汎用版テンプレート（動画制作）',

    /* ディレクション費設定 */
    directionFeeType:  'percent',   /* 'percent' | 'fixed' | 'none' */
    directionFeeValue: 10,          /* percent の場合は %、fixed の場合は円 */

    /* 消費税率（%） */
    taxRate: 10,

    /* ------------------------------------------------------------------
       カラー設定
    ------------------------------------------------------------------ */
    colorPrimary:       '#6abae2',
    colorSecondary:     '#1a6e99',
    colorBg:            '#f8f8fc',
    colorAccentBg:      '#eef2ff',
    colorAccentBorder:  '#a5b4fc',
    colorWarningBg:     '#fffbeb',
    colorWarningText:   '#b45309',
    colorWarningBorder: '#fde68a',
    colorPanelHeadBg:   '#a4d9f4',
    colorPanelHeadText: '#383838',
    colorCardSubText:   '#6b7280',
};


/* ============================================================
   ② Web制作版 固定Step 価格定数
   （templateType が 'web' の場合のみ使用）
============================================================ */
const S2_TOP_PRICE_LP  = 70000;   // LPのトップページ価格
const S2_TOP_PRICE_STD = 65000;   // 通常サイトのトップページ価格
const LP_SECTION_PRICE = 15000;   // LP追加セクション1つあたりの価格


/* ============================================================
   ③ Web制作版 STEP1：サイトタイプ
   （templateType が 'web' の場合のみ使用）
============================================================ */
const STEP1_ITEMS = [
    { id: 's1_lp',      label: 'ランディングページ (LP)', sub: '1ページ・5セクション', isLP: true  },
    { id: 's1_web',     label: 'ウェブサイト（複数ページ）',                           isLP: false },
    { id: 's1_recruit', label: '採用サイト',                                            isLP: false },
    { id: 's1_ec',      label: 'ECサイト',                                              isLP: false },
    { id: 's1_media',   label: 'メディア・ブログサイト',                               isLP: false },
];


/* ============================================================
   ④ Web制作版 STEP2：ページ構成
   （templateType が 'web' の場合のみ使用）
============================================================ */
const STEP2_CATS = [
    { label: '必須', items: [
        { id: 's2_top',       label: 'トップページ',                       price: 65000, pages: 1, required: true, maxQty: 1 },
    ]},
    { label: '基本情報', items: [
        { id: 's2_concept',   label: '私たちについて',                     price: 20000, pages: 1 },
        { id: 's2_service',   label: 'サービス紹介',                       price: 20000, pages: 1 },
        { id: 's2_company',   label: '会社概要',                           price: 15000, pages: 1 },
        { id: 's2_message',   label: '代表からのメッセージ',               price: 15000, pages: 1 },
        { id: 's2_profile',   label: 'プロフィール',                       price: 15000, pages: 1 },
        { id: 's2_access',    label: 'アクセス・地図',                     price: 15000, pages: 1 },
    ]},
    { label: '実績・商品', items: [
        { id: 's2_works',     label: '実績紹介（一覧・詳細）',             price: 30000, pages: 2 },
        { id: 's2_product',   label: '商品紹介（一覧・詳細）',             price: 30000, pages: 2 },
        { id: 's2_staff',     label: 'スタッフ・社員紹介（一覧・詳細）',   price: 30000, pages: 2 },
        { id: 's2_blog',      label: 'ブログ・お知らせ（一覧・詳細）',     price: 30000, pages: 2 },
        { id: 's2_voice',     label: 'お客様の声（一覧）',                 price: 24000, pages: 1 },
        { id: 's2_faq',       label: 'よくある質問（一覧）',               price: 24000, pages: 1 },
    ]},
    { label: '法的・規約', items: [
        { id: 's2_privacy',   label: 'プライバシーポリシー',               price: 12000, pages: 1 },
        { id: 's2_terms',     label: '利用規約',                           price: 12000, pages: 1 },
        { id: 's2_tokusho',   label: '特定商取引法に基づく表記',           price: 10000, pages: 1 },
    ]},
    { label: 'その他', items: [
        { id: 's2_contact',   label: 'お問い合わせページ',                 price: 12000, pages: 1 },
        { id: 's2_recruit',   label: '採用募集要項一覧（簡易一覧）',       price: 24000, pages: 1 },
        { id: 's2_recruitlp', label: '採用情報LP（5セクション）',           price: 70000, pages: 1 },
        { id: 's2_gallery',   label: 'ギャラリー・フォト',                 price: 24000, pages: 1 },
        { id: 's2_404',       label: '404エラーページ',                    price: 15000, pages: 1 },
    ]},
];


/* ============================================================
   ⑤ Web制作版 STEP3：機能・演出
   （templateType が 'web' の場合のみ使用）
============================================================ */
const STEP3_ITEMS = [
    { id: 's3_form',      label: 'お問い合わせフォーム機能実装',          price:  25000 },
    { id: 's3_slider',    label: 'スライダー・カルーセル実装',            price:  25000 },
    { id: 's3_anime',     label: 'アニメーション演出（フェードイン等）',   price:  25000 },
    { id: 's3_gsap',      label: '高度なアニメーション（GSAP等）',        price:  50000 },
    { id: 's3_gmap',      label: 'Googleマップ埋め込み',                  price:   6000 },
    { id: 's3_sns',       label: 'SNS連携（フィード表示）',               price:  18000 },
    { id: 's3_search',    label: 'サイト内検索機能',                      price:  30000 },
    { id: 's3_multilang', label: '多言語対応切り替え機能',                price: 100000 },
];


/* ============================================================
   ⑥ Web制作版 STEP4：システム・設定
   （templateType が 'web' の場合のみ使用）
============================================================ */
/* ページ数×単価（LP時は calcTotals() で別途処理） */
const STEP4_VAR = [
    { id: 's4_resp', label: 'レスポンシブ対応',  unitPrice: 5000 },
    { id: 's4_seo',  label: '基本的なSEO設定',   unitPrice: 3000 },
];

/* 固定価格 */
const STEP4_FIX = [
    { id: 's4_wp',       label: 'WordPress構築',              price:  50000 },
    { id: 's4_ec',       label: 'EC機能実装（決済機能等）',   price: 100000 },
    { id: 's4_ga4',      label: 'アクセス解析タグ設置 (GA4)', price:  10000 },
    { id: 's4_server',   label: 'サーバー・ドメイン設定代行', price:  15000 },
    { id: 's4_security', label: 'WordPressセキュリティ対策',  price:  35000 },
];


/* ============================================================
   ⑦ フリーStep（汎用版では Step1以降、Web制作版では Step5以降）
   チェックボックス型で複数選択・価格加算方式です。
============================================================ */
const FREE_STEPS = [
    {
        id: 'fs_001',
        title: '映像編集',
        items: [
            { id: 'fs_001_a', label: '動画編集（カット・BGM・SE）',    price: 30000 },
            { id: 'fs_001_b', label: 'テロップ・字幕制作',              price: 15000 },
            { id: 'fs_001_c', label: 'カラーグレーディング',            price: 20000 },
        ]
    },
    {
        id: 'fs_002',
        title: 'アニメーション',
        items: [
            { id: 'fs_002_a', label: 'モーショングラフィックス',        price: 40000 },
            { id: 'fs_002_b', label: 'ロゴアニメーション',              price: 25000 },
            { id: 'fs_002_c', label: 'タイトルアニメーション',          price: 20000 },
        ]
    },
    {
        id: 'fs_003',
        title: '制作物',
        items: [
            { id: 'fs_003_a', label: '台本・脚本作成',                  price: 30000 },
            { id: 'fs_003_b', label: 'BGM・効果音（著作権フリー）選定', price: 10000 },
            { id: 'fs_003_c', label: 'サムネイル制作',                  price:  8000 },
        ]
    },
    {
        id: 'fs_004',
        title: '撮影・スタッフ',
        items: [
            { id: 'fs_004_a', label: 'カメラマン派遣（1日）',           price: 50000 },
            { id: 'fs_004_b', label: 'スタジオレンタル（1日）',         price: 30000 },
            { id: 'fs_004_c', label: 'プロナレーター',                  price: 40000 },
            { id: 'fs_004_d', label: '出演者・モデル（1名）',           price: 35000 },
            { id: 'fs_004_e', label: 'ドローン撮影（1日）',             price: 80000 },
        ]
    },
    {
        id: 'fs_005',
        title: '仕上がり・納品オプション',
        items: [
            { id: 'fs_005_a', label: '4K画質で納品',                              price: 20000 },
            { id: 'fs_005_b', label: '特急制作（通常の半分以下の工期）',           price: 30000 },
            { id: 'fs_005_c', label: '元データ（RAW・プロジェクトファイル）納品',  price: 15000 },
            { id: 'fs_005_d', label: 'SNS用リサイズ版追加（縦型・正方形）',        price: 10000 },
            { id: 'fs_005_e', label: '英語字幕・翻訳追加',                         price: 25000 },
            { id: 'fs_005_f', label: '追加修正対応（＋2回）',                      price: 15000 },
        ]
    },
];
