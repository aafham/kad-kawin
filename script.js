/**
 * Wedding configuration - Edit this to customize your invitation
 */
const CONFIG = {
  // Couple information
  couple: {
    groomName: "Aiman Hakimi",
    brideName: "Sofia Nadhirah",
    groomParents: "Encik Abdullah bin Hassan & Puan Noraini binti Ahmad",
    brideParents: "Encik Ismail bin Omar & Puan Salmah binti Yusof",
  },

  // Event details
  event: {
    date: "2026-09-12T11:00:00+08:00",
    dateDisplay: "Sabtu, 12 September 2026",
    time: "11.00 pagi - 4.00 petang",
    venueName: "Dewan Seri Melati",
    venueAddress: "No. 12, Jalan Melati Indah, 43000 Kajang, Selangor",
  },

  // Maps and navigation
  navigation: {
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dewan%20Seri%20Melati%20Kajang",
    wazeUrl: "https://waze.com/ul?q=Dewan%20Seri%20Melati%20Kajang&navigate=yes",
  },

  // Contact information
  contacts: [
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

  // Bank information for gifts
  bank: {
    name: "Maybank",
    accountNumber: "123456789012",
    recipientName: "Aiman Hakimi",
  },

  // Gallery images
  gallery: [
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

/**
 * Application constants
 */
const CONSTANTS = {
  // Animation and timing
  ANIMATION: {
    REVEAL_THRESHOLD: 0.16,
    REVEAL_DURATION: 750,
    COPY_FEEDBACK_DURATION: 1800,
    COUNTDOWN_UPDATE_INTERVAL: 1000,
  },

  // Audio
  AUDIO: {
    FREQUENCY: 392,
    GAIN: 0.018,
    TYPE: "sine",
  },

  // CSS classes
  CLASS: {
    VISIBLE: "is-visible",
    ACTIVE: "is-active",
    OPEN: "is-open",
    ERROR: "is-error",
    LIGHTBOX_OPEN: "lightbox-open",
  },

  // Messages (i18n ready)
  MESSAGES: {
    COPY_SUCCESS: "Disalin",
    COPY_ORIGINAL: "Salin No. Akaun",
    EVENT_PASSED: "Majlis telah berlangsung",
    AWAITING_GUESTS: "Kami menanti kehadiran anda",
    RSVP_INCOMPLETE: "Sila lengkapkan nama, kehadiran dan bilangan tetamu.",
    RSVP_SUCCESS: "Terima kasih. RSVP anda telah direkodkan.",
    PLAY_MUSIC: "Mainkan muzik latar",
    STOP_MUSIC: "Hentikan muzik latar",
  },

  // Form validation
  FORM: {
    MAX_GUESTS: 10,
    MIN_GUESTS: 1,
    STORAGE_KEY: "rsvpResponses",
  },
};

/**
 * For backward compatibility with existing data binding
 */
const weddingData = {
  ...CONFIG.couple,
  ...CONFIG.event,
  ...CONFIG.navigation,
  contactNumbers: CONFIG.contacts,
  bankInfo: CONFIG.bank,
  galleryImages: CONFIG.gallery,
};

/**
 * WeddingApp - Main application class encapsulating all functionality
 */
class WeddingApp {
  constructor(config = CONFIG, constants = CONSTANTS) {
    this.config = config;
    this.constants = constants;
    this.dom = {};
    this.audio = {
      context: null,
      oscillator: null,
    };
    this.countdownInterval = null;
    this.init();
  }

  /**
   * Cache DOM elements for better performance
   */
  cacheDOM() {
    this.dom = {
      countdownMessage: document.querySelector("#countdownMessage"),
      contactButtons: document.querySelector("#contactButtons"),
      copyAccount: document.querySelector("#copyAccount"),
      form: document.querySelector("#rsvpForm"),
      formStatus: document.querySelector("#formStatus"),
      galleryGrid: document.querySelector("#galleryGrid"),
      lightbox: document.querySelector("#lightbox"),
      lightboxImage: document.querySelector("#lightboxImage"),
      lightboxClose: document.querySelector(".lightbox__close"),
      musicToggle: document.querySelector(".music-toggle"),
      quickWhatsapp: document.querySelector("[data-quick-whatsapp]"),
      body: document.body,
    };
  }

  /**
   * Initialize the application
   */
  init() {
    try {
      this.cacheDOM();
      this.bindWeddingData();
      this.renderContacts();
      this.renderGallery();
      this.updateCountdown();
      this.setupCountdownInterval();
      this.setupRevealAnimation();
      this.setupRsvp();
      this.setupLightbox();
      this.setupCopyAccount();
      this.setupMusicToggle();
    } catch (error) {
      console.error("Failed to initialize WeddingApp:", error);
    }
  }

  /**
   * Bind wedding data to elements with data-bind, data-link, and data-bank attributes
   */
  bindWeddingData() {
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

    if (this.dom.quickWhatsapp && weddingData.contactNumbers[0]) {
      this.dom.quickWhatsapp.href = this.createWhatsappUrl(weddingData.contactNumbers[0]);
    }
  }

  /**
   * Generate WhatsApp URL with prefilled message
   */
  createWhatsappUrl(contact) {
    return `https://wa.me/${contact.phone}?text=${encodeURIComponent(contact.message)}`;
  }

  /**
   * Render contact buttons
   */
  renderContacts() {
    if (!this.dom.contactButtons) return;

    this.dom.contactButtons.innerHTML = weddingData.contactNumbers
      .map(
        (contact) =>
          `<a class="button button--primary" href="${this.createWhatsappUrl(contact)}" target="_blank" rel="noreferrer" aria-label="Hubungi ${contact.label} melalui WhatsApp">${contact.label}</a>`
      )
      .join("");
  }

  /**
   * Render gallery grid
   */
  renderGallery() {
    if (!this.dom.galleryGrid) return;

    this.dom.galleryGrid.innerHTML = weddingData.galleryImages
      .map(
        (image, index) => `
        <button type="button" aria-label="Buka gambar ${index + 1}" data-gallery-index="${index}">
          <img src="${image.src}" alt="${image.alt}" loading="lazy" />
        </button>
      `
      )
      .join("");
  }

  /**
   * Calculate and update countdown display
   */
  updateCountdown() {
    try {
      const eventDate = new Date(weddingData.date).getTime();
      const now = Date.now();
      const distance = eventDate - now;

      if (Number.isNaN(eventDate) || distance <= 0) {
        ["days", "hours", "minutes", "seconds"].forEach((id) => {
          const element = document.querySelector(`#${id}`);
          if (element) element.textContent = "00";
        });
        if (this.dom.countdownMessage) {
          this.dom.countdownMessage.textContent = this.constants.MESSAGES.EVENT_PASSED;
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      const elements = {
        days: document.querySelector("#days"),
        hours: document.querySelector("#hours"),
        minutes: document.querySelector("#minutes"),
        seconds: document.querySelector("#seconds"),
      };

      Object.entries(elements).forEach(([unit, element]) => {
        if (element) element.textContent = String(unit === "days" ? days : unit === "hours" ? hours : unit === "minutes" ? minutes : seconds).padStart(2, "0");
      });

      if (this.dom.countdownMessage) {
        this.dom.countdownMessage.textContent = this.constants.MESSAGES.AWAITING_GUESTS;
      }
    } catch (error) {
      console.error("Error updating countdown:", error);
    }
  }

  /**
   * Setup countdown update interval
   */
  setupCountdownInterval() {
    this.countdownInterval = setInterval(() => this.updateCountdown(), this.constants.ANIMATION.COUNTDOWN_UPDATE_INTERVAL);
  }

  /**
   * Cleanup countdown interval on destroy
   */
  destroyCountdownInterval() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  /**
   * Setup reveal animation for sections
   */
  setupRevealAnimation() {
    const revealItems = document.querySelectorAll(".reveal");
    if (revealItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(this.constants.CLASS.VISIBLE);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: this.constants.ANIMATION.REVEAL_THRESHOLD }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  /**
   * Validate RSVP form data
   */
  validateRsvpForm(data) {
    const { guestName, attendance, guestCount } = data;

    if (!guestName || !attendance || !guestCount) {
      return {
        valid: false,
        message: this.constants.MESSAGES.RSVP_INCOMPLETE,
      };
    }

    if (guestCount < this.constants.FORM.MIN_GUESTS || guestCount > this.constants.FORM.MAX_GUESTS) {
      return {
        valid: false,
        message: `Bilangan tetamu mesti antara ${this.constants.FORM.MIN_GUESTS} dan ${this.constants.FORM.MAX_GUESTS}`,
      };
    }

    return { valid: true };
  }

  /**
   * Setup RSVP form submission
   */
  setupRsvp() {
    if (!this.dom.form) return;

    this.dom.form.addEventListener("submit", (event) => {
      event.preventDefault();

      try {
        const formData = new FormData(this.dom.form);
        const data = {
          guestName: String(formData.get("guestName") || "").trim(),
          attendance: String(formData.get("attendance") || "").trim(),
          guestCount: Number(formData.get("guestCount")),
          message: String(formData.get("message") || "").trim(),
        };

        this.dom.formStatus.classList.remove(this.constants.CLASS.ERROR);

        const validation = this.validateRsvpForm(data);
        if (!validation.valid) {
          this.dom.formStatus.textContent = validation.message;
          this.dom.formStatus.classList.add(this.constants.CLASS.ERROR);
          return;
        }

        const response = {
          ...data,
          submittedAt: new Date().toISOString(),
        };

        const savedResponses = JSON.parse(localStorage.getItem(this.constants.FORM.STORAGE_KEY) || "[]");
        savedResponses.push(response);
        localStorage.setItem(this.constants.FORM.STORAGE_KEY, JSON.stringify(savedResponses));

        this.dom.form.reset();
        const guestCountInput = document.querySelector("#guestCount");
        if (guestCountInput) guestCountInput.value = 1;

        this.dom.formStatus.textContent = this.constants.MESSAGES.RSVP_SUCCESS;
        this.dom.formStatus.classList.remove(this.constants.CLASS.ERROR);
      } catch (error) {
        console.error("RSVP submission error:", error);
        this.dom.formStatus.textContent = "Terjadi ralat. Sila cuba lagi.";
        this.dom.formStatus.classList.add(this.constants.CLASS.ERROR);
      }
    });
  }

  /**
   * Setup lightbox functionality
   */
  setupLightbox() {
    if (!this.dom.galleryGrid || !this.dom.lightbox) return;

    this.dom.galleryGrid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-gallery-index]");
      if (!button) return;

      try {
        const image = weddingData.galleryImages[Number(button.dataset.galleryIndex)];
        if (!image) return;

        this.dom.lightboxImage.src = image.src;
        this.dom.lightboxImage.alt = image.alt;
        this.openLightbox();
      } catch (error) {
        console.error("Error opening lightbox:", error);
      }
    });

    if (this.dom.lightboxClose) {
      this.dom.lightboxClose.addEventListener("click", () => this.closeLightbox());
    }

    this.dom.lightbox.addEventListener("click", (event) => {
      if (event.target === this.dom.lightbox) this.closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.closeLightbox();
    });
  }

  /**
   * Open lightbox
   */
  openLightbox() {
    this.dom.lightbox.classList.add(this.constants.CLASS.OPEN);
    this.dom.lightbox.setAttribute("aria-hidden", "false");
    this.dom.body.classList.add(this.constants.CLASS.LIGHTBOX_OPEN);
  }

  /**
   * Close lightbox
   */
  closeLightbox() {
    this.dom.lightbox.classList.remove(this.constants.CLASS.OPEN);
    this.dom.lightbox.setAttribute("aria-hidden", "true");
    this.dom.body.classList.remove(this.constants.CLASS.LIGHTBOX_OPEN);
  }

  /**
   * Setup copy to clipboard for bank account number
   */
  setupCopyAccount() {
    if (!this.dom.copyAccount) return;

    this.dom.copyAccount.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(weddingData.bankInfo.accountNumber);
        const originalText = this.dom.copyAccount.textContent;
        this.dom.copyAccount.textContent = this.constants.MESSAGES.COPY_SUCCESS;

        setTimeout(() => {
          this.dom.copyAccount.textContent = this.constants.MESSAGES.COPY_ORIGINAL;
        }, this.constants.ANIMATION.COPY_FEEDBACK_DURATION);
      } catch (error) {
        console.error("Copy to clipboard failed:", error);
        this.dom.copyAccount.textContent = "Gagal menyalin";
      }
    });
  }

  /**
   * Setup background music toggle
   */
  setupMusicToggle() {
    if (!this.dom.musicToggle) return;

    this.dom.musicToggle.addEventListener("click", () => {
      if (this.audio.oscillator) {
        this.stopMusic();
      } else {
        this.playMusic();
      }
    });
  }

  /**
   * Play background music
   */
  playMusic() {
    try {
      this.audio.context = this.audio.context || new (window.AudioContext || window.webkitAudioContext)();
      this.audio.oscillator = this.audio.context.createOscillator();
      const gain = this.audio.context.createGain();

      this.audio.oscillator.type = this.constants.AUDIO.TYPE;
      this.audio.oscillator.frequency.value = this.constants.AUDIO.FREQUENCY;
      gain.gain.value = this.constants.AUDIO.GAIN;

      this.audio.oscillator.connect(gain).connect(this.audio.context.destination);
      this.audio.oscillator.start();

      this.dom.musicToggle.classList.add(this.constants.CLASS.ACTIVE);
      this.dom.musicToggle.setAttribute("aria-label", this.constants.MESSAGES.STOP_MUSIC);
    } catch (error) {
      console.error("Error playing music:", error);
    }
  }

  /**
   * Stop background music
   */
  stopMusic() {
    try {
      if (this.audio.oscillator) {
        this.audio.oscillator.stop();
        this.audio.oscillator = null;
      }
      this.dom.musicToggle.classList.remove(this.constants.CLASS.ACTIVE);
      this.dom.musicToggle.setAttribute("aria-label", this.constants.MESSAGES.PLAY_MUSIC);
    } catch (error) {
      console.error("Error stopping music:", error);
    }
  }

  /**
   * Cleanup resources
   */
  destroy() {
    this.destroyCountdownInterval();
    this.stopMusic();
  }
}

/**
 * Initialize app when DOM is ready
 */
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new WeddingApp();
});

/**
 * Cleanup on page unload
 */
window.addEventListener("beforeunload", () => {
  if (app) app.destroy();
});
