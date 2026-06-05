// Edit semua maklumat majlis di sini.
const weddingData = {
  groomName: "Aiman Hakimi",
  brideName: "Sofia Nadhirah",
  groomParents: "Encik Abdullah bin Hassan & Puan Noraini binti Ahmad",
  brideParents: "Encik Ismail bin Omar & Puan Salmah binti Yusof",
  date: "2026-09-12T11:00:00+08:00",
  dateDisplay: "Sabtu, 12 September 2026",
  time: "11.00 pagi - 4.00 petang",
  venueName: "Dewan Seri Melati",
  venueAddress: "No. 12, Jalan Melati Indah, 43000 Kajang, Selangor",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dewan%20Seri%20Melati%20Kajang",
  wazeUrl: "https://waze.com/ul?q=Dewan%20Seri%20Melati%20Kajang&navigate=yes",
  contactNumbers: [
    {
      label: "Keluarga Lelaki",
      phone: "60123456789",
      message: "Assalamualaikum, saya ingin bertanya tentang majlis Aiman dan Sofia.",
    },
    {
      label: "Keluarga Perempuan",
      phone: "60198765432",
      message: "Assalamualaikum, saya ingin bertanya tentang majlis Aiman dan Sofia.",
    },
  ],
  bankInfo: {
    bankName: "Maybank",
    accountNumber: "123456789012",
    recipientName: "Aiman Hakimi",
  },
  galleryImages: [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=76",
      alt: "Pasangan pengantin berjalan bersama",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=76",
      alt: "Detail cincin perkahwinan",
    },
    {
      src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=76",
      alt: "Potret pasangan pengantin",
    },
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=76",
      alt: "Hiasan majlis perkahwinan",
    },
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=76",
      alt: "Suasana meja majlis",
    },
    {
      src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=900&q=76",
      alt: "Bunga lembut untuk majlis",
    },
  ],
};

const selectors = {
  countdownMessage: document.querySelector("#countdownMessage"),
  contactButtons: document.querySelector("#contactButtons"),
  copyAccount: document.querySelector("#copyAccount"),
  form: document.querySelector("#rsvpForm"),
  formStatus: document.querySelector("#formStatus"),
  galleryGrid: document.querySelector("#galleryGrid"),
  lightbox: document.querySelector("#lightbox"),
  lightboxImage: document.querySelector("#lightboxImage"),
  musicToggle: document.querySelector(".music-toggle"),
};

let musicContext;
let musicOscillator;

function bindWeddingData() {
  document.querySelectorAll("[data-bind]").forEach((element) => {
    const key = element.dataset.bind;
    element.textContent = weddingData[key] || "";
  });

  document.querySelectorAll("[data-link]").forEach((element) => {
    const key = element.dataset.link;
    element.href = weddingData[key] || "#";
  });

  document.querySelectorAll("[data-bank]").forEach((element) => {
    const key = element.dataset.bank;
    element.textContent = weddingData.bankInfo[key] || "";
  });

  const quickWhatsapp = document.querySelector("[data-quick-whatsapp]");
  if (quickWhatsapp && weddingData.contactNumbers[0]) {
    quickWhatsapp.href = createWhatsappUrl(weddingData.contactNumbers[0]);
  }
}

function createWhatsappUrl(contact) {
  return `https://wa.me/${contact.phone}?text=${encodeURIComponent(contact.message)}`;
}

function renderContacts() {
  selectors.contactButtons.innerHTML = weddingData.contactNumbers
    .map(
      (contact) =>
        `<a class="button button--primary" href="${createWhatsappUrl(contact)}" target="_blank" rel="noreferrer" aria-label="Hubungi ${contact.label} melalui WhatsApp">${contact.label}</a>`
    )
    .join("");
}

function renderGallery() {
  selectors.galleryGrid.innerHTML = weddingData.galleryImages
    .map(
      (image, index) => `
        <button type="button" aria-label="Buka gambar ${index + 1}" data-gallery-index="${index}">
          <img src="${image.src}" alt="${image.alt}" loading="lazy" />
        </button>
      `
    )
    .join("");
}

