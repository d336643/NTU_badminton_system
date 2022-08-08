FROM openjdk:11.0.12-slim-buster
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]