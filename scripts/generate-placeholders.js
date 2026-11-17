const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'public', 'images');
const docsDir = path.join(__dirname, '..', 'public', 'docs');

if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

function createSvg(text, subtitle, bg1 = '#0f172a', bg2 = '#0284c7', iconText = 'AFH') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg1}" />
      <stop offset="100%" stop-color="${bg2}" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#grad)" />
  <rect width="800" height="600" fill="url(#grid)" />
  <circle cx="400" cy="220" r="80" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <text x="400" y="240" font-family="system-ui, sans-serif" font-size="44" font-weight="800" fill="#38bdf8" text-anchor="middle">${iconText}</text>
  <text x="400" y="370" font-family="system-ui, sans-serif" font-size="30" font-weight="700" fill="#ffffff" text-anchor="middle">${text}</text>
  <text x="400" y="420" font-family="system-ui, sans-serif" font-size="18" fill="#94a3b8" text-anchor="middle">${subtitle}</text>
</svg>`;
}

const assets = [
  { file: 'profile-hanan.jpg', svg: createSvg('Abdul Rasyid Fadhilah Hanan', 'Industrial Engineering & Tech Enthusiast', '#064e3b', '#047857', 'AFH') },
  { file: 'prodsens-thumb.jpg', svg: createSvg('PRODSENS Smart Factory', 'IoT & Computer Vision Real-Time Monitoring', '#091e3a', '#0369a1', 'PRODSENS') },
  { file: 'prodsens-architecture.jpg', svg: createSvg('PRODSENS System Architecture', 'Sensors, Edge Processing & YOLOv8 Detection', '#0f172a', '#1e293b', 'IOT-AI') },
  { file: 'visionsafe-thumb.jpg', svg: createSvg('VisionSafe PPE Detection', 'HSE Automated Compliance Vision System', '#14532d', '#15803d', 'HSE') },
  { file: 'railway-dashboard-thumb.jpg', svg: createSvg('DepoTrack Railway', 'Rolling Stock Maintenance Dashboard', '#1e1b4b', '#4338ca', 'KAI') },
  { file: 'vsm-thumb.jpg', svg: createSvg('Industrial Line Balancing', 'Value Stream Mapping & Waste Reduction', '#312e81', '#3730a3', 'VSM') },
  { file: 'sertifikat-inpc-2026.jpg', svg: createSvg('JUARA 1 NASIONAL', 'Industrial National Paper Competition 2026', '#78350f', '#d97706', '★ 1st') },
  { file: 'semen-bima-logo.png', svg: createSvg('Semen Bima', 'PT Sinar Tambang Arthalestari', '#1e293b', '#334155', 'BIMA') },
  { file: 'kai-logo.png', svg: createSvg('PT KAI (Persero)', 'DAOP 5 Purwokerto', '#1e3a8a', '#2563eb', 'KAI') },
  { file: 'placeholder-project.jpg', svg: createSvg('Project Showcase', 'Engineering & Technology Project', '#0f172a', '#1e293b', 'AFH') }
];

assets.forEach(a => {
  fs.writeFileSync(path.join(imgDir, a.file), a.svg);
});

// Create a dummy sample PDF for CV
const dummyCvText = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj
xref
0 4
0000000000 65535 f
0000000009 00000 n
0000000052 00000 n
0000000101 00000 n
trailer<</Size 4/Root 1 0 R>>
startxref
178
%%EOF`;

fs.writeFileSync(path.join(docsDir, 'CV_Abdul_Rasyid_Fadhilah_Hanan.pdf'), dummyCvText);
fs.writeFileSync(path.join(docsDir, 'PRODSENS_Paper_INPC2026.pdf'), dummyCvText);

console.log('Placeholders created successfully.');
