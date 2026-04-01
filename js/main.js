/**
 * COSONE Website JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Product Card Hover Effects
    // ========================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const wishlistBtn = card.querySelector('.btn-wishlist');
        const quickviewBtn = card.querySelector('.btn-quickview');
        
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    this.style.color = '#ff6b00';
                    showNotification('已添加到收藏');
                } else {
                    this.style.color = '';
                    showNotification('已取消收藏');
                }
            });
        }
        
        if (quickviewBtn) {
            quickviewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showQuickViewModal(card);
            });
        }
    });
    
    // ========================================
    // Add to Cart Functionality
    // ========================================
    let cartCount = 0;
    const cartCountEl = document.querySelector('.cart-count');
    
    function updateCartCount(count) {
        cartCount = count;
        if (cartCountEl) {
            cartCountEl.textContent = cartCount;
            cartCountEl.classList.add('bounce');
            setTimeout(() => cartCountEl.classList.remove('bounce'), 300);
        }
    }
    
    // Simulate add to cart on product card click
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn-wishlist') && !e.target.closest('.btn-quickview')) {
                updateCartCount(cartCount + 1);
                showNotification('已添加到购物车');
            }
        });
    });
    
    // ========================================
    // Newsletter Form
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('订阅成功！感谢您的关注');
                this.reset();
            }
        });
    }
    
    // ========================================
    // Notification System
    // ========================================
    function showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: #000;
            color: #fff;
            padding: 15px 25px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 9999;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // ========================================
    // Quick View Modal
    // ========================================
    function showQuickViewModal(productCard) {
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        const productDesc = productCard.querySelector('.product-desc').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'quickview-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${productCard.querySelector('img').src}" alt="${productName}">
                    </div>
                    <div class="modal-info">
                        <h2>${productName}</h2>
                        <p class="modal-desc">${productDesc}</p>
                        <div class="modal-price">${productPrice}</div>
                        <button class="btn btn-primary add-to-cart">加入购物车</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
            }
            .modal-content {
                position: relative;
                background: #fff;
                max-width: 900px;
                width: 90%;
                max-height: 90vh;
                overflow: auto;
                animation: modalIn 0.3s ease;
            }
            @keyframes modalIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                font-size: 28px;
                background: none;
                border: none;
                cursor: pointer;
                z-index: 10;
            }
            .modal-body {
                display: grid;
                grid-template-columns: 1fr 1fr;
            }
            .modal-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .modal-info {
                padding: 40px;
            }
            .modal-info h2 {
                font-size: 24px;
                margin-bottom: 15px;
            }
            .modal-desc {
                color: #666;
                margin-bottom: 20px;
            }
            .modal-price {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 30px;
            }
            @media (max-width: 768px) {
                .modal-body {
                    grid-template-columns: 1fr;
                }
                .modal-image {
                    aspect-ratio: 1;
                }
                .modal-info {
                    padding: 20px;
                }
            }
        `;
        
        document.head.appendChild(modalStyles);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal events
        const closeModal = () => {
            modal.remove();
            modalStyles.remove();
            document.body.style.overflow = '';
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        
        // Add to cart from modal
        modal.querySelector('.add-to-cart').addEventListener('click', function() {
            updateCartCount(cartCount + 1);
            showNotification('已添加到购物车');
            closeModal();
        });
        
        // ESC to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeModal();
        }, { once: true });
    }
    
    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.category-card, .product-card, .team-member, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animate-in styles
    const animateStyles = document.createElement('style');
    animateStyles.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animateStyles);
    
    // ========================================
    // Cart Count Animation Styles
    // ========================================
    const cartStyles = document.createElement('style');
    cartStyles.textContent = `
        .cart-count.bounce {
            animation: cartBounce 0.3s ease;
        }
        @keyframes cartBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
        
        .header.scrolled {
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        .nav.mobile-open .nav-menu.left {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: #000;
            padding: 20px;
        }
        
        .mega-menu {
            display: none;
        }
        
        @media (min-width: 993px) {
            .has-dropdown:hover .mega-menu {
                display: block;
            }
        }
    `;
    document.head.appendChild(cartStyles);
    
});
