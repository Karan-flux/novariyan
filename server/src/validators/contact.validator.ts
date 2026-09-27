import { z } from 'zod';

export const createContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),

  email: z
    .string()
    .trim()
    .email('Please provide a valid email address')
    .max(255),

  whatsapp: z
    .string()
    .trim()
    .min(7, 'Please provide a valid WhatsApp number')
    .max(30)
    .optional()
    .or(z.literal('')),

  company: z
    .string()
    .trim()
    .max(150, 'Company name is too long')
    .optional()
    .or(z.literal('')),

  service: z
    .string()
    .trim()
    .min(2, 'Service is required')
    .max(100),

  budget: z
    .string()
    .trim()
    .max(100)
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long'),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;