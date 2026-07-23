window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 800);
});

const texts = ['Full-Stack Developer', 'UI/UX Designer', 'Panel Expert'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  const typingElement = document.querySelector('.hero-typing');
  if (typingElement) {
    typingElement.textContent = letter;
  }
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 2000);
  } else {
    setTimeout(type, 100);
  }
})();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 120) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
});

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });
}

const form = document.getElementById('contactForm');
const statusDiv = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    statusDiv.innerHTML = '';
    statusDiv.className = '';

    setTimeout(() => {
      statusDiv.innerHTML = '✅ Message sent successfully!';
      statusDiv.className = 'success';
      btn.textContent = 'Message Sent!';
      btn.style.background = '#22a65e';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        this.reset();

        setTimeout(() => {
          statusDiv.innerHTML = '';
          statusDiv.className = '';
        }, 3000);
      }, 2000);
    }, 1500);
  });
}

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

const track = document.querySelector('.testimonials-track');
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;
let totalSlides = 0;
let autoSlideInterval;

if (track) {
  const slides = track.querySelectorAll('.testimonial-card');
  totalSlides = slides.length;

  if (totalSlides > 0) {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
      currentSlide = index;
      if (currentSlide < 0) currentSlide = totalSlides - 1;
      if (currentSlide >= totalSlides) currentSlide = 0;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      document.querySelectorAll('.slider-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    startAutoSlide();

    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', startAutoSlide);
  }
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .project-card, .testimonial-card, .skill-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});