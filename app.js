/* =========================================================
   CIT — Certified International Team | Emirates Branch
   Shared front-end logic (no backend — data lives in
   localStorage on this browser only).
   ========================================================= */


const CIT = {
  WHATSAPP_UAE: "971565602630",
  WHATSAPP_UAE_2: "971504084556",
  WHATSAPP_EG: "201066301038",
  WHATSAPP_GROUP: "https://chat.whatsapp.com/F27X0nnYdzM5HH4cSkR1bi",
  FACEBOOK_URL: "https://www.facebook.com/certifiedInternationalteam.net?locale=ar_AR",
  INSTAGRAM_URL: "https://www.instagram.com/citinternational2023?igsh=cjhwNzh3dGcyb3Q3",
  ADMIN_PASSWORD: "CIT2026",
  STORAGE_KEY: "cit_submissions",
  ADMIN_SESSION_KEY: "cit_admin_session",
  THEME_KEY: "cit_theme",
  LANG_KEY: "cit_lang",

  // ---- Google Sheets integration ----
  // 1) GOOGLE_SHEET_WEBAPP_URL: the Apps Script Web App "exec" URL that
  //    receives new registrations and appends them as rows.
  // 2) GOOGLE_SHEET_VIEW_URL: the normal shareable link to the Google
  //    Sheet itself, so admins can open it directly from the dashboard.
  // Leave both empty ("") to keep the site working exactly as before
  // (local-only). See GOOGLE_SHEETS_SETUP.md for the step-by-step guide.
  GOOGLE_SHEET_WEBAPP_URL: "https://script.google.com/macros/s/AKfycbz9o8k2m_klcyUh1EG0hf77A9pClz7rHqJQgQXkINMZE-mgzvdkI6AdsBGhMQO2mjNY/exec",
  GOOGLE_SHEET_VIEW_URL: "https://docs.google.com/spreadsheets/d/1XyfjXYpJfH6J4pJFqfb_8KQrJGaJ-CJ9kRwgo8JqUVI/edit?gid=0#gid=0",
};

/* ================= Theme (dark / light) ================= */
function getStoredTheme() {
  return localStorage.getItem(CIT.THEME_KEY) || "dark";
}
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(CIT.THEME_KEY, theme);
}
function initTheme() {
  applyTheme(getStoredTheme());
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });
  });
}

