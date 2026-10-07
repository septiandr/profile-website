# Septian Dwi Risanggalih — Monograph Vol. IV

> **Interactive Editorial Portfolio** — Next.js 15 + React 19 + Three.js + GSAP + Lenis. Desain majalah arsitektural (paper `#faf9f6`, tinta `zinc-950`) dengan 60fps tactile interaction, pin-scrub storytelling dan 3D companion robot.

---

## Stack Global

| Layer | Teknologi | Versi | Peran |
|---|---|---|---|
| Framework | `next` | `15.2.0` | App Router, SSR, `next/image` optimized, `dynamic()` untuk 3D |
| UI | `react` / `react-dom` | `19.0.0` | Client components (`"use client"`), hooks |
| Bahasa | `typescript` | `5.7.3` | Strict types, `Profile` & `Journey` types |
| Styling | `tailwindcss` `3.4.17` + `postcss`/`autoprefixer` | — | Design tokens `paper`/`electric`, `fontDisplay/Sans/Serif/Mono`, keyframes `float/marquee/spin` |
| Animasi | `gsap` `3.12.7` + `ScrollTrigger` | — | Timeline pin/scrub, split-text, flip page |
| Smooth Scroll | `lenis` `1.1.20` | — | Inertia `duration 2.2` cubic-out, `wheelMul 0.52` |
| 3D | `three` `0.174.0` + `GLTFLoader` | — | Robot `RobotExpressive.glb` orthographic |
| Icon | `lucide-react` `1.16.0` | — | `Server/Globe/Smartphone/Bot` dsb |
| Util | `clsx` + `tailwind-merge` | — | Conditional class merge |

`src/app/layout.tsx:1-37` membungkus `<SmoothScroll><CustomCursor>{children}</>` dan `globals.css` (`scroll-behavior:auto`, `.lenis` overrides, `::selection` blue). `next.config.ts:3-6` `reactStrictMode` + `transpilePackages: ["three"]`.

---

## Arsitektur

```
src/app/page.tsx → src/journey/JourneyManager.tsx
 ├─ MagazineHeader (sticky)
 ├─ <main> MagazineCoverHero → Ticker → WorksPlates → Ticker → ServicesOfferings → Capabilities → TimelineDossier → ColophonContact
 └─ MagazineWalkingRobot (fixed bottom, dynamic import ssr:false + ErrorBoundary)
```

`src/data/profile.ts` + `profile.json` jadi single source (personalInfo, experience, projects). `src/journey/types.ts` definisi `ExperienceWaypoint`.

---

## Teknologi per Section

### 01 — `MagazineHeader` `src/components/magazine/MagazineHeader.tsx:1-144`
**Fungsi:** Masthead sticky + progress global.
**Teknologi:** `useState` jam Jakarta (`Intl.DateTimeFormat` `Asia/Jakarta` interval 1s `9-24`), `scroll` listener hitung `window.scrollY / (scrollHeight-innerHeight)` → `scaleX(scrollProgress)` pada bar `h-[3px] bg-gradient blue→emerald→purple→orange→rose` `136-140`. Navigasi `Lenis.scrollTo(el, {duration:1.0})` fallback `scrollIntoView`. `backdrop-blur-md bg-[#faf9f6]/95` sticky `z-50`.

### 02 — `MagazineCoverHero` `src/components/magazine/MagazineCoverHero.tsx:60-160`
**Fungsi:** Cover story editorial + spotlight foto.
**Teknologi:** GSAP `timeline({scrollTrigger:{trigger:container, start:"top 80%", once:true}})` `fromTo` berurutan: `.mag-folio-line` 1.4s, `.mag-split-line` `y 115%→0%` 1.8s stagger 0.18 `power4.out`, `.mag-deck` 1.4s, `.mag-plate-frame` scale 0.95→1 1.8s, footer 1.4s. Parallax scrub `gsap.to(..., {scrub:1.8})` pada headline `y-50`, plate `y 80 + rotate 1.8`, deck `y -25`. Foto `next/image fill` B&W `grayscale contrast-125` + layer warna dengan `maskImage: radial-gradient(480px at x,y)` yang mengikuti `onMouseMove/onTouchMove` → hover reveal color. Keyword rotator `setInterval 4200ms` + CSS `word-flip-in 1.4s cubic-bezier(0.16,1,0.3,1)`. Tailwind `font-display 3xl→5xl`.

### 03 — `MagazineAgencyTicker` `src/components/magazine/MagazineAgencyTicker.tsx:1-102` (dipakai 2×)
**Fungsi:** Dual marquee ribbon kuning & obsidian.
**Teknologi:** GSAP `context` `to(track, {x:-120 / +120, scrub:2})` pin `top bottom → bottom top`. CSS `animate-marquee-agency 95s` & `reverse 110s` linear infinite `will-change:transform` hover `paused` `src/styles/globals.css:372-393`. Data `tickerPrimary/Secondary` x3 repeat `w-max` flex.

