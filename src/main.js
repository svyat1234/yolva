import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

function headerContactsCopy() {
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {        
          alert('Скопировано: ' + text);
        }).catch(err => {
          console.error('Ошибка копирования: ', err);
        });
      }    
      document.getElementById('header-modal').addEventListener('click', (e) => {
        const btn = e.target.closest('.flex.items-center.justify-between > button');      
        if (!btn) return;
        e.stopPropagation();      
        const contactBlock = btn.closest('.flex.items-center.justify-between');
        const link = contactBlock?.querySelector('a');      
        if (link) copyToClipboard(link.textContent.trim());
      });
}

function mobileMenu() {
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu__close');

    function openMobileMenu() {
        mobileMenu.style.opacity = '1';
        mobileMenu.style.pointerEvents = 'auto';
    }

    function closeMobileMenu() {
        mobileMenu.style.opacity = '0';
        mobileMenu.style.pointerEvents = 'none';
    }

    burger.addEventListener('click', openMobileMenu);
    closeBtn.addEventListener('click', closeMobileMenu);

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Close mobile menu on click outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
}

function initStages() {
    const stages = document.querySelectorAll('.stages-card')
    const stagesDots = document.querySelectorAll('.stages-dot')

    stages.forEach((stage, index) => {
        stage.addEventListener('mouseenter', () => {
            stages.forEach(stage => {
                stage.classList.remove('stages-card--active')
            })
            stagesDots.forEach(dot => {
                dot.classList.remove('stages-dot--active')
            })
            stage.classList.add('stages-card--active')
            stagesDots[index].classList.add('stages-dot--active')
        })
    })
}

function initAnimatedCards(selector, contentSelector, activeClass, padding) {
    const cards = document.querySelectorAll(selector);
    
    function updateCardHeight(card, isActive = false) {
        const header = card.querySelector('h3');
        const content = card.querySelector(contentSelector);
        
        // Calculate initial height based on current header height
        const initialHeight = header.offsetHeight + 45;
        
        if (!isActive) {
            card.style.height = initialHeight + 'px';
            return;
        }
        
        // Get the content height including all child elements
        const contentHeight = content.scrollHeight;
        const isMobile = window.innerWidth <= 1024;
        
        // For questions section, adjust padding based on screen size and header height
        const headerHeight = header.offsetHeight;
        const finalPadding = card.classList.contains('questions-card') && isMobile ? 
            padding + headerHeight : padding;
        
        card.style.height = `${contentHeight + finalPadding}px`;
    }
    
    cards.forEach(card => {
        // Initial setup
        updateCardHeight(card);
        
        card.addEventListener('click', function() {
            const content = this.querySelector(contentSelector);
            
            // If the clicked card is already active, close it
            if (this.classList.contains(activeClass)) {
                this.classList.remove(activeClass);
                updateCardHeight(this);
                return;
            }
            
            // Remove active class from all cards
            cards.forEach(c => {
                c.classList.remove(activeClass);
                updateCardHeight(c);
            });
            
            // Add active class to clicked card
            this.classList.add(activeClass);
            updateCardHeight(this, true);
        });
    });

    // Update heights on window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            cards.forEach(card => {
                updateCardHeight(card, card.classList.contains(activeClass));
            });
        }, 100);
    });
}

function initContactsModal() {
    const headerModal = document.getElementById('header-modal');
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');

    function openHeaderModal() {
        headerModal.style.opacity = '1';
        headerModal.style.pointerEvents = 'auto';
    }

    function closeHeaderModal() {
        headerModal.style.opacity = '0';
        headerModal.style.pointerEvents = 'none';
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            openHeaderModal();
        });
    });

    document.addEventListener('click', (e) => {
        if (!headerModal.contains(e.target) && !e.target.hasAttribute('data-modal-trigger')) {
            closeHeaderModal();
        }
    });
}

function smoothScroll () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
  });
}

function toggleSearchForm() {
  const searchBtn = document.querySelector('.header__search')
  console.log(searchBtn);

  const searchForm = document.querySelector('.form-serch')

  searchBtn.addEventListener('click', () => {
    console.log('dasd');

      searchForm.style.display = 'block'
  })

  document.addEventListener('click', (event) => {
      if (!searchForm.contains(event.target) && !searchBtn.contains(event.target)) {
        searchForm.style.display = 'none';
      }
  });
}

