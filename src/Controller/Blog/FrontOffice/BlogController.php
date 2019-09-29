<?php

namespace App\Controller\Blog\FrontOffice;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class BlogController
 * @package App\Controller\Blog\FrontOffice
 * @Route("/blog")
 */
class BlogController extends AbstractController
{
    /**
     * @Route("/dashboard", name="blog_dashboard")
     */
    public function index(): Response
    {
        return $this->render('Blog/FrontOffice/dashboard.html.twig', [
            'controller_name' => 'BlogController',
        ]);
    }
}
