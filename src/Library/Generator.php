<?php

namespace App\Library;

use Exception;

/**
 * Created by PhpStorm.
 * User: blemin01
 * Date: 28/11/2017
 * Time: 13:00
 */
class Generator
{

  /**
   * @var array $config
   */
  private $config;

  /**
   * Generator constructor.
   * @param array $config
   */
  public function __construct(array $config = null) {
    $this->initConfig($config);
  }

  /**
   * @param array $config
   */
  private function initConfig($config): void {
    if (is_array($config)) {
      $this->config = $config;
    } else {
      $this->config = [
        'charset' => 'CFHJKLNPRTVX23456789',
        'charsetLength' => strlen('CFHJKLNPRTVX23456789') - 1,
        'fileLimit' => 2000000,
        'codeLength' => 8,
        'codeQuantity' => 70000000,
      ];
    }
  }

  public function generateAll(): void {
    $filenameBase = 'C:\Users\blemin01\Documents\Isobar\Clients\ABInbev\special';
    foreach ($this->config['codeSets'] as $name => $params) {
      $fileQuantity = ceil($params['codeQuantity'] / $params['fileLimit']);
      for ($f = 0; $f < $fileQuantity; $f++) {
        $fileName = $filenameBase . DIRECTORY_SEPARATOR . $name . DIRECTORY_SEPARATOR . $name . '_codes_' . ($f + 1) . '.txt';
        $fileHandler = fopen($fileName, 'wb');
        for ($i = 0; $i < $params['fileLimit']; $i++) {
          $newLine = $this->tryToGenerateOneCode($params['codeLength']) . "\r\n";
          $newLine = mb_convert_encoding($newLine, 'ASCII', mb_internal_encoding());
          fwrite($fileHandler, $newLine);
        }
        fclose($fileHandler);
        unset($fileName, $fileHandler);
        gc_collect_cycles();
      }
    }
  }

  /**
   * @param $codeLength
   * @return string
   */
  private function tryToGenerateOneCode($codeLength): string {
    $newCode = '';
    for ($i = 0; $i < $codeLength; $i++) {
      try {
        $newCode .= $this->config['charset'][random_int(0, $this->config['charsetLength'])];
      } catch (Exception $e) {

      }
    }

    return $newCode;
  }
}

//$generatorClass = new Generator([
//  'charset' => 'CFHJKLNPRTVX23456789',
//  'charsetLength' => strlen('CFHJKLNPRTVX23456789') - 1,
//  'codeSets' => [
//    'cans' => [
//      'codeLength' => 10,
//      'codeQuantity' => 30000000,
//      'fileLimit' => 500000,
//    ],
//    'bottles' => [
//      'codeLength' => 8,
//      'codeQuantity' => 43500000,
//      'fileLimit' => 20000000,
//    ],
//    'boxes' => [
//      'codeLength' => 6,
//      'codeQuantity' => 250000,
//      'fileLimit' => 250000,
//    ],
//  ],
//]);
//$generatorClass->generateAll();