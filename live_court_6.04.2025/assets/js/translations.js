// Language switching functionality
const translations = {
    en: {
        // Navigation
        nav_stadiums: "Stadiums",
        nav_analytics: "Analytics",
        nav_players: "Players",
        nav_about: "About",
        nav_contact: "Contact",
        nav_dashboard: "Dashboard",

        // Hero Section
        hero_title: "Find Your Perfect Sports Venue",
        hero_subtitle: "Book stadiums, track matches, and connect with players",
        hero_cta: "Find Stadiums",

        // Features Section
        features_title: "Why Choose LiveCourt?",
        features_premium_title: "Premium Venues",
        features_premium_desc: "Access to the best sports facilities in Georgia",
        features_analytics_title: "Match Analytics",
        features_analytics_desc: "Track your performance and improve your game",
        features_community_title: "Community",
        features_community_desc: "Connect with players and organize matches",

        // Footer
        footer_tagline: "Making sports accessible to everyone",
        footer_quick_links: "Quick Links",
        footer_contact: "Contact",
        footer_get_in_touch: "Get in touch",
        footer_support: "Support",
        footer_copyright: "© 2024 LiveCourt. All rights reserved."
    },
    ka: {
        // Navigation
        nav_stadiums: "სტადიონები",
        nav_analytics: "ანალიტიკა",
        nav_players: "მოთამაშეები",
        nav_about: "შესახებ",
        nav_contact: "კონტაქტი",
        nav_dashboard: "დაფა",

        // Hero Section
        hero_title: "იპოვეთ თქვენი იდეალური სპორტული მოედანი",
        hero_subtitle: "დაჯავშნეთ სტადიონები, თვალი ადევნეთ მატჩებს და დაუკავშირდით მოთამაშეებს",
        hero_cta: "სტადიონების ძიება",

        // Features Section
        features_title: "რატომ LiveCourt?",
        features_premium_title: "პრემიუმ მოედნები",
        features_premium_desc: "წვდომა საქართველოს საუკეთესო სპორტულ მოედნებზე",
        features_analytics_title: "მატჩის ანალიტიკა",
        features_analytics_desc: "თვალი ადევნეთ თქვენს შედეგებს და გააუმჯობესეთ თამაში",
        features_community_title: "საზოგადოება",
        features_community_desc: "დაუკავშირდით მოთამაშეებს და დაგეგმეთ მატჩები",

        // Footer
        footer_tagline: "სპორტი ხელმისაწვდომია ყველასთვის",
        footer_quick_links: "სწრაფი ბმულები",
        footer_contact: "კონტაქტი",
        footer_get_in_touch: "დაგვიკავშირდით",
        footer_support: "მხარდაჭერა",
        footer_copyright: "© 2024 LiveCourt. ყველა უფლება დაცულია."
    }
};

// Function to switch language
function switchLanguage(lang) {
    // Save language preference
    localStorage.setItem('language', lang);
    
    // Update HTML lang and data-language attributes
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-language', lang);
    
    // Update active state of language buttons
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang.toLowerCase()) {
            btn.classList.add('active');
        }
    });

    // Update dynamic content if it exists
    if (typeof updateDynamicContent === 'function') {
        updateDynamicContent(lang);
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get saved language or default to 'en'
    const savedLanguage = localStorage.getItem('language') || 'en';
    
    // Apply the saved language
    switchLanguage(savedLanguage);
    
    // Add click event listeners to language buttons if they exist
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.textContent.toLowerCase();
            switchLanguage(lang);
        });
    });
});

// Function to get translation
function getTranslation(key, lang) {
    lang = lang || localStorage.getItem('language') || 'en';
    return translations[lang][key] || key;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, switchLanguage, getTranslation };
} 