### 04 — `MagazineWorksPlates` `src/components/magazine/MagazineWorksPlates.tsx:157-693`
**Fungsi:** Stacking architectural plates (sticky dossier).
**Teknologi:** `ScrollTrigger.create` track `focalY = innerHeight*0.45` hitung jarak `card.getBoundingClientRect().top` tiap `onUpdate` throttled `requestAnimationFrame` → `activePlateIdx` untuk glow/or compass. Tiap plate `gsap.timeline({scrollTrigger:{trigger:card, start:"top 90%", toggleActions:"play none none reverse"}})` animasi berurutan **perlahan**: accentBar `scaleX 0→1 1.0s`, folio `y-10 0.8s`, titleWords `y115% + stagger 0.07 1.0s`, quote `x-16 0.8s`, deliverables `x-12 stagger 0.08 0.6s`, chips `scale 0.65 stagger 0.05 0.6s back.out(1.4)`. Background pin `sticky top-0 h-0` berisi SVG millimeter grid `pattern 48x48`, ambient glow `blur-[140px]` `bg currentTheme.glowColor`, compass `spin 160s`, watermark `0{idx} 10rem→20rem opacity 4%`, corner brackets `sticky` rail `right-3 flex-col` jump via `Lenis.scrollTo(targetY 1.8s cubic)`. Layout `sticky top 80+idx*14 z 10+idx*10` + `space-y 22vh/26vh`.

### 05 — `MagazineServicesOfferings` `src/components/magazine/MagazineServicesOfferings.tsx:1-944`
**Fungsi:** Pinned 4-card showcase System/Web/App/Bot dengan live widgets.
**Teknologi:** GSAP pinned `timeline({trigger:section, start:"top top", end:"+=2400", pin:true, scrub:0.85, anticipatePin:1})` `onUpdate p<0.25/0.50/0.75` → `activeIndex`. Travel `window.innerWidth*0.45` clamp 460px, cards `set x:travelDist scale 0.82 blur16px opacity0` vs center `x0 scale1.10 blur0`. Sequence: hold `0.6` → `to(cards[0] x:-travel + cards[1] x:0 duration 1.4 power2.inOut)` labeled `step0to1` dst, final hold `0.9`. Tombol `SNAP_POINTS [0,0.333,0.602,0.85]` + `Lenis.scrollTo(targetScroll 2.0s cubic)`. Micro-widgets: `SystemTelemetryWidget` interval `2200ms` reqCount + SVG pulse `animate-[pulse_2s]`, `WebsitePreviewWidget` toggle `perspective(600px) rotateX20 rotateY-12 scale0.96`, `AppPhoneWidget` state `orderStage 0..2` progress width `(stage+1)/3*100%`, `BotTerminalWidget` chat `useState` slice-2 + commands `/report /dispatch /ai_ask`. Data `SERVICES_DATA[4]` theme `barColor/badge/btnShadow` + `whatsappMessage`.

### 06 — `MagazineCapabilities` `src/components/magazine/MagazineCapabilities.tsx:1-478`
**Fungsi:** 4-column equalizer accordion.
**Teknologi:** GSAP pinned `end "+=3000" scrub 1.0 dummy `to({},7)` + continuous progress bar `to(progressRef width 0→100% duration7 ease none)` scrubbed — tiap scroll ada gerakan. `onUpdate` hysteresis `p<0.22/0.26/0.48/0.52/0.74/0.78` → `activeIndex` anti-flicker. `SNAP_STEPS [0.10,0.37,0.63,0.89]` untuk button jump `Lenis 2.0s`. UI `flex-[4.8] vs flex-1` transition `duration 700ms cubic-bezier(0.16,1,0.3,1)` + collapsed `400ms` vs expanded `500ms delay150`. `Web Audio API` `AudioContext oscillator sine 420+idx*80Hz gain 0.04→0.001 0.08s` pada click/hover. Chips hover `scale105`.

### 07 — `MagazineTimelineDossier` `src/components/magazine/MagazineTimelineDossier.tsx:1-591`
**Fungsi:** 3D book page flip.
**Teknologi:** GSAP 3D `perspective:2400px` `transform-style:preserve-3d` `[transform-origin:left_center]` `backface-visibility:hidden`. Pinned `end "+=2600" scrub 0.85`. Initial `set leaf rotateY0`. Timeline: hold `0.55` → `to(leaf1 rotateY -180 2.2s power2.inOut)` `onStart playPageFlipAudio` (osc 260→120Hz 0.12s) + shadow `opacity 0.35 1.1s` → hold `0.55` → `leaf2 -180 2.2s` + `set zIndex 30 / autoAlpha 0` halfway `turn2+=1.1` biar Spread03 kiri di atas. Spread render `renderSpreadLeft/Right` + khusus `renderSpreadRightEra3` (CIMB + Binus S.Kom). `CAREER_CHRONOLOGY[3]` theme `emerald/blue/purple`. Kontrol `SNAP_SPREADS [0,0.5,1.0]` + `Lenis 2.0s`.

### 08 — `MagazineColophonContact` `src/components/magazine/MagazineColophonContact.tsx:1-352`
**Fungsi:** Back cover + order.
**Teknologi:** GSAP `fromTo title x -35→35 scrub 0.6` + tiap `mag-contact-card` `timeline start top 86%` `y65 opacity0.15 scale0.95 → y0 opacity1 scale1 0.75s delay idx*0.1 power3.out` + bar `scaleX 0→1 0.5s`, title `y14 0.45s`, btn `y12 0.4s`. Service filter `useState "system/website/app/bot/all"` → `getWaMessage()` + `https://wa.me/6285646444805?text=` & `mailto:?subject=&body=` + `navigator.clipboard.writeText` + `Check` feedback 2.5s. Data `profileData.personalInfo.email` dari `src/data/profile.ts`.

