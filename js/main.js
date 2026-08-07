/* ==========================================================================
   MAIN JAVASCRIPT CONTROLLER - PERFORMANCE & ANIMATION ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 0. Preloader Initialization
  initPreloader();

  // 1. Typing Effect Logic
  initTypingEffect();

  // 2. Focus Accordion Toggle
  initAccordion();

  // 3. Low-Overhead IntersectionObserver Scroll Animations & ScrollSpy
  initScrollAnimations();

  // 4. Mobile Menu Drawer Toggle
  initMobileMenu();

  // 5. Back to Top Button
  initBackToTop();

  // 6. GitHub Showcase API Integration with Skeleton Screens
  initGitHubShowcase();

  // 7. GPU-Optimized Neural Particle Canvas Engine
  initParticleCanvas();

  // 8. Light / Dark Dual Theme Controller
  initThemeToggle();
});

/* Modern Futuristic Page Preloader Controller */
function initPreloader() {
  const preloader = document.getElementById("page-preloader");
  const progressBar = document.getElementById("preloader-progress");
  const statusText = document.getElementById("preloader-status");
  if (!preloader) return;

  let progress = 0;
  const statuses = [
    "Initializing AI Infrastructure Engine...",
    "Optimizing Render Pipeline & GPU...",
    "Loading Neural Data Streams...",
    "Systems Online & Ready"
  ];

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 15;
    if (progress > 100) progress = 100;

    if (progressBar) progressBar.style.width = progress + "%";
    
    if (statusText) {
      if (progress < 30) statusText.textContent = statuses[0];
      else if (progress < 65) statusText.textContent = statuses[1];
      else if (progress < 95) statusText.textContent = statuses[2];
      else statusText.textContent = statuses[3];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add("fade-out");
        setTimeout(() => {
          preloader.remove();
        }, 550);
      }, 300);
    }
  }, 80);

  window.addEventListener("load", () => {
    progress = 100;
  });
}

