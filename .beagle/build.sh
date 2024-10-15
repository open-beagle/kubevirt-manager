#!/usr/bin/env bash

set -ex

git config --global --add safe.directory $PWD

npm config set registry https://registry.npmmirror.com

name=noVNC
version=v1.5.0
if [ ! -d "$PWD/src/assets/noVNC" ]; then
  git config --global http.proxy 'socks5://www.ali.wodcloud.com:1283'
  git clone --recurse-submodules -b ${version} https://github.com/novnc/noVNC.git $PWD/src/assets/noVNC
fi

# git apply .beagle/1.4.1-i18n-angular.patch
# git apply .beagle/1.4.1-i18n-html.patch

# npm install -g @angular/cli@18.1.1
npm install
# ng add @angular/localize --skip-confirmation
npm run build

# git apply -R .beagle/1.4.1-i18n-html.patch

sed -i 's@<base href="/zh/">@<base href="/">@' dist/kubevirtmgr-webui/browser/zh/index.html
