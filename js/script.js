/**
 * =============================================
 * SCRIPT PRINCIPAL
 * =============================================
 * Ce fichier contient toute la logique JavaScript du site :
 * - Basculer entre le mode clair et sombre.
 * - Compteur de jours avant la formation.
 * - Menu burger pour mobile.
 * - Scroll fluide pour les ancres.
 * =============================================
 */

/**
 * =============================================
 * ATTENDRE QUE LE DOM SOIT CHARGÉ
 * =============================================
 * On attend que le HTML soit entièrement chargé avant d'exécuter le JS.
 * Cela évite les erreurs du type "Element not found".
 * =============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialise toutes les fonctionnalités
    initThemeToggle();
    initCountdown();
    initBurgerMenu();
    initSmoothScroll();
});

/**
 * =============================================
 * FONCTION : TOGGLE THÈME (CLAIR/SOMBRE)
 * =============================================
 * Bascule entre le mode clair et sombre en cliquant sur le bouton.
 * =============================================
 */
function initThemeToggle() {
    // Sélectionne le bouton de bascule de thème
    const themeToggle = document.getElementById('theme-toggle');

    // Vérifie si le bouton existe
    if (!themeToggle) {
        console.error("Le bouton #theme-toggle n'existe pas !");
        return;
    }

    // Vérifie si un thème est déjà enregistré dans le localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Icône soleil (mode clair)
    }

    // Ajoute un écouteur d'événement au clic sur le bouton
    themeToggle.addEventListener('click', function() {
        // Bascule la classe 'dark-mode' sur le <body>
        document.body.classList.toggle('dark-mode');

        // Change l'icône du bouton
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Mode sombre activé → icône soleil
            localStorage.setItem('theme', 'dark'); // Enregistre le thème dans le localStorage
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Mode clair activé → icône lune
            localStorage.setItem('theme', 'light'); // Enregistre le thème dans le localStorage
        }
    });
}

/**
 * =============================================
 * FONCTION : COMPTEUR DE JOURS
 * =============================================
 * Affiche le nombre de jours restants avant le début de la formation (20 octobre 2026).
 * =============================================
 */
function initCountdown() {
    // Sélectionne l'élément où afficher le compteur
    const countdownElement = document.getElementById('countdown');

    // Vérifie si l'élément existe
    if (!countdownElement) {
        console.error("L'élément #countdown n'existe pas !");
        return;
    }

    // Date de début de la formation (20 octobre 2026)
    const startDate = new Date('2026-10-20T00:00:00');

    // Fonction pour calculer et afficher le compteur
    function updateCountdown() {
        const today = new Date();
        const diffTime = startDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertit les millisecondes en jours

        // Affiche le résultat dans l'élément
        countdownElement.textContent = `Il reste ${diffDays} jours avant le début de la formation DWWM !`;
    }

    // Met à jour le compteur immédiatement
    updateCountdown();

    // Met à jour le compteur toutes les 24 heures (pour éviter les erreurs si la page reste ouverte)
    setInterval(updateCountdown, 24 * 60 * 60 * 1000);
}

/**
 * =============================================
 * FONCTION : MENU BURGER (MOBILE)
 * =============================================
 * Affiche/masque le menu de navigation sur mobile.
 * =============================================
 */
function initBurgerMenu() {
    // Sélectionne le bouton menu burger et la navigation
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');

    // Vérifie si les éléments existent
    if (!burgerMenu || !nav) {
        console.error("Le bouton .burger-menu ou la nav .nav n'existe pas !");
        return;
    }

    // Ajoute un écouteur d'événement au clic sur le bouton
    burgerMenu.addEventListener('click', function() {
        nav.classList.toggle('active'); // Bascule la classe 'active' sur la nav
    });

    // NOUVEAU : Ferme le menu quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active'); // Ferme le menu
        });
    });
}

/**
 * =============================================
 * FONCTION : SCROLL FLUIDE
 * =============================================
 * Permet de scroller en douceur vers les sections quand on clique sur un lien d'ancre.
 * =============================================
 */
function initSmoothScroll() {
    // Sélectionne tous les liens qui commencent par #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Ajoute un écouteur d'événement au clic
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le comportement par défaut (scroll brutal)

            // Récupère l'ID de la section cible
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Si la section existe, scroll vers elle en douceur
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Animation fluide
                });
            }
        });
    });
}