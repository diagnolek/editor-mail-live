Editor Mail Live
=================

Prototypu prostego edytora za pomocą, którego można testować wysyłanie email-a

Opis
-------

Edytor posiada możliwość prostej edycji tekstu (pogrubienie, kursywa, podkreślenie), oraz ma możliwość wpisania wielu adresów email.
Aby wysłać email do wielu adresów należy wpisać do pola `To:` adresy email rozdzielając je przecinkiem.
Edytor posiada walidatory takie jak:

- To: poprawne adresy email
- Subject: minimalna ilość znaków to 5
- Text: minimalna ilość znaków to 5

Uruchamianie środowiska
---------------

- docker-compose up -d
- docker exec -ti appmail-web bash -c "composer install"
- docker exec -ti appmail-web bash -c "chown -R www-data:www-data /var/www/html/var"
- docker exec -ti appmail-web bash -c "cd /var/www/html/web && npm install"
- docker exec -ti appmail-web bash -c "cd /var/www/html/web && npm run prod"

`Edytor będzie dostępny pod adresem http://localhost:8000/`

`Aplikacja do podglądu wysłanych maili http://localhost:1080/`

Uruchamianie testów
---------------

- docker exec -ti appmail-web bash -c "cd /var/www/html && cp phpunit.xml.dist phpunit.xml && php bin/phpunit --testsuite=project_test"
- docker exec -ti appmail-web bash -c "cd /var/www/html/web && npm run test"


Wymagania
----------

* Git
* Docker
