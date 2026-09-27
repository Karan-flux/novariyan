import type { Request, Response } from 'express';

import { prisma } from '../lib/prisma.js';
import { createBookingSchema } from '../validators/booking.validator.js';

export async function createBooking(req: Request, res: Response) {
  const result = createBookingSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Please check the submitted booking details.',
      errors: result.error.flatten().fieldErrors,
    });
  }

  const data = result.data;

  try {
    const booking = await prisma.booking.create({
      data: {
        name: data.name,
        company: data.company || null,
        email: data.email,
        whatsapp: data.whatsapp,
        websiteUrl: data.websiteUrl || null,
        projectType: data.projectType,
        budget: data.budget || '',
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        description: data.description || null,
        source: 'WEBSITE',
        status: 'NEW',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Your consultation request has been received.',
      booking: {
        id: booking.id,
        status: booking.status,
        createdAt: booking.createdAt,
      },
    });
  } catch (error) {
    console.error('Create booking error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to submit your booking right now. Please try again.',
    });
  }
}