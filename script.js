// DOM Elements
const navbar = document.getElementById("navbar")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const themeToggle = document.getElementById("theme-toggle")
const typingText = document.querySelector(".typing-text")
const terminalOutput = document.getElementById("terminal-output")
const skillBars = document.querySelectorAll(".skill-progress")
const galleryTabs = document.querySelectorAll(".tab-btn")
const galleryContent = document.querySelectorAll(".gallery-tab")
const contactForm = document.getElementById("contact-form")

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i")
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
}

// Navigation
function handleNavToggle() {
  navMenu.classList.toggle("active")

  // Animate hamburger bars
  const bars = navToggle.querySelectorAll(".bar")
  bars.forEach((bar, index) => {
    bar.style.transform = navMenu.classList.contains("active")
      ? `rotate(${index === 0 ? "45deg" : index === 2 ? "-45deg" : "0"}) translate(${index === 1 ? "0, 0" : index === 0 ? "6px, 6px" : "6px, -6px"})`
      : "none"
    bar.style.opacity = index === 1 && navMenu.classList.contains("active") ? "0" : "1"
  })
}

function handleNavClick(e) {
  if (e.target.classList.contains("nav-link")) {
    navMenu.classList.remove("active")

    // Reset hamburger bars
    const bars = navToggle.querySelectorAll(".bar")
    bars.forEach((bar) => {
      bar.style.transform = "none"
      bar.style.opacity = "1"
    })
  }
}

// Navbar scroll effect
function handleScroll() {
  if (window.scrollY > 50) {
    navbar.style.background =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "rgba(17, 24, 39, 0.98)"
        : "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "rgba(17, 24, 39, 0.95)"
        : "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }

  // Update active nav link
  updateActiveNavLink()

  // Trigger scroll animations
  handleScrollAnimations()
}

// Active navigation link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Typing animation for hero section
function startTypingAnimation() {
  const texts = ["Computer-Science Student","Frontend Developer", "Video Editor", "Creative Problem Solver", "Tech Enthusiast"]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function type() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(type, typeSpeed)
  }

  type()
}

