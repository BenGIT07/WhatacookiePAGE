const siteNav = document.querySelector('.js-site-nav')
const menu = document.querySelector('.js-menu')
const menuButton = document.querySelector('.js-menu-button')
const navCurtain = document.querySelector('.js-nav-curtain')

function mobileNavToggler() {
  const state = {
    isOpen: false,
  }

  function showMenu() {
    siteNav.classList.add('site-nav--is-open')
    menu.classList.remove('fade-out')
    menu.classList.add('fade-in')
  }

  function hideMenu() {
    siteNav.classList.remove('site-nav--is-open')
    menu.classList.remove('fade-in')
    menu.classList.add('fade-out')
  }

  function curtainUp() {
    navCurtain.classList.remove('curtain-down')
    navCurtain.classList.add('curtain-up')
  }

  function curtainDown() {
    navCurtain.classList.remove('curtain-up')
    navCurtain.classList.add('curtain-down')
  }

  function unfocusButton() {
    menuButton.classList.remove('menu-button__lines--open')
    menuButton.setAttribute('aria-expanded', 'false')
  }

  function focusButton() {
    menuButton.classList.add('menu-button__lines--open')
    menuButton.setAttribute('aria-expanded', 'true')
  }

  function handleMenuButtonClick() {
    if (state.isOpen) {
      hideMenu()
      unfocusButton()
      curtainDown()
      state.isOpen = false
      return
    }

    focusButton()
    curtainUp()
    state.isOpen = true
  }

  function handleCurtainAnimationEnd() {
    if (state.isOpen) {
      showMenu()
    }
  }

  // --- CIERRE AUTOMÁTICO AL HACER CLIC EN UN ENLACE DE NAVEGACIÓN ---
  function handleNavLinkClick(e) {
    const link = e.target.closest('a')
    if (!link) return

    const targetId = link.getAttribute('href')

    // Si es un enlace interno que empieza con #
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault()

      // Si el menú móvil está abierto, cerrarlo
      if (state.isOpen) {
        hideMenu()
        unfocusButton()
        curtainDown()
        state.isOpen = false
      }

      // Desplazamiento suave al elemento de destino
      if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return {
    handleEvent(event) {
      if (event.type === 'click') {
        if (event.currentTarget === menuButton) {
          handleMenuButtonClick()
        }
        return
      }

      if (event.type === 'animationend') {
        handleCurtainAnimationEnd()
      }
    },

    init() {
      if (menuButton) menuButton.addEventListener('click', this)
      if (navCurtain) navCurtain.addEventListener('animationend', this)
      
      // Escuchar clics en los enlaces dentro de la navegación
      if (siteNav) {
        siteNav.addEventListener('click', handleNavLinkClick)
      }
    },
  }
}

mobileNavToggler().init()
