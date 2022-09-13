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

### Combine kubernetes manifests

```
kubectl kustomize . -o kubernetes-manifests.yaml
```

### Deploy to Kubernetes

```
kubectl apply -f kubernetes-manifests.yaml
```
