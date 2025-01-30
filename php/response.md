# Response

Tools response json builder

- Asumse you are your php [Laravel](https://laravel.com/)
- Incloude tool file [response.php](response/response.php) or use for `global_function_helper`

### How To Use

Simple Message Success

```php
return JSON_RESPONSE("Berhasil di proses");
```

Simple Message Error

```php
return ERROR_RESPONSE('Failed to get data');
```

Simple Payload

```php
return JSON_RESPONSE("Berhasil di proses", ["id" => 1, "name" => "Praditya"]);
```

You can customize your `error_code`

```php
return ERROR_RESPONSE("Failed to get access", $error, 403);
```
