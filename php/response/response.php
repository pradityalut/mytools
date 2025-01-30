<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

/**
 * Global Response JSOn API Formatter
 *
 * @param string $message Message or info for response
 * @param any $payload Data/Array can be displayed for response
 * @param array $meta_data Array for additional option
 * @param int $code Status Code HTTP
 * @return JsonResponse
 **/
function JSON_RESPONSE(string $message, $payload = null, array $meta_data = [], int $code = 200): JsonResponse
{
    $resp = [
        'statusCode' => $code,
        'success' => in_array($code, [Response::HTTP_OK, Response::HTTP_CREATED, Response::HTTP_ACCEPTED, Response::HTTP_NO_CONTENT]) ? true : false,
        'message' => $message,
    ];
    if ($payload) $resp['data'] = $payload;
    if ($meta_data) $resp = array_merge($resp, $meta_data);

    return response()->json($resp, $code);
}


/**
 * Global Response Error API Formatter
 *
 * @param string $message Message error for info
 * @param any $error errors data can be displayed for response
 * @param int $code Status Code HTTP
 * @return JsonResponse
 **/
function ERROR_RESPONSE(string $message, $errors = null, $code = 404): JsonResponse
{
    if ($errors) {
        return JSON_RESPONSE($message, null, [
            'errors' => $errors,
            'error_code' => $code,
        ], $code);
    }
    return JSON_RESPONSE($message, null, [], $code);
}
