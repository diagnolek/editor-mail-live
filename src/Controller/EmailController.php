<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EmailController extends AbstractController
{
    #[Route('/', name: 'app_email')]
    public function index(): Response
    {
        return $this->render('email/index.html.twig');
    }

    #[Route('/send-email', name: 'app_email_send')]
    public function sendEmail(Request $request): Response
    {
        $data = $request->toArray();
        return $this->json(['message' => $data]);
    }
}
