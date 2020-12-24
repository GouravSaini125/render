FROM ubuntu:20.04

RUN apt-get update || : && apt-get install curl -y && \
    apt-get install nodejs -y && \
    apt-get install ffmpeg -y && \
    apt-get install npm -y && \
    curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o /chrome.deb && \
    dpkg -i /chrome.deb || apt-get install -yf && \
    rm /chrome.deb && \
    apt-get clean

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY server.js /app

COPY build /app/build/

EXPOSE 8080

CMD ["node", "."]