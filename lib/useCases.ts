/* ─────────────────────────────────────────────────────────
   Casey use-case catalog — shared by the "Meet Casey" section
   (components/MeetAlice.tsx) and the detail pages
   (app/use-cases/[slug]/page.tsx). Keep slugs in sync.
   ───────────────────────────────────────────────────────── */

export type UseCase = {
  slug: string
  label: string
  heading: string
  blurb: string
  /** Longer copy for the detail page hero */
  overview: string
  color: string
  bg: string
  border: string
  features: { label: string; detail: string }[]
  steps: string[]
}

export const useCases: UseCase[] = [
  {
    slug: 'appointment-booking',
    label: 'Book Appointment',
    heading: 'Appointment Booking',
    blurb:
      'Casey books appointments directly into your EHR in real time — offering open slots, confirming the details, and texting a confirmation without any staff involvement.',
    overview:
      'Casey answers every scheduling call in under two seconds, checks live availability in your EHR, and books the visit while the patient is still on the line. No hold music, no callbacks, no double-booking — just a confirmed appointment and an automatic SMS.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.07)',
    border: 'rgba(5,150,105,0.22)',
    features: [
      { label: 'Real-time slot lookup', detail: 'Reads live availability from your EHR — never offers a slot that is already taken.' },
      { label: 'Books directly in the chart', detail: 'The appointment is created instantly, with the right provider and visit type.' },
      { label: 'Automatic SMS confirmation', detail: 'Patients get a text confirmation the moment the booking is done.' },
    ],
    steps: [
      'Patient asks to see a provider',
      'Casey checks live EHR availability',
      'Slot is booked and written to the chart',
      'Confirmation text is sent automatically',
    ],
  },
  {
    slug: 'insurance-verification',
    label: 'Insurance Verification',
    heading: 'Insurance Verification',
    blurb:
      'Casey checks eligibility live during the call — confirming active coverage, copays, and deductibles before the visit so your front desk never chases benefits again.',
    overview:
      'Casey runs a real-time eligibility check while the patient is still talking, confirming their plan is active, surfacing the copay and deductible status, and flagging out-of-network situations before they become billing headaches.',
    color: '#0D9488',
    bg: 'rgba(13,148,136,0.07)',
    border: 'rgba(13,148,136,0.22)',
    features: [
      { label: 'Live eligibility checks', detail: 'Verifies active coverage in real time against the payer.' },
      { label: 'Copay & deductible surfacing', detail: 'Tells the patient exactly what they owe before the visit.' },
      { label: 'In-network validation', detail: 'Flags out-of-network plans before the appointment is confirmed.' },
    ],
    steps: [
      'Patient shares their insurance',
      'Casey verifies coverage with the payer',
      'Copay and deductible are confirmed',
      'Eligibility is logged to the chart',
    ],
  },
  {
    slug: 'prescription-refills',
    label: 'Rx Refill Request',
    heading: 'Prescription Refills',
    blurb:
      'Patients request refills by voice or text. Casey captures the medication and pharmacy, then routes the request straight to the provider queue.',
    overview:
      'Casey handles the endless refill calls that tie up your front desk. She captures the medication, dose, and preferred pharmacy, confirms the details, and drops the request into the provider queue with an expected turnaround — no human handoff.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.07)',
    border: 'rgba(124,58,237,0.22)',
    features: [
      { label: 'Medication capture', detail: 'Confirms drug name and dose, reducing pharmacy callbacks.' },
      { label: 'Pharmacy routing', detail: 'Sends the request to the patient’s preferred pharmacy.' },
      { label: 'Provider queue handoff', detail: 'Routes to the provider for approval with a clear ETA.' },
    ],
    steps: [
      'Patient requests a refill',
      'Casey confirms medication and pharmacy',
      'Request is routed to the provider queue',
      'Patient hears the expected turnaround',
    ],
  },
  {
    slug: 'reschedule-cancel',
    label: 'Reschedule & Cancel',
    heading: 'Reschedule & Cancel',
    blurb:
      'Casey lets patients move or cancel appointments on their own — releasing the old slot, booking the new one, and texting an updated confirmation.',
    overview:
      'Reschedules and cancellations no longer tie up your front desk. Casey offers new times, moves the appointment, releases the old slot back into availability, and sends an updated confirmation — all while keeping your schedule clean.',
    color: '#EA580C',
    bg: 'rgba(234,88,12,0.07)',
    border: 'rgba(234,88,12,0.22)',
    features: [
      { label: 'Self-serve rescheduling', detail: 'Patients pick a new time without waiting on hold.' },
      { label: 'Automatic slot release', detail: 'The old appointment is freed up for other patients instantly.' },
      { label: 'Updated SMS confirmation', detail: 'A fresh confirmation text goes out the moment it changes.' },
    ],
    steps: [
      'Patient asks to change an appointment',
      'Casey offers new available times',
      'Old slot is released, new one booked',
      'Updated confirmation text is sent',
    ],
  },
  {
    slug: 'reminders-recalls',
    label: 'Reminders & Recalls',
    heading: 'Reminders & Recalls',
    blurb:
      'Casey proactively reaches out for annual visits and care gaps, then books the appointment on the spot — closing recalls without a single staff call.',
    overview:
      'Casey runs your recall and reminder campaigns automatically — reaching patients due for annual checkups or overdue on preventive care, then booking them right in the conversation. Fewer no-shows, closed care gaps, zero staff time.',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.07)',
    border: 'rgba(37,99,235,0.22)',
    features: [
      { label: 'Proactive outreach', detail: 'Reaches patients due for checkups or preventive care.' },
      { label: 'Books on the spot', detail: 'Turns a reminder into a confirmed appointment in one call.' },
      { label: 'Care gap closure', detail: 'Tracks and closes overdue screenings automatically.' },
    ],
    steps: [
      'Casey identifies a due or overdue patient',
      'She reaches out by voice or text',
      'The visit is booked in the conversation',
      'The care gap is marked closed',
    ],
  },
]

export const getUseCase = (slug: string) => useCases.find((u) => u.slug === slug)
