# Plan: Dedicated About Us Page (DYPCET & Capstone Group 13)

This plan details the addition of a dedicated "About Us" page in the GramUrja application. It will showcase college details from `https://coek.dypgroup.edu.in/` (DYPCET Kolhapur), project developer details for **Capstone Group 13**, and local leadership info.

---

## Proposed Upgrades

### 1. New SPA Route for About Us
- Register a new route `about` inside the SPA router in [`js/app.js`](file:///d:/projects/capstom/js/app.js).
- Define `Pages.about()` in [`js/pages-core.js`](file:///d:/projects/capstom/js/pages-core.js).
- Update the landing page header navbar to include a link to the "About Us" page.

### 2. About Us Page Design
- **Institutional Background**: Detailed description of **D. Y. Patil College of Engineering & Technology, Kolhapur** (Autonomous, NAAC 'A' Grade, NBA Accredited).
- **Project Developer Details**: Dedicated card for **Capstone Group 13**, representing First Year CSE (AI & ML) students:
  - Atharv Hogade (Roll No 26)
  - Vitthal Patil (Roll No 132)
  - Shubham Lohar (Roll No 17)
  - Gopal Piwal (Roll No 99)
  - Yogesh Mali (Roll No 92)
  - Sharad Tasagaon (Roll No 118)
  - Sumit Salokhe (Roll No 91)
  - **Class Teacher**: P.S. Chavhan Mam
- **Leadership Team**: Integrated Sarpanch and Gramsevak profile cards.
- **Premium Styling**: Glassmorphic layout with responsive college campus graphics fetched from Unsplash, and local background images with resilient error-handling.

### 3. Translation Support
- Add translation keys for `nav.about`, `about.college_title`, `about.college_desc`, `about.developer_title`, `about.developer_group`, `about.developer_desc`, `about.class_teacher`, `about.department`, and `about.back_landing` to:
  - English: [en.json](file:///d:/projects/capstom/lang/en.json)
  - Marathi: [mr.json](file:///d:/projects/capstom/lang/mr.json)
  - Hindi: [hi.json](file:///d:/projects/capstom/lang/hi.json)
  - Inline dictionary fallback inside [i18n.js](file:///d:/projects/capstom/js/i18n.js)

---

## Proposed Changes

### [Component: Styles]

#### [MODIFY] [app.css](file:///d:/projects/capstom/css/app.css)
- Add utility styles for the About page layout, including:
  - `.about-hero`: Header banner style for the about page.
  - `.college-card`: Styled card displaying college accreditations (NAAC 'A', NBA, Autonomous).

### [Component: Routing]

#### [MODIFY] [app.js](file:///d:/projects/capstom/js/app.js)
- Register the `about` route:
  ```javascript
  Router.register('about', c => {
      c.innerHTML = typeof Pages.about !== 'undefined' ? Pages.about() : '<h1>About Module Missing</h1>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
  });
  ```

### [Component: Pages Templates]

#### [MODIFY] [pages-core.js](file:///d:/projects/capstom/js/pages-core.js)
- Update `Pages.landing()`'s header element to include the "About Us" button.
- Add `Pages.about()` rendering template displaying:
  - Header banner with a beautiful university image fallback.
  - College details (DYPCET autonomous status, NAAC 'A', affiliated with Shivaji University).
  - Capstone Group 13 project details.
  - Village coordination team.
- Update `handleImageError` helper to support new image types: `college` and `group`.

### [Component: Translation Configurations]

#### [MODIFY] [en.json](file:///d:/projects/capstom/lang/en.json)
- Add English translations for the new college and developer group strings.

#### [MODIFY] [mr.json](file:///d:/projects/capstom/lang/mr.json)
- Add Marathi translations.

#### [MODIFY] [hi.json](file:///d:/projects/capstom/lang/hi.json)
- Add Hindi translations.

#### [MODIFY] [i18n.js](file:///d:/projects/capstom/js/i18n.js)
- Update static inline translation fallbacks inside `INLINE_TRANSLATIONS`.

---

## Verification Plan

### Manual Verification
1. Navigate to the landing page and verify the new "About Us" button exists in the header navbar.
2. Click the button and confirm the SPA transitions to `#/about` without page refresh.
3. Confirm that the college info, Capstone Group 13 info, and team members translate correctly when switching languages (MR/HI/EN).
4. Verify responsiveness and image resilience by testing image fallbacks on missing URLs.
