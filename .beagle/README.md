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
