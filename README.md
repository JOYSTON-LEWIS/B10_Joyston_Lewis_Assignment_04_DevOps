# B10_Joyston_Lewis_Assignment_04_DevOps  
**Travel Memory MERN Stack Application Deployment**

---

## 📂 Repository Structure

This repository is already **forked** from the original source (https://github.com/UnpredictablePrashant/TravelMemory) into the main branch and contains the following additional branches:

- `Frontend` — React JS Frontend code
- `Backend` — Node.js/Express Backend code
- `Deploy-Automation-Scripts` — Automation scripts for Deployment via AWS
  - `MERN-BACKEND.sh`
  - `MERN-FRONTEND.sh`

### 🚀 Objective
Guide Users to **Fork this repository** and follow step-by-step instructions to deploy the Travel Memory MERN Stack Application on AWS EC2 instances, by configuring Load Balancer, Auto Scaling Group, along with use of Cloudflare for Domain Management.

---

## 🏗️ Architecture Diagram

![Architecture](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/Architecture.jpg)

---

## 🧩 Common Configuration

### ✅ Step 1: Create a Security Group (For both Frontend & Backend)

1. Go to AWS Console > EC2 > Security Groups > Create Security Group.
2. Name it: `travel-memory-sg` (or as per your choice).
3. Add **Inbound Rules**:
   - **Type**: SSH | **Protocol**: TCP | **Port**: 22 | **Source**: My IP
   - **Type**: HTTP | **Protocol**: TCP | **Port**: 80 | **Source**: 0.0.0.0/0, ::/0
   - **Type**: HTTPS | **Protocol**: TCP | **Port**: 443 | **Source**: 0.0.0.0/0, ::/0
   - **Type**: Custom TCP | **Port**: 3000 | **Source**: 0.0.0.0/0, ::/0
   - **Type**: Custom TCP | **Port**: 3001 | **Source**: 0.0.0.0/0, ::/0

#### 📸 Output Screenshots

![SG_01](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/SG_01.png)
![SG_02](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/SG_02.png)
![SG_03](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/SG_03.png)
![SG_04](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/SG_04.png)

---

## 🛠️ Backend Configuration

### ✅ Step 1: Create Launch Template

1. Go to AWS Console > EC2 > Launch Templates > Create Launch Template.
2. **Name**: `backend-launch-template` (or as per your choice).
3. Select **Ubuntu 22.04** as the AMI.
4. Choose **Instance Type**: `t2.micro` (or as per your choice).
5. Select your **Key Pair**.
6. Select the **Security Group** created earlier.

7. **Edit `MERN-BACKEND.sh` script:**
   - Replace:
     ```bash
     echo "MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_NAME>/<COLLECTION_NAME>" >> .env
     ```
     👉 with your MongoDB Atlas connection string.

   - Replace:
     ```bash
     server_name backendsubdomainname.yourdomainname.com;
     ```
     👉 with your own backend subdomain:
     ```bash
     server_name yourownbackendsubdomainname.yourdomainname.com;
     ```

   - *(Optional)* Update success message:
     ```bash
     echo "✅ TravelMemory backend is live at yourownbackendsubdomainname.yourdomainname.com"
     ```

8. Paste the updated `MERN-BACKEND.sh` script into the **Advanced > User Data** section.
9. Click **Create Template**.

#### 📸 Output Screenshots

![LT_01](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/LT_01.png)
![LT_02](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/LT_02.png)
![LT_03](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/LT_03.png)
![LT_04](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/LT_04.png)
![LT_05](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/LT_05.png)

---

### ✅ Step 2: Create Target Group

1. Go to EC2 > Target Groups > Create Target Group.
2. **Target Type**: Instances
3. **Name**: `backend-target-group` (or as per your choice).
4. **Protocol**: HTTP | **Port**: 80
5. **VPC**: Select your VPC
6. **Protocol Version**: HTTP1

#### 📸 Output Screenshots

![TG_01](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/TG_01.png)
![TG_02](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/TG_02.png)

---

### ✅ Step 3: Create Application Load Balancer

1. Go to EC2 > Load Balancers > Create Load Balancer.
2. **Name**: `backend-load-balancer` (or as per your choice).
3. **Scheme**: Internet-facing
4. **IP address type**: IPv4
5. **Listeners**: HTTP port 80
6. **Availability Zones**: Select All (or as per your choice).
7. **Security Group**: Select the Security Group created earlier.
8. **Routing**: Select the Target Group created earlier.

#### 📸 Output Screenshots

![LB_01](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/LB_01.png)
![LB_02](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/LB_02.png)
![LB_03](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/LB_03.png)

---

### ✅ Step 4: Create Auto Scaling Group

1. Go to EC2 > Auto Scaling Groups > Create Auto Scaling Group.
2. **Name**: `backend-asg` (or as per your choice).
3. Use the **Launch Template** created earlier.
4. In the **VPC and Availability Zones** section, Select All (or as per your choice).
5. **Instance Distribution**: Best balance effort.
6. Attach the existing **Load Balancer** and select the earlier created **Target Group**.
7. **Tick the Option**: Elastic Load Balancing health checks.
8. **Health Check Grace Period**: 300 seconds.
9. **Group Size**:
   - Desired: 2
   - Min: 1
   - Max: 3
10. **Scaling policies**: No scaling policies.
11. Review and Click **Create Auto Scaling Group**.
12. Wait for instances to become Healthy.

#### 📸 Output Screenshots 

![ASG_01](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_01.png)
![ASG_02](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_02.png)
![ASG_03](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_03.png)
![ASG_04](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_04.png)
![ASG_05](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_05.png)
![ASG_06](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_06.png)
![ASG_07](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_07.png)
![ASG_08](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_08.png)
![ASG_09](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_09.png)
![ASG_10](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_10.png)
![ASG_11](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_11.png)
![ASG_12](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_12.png)
![ASG_13](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_13.png)
![ASG_14](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_14.png)
![ASG_15](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_15.png)
![ASG_16](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_16.png)
![ASG_17](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_17.png)
![ASG_18](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_18.png)
![ASG_19](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/ASG_19.png)

---

### ✅ Backend Cloudflare Configuration

1. Get the **DNS name** of your Load Balancer.
2. Go to **Cloudflare** > DNS Settings.
3. Add a new record:
   - **Type**: CNAME
   - **Name**: `backendsubdomainname` (choose your own, used in scripts)
   - **Target**: DNS name of your Load Balancer
   - **Proxy Status**: DNS only

4. Test:
   - Visit: `http://backendsubdomainname.yourdomainname.com` or `http://backendsubdomainname.yourdomainname.com/trip`
   - ✅ If you get a response, backend is successfully configured!
  
#### 📸 Output Screenshots 

![BCC_01_01](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/BCC_01_01.png)
![BCC_02](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/BCC_02.png)

---

## 🌐 Frontend Configuration

### ✅ Step 1: Create EC2 Instance

1. Go to EC2 > Instances > Launch Instance.
2. **Name**: `frontend-instance` (or as per your choice).
3. **AMI**: Ubuntu 22.04
4. **Instance Type**: t2.micro (or as per your choice).
5. **Key Pair**: Select your existing key pair.
6. **Security Group**: Select the Security Group created earlier.
7. **Edit `MERN-FRONTEND.sh` script:**
   - Replace:
     ```bash
     VITE_API_BASE_URL=http://backendsubdomainname.yourdomainname.com
     ```
     👉 with:
     ```bash
     VITE_API_BASE_URL=http://yourownbackendsubdomainname.yourdomainname.com
     ```

   - Replace:
     ```bash
     server_name frontendsubdomainname.yourdomainname.com;
     ```
     👉 with:
     ```bash
     server_name yourownfrontendsubdomainname.yourdomainname.com;
     ```

   - *(Optional)* Update success message:
     ```bash
     echo "✅ TravelMemory frontend is deployed at: yourownfrontendsubdomainname.yourdomainname.com"
     ```

8. Paste the updated `MERN-FRONTEND.sh` script into **Advanced > User Data**.
9. Click **Launch Instance**.

#### 📸 Output Screenshots 

![FEC2_01](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/FEC2_01.png)
![FEC2_02](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/FEC2_02.png)
![FEC2_03](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/FEC2_03.png)
![FEC2_04](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/FEC2_04.png)
![FEC2_05](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/FEC2_05.png)

---

### ✅ Frontend Cloudflare Configuration

1. Get the **Public IPv4 address** of your EC2 frontend instance.
2. Go to **Cloudflare** > DNS Settings.
3. Add a new record:
   - **Type**: A
   - **Name**: `frontendsubdomainname` (choose your own, used in scripts)
   - **Target**: Public IPv4 of the EC2 instance
   - **Proxy Status**: DNS only

4. Test:
   - Visit: `http://frontendsubdomainname.yourdomainname.com`
   - ✅ If frontend loads and you are able to create a trip record, your setup is successful!

#### 📸 Output Screenshots 

![FCC_01_01](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/FCC_01_01.png)
![FCC_02](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/FCC_02.png)
![FCC_03](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/FCC_03.png)
![FCC_04](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/FCC_04.png)
![FCC_05](https://github.com/JOYSTON-LEWIS/My-Media-Repository/blob/main/Assignment_04_DevOps_Outputs_Images/FCC_05.png)

---

## 🚀 Enhancement Points for this Version 1 Release

1. Deploy this project for **HTTPS** (SSL/TLS) for better Security.
2. Use **Elastic IP** for the Frontend Instance to ensure a Static IP.

---

## 🎉 Congratulations!

You have successfully deployed the **Travel Memory MERN Stack Application** with:
- Auto Scaling Backend
- Load Balancer for Backend EC2 Instances
- Standalone Frontend EC2 Instance
- Cloudflare-managed DNS

## Additional Information
POST Request URL: http://your-server-url/api/trip/

Request Body: 
```json
{
    "tripName": "Incredible India",
    "startDateOfJourney": "19-03-2022",
    "endDateOfJourney": "27-03-2022",
    "nameOfHotels":"Hotel Namaste, Backpackers Club",
    "placesVisited":"Delhi, Kolkata, Chennai, Mumbai",
    "totalCost": 800000,
    "tripType": "leisure",
    "experience": "Lorem Ipsum, Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum,Lorem Ipsum, ",
    "image": "https://t3.ftcdn.net/jpg/03/04/85/26/360_F_304852693_nSOn9KvUgafgvZ6wM0CNaULYUa7xXBkA.jpg",
    "shortDescription":"India is a wonderful country with rich culture and good people.",
    "featured": true
}
```

## 📜 License
This project is licensed under the MIT License.

## 🤝 Contributing
Feel free to fork and improve the scripts! ⭐ If you find this project useful, please consider starring the repo—it really helps and supports my work! 😊

## 📧 Contact
For any queries, reach out via GitHub Issues.

## Cheers! 🥳 Happy Deploying to You! 🚀

---
