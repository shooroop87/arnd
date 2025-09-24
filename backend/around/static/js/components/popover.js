/**
 * Popover
 * @requires https://getbootstrap.com
 * @requires https://popper.js.org/
 */

const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
)

/* eslint-disable no-unused-vars, no-undef */
const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
)
