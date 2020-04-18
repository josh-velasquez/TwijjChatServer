# Twijj Chat Server

Chat server for the Twijj web application.

## Authors:

Emilio Alvarez Veronesi, Jeffery Huo, Jeffery Swarts, Joshua Velasquez, Yue Zhang

## Website Link:

[https://twijj-271803.web.app/](https://twijj-271803.web.app/)

## Associated Github Repositories

- Client Side -> [https://github.com/josh-velasquez/Twijj](https://github.com/josh-velasquez/Twijj)
- Chat Server Side -> [https://github.com/josh-velasquez/TwijjChatServer](https://github.com/josh-velasquez/TwijjChatServer)
- Stream Server Side -> [https://github.com/josh-velasquez/TwijjStreamServer](https://github.com/josh-velasquez/TwijjStreamServer)

## Tools and Applications Used

- Database -> Firebase
- Server -> AWS (Chat and Stream)
- Hosting -> Google platform/Firebase

## Web Browser Setup

### Allowing Insecure Content

Once the webapp is launched, navigate to your browser settings and then to site settings and allow for insecure content.
Since the stream and chat from the AWS servers is sent over http without encryption, this is needed for the stream requests and chat requests to the AWS server to work.
Alternatively, you can click on the lock icon on the address bar and navigate to the site settings there.

### Enabling Third-Party Cookies

Since Google Sign-In requires third-party cookies in order to function correctly, ensure that your browser is not blocking third-party cookies. To do this in Chrome, go to Settings > Privacy and Security > Cookies and Site Data > Block third-party cookies. This option should be disabled. Having it enabled may result in the Google Sign-In button not rendering at all.

## Deployment Instructions

### Cloning Github Repositories

#### Cloning Twijj

`git clone https://github.com/josh-velasquez/Twijj` <br>
Navigate to the client folder<br>
`npm install`<br>
To run the application<br>
`npm start`<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Cloning Twijj Chat Server

`git clone https://github.com/josh-velasquez/TwijjChatServer`<br>
Navigate to folder<br>
`npm install`<br>
To run the application<br>
`npm start`<br>

#### Cloning Twijj Stream Server

`git clone https://github.com/josh-velasquez/TwijjStreamServer`<br>
Navigate to rtmpserver folder<br>
`npm install`<br>
To run the application<br>
`npm start`<br>

<br>
<br>

# Live Deployment

## Deploying a Build To Firebase

To deploy the client code to firebase, run the following command on the client folder:<br>
`npm run build`

This will generate a build folder. Run the following command to deploy to website:<br>
`firebase deploy`

## Setting Up AWS Servers

There are two servers that are responsible for processing the stream and chat of the webapp. Both are running on AWS.

### Starting Servers

Start the instance state for both Twijj Chat and Twijj Stream Servers. Once running copy the IPv4 Public IP's for each server.
SSH into each respective servers using the command<br>
`ssh -i ~/.ssh/<.pem file> ec2-user@<ip address>`<br>
Once you are logged in, navigate to the project folder and run the following command to run the server.<br>
`npm start`<br>
NOTE: You must do this twice on separate terminals. One for the chat and one for the stream server.

Once this is set up, navigate to the Twijj database in firebase console and open the `serverip` collection.
Paste the IP for each servers accordingly (i.e. Twijj Chat IP -> chatip and Twijj Stream IP -> ip)

## Setting up OBS

Open OBS and navigate to settings -> stream
Navigate to the webapp home page, once your stream is created, click on select settings and copy the Stream URL and Stream Key
Select the Service to Custom and paste the stream URL to the Server and the Stream Key to the Stream Key
Click Apply and then OK to save changes.

## Checking Stream Server Status

You can checkout the status of the stream server by going to
[http://localhost:8000/admin/](http://localhost:8000/admin/)
