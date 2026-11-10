/**
 * siteConfig.js — Central Configuration for Yeab T. Mekasha Portfolio & CV
 * 
 * Edit your identity, availability statement, contact details, and optional
 * scheduling parameters in this single file.
 */

export const siteConfig = {
  name: 'Yeab T. Mekasha',
  title: 'Frontend Developer with full-stack experience',
  subtitle: 'Software Engineering Student at HiLCoE',
  location: 'Addis Ababa, Ethiopia (UTC+3)',
  englishLevel: 'Advanced',

  // Core availability statement used across Hero, Contact, and CV
  availabilityText:
    'Open to full-time, part-time, freelance, and contract work. Based in Addis Ababa, Ethiopia (UTC+3). English: advanced.',

  // Optional fields: empty by default, not rendered when empty
  startDate: '',
  hoursPerWeek: '',

  // Direct contact details
  email: 'yeabtsegaye350@gmail.com',
  phone: '+251 988 200 866',
  siteUrl: 'https://yeabtmekasha.netlify.app',

  // Active social links (X/Twitter removed)
  socials: {
    linkedin: 'https://www.linkedin.com/in/yeab-tsegaye-25765724b',
    github: 'https://github.com/yeab350',
    telegram: 'https://t.me/yeab350',
  },
};

/**
 * Returns formatted availability string including optional fields if present
 */
export function getFullAvailability() {
  const parts = [siteConfig.availabilityText];
  if (siteConfig.startDate && siteConfig.startDate.trim()) {
    parts.push(`Available from: ${siteConfig.startDate.trim()}.`);
  }
  if (siteConfig.hoursPerWeek && siteConfig.hoursPerWeek.trim()) {
    parts.push(`Capacity: ${siteConfig.hoursPerWeek.trim()}.`);
  }
  return parts.join(' ');
}

