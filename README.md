# ⚜️ ADELPHOS MANILA

### *Premium Architectural E-Commerce Apparel Experience for the Modern Brotherhood*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Serverless](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/apps-script)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-green?style=for-the-badge)](https://en.wikipedia.org/wiki/Responsive_web_design)

**Adelphos Manila** is a premium, high-fidelity web storefront engineered specifically for Freemasons under the Grand Lodge of the Philippines. Rejecting bulky, heavy frameworks, this application stands as a testament to **modern, zero-dependency engineering**—built entirely using native **HTML5, CSS3 Custom Properties, and Vanilla ES6+ JavaScript**. It integrates with a secure serverless backend to handle gated-access purchase orders and membership verification.

---

## 🎨 Visual Philosophy & UX Design

Adelphos features a **"Warm Minimalist Luxury"** aesthetic that is completely tailored for a premium brand experience:

*   **Curated Palette:** A strict, premium color system of deep Onyx Black (`#000000`), luxurious Gold-Amber accents (`#ff9e20`), and high-contrast whites, utilizing custom CSS variables throughout.
*   **Aesthetic Typography:** Built with custom Google Fonts, pairing **Outfit** (for sharp, technical headlines) and **Inter** (for clean, highly legible body copy).
*   **Dynamic Layout Systems:** Uses an adaptive, CSS Grid-powered product catalog, a fluid-width glassmorphic checkout component, and an elegant, responsive masonry event banner with zoom micro-interactions on hover.
*   **Visual Continuity:** Featuring smooth animations, responsive mobile-first layouts, and custom-crafted SVGs (including a detailed Square & Compass toast loader).

---

## ⚙️ Core Technical Architecture

The application focuses on high-performance client-side rendering and native browser capabilities:

### 1. Dynamic State-Sync Catalog
A centralized JS state-store manages products, cart items, sizes, and pricing. The user interface updates dynamically without requiring full-page reloads, achieving near-instantaneous transitions.

### 2. Dual-Layer Real-Time Cart Synchronization
The unified state engine seamlessly coordinates and synchronizes:
*   An absolute-positioned **Slide-out Selection Drawer** (for quick-add references).
*   An inline, dynamic **Checkout Summary Grid** on the purchase page (for order finalization).
*   An interactive **Individual Item Customizer** allowing real-time size (`S` to `3XL`) and quantity changes.
*   **Client-Side Persistence:** Utilizing native `LocalStorage` to automatically preserve selection state across sessions.

### 3. Smart Form Validation & Dual-Contact Enforcement
The purchase request form implements high-quality validation rules:
*   Enforces at least one primary digital communication method (either Mobile Number, Email, or Facebook Profile link).
*   Custom UI file-upload wrapper with dynamic file name and type injection (`.pdf`, `.jpg`, `.png`).

### 4. Serverless Google Apps Script Integration
To preserve data privacy and avoid expensive database hosting, the client handles media serialization and sends data directly to a Google Apps Script micro-service:
*   **Base64 Document Encoder:** Converts uploaded supporting documentation (Masonic dues card) into raw Base64 asynchronously on the client-side *only* if the file is small enough (<75KB), otherwise fallback metadata is sent.
*   **REST API Handshake:** Uses asynchronous fetch requests communicating with Google Sheets through a secure serverless endpoint.

---

## 📂 Project Structure

```bash
AdelphosManila/
├── index.html               # Main Landing Page, Catalog & Checkout Form
├── product-detail.html      # Dynamic Product Detail & Customizer View
├── 404.html                 # Brand-Cohesive 404 Fallback
└── assets/
    ├── css/
    │   └── style.css        # Core Design System, Variables & Keyframe Animations
    ├── js/
    │   └── logic.js         # State Management, Cart Sync Engine & Form Handler
    └── img/
        └── Collection/      # High-Resolution Apparel WebP Assets
```

---

## 💻 Deep-Dive Code Showcases

Here are brief architectural spotlights demonstrating the clean, well-documented, and production-grade nature of this repository:

### 1. Unified State Sync Engine (`assets/js/logic.js`)
This function dynamically updates all cart selectors across the DOM simultaneously and serializes the data for submission:

```javascript
function updateCart() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // 1. Sync Header count indicator
    if (cartCountEl) {
        cartCountEl.innerText = itemCount;
        cartCountEl.style.display = itemCount > 0 ? 'flex' : 'none';
    }

    // 2. Sync Slide-out Sidebar list
    const dropdownList = document.getElementById('cart-items');
    if (dropdownList) {
        dropdownList.innerHTML = cart.length === 0 
            ? '<p class="empty-msg">No items selected.</p>'
            : renderCartItems(cart); // Dynamic ES6 template mapping
    }

    // 3. Sync Inline Checkout Form list
    const visualFormCart = document.getElementById('visual-cart');
    if (visualFormCart) {
        visualFormCart.innerHTML = cart.length === 0 
            ? '<p class="empty-msg">Your cart is empty.</p>'
            : renderCheckoutItems(cart, total);
    }

    // 4. Update hidden input for serverless form payload transmission
    const summary = cart.map(item => `${item.quantity}x ${item.name} (Size ${item.size})`).join(' | ');
    if (cartDataInput) cartDataInput.value = `${summary} || Grand Total: ₱${total.toLocaleString()}`;
}
```

### 2. Base64 Client-Side Document Encoding
To process uploaded images in a zero-database ecosystem, file uploads are converted to Base64 strings before transmission:

```javascript
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// Implementation inside Form Submit Handler:
let value = formData.get('Supporting-Documents');
if (value instanceof File && value.size > 0) {
    if (value.size < 75000) { // Limit size to fit within Google Apps Script payload limits
        value = await toBase64(value);
    } else {
        value = `File: ${value.name} (Size: ${Math.round(value.size / 1024)}KB)`;
    }
}
```

---

## 🚀 Setup & Execution

Since the project is built on standard web standards, there are no dependencies to install and no build processes required.

### Local Development
1. Clone this repository:
   ```bash
   git clone https://github.com/threadbearer/AdelphosManila.git
   ```
2. Run a simple static server from the root folder:
   *   **VSCode:** Right-click `index.html` and select **"Open with Live Server"**.
   *   **Python:**
       ```bash
       python3 -m http.server 8000
       ```
3. Open your browser and navigate to `http://localhost:8000`.

---

## 🛠️ Portfolio Context & Key Engineering Takeaways

*   **Zero-Dependency Performance:** Standard single-page-app framework bundles often weigh megabytes. Adelphos delivers a fully fluid, complex SPA-like interaction with a combined JS/CSS weight of **under 60KB**, optimizing lighthouse scores and layout shifts.
*   **UX/UI Execution:** Tailored micro-interactions (magnetic cart buttons, glassmorphic grids, custom toast triggers, and CSS active-scaling) deliver a luxury-tier feeling.
*   **Elegant Serverless Integration:** Bypasses the need for expensive hosting, custom middleware, and complex database maintenance through standard client-side Web APIs and Google Cloud Apps Script endpoints.
