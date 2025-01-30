# Ajax

- Required [JQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js)
- Include tools file [ajax.js](ajax/ajax.js)
- Add Meta `CSRF_TOKEN` to your Html file

```html
<meta name="csrf-token" content="{{ csrf_token() }}" />
```

### How To Use

Simple `POST Request` for submitting form

```js
const action = "..."; //form action;
const $ajax = new AjaxRequest(action);
$ajax.onBefore = () => {
  console.log("Event before sending...");
};
$ajax.onfail = (err) => {
  console.log("Event after error catched...");
};

const data = new FormData(form); // form data
$ajax.submit(data, (resp) => {
  console.log("Event on success sending request");
});
```

Sending `GET Request` with addition options

```js
const $ajax = new AjaxRequest("https://....", "GET");
$ajax.addOptions({ dataType: "json" });
$ajax.onBefore = () => showLoader();
$ajax.onfail = (err) => showLoader(false);
$ajax.submit(data, (resp) => {
  console.log("Event on success sending request");
});
```

## Generate Excel via Ajax Request

- Additional, you should include tools file [ajax.js](ajax/excel-ajax.js)

### How To Use

```js
const data = new FormData(); // req params
const action = "https://....";
const excel = new ExcelUsingAjax(action);
excel.run(data);
```
