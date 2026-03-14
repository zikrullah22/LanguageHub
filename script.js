/**
 * LanguageHub - Main JavaScript
 * Handles routing, booking system, coin wallet, and UI interactions
 */

// ==================== Configuration ====================
const CONFIG = {
  MEET_LINK: 'https://meet.google.com/bea-uebs-hfc',
  STORAGE_KEYS: {
    COINS: 'lhub_coins',
    BOOKINGS: 'lhub_bookings',
    LAST_COIN_REWARD: 'lhub_last_coin_reward',
    LAST_COIN_PURCHASE: 'last_coin_purchase'
  },
  INITIAL_COINS: 30
};

// ==================== Demo Data ====================
const TEACHERS = [
  { id: 't1', name: 'Faizan', photo: 'faizan.jpg', langs: ['Pashto', 'Farsi', 'English'], mainLang: 'Pashto', fee: 20, rating: 4.9, bio: 'Beginner to advanced. Conversational focus.' },
  { id: 't2', name: 'Abdulkarem', photo: 'abdulkarem.jpg', langs: ['Hausa language', 'English'], mainLang: 'Hausa language', fee: 18, rating: 4.8, bio: 'Grammar + speaking drills.' },
  { id: 't3', name: 'Anas', photo: 'anas.jpg', langs: ['Arabic', 'English'], mainLang: 'Arabic', fee: 22, rating: 4.7, bio: 'MSA + dialects (Levant/Gulf).' },
  { id: 't4', name: 'Muhib', photo: 'muhib.jpg', langs: ['Arabic', 'English'], mainLang: 'English', fee: 19, rating: 4.8, bio: 'Tones & conversation with real-life dialogs.' },
  { id: 't5', name: 'Arsikin', photo: 'arsikin.jpg', langs: ['ภาษาไทย(Thai language)', 'Malay language'], mainLang: 'Thai', fee: 15, rating: 4.6, bio: 'Learn Pidgin basics and slang.' },
  { id: 't6', name: 'Fangi', photo: 'fangi.jpg', langs: ['Malay', 'English'], mainLang: 'English', fee: 25, rating: 4.9, bio: 'IELTS prep and business English.' }
];