/* ================= Language (ar / en) ================= */
const TRANSLATIONS = {
  topAddress: { ar: "أبوظبي - شارع الكرامة", en: "Abu Dhabi - Al Karama Street" },
  navAbout: { ar: "من نحن", en: "About" },
  navCourses: { ar: "الكورسات", en: "Courses" },
  navRequirements: { ar: "شروط الالتحاق", en: "Requirements" },
  navContact: { ar: "تواصل معنا", en: "Contact" },
  navHome: { ar: "الرئيسية", en: "Home" },
  navRegister: { ar: "سجّل الآن", en: "Register Now" },
  navContactCta: { ar: "تواصل معنا", en: "Contact Us" },
  heroEyebrow: { ar: "Emirates Branch — الفريق الدولي المعتمد", en: "Emirates Branch — Certified International Team" },
  heroTitle: {
    ar: "تدريب معتمد يفتح لك <em>أبواب المستقبل</em> المهني",
    en: "Certified training that opens the <em>doors of your future</em>",
  },
  heroSub: {
    ar: "CIT فرع الإمارات يقدّم برامج تدريبية معتمدة دوليًا في الحاسب الآلي، اللغات، والمستويات العامة — بإشراف مدربين محترفين وشهادات معترف بها.",
    en: "CIT Emirates Branch offers internationally certified training programs in computer skills, languages, and general levels — supervised by professional trainers with recognized certificates.",
  },
  heroBrowse: { ar: "تصفّح الكورسات", en: "Browse Courses" },
  heroContact: { ar: "تواصل معنا", en: "Contact Us" },
  statCourses: { ar: "كورس ومستوى معتمد", en: "Certified Courses & Levels" },
  statLangs: { ar: "لغات عالمية", en: "World Languages" },
  statOneToOne: { ar: "تدريب فردي وجماعي", en: "Individual & Group Training" },
  statAttendance: { ar: "حد أدنى للحضور للشهادة", en: "Min. Attendance for Certificate" },
  aboutEyebrow: { ar: "من نحن", en: "About Us" },
  aboutTitle: { ar: "الفريق الدولي المعتمد — Certified International Team", en: "Certified International Team — CIT" },
  aboutP1: {
    ar: "معهد تدريبي متخصص في تأهيل الأفراد والشركات عبر برامج معتمدة تجمع بين الجودة الأكاديمية والتطبيق العملي، بإشراف استشاريين تعليميين ومدربين معتمدين في فرع الإمارات.",
    en: "A specialized training institute qualifying individuals and companies through certified programs that combine academic quality with practical application, supervised by educational consultants and certified trainers at the Emirates branch.",
  },
  aboutP2: {
    ar: "نوفّر مسارات تدريب فردي (One to One) وجماعي (Group)، مع متابعة دقيقة لكل متدرب حتى الحصول على الشهادة المعتمدة.",
    en: "We provide One to One and Group training tracks, with close follow-up for every trainee until they earn their certified certificate.",
  },
  aboutLi1: { ar: "شهادات معتمدة دوليًا بعد اجتياز الاختبار بنجاح 70%+", en: "Internationally certified certificates after passing the exam with 70%+" },
  aboutLi2: { ar: "جداول تدريب مرنة بالتنسيق مع قسم الكوردينيشن", en: "Flexible training schedules coordinated with our scheduling team" },
  aboutLi3: { ar: "استشاري تعليمي مخصص لمتابعة كل متدرب", en: "A dedicated educational consultant to follow up with every trainee" },
  aboutImgAlt: { ar: "قاعة تدريب CIT", en: "CIT training hall" },
  coursesEyebrow: { ar: "الدورات", en: "Courses" },
  coursesTitle: { ar: "اختر برنامجك التدريبي", en: "Choose Your Training Program" },
  coursesDesc: {
    ar: 'اضغط على "سجّل الآن" بجانب أي كورس لفتح استمارة التسجيل الرسمية معبّأة مسبقًا باسم الكورس.',
    en: 'Click "Register Now" next to any course to open the official registration form pre-filled with that course.',
  },
  tabLanguages: { ar: "اللغات", en: "Languages" },
  courseRegister: { ar: "سجّل الآن", en: "Register Now" },
  courseComputerSub: { ar: "CIT.Computer — ", en: "CIT.Computer — " },
  reqEyebrow: { ar: "شروط الالتحاق", en: "Requirements" },
  reqTitle: { ar: "شروط الالتحاق بالتدريب", en: "Training Enrollment Requirements" },
  req1Title: { ar: "الحجز والدفع", en: "Booking & Payment" },
  req1Desc: { ar: "يجب دفع 30% على الأقل من قيمة الدورة لتأكيد الحجز، ويُخصم هذا المبلغ من القيمة الإجمالية ولا يُسترد عند الإلغاء.", en: "At least 30% of the course value must be paid to confirm booking. This amount is deducted from the total and is non-refundable upon cancellation." },
  req2Title: { ar: "الحضور والغياب", en: "Attendance" },
  req2Desc: { ar: "في التدريب الجماعي لا يحق طلب إعادة المحاضرة الفائتة، أما الخاص فيحق الاعتذار مرتين كحد أقصى بإخطار مسبق 4 ساعات.", en: "In group training, a missed lecture cannot be repeated. In private training, you may excuse yourself up to twice with at least 4 hours' notice." },
  req3Title: { ar: "الحصول على الشهادة", en: "Getting the Certificate" },
  req3Desc: { ar: "يشترط حضور 75% من ساعات التدريب على الأقل، ونسبة نجاح لا تقل عن 70% في اختبار الدورة لاستخراج الشهادة.", en: "Requires at least 75% attendance of training hours, and a passing score of at least 70% on the course exam to issue the certificate." },
  contactEyebrow: { ar: "تواصل معنا", en: "Contact Us" },
  contactTitle: { ar: "نحن في خدمتك دائمًا", en: "We're Always at Your Service" },
  contactUaeLabel: { ar: "الإمارات (فرع الإمارات)", en: "UAE (Emirates Branch)" },
  contactEgLabel: { ar: "مصر", en: "Egypt" },
  contactEmailLabel: { ar: "البريد الإلكتروني", en: "Email" },
  contactAddressLabel: { ar: "العنوان", en: "Address" },
  contactPanelTitle: { ar: "جاهز تبدأ رحلتك التدريبية؟", en: "Ready to Start Your Training Journey?" },
  contactPanelDesc: {
    ar: "سجّل بياناتك الآن وسيتواصل معك فريق CIT عبر واتساب لتأكيد التسجيل وتحديد موعد أول محاضرة.",
    en: "Register your details now and the CIT team will reach out to you on WhatsApp to confirm enrollment and set your first session.",
  },
  contactPanelBtn: { ar: "فتح استمارة التسجيل", en: "Open Registration Form" },
  footerBrandDesc: { ar: "الفريق الدولي المعتمد — فرع الإمارات. تدريب معتمد في الحاسب الآلي، اللغات، والمستويات العامة.", en: "Certified International Team — Emirates Branch. Certified training in computer skills, languages, and general levels." },
  footerQuickLinks: { ar: "روابط سريعة", en: "Quick Links" },
  footerRegForm: { ar: "استمارة التسجيل", en: "Registration Form" },
  footerAdminPanel: { ar: "لوحة الإدمن", en: "Admin Panel" },
  footerContact: { ar: "تواصل معنا", en: "Contact Us" },
  footerFollow: { ar: "تابعنا", en: "Follow Us" },
  footerRights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  fullNamePH: { ar: "الاسم بالكامل", en: "Full name" },
  formTitle: { ar: "استمارة تسجيل", en: "Registration Form" },
  formDesc: { ar: "من فضلك أكمل جميع البيانات المطلوبة بدقة — سيتم التواصل معك لتأكيد التسجيل.", en: "Please complete all required fields accurately — we will contact you to confirm your registration." },
  bannerPrefix: { ar: "الكورس المختار:", en: "Selected course:" },
  bannerSuffix: { ar: "(يمكنك تعديل أو إضافة كورسات أخرى بالأسفل)", en: "(you can edit or add other courses below)" },
  submitBtn: { ar: "إرسال بيانات التسجيل", en: "Submit Registration" },
  formNote: { ar: "بالضغط على إرسال، سيتم حفظ بياناتك وإرسالها لإدارة CIT عبر واتساب.", en: "By clicking submit, your data will be saved and sent to the CIT team via WhatsApp." },
  clearSignature: { ar: "مسح التوقيع", en: "Clear Signature" },
  signHint: { ar: "وقّع هنا بالماوس أو باللمس", en: "Sign here with mouse or touch" },
  adminBrandSub: { ar: "لوحة تحكم الإدمن — فرع الإمارات", en: "Admin Dashboard — Emirates Branch" },
  adminPasswordPH: { ar: "كلمة المرور", en: "Password" },
  adminLogout: { ar: "تسجيل الخروج", en: "Log Out" },
  adminLoginTitle: { ar: "دخول لوحة الإدمن", en: "Admin Panel Login" },
  adminLoginDesc: { ar: "هذه الصفحة مخصصة لإدارة CIT فقط لمتابعة طلبات التسجيل الواردة.", en: "This page is for CIT management only, to review incoming registration requests." },
  adminLoginBtn: { ar: "دخول", en: "Log In" },
  adminLoginErr: { ar: "كلمة المرور غير صحيحة، حاول مرة أخرى.", en: "Incorrect password, please try again." },
  adminHint: {
    ar: "هذه لوحة تجريبية تعمل بالكامل من المتصفح (بدون سيرفر خارجي)، وبيانات التسجيل محفوظة محليًا على هذا الجهاز فقط. لربط اللوحة بقاعدة بيانات حقيقية يمكن ربط الاستمارة بخدمة خلفية (Backend / Google Sheets / CRM).",
    en: "This is a demo panel that runs entirely in the browser (no external server); registration data is stored locally on this device only. To connect it to a real database, the form can be linked to a backend service (Backend / Google Sheets / CRM).",
  },
  adminDashTitle: { ar: "طلبات التسجيل الواردة", en: "Incoming Registration Requests" },
  adminAddNew: { ar: "+ إضافة طلب جديد", en: "+ Add New Request" },
  adminClearAll: { ar: "حذف الكل", en: "Delete All" },
  adminOpenSheet: { ar: "📊 فتح جدول جوجل شيت", en: "📊 Open Google Sheet" },
  adminStatTotal: { ar: "إجمالي الطلبات", en: "Total Requests" },
  adminStatToday: { ar: "طلبات اليوم", en: "Today's Requests" },
  adminStatCourses: { ar: "كورسات مختلفة مطلوبة", en: "Distinct Courses Requested" },
  adminThDate: { ar: "التاريخ", en: "Date" },
  adminThName: { ar: "الاسم", en: "Name" },
  adminThMobile: { ar: "الموبايل", en: "Mobile" },
  adminThCourses: { ar: "الكورسات", en: "Courses" },
  adminThPayment: { ar: "الدفع", en: "Payment" },
  adminThActions: { ar: "إجراءات", en: "Actions" },
  adminEmptyState: { ar: "لا توجد طلبات تسجيل حتى الآن.", en: "No registration requests yet." },
  adminBtnDetails: { ar: "التفاصيل", en: "Details" },
  adminBtnWhatsApp: { ar: "واتساب", en: "WhatsApp" },
  adminBtnDelete: { ar: "حذف", en: "Delete" },
  adminModalTitle: { ar: "تفاصيل طلب التسجيل", en: "Registration Request Details" },
  adminFooterTag: { ar: "Admin Panel", en: "Admin Panel" },
};

