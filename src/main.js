import './style.css';

// --- PROJECT DATA FOR DETAILS MODAL ---
const projectDetails = {
  shopmate: {
    title: 'ShopMate AI',
    subtitle: 'GenAI-Powered Intelligent Retail Recommendation System',
    tags: ['FastAPI', 'Gemini AI', 'Firecrawl', 'Python', 'REST API', 'Contextual Memory'],
    body: `
      <p><strong>ShopMate AI</strong> is a premium, real-time retail intelligence and product recommendation engine that leverages generative AI models to provide high-quality recommendations based on user inquiries.</p>
      <h4 style="margin: 1rem 0 0.5rem 0; color: var(--accent-1);">Key Highlights:</h4>
      <ul>
        <li>Engineered a FastAPI-based backend integrated with Gemini AI and Firecrawl to scrape, interpret, and suggest products from the web dynamically.</li>
        <li>Designed a multi-stage inference pipeline containing live web scraping, custom weighted ranking algorithms, response caching, and LLM orchestration.</li>
        <li>Implemented session-based contextual memory with isolated multi-user state management to maintain conversation flow.</li>
        <li>Exposed robust REST APIs for seamless frontend integration and memory orchestration.</li>
      </ul>
      <h4 style="margin: 1rem 0 0.5rem 0; color: var(--accent-1);">Tech Stack & Tools:</h4>
      <p>Python, FastAPI, Gemini API, Firecrawl SDK, Uvicorn, Cache-tools, Session State Manager.</p>
    `
  },
  wine: {
    title: 'Wine Quality Prediction',
    subtitle: 'Machine Learning Analytics System',
    tags: ['Scikit-learn', 'Pandas', 'NumPy', 'PCA', 'Ensemble Models', 'Logistic Regression'],
    body: `
      <p><strong>Wine Quality Prediction</strong> is an analytical machine learning project designed to evaluate and predict the quality ratings of wines based on chemical characteristics.</p>
      <h4 style="margin: 1rem 0 0.5rem 0; color: var(--accent-1);">Key Highlights:</h4>
      <ul>
        <li>Developed high-performance predictive ML models using Pandas, NumPy, and Scikit-learn.</li>
        <li>Applied Principal Component Analysis (PCA) to reduce dimensionality and resolve multicollinearity between feature columns.</li>
        <li>Performed intensive feature engineering, outlier detection, and data cleaning, improving prediction consistency by 15%.</li>
        <li>Achieved a stellar 92% classification accuracy using a stacked ensemble classifier with a Logistic Regression meta-classifier.</li>
      </ul>
      <h4 style="margin: 1rem 0 0.5rem 0; color: var(--accent-1);">Tech Stack & Tools:</h4>
      <p>Python, Scikit-learn, Pandas, NumPy, PCA, Ensemble Methods, Jupyter Notebook.</p>
    `
  },
  handsmen: {
    title: 'HandsMen Threads',
    subtitle: 'Full-Stack E-Commerce System',
    tags: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP', 'Database Design'],
    body: `
      <p><strong>HandsMen Threads</strong> is an elegant, full-stack responsive e-commerce web platform showcasing modern catalog navigation and secure workflow systems.</p>
      <h4 style="margin: 1rem 0 0.5rem 0; color: var(--accent-1);">Key Highlights:</h4>
      <ul>
        <li>Developed a highly responsive and fluid shopping interface with dynamic product listings, search queries, filter sorting, and cart systems.</li>
        <li>Designed a clean, modern UI/UX with smooth state transitions, hover effects, and minimal load overhead.</li>
        <li>Engineered a relational database structure in SQL with optimized indexes for product cataloging and customer order storage.</li>
        <li>Implemented PHP backend scripts to safely interface database records, handle contact submissions, and manage user login states.</li>
      </ul>
      <h4 style="margin: 1rem 0 0.5rem 0; color: var(--accent-1);">Tech Stack & Tools:</h4>
      <p>HTML5, Vanilla CSS3, PHP, MySQL, JavaScript, Apache.</p>
    `
  }
};

// --- INITIALIZE ALL DYNAMIC ELEMENTS ---
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initWelcomeTransition();
  initThemeToggle();
  initMobileMenu();
  initScrollspy();
  initProjectModals();
  initContactForm();
});

