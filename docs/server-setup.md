# Prepare server and launch application

Create user:
https://www.raspberrypi.org/documentation/linux/usage/users.md


Setup hostname (loacal URL):  
https://www.howtogeek.com/167190/how-and-why-to-assign-the-.local-domain-to-your-raspberry-pi/


Install NGINX:

``sudo apt-get update``
``sudo apt-get install nginx``

Configure NGINX

Open: ``sudo nano /etc/nginx/sites-enabled/default``

Change ``root /var/www/html `` to path ``root /home/madcatzx/projects/nest-ui/dist/orange-home-automator-ui;``

Restart ``sudo systemctl restart nginx``

More details: http://www.codingpedia.org/ama/how-to-configure-nginx-in-production-to-serve-angular-app-and-reverse-proxy-nodejs