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
```
docker build -t image_name .
```

### Run the container
```
docker run -d --name container_name -p 8080:8080 image_name
```