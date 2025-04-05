// Fake data for stadiums
const stadiums = [
    {
        id: 1,
        name_en: "Dinamo Arena",
        name_ka: "დინამო არენა",
        description_en: "Home to Georgia's national football team, this historic stadium has hosted numerous international matches.",
        description_ka: "საქართველოს ეროვნული საფეხბურთო გუნდის სახლი, ამ ისტორიულ სტადიონზე ბევრი საერთაშორისო მატჩი გამართულა.",
        price: 100,
        capacity: 54000,
        location: "Tbilisi",
        amenities: ["Natural grass", "VIP boxes", "Media center"],
        image: "assets/img/dinamo.jpg"
    },
    {
        id: 2,
        name_en: "Batumi Stadium",
        name_ka: "ბათუმის სტადიონი",
        description_en: "A modern stadium with state-of-the-art facilities located in the heart of Batumi.",
        description_ka: "თანამედროვე სტადიონი უახლესი აღჭურვილობით ბათუმის ცენტრში.",
        price: 120,
        capacity: 30000,
        location: "Batumi",
        amenities: ["Artificial turf", "Training areas", "Conference rooms"],
        image: "assets/img/batumi.jpg"
    },
    {
        id: 3,
        name_en: "Mikheil Meskhi Stadium",
        name_ka: "მიხეილ მესხის სტადიონი",
        description_en: "Perfect for both professional matches and amateur tournaments.",
        description_ka: "იდეალური როგორც პროფესიონალური მატჩებისთვის, ასევე სამოყვარულო ტურნირებისთვის.",
        price: 80,
        capacity: 15000,
        location: "Mtskheta",
        amenities: ["Natural grass", "Training facilities", "Parking"],
        image: "assets/img/mikheil_mesxi.jpg"
    },
    {
        id: 4,
        name_en: "Gori Stadium",
        name_ka: "გორის სტადიონი",
        description_en: "Recently renovated stadium with excellent facilities for all sports events.",
        description_ka: "ახლახან განახლებული სტადიონი საუკეთესო პირობებით ყველა სპორტული ღონისძიებისთვის.",
        price: 75,
        capacity: 12000,
        location: "Gori",
        amenities: ["Artificial turf", "Floodlights", "Changing rooms"],
        image: "assets/img/gori_stadium.jpg"
    },
    {
        id: 5,
        name_en: "Kutaisi Central",
        name_ka: "ქუთაისის ცენტრალური",
        description_en: "Modern sports complex with multiple facilities and training areas.",
        description_ka: "თანამედროვე სპორტული კომპლექსი მრავალფეროვანი აღჭურვილობით და სავარჯიშო სივრცეებით.",
        price: 90,
        capacity: 18000,
        location: "Kutaisi",
        amenities: ["Natural grass", "Indoor facilities", "Gym"],
        image: "assets/img/kutaisi_stadium.jpg"
    },
    {
        id: 6,
        name_en: "Rustavi Arena",
        name_ka: "რუსთავის არენა",
        description_en: "Multi-purpose stadium suitable for various sports events.",
        description_ka: "მრავალფუნქციური სტადიონი სხვადასხვა სპორტული ღონისძიებებისთვის.",
        price: 70,
        capacity: 10000,
        location: "Rustavi",
        amenities: ["Artificial turf", "Running track", "Fitness center"],
        image: "assets/img/rustavi_arena.jpg"
    },
    {
        id: 7,
        name_en: "Telavi Sports Complex",
        name_ka: "თელავის სპორტული კომპლექსი",
        description_en: "Beautiful stadium surrounded by Kakheti's scenic landscapes.",
        description_ka: "ლამაზი სტადიონი კახეთის უმშვენიერეს ლანდშაფტებში.",
        price: 65,
        capacity: 8000,
        location: "Telavi",
        amenities: ["Natural grass", "Tennis courts", "Swimming pool"],
        image: "assets/img/telavi_complex.jpg"
    },
    {
        id: 8,
        name_en: "Zugdidi Municipal",
        name_ka: "ზუგდიდის მუნიციპალური",
        description_en: "Modern stadium with excellent facilities and easy access.",
        description_ka: "თანამედროვე სტადიონი საუკეთესო პირობებით და მარტივი მისასვლელით.",
        price: 60,
        capacity: 7000,
        location: "Zugdidi",
        amenities: ["Artificial turf", "Youth academy", "Cafeteria"],
        image: "assets/img/zugdidi_stadium.jpg"
    }
];