function getStoredLang() {
  return localStorage.getItem(CIT.LANG_KEY) || "ar";
}
function applyLanguage(lang) {
  document.documentElement.setAttribute("lang", lang === "ar" ? "ar" : "en");
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  localStorage.setItem(CIT.LANG_KEY, lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const entry = TRANSLATIONS[el.dataset.i18n];
    if (!entry) return;
    if (el.dataset.i18nHtml !== undefined) {
      el.innerHTML = entry[lang];
    } else {
      el.textContent = entry[lang];
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const entry = TRANSLATIONS[el.dataset.i18nPlaceholder];
    if (entry) el.setAttribute("placeholder", entry[lang]);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const entry = TRANSLATIONS[el.dataset.i18nAlt];
    if (entry) el.setAttribute("alt", entry[lang]);
  });

  document.querySelectorAll(".lang-btn .lang-label").forEach((el) => {
    el.textContent = lang === "ar" ? "EN" : "AR";
  });

  if (typeof renderIndexCourses === "function") renderIndexCourses(lang);
  if (typeof renderAdminTable === "function" && document.getElementById("adminTableBody")) renderAdminTable();
}
function initLanguage() {
  const lang = getStoredLang();
  applyLanguage(lang);
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
      applyLanguage(current === "ar" ? "en" : "ar");
    });
  });
}
function t(key) {
  const lang = getStoredLang();
  const entry = TRANSLATIONS[key];
  return entry ? entry[lang] : key;
}

