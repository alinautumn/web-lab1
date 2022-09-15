<?php
if (isset($_GET['x']) && isset($_GET['y']) && isset($_GET['r'])) {

    $x = $_GET['x'];
    $y = $_GET['y'];
    $r = $_GET['r'];

    if (validate($x, $y, $r)){
        $cur_time = date('H:i:s', time() - $_GET['date'] * 60);
        $ex_time = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);
        $res = isIn($x, $y, $r);

        echo result($x, $y, $r, $cur_time, $ex_time, $res);
    }
}

function isIn($x, $y, $r)
{
    return (isCircle($x, $y, $r) || isRect($x, $y, $r) || isTriangle($x, $y, $r));
}

function isTriangle($x, $y, $r)
{
    return ($x >= 0 && $y <= 0 && $y - $x / 2 + $r >= 0);
}

function isCircle($x, $y, $r)
{
    return ($x <= 0 && $y >= 0 && $x * $x + $y * $y <= ($r / 2) * ($r / 2));
}

function isRect($x, $y, $r)
{
    return ($x <= 0 && $y <= 0 && $x >= -1 * $r && $y >= -1 * $r / 2);
}

function result($x, $y, $r, $cur_time, $ex_time, $res)
{

    $str_res = ($res) ? "true" : "false";

    return '{"x":"' . $x . '","y":"' . $y . '","r":"' . $r . '","current":"' . $cur_time . '","execution":' . $ex_time . ',"result":' . $str_res . '}';

}

function validate($x, $y, $r)
{
    return is_numeric($x) && is_numeric($y) && is_numeric($r);
}
