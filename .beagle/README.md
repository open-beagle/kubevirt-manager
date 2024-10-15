# kubevirt

<https://github.com/kubevirt-manager/kubevirt-manager>

```bash
git remote add upstream git@github.com:kubevirt-manager/kubevirt-manager.git

git fetch upstream

# 1.4.1
git merge upstream/main
```

## images

```bash
docker pull kubevirtmanager/kubevirt-manager:1.4.1 && \
docker tag kubevirtmanager/kubevirt-manager:1.4.1 registry.cn-qingdao.aliyuncs.com/wod/kubevirt-manager:1.4.1 && \
docker push registry.cn-qingdao.aliyuncs.com/wod/kubevirt-manager:1.4.1

```

## install

```bash
kubectl create -f /etc/kubernetes/addons/kubevirt-manager/kubevirt-manager.yaml

kubectl create -f /etc/kubernetes/addons/kubevirt-manager/kubevirt-manager.igr.yaml
```

## os images

```bash
mkdir -p ./tmp

# Fedora
# https://cache.wodcloud.com/vscode/kubevirt-cloud-images/Fedora-Cloud-Base-37-1.7.x86_64.raw.xz
curl -x $LOCAL_PROXY -L \
  https://mirrors.yun-idc.com/fedora/releases/37/Cloud/x86_64/images/Fedora-Cloud-Base-37-1.7.x86_64.raw.xz > \
  ./tmp/Fedora-Cloud-Base-37-1.7.x86_64.raw.xz

mc cp --recursive ./tmp/ cache/vscode/kubevirt-cloud-images

# Debian
# https://cache.wodcloud.com/vscode/kubevirt-cloud-images/debian-12-generic-amd64-20240901-1857.raw.xz
curl -x $LOCAL_PROXY -L \
  https://cloud.debian.org/images/cloud/bookworm/20240901-1857/debian-12-generic-amd64-20240901-1857.raw > \
  ./tmp/debian-12-generic-amd64-20240901-1857.raw && \
xz -z -k ./tmp/debian-12-generic-amd64-20240901-1857.raw

mc cp --recursive ./tmp/ cache/vscode/kubevirt-cloud-images
```

## debug

nodejs v20

```bash
# china mirror
# https://npmmirror.com/
# npm install -g cnpm --registry=https://registry.npmmirror.com
npm config set registry https://registry.npmmirror.com

# angular/cli
npm install -g @angular/cli@18.1.1

# install
npm install

# i18n
## install i18n libs
ng add @angular/localize --skip-confirmation

## update i18n
ng extract-i18n

# build
npm run build
```

## build

nodejs 20

```bash
docker run -it --rm \
  -v $PWD:/go/src/github.com/open-beagle/kubevirt-manager \
  -w /go/src/github.com/open-beagle/kubevirt-manager \
  registry.cn-qingdao.aliyuncs.com/wod/node:v20-alpine \
  bash .beagle/build.sh

docker pull registry.cn-qingdao.aliyuncs.com/wod/kubevirt-manager:v1.4.1 && \
docker run -it --rm \
  -v $PWD:/go/src/github.com/open-beagle/kubevirt-manager \
  -w /go/src/github.com/open-beagle/kubevirt-manager \
  --entrypoint=ash \
  registry.cn-qingdao.aliyuncs.com/wod/kubevirt-manager:v1.4.1

ls -ll /usr/share/nginx/html/assets/noVNC/
```

## cache

```bash
# 构建缓存-->推送缓存至服务器
docker run --rm \
  -e PLUGIN_REBUILD=true \
  -e PLUGIN_ENDPOINT=${S3_ENDPOINT_ALIYUN} \
  -e PLUGIN_ACCESS_KEY=${S3_ACCESS_KEY_ALIYUN} \
  -e PLUGIN_SECRET_KEY=${S3_SECRET_KEY_ALIYUN} \
  -e DRONE_REPO_OWNER="open-beagle" \
  -e DRONE_REPO_NAME="kubevirt-manager" \
  -e PLUGIN_MOUNT="./.git,./node_modules" \
  -v $(pwd):$(pwd) \
  -w $(pwd) \
  registry.cn-qingdao.aliyuncs.com/wod/devops-s3-cache:1.0

# 读取缓存-->将缓存从服务器拉取到本地
docker run --rm \
  -e PLUGIN_RESTORE=true \
  -e PLUGIN_ENDPOINT=${S3_ENDPOINT_ALIYUN} \
  -e PLUGIN_ACCESS_KEY=${S3_ACCESS_KEY_ALIYUN} \
  -e PLUGIN_SECRET_KEY=${S3_SECRET_KEY_ALIYUN} \
  -e DRONE_REPO_OWNER="open-beagle" \
  -e DRONE_REPO_NAME="kubevirt-manager" \
  -v $(pwd):$(pwd) \
  -w $(pwd) \
  registry.cn-qingdao.aliyuncs.com/wod/devops-s3-cache:1.0
```
