TECHEMBRACE STATIC WEBSITE — DEPLOYMENT GUIDE
================================================

This is a pure static site (HTML/CSS/JS + images) rebuilt from your live
Elementor/WordPress site content. No WordPress, no database, no PHP needed.

WHAT'S INSIDE
-------------
index.html                                   Homepage
about.html                                    About Us — mission, founder's journey, guiding principles
our-services.html                             Services overview — links to all six pillar pages
service-ai-learning-transformation.html       Pillar 01
service-immersive-learning.html               Pillar 02
service-instructional-design.html             Pillar 03
service-edtech-gtm.html                       Pillar 04
service-staff-enablement.html                 Pillar 05
service-ai-creative.html                      Pillar 06
projects.html                                 Our Work — filterable case studies + proof points
ai-ethics-safety.html                         The Techembrace Pledge — AI Ethics & Safety
contact-us.html                               Contact page (form is front-end only — see note below)
privacy-policy.html                           Privacy policy
assets/css/styles.css                         All styling
assets/js/main.js                             Mobile nav, FAQ, project filter, form handling
assets/images/                                All photos, badges, and favicon

HOW TO UPLOAD VIA cPanel FILE MANAGER
--------------------------------------
1. Log in to cPanel.
2. Open "File Manager".
3. Navigate to public_html (or the folder for techembrace.com — if you
   want this to replace the current site, that's the same folder your
   WordPress files are in now).
4. IMPORTANT: Back up first. Either download a copy of your current
   public_html contents, or rename the current WordPress folder (e.g.
   to "old-wordpress-site") so you can roll back if needed.
5. Upload the ZIP file you received (techembrace-static-site.zip) into
   public_html using the "Upload" button.
6. Once uploaded, right-click the zip in File Manager and choose
   "Extract" — extract it directly into public_html (not into a
   subfolder), so index.html sits at public_html/index.html.
7. Visit techembrace.com in a browser to confirm it loads.

IMPORTANT — CONTACT FORM
-------------------------
The contact form and newsletter form on this static site currently only
show a "thanks" message in the browser — they do NOT send an email yet,
because static sites have no server-side code to send mail. Before going
live, connect them to a form service such as:
  - Formspree (formspree.io) — easiest, free tier available
  - Netlify Forms (if you host on Netlify instead of cPanel)
  - A simple PHP mail script (cPanel hosting supports PHP even for a
    static site — ask your developer to add a small contact.php handler)

WHAT WAS LEFT OUT
------------------
- Leftover Avista theme demo pages (home-02, home-03, sample-page, shop,
  team member "Melissa Lee", etc.) were not part of your real site content
  and were not migrated.
- Decorative background shapes/blobs from Elementor were recreated with
  clean CSS gradients instead of the original image files.
- A dedicated founder photo of Daniel Mullings wasn't found, so the About
  page currently uses a "DM" initials tile instead of a real headshot.
  Swap in a real photo any time by editing the .founder-portrait block in
  about.html and adding an <img> tag.
- The four detailed case studies on the Projects page (TeamChefs.tv, AI
  Creative for Brands & Culture, Virtual Croydon 360°, The AI Executive
  Blueprint) are built as Challenge/Solution/Result sections on the same
  page rather than four separate HTML files, to keep navigation simple.
  The five smaller "Further Proof Points" (Apple Support UK, AI/Human
  Radio Station, Dr Kevin Isaac, Book Creator, Apple Regional Training
  Centre) are shown as a lighter-weight card grid rather than full case
  studies, since less supporting detail was available for those.
- The three market-statistics figures on the homepage (40% IMF, 70%
  McKinsey, £37bn DSIT) are sourced from the Techembrace Competitive
  Intelligence Register, flagged there as "verify figures before
  publishing" — please double-check they're still current before launch.

NEED CHANGES?
-------------
Everything is plain HTML/CSS — open any .html file in a text editor and
edit the text directly, or hand this whole folder to Claude Code again
with edit requests.
