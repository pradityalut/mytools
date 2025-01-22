/**
 *
 * @param {string} text message toast
 * @param {int} duration if -1 toast always shown
 * @param {string} className class dom toast
 * @param {boolean} closeBtn
 * @param {boolean} auto auto generate without call func generate()
 * @param {Function|null} event Callback after toast clicked
 */
function Toast(text, duration = -1, className = "bg-primary", closeBtn = false, auto = true, event = null,  themeIndex = 0) {
    var bgColors = [
        "linear-gradient(to right, #00b09b, #96c93d)",
        "linear-gradient(to right, #ff5f6d, #ffc371)",
    ];

    if (!className || className == "") className = "bg-primary";
    this.options = {
        text: text,
        duration: duration,
        className: `bg-gradient ${className}`,
        close: closeBtn || duration == -1 ? true : false,
        gravity: "top", // `top` or `bottom`,
        position: "right", // `left`, `center` or `right`,
        stopOnFocus: true, // Prevents dismissing of toast on hover,
        style: {
            background: bgColors[themeIndex % 2],
        }
    }
    if (event != null) this.options.onClick = () => event(); // Callback after click,

    this.setUrl = (url, newTab = true) => {
        this.options.destination = url;
        this.options.newWindow = newTab;
    };

    this.setPosition = (gravity = "top", position = "right") => {
        this.options.gravity = gravity;
        this.options.position = position;
    }

    this.generate = () => Toastify(this.options).showToast();
    if (auto) this.generate();
}
