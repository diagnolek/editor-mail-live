<?php
/**
 * @author Sebastian Pondo
 */

namespace App\Model;

class Email
{

    public function __construct(
        public string $subject = '',
        public string $body = '',
        public array $recipients = []){}


    public static function build(array $values): self
    {
        return new self(
            $values['subject'] ?? '',
                $values['body'] ?? '',
                $values['recipients'] ?? []
        );
    }

}