// Interactive Terminal System
function initInteractiveTerminal() {
  const terminalInput = document.getElementById("terminal-input")
  const terminalOutput = document.getElementById("terminal-output")
  const terminalWelcome = document.getElementById("terminal-welcome")

  // Terminal commands and responses
  const commands = {
    help: {
      description: "Show available commands",
      output: `
<div class="command-output">
  <h4>Available Commands:</h4>
  <ul>
    <li><span class="success">about</span> - Personal information and background</li>
    <li><span class="success">education</span> - Educational background and achievements</li>
    <li><span class="success">skills</span> - Technical skills and expertise</li>
    <li><span class="success">experience</span> - Work experience and internships</li>
    <li><span class="success">certifications</span> - Certificates and achievements</li>
    <li><span class="success">projects</span> - Portfolio projects and work</li>
    <li><span class="success">interests</span> - Hobbies and personal interests</li>
    <li><span class="success">contact</span> - Contact information</li>
    <li><span class="success">social</span> - Social media links</li>
    <li><span class="success">clear</span> - Clear terminal screen</li>
    <li><span class="success">whoami</span> - Current user information</li>
    <li><span class="success">date</span> - Current date and time</li>
  </ul>
</div>`,
    },
    about: {
      description: "Personal information",
      output: `
<div class="command-output">
  <h4>About Devulapalli Abhiram</h4>
  <p>👨‍💻 B.Sc. Computer Science Student (3rd Year)</p>
  <p>🏫 Sri Sathya Sai Institute of Higher Learning</p>
  <p>📍 Andhra Pradesh, India</p>
  <p>🎯 Passionate about web development, video editing, and problem-solving</p>
  <p>🌟 Combining technical skills with creative thinking to build innovative solutions</p>
  <p>💡 Always eager to learn new technologies and take on challenging projects</p>
</div>`,
    },
    education: {
      description: "Educational background",
      output: `
<div class="command-output">
  <h4>Educational Background</h4>
  <p><strong>🎓 Current:</strong> B.Sc. Computer Science (3rd Year)</p>
  <p>   📍 Sri Sathya Sai Institute of Higher Learning</p>
  <p><strong>🏫 Intermediate:</strong> Sree Navodaya (MPC) - 60%</p>
  <p><strong>🏫 School:</strong> Mahathi Public School - 70%</p>
  <p><strong>📚 Focus Areas:</strong></p>
  <ul>
    <li>Data Structures & Algorithms</li>
    <li>Database Management Systems</li>
    <li>Web Development</li>
    <li>Software Engineering</li>
  </ul>
</div>`,
    },
    skills: {
      description: "Technical skills",
      output: `
<div class="command-output">
  <h4>Technical Skills</h4>
  <p><strong>💻 Frontend Development:</strong></p>
  <ul>
    <li>HTML5 - Advanced</li>
    <li>CSS3 - Advanced</li>
    <li>JavaScript - Intermediate</li>
    <li>Responsive Design</li>
  </ul>
  <p><strong>🎬 Video Editing & 3D Model </strong></p>
  <ul>
    <li>Adobe Premiere Pro</li>
    <li>DaVinci Resolve</li>
    <li>Adobe After Effects</li>
    <li>Adobe Creative Suite</li>
    <li>Blender</li>
  </ul>
  <p><strong>🗄️ Database:</strong></p>
  <ul>
    <li>SQL - Certified (HackerRank)</li>
    <li>Database Design</li>
    <li>Query Optimization</li>
  </ul>
  <p><strong>🛠️ Tools & Others:</strong></p>
  <ul>
    <li>Git & Version Control</li>
    <li>Problem Solving</li>
    <li>Project Management</li>
  </ul>
</div>`,
    },
    experience: {
      description: "Work experience",
      output: `
<div class="command-output">
  <h4>Professional Experience</h4>
  <p><strong>💼 CodSoft - Web Development Intern</strong></p>
  <p>   🗓️ Duration: Recent Internship</p>
  <p>   📋 Responsibilities:</p>
  <ul>
    <li>Developed responsive web applications</li>
    <li>Worked with HTML, CSS, and JavaScript</li>
    <li>Collaborated on real-world projects</li>
    <li>Learned industry best practices</li>
    <li>Gained hands-on experience in web development</li>
  </ul>
  <p><strong>🎯 Key Achievements:</strong></p>
  <ul>
    <li>Successfully completed all assigned projects</li>
    <li>Received positive feedback from mentors</li>
    <li>Enhanced technical and soft skills</li>
  </ul>
</div>`,
    },
    certifications: {
      description: "Certificates and achievements",
      output: `
<div class="command-output">
  <h4>Certifications & Achievements</h4>
  <p><strong>🏆 HackerRank Certifications:</strong></p>
  <ul>
    <li>✅ SQL (Basic) - Verified</li>
    <li>✅ CSS (Basic) - Verified</li>
  </ul>
  <p><strong>📜 Udemy Courses (2 Completed):</strong></p>
  <ul>
    <li>Web Development Fundamentals</li>
    <li>Advanced JavaScript Concepts</li>
  </ul>
  <p><strong>🎓 Coursera Courses (3 Completed):</strong></p>
  <ul>
    <li>Computer Science Fundamentals</li>
    <li>Data Structures and Algorithms</li>
    <li>Database Management Systems</li>
  </ul>
  <p><strong>🌟 Additional Achievements:</strong></p>
  <ul>
    <li>Academic Excellence in Computer Science</li>
    <li>Active participation in coding competitions</li>
    <li>Leadership roles in college activities</li>
  </ul>
</div>`,
    },
    projects: {
      description: "Portfolio projects",
      output: `
<div class="command-output">
  <h4>Projects & Portfolio</h4>
  <p><strong>🚀 Featured Projects:</strong></p>
  <p><strong>1. Personal Portfolio Website</strong></p>
  <ul>
    <li>Responsive design with modern animations</li>
    <li>Interactive terminal interface</li>
    <li>Dark/Light mode toggle</li>
    <li>Tech: HTML, CSS, JavaScript</li>
  </ul>
  <p><strong>2. CodSoft Internship Projects</strong></p>
  <ul>
    <li>Multiple web development projects</li>
    <li>Real-world application development</li>
    <li>Industry-standard coding practices</li>
  </ul>
  <p><strong>3. Video Editing Showcase</strong></p>
  <ul>
    <li>Creative video projects</li>
    <li>Adobe Creative Suite mastery</li>
    <li>DaVinci Resolve expertise</li>
  </ul>
</div>`,
    },
    interests: {
      description: "Hobbies and interests",
      output: `
<div class="command-output">
  <h4>Interests & Hobbies</h4>
  <p><strong>🏏 Sports:</strong></p>
  <ul>
    <li>Cricket - Active player and enthusiast</li>
    <li>Participated in college tournaments</li>
    <li>Team player with leadership skills</li>
  </ul>
  <p><strong>🎭 Arts & Culture:</strong></p>
  <ul>
    <li>Drama performances</li>
    <li>Stunt performances</li>
    <li>Cultural event participation</li>
  </ul>
  <p><strong>💻 Technology:</strong></p>
  <ul>
    <li>Exploring new programming languages</li>
    <li>Following tech trends and innovations</li>
    <li>Open source contributions</li>
  </ul>
  <p><strong>🎬 Creative Work:</strong></p>
  <ul>
    <li>Video editing and production</li>
    <li>Creative storytelling</li>
    <li>Digital content creation</li>
  </ul>
</div>`,
    },
    contact: {
      description: "Contact information",
      output: `
<div class="command-output">
  <h4>Contact Information</h4>
  <p><strong>📧 Email:</strong> abhiramdevulapalli8@gmail.com</p>
  <p><strong>🏫 Institution:</strong> Sri Sathya Sai Institute of Higher Learning</p>
  <p><strong>📍 Location:</strong> Andhra Pradesh, India</p>
  <p><strong>💼 Status:</strong> Available for internships and collaborations</p>
  <p><strong>🤝 Open to:</strong></p>
  <ul>
    <li>Web development projects</li>
    <li>Video editing collaborations</li>
    <li>Technical discussions</li>
    <li>Learning opportunities</li>
  </ul>
</div>`,
    },
    social: {
      description: "Social media links",
      output: `
<div class="command-output">
  <h4>Connect With Me</h4>
  <p><strong>🔗 Social Media:</strong></p>
  <ul>
    <li>🐙 GitHub: github.com/abhiram</li>
    <li>💼 LinkedIn: linkedin.com/in/abhiram</li>
    <li>📸 Instagram: @abhiram</li>
  </ul>
  <p><strong>💡 Let's connect and collaborate!</strong></p>
  <p>Feel free to reach out for:</p>
  <ul>
    <li>Project collaborations</li>
    <li>Technical discussions</li>
    <li>Networking opportunities</li>
    <li>Knowledge sharing</li>
  </ul>
</div>`,
    },
    whoami: {
      description: "Current user",
      output: `
<div class="command-output">
  <p>abhiram</p>
  <p>Devulapalli Abhiram - Computer Science Student & Developer</p>
</div>`,
    },
    date: {
      description: "Current date and time",
      output: `
<div class="command-output">
  <p>${new Date().toString()}</p>
</div>`,
    },
  }

  // Handle terminal input
  terminalInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const command = this.value.trim().toLowerCase()

      // Add command to output
      const commandLine = document.createElement("div")
      commandLine.innerHTML = `
        <div class="terminal-line">
          <span class="prompt">abhiram@dev:~$</span>
          <span class="command">${this.value}</span>
        </div>
      `
      terminalOutput.appendChild(commandLine)

      // Process command
      if (command === "clear") {
        terminalOutput.innerHTML = ""
      } else if (commands[command]) {
        const output = document.createElement("div")
        output.innerHTML = commands[command].output
        terminalOutput.appendChild(output)
      } else if (command === "") {
        // Do nothing for empty command
      } else {
        const errorOutput = document.createElement("div")
        errorOutput.innerHTML = `
          <div class="command-output">
            <p class="error">Command not found: ${command}</p>
            <p>Type 'help' to see available commands</p>
          </div>
        `
        terminalOutput.appendChild(errorOutput)
      }

      // Clear input and scroll to bottom
      this.value = ""
      terminalOutput.scrollTop = terminalOutput.scrollHeight
    }
  })

  // Focus terminal input when terminal is clicked
  document.querySelector(".terminal").addEventListener("click", () => {
    terminalInput.focus()
  })

  // Auto-focus terminal input
  terminalInput.focus()
}

