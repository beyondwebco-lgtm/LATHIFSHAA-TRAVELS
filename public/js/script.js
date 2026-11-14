/**
 * LATHIFSHAA TRAVELS - Main Client JavaScript
 * Interactive UI, Form Validation, WhatsApp Integration, Filter Tabs & Scroll Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Set today as minimum date for date inputs
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('travelDate');
  const stripDateInput = document.getElementById('stripDate');
  if (dateInput) dateInput.min = today;
  if (stripDateInput) stripDateInput.min = today;

  // 2. Sticky Navbar & Scroll Effects
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar sticky shadow
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Active navigation item detection
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Navigation Drawer Toggle
  const navToggleBtn = document.getElementById('navToggleBtn');
  const navMenu = document.getElementById('navMenu');

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggleBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile menu on clicking any navigation link
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });

    // Close mobile menu on clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggleBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = navToggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // 4. Vehicle Collection Category Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const vehicleCards = document.querySelectorAll('.vehicle-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      vehicleCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. "Book This Vehicle" buttons on vehicle cards
  const bookVehicleBtns = document.querySelectorAll('.btn-book-vehicle');
  bookVehicleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const vehicleName = btn.getAttribute('data-vehicle');
      const vehicleSelect = document.getElementById('vehicleCategory');
      
      if (vehicleSelect && vehicleName) {
        // Find matching option
        for (let i = 0; i < vehicleSelect.options.length; i++) {
          if (vehicleSelect.options[i].value.toLowerCase().includes(vehicleName.toLowerCase()) || 
              vehicleSelect.options[i].text.toLowerCase().includes(vehicleName.toLowerCase())) {
            vehicleSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Smooth scroll to booking section
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        // Highlight the select field
        if (vehicleSelect) {
          setTimeout(() => {
            vehicleSelect.focus();
            vehicleSelect.style.borderColor = 'var(--gold-primary)';
            setTimeout(() => {
              vehicleSelect.style.borderColor = '';
            }, 1500);
          }, 800);
        }
      }
    });
  });

  // 6. Quick Booking Strip submit handler
  const stripForm = document.getElementById('quickStripForm');
  if (stripForm) {
    stripForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const stripPickup = document.getElementById('stripPickup').value.trim();
      const stripDrop = document.getElementById('stripDrop').value.trim();
      const stripVehicle = document.getElementById('stripVehicle').value;
      const stripDate = document.getElementById('stripDate').value;

      // Transfer values to main booking form
      if (stripPickup) document.getElementById('pickupLocation').value = stripPickup;
      if (stripDrop) document.getElementById('destination').value = stripDrop;
      if (stripVehicle) document.getElementById('vehicleCategory').value = stripVehicle;
      if (stripDate) document.getElementById('travelDate').value = stripDate;

      // Scroll to booking form
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 7. Booking Enquiry Form -> WhatsApp Integration
  const bookingForm = document.getElementById('bookingForm');
  const bookingFeedback = document.getElementById('bookingFeedback');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Form values
      const name = document.getElementById('customerName').value.trim();
      const phone = document.getElementById('mobileNumber').value.trim();
      const pickup = document.getElementById('pickupLocation').value.trim();
      const destination = document.getElementById('destination').value.trim();
      const travelDate = document.getElementById('travelDate').value;
      const pickupTime = document.getElementById('pickupTime').value;
      const vehicleCategory = document.getElementById('vehicleCategory').value;
      const passengers = document.getElementById('passengers').value;
      const tripType = document.getElementById('tripType').value;
      const requirements = document.getElementById('additionalRequirements').value.trim();

      // Basic client validation
      if (!name || !phone || !pickup || !destination || !travelDate || !pickupTime || !vehicleCategory || !passengers || !tripType) {
        alert('Please fill in all required fields before proceeding with booking.');
        return;
      }

      // Phone number check (10 digits minimum)
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        alert('Please enter a valid 10-digit mobile phone number.');
        return;
      }

      // Structured WhatsApp Message Formatting
      const waMessage = 
`*LATHIFSHAA TRAVELS - NEW BOOKING ENQUIRY*
=========================================
*Customer Name:* ${name}
*Mobile Number:* ${phone}
*Pickup Location:* ${pickup}
*Destination:* ${destination}
*Travel Date:* ${travelDate}
*Pickup Time:* ${pickupTime}
*Vehicle Selected:* ${vehicleCategory}
*Passengers:* ${passengers}
*Trip Type:* ${tripType}
*Additional Notes:* ${requirements ? requirements : 'None'}
=========================================
_Generated via Lathifshaa Travels Website_
_Proprietor: Shaik Basha | Malkapuram, Visakhapatnam_`;

      const whatsappNumber = '919052564746';
      const encodedMessage = encodeURIComponent(waMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Show instant feedback on screen
      if (bookingFeedback) {
        bookingFeedback.style.display = 'block';
        bookingFeedback.innerHTML = `
          <i class="fas fa-check-circle text-green-600 mr-2"></i>
          Thank you, <strong>${name}</strong>! Opening WhatsApp with your pre-filled travel details. 
          If WhatsApp does not open automatically, <a href="${whatsappUrl}" target="_blank" style="text-decoration: underline; font-weight: bold; color: #047857;">click here to send directly</a>.
        `;
      }

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
    });
  }

  // 8. Contact Form -> WhatsApp/Email Integration
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cName = document.getElementById('contactName').value.trim();
      const cPhone = document.getElementById('contactPhone').value.trim();
      const cSubject = document.getElementById('contactSubject').value.trim();
      const cMessage = document.getElementById('contactMessage').value.trim();

      if (!cName || !cPhone || !cMessage) {
        alert('Please fill in your name, contact number and message.');
        return;
      }

      const waMsg = 
`*LATHIFSHAA TRAVELS - QUICK MESSAGE*
=========================================
*Name:* ${cName}
*Phone:* ${cPhone}
*Subject:* ${cSubject || 'General Travel Enquiry'}
*Message:* ${cMessage}
=========================================
_Sent from Contact Form on Lathifshaa Travels Website_`;

      const whatsappNumber = '919052564746';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
      window.open(whatsappUrl, '_blank');
    });
  }
});

