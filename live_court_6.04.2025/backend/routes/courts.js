const express = require('express');
const router = express.Router();
const Court = require('../models/Court');

// Get all courts
router.get('/', async (req, res) => {
    try {
        const courts = await Court.find();
        res.json(courts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific court
router.get('/:id', async (req, res) => {
    try {
        const court = await Court.findById(req.params.id);
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }
        res.json(court);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Check court availability
router.get('/:id/availability', async (req, res) => {
    try {
        const { date } = req.query;
        const bookings = await Booking.find({
            court: req.params.id,
            date: new Date(date),
            status: { $ne: 'cancelled' }
        });
        
        const court = await Court.findById(req.params.id);
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }

        // Get day of week
        const dayOfWeek = new Date(date).toLocaleLowerCase();
        const openingHours = court.openingHours[dayOfWeek];
        
        // Create time slots
        const timeSlots = [];
        let currentTime = openingHours.open;
        while (currentTime < openingHours.close) {
            const isBooked = bookings.some(booking => 
                booking.startTime <= currentTime && booking.endTime > currentTime
            );
            
            timeSlots.push({
                time: currentTime,
                available: !isBooked
            });
            
            // Add 1 hour
            const [hours, minutes] = currentTime.split(':');
            const date = new Date();
            date.setHours(parseInt(hours));
            date.setMinutes(parseInt(minutes));
            date.setHours(date.getHours() + 1);
            currentTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }
        
        res.json(timeSlots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new court (admin only)
router.post('/', async (req, res) => {
    const court = new Court(req.body);
    try {
        const newCourt = await court.save();
        res.status(201).json(newCourt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a court (admin only)
router.patch('/:id', async (req, res) => {
    try {
        const court = await Court.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }
        res.json(court);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a court (admin only)
router.delete('/:id', async (req, res) => {
    try {
        const court = await Court.findByIdAndDelete(req.params.id);
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }
        res.json({ message: 'Court deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 