/* ---------------- Mobile nav ---------------- */
function initNav() {
  const btn = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
    btn.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.classList.remove("open");
    })
  );
}

/* ---------------- Reveal on scroll ---------------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------------- Course tabs (index page) ---------------- */
function initCourseTabs() {
  const tabs = document.querySelectorAll(".course-tab");
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((tb) => tb.classList.remove("active"));
      tab.classList.add("active");
      document
        .querySelectorAll(".course-group")
        .forEach((g) => g.classList.remove("active"));
      document
        .getElementById(tab.dataset.target)
        .classList.add("active");
    });
  });
}

/* ---------------- Course catalogue (index page) ---------------- */
const CIT_LEVELS = ["Foundation", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11"];
const CIT_LANGUAGES = [
  { en: "Arabic Language", ar: "اللغة العربية" },
  { en: "English Language", ar: "اللغة الانجليزية" },
  { en: "Turkish Language", ar: "اللغة التركية" },
  { en: "Spanish Language", ar: "اللغة الأسبانية" },
  { en: "Italian Language", ar: "اللغة الايطالية" },
  { en: "Korean Language", ar: "اللغة الكورية" },
  { en: "French Language", ar: "اللغة الفرنسية" },
  { en: "German Language", ar: "اللغة الألمانية" },
];
const CIT_COMPUTER_COURSES = [
  { en: "MOS", ar: "شهادة MOS" },
  { en: "MCE", ar: "شهادة MCE" },
  { en: "IC3", ar: "شهادة IC3" },
  { en: "AI", ar: "الذكاء الاصطناعي" },
  { en: "Digital Marketing", ar: "التسويق الرقمي" },
  { en: "Digital Teacher", ar: "المعلم الرقمي" },
  { en: "Digital Content Management", ar: "إدارة المحتوى الرقمي" },
  { en: "Programming", ar: "البرمجة" },
  { en: "Finance", ar: "المالية" },
  { en: "Human Resources", ar: "الموارد البشرية" },
  { en: "Photoshop", ar: "فوتوشوب" },
];
const iconCheck = `<svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>`;
const iconArrow = `<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>`;

function courseCard(code, title, sub) {
  const encoded = encodeURIComponent(code);
  return `
  <div class="course-card">
    <div class="cc-top">
      <div class="cc-icon">${iconCheck}</div>
      <div class="cc-code">CIT</div>
    </div>
    <h4>${title}</h4>
    <p class="cc-sub">${sub || ""}</p>
    <a class="cc-register" href="form.html?course=${encoded}">
      ${t("courseRegister")} ${iconArrow}
    </a>
  </div>`;
}

function renderIndexCourses(lang) {
  const levelsGrid = document.getElementById("levelsGrid");
  if (!levelsGrid) return;
  lang = lang || getStoredLang();

  levelsGrid.innerHTML = CIT_LEVELS.map((l) =>
    courseCard(l, l === "Foundation" ? "Foundation" : `Level ${l.replace("L", "")}`, "CIT General Levels")
  ).join("");

  document.getElementById("languagesGrid").innerHTML = CIT_LANGUAGES.map((l) =>
    courseCard(l.en, lang === "ar" ? l.ar : l.en, lang === "ar" ? l.en : l.ar)
  ).join("");

  document.getElementById("computerGrid").innerHTML = CIT_COMPUTER_COURSES.map((c) =>
    courseCard(c.en, lang === "ar" ? c.ar : c.en, t("courseComputerSub") + c.en)
  ).join("");
}

/* ---------------- Form check-grid builder (levels / languages / computer) ---------------- */
function checkItem(name, value, mainLabel, subLabel) {
  return `
  <label class="check-item">
    <input type="checkbox" name="${name}" value="${escapeHtml(value)}">
    <span>${escapeHtml(mainLabel)}${subLabel ? `<small>${escapeHtml(subLabel)}</small>` : ""}</span>
  </label>`;
}

function renderFormCheckGrids() {
  const levelsGrid = document.getElementById("levelsCheckGrid");
  const languagesGrid = document.getElementById("languagesCheckGrid");
  const computerGrid = document.getElementById("computerCheckGrid");
  if (!levelsGrid && !languagesGrid && !computerGrid) return;

  if (levelsGrid) {
    levelsGrid.innerHTML = CIT_LEVELS.map((l) =>
      checkItem("courses", l, l === "Foundation" ? "Foundation" : `Level ${l.replace("L", "")}`, "CIT General Levels")
    ).join("");
  }
  if (languagesGrid) {
    languagesGrid.innerHTML = CIT_LANGUAGES.map((l) =>
      checkItem("languages", l.en, l.en, l.ar)
    ).join("");
  }
  if (computerGrid) {
    computerGrid.innerHTML = CIT_COMPUTER_COURSES.map((c) =>
      checkItem("courses", c.en, c.en, c.ar)
    ).join("");
  }
}

/* ---------------- Storage helpers ---------------- */
function getSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(CIT.STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function saveSubmission(record) {
  const all = getSubmissions();
  all.unshift(record);
  localStorage.setItem(CIT.STORAGE_KEY, JSON.stringify(all));
}
function deleteSubmission(id) {
  const all = getSubmissions().filter((r) => r.id !== id);
  localStorage.setItem(CIT.STORAGE_KEY, JSON.stringify(all));
}

/* ---------------- WhatsApp message builder ---------------- */
function buildWhatsAppMessage(record) {
  const lines = [
    "طلب تسجيل جديد - CIT",
    "New Registration Request",
    "—————————————",
    `الاسم / Name: ${record.fullName}`,
    `الموبايل / Mobile: ${record.mobile}`,
    `الإيميل / Email: ${record.email}`,
    `الجنسية / Nationality: ${record.nationality}`,
    `العنوان / Address: ${record.address}`,
    `تاريخ الميلاد / DOB: ${record.dob || "-"}`,
    `الكورسات المختارة / Courses: ${record.courses.join("، ") || "-"}`,
    `اللغات / Languages: ${record.languages.join("، ") || "-"}`,
    `عدد الساعات / Hours: ${record.hours || "-"}`,
    `طريقة الدفع / Payment: ${record.payment || "-"}`,
    `رسوم الدورة / Fees: ${record.fees || "-"}`,
    `الدفعة الأولى / Down payment: ${record.downPayment || "-"}`,
  ];
  return lines.join("\n");
}
function openWhatsApp(number, message) {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/* ---------------- Google Sheet sync ---------------- */
// Sends a registration record to the Apps Script Web App so it gets
// appended as a row in the connected Google Sheet. Silently does
// nothing if GOOGLE_SHEET_WEBAPP_URL hasn't been configured yet.
// The signature image is intentionally left out to keep each row
// small (Google Sheets cells have a ~50,000 character limit) — the
// signature stays available locally in this browser's admin panel.
function syncToGoogleSheet(record) {
  if (!CIT.GOOGLE_SHEET_WEBAPP_URL) return;
  const { signature, ...payload } = record;
  fetch(CIT.GOOGLE_SHEET_WEBAPP_URL, {
    method: "POST",
    mode: "no-cors", // Apps Script Web Apps don't return CORS headers
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.warn("Google Sheet sync failed:", err);
  });
}

/* ---------------- Signature pad ---------------- */
function initSignaturePad(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const ctx = canvas.getContext("2d");
  let drawing = false;
  let hasDrawn = false;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.scale(ratio, ratio);
    ctx.strokeStyle = "#e9d19c";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }
  resize();
  window.addEventListener("resize", resize);

  function pos(e) {
    const rect = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  }
  function start(e) {
    drawing = true;
    hasDrawn = true;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    e.preventDefault();
  }
  function move(e) {
    if (!drawing) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    e.preventDefault();
  }
  function end() {
    drawing = false;
  }
  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  window.addEventListener("mouseup", end);
  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", move, { passive: false });
  canvas.addEventListener("touchend", end);

  return {
    clear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasDrawn = false;
    },
    isEmpty() {
      return !hasDrawn;
    },
    toDataURL() {
      return canvas.toDataURL("image/png");
    },
  };
}

/* ---------------- Form page logic ---------------- */
function initRegistrationForm() {
  const form = document.getElementById("registrationForm");
  if (!form) return;

  renderFormCheckGrids();

  const params = new URLSearchParams(window.location.search);
  const courseParam = params.get("course");
  const banner = document.getElementById("selectedCourseBanner");
  if (courseParam) {
    const target = form.querySelector(
      `input[name="courses"][value="${CSS.escape(courseParam)}"]`
    );
    if (target) {
      target.checked = true;
      target.closest(".check-item")?.classList.add("checked");
    }
    if (banner) {
      banner.style.display = "flex";
      banner.querySelector("strong").textContent = decodeURIComponent(courseParam);
    }
  }

  form.querySelectorAll(".check-item input").forEach((input) => {
    input.addEventListener("change", () => {
      input.closest(".check-item").classList.toggle("checked", input.checked);
    });
  });

  const dateField = document.getElementById("f_date");
  if (dateField && !dateField.value) {
    dateField.value = new Date().toISOString().slice(0, 10);
  }

  const sigPad = initSignaturePad("signatureCanvas");
  const clearBtn = document.getElementById("clearSignature");
  if (clearBtn && sigPad) {
    clearBtn.addEventListener("click", () => sigPad.clear());
  }

  const msgBox = document.getElementById("formMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = form.fullName.value.trim();
    const mobile = form.mobile.value.trim();
    const email = form.email.value.trim();
    const agree = form.agree.checked;

    if (!fullName || !mobile || !email) {
      showMsg("من فضلك أكمل الاسم ورقم الموبايل والإيميل قبل الإرسال. / Please complete name, mobile & email first.", "err");
      return;
    }
    if (!agree) {
      showMsg("من فضلك وافق على شروط الالتحاق بالتدريب أولاً. / Please agree to the enrollment terms first.", "err");
      return;
    }

    const courses = Array.from(
      form.querySelectorAll('input[name="courses"]:checked')
    ).map((c) => c.value);
    const languages = Array.from(
      form.querySelectorAll('input[name="languages"]:checked')
    ).map((c) => c.value);

    const record = {
      id: "cit_" + Date.now(),
      date: form.date.value,
      fullName,
      mobile,
      email,
      nationality: form.nationality.value.trim(),
      address: form.address.value.trim(),
      dob: form.dob.value,
      courses,
      languages,
      others: form.others.value.trim(),
      hours: form.hours.value.trim(),
      payment: (form.querySelector('input[name="payment"]:checked') || {}).value || "",
      fees: form.fees.value.trim(),
      downPayment: form.downPayment.value.trim(),
      balance: form.balance.value.trim(),
      signature: sigPad && !sigPad.isEmpty() ? sigPad.toDataURL() : "",
      createdAt: new Date().toISOString(),
    };

    saveSubmission(record);
    syncToGoogleSheet(record);

    showMsg(
      "تم إرسال بياناتك بنجاح إلى إدارة CIT ✅ سيتم فتح واتساب الآن لتأكيد التسجيل. / Sent successfully — opening WhatsApp to confirm.",
      "ok"
    );

    const waNumber = record.address.includes("مصر") || /egypt/i.test(record.nationality)
      ? CIT.WHATSAPP_EG
      : CIT.WHATSAPP_UAE;

    setTimeout(() => {
      openWhatsApp(waNumber, buildWhatsAppMessage(record));
    }, 600);

    form.reset();
    sigPad && sigPad.clear();
    form.querySelectorAll(".check-item.checked").forEach((el) =>
      el.classList.remove("checked")
    );
    if (dateField) dateField.value = new Date().toISOString().slice(0, 10);
  });

  function showMsg(text, type) {
    if (!msgBox) return;
    msgBox.textContent = text;
    msgBox.className = "form-msg show " + type;
    msgBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/* ---------------- Admin page logic ---------------- */
function initAdminPage() {
  const loginBox = document.getElementById("adminLogin");
  const dashboard = document.getElementById("adminDashboard");
  if (!loginBox || !dashboard) return;

  const sheetBtn = document.getElementById("openSheetBtn");
  if (sheetBtn) {
    if (CIT.GOOGLE_SHEET_VIEW_URL) {
      sheetBtn.href = CIT.GOOGLE_SHEET_VIEW_URL;
      sheetBtn.style.display = "inline-flex";
    } else {
      sheetBtn.style.display = "none";
    }
  }

  const isAuthed = sessionStorage.getItem(CIT.ADMIN_SESSION_KEY) === "1";
  if (isAuthed) {
    loginBox.style.display = "none";
    dashboard.style.display = "block";
    const lo = document.getElementById("adminLogout");
    if (lo) lo.style.display = "inline-flex";
    renderAdminTable();
  }

  const loginForm = document.getElementById("adminLoginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = document.getElementById("adminPassword").value;
    const err = document.getElementById("adminLoginErr");
    if (val === CIT.ADMIN_PASSWORD) {
      sessionStorage.setItem(CIT.ADMIN_SESSION_KEY, "1");
      loginBox.style.display = "none";
      dashboard.style.display = "block";
      const lo = document.getElementById("adminLogout");
      if (lo) lo.style.display = "inline-flex";
      renderAdminTable();
    } else {
      err.style.display = "block";
    }
  });

  const logoutBtn = document.getElementById("adminLogout");
  logoutBtn?.addEventListener("click", () => {
    sessionStorage.removeItem(CIT.ADMIN_SESSION_KEY);
    location.reload();
  });

  document.getElementById("clearAllBtn")?.addEventListener("click", () => {
    if (confirm("هل أنت متأكد من حذف جميع طلبات التسجيل؟ / Delete all registration requests?")) {
      localStorage.removeItem(CIT.STORAGE_KEY);
      renderAdminTable();
    }
  });
}

function renderAdminTable() {
  const tbody = document.getElementById("adminTableBody");
  const emptyState = document.getElementById("adminEmptyState");
  const table = document.getElementById("adminTable");
  if (!tbody) return;
  const records = getSubmissions();

  document.getElementById("statTotal").textContent = records.length;
  const today = new Date().toISOString().slice(0, 10);
  document.getElementById("statToday").textContent = records.filter(
    (r) => r.date === today
  ).length;
  const allCourses = records.flatMap((r) => r.courses);
  document.getElementById("statCourses").textContent = new Set(allCourses).size;

  if (!records.length) {
    table.style.display = "none";
    emptyState.style.display = "block";
    return;
  }
  table.style.display = "table";
  emptyState.style.display = "none";

  tbody.innerHTML = records
    .map((r) => {
      const courseChips = r.courses
        .slice(0, 3)
        .map((c) => `<span class="pill">${escapeHtml(c)}</span>`)
        .join("");
      const more = r.courses.length > 3 ? `<span class="pill">+${r.courses.length - 3}</span>` : "";
      return `
      <tr>
        <td>${r.date || "-"}</td>
        <td><strong>${escapeHtml(r.fullName)}</strong></td>
        <td class="ltr">${escapeHtml(r.mobile)}</td>
        <td>${courseChips}${more}</td>
        <td>${escapeHtml(r.payment || "-")}</td>
        <td>
          <div class="row-actions">
            <button class="mini-btn" onclick="viewSubmission('${r.id}')">${t("adminBtnDetails")}</button>
            <button class="mini-btn wa" onclick="sendSubmissionWhatsApp('${r.id}')">${t("adminBtnWhatsApp")}</button>
            <button class="mini-btn del" onclick="removeSubmission('${r.id}')">${t("adminBtnDelete")}</button>
          </div>
        </td>
      </tr>`;
    })
    .join("");
}

function escapeHtml(str) {
  return (str || "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));
}

function viewSubmission(id) {
  const record = getSubmissions().find((r) => r.id === id);
  if (!record) return;
  const overlay = document.getElementById("modalOverlay");
  const body = document.getElementById("modalBody");
  body.innerHTML = `
    <div class="mrow"><span>الاسم الكامل / Full name</span><span>${escapeHtml(record.fullName)}</span></div>
    <div class="mrow"><span>الموبايل / Mobile</span><span class="ltr">${escapeHtml(record.mobile)}</span></div>
    <div class="mrow"><span>الإيميل / Email</span><span class="ltr">${escapeHtml(record.email)}</span></div>
    <div class="mrow"><span>الجنسية / Nationality</span><span>${escapeHtml(record.nationality)}</span></div>
    <div class="mrow"><span>العنوان / Address</span><span>${escapeHtml(record.address)}</span></div>
    <div class="mrow"><span>تاريخ الميلاد / DOB</span><span>${escapeHtml(record.dob)}</span></div>
    <div class="mrow"><span>الكورسات / Courses</span><span>${escapeHtml(record.courses.join("، "))}</span></div>
    <div class="mrow"><span>اللغات / Languages</span><span>${escapeHtml(record.languages.join("، ")) || "-"}</span></div>
    <div class="mrow"><span>أخرى / Others</span><span>${escapeHtml(record.others) || "-"}</span></div>
    <div class="mrow"><span>عدد الساعات / Hours</span><span>${escapeHtml(record.hours) || "-"}</span></div>
    <div class="mrow"><span>طريقة الدفع / Payment</span><span>${escapeHtml(record.payment) || "-"}</span></div>
    <div class="mrow"><span>رسوم الدورة / Fees</span><span>${escapeHtml(record.fees) || "-"}</span></div>
    <div class="mrow"><span>الدفعة الأولى / Down payment</span><span>${escapeHtml(record.downPayment) || "-"}</span></div>
    <div class="mrow"><span>المتبقي / Balance</span><span>${escapeHtml(record.balance) || "-"}</span></div>
    ${
      record.signature
        ? `<div class="msign"><span style="font-size:12.5px;color:var(--cit-cream);opacity:.6;">توقيع الطالب / Signature</span><img src="${record.signature}" alt="signature"/></div>`
        : ""
    }
  `;
  overlay.classList.add("show");
}
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("show");
}
function sendSubmissionWhatsApp(id) {
  const record = getSubmissions().find((r) => r.id === id);
  if (!record) return;
  const number = /egypt/i.test(record.nationality) ? CIT.WHATSAPP_EG : CIT.WHATSAPP_UAE;
  openWhatsApp(number, buildWhatsAppMessage(record));
}
function removeSubmission(id) {
  if (!confirm("حذف هذا الطلب؟ / Delete this request?")) return;
  deleteSubmission(id);
  renderAdminTable();
}

/* ---------------- Boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();
  initNav();
  initReveal();
  initCourseTabs();
  renderIndexCourses(getStoredLang());
  initRegistrationForm();
  initAdminPage();

  document.getElementById("modalOverlay")?.addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.getElementById("modalCloseBtn")?.addEventListener("click", closeModal);

  document.querySelectorAll(".year-now").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
