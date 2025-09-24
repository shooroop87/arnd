/**
 * Sidebar link active
 */


const links = document.querySelectorAll('#sidebar-account .nav a')

links.forEach(item => {
    const currentPageUrl = window.location.href

    if (currentPageUrl === item.href) {
        return item.classList.add('active')
    } else {
        return item.classList.remove('active')
    }
})
