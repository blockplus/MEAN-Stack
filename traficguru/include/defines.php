<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
    $base_url	= "http://".$_SERVER['HTTP_HOST'];
    $base_url .= str_replace(basename($_SERVER['SCRIPT_NAME']), "", $_SERVER['SCRIPT_NAME']);
    define('IMG_DIR',$base_url.'include/images');
    define('CSS_DIR', $base_url.'include/css');
    define ('JS_DIR',$base_url.'include/js');
    define('SITE_NAME','TraficGuru Backend');
    

