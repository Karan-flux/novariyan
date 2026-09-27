import type { Request, Response } from 'express';

import { prisma } from '../lib/prisma.js';
import { createContactSchema } from '../validators/contact.validator.js';

export async function createContact(req: Request, res: Response) {
  const result = createContactSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Please check the submitted contact details.',
      errors: result.error.flatten().fieldErrors,
    });
  }

  const data = result.data;

  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp || null,
        company: data.company || null,
        service: data.service,
        budget: data.budget || '',
        message: data.message,
        status: 'NEW',
        source: 'WEBSITE',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been received. We will get back to you shortly.',
      lead: {
        id: lead.id,
        status: lead.status,
        createdAt: lead.createdAt,
      },
    });
  } catch (error) {
    console.error('Create contact lead error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to submit your enquiry right now. Please try again.',
    });
  }
}