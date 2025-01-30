# Alert

- Required [JQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js)
  Berikut ada beberapa tools untuk generate alert

## Toast

- Install / include pluggin file [Toastify-JS](https://github.com/apvarun/toastify-js/blob/master/README.md)
- Include tools file [toast.js](alert/toast.js)
- Use

### How To Use

Simple toast auto render generated, autohide with duration 1500ms

```js
new Toast("Hello World", 1500, "bg-danger", true);
```

Advance toast additional setting option before rendering toast

```js
const inToast = new Toast(
  "Silahkan login untuk akses administrator",
  1500,
  "bg-primary",
  false,
  false
);
inToast.options.position = "center";
inToast.generate();
```

## Sweetalert2

- Install / include pluggin file [Sweetalert2](https://sweetalert2.github.io/)
- Include tools file [alert.js](alert/alert.js)
- Use

### How To Use

Simple alert notification

```js
swal("Hello World", "success", 1500);
```

Simple alert redirect url on swal dismiss

```js
swal("Redirect to Google", "success", 1500, null, "https://www.google.com/");
```

Confirm using alert

```js
const onConfirm = () => {
  swal("On Confirmed", "info", 1500);
};
new swalConfirm(onConfirm, "Confirm ?");
```
