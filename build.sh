npm run build
sudo cp public/build/bundle.* /var/www/html/title-ticker/public/build/
sudo systemctl reload apache2.service 
