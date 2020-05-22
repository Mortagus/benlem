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
    return $this->render('CodingTrainChallenges/dashboard.html.twig', [
      'controller_name' => 'CodeChallengeController',
      'page_identifier' => 'Code_Challenges',
      'challenges' => [
        'boids',
        'single_pendulum',
        'double_pendulum',
        'raycasting',
        'hilbert_curve',
      ]
    ]);
  }
}
