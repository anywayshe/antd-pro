## 使用

### 使用命令行

```bash
$ git clone https://github.com/anywayshe/antd-pro.git
$ cd antd-pro
$ npm install
$ npm start         # 访问 http://localhost:8000
```

### 使用 docker

```bash
# preview
$ docker pull antdesign/ant-design-pro
$ docker run -p 80:80 antdesign/ant-design-pro
# open http://localhost

# dev
$ npm run docker:dev

# build
$ npm run docker:build


# production dev
$ npm run docker-prod:dev

// production build
$ npm run docker-prod:build
```

更多信息请参考 [使用文档](http://pro.ant.design/docs/getting-started)。
