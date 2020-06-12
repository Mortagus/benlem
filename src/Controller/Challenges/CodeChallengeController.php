<?php

namespace App\Controller\Challenges;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class CodeChallengeController
 * @package App\Controller\Games
 * @Route("/code_challenge")
 */
class CodeChallengeController extends AbstractController
{
  /**
   * @Route("/dashboard", name="challenge_dashboard")
   */
  public function index(): Response
  {
    $h1 = 'CODING TRAIN CHALLENGE';
    return $this->render('CodingTrainChallenges/dashboard.html.twig', [
      'controller_name' => 'CodeChallengeController',
      'page_identifier' => 'Code_Challenges',
      'challenges' => [
        'boids' => [
          'name' => 'Boids',
          'container_id' => 'boids-container',
          'title_h1' => $h1,
          'title_h2' => 'FLOCKING SIMULATION',
          'title_h3' => 'or boids algorithm implementation',
        ],
        'single_pendulum' => [
          'name' => 'Single Pendulum',
          'container_id' => 'single-pendulum-container',
          'title_h1' => $h1,
          'title_h2' => 'SINGLE PENDULUM SIMULATION',
        ],
        'mover_simulation' => [
          'name' => 'Movers',
          'container_id' => 'mover-container',
          'title_h1' => $h1,
          'title_h2' => 'MOVER SIMULATION',
        ],
//        'double_pendulum',
//        'raycasting',
//        'hilbert_curve',
      ]
    ]);
  }
}
