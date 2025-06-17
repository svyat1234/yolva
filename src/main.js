import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

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

initContactsModal()
smoothScroll()
toggleSearchForm()