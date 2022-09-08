# Microservice Express Skeleton

This is a skeleton for a microservice using Express.

## Getting Started

### Prerequisites

- Node.js

### Installing

- Clone the repository
- Run `npm install`

### Running

- Run `npm run dev`

## Running in Docker

### Build the image
```cmd
docker build -t product-ms-image .
```

### Run the container
```cmd
docker run -d --name product-ms-container -p 8080:8080 product-ms-image
```

### Run container in kubernetes
```cmd
kubectl apply -f deployment.yaml
```

### Stop the container in kubernetes
```cmd
kubectl delete deployment product-ms-deployment
```

### View running kubectl
```
kubectl get all
```