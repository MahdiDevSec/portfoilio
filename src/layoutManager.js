class LayoutManager {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isSmallMobile = window.innerWidth <= 480;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.adjustLayout();
    }

    setupEventListeners() {
        // Debounce resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.isMobile = window.innerWidth <= 768;
                this.isSmallMobile = window.innerWidth <= 480;
                this.adjustLayout();
            }, 250);
        });

        // Handle scroll for dynamic header
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    adjustLayout() {
        this.adjustNavigation();
        this.adjustSkillsSection();
        this.adjustServicesSection();
        this.adjustProjectsSection();
        this.adjustContactSection();
        this.adjustFooter();
    }

    adjustNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');

        if (this.isMobile) {
            // Mobile navigation
            navbar.classList.add('mobile-nav');
            navLinks.classList.add('mobile-links');
            
            // Create bottom tab bar if it doesn't exist
            if (!document.querySelector('.bottom-tab-bar')) {
                const tabBar = document.createElement('div');
                tabBar.className = 'bottom-tab-bar';
                tabBar.innerHTML = `
                    <a href="#home" class="tab-item active">
                        <i class="fas fa-home"></i>
                        <span>Home</span>
                    </a>
                    <a href="#skills" class="tab-item">
                        <i class="fas fa-code"></i>
                        <span>Skills</span>
                    </a>
                    <a href="#services" class="tab-item">
                        <i class="fas fa-cog"></i>
                        <span>Services</span>
                    </a>
                    <a href="#projects" class="tab-item">
                        <i class="fas fa-project-diagram"></i>
                        <span>Projects</span>
                    </a>
                    <a href="#contact" class="tab-item">
                        <i class="fas fa-envelope"></i>
                        <span>Contact</span>
                    </a>
                `;
                document.body.appendChild(tabBar);

                // Handle tab clicks
                const tabs = tabBar.querySelectorAll('.tab-item');
                tabs.forEach(tab => {
                    tab.addEventListener('click', (e) => {
                        e.preventDefault();
                        tabs.forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');
                        const targetId = tab.getAttribute('href');
                        const targetSection = document.querySelector(targetId);
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    });
                });
            }
        } else {
            // Desktop navigation
            navbar.classList.remove('mobile-nav');
            navLinks.classList.remove('mobile-links');
            const tabBar = document.querySelector('.bottom-tab-bar');
            if (tabBar) {
                tabBar.remove();
            }
        }
    }

    adjustSkillsSection() {
        const skillsContainer = document.querySelector('.skills-container');
        if (!skillsContainer) return;

        if (this.isMobile) {
            // Convert hexagons to cards for better mobile UX
            const skillItems = skillsContainer.querySelectorAll('.skill-hex');
            skillItems.forEach(item => {
                item.classList.add('skill-card');
                item.classList.remove('skill-hex');
            });

            // Adjust grid layout
            skillsContainer.style.gridTemplateColumns = this.isSmallMobile ? 
                'repeat(1, 1fr)' : 'repeat(2, 1fr)';
        } else {
            // Restore hexagon layout for desktop
            const skillItems = skillsContainer.querySelectorAll('.skill-card');
            skillItems.forEach(item => {
                item.classList.remove('skill-card');
                item.classList.add('skill-hex');
            });
            skillsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
    }

    adjustNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
    
        if (this.isMobile) {
            // Remove mobile navigation elements
            navbar.style.display = 'none';
            navLinks.style.display = 'none';
                
            // Create bottom tab bar if it doesn't exist
            if (!document.querySelector('.bottom-tab-bar')) {
                const tabBar = document.createElement('div');
                tabBar.className = 'bottom-tab-bar';
                tabBar.innerHTML = `
                    <a href="#home" class="tab-item active">
                        <i class="fas fa-home"></i>
                        <span>Home</span>
                    </a>
                    <a href="#skills" class="tab-item">
                        <i class="fas fa-code"></i>
                        <span>Skills</span>
                    </a>
                    <a href="#services" class="tab-item">
                        <i class="fas fa-cog"></i>
                        <span>Services</span>
                    </a>
                    <a href="#projects" class="tab-item">
                        <i class="fas fa-project-diagram"></i>
                        <span>Projects</span>
                    </a>
                    <a href="#contact" class="tab-item">
                        <i class="fas fa-envelope"></i>
                        <span>Contact</span>
                    </a>
                `;
                document.body.appendChild(tabBar);
    
                // Handle tab clicks
                const tabs = tabBar.querySelectorAll('.tab-item');
                tabs.forEach(tab => {
                    tab.addEventListener('click', (e) => {
                        e.preventDefault();
                        tabs.forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');
                        const targetId = tab.getAttribute('href');
                        const targetSection = document.querySelector(targetId);
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    });
                });
            }
        } else {
            // Desktop navigation
            navbar.style.display = 'block';
            navLinks.style.display = 'flex';
            const tabBar = document.querySelector('.bottom-tab-bar');
            if (tabBar) {
                tabBar.remove();
            }
        }
    }
    

    adjustProjectsSection() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        if (this.isMobile) {
            // Convert to vertical scrolling list for mobile
            projectsGrid.style.gridTemplateColumns = '1fr';
            const projects = projectsGrid.querySelectorAll('.project-card');
            projects.forEach(project => {
                project.style.height = 'auto';
                project.style.maxHeight = '300px';
            });
        } else {
            // Restore grid layout for desktop
            projectsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            const projects = projectsGrid.querySelectorAll('.project-card');
            projects.forEach(project => {
                project.style.height = '400px';
                project.style.maxHeight = 'none';
            });
        }
    }

    adjustContactSection() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        if (this.isMobile) {
            // Simplify form layout for mobile
            contactForm.classList.add('mobile-form');
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.fontSize = this.isSmallMobile ? '14px' : '16px';
                input.style.padding = this.isSmallMobile ? '8px' : '10px';
            });
        } else {
            // Restore desktop form layout
            contactForm.classList.remove('mobile-form');
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.fontSize = '16px';
                input.style.padding = '12px';
            });
        }
    }

    adjustFooter() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        if (this.isMobile) {
            // Account for bottom tab bar
            footer.style.marginBottom = '60px';
        } else {
            footer.style.marginBottom = '0';
        }
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        const scrollPosition = window.scrollY;

        if (scrollPosition > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Update active tab based on scroll position
        if (this.isMobile) {
            const sections = document.querySelectorAll('section');
            const tabs = document.querySelectorAll('.tab-item');
            
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    tabs.forEach(tab => tab.classList.remove('active'));
                    tabs[index].classList.add('active');
                }
            });
        }
    }
}

// Initialize layout manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.layoutManager = new LayoutManager();
});
