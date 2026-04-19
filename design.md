# Design System Strategy: The Living Canvas

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Living Canvas."**

We are moving away from the rigid, sterile "app-like" grids that dominate the hospitality industry. Instead, we are creating a digital experience that breathes. This design system treats the screen as an editorial layout where nature and heritage intersect. By using intentional asymmetry, overlapping elements (where high-quality photography breaks the bounds of its containers), and a sophisticated hierarchy of "tonal layering," we create a sense of "pure green peace."

The goal is to evoke the feeling of walking through a sun-drenched forest: there are no hard lines in nature, only transitions of light, shadow, and texture.

---

## 2. Colors: The Palette of the Earth
The color strategy is rooted in organic depth. We utilize the deep forest greens of the `primary` tokens and the sun-kissed terracotta of the `secondary` tokens to create a grounded, premium atmosphere.

### The "No-Line" Rule
Standard UI relies on 1px borders to separate content. **In this design system, 1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts.
* **Implementation:** Use a `surface-container-low` section sitting against a `surface` background to define a change in context. This creates a soft, sophisticated transition that feels architectural rather than digital.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers, like fine handmade paper stacked on a wooden table.
* **Nesting Depth:** Instead of a flat grid, use the `surface-container` tiers (Lowest to Highest) to define importance. An inner card should use `surface-container-lowest` to "lift" off a `surface-container-low` background.

### The "Glass & Gradient" Rule
To avoid a "flat" feel, use Glassmorphism for floating elements (like navigation bars or hovering price cards). Use semi-transparent `surface` colors with a high `backdrop-blur`.
* **Signature Textures:** For primary CTAs and Hero sections, use subtle linear gradients transitioning from `primary` (#012d1d) to `primary_container` (#1b4332). This adds "visual soul" and mimics the way light filters through a canopy.

---

## 3. Typography: Heritage Meets Clarity
The typography is a dialogue between the past and the present.

* **Headlines (notoSerif):** The Serif choice conveys warmth, heritage, and the "Sanjivani" legacy. Use `display-lg` and `headline-lg` with generous tracking for a high-end editorial feel.
* **Body (plusJakartaSans):** The Sans-Serif choice provides a clean, modern counter-balance. It ensures that even dense information (like booking terms or farm history) remains highly readable and inviting.
* **Hierarchy:** Use a dramatic scale. Large, confident Serif headlines should lead into modest, well-spaced Sans-Serif body text to create a rhythmic "breathing" effect on the page.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to create "pop"; we use tone to create "place."

* **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a natural, soft lift that feels integrated into the environment.
* **Ambient Shadows:** If a floating effect is required (e.g., a "Book Now" modal), shadows must be extra-diffused. Use a blur of `20px` to `40px` with a low-opacity (4%-8%) tint of the `on-surface` color. Never use pure black or grey shadows.
* **The "Ghost Border" Fallback:** If a container absolutely requires a boundary for accessibility, use a "Ghost Border": the `outline-variant` token at **15% opacity**. This provides a hint of structure without breaking the organic flow.
* **Organic Shapes:** Utilize the `xl` (1.5rem) and `lg` (1rem) roundedness tokens to mimic the soft edges of river stones and leaves. Avoid sharp corners except for very small functional icons.

---

## 5. Components: Refined Organic Elements

### Buttons
* **Primary:** Pill-shaped (`full` roundedness), using a `primary` to `primary-container` gradient. Text is `on-primary`.
* **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
* **States:** On hover, shift the gradient intensity or move from `surface-container-low` to `surface-container-lowest`.

### Cards & Lists
* **Construction:** Cards must never have dividers. Separate content using the Spacing Scale (e.g., `8` (2.75rem) between sections).
* **Interaction:** Use `surface-variant` for subtle hover states on list items. Leading elements (like icons or small photos) should use `lg` (1rem) corner radius.

### Input Fields
* **Style:** Use a soft-filled style rather than an outlined style. Fill with `surface-container-high`.
* **Focus:** Transition the background to `surface-container-lowest` and add a "Ghost Border" of the `primary` color at 20% opacity.

### The "Experience Module" (Custom Component)
A signature component for this system: An asymmetric layout where a high-quality nature photograph (using `xl` corners) is partially overlapped by a `surface-container-lowest` text block. This breaks the "template" look and feels like a bespoke travel magazine.

---

## 6. Do's and Don'ts

### Do:
* **Do** use plenty of whitespace (the `16` and `20` spacing tokens) to allow the "Pure Green Peace" vibe to resonate.
* **Do** use `secondary` (sun-kissed gold/terracotta) for accent moments like price tags, ratings, or "New" badges to provide warmth.
* **Do** apply `backdrop-blur` to any element that sits on top of a photograph.

### Don't:
* **Don't** use 1px solid borders for containers; it shatters the organic atmosphere.
* **Don't** use pure black (#000000) for text. Always use `on-surface` or `on-background` for a softer, more natural contrast.
* **Don't** crowd the layout. If an element feels "tight," double the spacing using the provided scale.
* **Don't** use aggressive, fast animations. Use "Ease-in-out" transitions that mimic the slow, relaxing pace of resort life.
