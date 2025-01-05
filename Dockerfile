
FROM node:20

# Install system dependenies
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \ 
    libpango1.0-dev \
    libjpeg-dev \ 
    libgif-dev \ 
    librsvg2-dev \ 
    libtool \ 
    autoconf \ 
    automake \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /crew-ai-bot

COPY package*.json ./

RUN npm install 

COPY . .

CMD [ "node" , "." ]