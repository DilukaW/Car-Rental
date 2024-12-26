# Use OpenJDK as the base image
FROM openjdk:19-jdk-slim

# Set working directory
WORKDIR /app

# Copy the built JAR file
COPY target/*.jar app.jar

# Expose port 8080
EXPOSE 8081

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
