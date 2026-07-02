# Deploy da landing FitGram no k3s (homelab)

Site **estático** (Vite) servido por **nginx** num único container. Exposto à
internet pelo **Cloudflare Tunnel partilhado** `mattresscollective` (repo `homelab`) —
tal como o casa-stock. Não usa Ingress.

## Ficheiros
| Ficheiro | O que faz |
|---|---|
| `00-namespace.yaml` | Cria o namespace `fitgram-landing` |
| `01-app.yaml` | Deployment + Service (nginx na porta 80) |

## 1. Construir e publicar a imagem (GHCR)
A partir da raiz do projeto (onde está o `Dockerfile`):

```bash
# login no GHCR (uma vez) — precisa de um PAT com scope write:packages
echo $GHCR_PAT | docker login ghcr.io -u taniabmguedes --password-stdin

# build multi-arch NÃO é preciso; o cluster é x86_64. Build normal:
docker build -t ghcr.io/taniabmguedes/fitgram-landing:latest .
docker push  ghcr.io/taniabmguedes/fitgram-landing:latest
```

> **Nota Apple Silicon (M1/M2/M3):** o teu Mac é arm64 e os nós do cluster são
> x86_64. Constrói para a arquitetura do cluster:
> ```bash
> docker buildx build --platform linux/amd64 \
>   -t ghcr.io/taniabmguedes/fitgram-landing:latest --push .
> ```

### 1b. (Opcional) Se o package do GHCR ficar privado
Cria o pull secret e descomenta `imagePullSecrets` no `01-app.yaml`:
```bash
kubectl create secret docker-registry ghcr-pull -n fitgram-landing \
  --docker-server=ghcr.io --docker-username=taniabmguedes --docker-password=$GHCR_PAT
```
(Tornar o package **público** no GHCR evita este passo.)

## 2. Aplicar no cluster
```bash
kubectl apply -f k8s/00-namespace.yaml
kubectl apply -f k8s/01-app.yaml
```

## 3. Expor pelo tunnel partilhado (repo `homelab`)
Edita `deployments/mattresscollective/cloudflared.yml` e acrescenta uma rota
(antes do `- service: http_status:404`):

```yaml
      - hostname: fitgram.mattresscollective.pt
        service: http://fitgram-landing.fitgram-landing.svc.cluster.local:80
```

Depois aplica e reinicia o cloudflared, e cria o CNAME no Cloudflare:
```bash
kubectl apply -f deployments/mattresscollective/cloudflared.yml
kubectl -n mattresscollective rollout restart deploy/cloudflared
# No painel Cloudflare: DNS → CNAME  fitgram → <tunnel-id>.cfargotunnel.com (proxied)
# (ou:  cloudflared tunnel route dns mattresscollective fitgram.mattresscollective.pt)
```

## 4. Verificar
```bash
kubectl -n fitgram-landing get pods,svc
kubectl -n fitgram-landing logs deploy/fitgram-landing -f
# teste local sem tunnel:
kubectl -n fitgram-landing port-forward svc/fitgram-landing 8080:80
# abre http://localhost:8080
```

## 5. Atualizar (novo deploy)
```bash
docker buildx build --platform linux/amd64 \
  -t ghcr.io/taniabmguedes/fitgram-landing:latest --push .
kubectl -n fitgram-landing rollout restart deploy/fitgram-landing
```
> Para deploys reproduzíveis, fixa a imagem por **digest** no `01-app.yaml`
> (`image: ghcr.io/taniabmguedes/fitgram-landing@sha256:...`), como no casa-stock.
