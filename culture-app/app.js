// ============================================
// 食品安全文化 診断アプリ - Application Logic v4
// ============================================

// ★★★ ここにGASのウェブアプリURLを貼り付ける ★★★
const GAS_ENDPOINT = '';

const QUESTIONS = [
  {
    category: '教育・育成',
    text: '新しく入った従業員を、どんな風に育てたい？',
    options: [
      { key: 'a', text: '言われた通りにやるだけでなく、「なぜ必要か」自ら考え、改善案を出せるように' },
      { key: 'b', text: 'ミスを恐れず、わからないことは誰にでもすぐ聞ける「心理的安全性」の高い状態に' },
      { key: 'c', text: '教える人によるブレをなくすため、詳細なマニュアルと手順通りに確実に' },
      { key: 'd', text: '動画やデジタルツールを活用し、属人性を排除して最も効率的かつ正確に' }
    ]
  },
  {
    category: 'リスク対応',
    text: '現場でヒヤリハットやミスが起きた時、どう対処したい？',
    options: [
      { key: 'a', text: 'ミスを「プロセスを進化させるチャンス」と捉え、現場主導で新しいやり方を試す' },
      { key: 'b', text: 'ミスを責めず、「報告してくれてありがとう」の文化を徹底し、隠蔽を防ぐ' },
      { key: 'c', text: '規定の報告ルートに則り、ルールの穴を塞ぐ再発防止策を徹底する' },
      { key: 'd', text: '人の注意力に依存せず、センサー等の物理的な仕組み（フールプルーフ）でミスできない環境を作る' }
    ]
  },
  {
    category: '一貫性（ジレンマ）',
    text: '納期ギリギリ。しかし品質に微細な懸念が出た。どう動くのが理想？',
    options: [
      { key: 'a', text: '現場の担当者が自律的に「出荷停止」を決断し、経営層もその判断を称賛する' },
      { key: 'b', text: '現場だけで抱え込まず、即座に他部門や管理職と相談し、一丸となって対応を決める' },
      { key: 'c', text: '事前に定めた「出荷可否基準」に厳格に従い、例外を一切認めずルール通りに判断する' },
      { key: 'd', text: '過去のデータや品質指標を即座に照会し、客観的・科学的な数値根拠に基づいて判断する' }
    ]
  },
  {
    category: '適応性（改善提案）',
    text: '現場からの「改善・提案」は、どう吸い上げるのが理想？',
    options: [
      { key: 'a', text: '役職や年次に関係なく、現場発の新しいアイデアがどんどん採用・実行される' },
      { key: 'b', text: '日々の声掛けや雑談の中から、現場の小さな「困りごと」を自然に拾い上げる' },
      { key: 'c', text: '定期的な会議や定められた提案制度のルートを通じ、計画的かつ着実に改善を進める' },
      { key: 'd', text: '作業データや稼働状況を可視化し、数字の異常値から自動的に改善ポイントを特定する' }
    ]
  },
  {
    category: '評価・称賛',
    text: '現場のスタッフを評価（表彰）するなら、どの行動を一番褒めたい？',
    options: [
      { key: 'a', text: '既存のやり方を疑い、自ら新しい安全対策を提案・実行したこと' },
      { key: 'b', text: '同僚のミスを責めずカバーし、チームのピンチを救ったこと' },
      { key: 'c', text: '誰よりもルールを熟知し、毎日寸分違わず手順を守り抜いたこと' },
      { key: 'd', text: 'データを分析し、ミスの発生確率を数値的に下げる仕組みを作ったこと' }
    ]
  },
  {
    category: 'トップの関与',
    text: '工場長や社長が現場を巡回する時、どう関わるのが理想？',
    options: [
      { key: 'a', text: '「もっと良くするにはどうする？」と現場に問いかけ、議論を促す' },
      { key: 'b', text: '「最近体調どう？困ってない？」と、一人ひとりに気さくに声掛けする' },
      { key: 'c', text: '服装や手洗いの手順など、基本ルールが守られているか厳格にチェックする' },
      { key: 'd', text: '現場のモニターや稼働データを確認し、数値の異常がないか客観的に確認する' }
    ]
  },
  {
    category: '投資・資源',
    text: '食品安全レベルをさらに上げるため、今一番投資したい（時間・金）のは？',
    options: [
      { key: 'a', text: '現場が自由に新しいアイデアを試せる環境づくりや研修' },
      { key: 'b', text: '社内イベントやミーティングなど、部署間の風通しを良くする場づくり' },
      { key: 'c', text: 'マニュアルの全面改訂や、ルールを徹底するための監査体制強化' },
      { key: 'd', text: 'カメラ、センサー、自動記録などの最新DXツールの導入' }
    ]
  }
];