const RESOURCES = [
  // Malay
  { id: 'r1', type: 'pdf', lang: 'Malay', title: 'Kata Ganti Nama Diri (Pronouns)', url: 'Pronouns_20250517_182307_0000.pdf', cover: 'Screenshot 2025-09-01 125048.png' },
  { id: 'r2', type: 'pdf', lang: 'Malay', title: 'Bahasa Melayu Grammar Guide', url: 'practicalmalaygr00sheliala.pdf', cover: 'Screenshot 2025-09-09 100158.png' },

  // Pashto
  { id: 'r3', type: 'pdf', lang: 'Pashto', title: 'Pashto – An Introductory Course', url: 'Pashto_introductory_course.pdf', cover: 'Pashto_introductory_student_SvBWZPe.jpg' },
  { id: 'r4', type: 'pdf', lang: 'Pashto', title: 'Pashto_Textbook', url: 'Beginning_Pashto_Textbook_Revised_Edition.pdf', cover: 'Screenshot 2025-09-09 100330.png' },

  // Thai
  { id: 'r8', type: 'pdf', lang: 'Thai', title: 'Speak Thai in 15 Days (Book 1)', url: 'Example-SpeakThaiin15DaysLevel1z-z1674646948250.pdf', cover: 'Screenshot 2025-09-01 130514.png' },
  { id: 'r9', type: 'pdf', lang: 'Thai', title: 'Speak Thai in 15 Days (Book 1)', url: 'Example-SpeakThaiin15DaysLevel1z-z1674646948250.pdf', cover: 'Screenshot 2025-09-01 130910.png' },
  { id: 'r10', type: 'site', lang: 'Thai', title: 'ThaiPod101 – Pronunciation', url: 'https://www.thaipod101.com/thai-pronunciation/', cover: 'Screenshot 2025-09-09 094927.png' },
  { id: 'r11', type: 'site', lang: 'Thai', title: 'Loecsen – Learn Thai', url: 'https://www.loecsen.com/en/learn-thai', cover: 'Screenshot 2025-09-09 095113.png' },
  { id: 'r12', type: 'site', lang: 'Thai', title: 'FunEasyLearn – Thai', url: 'https://www.funeasylearn.com/learn-thai', cover: 'Screenshot 2025-09-09 095331.png' },

  // Arabic
  { id: 'r16', type: 'pdf', lang: 'Arabic', title: 'دروس-اللغة-العربية-Madinah', url: 'دروس-اللغة-العربية-Madinah-Book-1.pdf', cover: 'Screenshot 2025-09-09 095757.png' },
  { id: 'r17', type: 'pdf', lang: 'Arabic', title: 'Arabic Grammar Workbook', url: 'Arabic_Grammar_Workbook.pdf', cover: 'https://placehold.co/300x200/8b5cf6/ffffff?text=Arabic+Grammar' },
  { id: 'r18', type: 'site', lang: 'Arabic', title: 'Madinah Arabic', url: 'https://madinaharabic.com/', cover: 'Screenshot 2025-09-09 095421.png' },
  { id: 'r19', type: 'site', lang: 'Arabic', title: 'ArabicPod101', url: 'https://www.arabicpod101.com/', cover: 'Screenshot 2025-09-09 095630.png' },

  // Hausa
  { id: 'r21', type: 'pdf', lang: 'Hausa', title: 'Hausa Basic Course (FSI)', url: 'Hausa_Basic_Course.pdf', cover: 'Screenshot 2025-09-09 102537.png' },
  { id: 'r22', type: 'pdf', lang: 'Hausa', title: 'HCARON_Hausa_SKETCH_', url: 'CARON_Hausa_SKETCH_2013-10-02.pdf', cover: 'Screenshot 2025-09-09 103141.png' },
  { id: 'r23', type: 'site', lang: 'Hausa', title: 'FSI Hausa Language Course', url: 'https://www.livelingua.com/project/fsi/hausa?hl=en-US', cover: 'Screenshot 2025-09-09 101023.png' },
  { id: 'r24', type: 'site', lang: 'Hausa', title: 'UIowa – Hausa Language & Culture Resources', url: 'https://clcl.uiowa.edu/language-resources/hausa-language-and-culture-resources?hl=en-US', cover: 'Screenshot 2025-09-09 102224.png' },
  { id: 'r25', type: 'site', lang: 'Hausa', title: 'The Africa Institute – Learn Hausa', url: 'https://www.theafricainstitute.org/study/learn-hausa/?hl=en-US', cover: 'Screenshot 2025-09-09 101544.png' },
  { id: 'r27', type: 'site', lang: 'Hausa', title: 'Bloom Library – Hausa Talking Books', url: 'https://bloomlibrary.org/talking-books/:language:ha', cover: 'Screenshot 2025-09-09 101959.png' },

  // Nigerian Pidgin
  { id: 'r28', type: 'site', lang: 'Nigerian Pidgin', title: 'Pidgin Naija Resources', url: 'https://en.wikipedia.org/wiki/Nigerian_Pidgin', cover: 'Screenshot 2025-09-09 102312.png' }
];

// ==================== Storage Management ====================
const coins = {
  init() {
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.COINS)) {
      localStorage.setItem(CONFIG.STORAGE_KEYS.COINS, String(CONFIG.INITIAL_COINS));
    }
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_COIN_REWARD)) {
      localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_COIN_REWARD, '0');
    }
  },
  get() {
    return Number(localStorage.getItem(CONFIG.STORAGE_KEYS.COINS) || '0');
  },
  set(n) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.COINS, String(n));
    updateCoinUI();
  },
  add(n) {
    this.set(this.get() + n);
  },
  spend(n) {
    const balance = this.get();
    if (balance < n) throw new Error('Not enough coins');
    this.set(balance - n);
  }
};

const bookings = {
  list() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.BOOKINGS) || '[]');
    } catch {
      return [];
    }
  },
  add(booking) {
    const arr = this.list();
    arr.push(booking);
    localStorage.setItem(CONFIG.STORAGE_KEYS.BOOKINGS, JSON.stringify(arr));
  },
  remove(id) {
    const arr = this.list().filter(x => x.id !== id);
    localStorage.setItem(CONFIG.STORAGE_KEYS.BOOKINGS, JSON.stringify(arr));
  }
};

// ==================== Utility Functions ====================
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function fmtDate(dt) {
  try {
    const d = new Date(dt);
    return d.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return dt;
  }
}

