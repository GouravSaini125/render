FROM ubuntu:18.04

RUN apt-get update || : && apt-get install curl -y nocache && \
    curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o /chrome.deb && \
    dpkg -i /chrome.deb || apt-get install -yf && \
    rm /chrome.deb