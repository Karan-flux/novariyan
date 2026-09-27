
import { SITE_CONFIG } from '../config/site';

export interface BookingWhatsAppPayload {
  name: string;
  company?: string;
  projectType: string;
  budget?: string;
  preferredDate: string;
  preferredTime: string;
  description?: string;
}

export interface ContactWhatsAppPayload {
  name: string;
  company?: string;
  service: string;
  budget?: string;
  message?: string;
}

/**
 * Returns the WhatsApp number in the format required by wa.me.
 * Example:
 * +91 84719 86282 -> 918471986282
 */
function getWhatsAppNumber(): string {
  return SITE_CONFIG.whatsappNumber.replace(/\D/g, '');
}

/**
 * Generates a contextual WhatsApp message based on the current route.
 */
export function getContextualWhatsAppMessage(pathname: string): string {
  if (pathname.startsWith('/services/web-development')) {
    return "Hi Novariyan, I'm interested in your custom Web Development services. I'd like to discuss my project.";
  }

  if (pathname.startsWith('/services/web-design')) {
    return "Hi Novariyan, I'm interested in your Web Design & UI/UX services. I'd like to discuss my project.";
  }

  if (pathname.startsWith('/services/ecommerce')) {
    return "Hi Novariyan, I'm looking to build or upgrade an E-Commerce store and would like to discuss my project.";
  }

  if (pathname.startsWith('/services/3d-interactive')) {
    return "Hi Novariyan, I'm interested in a 3D & Interactive web experience. Let's discuss what we can build.";
  }

  if (pathname.startsWith('/services/seo')) {
    return "Hi Novariyan, I'm interested in Technical SEO Optimization for my website.";
  }

  if (pathname.startsWith('/services/maintenance')) {
    return "Hi Novariyan, I'm looking for ongoing Website Maintenance & Support.";
  }

  if (pathname.startsWith('/work')) {
    return "Hi Novariyan, I just explored your portfolio work and would love to discuss a project for my business.";
  }

  if (pathname.startsWith('/book')) {
    return "Hi Novariyan, I'd like to schedule a discovery consultation for my upcoming website project.";
  }

  if (pathname.startsWith('/contact')) {
    return "Hi Novariyan, I'm interested in your web development services and would like to discuss a project.";
  }

  return "Hi Novariyan, I'm interested in your web development services. I'd like to discuss my project.";
}

/**
 * Generates a pre-filled WhatsApp deep link.
 */
export function createWhatsAppUrl(
  customMessage?: string,
  pathname = '/',
): string {
  const text =
    customMessage?.trim() || getContextualWhatsAppMessage(pathname);

  const encodedMessage = encodeURIComponent(text);
  const number = getWhatsAppNumber();

  return `https://wa.me/${number}?text=${encodedMessage}`;
}

/**
 * Generates a structured WhatsApp deep link for a booking request.
 *
 * This is a fallback communication channel.
 * The primary booking flow will eventually submit the request
 * to the Novariyan API/database first.
 */
export function createBookingWhatsAppUrl(
  payload: BookingWhatsAppPayload,
): string {
  const lines = [
    'Hi Novariyan, I would like to confirm my consultation request:',
    '',
    `• Name: ${payload.name}`,
    payload.company ? `• Company: ${payload.company}` : null,
    `• Project Type: ${payload.projectType}`,
    payload.budget ? `• Estimated Budget: ${payload.budget}` : null,
    `• Preferred Date: ${payload.preferredDate}`,
    `• Preferred Time: ${payload.preferredTime}`,
    payload.description
      ? `• Project Brief: ${payload.description}`
      : null,
  ].filter((line): line is string => Boolean(line));

  return createWhatsAppUrl(lines.join('\n'));
}

/**
 * Generates a structured WhatsApp deep link from the contact form.
 */
export function createContactWhatsAppUrl(
  payload: ContactWhatsAppPayload,
): string {
  const lines = [
    'Hi Novariyan, I am reaching out regarding a new project enquiry:',
    '',
    `• Name: ${payload.name}`,
    payload.company ? `• Company: ${payload.company}` : null,
    `• Service Needed: ${payload.service}`,
    payload.budget ? `• Budget Range: ${payload.budget}` : null,
    payload.message ? `• Project Details: ${payload.message}` : null,
  ].filter((line): line is string => Boolean(line));

  return createWhatsAppUrl(lines.join('\n'));
}