function updateCountdown() {
  const eventDate = new Date(weddingData.date).getTime();
  const now = Date.now();
  const distance = eventDate - now;

  if (Number.isNaN(eventDate) || distance <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach((id) => {
      document.querySelector(`#${id}`).textContent = "00";
    });
    selectors.countdownMessage.textContent = "Majlis telah berlangsung";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.querySelector("#days").textContent = String(days).padStart(2, "0");
  document.querySelector("#hours").textContent = String(hours).padStart(2, "0");
  document.querySelector("#minutes").textContent = String(minutes).padStart(2, "0");
  document.querySelector("#seconds").textContent = String(seconds).padStart(2, "0");
  selectors.countdownMessage.textContent = "Kami menanti kehadiran anda";
}

function setupRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupRsvp() {
  selectors.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(selectors.form);
    const guestName = String(formData.get("guestName") || "").trim();
    const attendance = String(formData.get("attendance") || "").trim();
    const guestCount = Number(formData.get("guestCount"));
    const message = String(formData.get("message") || "").trim();

    selectors.formStatus.classList.remove("is-error");

    if (!guestName || !attendance || !guestCount) {
      selectors.formStatus.textContent = "Sila lengkapkan nama, kehadiran dan bilangan tetamu.";
      selectors.formStatus.classList.add("is-error");
      return;
    }

    const response = {
      guestName,
      attendance,
      guestCount,
      message,
      submittedAt: new Date().toISOString(),
    };

    // Struktur ini boleh diganti dengan panggilan Google Sheet atau backend nanti.
    const savedResponses = JSON.parse(localStorage.getItem("rsvpResponses") || "[]");
    savedResponses.push(response);
    localStorage.setItem("rsvpResponses", JSON.stringify(savedResponses));

    selectors.form.reset();
    document.querySelector("#guestCount").value = 1;
    selectors.formStatus.textContent = "Terima kasih. RSVP anda telah direkodkan.";
  });
}

function setupLightbox() {
  selectors.galleryGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-index]");
    if (!button) return;

    const image = weddingData.galleryImages[Number(button.dataset.galleryIndex)];
    selectors.lightboxImage.src = image.src;
    selectors.lightboxImage.alt = image.alt;
    selectors.lightbox.classList.add("is-open");
    selectors.lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  });

  document.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  selectors.lightbox.addEventListener("click", (event) => {
    if (event.target === selectors.lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function closeLightbox() {
  selectors.lightbox.classList.remove("is-open");
  selectors.lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

function setupCopyAccount() {
  selectors.copyAccount.addEventListener("click", async () => {
    await navigator.clipboard.writeText(weddingData.bankInfo.accountNumber);
    selectors.copyAccount.textContent = "Disalin";
    setTimeout(() => {
      selectors.copyAccount.textContent = "Salin No. Akaun";
    }, 1800);
  });
}

function setupMusicToggle() {
  selectors.musicToggle.addEventListener("click", () => {
    if (musicOscillator) {
      musicOscillator.stop();
      musicOscillator = null;
      selectors.musicToggle.classList.remove("is-active");
      selectors.musicToggle.setAttribute("aria-label", "Mainkan muzik latar");
      return;
    }

    // Bunyi lembut ringkas sahaja. Gantikan dengan audio file jika ada lagu pilihan.
    musicContext = musicContext || new AudioContext();
    musicOscillator = musicContext.createOscillator();
    const gain = musicContext.createGain();
    musicOscillator.type = "sine";
    musicOscillator.frequency.value = 392;
    gain.gain.value = 0.018;
    musicOscillator.connect(gain).connect(musicContext.destination);
    musicOscillator.start();
    selectors.musicToggle.classList.add("is-active");
    selectors.musicToggle.setAttribute("aria-label", "Hentikan muzik latar");
  });
}

function init() {
  bindWeddingData();
  renderContacts();
  renderGallery();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  setupRevealAnimation();
  setupRsvp();
  setupLightbox();
  setupCopyAccount();
  setupMusicToggle();
}

document.addEventListener("DOMContentLoaded", init);
