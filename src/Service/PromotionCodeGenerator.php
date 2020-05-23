<?php


namespace App\Service;


class PromotionCodeGenerator
{
  public const CODE_CHARSET_1 = 'CFHJKLNPRTVX23456789';
  public const CODE_LENGTH_DEFAULT = 10;
  public const MAX_CODE_FILE = 1000;

  /**
   * @var string $charset
   */
  private $charset = self::CODE_CHARSET_1;

  /**
   * @var int $codeLength
   */
  private $codeLength = self::CODE_LENGTH_DEFAULT;

  /**
   * @var string $fileDestinationPath
   */
  private $fileDestinationPath;

  /**
   * @var string $finalFilename
   */
  private $finalFilename;

  /**
   * @var int $maximumQuantiyByFile
   */
  private $maximumQuantiyByFile = self::MAX_CODE_FILE;

  /**
   * @var int $totalCodeNumber
   */
  private $totalCodeQuantity;

  /**
   * PromotionCodeGenerator constructor.
   * @param string $fileDestinationPath
   * @param string $outputFilename
   * @param int $totalCodeQuantity
   */
  public function __construct($fileDestinationPath, $outputFilename, $totalCodeQuantity) {
    $this->fileDestinationPath = $fileDestinationPath;
    $this->finalFilename = $outputFilename;
    $this->totalCodeQuantity = $totalCodeQuantity;
  }

  public function generate(): void {
    /**
     * plusieurs choses sont à considérer:
     * - il faut générer des codes promotionnel
     * - il faut générer jusqu'à atteindre la limite fixée par la propriété $this->totalCodeQuantity
     * - il faut que chaque code soit unique
     * - il faut ensuite écrire ces codes dans des fichiers
     * - chaque fichier ne peux contenir qu'un nombre limite de code
     * - le groupe de fichier ainsi créé doit être zippé
     */
  }

  /**
   * @return string
   */
  public function getCharset(): string {
    return $this->charset;
  }

  /**
   * @param string $charset
   * @return PromotionCodeGenerator
   */
  public function setCharset(string $charset): PromotionCodeGenerator {
    $this->charset = $charset;

    return $this;
  }

  /**
   * @return string
   */
  public function getFileDestinationPath(): string {
    return $this->fileDestinationPath;
  }

  /**
   * @param string $fileDestinationPath
   * @return PromotionCodeGenerator
   */
  public function setFileDestinationPath(string $fileDestinationPath): PromotionCodeGenerator {
    $this->fileDestinationPath = $fileDestinationPath;

    return $this;
  }

  /**
   * @return int
   */
  public function getCodeLength(): int {
    return $this->codeLength;
  }

  /**
   * @param int $codeLength
   * @return PromotionCodeGenerator
   */
  public function setCodeLength(int $codeLength): PromotionCodeGenerator {
    $this->codeLength = $codeLength;

    return $this;
  }

  /**
   * @return int
   */
  public function getTotalCodeQuantity(): int {
    return $this->totalCodeQuantity;
  }

  /**
   * @param int $totalCodeQuantity
   * @return PromotionCodeGenerator
   */
  public function setTotalCodeQuantity(int $totalCodeQuantity): PromotionCodeGenerator {
    $this->totalCodeQuantity = $totalCodeQuantity;

    return $this;
  }

  /**
   * @return int
   */
  public function getMaximumQuantiyByFile(): int {
    return $this->maximumQuantiyByFile;
  }

  /**
   * @param int $maximumQuantiyByFile
   * @return PromotionCodeGenerator
   */
  public function setMaximumQuantiyByFile(int $maximumQuantiyByFile): PromotionCodeGenerator {
    $this->maximumQuantiyByFile = $maximumQuantiyByFile;

    return $this;
  }

  /**
   * @return string
   */
  public function getFinalFilename(): string {
    return $this->finalFilename;
  }

  /**
   * @param string $finalFilename
   * @return PromotionCodeGenerator
   */
  public function setFinalFilename(string $finalFilename): PromotionCodeGenerator {
    $this->finalFilename = $finalFilename;

    return $this;
  }
}