const fs = require('fs');

const ctaHTML = `
    <!-- メルマガ導線 -->
    <section class="section" style="background: var(--soft); padding: 50px 0;">
      <div class="container">
        <div style="background: #fff; border: 2px solid var(--accent); border-radius: 16px; padding: 40px; box-shadow: 0 10px 25px rgba(224, 135, 42, 0.15); text-align: center;">
          <span style="display: inline-block; background: var(--accent); color: #fff; font-weight: 900; font-size: 13px; padding: 5px 12px; border-radius: 999px; margin-bottom: 15px;">現役 食品安全審査員がお届けする</span>
          <h2 style="font-size: 28px; font-weight: 1000; color: var(--ink); margin-top: 0;">「知らなかった」では済まされない。<br>最新の食品安全リスクと対策を無料でキャッチアップ</h2>
          <p style="font-weight: 700; font-size: 15px; color: var(--muted); margin: 20px auto 30px; line-height: 1.8; max-width: 800px;">異物混入、アレルゲン表示ミス、法改正。対応が1日遅れるだけで、数千万円の損失や取引先からの信用完全喪失に直結します。「うちは大丈夫」という根拠のない自信は捨てて、今すぐ無料で備えましょう。</p>
          <a href="lp-newsletter.html" class="btn primary" style="padding: 16px 32px; font-size: 18px; box-shadow: 0 8px 20px rgba(224,135,42,0.3);">公式メルマガに無料登録する（アプリ利用特典あり）</a>
        </div>
      </div>
    </section>
`;

const files = ['index.html', 'live_index.html'];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const target = '<section class="section" id="download"';
    
    if (content.includes(target) && !content.includes('<!-- メルマガ導線 -->')) {
      content = content.replace(target, ctaHTML + '\n    ' + target);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}
console.log('Done');
