## For development

- Apache, PHP-FPM etc in one image
- Gulp in image too
- Mounts folder as working dir
- Has basic apache settings & config


## For production

- Docker compose
  - Apache image
  - PHP-FPM image
  - This is so apache can serve static files (css, js etc) and PHP does the processing
  - PHP can then scale if needs be
- When building use local config files, once got it nailed we can make some custom images with the config built in

- https://www.sitepoint.com/docker-php-development-environment/
- https://semaphoreci.com/community/tutorials/dockerizing-a-php-application
