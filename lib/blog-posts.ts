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
    slug: 'ai-answering-service-for-medical-practices',
    title: 'AI Answering Service for Medical Practices: The Complete 2026 Guide',
    description:
      'What an AI answering service is, how it compares to human answering services on cost and outcomes, HIPAA requirements, EHR integration, and the 7 questions to ask any vendor.',
    category: 'Guides',
    date: '2026-07-16',
    readTime: '9 min read',
    keywords: [
      'AI answering service for medical practices',
      'healthcare AI answering service',
      'medical answering service',
      'AI phone answering for doctors office',
      'HIPAA compliant answering service',
    ],
    faqs: [
      {
        q: 'How is an AI answering service different from a traditional medical answering service?',
        a: 'A traditional answering service uses human operators who take messages for staff to handle later. An AI answering service resolves calls in real time — it checks live schedule availability, books or reschedules the appointment during the call, answers administrative questions, and only passes messages for things that genuinely need staff review.',
      },
      {
        q: 'How much does an AI answering service cost for a medical practice?',
        a: 'Most healthcare AI answering services charge a flat monthly fee with a bundle of included minutes, rather than per-call or per-minute rates. Total cost typically lands well below a full-time front desk hire and below high-volume human answering service bills, while covering all 168 hours of the week.',
      },
      {
        q: 'Is an AI answering service HIPAA compliant?',
        a: 'It can be — but only if the vendor signs a Business Associate Agreement, encrypts call data in transit and at rest, controls access to transcripts, and has BAAs covering every subprocessor that touches PHI (the voice AI platform, telephony carrier, and hosting). Always verify the full chain, not just the vendor.',
      },
      {
        q: 'Can an AI answering service book appointments directly into my EHR?',
        a: 'Yes, if it integrates with your EHR or practice management system via API or FHIR — for example eClinicalWorks, Dentrix, Open Dental, or Jane App. Without integration, the AI can only take messages, which eliminates most of the value. Ask vendors to demonstrate a live booking into your specific system.',
      },
    ],
  },
  {
    slug: 'ai-receptionist-vs-call-center-outsourcing',
    title: 'AI Receptionist vs. Call Center Outsourcing: Which Should Your Practice Choose?',
    description:
      'An honest comparison of AI receptionists and outsourced medical call centers — cost per appointment booked, patient experience, after-hours coverage, and where humans still win.',
    category: 'Comparisons',
    date: '2026-07-16',
    readTime: '8 min read',
    keywords: [
      'AI receptionist vs call center',
      'medical call center outsourcing',
      'AI receptionist for medical practice',
      'outsourced answering service alternative',
      'cost per appointment booked',
    ],
    faqs: [
      {
        q: 'Is an AI receptionist cheaper than outsourcing to a call center?',
        a: 'Usually, yes — and the gap widens with volume. Call centers bill per minute or per call, so busy months cost more, and after-hours coverage carries premium rates. AI receptionists charge a flat monthly rate and handle unlimited simultaneous calls, so cost stays predictable as volume grows.',
      },
      {
        q: 'Do patients prefer talking to a human or an AI?',
        a: 'Patients prefer whoever solves their problem fastest. Surveys of healthcare callers show frustration is driven by hold times, phone tag, and unresolved requests — not by whether the voice is human. An AI that answers instantly and books the appointment beats a human operator who takes a message.',
      },
      {
        q: 'Can I use both an AI receptionist and a human answering service?',
        a: 'Yes, and many practices do. The AI answers first and resolves routine scheduling and questions, then warm-transfers complex or sensitive calls to humans — either in-house staff during the day or a small outsourced team after hours. This cuts the human minutes billed dramatically.',
      },
      {
        q: 'What happens to complex calls a call center handles well today?',
        a: 'A properly scoped AI receptionist recognizes calls outside its lane — billing disputes, distressed callers, clinical questions — and transfers them to your staff immediately rather than attempting them. You keep human judgment where it matters while automating the repetitive majority.',
      },
    ],
  },
  {
    slug: 'after-hours-answering-service-for-medical-offices',
    title: 'After-Hours Answering for Medical Offices: Stop Losing Patients to Voicemail',
    description:
      'How an after-hours AI answering service captures the 123 hours a week your office is closed — booking patients overnight, escalating real emergencies, and ending on-call burnout.',
    category: 'Guides',
    date: '2026-07-16',
    readTime: '8 min read',
    keywords: [
      'after hours answering service medical office',
      'after hours medical answering service',
      '24/7 answering service for doctors',
      'overnight appointment booking',
      'on-call answering service alternative',
    ],
    faqs: [
      {
        q: 'How does the AI handle medical emergencies after hours?',
        a: 'It never attempts triage or clinical advice. Explicit escalation rules trigger an immediate handoff when urgency is detected — transferring to the on-call provider or nurse line, or instructing the caller to hang up and dial 911. Every escalation is logged and auditable.',
      },
      {
        q: 'Do I need to change my phone number to add after-hours AI answering?',
        a: 'No. Practices use conditional call forwarding on their existing line: calls forward to the AI only after N rings, when lines are busy, or outside business hours. Your front desk keeps answering normally during the day.',
      },
      {
        q: 'How many calls actually come in after hours?',
        a: 'Practices adding 24/7 answering typically find 15–30% of bookable calls arrive outside business hours — largely working patients calling after their own workday. Nearly all of these previously went to voicemail, and most voicemail callers never leave a message.',
      },
      {
        q: 'Can the AI actually book appointments at night, or just take messages?',
        a: 'If it is integrated with your calendar or practice management system, it books directly using live availability — the appointment is confirmed before the caller hangs up. Message-only setups exist but recreate the morning callback pile that makes voicemail fail.',
      },
    ],
  },
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