/* Typing Animation Engine */
function initTypingEffect() {
  const typingPhrases = [
    "AI Infrastructure Engineer",
    "Web Developer",
    "DevOps Enthusiast",
    "Forex Enthusiast"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typing-text");

  if (!typingElement) return;

  function typeEffect() {
    const currentPhrase = typingPhrases[phraseIdx];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 90;

    if (!isDeleting && charIdx === currentPhrase.length) {
      speed = 2200; // Hold full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % typingPhrases.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
}

/* Current Focus Accordion Menu Toggle */
function initAccordion() {
  const focusToggle = document.getElementById("focusToggle");
  const focusContent = document.getElementById("focusContent");
  const toggleIcon = document.getElementById("toggleIcon");

  if (!focusToggle || !focusContent) return;

  focusToggle.addEventListener("click", () => {
    const isOpen = focusContent.classList.contains("open");
    focusContent.classList.toggle("open");
    if (!isOpen) {
      if (toggleIcon) toggleIcon.style.transform = "rotate(180deg)";
    } else {
      if (toggleIcon) toggleIcon.style.transform = "rotate(0deg)";
    }
  });
}

/* IntersectionObserver Scroll Animations & ScrollSpy Engine (Zero Layout Reflows) */
function initScrollAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  const header = document.getElementById("header");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");

  // 1. Throttled Header Blur Controller
  let isTicking = false;
  window.addEventListener("scroll", () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          header?.classList.add("scrolled");
        } else {
          header?.classList.remove("scrolled");
        }
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // 2. High-Performance IntersectionObserver for Section Reveal
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.12 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 3. High-Performance IntersectionObserver for ScrollSpy
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            link.classList.remove("active");
            if (currentSection && link.getAttribute("href") === `#${currentSection}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }, { root: null, threshold: 0.25 });

    sections.forEach(section => sectionObserver.observe(section));
  } else {
    // Fallback for older legacy browsers
    reveals.forEach(reveal => reveal.classList.add("active"));
  }
}

/* Mobile Navigation Drawer Engine */
function initMobileMenu() {
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinksContainer = document.getElementById("nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (!mobileToggle || !navLinksContainer) return;

  mobileToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
    const icon = mobileToggle.querySelector("i");
    if (icon) {
      if (navLinksContainer.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });

  // Auto-close drawer on link click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("active");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });
}

/* Back to Top Button Controller */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================================================
   6. GITHUB SHOWCASE INTEGRATION
   ========================================================================== */
function initGitHubShowcase() {
  const username = "Jecin2378";
  const CACHE_KEY = "github_showcase_data";
  const CACHE_DURATION = 3600000; // 1 hour in milliseconds

  // Standard colors for programming languages
  const LANG_COLORS = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Jupyter Notebook': '#da5b0b',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'C++': '#f34b7d',
    'C': '#555555',
    'Java': '#b07219',
    'Go': '#00ADD8',
    'Rust': '#dea584'
  };

  // 1. Try to load from localStorage cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const cacheData = JSON.parse(cached);
      if (Date.now() - cacheData.timestamp < CACHE_DURATION) {
        renderShowcase(cacheData.profile, cacheData.repos);
        return;
      }
    } catch (e) {
      console.warn("Error parsing GitHub cached data, refetching...", e);
    }
  }

  // 2. Fetch fresh data from GitHub REST API
  Promise.all([
    fetch(`https://api.github.com/users/${username}`).then(res => {
      if (!res.ok) throw new Error("Profile fetch failed");
      return res.json();
    }),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`).then(res => {
      if (!res.ok) throw new Error("Repos fetch failed");
      return res.json();
    })
  ])
    .then(([profileData, reposData]) => {
      const processedRepos = reposData.map(r => ({
        name: r.name,
        html_url: r.html_url,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        fork: r.fork,
        updated_at: r.updated_at
      }));

      const cacheData = {
        timestamp: Date.now(),
        profile: {
          public_repos: profileData.public_repos,
          followers: profileData.followers,
          public_gists: profileData.public_gists
        },
        repos: processedRepos
      };

      // Store in cache
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

      // Render components
      renderShowcase(cacheData.profile, cacheData.repos);
    })
    .catch(err => {
      console.error("Error loading GitHub showcase data: ", err);
    });

  // Render all cards inside the Showcase section
  function renderShowcase(profile, repos) {
    renderStats(profile, repos);
    renderLanguages(repos);
    renderRepos(repos);
  }

  // Animation helper to count up values
  function animateValue(elementId, targetVal) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const startVal = parseInt(el.textContent) || 0;
    const numTarget = parseInt(targetVal) || 0;
    if (isNaN(numTarget) || startVal === numTarget) return;

    const duration = 1200; // ms
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * (numTarget - startVal) + startVal);
      el.textContent = currentVal;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = targetVal;
      }
    }
    requestAnimationFrame(update);
  }

  // Update statistics indicators
  function renderStats(profile, repos) {
    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    animateValue("stat-repos", profile.public_repos);
    animateValue("stat-followers", profile.followers);
    animateValue("stat-stars", totalStars);
    animateValue("stat-gists", profile.public_gists);
  }

  // Parse repository languages and render chart/legend
  function renderLanguages(repos) {
    const langBar = document.getElementById("lang-bar");
    const langLegend = document.getElementById("lang-legend");
    if (!langBar || !langLegend) return;

    const counts = {};
    let totalValid = 0;

    repos.forEach(repo => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1;
        totalValid++;
      }
    });

    if (totalValid === 0) return;

    const sortedLangs = Object.entries(counts)
      .map(([name, count]) => ({
        name,
        percent: Math.round((count / totalValid) * 100),
        color: LANG_COLORS[name] || '#858585'
      }))
      .sort((a, b) => b.percent - a.percent);

    langBar.innerHTML = "";
    sortedLangs.forEach(lang => {
      const segment = document.createElement("div");
      segment.className = "lang-segment";
      segment.style.width = "0%";
      segment.style.backgroundColor = lang.color;
      segment.title = `${lang.name}: ${lang.percent}%`;
      langBar.appendChild(segment);

      setTimeout(() => {
        segment.style.width = `${lang.percent}%`;
      }, 50);
    });

    langLegend.innerHTML = "";
    sortedLangs.slice(0, 6).forEach(lang => {
      const item = document.createElement("div");
      item.className = "lang-legend-item";
      item.innerHTML = `
        <span class="lang-color" style="background-color: ${lang.color};"></span>
        <span class="lang-name">${lang.name}</span>
        <span class="lang-percent">${lang.percent}%</span>
      `;
      langLegend.appendChild(item);
    });
  }

  // Filter and render Featured Repositories
  function renderRepos(repos) {
    const reposContainer = document.getElementById("github-repos-container");
    if (!reposContainer) return;

    let featured = repos.filter(r => !r.fork);
    if (featured.length < 2) {
      featured = repos;
    }

    featured.sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    const topRepos = featured.slice(0, 3);
    if (topRepos.length === 0) return;

    reposContainer.innerHTML = "";
    topRepos.forEach(repo => {
      const description = repo.description || "No description provided.";
      const langColor = LANG_COLORS[repo.language] || '#858585';
      const langName = repo.language || "Markdown";
      const truncatedName = repo.name.length > 30 ? repo.name.substring(0, 27) + "..." : repo.name;

      const itemLink = document.createElement("a");
      itemLink.href = repo.html_url;
      itemLink.target = "_blank";
      itemLink.rel = "noopener noreferrer";
      itemLink.className = "repo-item-link";

      itemLink.innerHTML = `
        <div class="repo-item">
          <div class="repo-header">
            <h4 title="${repo.name}">${truncatedName}</h4>
            <span class="repo-lang">
              <span class="lang-color" style="background-color: ${langColor};"></span>
              ${langName}
            </span>
          </div>
          <p>${description}</p>
          <div class="repo-meta">
            <span><i class="far fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
          </div>
        </div>
      `;
      reposContainer.appendChild(itemLink);
    });
  }
}

/* Mobile-Optimized Interactive Neural Constellation Particle Canvas */
function initParticleCanvas() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let isMobile = width < 768;

  const particles = [];
  // Max 18 particles on mobile for 60fps performance, max 50 on desktop
  const particleCount = isMobile ? 18 : Math.min(Math.floor(width / 26), 50);
  let mouse = { x: null, y: null, radius: isMobile ? 0 : 130 };

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    isMobile = width < 768;
  }, { passive: true });

  if (!isMobile) {
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    }, { passive: true });
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * (isMobile ? 0.4 : 0.7);
      this.vy = (Math.random() - 0.5) * (isMobile ? 0.4 : 0.7);
      this.radius = Math.random() * 1.8 + 1;
    }

    get color() {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      return isLight
        ? (Math.random() > 0.4 ? "#0284c7" : "#7c3aed")
        : (Math.random() > 0.4 ? "#00f5d4" : "#9d4edd");
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction on desktop
      if (!isMobile && mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }
      }
    }

    draw() {
      const c = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = c;
      // Disable shadowBlur on mobile for massive GPU performance gain
      if (!isMobile) {
        ctx.shadowBlur = 4;
        ctx.shadowColor = c;
      }
      ctx.fill();
      if (!isMobile) ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let animFrameId = null;
  let isCanvasActive = true;
  const maxLineDist = isMobile ? 85 : 110;

  function animate() {
    if (!isCanvasActive) return;
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const lineAlphaBase = isLight ? 0.12 : 0.16;

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxLineDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = lineAlphaBase * (1 - dist / maxLineDist);
          ctx.strokeStyle = isLight
            ? `rgba(2, 132, 199, ${alpha})`
            : `rgba(0, 245, 212, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    animFrameId = requestAnimationFrame(animate);
  }

  // IntersectionObserver to pause particle animation when hero is offscreen
  const heroSection = document.getElementById("hero");
  if ("IntersectionObserver" in window && heroSection) {
    const canvasObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isCanvasActive) {
            isCanvasActive = true;
            animate();
          }
        } else {
          isCanvasActive = false;
          if (animFrameId) cancelAnimationFrame(animFrameId);
        }
      });
    }, { threshold: 0.05 });
    canvasObserver.observe(heroSection);
  }

  // On mobile touch devices, pause canvas animation frames during active touch scrolling
  if (isMobile) {
    let touchScrollTimer = null;
    window.addEventListener("touchmove", () => {
      if (isCanvasActive) {
        isCanvasActive = false;
        if (animFrameId) cancelAnimationFrame(animFrameId);
      }
      clearTimeout(touchScrollTimer);
      touchScrollTimer = setTimeout(() => {
        const rect = heroSection?.getBoundingClientRect();
        if (rect && rect.bottom > 0 && rect.top < window.innerHeight) {
          isCanvasActive = true;
          animate();
        }
      }, 180);
    }, { passive: true });
  }

  // Pause canvas when tab is hidden to save mobile battery and memory
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      isCanvasActive = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
    } else {
      isCanvasActive = true;
      animate();
    }
  });

  animate();
}

