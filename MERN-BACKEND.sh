#!/bin/bash

# === System Update ===
apt-get update -y

# === Install Node.js v22 ===
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
apt-get install -y nodejs

# === Install Nginx ===
apt-get install -y nginx git

# === Clone Backend Repo to /home/ubuntu ===
cd /home/ubuntu
chmod -R 775 /home/ubuntu/
git clone -b Backend https://github.com/JOYSTON-LEWIS/B10_Joyston_Lewis_Assignment_04_DevOps
cd B10_Joyston_Lewis_Assignment_04_DevOps

# === Create .env File ===
echo "PORT=3001" > .env
echo "MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_NAME>/<COLLECTION_NAME>" >> .env

# === Install App Dependencies & PM2 ===
npm install -y
npm install -g pm2 -y
pm2 start index.js --name "travel-memory-backend"
pm2 startup
pm2 save

# === Configure Nginx ===
rm -f /etc/nginx/sites-enabled/default

bash -c 'cat > /etc/nginx/sites-available/travel-memory << EOF
server {
    listen 80;
    server_name backendsubdomainname.yourdomainname.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF'

ln -s /etc/nginx/sites-available/travel-memory /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

echo "✅ TravelMemory backend is live at backendsubdomainname.yourdomainname.com"
