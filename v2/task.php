<?php
/*
 * Отладочная функция
 *
 *  @param mixed $var
  * @return $string html
 */
function dump($var) {
    echo '<pre>';
    var_dump($var);
    echo '</pre>';
}
/*
 * Абстрактный журнал
 *
 */
$str = "00: 02: 45,400-234-344
00: 02: 15,400-234-344
00: 00: 10,400-234-344
00: 00: 10,400-234-344
00: 01: 55,400-234-324
00: 02: 15,400-234-344
00: 02: 45,400-234-314
00: 02: 35,400-234-314
00: 01: 55,400-234-324
00: 02: 15,400-234-314";
/*
 * Функция GetCallCost считает и возвращает стоимость звонков
 *
 *  @param string $string журнал звонков
  * @return $string цена всех звонков
 */
function GetCallCost ($string){
    $Call = explode(PHP_EOL, $string);
    //$Call = explode(chr(0x10), $string); если строчки разделенны 0x10, значит так будет. Выше строка для тестирования
    $arr=[];
    $arrAllTimeForOneNumber=[]; $allNumber=[];// :) array для будущего быстрого счета акции и вывода общей статистики по клиенту
    //Создание структурированого массива
    $i=0;
    foreach ($Call as $oneCall){
        $timeAndNumber= explode(",", $oneCall);
        $timeCallArr = explode(":", str_replace(' ', '', $timeAndNumber[0]));
        $time = $timeCallArr[0]*3600 + $timeCallArr[1]*60 + $timeCallArr[2]; // вычесляем длительность одного звонка
        $arr[$i]["time"]=$time;
        $arr[$i]["number"]=$timeAndNumber[1];
        $allNumber[]=$timeAndNumber[1];
        $arrAllTimeForOneNumber[$timeAndNumber[1]]+=$time;// массив для быстрого счета АКЦИИ
        $i++;
    }

    /*
     * Вычисление акции на определенный номер
    *
    */
    $time=0;
    $promotionNumber=0;
    foreach ($arrAllTimeForOneNumber as $Number => $time){
        if ($time == max($arrAllTimeForOneNumber)){
            $arrSameTimeNumber=array_keys($arrAllTimeForOneNumber, $time);
            if (count($arrSameTimeNumber)!==1){
                $promotionNumber=array_search(max(array_count_values($allNumber)),array_count_values($allNumber)); // если есть спорные претендетны на акцию вычисляем самый активный номер
                break;
            } else $promotionNumber=$Number; break; // если спорных моментов нет
        }
    }
    echo "Акция распространяется на номер: ".$promotionNumber."<br>";// отладка

    /*
     * Вычисление условий и стоимости
     *
     */
    $price = 0;
    foreach ($arr as  $one) {
        if ($one["number"] !==$promotionNumber){ // проверяем на акцию
            if ($one["number"]<500) {
                //dump($one["time"]);
                $price += $one["time"]*3; // 3 цента секунда
            } else $price += ceil($one["number"]/60)*150; // округление В большую сторону
        }
    }
    return $price;
}

echo "Общая плата составляет: ". GetCallCost($str)." центов.";