function el(strings, ...vals) {
  const html = String.raw({ raw: strings }, ...vals);
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function updateCoinUI() {
  const coinCount = $('#coinCount');
  if (coinCount) {
    coinCount.textContent = coins.get();
    // Add bounce animation
    coinCount.style.animation = 'none';
    coinCount.offsetHeight; // Trigger reflow
    coinCount.style.animation = 'bounce 0.5s ease';
  }
}

// ==================== Toast Notifications ====================
function toast(msg, danger = false) {
  const t = el`<div role="status" style="position:fixed; right:20px; bottom:20px; padding:16px 24px; border-radius:12px; background:${danger ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'linear-gradient(135deg,#10b981,#059669)'}; color:#fff; font-weight:500; box-shadow:0 10px 40px rgba(0,0,0,.2); z-index:1000; animation:slideInUp 0.3s ease-out;">${danger ? '⚠️' : '✓'} ${msg}</div>`;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => t.remove(), 300);
  }, 2400);
}

// ==================== Router ====================
function setActiveNav() {
  const page = location.hash.slice(1) || 'home';
  $$('nav a').forEach(a => {
    a.setAttribute('aria-current', a.getAttribute('href') === '#' + page ? 'page' : 'false');
  });
}

function showView() {
  const page = location.hash.slice(1) || 'home';
  
  $$('[data-view]').forEach(v => v.classList.add('hide'));
  const view = $('#view-' + page);
  if (view) {
    view.classList.remove('hide');
    // Trigger animations
    view.querySelectorAll('.card').forEach((card, i) => {
      card.style.animationDelay = `${i * 0.1}s`;
    });
  }
  
  setActiveNav();

  if (page === 'teachers') renderTeachersPage();
  if (page === 'classes') renderClassesPage();
  if (page === 'resources') renderResourcesPage();
  if (page === 'home') renderHome();

  // Close mobile menu when navigating
  const navMenu = $('.nav-menu');
  if (navMenu) navMenu.classList.remove('active');
  
  // Reset hamburger animation
  const spans = $$('.menu-toggle span');
  spans.forEach(span => {
    span.style.transform = 'none';
    span.style.opacity = '1';
  });
}

window.addEventListener('hashchange', showView);

// ==================== Teacher UI ====================
function teacherCard(t) {
  return el`<article class="card teacher">
    <div class="media"><img src="${t.photo}" alt="${t.name} — ${t.mainLang} teacher" loading="lazy"></div>
    <div class="card-body">
      <div class="meta" style="margin-bottom:8px;">
        <h3 style="margin:0; font-weight:700;">${t.name}</h3>
        <span class="rating">${t.rating.toFixed(1)}</span>
      </div>
      <span class="tag" style="margin-bottom:12px;">${t.mainLang}</span>
      <p class="muted" style="margin:8px 0 4px 0; font-size:0.9rem;">Also teaches: ${t.langs.filter(l => l !== t.mainLang).join(', ') || 'N/A'}</p>
      <p style="margin:8px 0 16px 0; font-size:0.95rem; line-height:1.6;">${t.bio}</p>
      <div class="meta">
        <span class="price">${t.fee} coins/hr</span>
        <button class="btn primary small" data-book data-id="${t.id}" type="button">Book Now</button>
      </div>
    </div>
  </article>`;
}

function renderHome() {
  const wrap = $('#homeTeacherGrid');
  if (!wrap) return;
  wrap.innerHTML = '';
  TEACHERS.slice(0, 6).forEach(t => wrap.appendChild(teacherCard(t)));
  attachBookHandlers(wrap);
}

function renderTeachersPage() {
  const grid = $('#teacherGrid');
  const filter = $('#langFilter');
  const sort = $('#sortTeachers');

  if (!filter.dataset.ready) {
    filter.appendChild(el`<option value="all">All languages</option>`);
    [...new Set(TEACHERS.flatMap(t => t.langs))].sort().forEach(l => {
      filter.appendChild(el`<option>${l}</option>`);
    });
    filter.dataset.ready = '1';
  }

  function compute() {
    let arr = [...TEACHERS];
    if (filter.value && filter.value !== 'all') {
      arr = arr.filter(t => t.langs.includes(filter.value));
    }
    if (sort.value === 'rating') arr.sort((a, b) => b.rating - a.rating);
    if (sort.value === 'fee') arr.sort((a, b) => a.fee - b.fee);
    if (sort.value === 'name') arr.sort((a, b) => a.name.localeCompare(b.name));
    
    grid.innerHTML = '';
    arr.forEach(t => grid.appendChild(teacherCard(t)));
    attachBookHandlers(grid);
  }

  filter.onchange = compute;
  sort.onchange = compute;
  compute();
}

// ==================== Booking System ====================
const bookingDialog = $('#bookingDialog');

