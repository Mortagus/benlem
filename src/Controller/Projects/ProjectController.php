<?php

namespace App\Controller\Projects;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ProjectController
 * @package App\Controller
 * @Route("/project")
 */
class ProjectController extends AbstractController
{
  /**
   * @Route("/dashboard", name="project_dashboard")
   */
  public function index(): Response
  {
    return $this->render('Projects/dashboard.html.twig', [
      'controller_name' => 'ProjectController',
      'page_identifier' => 'projetcs',
    ]);
  }
}
