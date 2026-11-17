# Oxford Mathematics for the New Century (M1A) 学习网站

配套香港牛津出版社（Oxford University Press）高中教材 **Senior Secondary Oxford Mathematics for the New Century — Module 1: Calculus and Statistics, Book M1A（2023 版）** 制作的交互式双语学习平台。

## 核心特点

- **全书 7 章 26 讲全覆盖**：Ch. 1 Binomial Expansion 至 Ch. 7 Definite Integration & Trapezoidal Rule，并在架构层预留 **M1B 统计学篇**扩展接口。
- **严格对齐课本公式与 HKDSE M1 考纲**：采用 $C_r^n$、$\Delta x$、梯形法则 $h = \frac{b-a}{n}$ 等教材原版记号，严格隔离 M2 专属内容（不混入三角微积分、分部积分法或旋转体体积）。
- **双语精讲 + 三阶闯关**：通俗生活直觉案例 + 英文核心术语标注 + 英文标准例题与中文旁批 + 直觉/模仿/DSE 实战三阶递进提问。
- **4 大交互式微积分可视化实验室**：复利极限 $\to e$ 与 $e^x/\ln x$ 对称、$\Delta x \to 0$ 割线变切线、$f / f' / f''$ 三图联动凹凸扫描、教材封面同款梯形法则误差放大镜。
- **零外部依赖静态架构**：内置 KaTeX 数学排版资源，可直接部署到 GitHub Pages / Cloudflare Pages / Vercel 线上访问。

## 本地预览

在当前目录下运行任意静态 HTTP 服务器即可预览：

```bash
python3 -m http.server 8080
```

然后打开浏览器访问 `http://localhost:8080`。

## 部署至 GitHub Pages（线上链接给孩子在 iPad / Mac 上使用）

1. 将本目录（含 `index.html`、`css/`、`js/`、`vendor/`、`.nojekyll`）推送至 GitHub 仓库的 `main` 分支。
2. 在 GitHub 仓库 `Settings` → `Pages` 中选择 `Deploy from a branch` → `main` / `/ (root)` 保存即可生成线上 HTTPS 链接。
