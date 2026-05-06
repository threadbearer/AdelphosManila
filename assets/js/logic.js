document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Store
    const products = [
        { id: 1, name: "ANCOM 2026 - Black", price: 2500, image: "assets/img/Collection/ANCOM 2026 - Black.webp", hasSize: true, description: "2026 ANCOM commemorative apparel in Onyx Black. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 2, name: "ANCOM 2026 - White", price: 2500, image: "assets/img/Collection/ANCOM 2026 - White.webp", hasSize: true, description: "2026 ANCOM commemorative apparel in Pristine White. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 3, name: "Working Tools", price: 1800, image: "assets/img/Collection/Working Tools.webp", hasSize: true, description: "A curated arrangement of the Square, Compass, and Level, stripped down to their geometric core. This design serves as a wearable trestle-board, reminding us that every action must be squared by the virtue of our craft. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 4, name: "Gates", price: 1800, image: "assets/img/Collection/Gates.webp", hasSize: true, description: "Where ancient tradition meets contemporary streetwear. This design explores the threshold between the profane and the sacred. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 5, name: "Staircase", price: 1800, image: "assets/img/Collection/Staircase.webp", hasSize: true, description: "A technical blueprint of the Winding Stairs, rendered in a modern aesthetic. Each step represents the ascent toward wisdom and the mathematical precision required to transform the rough ashlar into the perfect stone. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 6, name: "Memento Mori", price: 1800, image: "assets/img/Collection/Memento Mori.webp", hasSize: true, description: "This piece features an abstracted skull serving as a wearable reminder of the fleeting nature of time. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 7, name: "Forget Me Not", price: 1800, image: "assets/img/Collection/Forget Me Not.webp", hasSize: true, description: "An intricate floral composition honoring the symbol of Masonic remembrance. This design balances delicate natural forms with the heavy weight of our perpetual vows. A discreet yet profound tribute to those who have gone before us. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 8, name: "DiedXRaised", price: 2200, image: "assets/img/Collection/DiedXRaised.webp", hasSize: true, description: "A bold typographic exploration of the central Masonic mystery. This high-impact design meditates on the transition from darkness to light—died to the world, yet raised to a higher knowledge through the brotherhood. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 9, name: "Katakana - Black", price: 2200, image: "assets/img/Collection/Katakana - Black.webp", hasSize: true, description: "This piece translates our identity into minimalist Katakana script, creating a unique visual language that bridges the gap between heritage and modern urban style. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 10, name: "Katakana - White", price: 2200, image: "assets/img/Collection/Katakana - White.webp", hasSize: true, description: "This piece translates our identity into minimalist Katakana script, creating a unique visual language that bridges the gap between heritage and modern urban style. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 11, name: "Grand Lodge Locals - Nueva Ecija", price: 1800, image: "assets/img/Collection/Grand Lodge of the Philippines - NUE'VA E'CIJA.webp", hasSize: true, description: "A simple yet elegant design that crosses Freemasonry identity with modern street style. Represent Nueva Ecijan with both modesty and style. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 12, name: "Grand Lodge Locals - Cavite", price: 1800, image: "assets/img/Collection/Grand Lodge of the Philippines - CAVITE.webp", hasSize: true, description: "A simple yet elegant design that crosses Freemasonry identity with modern street style. Represent Cavite with both modesty and style. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." },
        { id: 13, name: "Grand Lodge Locals - Manila", price: 1800, image: "assets/img/Collection/Grand Lodge of the Philippines - MANILA.webp", hasSize: true, description: "A simple yet elegant design that crosses Freemasonry identity with modern street style. Represent Manila with both modesty and style. Our apparel features premium graphics designed by us. Made with breathable, high-quality materials for durability, comfort, and style." }
    ];

    let cart = JSON.parse(localStorage.getItem('adelphos_cart')) || [];

    // 2. Elements - Common
    const cartDropdown = document.getElementById('cart-dropdown');
    const viewCartBtn = document.getElementById('view-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const cartCountEl = document.getElementById('cart-count');
    const cartDataInput = document.getElementById('cart-data');
    const orderForm = document.getElementById('order-form');

    // 3. Common Initialization
    function initCommon() {
        updateCart();

        // Cart Dropdown Toggles
        if (viewCartBtn) {
            viewCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                cartDropdown.classList.toggle('show');
            });
        }

        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', () => {
                cartDropdown.classList.remove('show');
            });
        }

        document.addEventListener('click', (e) => {
            if (cartDropdown && !cartDropdown.contains(e.target) && e.target !== viewCartBtn) {
                cartDropdown.classList.remove('show');
            }
        });

        // Toast Interaction
        const closeToastBtn = document.getElementById('close-toast');
        if (closeToastBtn) {
            closeToastBtn.addEventListener('click', () => {
                const toast = document.getElementById('toast-notification');
                if (toast) toast.classList.remove('show');
            });
        }

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                // If we are on detail page, navigate home first if the target is an anchor on index
                if (window.location.pathname.includes('product-detail.html')) {
                    // Let the default link behavior happen if it's an external link
                    return;
                }

                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    if (targetId === '#checkout') showToast();
                }
            });
        });

        if (window.location.hash === '#checkout') {
            setTimeout(showToast, 500);
        }
    }

    // 4. Page Specific Initialization
    function initIndex() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = products.map(product => `
            <article class="product-card" data-id="${product.id}" style="cursor: pointer;">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">₱ ${product.price.toLocaleString()}</p>
                    <div class="product-actions">
                        <button class="btn-card-secondary btn-view-details" data-id="${product.id}">View Details</button>
                        <button class="btn-card-primary btn-quick-add" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </article>
        `).join('');

        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // If clicking one of the buttons, don't trigger the card click
                if (e.target.tagName === 'BUTTON') return;

                const id = card.dataset.id;
                window.location.href = `product-detail.html?id=${id}`;
            });
        });

        // View Details handler
        document.querySelectorAll('.btn-view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                window.location.href = `product-detail.html?id=${id}`;
            });
        });

        // Quick Add handler
        document.querySelectorAll('.btn-quick-add').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                // For quick add on home page, use size 'L' as default
                addToCart(id, 'L');
                showToast(`Added to cart (Size L). You can change the size in the cart.`);
            });
        });
    }

    function initDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === productId);

        if (!product) {
            if (window.location.pathname.includes('product-detail.html')) {
                // If it's the detail page but no valid product, redirect home
                window.location.href = 'index.html';
            }
            return;
        }

        // Title and Meta (Optional enhancement)
        document.title = `${product.name} | Adelphos Brotherhood Apparel`;

        // Fill data
        const detailImg = document.getElementById('detail-img');
        const detailName = document.getElementById('detail-name');
        const detailPrice = document.getElementById('detail-price');
        const detailDesc = document.getElementById('detail-desc');
        const detailAddBtn = document.getElementById('detail-add-btn');
        const sizeSelect = document.getElementById('detail-size');

        if (detailImg) detailImg.src = product.image;
        if (detailName) detailName.innerText = product.name;
        if (detailPrice) detailPrice.innerText = `₱ ${product.price.toLocaleString()}`;
        if (detailDesc) detailDesc.innerText = product.description;

        if (detailAddBtn) {
            detailAddBtn.addEventListener('click', () => {
                const selectedSize = sizeSelect ? sizeSelect.value : (product.hasSize ? 'L' : null);
                addToCart(product.id, selectedSize);

                // Visual feedback
                const originalText = detailAddBtn.innerText;
                detailAddBtn.innerText = "Added to Selection";
                detailAddBtn.style.background = "#fff";
                detailAddBtn.style.color = "#000";

                setTimeout(() => {
                    detailAddBtn.innerText = originalText;
                    detailAddBtn.style.background = "";
                    detailAddBtn.style.color = "";
                    // Automatically open cart to show it was added
                    cartDropdown.classList.add('show');
                }, 1000);
            });
        }
    }

    // 5. Cart Logic
    function addToCart(id, size = null) {
        const product = products.find(p => p.id === id);
        if (product) {
            const cartItemId = size ? `${id}-${size}` : `${id}`;
            const existingItem = cart.find(item => item.cartItemId === cartItemId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, cartItemId, size, quantity: 1 });
            }
            saveCart();
            updateCart();
        }
    }

    function saveCart() {
        localStorage.setItem('adelphos_cart', JSON.stringify(cart));
    }

    window.removeFromCart = function (cartItemId) {
        cart = cart.filter(item => item.cartItemId !== cartItemId);
        saveCart();
        updateCart();
    };

    window.updateQuantity = function (cartItemId, delta) {
        const item = cart.find(i => i.cartItemId === cartItemId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                removeFromCart(cartItemId);
            } else {
                saveCart();
                updateCart();
            }
        }
    };

    window.updateItemSize = function (cartItemId, newSize) {
        const index = cart.findIndex(i => i.cartItemId === cartItemId);
        if (index === -1) return;

        const item = cart[index];
        const productId = item.id;
        const newCartItemId = `${productId}-${newSize}`;
        const existingItemIndex = cart.findIndex(i => i.cartItemId === newCartItemId && i !== item);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += item.quantity;
            cart.splice(index, 1);
        } else {
            item.size = newSize;
            item.cartItemId = newCartItemId;
        }

        saveCart();
        updateCart();
    };

    function updateCart() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Update Header Count
        if (cartCountEl) {
            cartCountEl.innerText = itemCount;
            cartCountEl.style.display = itemCount > 0 ? 'flex' : 'none';
        }

        // Update Dropdown
        const dropdownList = document.getElementById('cart-items');
        const dropdownTotal = document.getElementById('cart-total-value');
        if (dropdownTotal) dropdownTotal.innerText = `₱${total.toLocaleString()}`;

        if (dropdownList) {
            if (cart.length === 0) {
                dropdownList.innerHTML = '<p class="empty-msg">No items selected.</p>';
            } else {
                dropdownList.innerHTML = cart.map(item => {
                    const sizeOptions = ['S', 'M', 'L', 'XL', '2XL', '3XL'].map(s => `
                        <option value="${s}" ${item.size === s ? 'selected' : ''}>${s}</option>
                    `).join('');

                    return `
                    <div class="cart-item">
                        <div class="cart-item-thumb">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <label style="font-size: 0.7rem; color: #888; margin: 0;">Size:</label>
                                <select onchange="updateItemSize('${item.cartItemId}', this.value)" style="padding: 0.1rem 0.3rem; font-size: 0.75rem; background: #111; color: var(--clr-primary); border: 1px solid #333; border-radius: 3px; cursor: pointer;">
                                    ${sizeOptions}
                                </select>
                            </div>
                            <div class="quantity-controls">
                                <button class="btn-qty" onclick="updateQuantity('${item.cartItemId}', -1)">-</button>
                                <span class="qty-val">${item.quantity}</span>
                                <button class="btn-qty" onclick="updateQuantity('${item.cartItemId}', 1)">+</button>
                            </div>
                        </div>
                        <button class="btn-remove-lite" onclick="removeFromCart('${item.cartItemId}')">×</button>
                    </div>
                `}).join('');
            }
        }

        // Update Visual Form Selection (Checkout section on index.html)
        const visualFormCart = document.getElementById('visual-cart');
        if (visualFormCart) {
            if (cart.length === 0) {
                visualFormCart.innerHTML = '<p class="empty-msg"> Your cart is empty.</p>';
            } else {
                visualFormCart.innerHTML = cart.map(item => {
                    const sizeOptions = ['S', 'M', 'L', 'XL', '2XL', '3XL'].map(s => `
                        <option value="${s}" ${item.size === s ? 'selected' : ''}>${s}</option>
                    `).join('');

                    return `
                    <div class="visual-item-card">
                        <div class="visual-item-thumb">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="visual-item-info">
                            <h4>${item.name}</h4>
                            <p class="item-price">₱${(item.price * item.quantity).toLocaleString()}</p>
                            
                            <div class="visual-item-controls">
                                <div style="display: flex; align-items: center; gap: 0.8rem;">
                                    <label style="font-size: 0.75rem; color: #888; margin: 0;">SIZE:</label>
                                    <select onchange="updateItemSize('${item.cartItemId}', this.value)" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; background: #111; color: var(--clr-primary); border: 1px solid #333; border-radius: 4px; cursor: pointer;">
                                        ${sizeOptions}
                                    </select>
                                </div>
                                <div class="quantity-controls">
                                    <button class="btn-qty" onclick="updateQuantity('${item.cartItemId}', -1)">-</button>
                                    <span class="qty-val">${item.quantity}</span>
                                    <button class="btn-qty" onclick="updateQuantity('${item.cartItemId}', 1)">+</button>
                                </div>
                                <button class="btn-remove-lite" onclick="removeFromCart('${item.cartItemId}')">Remove Item</button>
                            </div>
                        </div>
                    </div>
                `}).join('') + `
                    <div class="visual-item-card" style="border: 2px solid var(--clr-primary); justify-content: center; align-items: center; border-style: dashed;">
                        <span style="font-weight: 700; color: var(--clr-primary);">TOTAL: ₱${total.toLocaleString()}</span>
                    </div>
                `;
            }
        }

        const summary = cart.map(item => `${item.quantity}x ${item.name}${item.size ? ` (Size ${item.size})` : ''} - ₱${(item.price * item.quantity).toLocaleString()}`).join('  |  ');
        if (cartDataInput) cartDataInput.value = `${summary}  ||  Grand Total: ₱${total.toLocaleString()}`;
    }

    // 6. Form Handling
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrX1mqxfqKW7RijVLtKPhScSXDpqAeNygQ2ZsLTfshylqpKghco2FVfWIVuO1X_Yfd/exec";

    if (orderForm) {
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (cart.length === 0) {
                alert("Please select at least one item before submitting.");
                return;
            }

            const name = document.getElementById('full-name').value;
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const facebook = document.getElementById('fb-profile').value.trim();

            if (!phone && !email && !facebook) {
                alert("Please provide at least one contact method: Mobile Number, Email Address, or Facebook Profile Link.");
                return;
            }

            const orderBtn = document.getElementById('submit-order');
            if (orderBtn) {
                orderBtn.disabled = true;
                orderBtn.innerText = "Transmitting to Lodge...";
            }

            const toBase64 = file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });

            try {
                const formData = new FormData(orderForm);
                const urlParameters = new URLSearchParams();
                const now = new Date();
                const month = now.toLocaleString('en-US', { month: 'long' });
                const formattedTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getDate()} ${month} ${now.getFullYear()}`;
                formData.set('TimeStamp', formattedTime);

                const expectedFields = [
                    "TimeStamp", "Name", "Phone", "Email", "Facebook",
                    "Lodge-Name-#", "Grand-Lodge", "Masonic-ID", "Supporting-Documents",
                    "Item-Summary", "Questions-Comments"
                ];

                for (const field of expectedFields) {
                    let value = formData.get(field);
                    if (value instanceof File) {
                        if (value.size > 0) {
                            if (value.size < 75000) {
                                try { value = await toBase64(value); } catch (e) { value = value.name; }
                            } else {
                                value = `File: ${value.name} (Size: ${Math.round(value.size / 1024)}KB)`;
                            }
                        } else { value = "N/A"; }
                    }
                    if (!value || (typeof value === 'string' && value.trim() === "")) {
                        urlParameters.append(field, "N/A");
                    } else {
                        urlParameters.append(field, typeof value === 'string' ? value.trim() : value);
                    }
                }

                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: urlParameters,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    mode: 'no-cors'
                });

                alert(`Brother ${name}, thank you. Your request for brotherhood apparel has been received. We will contact you on Facebook or mobile to verify your status.`);
                cart = [];
                saveCart();
                updateCart();
                orderForm.reset();
            } catch (error) {
                console.error("Error submitting order:", error);
                alert("There was an error submitting your request. Please try again or contact us directly.");
            } finally {
                if (orderBtn) {
                    orderBtn.disabled = false;
                    orderBtn.innerText = "Submit for Verification";
                }
            }
        });
    }

    window.showToast = function () {
        const toast = document.getElementById('toast-notification');
        if (!toast) return;
        toast.classList.remove('show');
        void toast.offsetWidth;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 8000);
    }

    initCommon();
    initIndex();
    initDetail();
});
