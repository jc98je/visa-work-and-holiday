/* ========================================
   HOME PAGE JS - Visa Work & Holiday
   ======================================== */

// Firebase Config - Credenciales reales
const firebaseConfig = {
  apiKey: "AIzaSyC1xxrXlRo7MjEqCOD3te-nfWv6Aof3MrE",
  authDomain: "pinpon-77a21.firebaseapp.com",
  projectId: "pinpon-77a21",
  storageBucket: "pinpon-77a21.firebasestorage.app",
  messagingSenderId: "538191080129",
  appId: "1:538191080129:web:0a19e177c0b0b803f7c240"
};

// Inicializar Firebase
let auth = null;
let db = null;
let currentUser = null;

function initFirebase() {
  try {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    console.log('Firebase inicializado correctamente');

    // Escuchar cambios de autenticacion
    auth.onAuthStateChanged((user) => {
      currentUser = user;
      updateUIForAuth(user);
      // Si habia un pendiente de redirect, ir a mi-proceso
      if (user && pendingRedirect) {
        pendingRedirect = false;
        window.location.href = 'mi-proceso.html';
      }
      // Si habia un pendiente de redirect para guia, ir a ielts-guia
      if (user && pendingGuideRedirect) {
        pendingGuideRedirect = false;
        window.location.href = 'pages/ielts-guia.html';
      }
    });
  } catch (error) {
    console.log('Firebase no disponible:', error.message);
  }
}

initFirebase();

// ==========================================
// AUTH FUNCTIONS
// ==========================================

// Login con Google
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log('Login exitoso:', result.user.displayName);
      closeLoginModal();
      // Guardar progreso del checklist en Firestore si es usuario nuevo
      saveChecklistToFirestore();
    })
    .catch((error) => {
      console.error('Error en login:', error.message);
      alert('Error al iniciar sesion: ' + error.message);
    });
}

// Login con email/password
function loginWithEmail(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log('Login exitoso:', result.user.email);
      closeLoginModal();
      saveChecklistToFirestore();
    })
    .catch((error) => {
      console.error('Error en login:', error.message);
      if (error.code === 'auth/user-not-found') {
        // Si no existe, crear cuenta
        if (confirm('No tienes cuenta. ¿Quieres crear una?')) {
          registerWithEmail(email, password);
        }
      } else {
        alert('Error: ' + error.message);
      }
    });
}

// Registro con email/password
function registerWithEmail(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log('Registro exitoso:', result.user.email);
      closeLoginModal();
      saveChecklistToFirestore();
    })
    .catch((error) => {
      console.error('Error en registro:', error.message);
      alert('Error al crear cuenta: ' + error.message);
    });
}

// Cerrar sesion
function logout() {
  auth.signOut()
    .then(() => {
      console.log('Sesion cerrada');
      // Recargar para limpiar el estado
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error al cerrar sesion:', error.message);
    });
}

// ==========================================
// UI FUNCTIONS
// ==========================================

// Actualizar UI segun estado de autenticacion
function updateUIForAuth(user) {
  const loginBtn = document.getElementById('loginBtn');
  const userMenu = document.getElementById('userMenu');
  const userName = document.getElementById('userName');

  if (user) {
    // Usuario logueado
    if (loginBtn) loginBtn.style.display = 'none';
    if (userMenu) {
      userMenu.style.display = 'flex';
      if (userName) {
        userName.textContent = user.displayName || user.email.split('@')[0];
      }
    }
    // Cargar checklist desde Firestore
    loadChecklistFromFirestore();
  } else {
    // No logueado
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (userMenu) userMenu.style.display = 'none';
  }
}

// Modal de login
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Manejar formularios
function handleEmailLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  loginWithEmail(email, password);
}

function handleEmailRegister(e) {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirm = document.getElementById('registerConfirm').value;

  if (password !== confirm) {
    alert('Las contrasenas no coinciden');
    return;
  }
  if (password.length < 6) {
    alert('La contrasena debe tener al menos 6 caracteres');
    return;
  }
  registerWithEmail(email, password);
}

// ==========================================
// FIRESTORE FUNCTIONS
// ==========================================

// Guardar checklist en Firestore
function saveChecklistToFirestore() {
  if (!currentUser || !db) return;

  const items = document.querySelectorAll('.checklist-item');
  const state = {};
  items.forEach(item => {
    state[item.dataset.id] = item.classList.contains('checked');
  });

  db.collection('users').doc(currentUser.uid).set({
    checklist: state,
    lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    email: currentUser.email,
    displayName: currentUser.displayName || ''
  }, { merge: true })
  .then(() => console.log('Checklist guardado en Firestore'))
  .catch((error) => console.error('Error guardando:', error));
}