/* Light / Dark Mode Theme Switcher Controller & Selection Modal */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeLabel = document.getElementById("theme-label");
  const modalOverlay = document.getElementById("themeModalOverlay");
  const chooseDarkBtn = document.getElementById("chooseDarkBtn");
  const chooseLightBtn = document.getElementById("chooseLightBtn");

  // Restore saved theme or open popup modal on initial visit
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateToggleUI(savedTheme);
  } else {
    // Default to dark mode initially
    document.documentElement.setAttribute("data-theme", "dark");
    updateToggleUI("dark");

    // Open popup after brief delay for smooth entrance
    setTimeout(() => {
      if (modalOverlay) modalOverlay.classList.add("active");
    }, 450);
  }

  // Modal Selection Buttons
  if (chooseDarkBtn) {
    chooseDarkBtn.addEventListener("click", () => {
      selectTheme("dark");
    });
  }

  if (chooseLightBtn) {
    chooseLightBtn.addEventListener("click", () => {
      selectTheme("light");
    });
  }

  function selectTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateToggleUI(theme);
    if (modalOverlay) modalOverlay.classList.remove("active");
  }

  // Header Toggle Button
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      selectTheme(nextTheme);
    });
  }

  function updateToggleUI(theme) {
    if (!themeIcon || !themeLabel) return;
    if (theme === "light") {
      themeIcon.className = "fas fa-moon";
      themeLabel.textContent = "Dark";
      if (toggleBtn) toggleBtn.setAttribute("title", "Switch to Dark Mode");
    } else {
      themeIcon.className = "fas fa-sun";
      themeLabel.textContent = "Light";
      if (toggleBtn) toggleBtn.setAttribute("title", "Switch to Light Mode");
    }
  }
}
