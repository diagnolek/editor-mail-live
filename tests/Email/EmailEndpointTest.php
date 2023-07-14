<?php
/**
 * @author Sebastian Pondo
 */

namespace App\Tests\Email;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class EmailEndpointTest extends WebTestCase
{

    private function getData(string $subject = null, string $body = null, array $recipients = null): array
    {
        return [
            'subject' => $subject ?? 'this is test',
            'body' => $body ?? 'this is <b>test</b>',
            'recipients' => $recipients ?? ['test@example.com']
        ];
    }

    private function doRequest(array $data): KernelBrowser
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/send-email', $data);
        return $client;
    }


    public function testSendEmail(): void
    {
        //given
        $data = $this->getData();
        $expected = json_encode(['message' => 'Emailing was successful']);

        //when
        $client = $this->doRequest($data);

        //then
        $this->assertResponseIsSuccessful();
        $this->assertEquals($expected, $client->getResponse()->getContent());
    }

    public function testShortSubject(): void
    {
        //given
        $data = $this->getData(subject: 'test');

        //when
        $this->doRequest($data);

        //then
        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
    }

    public function testShortBody(): void
    {
        //given
        $data = $this->getData(body: 'test');

        //when
        $this->doRequest($data);

        //then
        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
    }

    public function testShortRecipients(): void
    {
        //given
        $data = $this->getData(recipients: ['test@example.com','test']);

        //when
        $this->doRequest($data);

        //then
        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
    }

}