const RESULTS = {
  a: {
    name: '純血イノベーター型',
    subtitle: '〜変革を牽引する文化〜',
    posterClass: 'type-a',
    catch: '全員の熱意と挑戦で、\n「最高の安心」を最速でアップデートする！',
    body: '私たちは、過去のやり方に固執しません。現場の新しい気づき（適応性）と情熱（人）を何より評価し、リスクを恐れず自ら改善を続ける（リスク認識・一貫性）ことで、世界一活気ある安全な工場をつくります。',
    strength: '前例を破壊し、常にプロセスを改善し続ける圧倒的な突破力と熱意。',
    risk: '改善が暴走しルールが形骸化。「オレ流」が蔓延。審査で「標準化の欠如・属人化の極み」とみなされ一発アウトの危険。'
  },
  b: {
    name: '純血ファミリー・職人型',
    subtitle: '〜絆と誇りで守る文化〜',
    posterClass: 'type-b',
    catch: '家族に誇れるものだけを作る。\n小さな異変もすぐ話せる信頼のチーム！',
    body: '私たちは、強い絆でお互いを守り抜きます（ビジョン）。ミスを隠さず報告できる風通しの良さ（人・リスク認識）を大切にし、全員が責任と誇りを持って（一貫性）助け合えるあたたかい工場をつくります。',
    strength: '誰一人見捨てない、家族のような絆と圧倒的な心理的安全性。',
    risk: '「なあなあ」な関係が悪化。審査で「身内への甘さから重大なルール違反を見逃す土壌がある」と判定される危険。'
  },
  c: {
    name: '純血ガーディアン・伝統型',
    subtitle: '〜規律と信頼を継承する文化〜',
    posterClass: 'type-c',
    catch: '1ミリの妥協もない完璧なルーティンで、\n築き上げた信頼を守り抜く！',
    body: '私たちは、決められた手順と規律を絶対の基準とします（一貫性）。日々の地道な確認作業を誇りとし（リスク認識・人）、過去から受け継いだ安全への誓い（ビジョン）を今日も寸分違わず実行します。',
    strength: '決められたルールを1ミリの狂いもなく毎日守り抜く、鉄の規律。',
    risk: 'マニュアル遵守が自己目的化し現場が思考停止。想定外の事象に弱く、審査で「形骸化・改善意識ゼロ」と指摘される危険。'
  },
  d: {
    name: '純血システム・ハッカー型',
    subtitle: '〜スマートに最適化する文化〜',
    posterClass: 'type-d',
    catch: '勘や根性に頼らない。\n科学とデータでミスを生まないスマートな工場へ！',
    body: '私たちは、属人的な努力ではなく、確実な仕組みと最新データ（一貫性・適応性）で品質を担保します。ヒューマンエラーを仕組みで排除し（リスク認識）、世界一信頼される製品を合理的にお届けします。',
    strength: '属人性を完全排除し、データと科学でエラーを弾き出す効率の極み。',
    risk: 'システム依存により人の「異常に気づく感性」が退化。センサーの死角で起きたミスに誰も気づけず、致命的欠陥を出す危険。'
  },
  ab: {
    name: '熱狂・大家族型',
    subtitle: '〜情熱と絆が融合する文化〜',
    posterClass: 'type-ab',
    catch: '全員の熱意と思いやりで、\nどんな困難も笑顔で乗り越える現場力！',
    body: '私たちは、変化を楽しむ情熱（適応性）と、仲間を見捨てない絆（人）を両立させます。現場の小さな気づきを全員で共有し（リスク認識）、一丸となって最高水準の安全を力強く実現します。',
    strength: '変化を恐れない情熱と、全員でカバーし合うチーム力が融合した最強の現場力。',
    risk: '勢いとノリだけで現場が回り、記録・文書化が壊滅的。審査で「現場は素晴らしいが証拠（エビデンス）がない」と致命傷を負う危険。'
  },
  ac: {
    name: '両利きの変革型',
    subtitle: '〜挑戦と規律を兼ね備えた希少な文化〜',
    posterClass: 'type-ac',
    catch: '守るべき基準は死守し、\n変えるべき仕組みは誰よりも早く壊す！',
    body: '私たちは、鉄の規律（一貫性）と革新の情熱（適応性）を併せ持ちます。決して妥協できない安全基準を守り抜きながら（リスク認識）、より良い方法を自ら考え、未来の安全基準を創り出します。',
    strength: '新しい挑戦のアクセルと、守るべき規律のブレーキを併せ持つ、最も稀有な組織。',
    risk: '現場の「変えたい熱意」と管理層の「守らせる圧力」が衝突。ダブルスタンダード（二重基準）が発生し、審査で「方針に一貫性がない」と突かれる危険。'
  },
  ad: {
    name: 'アジャイル・テック型',
    subtitle: '〜挑戦×テクノロジーの最先端文化〜',
    posterClass: 'type-ad',
    catch: '最新の仕組みと飽くなき探求心で、\n品質基準を限界突破する！',
    body: '私たちは、データに基づく客観性（一貫性・リスク認識）と、現状に満足しない挑戦心（適応性）で進化し続けます。仕組みを常にアップデートし、誰にも追いつけないスピードで圧倒的な安全を構築します。',
    strength: '最新テクノロジーを駆使し、超高速でPDCAを回し続ける最先端の効率化組織。',
    risk: 'スピード偏重により、ベテランやIT弱者が置いてきぼりに。審査で「全従業員への教育・方針の浸透（理解度）が著しく不十分」と判定される危険。'
  },
  bc: {
    name: '鉄の結束・防衛型',
    subtitle: '〜絆と規律で守る堅牢な文化〜',
    posterClass: 'type-bc',
    catch: '伝統のルールと仲間の絆で、\nあらゆるリスクを寄せ付けない鉄壁の守り！',
    body: '私たちは、長年培った確かな手順（一貫性）を、現場のあたたかいコミュニケーション（人）で支えます。小さな違和感も絶対に見逃さず（リスク認識）、揺るぎない品質を全員で守り抜きます。',
    strength: '伝統的な絆と厳格なルール遵守が合わさった、ミスを絶対に外に出さない堅守の要塞。',
    risk: '閉鎖的になり、外部の新しい基準（法改正・新規格）に拒否反応。審査で「ガラパゴス化し、最新の要求事項から逸脱している」とみなされる危険。'
  },
  bd: {
    name: 'サイバー・ヒューマン型',
    subtitle: '〜人の温かさと最新技術が共存する文化〜',
    posterClass: 'type-bd',
    catch: '最先端のシステムに、\n私たちの「お客様を想う心」を乗せる！',
    body: '私たちは、完璧なデータ監視（一貫性・適応性）と、機械にはない人の思いやり・倫理観（人・ビジョン）を融合させます。冷たいシステムだけでは防げないリスクを、あたたかい現場の視点で完全にカバーします。',
    strength: '最新の自動化システムと、人の温かいコミュニケーションが共存する未来型組織。',
    risk: '機械の判断と人の情（忖度）が混在。審査で「異常時のシステム強制解除ルールが曖昧で、安全が担保されていない」と指摘される危険。'
  },
  cd: {
    name: '完全無欠・要塞型',
    subtitle: '〜ルールとシステムの鉄壁文化〜',
    posterClass: 'type-cd',
    catch: '一切の隙なし。\n厳格なルールと最新データが証明する完璧なる安全！',
    body: '私たちは、感情や勘に頼りません。定めた基準の完全なる遵守（一貫性）と、システムによるリアルタイムな異常検知（リスク認識）を連動させ、100%確実で説明可能な食品安全を実現します。',
    strength: '厳格なルールと最新システムが完璧に連動した、ヒューマンエラーの入る隙がない要塞。',
    risk: '感情や熱意が完全欠如。審査で「食品安全文化の要である『従業員の自発的なコミットメント（想い）』が一切感じられない」と酷評される危険。'
  }
};

