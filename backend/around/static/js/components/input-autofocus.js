/**
 * Focus first input on modal / offcanvas / collapse open
 *
 */

const targetInput = document.querySelectorAll('[data-focus-on-open]')

if (targetInput) {
    for (let i = 0; i < targetInput.length; i++) {
        const toggler = JSON.parse(targetInput[i].dataset.focusOnOpen)

        document
            .querySelector(toggler[1])
            .addEventListener(`shown.bs.${toggler[0]}`, () => {
                targetInput[i].focus()
            })
    }
}
