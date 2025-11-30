# Production multi-stage build for the Chocolateria Vite React app

# --- Build stage: install dependencies and compile the app ---
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies using package-lock.json when available
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy the rest of the application source code
COPY . .

# Build the production-ready static files
RUN npm run build

# --- Runtime stage: serve the compiled app with nginx ---
FROM nginx:alpine AS runner

# Remove default nginx configuration and replace with SPA-friendly routing
RUN rm /etc/nginx/conf.d/default.conf
RUN cat <<'NGINX_CONF' > /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: disable caching for service worker updates if present
    location /service-worker.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
NGINX_CONF

# Copy built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Cloud Run
EXPOSE 80

# Default command to start nginx
CMD ["nginx", "-g", "daemon off;"]
