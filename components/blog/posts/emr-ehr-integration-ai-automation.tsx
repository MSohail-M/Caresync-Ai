export default function Post() {
  return (
    <>
      <p className="lead">
        An AI voice agent or chatbot is only as useful as the data it can see. For automation to
        actually book real appointments — not just collect requests for a human to process
        later — it needs a live connection to your practice management system or EHR. Here is
        how that connection typically works.
      </p>

      <h2>Two Levels of Integration</h2>
      <p>
        Most practices fall into one of two integration patterns, often starting with the first
        and growing into the second:
      </p>
      <h3>1. Calendar-Synced Automation</h3>
      <p>
        The AI reads and writes to a shared calendar (Google Calendar, Calendly, or similar),
        which staff or the practice management system stays synced with. This is the fastest to
        set up — often live within days — and works well for practices whose PMS doesn&apos;t
        expose a convenient API, or as a first step before deeper integration.
      </p>
      <h3>2. Direct PMS/EHR Integration</h3>
      <p>
        The AI connects directly to the practice management system or EHR&apos;s API — reading
        provider schedules, appointment types, and availability rules, and writing new
        appointments directly into the system patients and staff already use. This removes the
        sync step entirely but requires the PMS/EHR to support API access (directly or via a
        local bridge).
      </p>

      <h2>Common Systems and What Integration Looks Like</h2>
      <ul>
        <li>
          <strong>Open Dental</strong> — has a documented API well-suited for appointment
          read/write integration.
        </li>
        <li>
          <strong>Dentrix / Eaglesoft</strong> — often on-premise; integration typically requires
          a local middleware/bridge service running at the practice to securely expose
          scheduling data.
        </li>
        <li>
          <strong>Jane App</strong> — cloud-based with API support for availability and booking.
        </li>
        <li>
          <strong>eClinicalWorks and other EHRs</strong> — increasingly support{' '}
          <strong>FHIR</strong> (Fast Healthcare Interoperability Resources), a standardized
          format for exchanging patient and scheduling data.
        </li>
        <li>
          <strong>GoHighLevel, Calendly, Google Calendar</strong> — commonly used as the
          &ldquo;automation layer&rdquo; calendar that the AI books into directly, especially
          during initial rollout.
        </li>
      </ul>

      <h2>Why FHIR Matters</h2>
      <p>
        FHIR standardizes how healthcare data is structured and exchanged — appointments,
        patients, providers, and more all follow a predictable schema. For AI integration, this
        means the automation layer can read availability and write bookings in a format the EHR
        already understands, rather than relying on fragile custom exports or screen-scraping.
        If your EHR supports FHIR, it&apos;s typically the most robust integration path
        available.
      </p>

      <h2>What the Integration Needs to Handle</h2>
      <ul>
        <li>
          <strong>Real-time availability</strong> — the AI must see the same open slots staff
          see, accounting for provider schedules, appointment durations, and blocked time.
        </li>
        <li>
          <strong>Appointment type matching</strong> — a cleaning, a consult, and a follow-up
          may need different durations, providers, or rooms. The integration needs to map
          patient requests to the correct appointment type.
        </li>
        <li>
          <strong>Patient matching</strong> — verifying whether a caller is an existing patient
          (and pulling the correct record) versus creating a new patient entry.
        </li>
        <li>
          <strong>Two-way sync</strong> — if a staff member moves an appointment in the PMS, the
          AI&apos;s view of availability should reflect that on the next call.
        </li>
        <li>
          <strong>Fallback handling</strong> — if the connection to the EHR is temporarily
          unavailable, the AI should take a message or offer a callback rather than booking
          against stale data.
        </li>
      </ul>

      <h2>Security Considerations for EHR Integration</h2>
      <p>
        Any integration that reads or writes patient scheduling data is handling PHI, which
        brings it under HIPAA&apos;s requirements — encrypted connections, scoped API access
        (minimum necessary), and a signed Business Associate Agreement with every system in the
        chain. For a full breakdown of what that involves, see our guide to{' '}
        <a href="/blog/hipaa-compliant-ai-bots-for-healthcare">HIPAA-compliant AI for healthcare</a>.
      </p>

      <h2>A Practical Rollout Path</h2>
      <ol>
        <li>Start with calendar-synced automation to validate the AI&apos;s booking logic with real call volume.</li>
        <li>Identify which appointment types and providers generate the most call volume, and prioritize those for integration.</li>
        <li>Connect directly to the PMS/EHR API (or FHIR endpoint) once available, removing the manual sync step.</li>
        <li>Expand to two-way sync — staff changes in the PMS automatically reflected in AI availability.</li>
      </ol>
      <p>
        Every practice management system is a little different, and the right integration path
        depends on what you&apos;re running today. If you want help mapping this out for your
        specific systems, <a href="/calendar">book a call</a> and we&apos;ll walk through your
        setup.
      </p>
    </>
  )
}
