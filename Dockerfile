# Use official Nginx image from Docker Hub
FROM nginx:alpine

# Copy the local files into the container's Nginx HTML directory
COPY ./index.html /usr/share/nginx/html/
COPY ./style.css /usr/share/nginx/html/
COPY ./script.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 80



# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