function navigation() {
    (function() {
        const sectionIds = [
            'first-section', 'support', 'advantages', 'stages', 'sla', 'firms', 'cases', 'questions', 'request'
        ];
        const navDots = document.getElementById('nav-dots');
        const navMenu = document.getElementById('scroll-navigation');
        const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
        let menuTimeout = null;
        let isDesktop = () => window.innerWidth > 1024;

        function showNavDots() {
            if (isDesktop()) navDots.style.display = 'flex';
        }
        function hideNavDots() {
            navDots.style.display = 'none';
        }
        function showMenu() {
            navMenu.classList.remove('hidden');
            navDots.classList.add('nav-dots--hidden');
        }
        function hideMenu() {
            navMenu.classList.add('hidden');
            navDots.classList.remove('nav-dots--hidden');
        }       
       
        navDots.innerHTML = '';
        sections.forEach((section, idx) => {
            const dot = document.createElement('div');
            dot.className = 'nav-dot nav-dot--delay-' + idx;
            dot.addEventListener('mouseenter', (e) => {
                showMenu();
                hideNavDots();
                clearTimeout(menuTimeout);
            });
            dot.addEventListener('mouseleave', () => {
                menuTimeout = setTimeout(() => {
                    hideMenu();
                    showNavDots();
                }, 200);
            });
            dot.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth' });
            });
            navDots.appendChild(dot);
        });
        
        function highlightActiveDot() {
            let activeIdx = 0;
            sections.forEach((section, idx) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.4) {
                    activeIdx = idx;
                }
            });
            navDots.querySelectorAll('.nav-dot').forEach((dot, i) => {
                if (i === activeIdx) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        function updateNavDotsVisibility() {
            const secondSection = sections[1];
            if (!secondSection) return;
            const rect = secondSection.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2) {
                navDots.style.display = 'flex';
                navDots.querySelectorAll('.nav-dot').forEach((dot, i) => {
                    setTimeout(() => {
                        dot.classList.add('visible');
                        dot.style.opacity = '0.5';
                        dot.style.pointerEvents = 'auto';
                    }, i * 120);
                });
            } else {
                navDots.style.display = 'none';
                navMenu.classList.add('hidden');
                navDots.querySelectorAll('.nav-dot').forEach(dot => {
                    dot.classList.remove('visible');
                    dot.style.opacity = '0';
                    dot.style.pointerEvents = 'none';
                });
            }
            highlightActiveDot();
        }
        window.addEventListener('scroll', updateNavDotsVisibility);
        window.addEventListener('scroll', highlightActiveDot);
        updateNavDotsVisibility();

        navDots.addEventListener('mouseenter', () => {
            showMenu();
            hideNavDots();
            clearTimeout(menuTimeout);
        });
        navDots.addEventListener('mouseleave', () => {
            menuTimeout = setTimeout(() => {
                hideMenu();
                showNavDots();
            }, 200);
        });
        navMenu.addEventListener('mouseenter', () => {
            clearTimeout(menuTimeout);
            showMenu();
            hideNavDots();
        });
        navMenu.addEventListener('mouseleave', () => {
            menuTimeout = setTimeout(() => {
                hideMenu();
                showNavDots();
            }, 200);
        });

        window.addEventListener('resize', function() {
            if (!isDesktop()) {
                hideNavDots();
                hideMenu();
            } else {               
                showNavDots();
            }
        });
    })();

    // PopUp
    ;(function() {        
        const mOpen = document.querySelectorAll('[data-modal]');       
        if (mOpen.length == 0) return;             
        const overlay = document.querySelector('.overlay'),             
              modals = document.querySelectorAll('.dlg-modal'),              
              mClose = document.querySelectorAll('[data-close]');        
        let mStatus = false;

        for (let el of mOpen) {
            el.addEventListener('click', function(e) {              
                let modalId = el.dataset.modal,
                    modal = document.getElementById(modalId);               
                modalShow(modal);
            });
        }
        
        for (let el of mClose) {
            el.addEventListener('click', modalClose);
        }
        
        document.addEventListener('keydown', modalClose);

        function modalShow(modal) {           
            overlay.classList.remove('fadeOut');
            overlay.classList.add('fadeIn');         
            if (typeAnimate === 'fade') {
                modal.classList.remove('fadeOut');
                modal.classList.add('fadeIn');
            } else if (typeAnimate === 'slide') {
                modal.classList.remove('slideOutUp');
                modal.classList.add('slideInDown');
            }           
            mStatus = true;
        }

        function modalClose(event) {
            if (mStatus && ( event.type != 'keydown' || event.keyCode === 27 ) ) {                
                for (let modal of modals) {
                    if (typeAnimate == 'fade') {
                        modal.classList.remove('fadeIn');
                        modal.classList.add('fadeOut');
                    } else if (typeAnimate == 'slide') {
                        modal.classList.remove('slideInDown');
                        modal.classList.add('slideOutUp');
                    }
                }                
                overlay.classList.remove('fadeIn');
                overlay.classList.add('fadeOut');                
                mStatus = false;
            }
        }

        function menuNumbers() {
            const menuLinks = document.querySelectorAll('.navigation-link span:first-child');
            menuLinks.forEach((link, index) => {
                link.textContent = `0${index + 1}.`;
            });
        }

        menuNumbers()
    })();   
}

headerContactsCopy()
mobileMenu()
navigation()
initStages()
initContactsModal()
smoothScroll()
toggleSearchForm()
initAnimatedCards('.conveyor-card', '.conveyor-list', 'conveyor-card--active', 20);
initAnimatedCards('.questions-card', '.questions-card > div:not(.questions-close)', 'questions-card--open', 60);