function attachBookHandlers(root = document) {
  $$('[data-book]', root).forEach(btn => {
    btn.addEventListener('click', () => {
      const t = TEACHERS.find(x => x.id === btn.dataset.id);
      if (!t) return;
      bookingDialog.showModal();
      $('#bookingTitle').textContent = `Book ${t.name} — ${t.mainLang}`;
      $('#feeLabel').textContent = t.fee;
      bookingDialog.dataset.teacherId = t.id;
    });
  });
}

if (bookingDialog) {
  bookingDialog.addEventListener('close', () => {
    if (bookingDialog.returnValue !== 'confirm') return;
    
    const t = TEACHERS.find(x => x.id === bookingDialog.dataset.teacherId);
    const dt = $('#slotInput').value;
    const dur = Number($('#durationInput').value);
    
    if (!t) return;
    if (!dt) {
      toast('Choose a date and time', true);
      return;
    }
    
    try {
      coins.spend(t.fee);
      const booking = {
        id: 'b_' + Date.now(),
        teacherId: t.id,
        teacher: t.name,
        lang: t.mainLang,
        datetime: dt,
        duration: dur,
        fee: t.fee,
        joinUrl: CONFIG.MEET_LINK
      };
      bookings.add(booking);
      updateCoinUI();
      toast(`Booked ${t.name} for ${fmtDate(dt)} — ${t.fee} coins spent.`);
      if (location.hash.slice(1) !== 'classes') location.hash = '#classes';
    } catch (e) {
      toast('Not enough coins. Click Buy Coins to purchase more.', true);
    }
    
    $('#slotInput').value = '';
    $('#durationInput').value = '60';
  });
}

// ==================== Classes UI ====================
function renderClassesPage() {
  const arr = bookings.list();
  const empty = $('#classesEmpty');
  const table = $('#classesTableWrap');
  const tbody = $('#classesTbody');
  
  if (!arr.length) {
    empty.classList.remove('hide');
    table.classList.add('hide');
    return;
  }
  
  empty.classList.add('hide');
  table.classList.remove('hide');
  tbody.innerHTML = '';
  
  arr.forEach(b => {
    const tr = el`<tr>
      <td>${b.teacher}</td>
      <td>${b.lang}</td>
      <td>${fmtDate(b.datetime)}</td>
      <td>${b.duration} min</td>
      <td>${b.fee} coins</td>
      <td style="display:flex; gap:8px;">
        <a class="btn small" href="${b.joinUrl}" target="_blank" rel="noopener noreferrer">Join</a>
        <button class="btn small ghost" data-cancel="${b.id}" type="button">Cancel</button>
      </td>
    </tr>`;
    tbody.appendChild(tr);
  });
  
  $$('[data-cancel]').forEach(btn => {
    btn.addEventListener('click', () => {
      bookings.remove(btn.dataset.cancel);
      toast('Booking canceled');
      renderClassesPage();
    });
  });
}

// ==================== Resources UI ====================
function toYouTubeEmbed(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {}
  return null;
}

function resourceCard(r) {
  const media = r.cover
    ? `<div class="media"><img src="${r.cover}" alt="${r.title} cover" loading="lazy"></div>`
    : `<div class="thumb" aria-hidden="true">${r.type === 'video' ? '▶' : 'PDF'}</div>`;
  
  return el`<article class="card resource">
    ${el`${media}`.outerHTML}
    <div class="meta" style="margin-top:8px;">
      <h3 style="margin:0;">${r.title}</h3>
      <span class="tag">${r.lang} · ${r.type.toUpperCase()}</span>
    </div>
    <div style="display:flex; gap:8px; flex-wrap:wrap;">
      <button class="btn small" data-preview="${r.id}" type="button">Preview</button>
      <a class="btn small" href="${r.url}" target="_blank" rel="noopener noreferrer">Open</a>
    </div>
  </article>`;
}

function renderResourcesPage() {
  const langSel = $('#resLang');
  const typeSel = $('#resType');
  const grid = $('#resourceGrid');
  
  if (!langSel.dataset.ready) {
    langSel.appendChild(el`<option value="all">All languages</option>`);
    [...new Set(RESOURCES.map(r => r.lang))].sort().forEach(l => {
      langSel.appendChild(el`<option>${l}</option>`);
    });
    langSel.dataset.ready = '1';
  }

  function compute() {
    let arr = [...RESOURCES];
    if (langSel.value !== 'all') arr = arr.filter(r => r.lang === langSel.value);
    if (typeSel.value !== 'all') arr = arr.filter(r => r.type === typeSel.value);
    
    grid.innerHTML = '';
    arr.forEach(r => grid.appendChild(resourceCard(r)));
    
    if (!arr.length) {
      grid.innerHTML = '<div class="card">No resources match your filters.</div>';
    }
    
    attachResourcePreview(grid);
  }

  langSel.onchange = compute;
  typeSel.onchange = compute;
  compute();
}

