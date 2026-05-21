/**
 * ==========================================================================
 * LOGIQUE JAVASCRIPT - PORTFOLIO INTERACTIF
 * ==========================================================================
 * Ce fichier gère l'interactivité : animations au scroll, thème et compte à rebours.
 * Chaque fonction est expliquée pour t'aider dans ton apprentissage.
 * ==========================================================================
 */

// On attend que tout le HTML soit chargé avant de lancer le script.
document.addEventListener('DOMContentLoaded', () => {
    initTheme();          // Gestion du mode sombre/clair
    initReveal();         // Animations au défilement
    initCountdown();      // Compte à rebours AFPA
    initBurgerMenu();     // Menu mobile
});

/**
 * 0. MENU BURGER (Mobile)
 */
function initBurgerMenu() {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('#nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Change l'icône entre bars et times (X)
        const icon = burger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Ferme le menu quand on clique sur un lien
    links.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = burger.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

/**
 * 1. GESTION DU THÈME (Dark Mode)
 * Pourquoi ? Offrir un confort visuel et montrer qu'on sait gérer l'état local.
 */
function initTheme() {
    const themeBtn = document.querySelector('#theme-toggle');
    const icon = themeBtn.querySelector('i');
    
    // On récupère le thème sauvegardé ou on utilise 'light' par défaut.
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // On applique le thème au chargement.
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    themeBtn.addEventListener('click', () => {
        // Bascule entre 'light' et 'dark'.
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        
        // On met à jour l'attribut HTML et on sauvegarde.
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun'); // On montre le soleil pour repasser en clair
        } else {
            icon.classList.replace('fa-sun', 'fa-moon'); // On montre la lune pour repasser en sombre
        }
    }
}

/**
 * 2. ANIMATIONS AU DÉFILEMENT (Intersection Observer)
 * Pourquoi ? C'est beaucoup plus performant que d'écouter l'événement 'scroll'.
 */
function initReveal() {
    // On sélectionne tous les éléments ayant la classe .reveal
    const reveals = document.querySelectorAll('.reveal');

    // L'observateur va détecter quand l'élément entre dans la "fenêtre" (viewport).
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si l'élément est visible à au moins 10%
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // On peut arrêter d'observer l'élément une fois qu'il est apparu.
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // 10% de l'élément doit être visible
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

/**
 * 3. COMPTE À REBOURS (Objectif AFPA)
 * Pourquoi ? Créer un engagement et montrer qu'on sait manipuler les dates en JS.
 */
function initCountdown() {
    const display = document.querySelector('#countdown');
    if (!display) return;

    // Date cible : 20 Octobre 2026
    const targetDate = new Date('October 20, 2026 09:00:00').getTime();

    // On met à jour toutes les secondes.
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        // Calcul des jours, heures, minutes, secondes.
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (diff < 0) {
            clearInterval(timer);
            display.innerHTML = "La formation a commencé ! 🚀";
        } else {
            display.innerHTML = `J - ${days}j ${hours}h ${minutes}m ${seconds}s avant l'AFPA`;
        }
    }, 1000);
}

/**
 * CONSEIL PÉDAGOGIQUE :
 * En JavaScript, utilise 'const' pour les variables qui ne changent pas, 
 * et 'let' pour celles qui seront modifiées. Évite 'var' (obsolète).
 */
