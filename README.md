# Microservices

### Switch GCP Project

```
gcloud config set project <project-id>
```

```
gcloud config set project com-b2allsolution-autolive
```

### Build Container and Push to Google Artifact Registry

```
gcloud builds submit --config ./cloudbuild.yaml .
```

### Deploy Container to Cloud Run Locally

```
gcloud run deploy <SERVICE_NAME> --image <REGION>-docker.pkg.dev/<PROJECT_ID>/<REPOSITORY_NAME>/<IMAGE> --tags latest
```

```
gcloud run deploy product --image us-central1-docker.pkg.dev/com-b2allsolution-autolive/microservices/product --tag latest
gcloud run deploy account --image us-central1-docker.pkg.dev/com-b2allsolution-autolive/microservices/account --tag latest
```

### List image from Artifact Registry

```
gcloud artifacts docker images list <LOCATION>-docker.pkg.dev/<PROJECT>/<REPOSITORY> --include-tags
```

```
gcloud artifacts docker images list us-central1-docker.pkg.dev/com-b2allsolution-autolive/microservices --include-tags
```

### Install Ingress Controller (on Docker Desktop)

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.1/deploy/static/provider/cloud/deploy.yaml
```

### Port Forwarding

```
kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80
```

### Combine kubernetes manifests

```
kubectl kustomize . -o kubernetes-manifests.yaml
```

### Create kubernetes secret

```
kubectl create secret docker-registry <SECRET_NAME> --docker-server=<DOCKER_SERVER> --docker-email=<DOCKER_EMAIL> --docker-username=_json_key --docker-password='$(cat <PATH_TO_JSON>)'
```

```
kubectl create secret docker-registry <SECRET_NAME> --docker-server=<DOCKER_SERVER> --docker-email=<SERVICE_ACCOUNT_EMAIL> --docker-username=_json_key_base64 --docker-password=<BASE64_STRING>
```

```
kubectl create secret docker-registry artifact-registry --docker-server=https://us-central1-docker.pkg.dev --docker-username=_json_key_base64 --docker-email=kube-micro@com-b2allsolution-autolive.iam.gserviceaccount.com --docker-password=ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAiY29tLWIyYWxsc29sdXRpb24tYXV0b2xpdmUiLAogICJwcml2YXRlX2tleV9pZCI6ICJjOTk5MTA3ZDZlZmQ1MWU0YjczNGYzZGZmN2I0YWVmOTUyNzI4MTdlIiwKICAicHJpdmF0ZV9rZXkiOiAiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdlFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLY3dnZ1NqQWdFQUFvSUJBUUM0YTloaXlWZnMxY2YyXG50ZlFIYjMxOG5oTlMrK21rZ0FmYnpyZnJnNis5bVJGb3hMUjlDRmJPZmVESzVZNkxBTmthZkl0cmlNV1h6WGtPXG5WSGtUajJNSEV1Snp4Vk94T3J2UzFmTkl3OWR6eFNlc2d3VzhURnRXMG1HQkIwVHBYa2oyaC9ZOTlsb1hsdFppXG5HdHZGV3I2ZndPVVhqMEJLdnUwWncvR3JIMHpDeVhZZjZtb0tQL1ViNWU4UmcrV21IWFVUTnF2MTVFcGd0TU9WXG5YSlJJSzQxdFNxT1lvemhLeThja3FkNkRpNTZUbjBFUUN4MHZ6bTBwcXNsdEVLZHoxWDBNMEUwdkJYV241RG9OXG5BdUU3R2NzdHIydk03TDF1SFBZbEhhMUQ0RTdJOTIwSm9uaEN6ZTIrK1JqTkRoTWNvUVdaWnlBdWRBdCtxR0NuXG43ZmVPZnFiRkFnTUJBQUVDZ2dFQU9OVGpKZTR1TGtuakNXQWhCM21RRGlzWWdXWW9KZzFlWHBwaGl5NVZwZlBaXG5yWk9RbTBkS21PK3BxbHo3aEZLS2xPTDBnL3J1Q1UzRWxHbnJ0ZDltQVBRTTNPaGVWaXRuWGgyWWp6L3EwVDVjXG5iNGtnNTFvUWU3enhWelhLUXJCUGc4bDZWTFhxSllMU0pnRm80SFNLY2VpYnNKcndrUmd0TU5kMVRlcWpXUkw5XG5NT0ZraElNd2doMWJ1YjF5UldXb2h4QzhqWkpuVjBWRmc1WUhYZy9EcVlpem5rdlFQbElhK1V4cHl0bHNoTEN4XG5Ga3A2ZS9IUExCUkxKUCtZOTdsUnF1M1Zhd2ZKRUU2OC9QbnNBclZzZktyRHNrWUdGclpkZ3kxMDByWmV5eU55XG5ubmFmK2g4QlFCQlFGR3UyOUMrNHJZQ3Y5ZVJkOVdWbWN4Ty9xYmx4c1FLQmdRRDQyWG1aeXgyQStOUTZJZlBFXG5XeXVMZUYwSDNWQ3pMVkNkZFg5YUJacWcrSVpIcUVxMnFKWm5sMG1zbVJwQlFPb2RrbkJES0xHTDJaR0FTWmxxXG5scGN5QU5NYWxQemRSVHZtLzhMN093bHM0UnY1UThwU2JXYWJDWDBlR2FGUlFMWnZjMk9oUkJNbjB1bHlxT3V1XG5QeUNHRGNUTTZ4MkZ4ZHJPT2haR3lwNVJ6d0tCZ1FDOXVIQncyWlI0MWZvT1NUM3dydUcydlpEV0QxeWQ3RXcxXG5CVE03dXJGYUQwNDB6d3ArS0tTemJEbEVPcDFJRFRxZURZNTRaTUg3Qzg3Mis2NEYzQ1pLL2pSQndEK2JZQ3p5XG5oRU44WUsrV0dNUlNFcEdhOVdaWDhkeGpqdWJtWkhyU0R6VVM2cW4vbFZiSW5DYTJNYnlTQ1Z4SkkvTFhpTXVZXG50ZEFtMVlISEt3S0JnQXcvMkVhRHd3NElNWm95OWFiaXZmLzlpc2JLVkNDZHlHd1h6bzhGMjVpMDR4Yy81MzJhXG5TdDBLaTJ2ZGxYZEUxTUZqNWZiSVdBVUVUcTg3OER0WThsUlp5Z3B5N3dlTlV1ZUtDM1VHY081VkhtVmt1dDdYXG4xOGNsN215KzRqdjNyWU5LOE1xTmFVdjZpOWRERFdia1lKdDRyZ2xRUVlIR1BZRU5SdTl4SmQzdEFvR0FTd1h3XG5rTys1b3I4YkR5TXZkMG53d0E3ZWc0ZTNuRXVoSnlaVFNEOWZlcm1xdDM5WUt1TnZuZlFpQVRVY2xTMkdESkpYXG4wSXdubVZybUVRMGRsL3VpdU8wbFJRcjlIRGhBRGZiM3FPdWpBN3Z2aG5VSlZ6bkxxdU5kdjVEM0JneWQ5UXRHXG5kYUNPY1I5aEhodUJ3M0tQbTBCUVdpdjVEL3BzYUlzZE1QNGxQOWtDZ1lFQWc3QWRSZW1nUnMyeEQ4UjhmR3pCXG5rOXJ6RkFremwyaEJPSGx3UUo2QXI1UWh6QmZ6RUM5R3hEaERmNTFERnpFRVZlcEt4MFZrKzNUN0J2bWFwQ3VIXG5BVVp1RW5LZU9pZU1JUThhQjYxZWFkZmprVjVBQlA2Wld4ZEQ1ZkRpNFlkdFRKa2ppNmhsaDNON1RNMXd4eXltXG5VUzVSNXRVbmtrL3NEY3pzb1d0TkNLQT1cbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsCiAgImNsaWVudF9lbWFpbCI6ICJrdWJlLW1pY3JvQGNvbS1iMmFsbHNvbHV0aW9uLWF1dG9saXZlLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwKICAiY2xpZW50X2lkIjogIjEwNzM1NDU5NzAxMTEwMzYxNjYwMCIsCiAgImF1dGhfdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwKICAidG9rZW5fdXJpIjogImh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuIiwKICAiYXV0aF9wcm92aWRlcl94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS9jZXJ0cyIsCiAgImNsaWVudF94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3JvYm90L3YxL21ldGFkYXRhL3g1MDkva3ViZS1taWNybyU0MGNvbS1iMmFsbHNvbHV0aW9uLWF1dG9saXZlLmlhbS5nc2VydmljZWFjY291bnQuY29tIgp9Cg==

```

### Edit kubernetes default service account

```
kubectl edit serviceaccount default --namespace default
```

#### Add imagePullSecrets

```
imagePullSecrets:
- name: artifact-registry
```

### Deploy to Kubernetes

```
kubectl apply -f kubernetes-manifests.yaml
```

https://cloud.google.com/artifact-registry/docs/access-control#pullsecrets

kubectl create secret docker-registry artifact-registry --docker-server=https://us-central1-docker.pkg.dev --docker-username=_json_key --docker-email=kube-micro@com-b2allsolution-autolive.iam.gserviceaccount.com --docker-password $(cat kube-micro.json)

### Clean up Kubernetes

```
kubectl delete -f kubernetes-manifests.yaml
```