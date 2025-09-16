class LightDarkMode {
    constructor() {
        this.darkModeBtn = document.getElementById("darkModeBtn");
        this.modeIcon = document.getElementById("modeIcon");
        this.body = document.body;
        
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            this.applyMode(savedTheme);
        } else {
            this.applyMode("light");
        }

        this.darkModeBtn.addEventListener("click", () => {
            const currentTheme = this.body.classList.contains("dark-mode") ? "light" : "dark";
            this.applyMode(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }

    applyMode(theme) {
        if (theme === "dark") {
            this.body.classList.add("dark-mode");
            this.modeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
            this.darkModeBtn.title = "Alterar para modo Claro 🌞";
        } else {
            this.body.classList.remove("dark-mode");
            this.modeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
            this.darkModeBtn.title = "Alterar para modo Escuro 🌙";
        }
    }
}

class FontAdjuster {
    constructor() {
        this.increaseFontBtn = document.getElementById("increaseFontBtn");
        this.fontIcon = document.getElementById("fontIcon");
        this.body = document.body;
        this.isLarge = false; 
        this.init();
    }

    init() {
        this.increaseFontBtn.addEventListener("click", () => this.toggleFontSize());
    }

    toggleFontSize() {
        this.isLarge = !this.isLarge;

        if (this.isLarge) {
            this.body.style.fontSize = "1.2em";   
            this.fontIcon.classList.replace("bi-fonts", "bi-type"); 
            this.increaseFontBtn.title = "Alterar para o modo normal da fonte";
        } else {
            this.body.style.fontSize = "1em";   
            this.fontIcon.classList.replace("bi-type", "bi-fonts"); 
            this.increaseFontBtn.title = "Aumentar o tamanho da fonte";
        }
    }
}


class RelaxMode {
    constructor(){
        this.relaxModeBtn = document.getElementById("relaxModeBtn")
        this.relaxIcon = document.getElementById("relaxIcon")
        this.audio = new Audio("musica.mp3");
        this.audio.loop = true
        this.audio.volume = 0.2
        this.init();
    }

    init(){
        this.relaxModeBtn.addEventListener("click", () => this.toggleMusic())
    }

    toggleMusic(){
        if (this.audio.paused) {
            this.audio.play();
            this.relaxIcon.classList.replace("bi-headphones", "bi-pause-circle-fill");
            this.relaxModeBtn.title = "Desligar Música";
        } else {
            this.audio.pause();
            this.relaxIcon.classList.replace("bi-pause-circle-fill", "bi-headphones");
            this.relaxModeBtn.title = "Ligar Música";
        }
    }
}

new RelaxMode()


class Clock {
    constructor(element){
        this.element = document.getElementById(element)
        this.init()
    }

    init(){
        this.updateTime();
        setInterval(()=> this.updateTime(), 1000)
    }

    updateTime(){
        const currentTime = new Date()
        const hours = String(currentTime.getHours()).padStart(2, "0")
        const minutes = String(currentTime.getMinutes()).padStart(2, "0")
        const date = currentTime.toLocaleDateString("pt-BR");
        this.element.textContent =  `📅 ${date} - ${hours}:${minutes} ⏰`;
    }
}

class Modal {
    constructor(modalId, closeId){
        this.modal = document.getElementById(modalId)
        this.close = document.getElementById(closeId)
        this.modalDisplayed = false;
        this.githubButton = document.getElementById("githubButton"); 
        this.init()
    }

    init(){
        document.addEventListener("mouseout", (event)=> this.showModal(event));
        this.close.addEventListener("click", ()=> this.hideModal())

        window.addEventListener("click", (event)=> {
            if(event.target === this.modal) this.hideModal()
        })

        this.githubButton.addEventListener("click", ()=> {
            window.open("https://github.com/Ls-Leonardo", "_blank")
        })

        
    }

    showModal(event){
        if(event.clientY < 0 && !this.modalDisplayed){
            this.modal.style.display = "flex";
            this.modalDisplayed = true
        }
    }

    hideModal(){
        this.modal.style.display = "none"
    }
    
}

class ScrollObserver{
    constructor(selector){
        this.sections = document.querySelectorAll(selector)
        // Criando um observador
        this.observer = new IntersectionObserver((entries)=> { // entries representa uma lista de elementos para o Observador
            this.onIntersect(entries)
        });

        this.init()
    }

    init(){
        this.sections.forEach((section)=> this.observer.observe(section)) // olhar cada seção
    }

    onIntersect(entries){
        entries.forEach((entry)=> {
            if(entry.isIntersecting){                   // entrou no campo de visão
                this.observer.unobserve(entry.target); // para de ser observado
                entry.target.classList.add("visible") // elemento fica visivel
            }
        })
    }
}

class ScrollToTop {
    constructor(){
        this.scroll = document.getElementById("scrollToTop")
        this.init()
    }

    init(){
        this.scroll.addEventListener("click", (e)=> this.scrollToTop(e))
    }

    scrollToTop(e){
        e.preventDefault(); // impedir a ação padrão de links com #
        window.scrollTo({
            top: 0,
            behavior: "smooth" // suave
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ScrollObserver(".fade-section");
    new ScrollToTop();
    new Clock("time-date")
    new Modal("modal", "closeModal")
    new LightDarkMode();
    new FontAdjuster();
    new RelaxMode();

    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Fechar menu para links diretos
    navLinks.forEach(link => {
        if (!link.classList.contains('dropdown-toggle')) {
            link.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        }
    });

    // Fechar menu para links do dropdown
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});



    


    
