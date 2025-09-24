/**
 * Toast
 * @requires https://getbootstrap.com
 */

const toastElList = [].slice.call(document.querySelectorAll('.toast'))

const toastList = toastElList.map((toastEl) => new bootstrap.Toast(toastEl))
