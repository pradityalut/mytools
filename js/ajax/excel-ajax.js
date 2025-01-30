
/**
 * Excel using Ajax Request Helper
 *
 * @param {string} action - action request url.
 * @param {string} method - method of request, default: GET.
 * @returns {void}
 */
function ExcelUsingAjax(action, method = "POST", alert = "toast", defaultname = "Excel.xlsx", callbackOnSuccess = null) {
    this.onBefore = null;
    this.onfinish = null;
    this.ajaxCustomOption = {
        xhrFields: { responseType: 'blob', },
        success: function (result, status, xhr) {
            if ((typeof result) != "object") return new Toast(`Please reload for re-proccess data`, -1, "bg-danger");

            let disposition = xhr.getResponseHeader('content-disposition');
            let matches = /"([^"]*)"/.exec(disposition);
            if (!matches) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                matches = filenameRegex.exec(disposition);
            }
            let filename = (matches != null && matches[1] ? matches[1] : defaultname);

            // The actual download
            var blob = new Blob([result], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            if (callbackOnSuccess != null) callbackOnSuccess();

            return new Toast(`Excel downloaded as\n${filename}`, 3000, "bg-success", true)
        }
    }

    this.ajaxSetup = new AjaxRequest(action, method, alert);
    this.ajaxSetup.onBefore = () => showLoader(true);
    this.ajaxSetup.onfinish = () => showLoader(false);
    this.ajaxSetup.onfail = () => showLoader(false);
    this.ajaxSetup.addOptions(this.ajaxCustomOption);

    this.run = (data) => {
        if (this.onBefore === null) this.onBefore = () => showLoader(true);
        if (this.onfinish === null) this.onfinish = () => showLoader(false);

        this.ajaxSetup.onBefore = this.onBefore;
        this.ajaxSetup.onfinish = this.onfinish;
        this.ajaxSetup.submit(data, () => console.log("Download excel"));
    }
}