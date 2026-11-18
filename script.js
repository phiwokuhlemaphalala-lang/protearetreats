
// ======================================
// WEBSITE DETAILS
// Change these details when you are ready.
// ======================================

const CONFIG = {
  propertyName: "ProteaRetreats",
  location: "Soweto, Johannesburg, South Africa",
  address: "",
  whatsapp: "27 65 888 0248",
  email: "bookingsprotearetreats@gmail.com",
  mapQuery: "Soweto Johannesburg",
  facilities: {
    wifi: true,
    parking: true,
    backupPower: false
  }
};

// ======================================
// ROOM INFORMATION
// Each room has four slideshow pictures.
// ======================================

const rooms = [
  {
    name: "melkbos-villa",
    price: "7 200",
    guests: 9,
    description: "Melkbos Beachfront Villa is a spacious self-catering holiday home set in Van Riebeeckstrand, Melkbosstrand that can accommodate 9 guests seeking a coastal escape with the sound of the ocean right at their doorstep.",
    amenities: ["Comfortable bed", "Private space", "Wi-Fi"],
    images: [
      "images/melkbos-villa/1.jpg",
      "images/melkbos-villa/2.jpg",
      "images/melkbos-villa/3.jpg",
      "images/melkbos-villa/4.jpg",
    ]
  },
  {
    name: "The-Kosmos-Heights-self-catering-accommodation",
    price: 1750,
    guests: 10,
    description: "Kosmos Heights Self-catering Accommodation is situated in Kosmos, overlooking Hartbeespoort Dam. Kosmos Heights offers a peaceful getaway.",
    amenities: ["Comfortable space", "Wi-Fi"],
    images: [
      "images/the-kosmos-heights-self-catering-accommodation/1.jpeg",
      "images/the-kosmos-heights-self-catering-accommodation/2.jpeg",
      "images/the-kosmos-heights-self-catering-accommodation/3.jpeg",
      "images/the-kosmos-heights-self-catering-accommodation/4.jpeg",
    ]
  },
  
    {
  name: "Paradise-on-Ridge",
  price: 1200,
  guests: 8,
  description: "The house can accommodate 8 guests and has 4 bedrooms, 3 bathrooms and an open-plan kitchen and living area. There are 2 bedrooms each with a king-size bed, the third bedroom has a queen-size bed and the fourth bedroom has a double bed. The first and second bathrooms each have a shower, basin and a toilet, and the third bathroom has a bath, shower, basin and a toilet. There is also a guest toilet.",
  amenities: ["Family space", "Comfortable beds", "Wi-Fi"],
  images: [
    "images/paradise-on-ridge/1.jpeg",
    "images/paradise-on-ridge/2.jpeg",
    "images/paradise-on-ridge/3.jpeg",
    "images/paradise-on-ridge/4.jpeg"
  ]
},
     
    ]



// ======================================
// GALLERY PICTURES
// ======================================

const galleryPhotos = [
  {
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
    alt: "Guest room"
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    alt: "Accommodation interior"
  },
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
    alt: "Bedroom interior"
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    alt: "Modern accommodation"
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
    alt: "Living space"
  }
];

// ======================================
// ROOM SLIDESHOWS
// ======================================

