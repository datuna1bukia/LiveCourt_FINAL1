const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    pricePerHour: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    seatingCapacity: {
        type: Number,
        required: true
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    surfaceType: {
        type: String,
        required: true,
        enum: ['hardwood', 'synthetic', 'rubber', 'multisport']
    },
    sportTypes: [{
        type: String,
        enum: ['basketball', 'volleyball', 'badminton', 'futsal', 'handball']
    }],
    amenities: [{
        type: String,
        enum: [
            'changing_rooms',
            'showers',
            'lockers',
            'spectator_seating',
            'parking',
            'equipment_rental',
            'water_fountains',
            'scoreboard',
            'air_conditioning',
            'lighting'
        ]
    }],
    facilities: {
        hasChangingRooms: Boolean,
        hasShowers: Boolean,
        hasLockers: Boolean,
        hasParking: Boolean,
        hasEquipmentRental: Boolean,
        hasRefreshments: Boolean,
        hasFirstAid: Boolean
    },
    openingHours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String }
    },
    location: {
        address: String,
        city: String,
        state: String,
        zipCode: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    rules: [{
        type: String
    }],
    maintenanceSchedule: [{
        date: Date,
        description: String
    }],
    status: {
        type: String,
        enum: ['available', 'maintenance', 'closed'],
        default: 'available'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Court', courtSchema); 