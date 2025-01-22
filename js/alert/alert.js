/**
 * Alert using sweetalert2
 * 
 * @param {string} text message alert
 * @param {string} type consist of info|success|error
 * @param {int} duration if -1 toast always shown
 * @param {string} customTitle custom title alert
 * @param {string|null} url redirect url on alert closed
 * @return void()
 */
function swal(text, type = "info", duration = 1500, customTitle = null, url = null) {
    let option = {
        text: text,
        icon: "info",
        customClass: {
            title: 'text-primary',
            timerProgressBar: 'bg-primary'
        },
    }
    switch (type) {
        case "success":
            option.icon = type;
            option.title = customTitle ?? "Success";
            option.customClass.title = "text-success";
            option.customClass.timerProgressBar = "bg-success";
            break;
        case "error":
            option.icon = type;
            option.title = customTitle ?? "Error";
            option.customClass.title = "text-danger";
            option.customClass.timerProgressBar = "bg-danger";
            break;
        default:
            option.title = customTitle ?? "Information";
            break;
    }

    if (duration > 0) {
        option.timer = duration;
        option.showCloseButton = false;
        option.timerProgressBar = true;
        option.showConfirmButton = false;
    }
    Swal.fire(option).then((res) => {
        if (!url) return;
        if (duration > 0 || res.isConfirmed) window.location.href = url;
    });
}


/**
 * Confirm using sweetalert2
 * 
 * @param {Function|null} event Callback on confirmed
 * @param {string} text message alert
 * @param {boolean} manualfire if want ot customize option, value should be true
 */
function swalConfirm(onConfirmed, text = "You won't be able to revert this!", manualfire = false) {
    this.option = {
        title: "Are you sure?",
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, sure",

        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-outline-primary ms-2"
        },
        buttonsStyling: false
    }
    this.fire = () => {
        Swal.fire(this.option).then((result) => {
            if (result.isConfirmed) {
                onConfirmed();
            }
        });
    }
    if (!manualfire) this.fire();
}