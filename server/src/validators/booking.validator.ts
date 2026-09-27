import { z } from 'zod';

function isValidBookingDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return false;
  }

  const date = new Date(Date.UTC(year, month - 1, day));

  const isCalendarMatch =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  if (!isCalendarMatch) {
    return false;
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const todayUtcStart = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
    ),
  );

  if (date.getTime() < todayUtcStart.getTime()) {
    return false;
  }

  return date.getUTCDay() !== 0;
}

export const createBookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),

  company: z
    .string()
    .trim()
    .max(150, 'Company name is too long')
    .optional()
    .or(z.literal('')),

  email: z
    .string()
    .trim()
    .email('Please provide a valid email address')
    .max(255),

  whatsapp: z
    .string()
    .trim()
    .min(7, 'Please provide a valid WhatsApp number')
    .max(30),

  websiteUrl: z
    .string()
    .trim()
    .url('Please provide a valid website URL')
    .max(500)
    .optional()
    .or(z.literal('')),

  projectType: z
    .string()
    .trim()
    .min(2, 'Project type is required')
    .max(100),

  budget: z
    .string()
    .trim()
    .max(100)
    .optional()
    .or(z.literal('')),

  preferredDate: z
    .string()
    .trim()
    .min(1, 'Preferred date is required')
    .refine((value) => isValidBookingDate(value), {
      message: 'Please choose a valid consultation date. Sundays are unavailable.',
    }),

  preferredTime: z
    .string()
    .trim()
    .min(1, 'Preferred time is required'),

  description: z
    .string()
    .trim()
    .max(5000, 'Description is too long')
    .optional()
    .or(z.literal('')),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;