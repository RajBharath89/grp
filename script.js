document.addEventListener('DOMContentLoaded', function() {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconMenu = mobileMenuBtn.querySelector('.icon-menu');
  const iconClose = mobileMenuBtn.querySelector('.icon-close');

  mobileMenuBtn.addEventListener('click', function() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      iconMenu.classList.remove('hidden');
      iconClose.classList.add('hidden');
    } else {
      mobileMenu.classList.remove('hidden');
      iconMenu.classList.add('hidden');
      iconClose.classList.remove('hidden');
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      iconMenu.classList.remove('hidden');
      iconClose.classList.add('hidden');
    });
  });

  // Modal
  const openContactBtn = document.getElementById('openContactBtn');
  const footerContactBtn = document.getElementById('footerContactBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalWrapper = document.getElementById('modalWrapper');
  const formView = document.getElementById('formView');
  const successView = document.getElementById('successView');
  const contactForm = document.getElementById('contactForm');
  const termsLink = document.getElementById('termsLink');

  function openModal() {
    modalOverlay.classList.remove('hidden');
    modalWrapper.classList.remove('hidden');
    setTimeout(function() {
      modalOverlay.classList.add('show');
      modalWrapper.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('show');
    modalWrapper.classList.remove('show');
    setTimeout(function() {
      modalOverlay.classList.add('hidden');
      modalWrapper.classList.add('hidden');
      formView.classList.remove('hidden');
      successView.classList.add('hidden');
      contactForm.reset();
      clearErrors();
    }, 300);
    document.body.style.overflow = '';
  }

  openContactBtn.addEventListener('click', openModal);
  footerContactBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  closeSuccessBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  termsLink.addEventListener('click', function(e) {
    e.preventDefault();
    closeModal();
    setTimeout(function() {
      document.getElementById('disclaimer').scrollIntoView({ behavior: 'smooth' });
    }, 350);
  });

  // Form validation
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const termsInput = document.getElementById('terms');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const btnIcon = submitBtn.querySelector('.btn-icon');

  function clearErrors() {
    document.querySelectorAll('.form-error').forEach(function(el) { el.textContent = ''; });
    document.querySelectorAll('.form-input').forEach(function(el) { el.classList.remove('error'); });
    document.querySelector('.checkbox-box').classList.remove('error');
  }

  function validateForm() {
    clearErrors();
    let valid = true;

    // Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
      nameInput.classList.add('error');
      valid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address';
      emailInput.classList.add('error');
      valid = false;
    }

    // Phone
    const phoneRegex = /^[+]?[\d\s\-()]{7,}$/;
    if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
      document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
      phoneInput.classList.add('error');
      valid = false;
    }

    // Terms
    if (!termsInput.checked) {
      document.getElementById('termsError').textContent = 'You must accept the terms and conditions';
      document.querySelector('.checkbox-box').classList.add('error');
      valid = false;
    }

    return valid;
  }

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm()) return;

    // Simulate submission
    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    btnIcon.classList.add('hidden');
    btnLoading.classList.remove('hidden');

    setTimeout(function() {
      submitBtn.disabled = false;
      btnText.classList.remove('hidden');
      btnIcon.classList.remove('hidden');
      btnLoading.classList.add('hidden');

      formView.classList.add('hidden');
      successView.classList.remove('hidden');
    }, 1000);
  });
});
