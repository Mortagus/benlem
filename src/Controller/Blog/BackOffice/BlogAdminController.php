<?php

namespace App\Controller\Blog\BackOffice;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class BlogController
 * @package App\Controller\Blog\FrontOffice
 * @Route("/admin/blog")
 */
class BlogAdminController extends AbstractController
{
    /**
     * @Route("/dashboard", name="blog_admin_dashboard")
     * @return Response
     */
    public function index(): Response
    {
        return $this->render('Blog/BackOffice/dashboard.html.twig', [
            'controller_name' => 'BlogAdminController',
        ]);
    }
}
