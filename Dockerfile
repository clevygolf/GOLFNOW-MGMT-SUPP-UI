FROM coreos/apache
COPY src /var/www

CMD ["/usr/sbin/apache2ctl","-D","FOREGROUND"]
