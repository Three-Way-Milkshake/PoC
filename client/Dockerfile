FROM node:14

COPY . /client
COPY client_launcher.sh /scr.sh
RUN apt update
RUN apt install -y netcat
RUN cd client ; npm i
RUN npm i -g @angular/cli

# CMD ["./scr.sh", "n", "1"]
CMD ["./scr.sh", "all", "2"]
