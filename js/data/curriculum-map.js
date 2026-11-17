/* ==========================================================================
   Oxford Mathematics for the New Century (M1A)
   Curriculum Map, Concept Relationship Graph, Formula Sheet & Glossary
   ========================================================================== */

window.M1A_DATA = window.M1A_DATA || {
  chapters: [],
  units: {},
  graphNodes: [],
  graphEdges: [],
  glossary: [],
  formulaSheet: [],
  m1bPreview: {}
};

(function () {
  const R = String.raw;

  window.M1A_DATA.chapters = [
    {
      id: "ch1",
      num: "Ch. 1",
      titleZh: "二项展式",
      titleEn: "Binomial Expansion",
      color: "var(--ch1-color)",
      softBg: "var(--ch1-soft)",
      summary: "从组合数 $C_r^n$ 与帕斯卡三角形出发，掌握正整数指数的二项式定理与通项公式，学会快速抓取指定项系数。",
      unitIds: ["1.1", "1.2", "1.3"]
    },
    {
      id: "ch2",
      num: "Ch. 2",
      titleZh: "指数函数与对数函数",
      titleEn: "Exponential Functions and Logarithmic Functions",
      color: "var(--ch2-color)",
      softBg: "var(--ch2-soft)",
      summary: "理解自然常数 $e$ 与指数级数，掌握 $e^x$ 与 $\\ln x$ 的对称图像、对数运算法则、连续增长衰减模型及非线性数据化直法。",
      unitIds: ["2.1", "2.2", "2.3", "2.4"]
    },
    {
      id: "ch3",
      num: "Ch. 3",
      titleZh: "函数的导数",
      titleEn: "Derivatives of Functions",
      color: "var(--ch3-color)",
      softBg: "var(--ch3-soft)",
      summary: "建立极限（Limits）与瞬时变化率直觉，看懂 $\\Delta x \\to 0$ 如何从割线斜率变成切线斜率，掌握幂法则等基础求导规则。",
      unitIds: ["3.1", "3.2", "3.3"]
    },
    {
      id: "ch4",
      num: "Ch. 4",
      titleZh: "微分法",
      titleEn: "Differentiation",
      color: "var(--ch4-color)",
      softBg: "var(--ch4-soft)",
      summary: "武装微积分核心计算工具箱：积法则、商法则、链式法则（剥洋葱模型），指数对数求导与二阶导数。",
      unitIds: ["4.1", "4.2", "4.3", "4.4"]
    },
    {
      id: "ch5",
      num: "Ch. 5",
      titleZh: "微分法的应用",
      titleEn: "Applications of Differentiation",
      color: "var(--ch5-color)",
      softBg: "var(--ch5-soft)",
      summary: "用一阶导与二阶导解读曲线密码：切线法线、增减性、驻点与凹凸拐点、实际最值优化与关联变化率。",
      unitIds: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6"]
    },
    {
      id: "ch6",
      num: "Ch. 6",
      titleZh: "不定积分及其应用",
      titleEn: "Indefinite Integration and Its Applications",
      color: "var(--ch6-color)",
      softBg: "var(--ch6-soft)",
      summary: "把微分“倒带播放”：理解反导数与积分常数 $+C$ 的物理几何含义，精通代换积分法并由变化率还原原函数。",
      unitIds: ["6.1", "6.2", "6.3"]
    },
    {
      id: "ch7",
      num: "Ch. 7",
      titleZh: "定积分及其应用",
      titleEn: "Definite Integration and Its Applications",
      color: "var(--ch7-color)",
      softBg: "var(--ch7-soft)",
      summary: "完成 M1A 终极闭环：用微积分基本定理算定积分与曲边图形面积，并用梯形法则估算积分、联动 $f''(x)$ 判定高估与低估。",
      unitIds: ["7.1", "7.2", "7.3"]
    }
  ];

  // 交互式知识关系图谱节点 (SVG viewBox: 0 0 980 620)
  window.M1A_DATA.graphNodes = [
    {
      id: "ch1",
      x: 50,
      y: 44,
      w: 245,
      h: 96,
      badge: "Ch. 1 · 基础代数",
      titleZh: "二项展式",
      titleEn: "Binomial Expansion",
      color: "#9a3412",
      bg: "#fff7ed",
      role: "全书代数底座：提供组合计数 $C_r^n$ 与多项式展开技术。",
      keyFormula: R`$(a+b)^n = \sum_{r=0}^n C_r^n a^{n-r}b^r$`,
      firstUnit: "1.1"
    },
    {
      id: "ch2",
      x: 370,
      y: 44,
      w: 265,
      h: 96,
      badge: "Ch. 2 · 基础函数",
      titleZh: "指数与对数函数",
      titleEn: "Exp & Log Functions",
      color: "#0f766e",
      bg: "#f0fdfa",
      role: "从二项展式极限引出 $e$ 与 $e^x$ 级数，建立自然对数与拟合模型。",
      keyFormula: R`$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$`,
      firstUnit: "2.1"
    },
    {
      id: "ch3",
      x: 705,
      y: 44,
      w: 230,
      h: 96,
      badge: "Ch. 3 · 微积分起点",
      titleZh: "极限与导数",
      titleEn: "Derivatives of Functions",
      color: "#1d4ed8",
      bg: "#eff6ff",
      role: "用 $\\Delta x \\to 0$ 捕捉瞬时变化率，从割线过渡到切线与幂法则。",
      keyFormula: R`$f'(x) = \lim_{\Delta x \to 0}\frac{f(x+\Delta x)-f(x)}{\Delta x}$`,
      firstUnit: "3.1"
    },
    {
      id: "ch4",
      x: 685,
      y: 226,
      w: 250,
      h: 98,
      badge: "Ch. 4 · 求导工具箱",
      titleZh: "微分法",
      titleEn: "Differentiation",
      color: "#4338ca",
      bg: "#eef2ff",
      role: "整合积、商、链式三大法则，并把 $e^x, \\ln x$ 纳入求导版图，引出二阶导。",
      keyFormula: R`$\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$`,
      firstUnit: "4.1"
    },
    {
      id: "ch5",
      x: 365,
      y: 226,
      w: 265,
      h: 98,
      badge: "Ch. 5 · 几何与建模",
      titleZh: "微分法的应用",
      titleEn: "Applications of Differentiation",
      color: "#7e22ce",
      bg: "#faf5ff",
      role: "用 $f'(x)$ 看增减/极值/切法线，用 $f''(x)$ 判凹凸性，解决最值与变化率。",
      keyFormula: R`$f'(a)=0,\; f''(a)<0 \Rightarrow \text{Local Max}$`,
      firstUnit: "5.1"
    },
    {
      id: "ch6",
      x: 50,
      y: 226,
      w: 245,
      h: 98,
      badge: "Ch. 6 · 逆向还原",
      titleZh: "不定积分",
      titleEn: "Indefinite Integration",
      color: "#0369a1",
      bg: "#f0f9ff",
      role: "微分的逆过程：已知变化率求原函数，记住 $+C$ 与代换法 $u$-sub。",
      keyFormula: R`$\int f'(x)\,dx = f(x) + C$`,
      firstUnit: "6.1"
    },
    {
      id: "ch7",
      x: 365,
      y: 400,
      w: 270,
      h: 102,
      badge: "Ch. 7 · 累积与估算",
      titleZh: "定积分与梯形法则",
      titleEn: "Definite Integration & Trapezoidal",
      color: "#b45309",
      bg: "#fffbeb",
      role: "算面积、算累积量，并在无法解析积分时用梯形法则＋$f''(x)$ 判误差方向。",
      keyFormula: R`$\int_a^b f(x)\,dx \approx \frac{h}{2}[y_0+y_n+2(y_1+\cdots+y_{n-1})]$`,
      firstUnit: "7.1"
    },
    {
      id: "m1b_binom",
      x: 50,
      y: 525,
      w: 245,
      h: 68,
      badge: "下册 M1B 预留接口",
      titleZh: "二项分布与概率",
      titleEn: "Binomial Distribution",
      color: "#475569",
      bg: "#f1f5f9",
      role: "直接复用 Ch.1 的 $C_r^n p^r(1-p)^{n-r}$ 与二项展开思想。",
      keyFormula: R`$P(X=r) = C_r^n p^r(1-p)^{n-r}$`,
      firstUnit: null
    },
    {
      id: "m1b_norm",
      x: 700,
      y: 525,
      w: 235,
      h: 68,
      badge: "下册 M1B 预留接口",
      titleZh: "泊松与正态分布",
      titleEn: "Poisson & Normal Dist.",
      color: "#475569",
      bg: "#f1f5f9",
      role: "直接复用 Ch.2 的 $e^{-\\lambda}$ 与 Ch.7 曲线下面积＝概率思想。",
      keyFormula: R`$P(a<X<b)=\int_a^b f(x)\,dx$`,
      firstUnit: null
    }
  ];

  window.M1A_DATA.graphEdges = [
    {
      from: "ch1",
      to: "ch2",
      label: "n→∞ 导出 e；组合展式乘 e^(kx)",
      desc: "Ch.1 的二项展式不仅帮我们理解 $(1+\\frac{1}{n})^n$ 为何收敛到 $e$，在 DSE 考题中还常与 Ch.2 的 $e^{kx}$ 级数相乘求 $x^2$ 系数。"
    },
    {
      from: "ch2",
      to: "ch3",
      label: "非线性变化需要新工具",
      desc: "指数曲线越来越陡、对数曲线越来越平，斜率不再固定，迫使 Ch.3 引入极限与导数。"
    },
    {
      from: "ch3",
      to: "ch4",
      label: "从极限概念升级为求导公式",
      desc: "用基本原理算导数太慢，Ch.4 把复杂函数拆成乘、除、复合，配合 Ch.2 的 $e^x, \\ln x$ 建立高速计算规则。"
    },
    {
      from: "ch2",
      to: "ch4",
      label: "提供 e^x 与 ln x 核心函数族",
      desc: "M1 不考三角函数微积分，Ch.4 的核心战场就是把多项式与 $e^x, \\ln x$ 混合求导。"
    },
    {
      from: "ch4",
      to: "ch5",
      label: "f'(x) 看斜率，f''(x) 看弯曲",
      desc: "会算导数后，Ch.5 让数学符号开口说话：切线法线、增减区间、极大极小值与凹凸拐点。"
    },
    {
      from: "ch4",
      to: "ch6",
      label: "逆向过程 (Reverse Process)",
      desc: "微分是“已知路程求速度”，Ch.6 的不定积分则是“已知速度反推路程”，必须熟练链式法则才能看懂代换积分。"
    },
    {
      from: "ch6",
      to: "ch7",
      label: "加回上下限算精准累积与面积",
      desc: "通过微积分基本定理，$\\int_a^b f(x)\\,dx = F(b)-F(a)$ 把不定积分变成面积与总量计算利器。"
    },
    {
      from: "ch5",
      to: "ch7",
      label: "f''(x) 凹凸性 ➔ 梯形法则高估/低估",
      desc: "全书最精妙的跨章闭环！Ch.5 学到的 $f''(x) > 0$（凹向上）直接决定 Ch.7 梯形直边落在曲线上方（over-estimate）。"
    },
    {
      from: "ch1",
      to: "m1b_binom",
      label: "衔接 M1B 离散概率",
      dashed: true,
      desc: "M1A 第 1 章的 $C_r^n$ 与 $(p+q)^n$ 展开，到了下册 M1B 就是二项分布概率分布公式。"
    },
    {
      from: "ch7",
      to: "m1b_norm",
      label: "衔接 M1B 连续分布面积",
      dashed: true,
      desc: "M1A 第 7 章确立了“曲线下面积”概念，为下册 M1B 理解正态分布钟形曲线面积即概率打下直觉基础。"
    }
  ];

  // M1B 未来扩展架构接口
  window.M1A_DATA.m1bPreview = {
    title: "Book M1B 统计学扩展预留架构 (Statistics Module — Ready to Plug In)",
    description: "本网站已在路由与数据层预留 M1B 接口。学完 M1A 后，只需新增 <code>js/data/ch8_ch13_m1b.js</code> 并向 <code>window.M1A_DATA</code> 注册章节，即可无缝升级为完整的 HKDSE Module 1 全套学习平台。",
    plannedChapters: [
      { code: "M1B Ch. 8", en: "Conditional Probability & Bayes' Theorem", zh: "条件概率与贝叶斯定理", linkFrom: "前置连接：集合直觉与分步推理" },
      { code: "M1B Ch. 9", en: "Discrete Random Variables", zh: "离散随机变量、期望值与方差", linkFrom: "前置连接：求和符号与代数运算" },
      { code: "M1B Ch. 10", en: "Binomial, Geometric & Poisson Distributions", zh: "二项分布、几何分布与泊松分布", linkFrom: "前置连接：M1A Ch.1 (C_r^n) & Ch.2 (e^x)" },
      { code: "M1B Ch. 11", en: "Normal Distribution", zh: "正态分布与标准化 z-score", linkFrom: "前置连接：M1A Ch.7 曲线下面积概念" },
      { code: "M1B Ch. 12–13", en: "Sampling Distribution, Point & Interval Estimation", zh: "抽样分布、点估计与置信区间", linkFrom: "前置连接：正态分布与代数不等式" }
    ]
  };

  // 课本标准公式速查表 (严格遵循 HKDSE M1 与牛津 M1A 规范)
  window.M1A_DATA.formulaSheet = [
    {
      chapterId: "ch1",
      chapterName: "Ch. 1 Binomial Expansion（二项展式）",
      items: [
        {
          name: "阶乘与组合数 (Factorial & Combination)",
          formula: R`$$n! = n(n-1)(n-2)\cdots 2 \cdot 1, \quad 0! = 1, \quad C_r^n = \frac{n!}{r!(n-r)!}$$`,
          note: "牛津课本主力写法为 $C_r^n$（考评局亦接受 $\\binom{n}{r}$）。注意 $C_0^n = C_n^n = 1$，$C_r^n = C_{n-r}^n$。"
        },
        {
          name: "正整数指数二项式定理 (Binomial Theorem, n ∈ ℤ⁺)",
          formula: R`$$(a+b)^n = \sum_{r=0}^n C_r^n a^{n-r} b^r = a^n + C_1^n a^{n-1}b + C_2^n a^{n-2}b^2 + \cdots + b^n$$`,
          note: "特别地：$(1+x)^n = 1 + C_1^n x + C_2^n x^2 + \cdots + x^n$。M1 考纲仅考正整数指数，不考分数或负指数！"
        },
        {
          name: "通项公式 (General Term)",
          formula: R`$$T_{r+1} = C_r^n a^{n-r} b^r \quad (r = 0, 1, 2, \dots, n)$$`,
          note: "求某一项系数或常数项时，务必在幂次部分写出通项 $T_{r+1}$，令 $x$ 的指数等于目标次幂（常数项则令指数 $= 0$）。"
        }
      ]
    },
    {
      chapterId: "ch2",
      chapterName: "Ch. 2 Exponential & Logarithmic Functions（指数与对数函数）",
      items: [
        {
          name: "自然常数 e 与指数级数 (Number e & Exponential Series)",
          formula: R`$$e = \lim_{n \to \infty}\left(1 + \frac{1}{n}\right)^n \approx 2.71828, \qquad e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$`,
          note: "替换 $x$ 为 $kx$ 可直接展开 $e^{kx}$；注意 M1 不考 $\\ln(1+x)$ 级数。"
        },
        {
          name: "自然对数与对数法则 (Natural Logarithm & Laws of Logarithms)",
          formula: R`$$\ln(MN) = \ln M + \ln N, \quad \ln\left(\frac{M}{N}\right) = \ln M - \ln N, \quad \ln(M^k) = k\ln M, \quad \log_a x = \frac{\ln x}{\ln a}$$`,
          note: "定义域硬约束：真数必须严格大于零（$x > 0$）；$\\ln e = 1$，$\\ln 1 = 0$，$e^{\\ln x} = x$。"
        },
        {
          name: "非线性关系线性化 (Linearization)",
          formula: R`$$y = ab^x \iff \ln y = (\ln b)x + \ln a; \qquad y = ax^k \iff \ln y = k\ln x + \ln a$$`,
          note: "先对齐纵轴与横轴坐标标签（看清楚题目用 $\\ln$ 还是 $\\log_{10}$！），再把直线斜率与 $y$ 截距对号入座。"
        }
      ]
    },
    {
      chapterId: "ch3",
      chapterName: "Ch. 3 Derivatives of Functions（函数的导数）",
      items: [
        {
          name: "导数定义（基本原理概念）(First Principles Concept)",
          formula: R`$$f'(x) = \frac{dy}{dx} = \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x}$$`,
          note: "HKDSE M1 要求认识并理解该定义代表切线斜率，但考卷不要求用基本原理硬推导数。"
        },
        {
          name: "基础求导公式 (Basic Differentiation Rules)",
          formula: R`$$\frac{d}{dx}(c) = 0, \quad \frac{d}{dx}(x^n) = nx^{n-1}, \quad \frac{d}{dx}[cf(x)] = c f'(x), \quad \frac{d}{dx}[f(x) \pm g(x)] = f'(x) \pm g'(x)$$`,
          note: "遇到根式或分母里的 $x$（如 $\\frac{3}{\\sqrt{x}}$），先改写成 $3x^{-1/2}$ 再套用幂法则！"
        }
      ]
    },
    {
      chapterId: "ch4",
      chapterName: "Ch. 4 Differentiation（微分法）",
      items: [
        {
          name: "积法则与商法则 (Product Rule & Quotient Rule)",
          formula: R`$$\frac{d}{dx}(uv) = u\frac{dv}{dx} + v\frac{du}{dx}, \qquad \frac{d}{dx}\left(\frac{u}{v}\right) = \frac{v\frac{du}{dx} - u\frac{dv}{dx}}{v^2}$$`,
          note: "商法则分子顺序不可颠倒：底函数 $v$ 乘顶导数，减去顶函数 $u$ 乘底导数！"
        },
        {
          name: "链式法则 (Chain Rule)",
          formula: R`$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}, \qquad \frac{d}{dx}[f(x)]^n = n[f(x)]^{n-1}f'(x)$$`,
          note: "从最外层括号剥到最内层，每一层求导结果用乘号连起来。"
        },
        {
          name: "指数与对数函数求导 (Derivatives of Exp & Log Functions)",
          formula: R`$$\frac{d}{dx}(e^u) = e^u\frac{du}{dx}, \quad \frac{d}{dx}(a^x) = a^x \ln a, \quad \frac{d}{dx}(\ln u) = \frac{1}{u}\frac{du}{dx}, \quad \frac{d}{dx}(\log_a x) = \frac{1}{x\ln a}$$`,
          note: "神技：对 $\\ln\\left(\\frac{A}{B}\\right)$ 求导前，先用对数法则拆成 $\\ln A - \\ln B$，瞬间避免复杂商法则！"
        },
        {
          name: "二阶导数 (Second Derivative)",
          formula: R`$$f''(x) = \frac{d^2y}{dx^2} = \frac{d}{dx}\left(\frac{dy}{dx}\right)$$`,
          note: "切记 $\\frac{d^2y}{dx^2}$ 是对 $\\frac{dy}{dx}$ 再求一次导，绝对不等于 $\\left(\\frac{dy}{dx}\\right)^2$。"
        }
      ]
    },
    {
      chapterId: "ch5",
      chapterName: "Ch. 5 Applications of Differentiation（微分法的应用）",
      items: [
        {
          name: "切线与法线方程 (Tangent & Normal at (x₀, y₀))",
          formula: R`$$m_T = \left.\frac{dy}{dx}\right|_{x=x_0}, \quad y - y_0 = m_T(x - x_0); \qquad m_N = -\frac{1}{m_T} \;\; (m_T \neq 0)$$`,
          note: "若 $m_T = 0$，切线为水平线 $y = y_0$，法线为竖直线 $x = x_0$。"
        },
        {
          name: "一阶与二阶导数极值判别 (Extrema & Concavity Tests)",
          formula: R`$$f'(a)=0 \text{ 且 } \begin{cases} f''(a) < 0 \Rightarrow \text{Local maximum} \\ f''(a) > 0 \Rightarrow \text{Local minimum} \\ f''(a) = 0 \Rightarrow \text{退回一阶导数符号表判别} \end{cases}$$`,
          note: "若题干出现闭区间 $[p, q]$ 求 Global maximum/minimum，必须同时比较驻点与区间端点 $f(p), f(q)$ 的函数值！"
        },
        {
          name: "关联变化率 (Related Rates of Change)",
          formula: R`$$\frac{dV}{dt} = \frac{dV}{dh}\cdot\frac{dh}{dt}$$`,
          note: "先写几何变量关系式（全用同一变量表示），再对时间 $t$ 求导；代入瞬时数值一定要在求导之后！"
        }
      ]
    },
    {
      chapterId: "ch6",
      chapterName: "Ch. 6 Indefinite Integration（不定积分）",
      items: [
        {
          name: "基本不定积分公式 (Basic Indefinite Integrals)",
          formula: R`$$\int x^n\,dx = \frac{x^{n+1}}{n+1} + C \;\; (n \neq -1), \quad \int \frac{1}{x}\,dx = \ln|x| + C, \quad \int e^{kx}\,dx = \frac{1}{k}e^{kx} + C$$`,
          note: "任何不定积分答案末尾必须保留 $+ C$，并在首次出现时写明 <code>where C is a constant</code>。"
        },
        {
          name: "广义幂/指数/对数与代换法 (Substitution Method)",
          formula: R`$$\int (ax+b)^n\,dx = \frac{(ax+b)^{n+1}}{a(n+1)} + C \;\; (n \neq -1), \qquad \int \frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + C$$`,
          note: "积分没有积法则或商法则！乘积或分式需先展开/拆项，或设 $u = g(x)$ 用代换法消去 $dx$。"
        }
      ]
    },
    {
      chapterId: "ch7",
      chapterName: "Ch. 7 Definite Integration & Trapezoidal Rule（定积分与梯形法则）",
      items: [
        {
          name: "微积分基本定理与面积 (Definite Integral & Area)",
          formula: R`$$\int_a^b f(x)\,dx = \Bigl[F(x)\Bigr]_a^b = F(b) - F(a), \qquad \text{Area between curves} = \int_a^b \bigl[f_{\text{upper}}(x) - g_{\text{lower}}(x)\bigr]\,dx$$`,
          note: "计算图形面积时，落在 $x$ 轴下方的区间定积分为负，必须分段取绝对值（或加上负号）后再相加。"
        },
        {
          name: "梯形法则 (Trapezoidal Rule with n sub-intervals)",
          formula: R`$$\int_a^b f(x)\,dx \approx \frac{h}{2}\bigl[y_0 + y_n + 2(y_1 + y_2 + \cdots + y_{n-1})\bigr], \quad \text{where } h = \frac{b - a}{n}$$`,
          note: "⚠️ 区分 <code>n sub-intervals</code>（n 个梯形条）与 <code>n+1 ordinates</code>（n+1 个纵坐标点）！首尾点乘 1，中间点全部乘 2。"
        },
        {
          name: "梯形法则高估/低估判定 (Over-estimate vs Under-estimate)",
          formula: R`$$f''(x) > 0 \text{ on } [a,b] \Rightarrow \text{concave upwards} \Rightarrow \text{Over-estimate}; \qquad f''(x) < 0 \Rightarrow \text{concave downwards} \Rightarrow \text{Under-estimate}$$`,
          note: "标准英文理由必带关键词：<code>Since f''(x) > 0 for a ≤ x ≤ b, the curve is concave upwards. Therefore, the trapezoidal rule gives an over-estimate.</code>"
        }
      ]
    }
  ];

  // 双语术语词典
  window.M1A_DATA.glossary = [
    { en: "Binomial Expansion", zh: "二项展式", ch: "Ch. 1", desc: "将 $(a+b)^n$ 展开成多项式之和的代数展开形式。" },
    { en: "Positive Integral Index", zh: "正整数指数", ch: "Ch. 1", desc: "指数 $n$ 为 $1, 2, 3, \\dots$ 的正整数；HKDSE M1 仅考正整数指数。" },
    { en: "Factorial", zh: "阶乘", ch: "Ch. 1", desc: "记作 $n!$，表示从 $1$ 连乘到 $n$，特别规定 $0! = 1$。" },
    { en: "Combination", zh: "组合", ch: "Ch. 1", desc: "从 $n$ 个不同元素中不计顺序选出 $r$ 个，牛津课本记作 $C_r^n$。" },
    { en: "General Term", zh: "通项", ch: "Ch. 1", desc: "展开式中第 $r+1$ 项，公式为 $T_{r+1} = C_r^n a^{n-r} b^r$。" },
    { en: "Coefficient", zh: "系数", ch: "Ch. 1", desc: "某次幂项前面的数字常数部分（不含 $x$ 本身）。" },
    { en: "Constant Term", zh: "常数项", ch: "Ch. 1", desc: "不含变量 $x$ 的项，即令 $x$ 的总指数为 $0$ 时对应的项。" },
    { en: "Ascending / Descending Powers of x", zh: "按 x 的升幂 / 降幂排列", ch: "Ch. 1", desc: "升幂指 $x^0, x^1, x^2, \\dots$ 指数从小到大；降幂则从高次到低次。" },
    { en: "Natural Exponential Function", zh: "自然指数函数", ch: "Ch. 2", desc: "以 $e \\approx 2.71828$ 为底数的函数 $y = e^x$，其自身斜率恰好等于自身函数值。" },
    { en: "Natural Logarithm", zh: "自然对数", ch: "Ch. 2", desc: "以 $e$ 为底的对数，简写为 $\\ln x$（即 $\\log_e x$），要求 $x > 0$。" },
    { en: "Asymptote", zh: "渐近线", ch: "Ch. 2", desc: "曲线无限靠近却永不相交的直线；$y=e^x$ 有水平渐近线 $y=0$，$y=\\ln x$ 有竖直渐近线 $x=0$。" },
    { en: "Continuous Growth / Decay", zh: "连续增长 / 衰变", ch: "Ch. 2", desc: "用 $N = N_0 e^{kt}$ 描述随时间连续按比例变化的过程（$k>0$ 增长，$k<0$ 衰变）。" },
    { en: "Linearization", zh: "线性化（化曲为直）", ch: "Ch. 2", desc: "通过对数变换将指数曲线 $y=ab^x$ 或幂曲线 $y=ax^k$ 化为直线方程以读出参数。" },
    { en: "Limit", zh: "极限", ch: "Ch. 3", desc: "当自变量无限趋近某值 $a$ 或 $\\infty$ 时，函数值无限逼近的目标值 $\\lim_{x\\to a} f(x)$。" },
    { en: "Average Rate of Change", zh: "平均变化率", ch: "Ch. 3", desc: "区间上的变化比值 $\\frac{\\Delta y}{\\Delta x} = \\frac{f(x_2)-f(x_1)}{x_2-x_1}$，几何上对应割线斜率。" },
    { en: "Instantaneous Rate of Change", zh: "瞬时变化率", ch: "Ch. 3", desc: "当 $\\Delta x \\to 0$ 时的变化率极限，即导数 $f'(x)$ 或 $\\frac{dy}{dx}$，对应切线斜率。" },
    { en: "First Principles", zh: "基本原理（求导定义）", ch: "Ch. 3", desc: "利用极限定义 $f'(x) = \\lim_{\\Delta x\\to 0}\\frac{f(x+\\Delta x)-f(x)}{\\Delta x}$ 定义导数。" },
    { en: "Derivative", zh: "导数", ch: "Ch. 3", desc: "描述函数瞬时变化率与切线斜率的新函数，记作 $f'(x)$ 或 $\\frac{dy}{dx}$。" },
    { en: "Differentiation", zh: "微分法（求导过程）", ch: "Ch. 4", desc: "利用求导法则计算函数导数的代数过程。" },
    { en: "Product Rule", zh: "积法则", ch: "Ch. 4", desc: "两函数乘积求导：$(uv)' = u v' + v u'$。" },
    { en: "Quotient Rule", zh: "商法则", ch: "Ch. 4", desc: "两函数相除求导：$\\left(\\frac{u}{v}\\right)' = \\frac{v u' - u v'}{v^2}$。" },
    { en: "Chain Rule", zh: "链式法则", ch: "Ch. 4", desc: "复合函数求导法则 $\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}$，由外到内逐层相乘。" },
    { en: "Second Derivative", zh: "二阶导数", ch: "Ch. 4", desc: "对一阶导数再求导一次，记作 $f''(x)$ 或 $\\frac{d^2y}{dx^2}$，反映斜率变化快慢（凹凸性）。" },
    { en: "Tangent & Normal", zh: "切线与法线", ch: "Ch. 5", desc: "切线斜率为 $m_T = f'(x_0)$；法线在切点处垂直于切线，斜率为 $m_N = -\\frac{1}{m_T}$。" },
    { en: "Strictly Increasing / Decreasing", zh: "严格递增 / 递减", ch: "Ch. 5", desc: "在区间内 $f'(x)>0$ 则图像上升（递增），$f'(x)<0$ 则图像下降（递减）。" },
    { en: "Stationary Point", zh: "驻点", ch: "Ch. 5", desc: "满足 $f'(x_0) = 0$（切线水平）的点；包含极大点、极小点及水平拐点。" },
    { en: "Turning Point", zh: "转向点", ch: "Ch. 5", desc: "函数由增转减或由减转增的驻点（即局部极大点或局部极小点）。" },
    { en: "Local Maximum / Minimum", zh: "局部极大值 / 局部极小值", ch: "Ch. 5", desc: "在邻近小范围内最高或最低的函数值（又称 Relative extremum）。" },
    { en: "Global Maximum / Minimum", zh: "全局最大值 / 全局最小值", ch: "Ch. 5", desc: "整个指定区间（如闭区间 $[a,b]$ 含端点）中绝对最大或最小的值。" },
    { en: "Concave Upwards / Downwards", zh: "凹向上 / 凹向下", ch: "Ch. 5", desc: "$f''(x)>0$ 时像笑脸碗状向上凹；$f''(x)<0$ 时像拱桥向下凹。" },
    { en: "Point of Inflexion", zh: "拐点（反曲点）", ch: "Ch. 5", desc: "曲线凹凸性发生改变（$f''(x)$ 变号）的分割点。" },
    { en: "Related Rates of Change", zh: "关联变化率", ch: "Ch. 5", desc: "通过链式法则将两个随时间变化的量之变化率联系起来，如 $\\frac{dV}{dt}=\\frac{dV}{dh}\\frac{dh}{dt}$。" },
    { en: "Indefinite Integral", zh: "不定积分", ch: "Ch. 6", desc: "微分的逆运算所求得的一族原函数，写作 $\\int f(x)\\,dx = F(x) + C$。" },
    { en: "Constant of Integration", zh: "积分常数", ch: "Ch. 6", desc: "不定积分末尾必须加上的任意常数 $+C$，可由初始条件（boundary/initial condition）确定。" },
    { en: "Integration by Substitution", zh: "代换积分法", ch: "Ch. 6", desc: "引入中间变量 $u=g(x)$ 把复杂积分化简为基本积分公式的方法。" },
    { en: "Definite Integral", zh: "定积分", ch: "Ch. 7", desc: "带有上下限 $[a, b]$ 的积分 $\\int_a^b f(x)\\,dx = F(b)-F(a)$，代表区间上的净累积量。" },
    { en: "Sub-intervals & Ordinates", zh: "子区间与纵坐标值", ch: "Ch. 7", desc: "梯形法则将 $[a,b]$ 分成 $n$ 个等宽子区间（宽度 $h=\\frac{b-a}{n}$），对应 $n+1$ 个端点纵坐标 $y_0,\\dots,y_n$。" },
    { en: "Trapezoidal Rule", zh: "梯形法则", ch: "Ch. 7", desc: "用 $n$ 个窄梯形面积之和近似求定积分的数值方法。" },
    { en: "Over-estimate / Under-estimate", zh: "高估 / 低估", ch: "Ch. 7", desc: "梯形近似值大于真实积分叫 Over-estimate（对应 $f''>0$ 凹向上），小于叫 Under-estimate（对应 $f''<0$ 凹向下）。" }
  ];
})();
