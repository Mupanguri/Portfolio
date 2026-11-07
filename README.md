# Ronald Mupanguri — Cybersecurity Portfolio

Personal portfolio website for Ronald Tonderai Mupanguri — Cybersecurity Specialist, IT Auditor, and Penetration Tester based in Harare, Zimbabwe.

This site was built to present my work honestly and precisely. No inflated claims, no generic cybersecurity language — every number on it traces back to a real engagement, a real tool, or a real design decision.

---

## What this site covers

**Who I am**
Four years delivering application security, VAPT, incident response, digital forensics, GRC, identity security, and secure SDLC advisory across financial services, telecoms, and insurance clients. I also build the tooling that makes security and audit work faster and more precise.

**The case studies**

Four projects that represent the intersection of audit rigour and engineering capability:

1. **Transfer Pricing AI Assistant** — Python pipeline with IQR anomaly detection, AD-gated RBAC, and Entra ID auth. Reduced analysis from 24–32 hours to ~4 hours per engagement. Deployed across 30 internal engagements at BDO Zimbabwe.

2. **Healthcare RBAC System (Blockchain EHR DApp)** — Hyperledger Fabric dApp with smart-contract RBAC (5 roles), AES-256 encrypted on-chain records, ECIES key management, time-bounded emergency access, and immutable on-chain audit trail. Capstone/research project.

3. **BDO Skills Pulse** — Internal enterprise platform with BDO AD authentication, Entra ID-based provisioning and deprovisioning, API-layer RBAC enforcement, and an HR-only audit trail. Built for live internal deployment.

4. **Akroatis Vulnerability Intelligence Engine** — Rust tool ingesting NVD CVE and Exploit-DB data into SQLite, with BM25/version-interval ranking, TCP service discovery, an egui GUI, and Dockerized GitLab CI/CD.

---

## Stack

- **React + TypeScript** via Vite
- **GSAP** with ScrollTrigger — all scroll-driven animations and 3D fold effects
- **Lenis** — smooth scroll, synced with GSAP
- **Three.js** — custom WebGL fragment/vertex shader background (isometric grid with mouse tracking)
- **Tailwind CSS** — utility styling with custom component classes
- **egui** — GUI framework used in Akroatis, the Rust vulnerability intelligence engine

---

## Running locally

```bash
cd Portfolio
npm install
npm run dev
```

Runs at `http://localhost:3000`.

```bash
npm run build
```

Builds to `dist/`.

## CI/CD

The [GitHub Actions workflow](.github/workflows/ci-cd.yml) runs `npm ci` and a
production TypeScript/Vite build for every pull request and push. Deployment is
handled by Vercel.

To prevent an unverified change from reaching production:

1. In GitHub, protect the `main` branch and require the **Validate and build**
   status check before merging.
2. Require pull requests and disable direct pushes to `main`.
3. In Vercel, keep the production branch set to `main`.

Vercel will deploy previews for pull requests and production after a pull
request is merged. If commits are pushed directly to `main`, Vercel can deploy
before GitHub Actions finishes, so branch protection is required.

---

## Project structure

```
src/
  components/
    Navigation.tsx              # Fixed header, scroll-aware blur
    IsometricGridVolumetricShader.tsx  # Three.js WebGL animated background
  sections/
    Hero.tsx                    # Animated headline with GSAP timeline
    Approach.tsx                # Philosophy, career arc, capability tags
    Capabilities.tsx            # Four discipline cards with hover glow
    CaseStudies.tsx             # Four case studies with 3D fold scroll animation
    Experience.tsx              # Roles, certifications, technical stack
    Contact.tsx                 # Contact links and footer
```

All content is co-located in each section component. There is no CMS layer — content lives next to the code that renders it, making it straightforward to update.

---

## Content philosophy

Every claim on this site was reviewed against a strict standard: if it cannot be verified or demonstrated in a technical interview within 15 minutes.

---

## Contact

Ronald Tonderai Mupanguri  
Harare, Zimbabwe  
ronaldtonderaimupanguri@gmail.com
# CI test