// Skill bars animation
function animateSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBar = entry.target
        const width = skillBar.getAttribute("data-width")
        skillBar.style.width = width
      }
    })
  })

  skillBars.forEach((bar) => observer.observe(bar))
}

// Gallery tabs
function initGalleryTabs() {
  galleryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab")

      // Remove active class from all tabs and content
      galleryTabs.forEach((t) => t.classList.remove("active"))
      galleryContent.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      tab.classList.add("active")
      document.getElementById(targetTab).classList.add("active")
    })
  })
}

// Scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible")
    }
  })
}

// Add scroll animation classes to elements
function addScrollAnimationClasses() {
  // Add classes to various elements for scroll animations
  document.querySelectorAll(".skill-category").forEach((el, index) => {
    el.classList.add(index % 2 === 0 ? "slide-in-left" : "slide-in-right")
  })

  document.querySelectorAll(".cert-card").forEach((el) => {
    el.classList.add("fade-in")
  })

  document.querySelectorAll(".project-card").forEach((el) => {
    el.classList.add("fade-in")
  })

  document.querySelectorAll(".gallery-item").forEach((el) => {
    el.classList.add("fade-in")
  })
}

// Contact form
function handleContactForm(e) {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}!`)

    submitBtn.textContent = originalText
    submitBtn.disabled = false
    contactForm.reset()
  }, 2000)
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Parallax effect for hero section
function initParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-element")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Quick contact form in footer
function handleQuickContactForm(e) {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)
  const name = formData.get("name") || form.querySelector('input[type="text"]').value
  const email = formData.get("email") || form.querySelector('input[type="email"]').value

  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert(`Thank you, ${name}! Your message has been sent successfully!`)
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    form.reset()
  }, 2000)
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initTheme()

  // Start animations
  startTypingAnimation()
  initInteractiveTerminal()
  animateSkillBars()

  // Initialize components
  initGalleryTabs()
  initSmoothScrolling()
  initParallaxEffect()
  addScrollAnimationClasses()

  // Event listeners
  themeToggle.addEventListener("click", toggleTheme)
  navToggle.addEventListener("click", handleNavToggle)
  navMenu.addEventListener("click", handleNavClick)
  window.addEventListener("scroll", handleScroll)
  contactForm.addEventListener("submit", handleContactForm)
  document.getElementById("quick-contact-form").addEventListener("submit", handleQuickContactForm)

  // Initial scroll check
  handleScroll()
  handleScrollAnimations()
})

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active")
    const bars = navToggle.querySelectorAll(".bar")
    bars.forEach((bar) => {
      bar.style.transform = "none"
      bar.style.opacity = "1"
    })
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Intersection Observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Observe elements for animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".cert-card, .project-card, .skill-category, .gallery-item")
  animatedElements.forEach((el) => observer.observe(el))
})
