# A. Alert
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
const inToast = new Toast("Silahkan login untuk akses administrator", 1500, "bg-primary", false, false);
inToast.options.position = "center";
inToast.generate();
```