// DOM Elements
const searchBox = document.getElementById('searchBox');
const stadiumList = document.getElementById('stadium-list');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayStadiums(stadiums);
    initializeSearch();
});

// Display stadiums in the grid
function displayStadiums(stadiumsToShow) {
    if (!stadiumList) return;
    
    stadiumList.innerHTML = stadiumsToShow.map(stadium => `
        <div class="stadium-card">
            <img src="${stadium.image}" alt="${stadium.name}" 
                 onerror="this.src='assets/images/placeholder.jpg'">
            <div class="stadium-card-content">
                <h3>${stadium.name}</h3>
                <p class="location">${stadium.location}</p>
                <p class="capacity">Players: ${stadium.players}/${stadium.capacity}</p>
                <div class="stadium-info">
                    <span class="rating">⭐ ${stadium.rating}</span>
                    <span class="price">$${stadium.pricePerHour}/hr</span>
                </div>
                <div class="amenities">
                    ${stadium.amenities.map(amenity => 
                        `<span class="amenity-tag">${amenity}</span>`
                    ).join('')}
                </div>
                <button class="btn-primary" onclick="viewStadiumDetails(${stadium.id})">
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize search functionality
function initializeSearch() {
    if (!searchBox) return;

    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredStadiums = stadiums.filter(stadium => 
            stadium.name.toLowerCase().includes(searchTerm) ||
            stadium.location.toLowerCase().includes(searchTerm) ||
            stadium.amenities.some(amenity => 
                amenity.toLowerCase().includes(searchTerm)
            )
        );
        displayStadiums(filteredStadiums);
    });
}

// View stadium details (to be implemented with routing)
function viewStadiumDetails(stadiumId) {
    const stadium = stadiums.find(s => s.id === stadiumId);
    if (!stadium) return;

    // For now, we'll just alert the details
    alert(`
        ${stadium.name}
        Location: ${stadium.location}
        Price: $${stadium.pricePerHour}/hr
        Current Players: ${stadium.players}/${stadium.capacity}
        Rating: ${stadium.rating}
        Amenities: ${stadium.amenities.join(', ')}
    `);
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    });
}); 