class TypingEffect {
    constructor() {
        this.typingTexts = document.querySelectorAll('.typing-text');
        this.init();
    }

    init() {
        this.typingTexts.forEach((element, index) => {
            const text = element.textContent.trim();
            element.textContent = '';
            element.style.opacity = '1';
            
            let charIndex = 0;
            const typeChar = () => {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 50); // Adjust speed here
                } else {
                    element.classList.add('finished');
                    // Start next text if available
                    if (index < this.typingTexts.length - 1) {
                        setTimeout(() => {
                            this.typingTexts[index + 1].classList.add('visible');
                        }, 1000);
                    }
                }
            };

            // Start typing when element becomes visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        element.classList.add('visible');
                        typeChar();
                    }, index * 500);
                    observer.disconnect();
                }
            });
            
            observer.observe(element);
        });
    }
}

// Initialize typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypingEffect();
});
