<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validation;

class EmailController extends AbstractController
{
    #[Route('/', name: 'app_email')]
    public function index(): Response
    {
        return $this->render('email/index.html.twig');
    }

    #[Route('/send-email', name: 'app_email_send')]
    public function sendEmail(Request $request, MailerInterface $mailer): Response
    {
        try {

            $validator = Validation::createValidator();
            $data = $request->toArray();

            if ($validator->validate($data['recipients'], new Assert\All([
                new Assert\Email()]
            ))->count() > 0) {
                throw new \InvalidArgumentException("Recipients invalid");
            }

            if ($validator->validate($data['subject'], new Assert\Length(min: 5))->count() > 0) {
                throw new \InvalidArgumentException("Subject is to short, 5 characters is the minimum");
            }

            if ($validator->validate($data['body'], new Assert\Length(min: 5))->count() > 0) {
                throw new \InvalidArgumentException("Email is to short, 5 characters is the minimum");
            }

            $email = (new Email())
                ->to(...$data['recipients'])
                ->subject($data['subject'])
                ->html($data['body']);

            $mailer->send($email);
            return $this->json(['message' => 'Emailing was successful']);

        } catch (TransportExceptionInterface | \InvalidArgumentException $ex) {
            return $this->json(['message' => $ex->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