// --- 1. CANVAS PARTICLE SYSTEM ---
function initParticles() {
  const canvas = document.getElementById('welcome-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let particlesArray = [];
  const numberOfParticles = 80;
  
  const mouse = {
    x: null,
    y: null,
    radius: 120
  };
  
  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.speedY = Math.random() * 1.5 - 0.75;
      
      const colors = ['#00f2fe', '#4facfe', '#bd00ff'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Screen edge collision
      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
      
      // Mouse interaction
      if (mouse.x != null && mouse.y != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          
          this.x -= directionX * force * 3;
          this.y -= directionY * force * 3;
        }
      }
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 110) {
          opacityValue = 1 - (distance / 110);
          ctx.strokeStyle = `rgba(79, 172, 254, ${opacityValue * 0.25})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }
  
  init();
  animate();
  
  // Re-initialize particles on resize to prevent clustering
  window.addEventListener('resize', () => {
    init();
  });
}

// --- 2. WELCOME PAGE TRANSITION ---
function initWelcomeTransition() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const enterBtn = document.getElementById('enter-btn');
  const appContent = document.getElementById('app-content');
  
  if (!welcomeScreen || !enterBtn || !appContent) return;
  
  // Check session storage to see if user has already entered this session
  if (sessionStorage.getItem('enteredPortfolio') === 'true') {
    welcomeScreen.style.display = 'none';
    appContent.classList.add('revealed');
    document.body.style.overflow = 'auto';
    return;
  }
  
  document.body.style.overflow = 'hidden'; // Lock scrolling during welcome screen
  
  enterBtn.addEventListener('click', () => {
    // Add visual exit class
    welcomeScreen.classList.add('exit');
    
    // Play transition sound effect dynamically if desired, or perform visual glow
    enterBtn.style.transform = 'scale(0.95)';
    enterBtn.style.opacity = '0';
    
    setTimeout(() => {
      welcomeScreen.style.display = 'none';
      appContent.classList.add('revealed');
      document.body.style.overflow = 'auto'; // Re-enable scrolling
      
      // Auto scroll to home section
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Set session marker
      sessionStorage.setItem('enteredPortfolio', 'true');
    }, 1200); // Must align with CSS welcome-screen exit transition duration
  });
}

// --- 3. THEME TOGGLE (DARK/LIGHT) ---
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  
  // Check stored theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    icon.className = 'fa-solid fa-sun';
  } else {
    document.body.classList.remove('light-theme');
    icon.className = 'fa-solid fa-moon';
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
      icon.className = 'fa-solid fa-sun';
      localStorage.setItem('theme', 'light');
    } else {
      icon.className = 'fa-solid fa-moon';
      localStorage.setItem('theme', 'dark');
    }
  });
}

// --- 4. MOBILE HAMBURGER MENU ---
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;
  
  const hamburgerIcon = hamburger.querySelector('i');
  
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
      hamburgerIcon.className = 'fa-solid fa-xmark';
    } else {
      hamburgerIcon.className = 'fa-solid fa-bars';
    }
  });
  
  // Close menu when clicking nav link
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburgerIcon.className = 'fa-solid fa-bars';
    });
  });
}

// --- 5. SCROLLSPY & HEADER BG ---
function initScrollspy() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    // 1. Header background blur on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // 2. Active link scrollspy
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Trigger update when section takes up the middle of the viewport
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

// --- 6. PROJECT DETAIL MODALS ---
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalTags = document.getElementById('modal-tags');
  const modalBody = document.getElementById('modal-body');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!modal || !modalClose) return;
  
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectKey = card.getAttribute('data-project');
      const details = projectDetails[projectKey];
      
      if (!details) return;
      
      // Populate content
      modalTitle.innerText = details.title;
      
      // Populate tags
      modalTags.innerHTML = '';
      details.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'project-tag';
        tagSpan.innerText = tag;
        modalTags.appendChild(tagSpan);
      });
      
      // Populate body
      modalBody.innerHTML = details.body;
      
      // Open modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock scroll when modal open
    });
  });
  
  // Close modal functionality
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scroll
  };
  
  modalClose.addEventListener('click', closeModal);
  
  // Close when clicking overlay backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// --- 7. CONTACT FORM VALIDATION & SIMULATION ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  
  if (!form || !feedback) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous feedback
    feedback.className = 'form-feedback';
    feedback.innerText = '';
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Disable inputs and button during loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Message <i class="fa-solid fa-spinner fa-spin"></i>';
    
    // Retrieve input values for simulation
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    
    // Simulate API fetch delay
    setTimeout(() => {
      // Simulate success
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      feedback.classList.add('success');
      feedback.innerText = `Thank you, ${name}! Your message has been sent successfully. Sai Raju will contact you at ${email} soon.`;
      
      // Reset form fields
      form.reset();
      
      // Remove success notice after 8 seconds
      setTimeout(() => {
        feedback.className = 'form-feedback';
        feedback.innerText = '';
      }, 8000);
      
    }, 2000);
  });
}
