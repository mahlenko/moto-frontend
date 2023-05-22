const navigation = document.querySelector('[data-id="navigation"]')
const navigationToggle = document.querySelector('[data-id="navigation-toggle"]')

// Detect all clicks on the document
document.addEventListener('click', function(event) {
    // Navigation toggle show/hide
    if (!navigation.classList.contains('max-sm:hidden')) {
        if (event.target.closest('[data-id="navigation-toggle"]')) return
        navigation.classList.add('max-sm:hidden')
    }
})

document.addEventListener('DOMContentLoaded', () => {
    navigationToggle.addEventListener('click', event => {
        event.preventDefault()
        navigation.classList.toggle('max-sm:hidden')
    })
})