// Cargar checklist desde Firestore
function loadChecklistFromFirestore() {
  if (!currentUser || !db) return;

  db.collection('users').doc(currentUser.uid).get()
    .then((doc) => {
      if (doc.exists && doc.data().checklist) {
        const state = doc.data().checklist;
        const items = document.querySelectorAll('.checklist-item');
        items.forEach(item => {
          if (state[item.dataset.id]) {
            item.classList.add('checked');
            item.setAttribute('aria-checked', 'true');
          } else {
            item.classList.remove('checked');
            item.setAttribute('aria-checked', 'false');
          }
        });
        updateProgress();
        generateRecommendations();
        console.log('Checklist cargado desde Firestore');
      }
    })
    .catch((error) => console.error('Error cargando:', error));
}

// ==========================================
// EXISTING FUNCTIONS
// ==========================================

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
  // Si esta logueado, guardar en Firestore tambien
  if (currentUser) {
    saveChecklistToFirestore();
  }
}

// Save/Load checklist to localStorage (funciona sin login)
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

  const progressPercent = document.getElementById('progressPercent');
  const progressFill = document.getElementById('progressFill');
  const progressCount = document.getElementById('progressCount');
  const progressMsg = document.getElementById('progressMsg');

  if (progressPercent) progressPercent.textContent = percent + '%';
  if (progressFill) progressFill.style.width = percent + '%';
  if (progressCount) progressCount.textContent = checked + ' de ' + total + ' documentos';

  const msgs = ['Sigue asi!', 'Buen progreso!', 'Casi listo!', 'Excelente!', '🎉 Todo listo!'];
  const idx = Math.min(Math.floor(percent / 25), msgs.length - 1);
  if (progressMsg) progressMsg.textContent = msgs[idx];

  // Update hero stats
  const heroProgress = document.getElementById('heroProgress');
  const heroEnglish = document.getElementById('heroEnglish');
  const heroNextStep = document.getElementById('heroNextStep');

  if (heroProgress) heroProgress.textContent = checked + ' de ' + total;
  
  const inglesItem = document.querySelector('[data-id="ingles"]');
  const inglesChecked = inglesItem && inglesItem.classList.contains('checked');
  if (heroEnglish) heroEnglish.textContent = inglesChecked ? 'Certificado listo' : 'Sin evaluar';
  
  if (heroNextStep) {
    if (percent < 25) heroNextStep.textContent = 'Empezar';
    else if (percent < 50) heroNextStep.textContent = 'Documentos';
    else if (percent < 75) heroNextStep.textContent = 'Examen ingles';
    else if (percent < 100) heroNextStep.textContent = 'Casi listo!';
    else heroNextStep.textContent = 'Viaja!';
  }
}

// Recommendations Engine
function generateRecommendations() {
  const recoList = document.getElementById('recoList');
  if (!recoList) return;
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
        link: '#carta-mre',
        linkText: 'Ver info de la Carta'
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
          ${r.link ? `<a href="${r.link}">${r.linkText} →</a>` : ''}
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

// Start Process - require login first
let pendingRedirect = false;
let pendingGuideRedirect = false;

function startProcess() {
  if (currentUser) {
    window.location.href = 'mi-proceso.html';
  } else {
    pendingRedirect = true;
    openLoginModal();
  }
}

// Start Guide - require login first
function startGuide() {
  if (currentUser) {
    window.location.href = 'pages/ielts-guia.html';
  } else {
    pendingGuideRedirect = true;
    openLoginModal();
  }
}

// ==========================================
// USER DROPDOWN
// ==========================================

function toggleUserDropdown(e) {
  e.stopPropagation();
  const menu = document.getElementById('userDropdownMenu');
  const arrow = document.querySelector('.user-dropdown-arrow');
  if (menu) {
    menu.classList.toggle('show');
    if (arrow) arrow.style.transform = menu.classList.contains('show') ? 'rotate(180deg)' : '';
  }
}

function closeUserDropdown() {
  const menu = document.getElementById('userDropdownMenu');
  const arrow = document.querySelector('.user-dropdown-arrow');
  if (menu) menu.classList.remove('show');
  if (arrow) arrow.style.transform = '';
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('userDropdownMenu');
  if (menu && !e.target.closest('.user-dropdown') && !e.target.closest('.user-dropdown-menu')) {
    closeUserDropdown();
  }
  const modal = document.getElementById('loginModal');
  if (modal && e.target === modal) {
    closeLoginModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLoginModal();
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  calcCosts();
});