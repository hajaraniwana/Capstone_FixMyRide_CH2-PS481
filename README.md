# FixMyRide - Vehicle repairs are just a few taps away (Capstone_FixMyRide_CH2-PS481)

## Project Summary
We present a proactive solution—an innovative application meticulously designed to identify early issues faced by riders and provide customized recommendations for effective solutions. Leveraging machine learning recommendation technology, seamlessly integrated with a cloud computing architecture, and tailored for mobile use, the application promises a remarkably user-friendly experience. Moreover, this application encompasses features aimed at expanding users' knowledge base and streamlining the convenient location of nearby repair shops, ushering in a new era of efficiency and convenience for the motorbike repair shop business.

## Our Team Members: 
- (ML) M258BSY1875 – M. Rafly Rahman – Active
- (ML) M296BSX0587 – Wanda Gustrifa – Active
- (ML)  M225BSY0419 – Hendri Kurniawan  – Active
- (MD) A009BSY2567 – Farhan Maulana Muhammad – Active
- (CC) C319BSX4271 – Hajarani Syadzwana – Active
- (CC) C319BSY3334 – Wilbert – Active

## Steps to Replicate the Project 
clone this repository

Machine Learning :

Cloud Computing :
  Flask  :
  - Build the Flask Environment on your local computer
  - Install all the libraries required for the application based on requiremnet.txt
  - Build the docker container based on the the dockerfile provided
  - Create a cloud run service
  - Upload the docker container to cloud run, change the mapping port to 8080
  - Test the API in postman
  NodeJS :
  - Install required library using the "npm install" command
  - Create a firestore database, cloud storage bucket, and get API for nearbySearch in GCP
  - Create service account to enable access to firestore and cloud storage
  - Generate the service account credential in a .json file
  - Save the .json file with database.json
  - Generate an API key to access to nearbySearch
  - Open apiKey directory inside the src directory
  - Change the comment line in the apiKey.js 
  - Replace the databases.json file with the service account credential
  - Create a cloud run service
  - Upload the docker container to cloud run, change the mapping port to 9000
  - Test the API in postman
  

Mobile Developer :

## Here Our Link : 
- Here our figma link: 
https://www.figma.com/file/UAtnSgkM0UVz6DzwKXX4lG/Capstone-Project?type=design&node-id=0-1&mode=design 
- Here our team timeline (gantt chart): 
https://drive.google.com/file/d/1jR_vNj5oX8yNNSz9QRsQAAJSBShfWX71/view 
