<?php

namespace App\Helpers;

class Utils
{
    public static function formatPhone($phone)
    {
        if (strlen($phone) === 11) {
            return preg_replace("/(\d{2})(\d{1})(\d{4})(\d{4})/", "($1) $2 $3-$4", $phone);
        } elseif (strlen($phone) === 10) {
            return preg_replace("/(\d{2})(\d{4})(\d{4})/", "($1) $2-$3", $phone);
        }
        return $phone; // Retorna o valor original caso não atenda às condições
    }
}