// Fake match data
const matches = [
    {
        id: 1,
        date: "2024-03-15",
        teams: "Team A vs Team B",
        score: "3-2",
        possession: "60-40",
        stadium: "Green Field Arena",
        duration: "90 min",
        highlights: ["Goal at 23'", "Penalty at 45'", "Red card at 67'"]
    },
    {
        id: 2,
        date: "2024-03-14",
        teams: "Team C vs Team D",
        score: "1-1",
        possession: "50-50",
        stadium: "Sunset Sports Hub",
        duration: "90 min",
        highlights: ["Goal at 15'", "Goal at 78'"]
    }
];

// Fake player profiles
const players = [
    {
        id: 1,
        name: "John Doe",
        age: 25,
        position: "Forward",
        matchesPlayed: 20,
        goals: 15,
        assists: 8,
        avgPlayTime: "45 min",
        maxSpeed: "28 km/h"
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 23,
        position: "Midfielder",
        matchesPlayed: 18,
        goals: 5,
        assists: 12,
        avgPlayTime: "60 min",
        maxSpeed: "25 km/h"
    }
];

// Fake analytics data
const analytics = {
    totalMatches: 150,
    totalPlayers: 500,
    averageMatchDuration: "85 min",
    popularTimes: {
        "Monday": "18:00-20:00",
        "Wednesday": "17:00-19:00",
        "Friday": "16:00-18:00",
        "Saturday": "10:00-16:00"
    },
    stadiumUtilization: {
        "Green Field Arena": "75%",
        "Sunset Sports Hub": "82%",
        "Downtown Court": "68%"
    }
};

// Function to display stadiums with language support
function displayStadiums(filters = {}) {
    const grid = document.getElementById('stadiumGrid');
    const template = document.getElementById('stadiumCardTemplate');
    const currentLang = localStorage.getItem('language') || 'en';
    
    grid.innerHTML = '';
    
    stadiums.forEach(stadium => {
        // Apply filters
        if (filters.location && filters.location !== 'all' && stadium.location !== filters.location) return;
        if (filters.maxPrice && stadium.price > filters.maxPrice) return;
        if (filters.minCapacity && stadium.capacity < filters.minCapacity) return;
        if (filters.amenities && filters.amenities.length > 0) {
            if (!filters.amenities.every(amenity => stadium.amenities.includes(amenity))) return;
        }
        
        const card = template.content.cloneNode(true);
        
        // Set stadium data for translation updates
        card.querySelector('.stadium-card').dataset.stadium = JSON.stringify(stadium);
        
        // Set content based on current language
        card.querySelector('.stadium-name').textContent = stadium[`name_${currentLang}`];
        card.querySelector('.stadium-description').textContent = stadium[`description_${currentLang}`];
        card.querySelector('.price .amount').textContent = `₾${stadium.price}`;
        card.querySelector('.capacity .amount').textContent = stadium.capacity;
        
        // Set image
        const img = card.querySelector('.stadium-image img');
        img.src = stadium.image;
        img.alt = stadium[`name_${currentLang}`];
        
        grid.appendChild(card);
    });
}

// Initialize filters
function initializeFilters() {
    const locationFilter = document.getElementById('locationFilter');
    const priceFilter = document.getElementById('priceFilter');
    const capacityFilter = document.getElementById('capacityFilter');
    const amenitiesFilter = document.getElementById('amenitiesFilter');
    
    // Populate location options
    const locations = [...new Set(stadiums.map(s => s.location))];
    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });
    
    // Add filter event listeners
    const filters = [locationFilter, priceFilter, capacityFilter, amenitiesFilter];
    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            const filterValues = {
                location: locationFilter.value,
                maxPrice: priceFilter.value ? Number(priceFilter.value) : null,
                minCapacity: capacityFilter.value ? Number(capacityFilter.value) : null,
                amenities: Array.from(amenitiesFilter.selectedOptions).map(opt => opt.value)
            };
            displayStadiums(filterValues);
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayStadiums();
    initializeFilters();
}); 