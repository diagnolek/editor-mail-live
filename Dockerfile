FROM php:8.2-apache
ARG on_xdebug=0

RUN apt-get update && apt-get install -y \
    curl \
    libicu-dev \
    libzip-dev \
    unzip

RUN docker-php-ext-configure intl \
    && docker-php-ext-install intl \
    && docker-php-ext-install zip

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

RUN echo "date.timezone = Europe/Warsaw" >> /usr/local/etc/php/php.ini

RUN if [ $on_xdebug -eq 1 ] ; then pecl install xdebug && docker-php-ext-enable xdebug ; fi
RUN if [ $on_xdebug -eq 1 ] ; then echo "xdebug.mode = debug" >> /usr/local/etc/php/php.ini ; fi
RUN if [ $on_xdebug -eq 1 ] ; then echo "xdebug.client_host = host.docker.internal" >> /usr/local/etc/php/php.ini ; fi