// --- State ---
const state = {
  currentQuestion: 0,
  answers: [],
  scores: { a: 0, b: 0, c: 0, d: 0 },
  email: '',
  emailProvided: false,
  resultKey: ''
};

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function showScreen(screenId) {
  const cur = $('.screen.active');
  const next = $(`#${screenId}`);
  if (cur) {
    cur.classList.add('exiting');
    setTimeout(() => {
      cur.classList.remove('active', 'exiting');
      next.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 280);
  } else {
    next.classList.add('active');
  }
}

function startDiagnosis() {
  state.currentQuestion = 0;
  state.answers = [];
  state.scores = { a: 0, b: 0, c: 0, d: 0 };
  renderQuestion();
  showScreen('screen-question');
}

function renderQuestion() {
  const q = QUESTIONS[state.currentQuestion];
  const total = QUESTIONS.length;
  const current = state.currentQuestion + 1;
  $('.progress-count').innerHTML = `<span class="current">${current}</span> / ${total}`;
  $('.progress-fill').style.width = `${(current / total) * 100}%`;
  $('.question-category').textContent = q.category;
  $('.question-text').textContent = q.text;
  const optionsList = $('.options-list');
  optionsList.innerHTML = '';
  const markers = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-marker">${markers[idx]}</span>
      <span class="option-text">${opt.text}</span>
    `;
    btn.addEventListener('click', () => selectOption(opt.key, btn));
    optionsList.appendChild(btn);
  });
}

function selectOption(key, btnEl) {
  $$('.option-btn').forEach(b => b.classList.remove('selected'));
  btnEl.classList.add('selected');
  setTimeout(() => {
    state.answers.push(key);
    state.scores[key]++;
    state.currentQuestion++;
    if (state.currentQuestion < QUESTIONS.length) {
      renderQuestion();
      const card = $('.question-card');
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.animation = 'fadeSlideIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards';
    } else {
      showResult();
    }
  }, 350);
}

function showResult() {
  const scores = state.scores;
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [firstKey, firstScore] = sorted[0];
  const [secondKey, secondScore] = sorted[1];
  const isHybrid = (firstScore - secondScore) <= 1 && secondScore > 0;

  let resultKey;
  if (isHybrid) {
    resultKey = [firstKey, secondKey].sort().join('');
  } else {
    resultKey = firstKey;
  }
  const data = RESULTS[resultKey] || RESULTS[firstKey];
  state.resultKey = resultKey;

  // タイプ名
  if (isHybrid) {
    $('.result-type-name').innerHTML = `<span style="color: var(--accent-amber);">★ ハイブリッド ★</span><br>${data.name}`;
  } else {
    $('.result-type-name').textContent = data.name;
  }
  $('.result-type-sub').textContent = data.subtitle;

  // 四象限マトリクス ドット位置計算
  // X軸: 左=ひとの想い(a,b) → 右=仕組み・論理(c,d)
  // Y軸: 上=挑戦(a,d) → 下=継承(b,c)
  const total = QUESTIONS.length;
  const emotionalScore = scores.a + scores.b;
  const logicalScore = scores.c + scores.d;
  const challengeScore = scores.a + scores.d;
  const traditionScore = scores.b + scores.c;

  const xNorm = (logicalScore - emotionalScore) / total;
  const yNorm = (traditionScore - challengeScore) / total;
  const xPct = Math.max(8, Math.min(92, 50 + xNorm * 35));
  const yPct = Math.max(8, Math.min(92, 50 + yNorm * 35));

  const dot = $('#result-dot');
  dot.style.left = `${xPct}%`;
  dot.style.top = `${yPct}%`;
  dot.style.animation = 'none';
  dot.offsetHeight;
  dot.style.animation = 'dotAppear 0.6s 0.6s cubic-bezier(0.16,1,0.3,1) forwards';

  const dotLabel = $('#result-dot-label');

  // ドットの横にシンプルにテキスト配置（右側。右端なら左側）
  if (xPct > 65) {
    dotLabel.style.left = `calc(${xPct}% - 14px)`;
    dotLabel.style.top = `calc(${yPct}% - 2px)`;
    dotLabel.style.transform = 'translate(-100%, -50%)';
  } else {
    dotLabel.style.left = `calc(${xPct}% + 14px)`;
    dotLabel.style.top = `calc(${yPct}% - 2px)`;
    dotLabel.style.transform = 'translate(0, -50%)';
  }

  dotLabel.style.animation = 'none';
  dotLabel.offsetHeight;
  dotLabel.style.animation = 'fadeSlideIn 0.4s 1s forwards';

  // Highlight quadrant cells
  ['cell-a', 'cell-b', 'cell-c', 'cell-d'].forEach(id => $(`#${id}`).classList.remove('highlight'));
  if (isHybrid) {
    $(`#cell-${firstKey}`).classList.add('highlight');
    $(`#cell-${secondKey}`).classList.add('highlight');
  } else {
    $(`#cell-${firstKey}`).classList.add('highlight');
  }

  // Score bars
  const typeLabels = { a: 'イノベーター', b: 'ファミリー', c: 'ガーディアン', d: 'システム' };
  const scoreGroup = $('.score-bar-group');
  scoreGroup.innerHTML = '';
  ['a', 'b', 'c', 'd'].forEach(k => {
    const item = document.createElement('div');
    item.className = 'score-bar-item';
    item.innerHTML = `
      <span class="score-bar-label">${typeLabels[k]}</span>
      <div class="score-bar-track">
        <div class="score-bar-value type-${k}" style="width: 0%"></div>
      </div>
      <span class="score-bar-num">${scores[k]}</span>
    `;
    scoreGroup.appendChild(item);
  });

  // メアド有無で表示分岐
  const sentSection = $('#result-email-sent');
  const gateSection = $('#result-email-gate');

  if (state.emailProvided) {
    // メアド入力済み → 送付完了メッセージ
    sentSection.style.display = 'block';
    gateSection.style.display = 'none';
    $('#sent-email-addr').textContent = state.email;
    saveLead(data.name, resultKey, isHybrid);
  } else {
    // メアド未入力 → プレビュー表示（実データの冒頭だけ見せる）
    sentSection.style.display = 'none';
    gateSection.style.display = 'block';

    // プレビューにユーザーの実際の結果データを冒頭だけセット（損失回避）
    const catchPreview = $('#preview-catch');
    const bodyPreview = $('#preview-body');
    const strengthPreview = $('#preview-strength');
    const riskPreview = $('#preview-risk');

    if (catchPreview) catchPreview.textContent = '『' + data.catch.replace('\n', '') + '』';
    if (bodyPreview) bodyPreview.textContent = data.body.substring(0, 40) + '…';
    if (strengthPreview) strengthPreview.textContent = '💪 ' + data.strength.substring(0, 35) + '…';
    if (riskPreview) riskPreview.textContent = '🚨 ' + data.risk.substring(0, 35) + '…';
  }

  // 結果データをstateに保持（メール送信用）
  state.resultData = data;

  showScreen('screen-result');

  // Score bar animation
  setTimeout(() => {
    ['a', 'b', 'c', 'd'].forEach(k => {
      const pct = (scores[k] / total) * 100;
      const bar = scoreGroup.querySelector(`.score-bar-value.type-${k}`);
      if (bar) bar.style.width = `${pct}%`;
    });
  }, 500);
}

function saveLead(typeName, resultKey, isHybrid) {
  const leadData = {
    email: state.email,
    timestamp: new Date().toISOString(),
    scores: { ...state.scores },
    resultType: typeName,
    resultKey: resultKey,
    isHybrid: isHybrid
  };

  // localStorage保存（フォールバック兼ローカルバックアップ）
  const leads = JSON.parse(localStorage.getItem('fs_culture_leads') || '[]');
  const existingIdx = leads.findIndex(l => l.email === state.email);
  if (existingIdx >= 0) {
    leads[existingIdx] = leadData;
  } else {
    leads.push(leadData);
  }
  localStorage.setItem('fs_culture_leads', JSON.stringify(leads));
  console.log('リード情報をlocalStorageに保存:', leadData);

  // GASへ送信
  sendToGAS(leadData);
}

function sendToGAS(data) {
  if (!GAS_ENDPOINT) {
    console.warn('⚠️ GAS_ENDPOINT未設定。localStorageのみ保存。');
    updateSendStatus('warn', '⚠️ バックエンド未設定（ローカル保存のみ）');
    return;
  }

  updateSendStatus('sending', '📤 データ送信中...');

  fetch(GAS_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data)
  })
  .then(() => {
    console.log('✅ GAS送信完了');
    updateSendStatus('success', '✅ スプレッドシートに保存しました');
    setTimeout(() => updateSendStatus('hide'), 4000);
  })
  .catch(err => {
    console.error('❌ GAS送信エラー:', err);
    updateSendStatus('error', '⚠️ 送信エラー（ローカルに保存済み）');
  });
}

