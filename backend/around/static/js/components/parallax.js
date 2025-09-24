/**
 * Mouse move parallax effect
 * @requires https://github.com/wagerfield/parallax
 */

const element = document.querySelectorAll('.parallax')

for (let i = 0; i < element.length; i++) {
    const parallaxInstance = new Parallax(element[i])
}
