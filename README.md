## Crew AI Discord Bot Powered by OpenAI

### OS
1. Ubuntu 20 LTS

### System Dependencies
1. ffmpeg
2. node.js v20
3. npm v10
4. build-essential 
5. libcairo2-dev 
6. libpango1.0-dev 
7. libjpeg-dev  
8. libgif-dev 
9. librsvg2-dev  
10. libtool  
11. autoconf 
12. automake 


### Dependencies
1. discord.js v14
2. jimp v1.6
3. openai v4.73
4. canvas v3.0.1
5. dotenv

### Configuration
You will need to create a `.env` file in the project dir and fill in these required variables.

   
      TOKEN=
      CLIENT_ID=
      GUILD_ID=
      ORGANIZATION_ID=
      OPENAI_API_KEY=



### Running the bot locally with Docker compose
0. Prerequisite (docker and docker compose installed)
1. Run `docker-compose up --build` from project dir to build the image with necessary dependencies and run the container
  
   