function attachResourcePreview(root = document) {
  const dlg = $('#resourceDialog');
  
  root.querySelectorAll('[data-preview]').forEach(btn => {
    btn.addEventListener('click', () => {
      const r = RESOURCES.find(x => x.id === btn.getAttribute('data-preview'));
      if (!r) return;
      
      $('#resourceTitle').textContent = r.title;
      const preview = $('#resourcePreview');
      preview.innerHTML = '';
      
      let node;
      if (r.type === 'video') {
        const yt = toYouTubeEmbed(r.url);
        if (yt) {
          node = document.createElement('iframe');
          node.src = yt;
          node.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
          node.allowFullscreen = true;
          node.width = '100%';
          node.height = '100%';
          node.style.border = '0';
        } else if (r.url.endsWith('.mp4')) {
          node = document.createElement('video');
          node.src = r.url;
          node.controls = true;
          node.style.width = '100%';
          node.style.height = '100%';
        }
      } else if (r.type === 'pdf' || r.type === 'site') {
        node = document.createElement('iframe');
        node.src = r.url;
        node.width = '100%';
        node.height = '100%';
        node.style.border = '0';
      }
      
      if (!node) {
        node = document.createElement('div');
        node.textContent = 'Preview not available. Use Open to view in a new tab.';
      }
      
      preview.appendChild(node);
      $('#resourceOpenBtn').href = r.url;
      dlg.showModal();
    });
  });
}

// ==================== Lightbox ====================
function setupLightbox() {
  const modal = document.getElementById('shotModal');
  if (!modal) return;
  
  const img = document.getElementById('shotModalImg');
  const caption = document.getElementById('shotModalCaption');
  const closeBtn = document.getElementById('shotClose');

  document.querySelectorAll('#screenshotGrid .shot').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      img.src = link.getAttribute('href');
      caption.textContent = link.dataset.caption || '';
      modal.showModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.close());
  }
  
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const outside = e.clientX < rect.left || e.clientX > rect.right || 
                    e.clientY < rect.top || e.clientY > rect.bottom;
    if (outside) modal.close();
  });
}

// ==================== Mobile Menu ====================
function setupMobileMenu() {
  const menuToggle = $('.menu-toggle');
  const navMenu = $('.nav-menu');
  
  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    const spans = $$('.menu-toggle span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// ==================== Contact Form ====================
function setupContactForm() {
  const contactForm = $('#contactForm');
  const successMessage = $('#successMessage');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const phone = $('#phone').value.trim();
    const message = $('#message').value.trim();

    if (!name || !email || !phone || !message) {
      toast('Please fill in all fields', true);
      return;
    }

    const formData = new FormData(this);

    fetch(this.action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        successMessage.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      toast('Error submitting form. Please try again.', true);
    });
  });
}

// ==================== Coin Purchase ====================
function setupCoinPurchase() {
  const buyBtn = document.getElementById('buyCoinsBtn');
  const modal = document.getElementById('coinPurchaseModal');
  
  if (!buyBtn || !modal) return;

  buyBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
}

function openPurchase() {
  document.getElementById('coinPurchaseModal').style.display = 'flex';
}

function closePurchase() {
  document.getElementById('coinPurchaseModal').style.display = 'none';
}

function confirmPurchase() {
  coins.add(100);
  localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_COIN_PURCHASE, Date.now());
  updateCoinUI();
  toast('100 coins added (purchase successful)!');
  closePurchase();
}

// Make functions globally available
window.openPurchase = openPurchase;
window.closePurchase = closePurchase;
window.confirmPurchase = confirmPurchase;

// ==================== Scroll Effects ====================
function setupScrollEffects() {
  // Header shadow on scroll
  const header = $('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll('.fade-in-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));
}

// ==================== App Initialization ====================
document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Initialize coins
  coins.init();
  updateCoinUI();

  // Prevent closing booking dialog with ESC
  const bookingDlg = document.getElementById('bookingDialog');
  if (bookingDlg) {
    bookingDlg.addEventListener('cancel', (e) => e.preventDefault());
  }

  // Setup all features
  setupMobileMenu();
  setupContactForm();
  setupLightbox();
  setupCoinPurchase();
  setupScrollEffects();

  // Default route
  if (!location.hash) location.hash = '#home';
  showView();
});
