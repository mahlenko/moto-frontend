import IMask from 'imask';

const navigation = document.querySelector('[data-id="navigation"]')
const navigationToggle = document.querySelector('[data-id="navigation-toggle"]')

/* Detect key press */
document.addEventListener('keypress', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal')
        modals.forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                modal.classList.add('hidden')
                document.body.style.overflow = modal.classList.contains('hidden') ? 'auto' : 'hidden'
            }
        })
    }
})

// Detect all clicks on the document
document.addEventListener('click', function(event) {
    // Navigation toggle show/hide
    if (!navigation.classList.contains('max-sm:hidden')) {
        if (event.target.closest('[data-id="navigation-toggle"]')) return
        navigation.classList.add('max-sm:hidden')
    }
})

/**
 * Load page
 */
document.addEventListener('DOMContentLoaded', () => {
    // Navigation bar
    navigationToggle.addEventListener('click', event => {
        event.preventDefault()
        navigation.classList.toggle('max-sm:hidden')
    })

    // setups
    setupControls(document.querySelectorAll('.control'))

    // hash links
    setupHashLinks(document.querySelectorAll('a'))

    //
    setupForm(document.querySelectorAll('form'))
})

/**
 * Functions
 */
function setupControls(nodes) {
    nodes.forEach(node => {
        let item = node.querySelector('input')
        if (item === null) {
            item = node.querySelector('textarea')
            if (item === null) return
        }

        filledControlsDataSet(item)

        item.addEventListener('blur', function() {
            filledControlsDataSet(item)
        })
    })

    // mask
    nodes.forEach(node => {
        let item = node.querySelector('input')
        if (item === null || item.inputMode !== "tel") return

        item.pattern = '\\+7\\s\\([0-9]{3}\\)\\s[0-9]{3}-[0-9]{2}-[0-9]{2}'

        IMask(item, {
            mask: '+{7} (000) 000-00-00'
        })
    })
}

function filledControlsDataSet(control) {
    control.dataset.filled = control.value.length > 0
}

function setupHashLinks(nodes) {
    let containers = {}

    nodes.forEach(node => {
        let url = new URL(node.href)
        if (!url.hash) return

        // Get bounds
        if (!containers.hasOwnProperty(url.hash)) {
            let container = document.querySelector(url.hash)
            if (!container) return

            containers[url.hash] = container
        }

        let container = containers[url.hash]

        // show modal
        if (container.classList.contains('modal')) {
            node.addEventListener('click', event => {
                return modal.show(container, node)
            })
        }

        // add event scroll to
        node.addEventListener('click', event => {
            event.preventDefault()

            container.scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

function setupForm(forms) {
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault()

            window.modal.closeAll()
            window.modal.show(document.querySelector('#send-form-success'))

            form.querySelectorAll(':valid').forEach(item => {
                item.value = ''
            })
        })
    })
}


/**
 * Modal box
 * @type {{show: modal.show}}
 */
window.modal = {
    show: (modal, el) => {
        modal.classList.toggle('hidden')

        document.body.style.overflow = modal.classList.contains('hidden') ? 'auto' : 'hidden'

        if (!modal.classList.contains('hidden')) {

            //
            const form = modal.querySelector('form')
            if (!form) return false

            const input = form.querySelector('input')

            // Настройка формы
            setTimeout(() => {
                input.focus()

                // заполним данными
                if (el) {
                    let formDataValue = el.dataset.form
                    if (!formDataValue) return false

                    let json = JSON.parse(formDataValue)
                    if (!json) return false

                    Object.keys(json).forEach(key => {
                        let item = form.querySelector('[name="' + key + '"]')
                        item.value = json[key]
                    })
                }
            })
        }
    },

    closeAll: () => {
        let modals = document.querySelectorAll('.modal')
        modals.forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                window.modal.show(modal)
            }
        })
    }
}
