import { CONTACT_EMAIL, ORG_POSTAL_ADDRESS } from "@/lib/legal";

function Contact() {
  return (
    <p>
      {CONTACT_EMAIL ? (
        <>Grievance Officer: <a className="text-emerald-700 underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>
      ) : (
        <>Contact details for the Grievance Officer will be published here.</>
      )}
      {ORG_POSTAL_ADDRESS ? <> Postal address: {ORG_POSTAL_ADDRESS}.</> : null}
    </p>
  );
}

const wrap = "container mx-auto px-6 py-12 max-w-3xl space-y-4 text-slate-700 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:pt-4 [&_ul]:list-disc [&_ul]:pl-6";

export function Privacy() {
  return (
    <div className={wrap}>
      <h1 className="text-3xl font-black font-serif text-slate-900">Privacy Policy and Terms</h1>
      <p>Last updated: 2 October 2026. This notice is given under the Digital Personal Data Protection Act, 2023 (India).</p>
      <h2>What we collect</h2>
      <ul>
        <li>Your name, email address, city and country, entered in the pledge form.</li>
        <li>A photo you choose to add. It is used to build your certificate image in your browser.</li>
        <li>Whether you are an adult, or a minor with a parent or guardian's consent.</li>
      </ul>
      <h2>Why</h2>
      <p>To record your plantation pledge and generate your certificate. We do not sell your data, run advertising, or track you across sites. This site does not use analytics or session recording, and fonts are served from our own server.</p>
      <h2>Children (under 18)</h2>
      <p>Under the DPDP Act, a person under 18 is a child. A child may use this form only with a parent or guardian's consent, which the parent or guardian confirms on the form. We do not track or target children.</p>
      <h2>Retention and your rights</h2>
      <p>We keep pledge details only as long as needed for the plantation drive and its records. You may ask to access, correct or erase your data, or withdraw consent, at any time by writing to the Grievance Officer below.</p>
      <h2>Terms of use</h2>
      <ul>
        <li>Upload only photos you own or have permission to use, of yourself or people who agree.</li>
        <li>Do not upload content that is unlawful, infringing, abusive or sexual. We may remove it.</li>
        <li>Certificates are symbolic acknowledgements of your pledge.</li>
      </ul>
      <h2>Grievance Officer</h2>
      <Contact />
      <p>See also our <a className="text-emerald-700 underline" href="/takedown">content takedown process</a>.</p>
    </div>
  );
}

export function Takedown() {
  return (
    <div className={wrap}>
      <h1 className="text-3xl font-black font-serif text-slate-900">Report Content / Takedown</h1>
      <p>If you believe content on this site infringes your copyright, shows you or your child without consent, or is otherwise unlawful, tell us. We act under the IT (Intermediary Guidelines) Rules, 2021.</p>
      <h2>What to include</h2>
      <ul>
        <li>Where the content appears (page and description).</li>
        <li>What right is infringed or why it is unlawful.</li>
        <li>Your name and a way to contact you.</li>
        <li>A statement that the information is accurate and you are the owner or authorised to act for them.</li>
      </ul>
      <h2>What we do</h2>
      <p>We acknowledge a complaint within 24 hours and resolve it within 15 days. Infringing or unlawful content is removed, and users who repeatedly infringe are removed from the service.</p>
      <h2>Send your complaint to</h2>
      <Contact />
    </div>
  );
}
