import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  PORT: z.coerce.number().int().positive().default(4000),

  FRONTEND_URL: z.string().url().transform((value) => new URL(value).origin),

  DATABASE_URL: z.string().min(1),

  ADMIN_EMAIL: z.string().email(),

  WHATSAPP_NUMBER: z.string().min(5),

  CORS_ORIGIN: z.string().url().transform((value) => new URL(value).origin),
  TRUST_PROXY_HOPS: z.coerce.number().int().min(0).max(5).default(0),
  ADMIN_COOKIE_SAME_SITE: z.enum(['lax', 'strict', 'none']).default('lax'),
}).superRefine((values, context) => {
  if (values.FRONTEND_URL.replace(/\/$/, '') !== values.CORS_ORIGIN.replace(/\/$/, '')) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['CORS_ORIGIN'],
      message: 'CORS_ORIGIN must match FRONTEND_URL.',
    });
  }

  if (values.NODE_ENV === 'production') {
    for (const field of ['FRONTEND_URL', 'CORS_ORIGIN'] as const) {
      if (new URL(values[field]).protocol !== 'https:') {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message: `${field} must use HTTPS in production.`,
        });
      }
    }

  }

  if (values.ADMIN_COOKIE_SAME_SITE === 'none' && values.NODE_ENV !== 'production') {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['ADMIN_COOKIE_SAME_SITE'],
      message: 'SameSite=None requires production Secure cookies.',
    });
  }
});

export const env = envSchema.parse(process.env);