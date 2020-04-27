<?php

namespace App\Controller\Games;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class GamesController
 * @package App\Controller\Games
 * @Route("/games")
 */
class GamesController extends AbstractController
{
  /**
   * @Route("/dashboard", name="games_dashboard")
   */
  public function index(): Response
  {
    return $this->render('Games/dashboard.html.twig', [
      'controller_name' => 'GamesController',
      'page_identifier' => 'Games',
      'games' => [
        'tetris',
        'asteroid',
        'mastermind',
        'snake',
        'moprion'
      ]
    ]);
  }
}
