FROM openjdk:14-alpine

COPY build/libs/server-all.jar /server.jar
COPY resources/Map.json /resources/Map.json

EXPOSE 1723

# CMD ["usr/bin/java", "-jar", "/server.jar"]
CMD ["java", "-jar", "/server.jar"]