(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? module.exports = factory()
        : typeof define === 'function' && define.amd
        ? define(factory)
        : (global = global || self, global.PracticeMenu = factory());
}(this, function () {
    'use strict';

    const defaults = {
        menuSelector: '.practice-menu',
        sectionsSelector: '.is-section',
        enableScrollShrink: true,
        enableThemeSwitch: true,
        scrollThreshold: 50,
        dropdownHoverDelay: 150,
        dropdownClickMode: 'toggle',
        closeOnOutsideClick: true,
        closeOnEscape: true,
        mobileBreakpoint: 768,
        themeLightClass: 'practice-menu--theme-light',
        themeDarkClass: 'practice-menu--theme-dark',
        scrolledClass: 'practice-menu--scrolled',
        throttleDelay: 10,
    };

    class PracticeMenu {
        constructor(options = {}) {
            this.config = { ...defaults, ...options };
            this.menu = null;
            this.sections = [];
            this.menuToggle = null;
            this.isMenuOpen = false;
            this.currentTheme = 'light';
            this.isScrolled = false;
            this.throttleTimer = null;
            this.hoverTimeouts = new Map();
            this.openDropdowns = new Set();
            this.isMobile = false;
            
            this.init();
        }

        init() {
            this.menu = document.querySelector(this.config.menuSelector);
            if (!this.menu) return;

            this.sections = document.querySelectorAll(this.config.sectionsSelector);
            this.menuToggle = this.menu.querySelector('.practice-menu__toggle');
            
            this.checkMobile();
            this.setupEventListeners();
            this.setupDropdowns();
            this.handleScroll();
            this.setupAccessibility();

            this.observeSectionChanges();
        }

        observeSectionChanges() {
            if (!this.config.enableThemeSwitch) return;

            const observer = new MutationObserver(mutations => {
                let shouldUpdate = false;

                for (const mutation of mutations) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length) {
                        mutation.addedNodes.forEach(node => {
                            if (
                                node.nodeType === 1 &&
                                node.matches?.(this.config.sectionsSelector)
                            ) {
                                shouldUpdate = true;
                            }
                        });
                    }
                }

                if (shouldUpdate) {
                    this.refreshSections();
                    this.updateTheme();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            this.sectionObserver = observer;
        }

        checkMobile() {
            this.isMobile = window.innerWidth <= this.config.mobileBreakpoint;
        }

        setupEventListeners() {
            window.addEventListener('scroll', () => this.throttledHandleScroll(), { passive: true });
            
            if (this.menuToggle) {
                this.menuToggle.addEventListener('change', (e) => this.handleMenuToggle(e));
            }

            // Standard links (no dropdown)
            const navLinks = this.menu.querySelectorAll('.practice-menu__nav-link:not(.practice-menu__nav-link--has-dropdown), .practice-menu__cta-button');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeAllDropdowns();
                    this.closeMenu();
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (this.openDropdowns.size > 0) {
                        this.closeAllDropdowns();
                        e.preventDefault();
                    } else if (this.isMenuOpen) {
                        this.closeMenu();
                        e.preventDefault();
                    }
                }
            });

            if (this.config.closeOnOutsideClick) {
                document.addEventListener('click', (e) => {
                    if (!this.menu.contains(e.target)) {
                        this.closeAllDropdowns();
                    }
                });
            }

            window.addEventListener('resize', () => this.handleResize(), { passive: true });
        }

        setupDropdowns() {
            const dropdownParents = this.menu.querySelectorAll('.practice-menu__nav-item, .practice-menu__dropdown-item');
            
            dropdownParents.forEach(item => {
                const dropdown = item.querySelector(':scope > .practice-menu__dropdown');
                const linkWrapper = item.querySelector(':scope > .practice-menu__link-wrapper');
                const link = linkWrapper 
                    ? linkWrapper.querySelector('.practice-menu__nav-link, .practice-menu__dropdown-link')
                    : item.querySelector(':scope > .practice-menu__nav-link, :scope > .practice-menu__dropdown-link');
                const toggleButton = item.querySelector(':scope > .practice-menu__link-wrapper > .practice-menu__dropdown-toggle');
                
                if (!dropdown || !link) return;

                // Check if this is a container item
                const isContainer = link.hasAttribute('data-is-container');
                
                // Add class for styling
                const isNavLink = link.classList.contains('practice-menu__nav-link');
                const hasClass = isNavLink ? 'practice-menu__nav-link--has-dropdown' : 'practice-menu__dropdown-link--has-dropdown';
                if (!link.classList.contains(hasClass)) {
                    link.classList.add(hasClass);
                }

                // Desktop Hover
                item.addEventListener('mouseenter', () => {
                    if (!this.isMobile) {
                        this.clearHoverTimeout(item);
                        this.openDropdown(item);
                    }
                });

                item.addEventListener('mouseleave', () => {
                    if (!this.isMobile) {
                        this.setHoverTimeout(item, () => {
                            this.closeDropdown(item);
                        });
                    }
                });

                // Explicit Toggle Button (for split click targets)
                if (toggleButton) {
                    toggleButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.toggleDropdown(item);
                    });

                    // Keyboard support for toggle button
                    toggleButton.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            this.toggleDropdown(item);
                        }
                    });

                    // Link click handler for non-container items with toggle button
                    link.addEventListener('click', (e) => {
                        if (this.isMobile) {
                            if (isContainer) {
                                // Container: clicking link should toggle dropdown
                                e.preventDefault();
                                this.toggleDropdown(item);
                            } else {
                                // Non-container: clicking link navigates and closes menu
                                this.closeAllDropdowns();
                                this.closeMenu();
                                // Allow default navigation
                            }
                        } else if (this.config.dropdownClickMode === 'toggle') {
                            const href = link.getAttribute('href');
                            if (!href || href === '#') {
                                e.preventDefault();
                                this.toggleDropdown(item);
                            }
                        }
                    });
                } else {
                    // Original behavior for items without split toggle button
                    link.addEventListener('click', (e) => {
                        const hasDropdown = dropdown !== null;
                        
                        if (hasDropdown) {
                            if (this.isMobile) {
                                // Check if this is a real link
                                const href = link.getAttribute('href');
                                const isPlaceholder = !href || href === '#' || href.startsWith('javascript:');

                                if (isPlaceholder || isContainer) {
                                    // Not a real link, just toggle
                                    e.preventDefault();
                                    this.toggleDropdown(item);
                                } else {
                                    // It IS a real link (Hybrid).
                                    // Check where user clicked.
                                    // If clicked on the far right (arrow area), toggle.
                                    // If clicked on text, navigate.
                                    
                                    const rect = link.getBoundingClientRect();
                                    const clickX = e.clientX - rect.left;
                                    const toggleZoneWidth = 60; // 60px touch target on right
                                    
                                    if (clickX > (rect.width - toggleZoneWidth)) {
                                        // Clicked Arrow
                                        e.preventDefault();
                                        this.toggleDropdown(item);
                                    } else {
                                        // Clicked Text -> Navigate
                                        // Allow default behavior, but close menu if it's an anchor
                                        this.closeAllDropdowns();
                                        this.closeMenu();
                                    }
                                }
                            } else if (this.config.dropdownClickMode === 'toggle') {
                                // Desktop Click
                                const href = link.getAttribute('href');
                                if (!href || href === '#') {
                                    e.preventDefault();
                                    this.toggleDropdown(item);
                                }
                            }
                        }
                    });
                }

                // Keyboard
                link.addEventListener('keydown', (e) => {
                    this.handleDropdownKeyboard(e, item, dropdown, link);
                });
            });
        }

        setupAccessibility() {
            const dropdownParents = this.menu.querySelectorAll('.practice-menu__nav-item, .practice-menu__dropdown-item');
            
            dropdownParents.forEach((item, index) => {
                const dropdown = item.querySelector(':scope > .practice-menu__dropdown');
                const linkWrapper = item.querySelector(':scope > .practice-menu__link-wrapper');
                const link = linkWrapper 
                    ? linkWrapper.querySelector('.practice-menu__nav-link, .practice-menu__dropdown-link')
                    : item.querySelector(':scope > .practice-menu__nav-link, :scope > .practice-menu__dropdown-link');
                const toggleButton = item.querySelector(':scope > .practice-menu__link-wrapper > .practice-menu__dropdown-toggle');
                
                if (!dropdown || !link) return;

                const dropdownId = `pm-dropdown-${index}-${Date.now()}`;
                link.setAttribute('aria-haspopup', 'true');
                link.setAttribute('aria-expanded', 'false');
                link.setAttribute('aria-controls', dropdownId);
                dropdown.setAttribute('id', dropdownId);
                dropdown.setAttribute('role', 'menu');

                // Also set aria on toggle button if it exists
                if (toggleButton) {
                    toggleButton.setAttribute('aria-haspopup', 'true');
                    toggleButton.setAttribute('aria-expanded', 'false');
                    toggleButton.setAttribute('aria-controls', dropdownId);
                }
            });
        }

        handleDropdownKeyboard(e, item, dropdown, link) {
            const isOpen = item.classList.contains('practice-menu__nav-item--open') || 
                          item.classList.contains('practice-menu__dropdown-item--open');
            
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleDropdown(item);
            } else if (e.key === 'Escape') {
                if (isOpen) {
                    e.preventDefault();
                    this.closeDropdown(item);
                    link.focus();
                }
            }
        }

        setHoverTimeout(item, callback) {
            const timeout = setTimeout(callback, this.config.dropdownHoverDelay);
            this.hoverTimeouts.set(item, timeout);
        }

        clearHoverTimeout(item) {
            const timeout = this.hoverTimeouts.get(item);
            if (timeout) {
                clearTimeout(timeout);
                this.hoverTimeouts.delete(item);
            }
        }

        /**
         * Check dropdown position and adjust if it overflows viewport
         */
        adjustDropdownPosition(item) {
            if (this.isMobile) return;
            
            const dropdown = item.querySelector(':scope > .practice-menu__dropdown');
            if (!dropdown) return;

            // Reset classes first
            dropdown.classList.remove('practice-menu__dropdown--align-left', 'practice-menu__dropdown--align-right');
            
            // Check nested dropdowns too
            const nestedDropdown = dropdown.querySelector('.practice-menu__dropdown');
            if (nestedDropdown) {
                nestedDropdown.classList.remove('practice-menu__dropdown--flip-left');
            }

            // Use requestAnimationFrame to ensure DOM has updated
            requestAnimationFrame(() => {
                const rect = dropdown.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const padding = 16; // Minimum padding from viewport edge

                // Check if dropdown overflows right edge
                if (rect.right > viewportWidth - padding) {
                    dropdown.classList.add('practice-menu__dropdown--align-right');
                }
                // Check if dropdown overflows left edge
                else if (rect.left < padding) {
                    dropdown.classList.add('practice-menu__dropdown--align-left');
                }

                // Check nested dropdowns
                if (nestedDropdown) {
                    const nestedRect = nestedDropdown.getBoundingClientRect();
                    if (nestedRect.right > viewportWidth - padding) {
                        nestedDropdown.classList.add('practice-menu__dropdown--flip-left');
                    }
                }
            });
        }

        openDropdown(item) {
            const siblings = item.parentElement.querySelectorAll('.practice-menu__nav-item--open, .practice-menu__dropdown-item--open');
            siblings.forEach(sibling => {
                if (sibling !== item) this.closeDropdown(sibling);
            });

            if (item.classList.contains('practice-menu__nav-item')) {
                item.classList.add('practice-menu__nav-item--open');
            } else {
                item.classList.add('practice-menu__dropdown-item--open');
            }

            // Update ARIA on link
            const linkWrapper = item.querySelector(':scope > .practice-menu__link-wrapper');
            const link = linkWrapper 
                ? linkWrapper.querySelector('.practice-menu__nav-link, .practice-menu__dropdown-link')
                : item.querySelector(':scope > .practice-menu__nav-link, :scope > .practice-menu__dropdown-link');
            if (link) link.setAttribute('aria-expanded', 'true');

            // Update ARIA on toggle button if it exists
            const toggleButton = item.querySelector(':scope > .practice-menu__link-wrapper > .practice-menu__dropdown-toggle');
            if (toggleButton) toggleButton.setAttribute('aria-expanded', 'true');

            this.openDropdowns.add(item);
            
            // Adjust position after opening
            this.adjustDropdownPosition(item);
        }

        closeDropdown(item) {
            item.classList.remove('practice-menu__nav-item--open', 'practice-menu__dropdown-item--open');
            
            // Update ARIA on link
            const linkWrapper = item.querySelector(':scope > .practice-menu__link-wrapper');
            const link = linkWrapper 
                ? linkWrapper.querySelector('.practice-menu__nav-link, .practice-menu__dropdown-link')
                : item.querySelector(':scope > .practice-menu__nav-link, :scope > .practice-menu__dropdown-link');
            if (link) link.setAttribute('aria-expanded', 'false');

            // Update ARIA on toggle button if it exists
            const toggleButton = item.querySelector(':scope > .practice-menu__link-wrapper > .practice-menu__dropdown-toggle');
            if (toggleButton) toggleButton.setAttribute('aria-expanded', 'false');
            
            // Reset position classes when closing
            const dropdown = item.querySelector(':scope > .practice-menu__dropdown');
            if (dropdown) {
                dropdown.classList.remove('practice-menu__dropdown--align-left', 'practice-menu__dropdown--align-right');
                const nestedDropdown = dropdown.querySelector('.practice-menu__dropdown');
                if (nestedDropdown) {
                    nestedDropdown.classList.remove('practice-menu__dropdown--flip-left');
                }
            }
            
            // Close nested
            const nested = item.querySelectorAll('.practice-menu__dropdown-item--open');
            nested.forEach(n => this.closeDropdown(n));
            
            this.openDropdowns.delete(item);
        }

        toggleDropdown(item) {
            const isOpen = item.classList.contains('practice-menu__nav-item--open') || 
                          item.classList.contains('practice-menu__dropdown-item--open');
            if (isOpen) this.closeDropdown(item);
            else this.openDropdown(item);
        }

        closeAllDropdowns() {
            this.openDropdowns.forEach(item => this.closeDropdown(item));
        }

        throttledHandleScroll() {
            if (this.throttleTimer) return;
            this.throttleTimer = setTimeout(() => {
                this.handleScroll();
                this.throttleTimer = null;
            }, this.config.throttleDelay);
        }
        
        /**
         * Refresh sections list (for dynamically added content)
         */
        refreshSections() {
            this.sections = document.querySelectorAll(this.config.sectionsSelector);
        }

        handleScroll() {
            const scrollY = window.scrollY;
            
            if (this.config.enableScrollShrink) {
                if (scrollY > this.config.scrollThreshold) {
                    this.menu.classList.add(this.config.scrolledClass);
                } else {
                    this.menu.classList.remove(this.config.scrolledClass);
                }
            }
            
            if (this.config.enableThemeSwitch && this.sections.length > 0) {
                this.updateTheme();
            }
        }
        
        updateTheme() {
            this.refreshSections();

            const menuRect = this.menu.getBoundingClientRect();
            const menuCenter = menuRect.top + (menuRect.height / 2);
            let newTheme = 'light';
            
            this.sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= menuCenter && rect.bottom >= menuCenter) {
                    newTheme = (section.classList.contains('is-light-text') || section.getAttribute('data-menu-theme') === 'dark') ? 'dark' : 'light';
                }
            });
            
            if (newTheme !== this.currentTheme) {
                this.currentTheme = newTheme;
                this.menu.classList.remove(this.config.themeLightClass, this.config.themeDarkClass);
                this.menu.classList.add(newTheme === 'dark' ? this.config.themeDarkClass : this.config.themeLightClass);
            }
        }

        handleMenuToggle(e) {
            this.isMenuOpen = e.target.checked;
            const toggleButton = this.menu.querySelector('.practice-menu__toggle-button');
            if (toggleButton) toggleButton.setAttribute('aria-expanded', this.isMenuOpen);
            
            if (!this.isMenuOpen) this.closeAllDropdowns();
        }

        closeMenu() {
            if (this.menuToggle && this.menuToggle.checked) {
                this.menuToggle.checked = false;
                this.isMenuOpen = false;
                this.closeAllDropdowns();
            }
        }

        handleResize() {
            const wasMobile = this.isMobile;
            this.checkMobile();
            if (wasMobile && !this.isMobile && this.isMenuOpen) this.closeMenu();
            if (wasMobile !== this.isMobile) this.closeAllDropdowns();
        }
    }

    return PracticeMenu;
}));