# Microservices

### Switch GCP Project

```
gcloud config set project <project-id>
```
```
gcloud config set project com-b2allsolution
```

### Deploy to Arifact Registry

```
gcloud builds submit --config ./cloudbuild.yaml .
```

### List image from Artifact Registry

```
gcloud artifacts docker images list <LOCATION>-docker.pkg.dev/<PROJECT>/<REPOSITORY> --include-tags
```
```
gcloud artifacts docker images list us-central1-docker.pkg.dev/com-b2allsolution-autolive/microservices --include-tags
```

### Combine kubernetes manifests
```
kubectl kustomize . -o kubernetes-manifests.yaml
```

### Deploy to Kubernetes
```
kubectl apply -f kubernetes-manifests.yaml
```