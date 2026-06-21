export interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  date: string
  readTime: string
  keywords: string[]
  faqs: { q: string; a: string }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ai-voice-agents-for-healthcare',
    title: 'AI Voice Agents for Healthcare: How They Answer Every Call and Book Appointments 24/7',
    description:
      'Learn how AI voice agents work in dental and medical practices — answering calls, verifying patients, booking appointments, and eliminating missed-call revenue loss around the clock.',
    category: 'Voice AI',
    date: '2026-06-13',
    readTime: '8 min read',
    keywords: [
      'AI voice agent for healthcare',
      'AI answering service for medical practice',
      'AI receptionist for dental office',
      'automated appointment booking',
      'healthcare call automation',
    ],
    faqs: [
      {
        q: 'Will patients know they are talking to an AI?',
        a: 'Most well-built healthcare voice agents disclose they are an automated assistant if asked, but are designed to sound natural and conversational. The goal is a fast, helpful interaction — not deception. Clinics can configure the agent to introduce itself by name and role.',
      },
      {
        q: 'What happens if the AI cannot handle a request?',
        a: 'A properly configured AI voice agent recognizes when a request is clinical, urgent, or outside its scope, and escalates the call to a human staff member or an on-call line rather than guessing.',
      },
      {
        q: 'Can an AI voice agent reduce missed calls?',
        a: 'Yes. Since the agent answers every call on the first or second ring — including after hours, during lunch, and when staff are busy with patients — practices typically see missed-call rates drop close to zero.',
      },
      {
        q: 'Does the AI voice agent replace front desk staff?',
        a: 'No. It handles repetitive call volume (scheduling, rescheduling, confirmations, basic questions) so front desk staff can focus on in-person patients, insurance, and complex cases.',
      },
    ],
  },
  {
    slug: 'ai-chatbots-for-dental-medical-practices',
    title: 'AI Chatbots for Dental & Medical Practices: 24/7 Patient Engagement Without Adding Staff',
    description:
      'A practical look at how AI chatbots help dental and medical practices capture leads, answer FAQs, and book appointments online — without overloading front desk staff.',
    category: 'Chatbots',
    date: '2026-06-13',
    readTime: '7 min read',
    keywords: [
      'AI chatbot for dental practice',
      'medical chatbot',
      'website chatbot for clinics',
      'patient engagement automation',
      'online appointment chatbot',
    ],
    faqs: [
      {
        q: 'Is a chatbot enough, or do I also need a voice agent?',
        a: 'Most practices benefit from both. A chatbot captures website visitors who prefer not to call, while a voice agent handles the phone line — together they cover the two main channels patients use to reach a clinic.',
      },
      {
        q: 'Can the chatbot actually book appointments, or just answer questions?',
        a: 'A properly integrated chatbot can check real-time availability and book directly into your calendar or practice management system, not just answer FAQs.',
      },
      {
        q: 'What if a patient asks a clinical question the chatbot cannot answer?',
        a: 'The chatbot should be scoped to administrative topics (hours, insurance, services, scheduling) and trained to direct clinical questions to staff or a nurse line — never to provide medical advice.',
      },
      {
        q: 'Does adding a chatbot require a website redesign?',
        a: 'No. Chatbots are typically embedded as a small widget on an existing website with a single script tag, and can also run inside SMS or Facebook Messenger.',
      },
    ],
  },
  {
    slug: 'hipaa-compliant-ai-bots-for-healthcare',
    title: 'Is Your AI Front Desk HIPAA Compliant? A Practical Guide for Clinics',
    description:
      'What "HIPAA-compliant AI" actually means for voice agents and chatbots — covering PHI handling, BAAs, data storage, access controls, and the questions clinics should ask vendors.',
    category: 'Compliance',
    date: '2026-06-13',
    readTime: '9 min read',
    keywords: [
      'HIPAA compliant AI chatbot',
      'HIPAA compliant voice agent',
      'HIPAA AI automation healthcare',
      'business associate agreement AI vendor',
      'PHI security automation',
    ],
    faqs: [
      {
        q: 'Is ChatGPT or a generic AI tool HIPAA compliant out of the box?',
        a: 'No. Most consumer AI tools do not sign Business Associate Agreements and are not configured for PHI by default. Healthcare automation requires vendors and underlying AI providers that offer a signed BAA and PHI-safe configurations.',
      },
      {
        q: 'What is a Business Associate Agreement (BAA) and why does it matter?',
        a: 'A BAA is a legally required contract between a covered entity (the clinic) and any vendor that creates, receives, maintains, or transmits PHI on its behalf. Without a signed BAA from every vendor in the chain — AI provider, automation platform, hosting — the setup is not HIPAA compliant, regardless of how secure it looks.',
      },
      {
        q: 'Does an AI voice agent need to record calls?',
        a: 'Not necessarily. Call recording and storage of transcripts containing PHI must be encrypted at rest and in transit, access-controlled, and covered by retention policies and BAAs. Some practices choose to log only structured outcomes (appointment booked, patient verified) rather than full transcripts to reduce PHI exposure.',
      },
      {
        q: 'Who is liable if an AI vendor has a data breach involving patient data?',
        a: 'Both the covered entity (the clinic) and the business associate (the vendor) can be held liable under HIPAA. This is why due diligence — BAAs, security audits, and minimum-necessary data practices — is the clinic\'s responsibility, not just the vendor\'s.',
      },
    ],
  },
  {
    slug: 'emr-ehr-integration-ai-automation',
    title: 'EMR & EHR Integration: Connecting AI Automation to Dentrix, Open Dental, eClinicalWorks, and More',
    description:
      'How AI voice agents and automation workflows connect to practice management and EHR systems like Dentrix, Open Dental, Jane App, and eClinicalWorks to read availability and write appointments.',
    category: 'Integrations',
    date: '2026-06-13',
    readTime: '8 min read',
    keywords: [
      'EMR integration AI',
      'EHR automation',
      'Dentrix API integration',
      'eClinicalWorks FHIR integration',
      'practice management system automation',
    ],
    faqs: [
      {
        q: 'Does every EMR/PMS support API integration?',
        a: 'Not equally. Cloud-based systems (Open Dental, Jane App, eClinicalWorks via FHIR) generally have documented APIs. Older on-premise systems (some Dentrix and Eaglesoft installations) may require a local bridge or middleware service running on-site to expose data securely.',
      },
      {
        q: 'What is FHIR and why does it matter for AI integration?',
        a: 'FHIR (Fast Healthcare Interoperability Resources) is a standardized data format for exchanging healthcare information. EHRs that support FHIR make it significantly easier and safer to connect AI automation, since the AI reads and writes data in a predictable, standardized structure rather than a custom format.',
      },
      {
        q: 'Can the AI write directly into my EHR, or does a human need to approve it?',
        a: 'Both models exist. Many practices start with the AI booking directly into a synced calendar (with the EHR pulling from that calendar), and move to direct EHR writes once trust and validation rules are proven — appointment type matching, provider availability, insurance checks, etc.',
      },
      {
        q: "What happens if the AI's connection to the EMR goes down mid-call?",
        a: 'A well-designed integration includes fallback logic: the AI can take a message, offer a callback, or hold the request and notify staff, rather than making a booking it cannot confirm against live data.',
      },
    ],
  },
  {
    slug: 'healthcare-dental-practice-automation-guide',
    title: 'Healthcare & Dental Practice Automation: The Complete Guide to Reducing Front Desk Workload with AI',
    description:
      'A complete overview of how AI automation — voice agents, chatbots, SMS follow-ups, and EHR integrations — work together to reduce administrative workload in dental and medical practices.',
    category: 'Automation',
    date: '2026-06-13',
    readTime: '10 min read',
    keywords: [
      'healthcare practice automation',
      'dental practice automation',
      'AI front desk for clinics',
      'reduce no-shows automation',
      'medical office automation software',
    ],
    faqs: [
      {
        q: 'Where should a practice start with automation?',
        a: 'Most practices get the fastest ROI by automating phone calls first (since missed calls directly cost revenue), then layering in SMS appointment reminders, then a website chatbot, then deeper EHR/PMS integration.',
      },
      {
        q: 'How long does it take to set up practice automation?',
        a: 'A focused voice agent and SMS reminder setup can typically go live in 1-3 weeks. Deeper EHR integrations and multi-location rollouts take longer depending on the practice management system involved.',
      },
      {
        q: 'Will automation feel impersonal to patients?',
        a: 'When designed well, automation handles repetitive logistics (scheduling, reminders, confirmations) quickly so staff have more time for the parts of care that benefit from a human touch — not less personal, just less wasted time.',
      },
      {
        q: 'How is success measured after rolling out automation?',
        a: 'Common metrics include: missed-call rate, average time to book an appointment, no-show rate after SMS reminders, after-hours bookings captured, and staff hours reclaimed from phone/admin work.',
      },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
