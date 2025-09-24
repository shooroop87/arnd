/**
 * Input fields formatter
 * @requires https://github.com/nosir/cleave.js
 */

const input = document.querySelectorAll('[data-format]')
if (input) {
    for (let i = 0; i < input.length; i++) {
        let targetInput = input[i],
            cardIcon = targetInput.parentNode.querySelector('.credit-card-icon'),
            options,
            formatter
        if (targetInput.dataset.format != undefined)
            options = JSON.parse(targetInput.dataset.format)

        /* eslint-disable no-unused-vars, no-undef */
        if (cardIcon) {
            formatter = new Cleave(targetInput, {
                ...options,
                onCreditCardTypeChanged: (type) => {
                    cardIcon.className = 'credit-card-icon ' + type
                },
            })
        } else {
            formatter = new Cleave(targetInput, options)
        }
        /* eslint-enable no-unused-vars, no-undef */
    }
}
