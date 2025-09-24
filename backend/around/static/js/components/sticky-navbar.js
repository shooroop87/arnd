/**
 * Add solid background to fixed to top navigation bar
 */

const navbar = document.querySelector('.navbar.fixed-top')

if (navbar) {


    const navbarClass = navbar.classList
    const scrollOffset = 20

    const navbarStuck = (e) => {
        if (e.currentTarget.pageYOffset > scrollOffset) {
            navbarClass.add('navbar-stuck')
        } else {
            navbarClass.remove('navbar-stuck')
        }
    }

// On load
    window.addEventListener('load', (e) => {
        navbarStuck(e)
    })

// On scroll
    window.addEventListener('scroll', (e) => {
        navbarStuck(e)
    })

}
