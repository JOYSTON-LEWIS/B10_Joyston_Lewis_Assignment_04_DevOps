#!/bin/bash

# === System Update ===
apt-get update -y

# === Install Node.js v22 ===
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
apt-get install -y nodejs

# === Install Nginx & Git ===
apt-get install -y nginx git

# === Clone Frontend Repo to /home/ubuntu ===
cd /home/ubuntu
chmod -R 775 /home/ubuntu/
git clone -b Frontend https://github.com/JOYSTON-LEWIS/B10_Joyston_Lewis_Assignment_04_DevOps
cd B10_Joyston_Lewis_Assignment_04_DevOps

# === Create .env for Vite ===
echo "VITE_API_BASE_URL=http://backendsubdomainname.yourdomainname.com" > .env

# === Install Dependencies & Build ===
npm install -y
npm run build

# === Copy Build Output to /var/www/html ===
rm -rf /var/www/html/*
cp -r dist/* /var/www/html/

# === Configure Nginx for Static Site ===
rm -f /etc/nginx/sites-enabled/default

bash -c 'cat > /etc/nginx/sites-available/travel-memory-ui << EOF
server {
    listen 80;
    server_name frontendsubdomainname.yourdomainname.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF'

ln -s /etc/nginx/sites-available/travel-memory-ui /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

echo "✅ TravelMemory frontend is deployed at: frontendsubdomainname.yourdomainname.com"
