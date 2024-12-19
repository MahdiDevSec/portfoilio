class LayoutManager {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isSmallMobile = window.innerWidth <= 480;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.adjustLayout();
        this.setupFooterScroll();
        this.setupSkillsInteraction();
    }

    setupEventListeners() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.isMobile = window.innerWidth <= 768;
                this.isSmallMobile = window.innerWidth <= 480;
                this.adjustLayout();
            }, 250);
        });
    }

    adjustLayout() {
        this.adjustProjectsSection();
        this.adjustContactSection();
    }

    adjustProjectsSection() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        if (this.isMobile) {
            projectsGrid.style.gridTemplateColumns = '1fr';
        } else {
            projectsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
    }

    adjustContactSection() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        if (this.isMobile) {
            contactForm.classList.add('mobile-form');
        } else {
            contactForm.classList.remove('mobile-form');
        }
    }

    setupFooterScroll() {
        const footer = document.querySelector('footer');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 768) {  // Only for tablet and mobile
                const footerRect = footer.getBoundingClientRect();
                const currentScroll = window.pageYOffset;
                
                if (footerRect.top <= window.innerHeight) {
                    // User is at footer
                    if (currentScroll > lastScrollTop) {
                        // Scrolling down
                        document.body.style.overflow = 'hidden';
                    } else {
                        // Scrolling up
                        document.body.style.overflow = 'auto';
                    }
                } else {
                    document.body.style.overflow = 'auto';
                }
                
                lastScrollTop = currentScroll;
            }
        });

        // Reset on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                document.body.style.overflow = 'auto';
            }
        });
    }

    setupSkillsInteraction() {
        const skillHexes = document.querySelectorAll('.skill-hex');
        
        skillHexes.forEach(skill => {
            skill.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    const icon = skill.querySelector('i');
                    const title = skill.querySelector('h4');
                    const description = skill.querySelector('p');
                    
                    // Toggle description visibility
                    if (description.style.opacity === '1') {
                        description.style.opacity = '0';
                        icon.style.opacity = '1';
                        title.style.opacity = '1';
                    } else {
                        description.style.opacity = '1';
                        icon.style.opacity = '0';
                        title.style.opacity = '0';
                    }
                }
            });
        });
    }
}

// Initialize layout manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.layoutManager = new LayoutManager();
});
