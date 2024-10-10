# 国际化

## 源代码修改

遇到未翻译的文本，按照如下情况进行修改：

1. 业务中， dom 直接写的文本 ， 以 src\app\components\autoscale\autoscale.component.html 为例

```html
<!-- 元素内全部是待翻译的文本， 直接给元素添加 i18n 属性 -->
<th style="width: 130px">Namespace</th>
<th style="width: 130px" i18n>Namespace</th>


<!-- 元素内部分是待翻译的文本， 给文本放入到 ng-container 标签内，同时加上 i18n 属性 -->
<h3 class="card-title">
    Scaling Groups<button></button>
</h3>
<h3 class="card-title">
    <ng-container i18n>Scaling Groups</ng-container><button></button>
</h3>

<!-- title 或其他属性需要翻译， 添加 i18n-title 属性 -->
<i class="fas fa-plus-square" (click)="showNew()" title="Create group..."></i>
<i class="fas fa-plus-square" (click)="showNew()" i18n-title title="Create group..."></i>
```

2. ts 文件中，用到的文本需要翻译， 以 src\app\components\autoscale\autoscale.component.ts 为例

```typescript
navTitle.replaceChildren("Auto Scaling");

// 内置了 $localize 方法，修改为 $localize`Auto Scaling`
navTitle.replaceChildren($localize`Auto Scaling`);
```

## 生成翻译文件

执行命令，会在当前目录生成 messages.xlf

```shell
npm run i18n 
# 对应执行的是 ng extract-i18n
```

## 翻译文本

将 messages.xlf 移动到 src\locale\messages.zh.xlf

在其中， 添加 target 节点，写入翻译后的文本， 其他不要改

```xml
      <trans-unit id="790188071422474391" datatype="html">
        <source>Scaling Groups</source>
        <!-- 添加 target 节点，写入翻译后的文本 -->
        <target>扩展组</target>
        <context-group purpose="location">
          ...
        </context-group>
        <context-group purpose="location">
          ...
        </context-group>
      </trans-unit>
```

## 运行构建

已经在 angular.json 中增加了相关配置， 运行 npm run build 即可

```js
const config = {
  "projects": {
    "kubevirtmgr-webui": {
      "i18n": {
        "locales": {
          "zh": "./src/locale/messages.zh.xlf" // 指定语言对应的文件
        },
        "sourceLocale": "en-US"
      },
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "localize": ["zh"], // 指定只构建zh语言的版本
            },
            "development": {
              "localize": ["zh"], // 指定只构建zh语言的版本
            },
          }
        }
      }
    }
  }
}
```

## 其他

经常变更时，可以通过 node ./.beagle/merge.js ./.beagle/messages.zh.bak.xlf ./src/locale/messages.zh.xlf 将之前的翻译更新到新生成的messages文件中，然后再继续翻译。