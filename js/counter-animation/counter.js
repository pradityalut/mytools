/**
 * Counter animation
 *
 * @param {any} el - dom el
 * @param {number|null} max - counter max, if set null with get from dom text
 * @param {number} duration - time of animation
 * @returns {void}
 */
function Counter(el, max = null, duration = 500, min = 0) {
    if (max == null) max = el.text();

    el.prop('Counter', min).animate({
        Counter: max,
    }, {
        duration: duration,
        easing: 'swing',
        step: function (now) {
            el.text(Math.ceil(now));
        }
    });
}

$(document).ready(function () {
    $(".counter").each(function () {
        Counter($(this));
    })
});