// Editable site-wide placeholders. Replace once the organization provides real details.
// Later these will be served from the organizationSettings collection via the admin panel.
export const siteConfig = {
  established: '2022-07-01',
  // Official external member registration form (public respondent link, not the /edit link).
  memberFormUrl: 'https://docs.google.com/forms/d/11B6ezqN2LUOunF0eiQLWLV_xmjLaIosZWlricJG6Urs/viewform',
  contact: {
    // PLACEHOLDERS: to be provided by the organization.
    email: '',
    phone: '',
    address: '',
  },
  social: {
    // PLACEHOLDERS: leave empty to hide the icon.
    facebook: '',
    youtube: '',
  },
  // The constitution is marked as a preliminary draft on its cover page.
  constitution: {
    isDraft: true,
    lastUpdated: '2026-07',
    pdfUrl: '/constitution.pdf',
  },
};
