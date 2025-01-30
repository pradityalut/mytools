$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
    }
});

/**
 * Ajax Loader to DOM Element
 *
 * @param {any} el - dom el
 * @param {string|null} text - text html
 * @returns {void}
 */
function addLoader2El(dom, text = "") {
    if (typeof dom !== "object") return;

    if (text === "") text = $.trim(dom.html());
    dom.html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${text}`);
}

/**
 * Ajax Request Helper
 *
 * @param {string} action - action request url.
 * @param {string} method - method of request, default: POST.
 * @param {object} option - additional custom option for ajax request
 * @returns {void}
 */
function AjaxRequest(action, method = "POST", alert = "toast", customOptions = {}) {
    this.onBefore = null;
    this.onfail = null;
    this.onfinish = null;

    this.addOptions = (option) => {
        customOptions = option;
    }

    /**
     * 
     * @param {object} data 
     * @param {Function} onSuccess 
     * @param {string} alert 
     * @returns 
     */
    this.submit = (data, onSuccess) => {
        const preEvent = this.onBefore;
        const failEvent = this.onfail;
        const postEvent = this.onfinish;

        let option = {
            type: method,
            url: action,
            data: data,
            contentType: false,
            processData: false,
            beforeSend: function () {
                if (preEvent == null) return
                preEvent()
            },
            success: (resp) => {
                onSuccess(resp)
            },
            /* error: function (err) {
            } */
        }

        if (Object.keys(customOptions).length) option = { ...option, ...customOptions }
        return $.ajax(option).done(function () {
            if (postEvent == null) return;
            postEvent();
        }).fail(function (err) {
            if (alert) {
                let message = "";
                const json = err.responseJSON;
                if (json !== undefined) {
                    message = json.message ?? "Internal Server Error";
                    if (json.errors !== undefined && typeof json.errors === "string") message += `\n${json.errors}`;
                } else message = `[${err.status}] ${err.statusText}`;
                if (err.status === 401) message += "\nPlease re-login your session.";

                switch (alert) {
                    case "toast":
                        new Toast(message, 3000, "bg-danger", true);
                        break;
                    default:
                        break;
                }
            }
            if (err.status === 401) setTimeout(() => {
                location.reload();
            }, 500);

            if (failEvent == null) return;
            failEvent();
        });
    }
}