function updateSendStatus(type, message) {
  const el = $('#send-status');
  if (!el) return;
  if (type === 'hide') {
    el.style.display = 'none';
    return;
  }
  el.style.display = 'block';
  el.className = 'send-status send-status--' + type;
  el.textContent = message || '';
}

function resetDiagnosis() {
  state.currentQuestion = 0;
  state.answers = [];
  state.scores = { a: 0, b: 0, c: 0, d: 0 };
  state.email = '';
  state.emailProvided = false;
  state.resultKey = '';
  state.resultData = null;
  ['cell-a', 'cell-b', 'cell-c', 'cell-d'].forEach(id => $(`#${id}`).classList.remove('highlight'));

  // Reset all email inputs
  const emailInput = $('#user-email');
  if (emailInput) emailInput.value = '';
  const emailInputResult = $('#user-email-result');
  if (emailInputResult) emailInputResult.value = '';

  // Hide send status
  updateSendStatus('hide');

  showScreen('screen-start');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function openModal(e) {
  if (e) e.preventDefault();
  $('#privacy-modal').classList.add('open');
}

function closeModal() {
  $('#privacy-modal').classList.remove('open');
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {

  // START: メアド入力して診断開始
  $('#email-form-start').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#user-email').value.trim();
    if (email && isValidEmail(email)) {
      state.email = email;
      state.emailProvided = true;
    } else if (email) {
      // 不正なメール形式 → 入力欄をハイライト
      $('#user-email').classList.add('input-error');
      setTimeout(() => $('#user-email').classList.remove('input-error'), 2000);
      return;
    }
    startDiagnosis();
  });

  // START: メアドなしで診断開始
  $('#btn-start-skip').addEventListener('click', () => {
    state.email = '';
    state.emailProvided = false;
    startDiagnosis();
  });

  // RESULT: メアド未入力者がここで入力
  $('#email-form-result').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#user-email-result').value.trim();
    if (!email) return;

    if (!isValidEmail(email)) {
      $('#user-email-result').classList.add('input-error');
      setTimeout(() => $('#user-email-result').classList.remove('input-error'), 2000);
      return;
    }

    state.email = email;
    state.emailProvided = true;

    const data = RESULTS[state.resultKey] || RESULTS['a'];
    saveLead(data.name, state.resultKey, state.resultData ? (Object.entries(state.scores).sort((a,b) => b[1]-a[1])[0][1] - Object.entries(state.scores).sort((a,b) => b[1]-a[1])[1][1] <= 1) : false);

    // UI切り替え: ゲート→送付完了
    $('#result-email-gate').style.display = 'none';
    $('#result-email-sent').style.display = 'block';
    $('#sent-email-addr').textContent = email;

    // スムーズにスクロール
    $('#result-email-sent').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Reset
  $('#btn-reset').addEventListener('click', resetDiagnosis);

  // Privacy modal
  ['#link-privacy', '#link-privacy-gate', '#link-privacy-result'].forEach(sel => {
    const el = $(sel);
    if (el) el.addEventListener('click', openModal);
  });
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-agree-btn').addEventListener('click', closeModal);
  $('#privacy-modal').addEventListener('click', (e) => {
    if (e.target.id === 'privacy-modal') closeModal();
  });
});
