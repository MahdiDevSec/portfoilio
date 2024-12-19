class TypingEffect {
    constructor() {
        this.typingTexts = document.querySelectorAll('.typing-text');
        this.init();
    }

    typeText(element, text, callback) {
        let charIndex = 0;
        element.textContent = '';
        element.style.opacity = '1';
        
        const type = () => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 50);
            } else {
                element.classList.add('finished');
                if (callback) callback();
            }
        };
        
        type();
    }

    init() {
        const startNextText = (index) => {
            if (index < this.typingTexts.length) {
                const element = this.typingTexts[index];
                const text = element.textContent.trim();
                this.typeText(element, text, () => {
                    setTimeout(() => startNextText(index + 1), 1000);
                });
            }
        };

        startNextText(0);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TypingEffect();
});
