/* ========================================
   HOME PAGE JS - Visa Work & Holiday
   ======================================== */

// Firebase Config (Preparacion - reemplazar con tus credenciales)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase solo si las credenciales son validas
let auth = null;
let db = null;

function initFirebase() {
  try {
    if (firebaseConfig.apiKey !== "TU_API_KEY") {
      firebase.initializeApp(firebaseConfig);
      auth = firebase.auth();
      db = firebase.firestore();
      console.log('Firebase inicializado correctamente');
    } else {
      console.log('Firebase en modo demo - login no disponible');
    }
  } catch (error) {
    console.log('Firebase no disponible:', error.message);
  }
}

initFirebase();

// Course Tabs
function showCourse(id, el) {
  document.querySelectorAll('.course-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.course-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('course-' + id).classList.add('active');
  el.classList.add('active');
}

// Checklist Toggle
function toggleCheck(item) {
  item.classList.toggle('checked');
  item.setAttribute('aria-checked', item.classList.contains('checked'));
  saveChecklist();
  updateProgress();
  generateRecommendations();
}

// Save/Load checklist to localStorage
function saveChecklist() {
  const items = document.querySelectorAll('.checklist-item');
  const state = {};
  items.forEach(item => {
    state[item.dataset.id] = item.classList.contains('checked');
  });
  localStorage.setItem('visaChecklist2026', JSON.stringify(state));
}

function loadChecklist() {
  const saved = localStorage.getItem('visaChecklist2026');
  if (saved) {
    const state = JSON.parse(saved);
    const items = document.querySelectorAll('.checklist-item');
    items.forEach(item => {
      if (state[item.dataset.id]) {
        item.classList.add('checked');
        item.setAttribute('aria-checked', 'true');
      }
    });
  }
  updateProgress();
  generateRecommendations();
}

function updateProgress() {
  const total = document.querySelectorAll('.checklist-item').length;
  const checked = document.querySelectorAll('.checklist-item.checked').length;
  const percent = Math.round((checked / total) * 100);

  document.getElementById('progressPercent').textContent = percent + '%';
  document.getElementById('progressFill').style.width = percent + '%';
  document.getElementById('progressCount').textContent = checked + ' de ' + total + ' documentos';

  const msgs = ['Sigue asi!', 'Buen progreso!', 'Casi listo!', 'Excelente!', '🎉 Todo listo!'];
  const idx = Math.min(Math.floor(percent / 25), msgs.length - 1);
  document.getElementById('progressMsg').textContent = msgs[idx];

  // Update hero stats
  document.getElementById('heroProgress').textContent = checked + ' de ' + total;
  
  const inglesItem = document.querySelector('[data-id="ingles"]');
  const inglesChecked = inglesItem && inglesItem.classList.contains('checked');
  document.getElementById('heroEnglish').textContent = inglesChecked ? 'Certificado listo' : 'Sin evaluar';
  
  if (percent < 25) document.getElementById('heroNextStep').textContent = 'Empezar';
  else if (percent < 50) document.getElementById('heroNextStep').textContent = 'Documentos';
  else if (percent < 75) document.getElementById('heroNextStep').textContent = 'Examen ingles';
  else if (percent < 100) document.getElementById('heroNextStep').textContent = 'Casi listo!';
  else document.getElementById('heroNextStep').textContent = 'Viaja!';
}

// Recommendations Engine
function generateRecommendations() {
  const recoList = document.getElementById('recoList');
  const recos = [];

  const items = document.querySelectorAll('.checklist-item');
  const missing = [];
  items.forEach(item => {
    if (!item.classList.contains('checked')) {
      missing.push(item.dataset.id);
    }
  });

  if (missing.length === 0) {
    recos.push({
      icon: '🎉',
      iconBg: 'rgba(16,185,129,.2)',
      title: '¡Felicitaciones! Tienes todo listo',
      desc: 'Estas listo para aplicar a tu visa. Crea tu cuenta en ImmiAccount y envia tu solicitud.',
      link: 'https://online.immi.gov.au/',
      linkText: 'Ir a ImmiAccount'
    });
  } else {
    if (missing.includes('ingles')) {
      recos.push({
        icon: '📚',
        iconBg: 'rgba(249,115,22,.2)',
        title: 'Prepara tu ingles - IELTS 4.5',
        desc: 'Necesitas aprobar un examen de ingles. Revisa nuestra guia completa del IELTS.',
        link: 'pages/ielts-guia.html',
        linkText: 'Ver Guia Completa IELTS'
      });
    }
    if (missing.includes('carta-mre')) {
      recos.push({
        icon: '📄',
        iconBg: 'rgba(139,92,246,.2)',
        title: 'Solicita la Carta MRE PRIMERO',
        desc: 'Es obligatoria para peruanos. Tarda 15-30 dias y solo dura 60 dias. Planifica bien.',
        link: null,
        linkText: null
      });
    }
    if (missing.includes('bancario')) {
      recos.push({
        icon: '💰',
        iconBg: 'rgba(59,130,246,.2)',
        title: 'Reune tus fondos ($5,000 AUD)',
        desc: 'Transfiere el dinero con anticipacion y NO lo muevas. Necesitas extracto bancario de 3 meses.',
        link: null,
        linkText: null
      });
    }
    if (missing.includes('seguro')) {
      recos.push({
        icon: '🛡️',
        iconBg: 'rgba(236,72,153,.2)',
        title: 'Contrata seguro OVHC',
        desc: 'Medibank ($85 AUD/mes) o NIB ($80 AUD/mes) son las opciones mas economicas.',
        link: '#seguro',
        linkText: 'Ver comparativa'
      });
    }
    if (missing.includes('medico')) {
      recos.push({
        icon: '🏥',
        iconBg: 'rgba(16,185,129,.2)',
        title: 'Examen medico (si te lo piden)',
        desc: 'Medical Visa Peru o Clinica Anglo Americana. Necesitas tu HAP ID primero.',
        link: null,
        linkText: null
      });
    }
  }

  if (recos.length === 0) {
    recoList.innerHTML = '<p style="opacity:0.7; text-align:center;">Marca documentos en el checklist para recibir recomendaciones personalizadas.</p>';
  } else {
    recoList.innerHTML = recos.map(r => `
      <div class="reco-item">
        <div class="reco-icon" style="background:${r.iconBg};">${r.icon}</div>
        <div>
          <h4>${r.title}</h4>
          <p>${r.desc}</p>
          ${r.link ? `<a href="${r.link}" ${r.link.startsWith('#') ? '' : 'target="_blank"'}>${r.linkText} →</a>` : ''}
        </div>
      </div>
    `).join('');
  }
}

// Cost Calculator
function calcCosts() {
  const exam = parseInt(document.getElementById('examType').value);
  const insMonths = parseInt(document.getElementById('insuranceMonths').value);
  const medUSD = parseInt(document.getElementById('medExam').value);
  const airUSD = parseInt(document.getElementById('airfare').value);
  const usdPen = parseFloat(document.getElementById('exchangeRate').value);
  const audPen = parseFloat(document.getElementById('audRate').value);

  const visa = 840 * audPen;
  const ins = 85 * insMonths * audPen;
  const med = medUSD * usdPen;
  const air = airUSD * usdPen;
  const total = visa + 121 + 40 + exam + med + ins + air;
  const totalUSD = total / usdPen;

  document.getElementById('rVisa').textContent = 'S/ ' + Math.round(visa).toLocaleString();
  document.getElementById('rExam').textContent = 'S/ ' + exam.toLocaleString();
  document.getElementById('rMed').textContent = 'S/ ' + Math.round(med).toLocaleString();
  document.getElementById('rIns').textContent = 'S/ ' + Math.round(ins).toLocaleString();
  document.getElementById('rAir').textContent = air > 0 ? 'S/ ' + Math.round(air).toLocaleString() : 'S/ 0';
  document.getElementById('rTotal').textContent = 'S/ ' + Math.round(total).toLocaleString();
  document.getElementById('rTotalUSD').textContent = '~$' + Math.round(totalUSD).toLocaleString() + ' USD';
}

// Keyboard support for checklist items
document.querySelectorAll('.checklist-item').forEach(c => {
  c.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCheck(c);
    }
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadChecklist();
  calcCosts();
});
