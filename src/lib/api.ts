export const LEAD_URL = 'https://functions.poehali.dev/59f86916-669b-4d53-bb91-6f41147f0543';

export type LeadPayload = {
  name: string;
  contact: string;
  task: string;
  budget?: string;
  source?: string;
  quiz?: Record<string, string>;
};

export const sendLead = async (payload: LeadPayload) => {
  const res = await fetch(LEAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('lead failed');
  return res.json();
};
