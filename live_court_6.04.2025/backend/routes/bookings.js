const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Court = require('../models/Court');

// Get all bookings for a user
router.get('/user', async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('court')
            .sort({ date: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific booking
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('court');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        // Check if user owns the booking or is admin
        if (booking.user.toString() !== req.user._id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new booking
router.post('/', async (req, res) => {
    try {
        const { courtId, date, startTime, duration } = req.body;
        
        // Check if court exists
        const court = await Court.findById(courtId);
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }
        
        // Calculate end time
        const [hours, minutes] = startTime.split(':');
        const endDate = new Date();
        endDate.setHours(parseInt(hours));
        endDate.setMinutes(parseInt(minutes));
        endDate.setHours(endDate.getHours() + duration);
        const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
        
        // Check if time slot is available
        const existingBooking = await Booking.findOne({
            court: courtId,
            date: new Date(date),
            status: { $ne: 'cancelled' },
            $or: [
                {
                    startTime: { $lt: endTime },
                    endTime: { $gt: startTime }
                }
            ]
        });
        
        if (existingBooking) {
            return res.status(400).json({ message: 'Time slot is not available' });
        }
        
        // Calculate total price
        const totalPrice = court.pricePerHour * duration;
        
        // Create booking
        const booking = new Booking({
            court: courtId,
            user: req.user._id,
            date,
            startTime,
            endTime,
            duration,
            totalPrice
        });
        
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a booking status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        // Only allow cancellation if booking is in the future
        if (status === 'cancelled') {
            const bookingDate = new Date(booking.date);
            if (bookingDate < new Date()) {
                return res.status(400).json({ message: 'Cannot cancel past bookings' });
            }
        }
        
        booking.status = status;
        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update payment status
router.patch('/:id/payment', async (req, res) => {
    try {
        const { paymentStatus, paymentId } = req.body;
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        booking.paymentStatus = paymentStatus;
        booking.paymentId = paymentId;
        
        if (paymentStatus === 'completed') {
            booking.status = 'confirmed';
        }
        
        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 