### 09 — `MagazineWalkingRobot` `src/components/magazine/MagazineWalkingRobot.tsx:1-844` (global fixed)
**Fungsi:** Creative Companion 3D.
**Teknologi:** Three `OrthographicCamera` `ROBOT_VISIBLE_HEIGHT 2.8` `CENTER_Y 0.72` `ROBOT_SCALE 0.33` `GLTFLoader /models/RobotExpressive.glb` + `AnimationMixer` crossfade `fadeOut/fadeIn 0.2-0.35` clips `Wave/Dance/Jump/ThumbsUp/Walking/Running`. Lighting `Ambient 2.4 + Directional 2.6 + fillBlue 1.5 + rimAmber 1.2` + `PointLight 2.2 range4` follow `posX` warna by action (Dance pink `ec4899`, Jump cyan, Wave violet). Shadow `PlaneGeometry 1.4x0.7 CanvasTexture radialGradient` scale/opacity lerp by `posY/1.5`. Physics `posX/posY velY direction` `requestAnimationFrame` `clock.getDelta 0.05` `GRAVITY 16` elastic `*0.35` jika `vel<-1.8`. Scroll driver `direction 1/-1` dari `deltaY`, `isScrolling` → `Walking/Running 2.4/1.5 speed` else `Wave/Dance cycle 3.6s`. Pointer `getWorldCoords` aspect calc + hit-test `dx 0.65 dy -0.25..1.85` → `setPointerCapture` drag offset clamp `limitRight halfWidth-3.0/0.8`. HTML overlay `speechBubble project(head 1.68) → screenX/Y` + `aura blur gradient violet→cyan` + `orbit 140px 3 badges Code2/Palette/Brush spin 6s` + ground grid `24px`. Interaksi `triggerReaction` confetti 14 emoji `✨💫🎨` `0.9s` + speech `SPEECH_LINES[12]` rotate. Dock `backdrop-blur-xl` gradient `PLAY Sparkles`, `Heart` pink. Ticker `bg-zinc-950 border-t violet/30` gradient top `h-px` marquee `animate-marquee-agency`.

### 10 — Infrastruktur Global

* **SmoothScroll** `src/components/ui/SmoothScroll.tsx:14-24` `Lenis({duration:2.2 easing: cubic 1-pow(1-t,3) wheelMul0.52 touchMul0.70 lerp0.09})` + `lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add(raf)` `lagSmoothing 200,33`. Expose `window.__lenis` untuk semua `scrollTo`.
* **CustomCursor** `src/components/ui/CustomCursor.tsx:37-51` `pointer coarse` skip, `ring lerp 0.32` `gsap.set(ring x-16 y-16, badge x+14 y+14)` + `data-cursor-text` hover detector.
* **Globals & Tailwind** `src/styles/globals.css:1-427` `html.lenis body height auto`, scrollbar `6px`, `scanline 4.5s`, `shimmer 10s`, `bubble 8-11s`, `spin 42-52s`, `marquee 95/110s`, `word-flip 1.4s`. `tailwind.config.ts:12-54` `paper 50-300 electric` + `pulse 8s spin 45s float10s marquee70s`.
* **ErrorBoundary** `src/components/ui/ErrorBoundary.tsx` bungkus robot agar gagal load GLB tidak crash halaman.

---

## Scripts

```bash
npm run dev    # next dev (Turbopack)
npm run build  # next build (tes: ✓ Compiled successfully)
npm start      # next start
npm run lint   # next lint
```

## Data

`profile.json` → `src/data/profile.ts` `profileData` dipakai `MagazineColophonContact`, `MagazineWorksPlates` (`EXPERIENCE_WAYPOINTS`), `MagazineCapabilities` (`CAPABILITY_PILLARS`). Aset 3D di `public/models/*.glb`, foto `public/profile.jpg`.

---

*Monograph diterbitkan 2026 — Jakarta `Asia/Jakarta`.* 
