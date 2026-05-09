# Ronald Mupanguri — Cybersecurity Portfolio

Personal portfolio website for Ronald Tonderai Mupanguri — IAM Consultant and Security Engineer based in Harare, Zimbabwe.

This site was built to present my work honestly and precisely. No inflated claims, no generic cybersecurity language — every number on it traces back to a real engagement, a real tool, or a real design decision.

---

## What this site covers

**Who I am**
Four years embedded in Big 4 and mid-tier audit environments (BDO Zimbabwe, Baker Tilly Central Africa), working across financial services, telecoms, and insurance clients in sub-Saharan Africa. My core discipline is IAM — privileged access, role-based access control, user lifecycle governance, access certification. My secondary capability is building the tooling that makes that audit work faster and more precise.

**The case studies**

Four projects that represent the intersection of audit rigour and engineering capability:

1. **Transfer Pricing AI Assistant** — Python pipeline with IQR anomaly detection, AD-gated RBAC, and Entra ID auth. Reduced analysis from 24–32 hours to ~4 hours per engagement. Deployed across 30 internal engagements at BDO Zimbabwe.

2. **Healthcare RBAC System (Blockchain EHR DApp)** — Hyperledger Fabric dApp with smart-contract RBAC (5 roles), AES-256 encrypted on-chain records, ECIES key management, time-bounded emergency access, and immutable on-chain audit trail. Capstone/research project.

3. **BDO Skills Pulse** — Internal enterprise platform with BDO AD authentication, Entra ID-based provisioning and deprovisioning, API-layer RBAC enforcement, and an HR-only audit trail. Built for live internal deployment.

4. **Akroatis Port Scanner** — Open-source Rust tool using async-std, configurable thread pool (4–32 threads), banner-grabbing service detection, and an egui GUI with JSON/CSV/HTML export. Benchmarks comparable to Nmap at equivalent concurrency.

---

## Stack

- **React + TypeScript** via Vite
- **GSAP** with ScrollTrigger — all scroll-driven animations and 3D fold effects
- **Lenis** — smooth scroll, synced with GSAP
- **Three.js** — custom WebGL fragment/vertex shader background (isometric grid with mouse tracking)
- **Tailwind CSS** — utility styling with custom component classes
- **egui** (referenced) — GUI framework used in Akroatis, the Rust port scanner built as part of this portfolio

---

## Running locally

```bash
cd app
npm install
npm run dev
```

Runs at `http://localhost:3000`.

```bash
npm run build
```

Builds to `dist/`.

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
