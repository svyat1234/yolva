import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

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
        stage.addEventListener('mouseleave', () => {
            stage.classList.remove('stages-card--active')
            stagesDots[index].classList.remove('stages-dot--active')
            stages[0].classList.add('stages-card--active')
            stagesDots[0].classList.add('stages-dot--active')
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

// Scroll anchor smooth

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

initStages()
initContactsModal()
smoothScroll()
toggleSearchForm()
initAnimatedCards('.conveyor-card', '.conveyor-list', 'conveyor-card--active', 20);
initAnimatedCards('.questions-card', '.questions-card > div:not(.questions-close)', 'questions-card--open', 60);