function renderRooms() {
  const roomGrid = document.getElementById("room-grid");

  if (!roomGrid) return;

  roomGrid.innerHTML = rooms.map((room, roomIndex) => `
    <article class="room-card">
      <div class="carousel" data-room="${roomIndex}">
        <img
          src="${room.images[0]}"
          alt="${room.name}"
          class="carousel-image"
          loading="lazy"
        >

        <button class="carousel-arrow prev" type="button"
          aria-label="Previous photo">‹</button>

        <button class="carousel-arrow next" type="button"
          aria-label="Next photo">›</button>

        <div class="carousel-dots">
          ${room.images.map((image, imageIndex) => `
            <button
              type="button"
              class="carousel-dot ${imageIndex === 0 ? "active" : ""}"
              data-image="${imageIndex}"
              aria-label="Show photo ${imageIndex + 1}">
            </button>
          `).join("")}
        </div>
      </div>
<div class="room-info">
    <h3>${room.name}</h3>
    <p class="room-desc">${room.description}</p>

    <div class="room-meta">
      <span>♙ ${room.guests} Guest${room.guests > 1 ? "s" : ""}</span>
      <span>${room.amenities.join(" · ")}</span>
        </div>

        <div class="room-price">
          <strong>R${room.price.toLocaleString("en-ZA")} <small>/ night</small></strong>
          <a href="#booking" class="room-enquire" data-room="${room.name}">
            Enquire →
          </a>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".carousel").forEach(setupCarousel);
}

// ======================================
// SLIDESHOW CONTROLS AND PHONE SWIPING
// ======================================

function setupCarousel(carousel) {
  const roomIndex = Number(carousel.dataset.room);
  const room = rooms[roomIndex];

  const image = carousel.querySelector(".carousel-image");
  const dots = [...carousel.querySelectorAll(".carousel-dot")];

  let currentIndex = 0;
  let touchStartX = 0;

  function showImage(index) {
    currentIndex = (index + room.images.length) % room.images.length;

    image.src = room.images[currentIndex];
    image.alt = `${room.name} photo ${currentIndex + 1}`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentIndex);
    });
  }

  carousel.querySelector(".prev").addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  carousel.querySelector(".next").addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showImage(index));
  });

  image.addEventListener("click", () => {
    openLightbox(room.images, currentIndex, room.name);
  });

  carousel.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener("touchend", event => {
    const touchEndX = event.changedTouches[0].screenX;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > 45) {
      showImage(currentIndex + (difference > 0 ? 1 : -1));
    }
  }, { passive: true });
}

// ======================================
// FULLSCREEN PHOTO VIEWER
// ======================================

let lightboxImages = [];
let lightboxIndex = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");

function openLightbox(images, index, caption) {
  if (!lightbox || !lightboxImage) return;

  lightboxImages = images;
  lightboxIndex = index;

  updateLightbox(caption);
  lightbox.showModal();
}

function updateLightbox(caption = "") {
  lightboxImage.src = lightboxImages[lightboxIndex];
  lightboxCaption.textContent =
    `${caption} — Photo ${lightboxIndex + 1} of ${lightboxImages.length}`;
}

function closeLightbox() {
  if (lightbox && lightbox.open) {
    lightbox.close();
  }
}

document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);

document.getElementById("lightbox-prev")?.addEventListener("click", () => {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightbox();
});

document.getElementById("lightbox-next")?.addEventListener("click", () => {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  updateLightbox();
});

lightbox?.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (!lightbox?.open) return;

  if (event.key === "ArrowLeft") {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
  }

  if (event.key === "ArrowRight") {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightbox();
  }
});

// ======================================
// GALLERY
// ======================================

function renderGallery() {
  const gallery = document.getElementById("gallery-grid");

  if (!gallery) return;

  gallery.innerHTML = galleryPhotos.map((photo, index) => `
    <div class="gallery-item">
      <img
        src="${photo.src}"
        alt="${photo.alt}"
        loading="lazy"
        data-gallery-index="${index}"
      >
    </div>
  `).join("");

  gallery.querySelectorAll("img").forEach((image, index) => {
    image.addEventListener("click", () => {
      openLightbox(
        galleryPhotos.map(photo => photo.src),
        index,
        "Gallery"
      );
    });
  });
}

// ======================================
// UPDATE WEBSITE DETAILS
// ======================================

function applyConfig() {
  document.title = CONFIG.propertyName;

  document.querySelectorAll(".property-name").forEach(element => {
    element.textContent = CONFIG.propertyName;
  });

  document.querySelectorAll(".property-location").forEach(element => {
    element.textContent = CONFIG.location;
  });

  const map = document.querySelector(".map-frame iframe");

  if (map) {
    map.src = `https://www.google.com/maps?q=${encodeURIComponent(CONFIG.mapQuery)}&output=embed`;
  }

  const directionsLink = document.querySelector(".directions-link");

  if (directionsLink) {
    directionsLink.href =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapQuery)}`;
  }

  const whatsappLink = document.querySelector(".floating-whatsapp");

  if (whatsappLink) {
    whatsappLink.href = `https://wa.me/${CONFIG.whatsapp}`;
  }

  const emailLink = document.querySelector(".email-link");

  if (emailLink) {
    emailLink.href = `mailto:${CONFIG.email}`;
    emailLink.textContent = CONFIG.email;
  }

  const year = document.getElementById("current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const facilitySettings = {
    wifi: CONFIG.facilities.wifi,
    parking: CONFIG.facilities.parking,
    "backup-power": CONFIG.facilities.backupPower
  };

  Object.entries(facilitySettings).forEach(([facility, available]) => {
    document.querySelectorAll(`[data-facility="${facility}"]`).forEach(element => {
      element.style.display = available ? "" : "none";
    });
  });
}

// ======================================
// MOBILE MENU
// ======================================

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

menuToggle?.addEventListener("click", () => {
  mainNav?.classList.toggle("open");

  const isOpen = mainNav?.classList.contains("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// ======================================
// ROOM ENQUIRY BUTTON
// Selects the room in the booking form.
// ======================================

document.addEventListener("click", event => {
  const roomLink = event.target.closest(".room-enquire");

  if (!roomLink) return;

  const roomChoice = document.getElementById("room-choice");

  if (roomChoice) {
    roomChoice.value = roomLink.dataset.room;
  }
});

// ======================================
// BOOKING FORM
// Opens WhatsApp and prepares an email.
// The guest must press Send in their app.
// ======================================

const bookingForm = document.getElementById("booking-form");

bookingForm?.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("guest-name").value.trim();
  const phone = document.getElementById("guest-phone").value.trim();
  const checkIn = document.getElementById("check-in").value;
  const checkOut = document.getElementById("check-out").value;
  const guests = document.getElementById("guests").value;
  const room = document.getElementById("room-choice").value;
  const message = document.getElementById("guest-message").value.trim();

  const status = document.getElementById("form-status");

  if (!checkIn || !checkOut) {
    status.textContent = "Please select your check-in and check-out dates.";
    return;
  }

  if (new Date(checkOut) <= new Date(checkIn)) {
    status.textContent = "Check-out must be after check-in. Please check your dates.";
    return;
  }

  const bookingMessage = `
Hello ${CONFIG.propertyName},

I would like to enquire about a booking.

Name: ${name}
Phone: ${phone}
Room: ${room}
Guests: ${guests}
Check-in: ${checkIn}
Check-out: ${checkOut}

Additional message:
${message || "No additional message."}

Please let me know if the room is available and confirm the price.

Thank you.
  `.trim();

  const whatsappUrl =
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(bookingMessage)}`;

  const emailSubject = `Booking enquiry - ${CONFIG.propertyName}`;

  const emailUrl =
    `mailto:${CONFIG.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(bookingMessage)}`;

  status.textContent =
    "Your booking enquiry is ready. WhatsApp will open first.";

  window.open(whatsappUrl, "_blank");

  // Prepare an email as an alternative contact method.
  // The guest must still press Send in their email app.
  window.location.href = emailUrl;
});

// ======================================
// START THE WEBSITE
// ======================================

applyConfig();
renderRooms();
renderGallery();
