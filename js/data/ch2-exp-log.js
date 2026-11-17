/* ==========================================================================
   Chapter 2: Exponential Functions and Logarithmic Functions
   Units 2.1, 2.2, 2.3, 2.4 — Strictly aligned with Oxford M1A & HKDSE M1
   ========================================================================== */

(function () {
  const R = String.raw;
  const units = window.M1A_DATA.units;

  units["2.1"] = {
    id: "2.1",
    chapterId: "ch2",
    titleZh: "2.1 自然常数 e 与指数级数",
    titleEn: "The Number e and Exponential Series",
    objectives: [
      "通过银行连续复利理解自然常数 $e = \\lim_{n \\to \\infty}(1 + \\frac{1}{n})^n \\approx 2.71828$ 的由来；",
      "熟记并灵活运用自然指数级数 <span class=\"term-en\">Exponential Series</span> $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$；",
      "打通第 1 章与第 2 章：掌握 HKDSE 高频题型 $(1+ax)^n e^{kx}$ 展开并求特定项系数。"
    ],
    intuition: {
      title: "生活场景直觉：银行一天算一万次利息，你会变成亿万富翁吗？",
      storyHtml: R`
        <p>假设你往一家魔幻银行存 <strong>1 元</strong>，年利率高达 <strong>100%</strong>：</p>
        <ul>
          <li><strong>每年计息 1 次</strong>：年底变成 $(1 + 1)^1 = 2$ 元。</li>
          <li><strong>每半年计息 1 次</strong>（每次利率 $50\%$）：年底变成 $(1 + \frac{1}{2})^2 = 2.25$ 元。</li>
          <li><strong>每月计息 1 次</strong>（$n=12$）：$(1 + \frac{1}{12})^{12} \approx 2.613$ 元。</li>
          <li><strong>每秒计息 1 次</strong>（$n \approx 3.15 \times 10^7$）：钱没有变成无穷大，而是神奇地停在了 <strong>$2.71828\dots$ 元</strong>！</li>
        </ul>
        <p>这个无论复利分割得多细都无法超越的“自然增长天花板”，就是微积分里最核心的无理数——<strong>自然常数 $e$</strong>（<span class="term-en">Euler's number</span>）！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、自然常数 $e$ 与第 1 章的隐藏桥梁</h4>
      <p>其实 $(1 + \frac{1}{n})^n$ 就是一个二项式！把第 1 章的二项式定理套进去看看：</p>
      <p>$$(1 + \frac{1}{n})^n = 1 + n\left(\frac{1}{n}\right) + \frac{n(n-1)}{2!}\left(\frac{1}{n^2}\right) + \frac{n(n-1)(n-2)}{3!}\left(\frac{1}{n^3}\right) + \cdots$$</p>
      <p>当 $n \to \infty$ 时，每一项前面的 $\frac{n(n-1)}{n^2} \to 1$，于是整个式子化简成极其优美的无穷级数：$1 + 1 + \frac{1}{2!} + \frac{1}{3!} + \frac{1}{4!} + \cdots \approx 2.7182818$。</p>

      <h4>二、指数级数 <span class="term-en">Exponential Series</span> 的万能替换术</h4>
      <p>把上面括号里的 $1$ 换成任意变量 $x$，我们就得到 M1A 最核心的级数公式：</p>
      <p>$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$</p>
      <p>遇到 $e^{-2x}$ 或 $e^{3x}$ 时，不要死背新公式——只需把“原公式里的每个 $x$”用带括号的整体 $(-2x)$ 或 $(3x)$ 替换掉！</p>
    `,
    formulas: [
      {
        label: "自然常数 e 的极限定义",
        latex: R`$$e = \lim_{n \to \infty}\left(1 + \frac{1}{n}\right)^n \approx 2.71828$$`,
        note: R`拓展记住：$\lim_{n\to\infty}\left(1 + \frac{x}{n}\right)^n = e^x$`
      },
      {
        label: "指数级数展开 (Exponential Series)",
        latex: R`$$e^x = 1 + \frac{x}{1!} + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$`,
        note: "展开至 $x^3$ 时，分母分别是 $1! = 1$、$2! = 2$、$3! = 6$，千万不要漏写阶乘符号 $!$！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 展开 $e^{-3x}$ 的 $x^2$ 项时，写成 $\frac{-3x^2}{2!}$ 或忘记乘方符号与数字 3。`,
        right: R`✅ 必须整体加括号替换：$\frac{(-3x)^2}{2!} = \frac{9x^2}{2}$；到了 $x^3$ 项则是 $\frac{(-3x)^3}{3!} = \frac{-27x^3}{6} = -\frac{9}{2}x^3$。`
      },
      {
        wrong: R`❌ 以为指数级数只有前 3 项，或者在 $(1+2x)^4 e^{-x}$ 中直接把常数项漏掉。`,
        right: R`✅ $e^{kx}$ 展开式从常数项 $1$ 开始且无穷延伸；和二项展式相乘求 $x^2$ 系数时，两个括号都必须写到 $x^2$ 项（含常数项 $1$）再配对！`
      }
    ],
    syllabusGuard: "HKDSE M1 考纲提示：M1 只要求认识并使用 $e^x$ 的幂级数展开式；<strong>不考</strong> $\\ln(1+x)$ 的级数展开，也不考三角函数级数。",
    examples: [
      {
        title: "Example 1 · 二项展式 × 指数级数跨章组合（HKDSE 必考结构）",
        promptEn: R`Expand $e^{-2x}(1 + 3x)^4$ in ascending powers of $x$ up to the term in $x^2$.`,
        promptZh: "按 $x$ 的升幂将 $e^{-2x}(1 + 3x)^4$ 展开至 $x^2$ 项。",
        steps: [
          {
            math: R`$$e^{-2x} = 1 + (-2x) + \frac{(-2x)^2}{2!} + \cdots = 1 - 2x + 2x^2 + \cdots$$`,
            why: "先用 $e^u$ 公式展开 $e^{-2x}$ 至 $x^2$ 项，注意 $\\frac{(-2x)^2}{2} = 2x^2$。"
          },
          {
            math: R`$$(1 + 3x)^4 = 1 + C_1^4(3x) + C_2^4(3x)^2 + \cdots = 1 + 12x + 54x^2 + \cdots$$`,
            why: "再用第 1 章二项式定理把 $(1+3x)^4$ 展开至 $x^2$ 项：$C_2^4 \cdot 9 = 6 \times 9 = 54$。"
          },
          {
            math: R`$$e^{-2x}(1 + 3x)^4 = (1 - 2x + 2x^2 + \cdots)(1 + 12x + 54x^2 + \cdots)$$`,
            why: "把两段展开式摆在一起，逐个次幂做“乘法配对”。"
          },
          {
            math: R`$$= 1 + (12 - 2)x + (54 - 24 + 2)x^2 + \cdots = 1 + 10x + 32x^2 + \cdots$$`,
            why: "$x^1$ 来自 $1(12x)+(-2x)(1)$；$x^2$ 来自 $1(54x^2)+(-2x)(12x)+2x^2(1)$，最后化简得 $1 + 10x + 32x^2$。"
          }
        ]
      }
    ],
    labId: "lab_exp_e",
    connections: {
      prereq: [{ id: "1.2", label: "1.2 二项式定理" }, { id: "1.3", label: "1.3 括号乘积配对" }],
      next: [{ id: "2.2", label: "2.2 eˣ 与 ln x 图像与性质" }, { id: "4.3", label: "4.3 eˣ 的超凡导数性质" }],
      summary: "拖动下方实验室滑块，亲眼看看 $(1 + \\frac{1}{n})^n$ 如何在复利极限中收敛到 $e$，以及级数多项式是如何像“吸铁石”一样一阶阶贴合 $e^x$ 曲线的！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（不死算，先判断）",
        promptEn: R`In the exponential series expansion of $e^{3x}$, what is the coefficient of $x^2$?`,
        promptZh: "在 $e^{3x}$ 的指数级数展开式中，$x^2$ 的系数是多少？",
        options: [R`$\frac{9}{2}$`, R`$3$`, R`$\frac{3}{2}$`, R`$9$`],
        correctIndex: 0,
        feedbackCorrect: R`非常敏锐！记住替换后要整个平方：$\frac{(3x)^2}{2!} = \frac{9x^2}{2}$，所以系数是 $\frac{9}{2}$。`,
        feedbackWrong: R`注意不能只把 $x$ 平方而忘了 $3$！把 $3x$ 整个代入 $\frac{u^2}{2!}$ 得 $\frac{(3x)^2}{2!} = \frac{9}{2}x^2$。`
      },
      stage2: {
        title: "基础模仿练（展开 $e^{2x}$ 至 $x^3$）",
        promptEn: R`Expand $e^{2x}$ in ascending powers of $x$ up to the term in $x^3$.`,
        promptZh: "按 $x$ 的升幂展开 $e^{2x}$ 至 $x^3$ 项。",
        type: "mcq",
        options: [
          R`$1 + 2x + 2x^2 + \frac{4}{3}x^3$`,
          R`$1 + 2x + 4x^2 + 8x^3$`,
          R`$1 + 2x + 2x^2 + \frac{8}{3}x^3$`,
          R`$1 + x + 2x^2 + \frac{4}{3}x^3$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：把 $u = 2x$ 代入 $1 + u + \frac{u^2}{2!} + \frac{u^3}{3!}$。`,
          R`提示 2：第三项 $\frac{(2x)^2}{2} = 2x^2$；第四项 $\frac{(2x)^3}{6} = \frac{8}{6}x^3 = \frac{4}{3}x^3$。`
        ],
        solutionHtml: R`
          <p>$$e^{2x} = 1 + (2x) + \frac{(2x)^2}{2!} + \frac{(2x)^3}{3!} + \cdots$$</p>
          <p>$$= 1 + 2x + \frac{4x^2}{2} + \frac{8x^3}{6} + \cdots = 1 + 2x + 2x^2 + \frac{4}{3}x^3 + \cdots$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Find the coefficient of $x^2$ in the expansion of $e^{-4x}(1 - 2x)^5$.`,
        promptZh: "求 $e^{-4x}(1 - 2x)^5$ 展开式中 $x^2$ 的系数。",
        type: "input",
        acceptedAnswers: ["88"],
        inputPlaceholder: "输入 x² 的系数",
        hints: [
          R`提示 1 (2M)：分别展开至 $x^2$：$e^{-4x} = 1 - 4x + \frac{16}{2}x^2 = 1 - 4x + 8x^2$；$(1-2x)^5 = 1 - 10x + 40x^2$。`,
          R`提示 2 (1M + 1A)：配对凑 $x^2$：$(1)(40) + (-4)(-10) + (8)(1)$，负负得正别算错！`
        ],
        solutionHtml: R`
          <p>$$e^{-4x} = 1 + (-4x) + \frac{(-4x)^2}{2!} + \cdots = 1 - 4x + 8x^2 + \cdots \quad \text{(1M)}$$</p>
          <p>$$(1 - 2x)^5 = 1 + C_1^5(-2x) + C_2^5(-2x)^2 + \cdots = 1 - 10x + 40x^2 + \cdots \quad \text{(1M)}$$</p>
          <p>$$\text{Coefficient of } x^2 = 1(40) + (-4)(-10) + 8(1) = 40 + 40 + 8 = 88 \quad \text{(1M + 1A)}$$</p>
        `
      }
    }
  };

  units["2.2"] = {
    id: "2.2",
    chapterId: "ch2",
    titleZh: "2.2 eˣ 与 ln x 的图像、性质及对数法则",
    titleEn: "Graphs and Properties of Exponential and Logarithmic Functions",
    objectives: [
      "分清自然指数函数 $y = e^x$ 与自然对数函数 $y = \\ln x$ 的定义域、值域、定点与渐近线 <span class=\"term-en\">Asymptote</span>；",
      "理解两者互为反函数 <span class=\"term-en\">Inverse Functions</span>，图像关于直线 $y = x$ 镜像对称；",
      "熟练使用对数运算法则 <span class=\"term-en\">Laws of Logarithms</span> 与换底公式解指数/对数方程。"
    ],
    intuition: {
      title: "生活场景直觉：“加密”与“解密”的一对镜像双胞胎",
      storyHtml: R`
        <p>把函数 $y = e^x$ 想象成一台<strong>“指数放大机”</strong>：你投进去一个输入 $x$，它会输出爆炸增长的 $e^x$（无论 $x$ 是正是负，吐出来的永远是正数！）。</p>
        <p>而 $y = \ln x$（读作 <span class="term-en">lon x</span> 或 <span class="term-en">natural log of x</span>）就是它的<strong>“逆向解码器”</strong>：把刚才的输出放进去，它会问你“$e$ 的几次方才等于这个数？”，然后精准还原出原来的 $x$。</p>
        <p>正因为输入与输出角色对调（$(a, b)$ 变成 $(b, a)$），在坐标系里，$y = e^x$ 与 $y = \ln x$ 的曲线就像照镜子一样，完美对称于 $45^\circ$ 对角线 $y = x$！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、图像与几何特征对比表</h4>
      <ul>
        <li><strong>$y = e^x$</strong>：定义域（<span class="term-en">Domain</span>）为全体实数 $\mathbb{R}$；值域（<span class="term-en">Range</span>）严格为 $y > 0$；恒过定点 <strong>$(0, 1)$</strong>；以 $x$ 轴（$y = 0$）为水平渐近线，全程严格递增。</li>
        <li><strong>$y = \ln x$（即 $\log_e x$）</strong>：定义域严格要求 <strong>$x > 0$</strong>（真数不能为 0 或负数！）；值域为全体实数 $\mathbb{R}$；恒过定点 <strong>$(1, 0)$</strong>；以 $y$ 轴（$x = 0$）为竖直渐近线，全程严格递增但越往右越平缓。</li>
      </ul>

      <h4>二、解对数方程时的“安检门”</h4>
      <p>解诸如 $\ln(x+2) + \ln(x-1) = \ln 4$ 的方程时，合并对数往往会顺手解出两个根。<strong>一定要把所有解带回原始方程的每个 $\ln(\cdots)$ 里检查真数是否 $> 0$</strong>，一旦让括号内 $\le 0$ 必须当场 <code>rejected</code>！</p>
    `,
    formulas: [
      {
        label: "互逆还原律 (Inverse Identities)",
        latex: R`$$\ln(e^x) = x \;\; (x \in \mathbb{R}), \qquad e^{\ln x} = x \;\; (x > 0), \qquad \ln 1 = 0, \quad \ln e = 1$$`,
        note: "记住 $\\ln$ 和 $e$ 是天然克星，贴在一起立刻相互抵消！"
      },
      {
        label: "自然对数核心运算法则 (Laws of Logarithms)",
        latex: R`$$\ln(MN) = \ln M + \ln N, \quad \ln\left(\frac{M}{N}\right) = \ln M - \ln N, \quad \ln(M^k) = k\ln M$$`,
        note: "换底公式 <span class=\"term-en\">Change-of-base Formula</span>：$\\log_a x = \\frac{\\ln x}{\\ln a}$（这个公式在第 4 章对 $\\log_a x$ 求导时超级有用！）"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 把 $\ln(x + y)$ 拆成 $\ln x + \ln y$，或者把 $\frac{\ln A}{\ln B}$ 写成 $\ln(A - B)$。`,
        right: R`✅ <strong>加法不能拆！</strong>只有括号里面是乘法 $\ln(xy)$ 才能拆成 $\ln x + \ln y$；同理只有 $\ln\left(\frac{A}{B}\right)$ 才能拆成 $\ln A - \ln B$。`
      },
      {
        wrong: R`❌ 解出二次方程两个根后直接全写进答案，忘记检验 $\ln(\text{负数})$ 无意义。`,
        right: R`✅ 每次解对数方程，结尾必检定义域（例如 $x-1 > 0 \implies x > 1$），不符合的一律标 <code>(rejected)</code>。`
      }
    ],
    examples: [
      {
        title: "Example 1 · 解自然对数方程（含增根检验）",
        promptEn: R`Solve the equation $\ln(x + 2) + \ln(x - 1) = \ln 4$.`,
        promptZh: "解方程 $\\ln(x + 2) + \\ln(x - 1) = \\ln 4$。",
        steps: [
          {
            math: R`$$\ln\bigl[(x + 2)(x - 1)\bigr] = \ln 4$$`,
            why: "利用对数加法法则 $\\ln M + \\ln N = \\ln(MN)$，把左边合成一个 $\\ln$。"
          },
          {
            math: R`$$(x + 2)(x - 1) = 4 \implies x^2 + x - 2 = 4$$`,
            why: "因为 $\\ln$ 是一对一单调递增函数，两边同时去掉 $\\ln$。"
          },
          {
            math: R`$$x^2 + x - 6 = 0 \implies (x + 3)(x - 2) = 0$$`,
            why: "整理成标准二次方程并因式分解。"
          },
          {
            math: R`$$x = 2 \quad \text{or} \quad x = -3 \text{ (rejected)}$$`,
            why: "代入检验：当 $x = -3$ 时，$x+2 = -1 < 0$ 使对数无意义，故舍去；当 $x = 2$ 时两项真数均 $> 0$，成立！"
          }
        ]
      }
    ],
    labId: "lab_exp_e",
    connections: {
      prereq: [{ id: "2.1", label: "2.1 自然常数 e" }],
      next: [
        { id: "2.3", label: "2.3 连续增长与衰变模型" },
        { id: "2.4", label: "2.4 取对数化曲为直" },
        { id: "4.3", label: "4.3 对数法则助推极速求导" }
      ],
      summary: "对数“把乘除变加减、把次方拉下来”的魔法，不仅是 2.4 节化曲为直的核心，更是第 4 章瞬间化解超复杂 $\\ln$ 求导的绝招！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（图像与定义域判断）",
        promptEn: R`Which statement about the graphs of $y = e^x$ and $y = \ln x$ is FALSE?`,
        promptZh: "关于 $y = e^x$ 与 $y = \\ln x$ 的图像，以下哪一句是<strong>错误</strong>的？",
        options: [
          R`The graph of $y = \ln x$ passes through $(0, 1)$`,
          R`They are reflections of each other about the line $y = x$`,
          R`$e^x > 0$ for all real values of $x$`,
          R`The $y$-axis ($x = 0$) is a vertical asymptote of $y = \ln x$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`火眼金睛！$x = 0$ 不在 $\ln x$ 的定义域内（$\ln 0$ 不存在），$y = \ln x$ 恒过 $(1, 0)$，而 $(0, 1)$ 是 $y = e^x$ 的定点。`,
        feedbackWrong: R`再检查一下坐标：$\ln 1 = 0$，所以 $y = \ln x$ 过 $(1, 0)$；$x = 0$ 时 $\ln 0$ 无意义，过 $(0, 1)$ 的是 $y = e^x$！`
      },
      stage2: {
        title: "基础模仿练（对数法则化简）",
        promptEn: R`Simplify $2\ln 3 + \ln 4 - \ln 6$ into a single logarithm $\ln k$. What is $k$?`,
        promptZh: "将 $2\\ln 3 + \\ln 4 - \\ln 6$ 化简为单个对数 $\\ln k$，问 $k$ 的值是多少？",
        type: "input",
        acceptedAnswers: ["6"],
        inputPlaceholder: "输入整数 k",
        hints: [
          R`提示 1：先把系数 $2$ 搬回真数变成次方：$2\ln 3 = \ln(3^2) = \ln 9$。`,
          R`提示 2：加变乘、减变除：$\ln 9 + \ln 4 - \ln 6 = \ln\left(\frac{9 \times 4}{6}\right)$。`
        ],
        solutionHtml: R`
          <p>$$2\ln 3 + \ln 4 - \ln 6 = \ln(3^2) + \ln 4 - \ln 6$$</p>
          <p>$$= \ln\left(\frac{9 \times 4}{6}\right) = \ln 6 \implies k = 6$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Solve the equation $e^{2x} - 5e^x + 6 = 0$. Give your answers in exact form in terms of $\ln$.`,
        promptZh: "解方程 $e^{2x} - 5e^x + 6 = 0$，答案以含 $\\ln$ 的精确形式表示。",
        type: "mcq",
        options: [
          R`$x = \ln 2 \text{ or } x = \ln 3$`,
          R`$x = 2 \text{ or } x = 3$`,
          R`$x = e^2 \text{ or } x = e^3$`,
          R`$x = \ln 5 \text{ or } x = \ln 6$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1 (1M)：发现 $e^{2x} = (e^x)^2$！令 $u = e^x$，原方程化为二次方程 $u^2 - 5u + 6 = 0$。`,
          R`提示 2 (1M + 1A)：因式分解得 $(u - 2)(u - 3) = 0$，即 $e^x = 2$ 或 $e^x = 3$（均 $>0$ 有效），两边取 $\ln$ 即可！`
        ],
        solutionHtml: R`
          <p>Let $u = e^x$ (where $u > 0$). Then the equation becomes:</p>
          <p>$$u^2 - 5u + 6 = 0 \quad \text{(1M)}$$</p>
          <p>$$(u - 2)(u - 3) = 0$$</p>
          <p>$$e^x = 2 \quad \text{or} \quad e^x = 3 \quad \text{(1M)}$$</p>
          <p>$$x = \ln 2 \quad \text{or} \quad x = \ln 3 \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["2.3"] = {
    id: "2.3",
    chapterId: "ch2",
    titleZh: "2.3 实际应用：连续增长与衰变模型",
    titleEn: "Practical Models: Continuous Growth and Decay",
    objectives: [
      "理解形如 $N = N_0 e^{kt}$ 的指数模型中各参数（初始值 $N_0$、速率常数 $k$、时间 $t$）的物理含义；",
      "学会用代点法求 $k$，并用自然对数 $\\ln$ 反解到达特定状态所需的时间 $t$；",
      "区分连续复利 / 细菌繁殖（$k > 0$）与药物代谢 / 放射性衰变 / 资产折旧（$k < 0$）。"
    ],
    intuition: {
      title: "生活场景直觉：退烧药在血液里如何“越少减得越慢”？",
      storyHtml: R`
        <p>吃下一颗退烧药后，肝脏每小时会按<strong>当前血液里剩余药量的固定百分比</strong>去代谢它：刚吃下去药多，每小时清掉的多；过了 6 小时药剩得少，清除速度也跟着变慢——所以药量永远不会“啪”一下突然变零，而是沿着一条光滑的衰减曲线贴近 0。</p>
        <p>凡是“变化快慢与当前数量成正比”的自然界过程——无论是培养皿里的细菌分裂、喝下冰美式后咖啡因代谢、还是碳-14 考古测年——全部都服从 <strong>$N = N_0 e^{kt}$</strong> 这条宇宙通用规律！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、拆解模型 $N(t) = N_0 e^{kt}$ 的每一个零件</h4>
      <ul>
        <li><strong>$N_0$（初始值 <span class="term-en">Initial value</span>）</strong>：把 $t = 0$ 代入，$N(0) = N_0 e^0 = N_0$，所以 $N_0$ 就是最开始的数量。</li>
        <li><strong>$k$（增长/衰变常数）</strong>：若 $k > 0$ 代表持续增长（<span class="term-en">Growth</span>）；若 $k < 0$ 代表持续衰变或折旧（<span class="term-en">Decay</span>）。注意有些题目直接用负号写成 $N = N_0 e^{-kt}$（此时 $k > 0$）。</li>
        <li><strong>半衰期 <span class="term-en">Half-life</span> 与翻倍时间 <span class="term-en">Doubling time</span></strong>：半衰期就是让 $N = \frac{1}{2} N_0$ 的时间 $t$，你会发现两边的 $N_0$ 会直接约掉——不管原来有多少克，减半所需时间永远一模一样！</li>
      </ul>
    `,
    formulas: [
      {
        label: "连续增长与衰变通式",
        latex: R`$$N(t) = N_0 e^{kt}$$`,
        note: "解题三步曲：① 用 $t=0$ 读出 $N_0$；② 代入已知时刻点 $(t_1, N_1)$ 取 $\\ln$ 求出 $k$；③ 用完整公式预测未来或反解时间。"
      },
      {
        label: "底数互换小技巧 (Base Conversion)",
        latex: R`$$a^t = e^{(\ln a)t}$$`,
        note: "无论是写 $V = V_0 a^t$ 还是 $V = V_0 e^{kt}$，本质完全相通，两边取 $\\ln$ 都能把未知数 $t$ 从指数位置“请下来”！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 算出了 $k = \frac{\ln 2}{5} \approx 0.1386$ 后过早四舍五入取 $0.14$ 再算后续步，导致最后答案误差超标。`,
        right: R`✅ HKDSE 标准要求：<strong>中间步骤至少多保留 1–2 位有效数字（或把精确表达式如 $\frac{\ln 2}{5}$ 存进计算器内存 / 直接带着算）</strong>，只在最终答案按题目要求取舍（通常 3 个有效数字 <code>3 sig. fig.</code>）。`
      },
      {
        wrong: R`❌ 题干写“decreases by $20\%$ after 3 hours”，直接代 $N = 0.2 N_0$。`,
        right: R`✅ “减少了 $20\%$（decreases by $20\%$）”意味着还剩下 $1 - 20\% = 80\%$，应该代 $N = 0.8 N_0$！如果是“decreases to $20\%$”才是 $0.2 N_0$。`
      }
    ],
    examples: [
      {
        title: "Example 1 · 细菌繁殖预测（经典两步建模题）",
        promptEn: R`The number of bacteria $N$ in a culture after $t$ hours is given by $N = 500e^{kt}$. After $4$ hours, the number of bacteria increases to $2000$.<br>(a) Find the exact value of $k$ in terms of $\ln$.<br>(b) Find the time required for the number of bacteria to reach $10000$, correct to $3$ significant figures.`,
        promptZh: "培养皿中 $t$ 小时后的细菌数量为 $N = 500e^{kt}$。$4$ 小时后细菌增至 $2000$ 个。（a）用含 $\\ln$ 的精确形式求 $k$。（b）求细菌数达到 $10000$ 所需时间（准确至 3 位有效数字）。",
        steps: [
          {
            math: R`$$\text{(a) When } t = 4,\; N = 2000: \quad 2000 = 500e^{4k}$$`,
            why: "把题目给定的边界点 $(4, 2000)$ 代入模型。"
          },
          {
            math: R`$$e^{4k} = 4 \implies 4k = \ln 4 \implies k = \frac{\ln 4}{4} = \frac{\ln 2}{2}$$`,
            why: "先除掉 $500$ 让 $e^{4k}$ 单独站在一边，再两边取自然对数 $\\ln$ 放出 $4k$。"
          },
          {
            math: R`$$\text{(b) Put } N = 10000: \quad 10000 = 500e^{kt} \implies e^{kt} = 20$$`,
            why: "同样先除掉 $500$，化简成 $e^{kt} = 20$。"
          },
          {
            math: R`$$kt = \ln 20 \implies t = \frac{\ln 20}{\frac{\ln 2}{2}} = \frac{2\ln 20}{\ln 2} \approx 8.64 \text{ hours (corr. to 3 sig. fig.)}$$`,
            why: "用精确值 $k = \\frac{\\ln 2}{2}$ 除过去避免舍入误差，计算器得出 $8.6438\\dots \\approx 8.64$ 小时。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "2.2", label: "2.2 对数解方程与化简" }],
      next: [
        { id: "2.4", label: "2.4 用实验数据反求模型参数" },
        { id: "5.6", label: "5.6 用导数求增长瞬时速率 dN/dt" },
        { id: "6.3", label: "6.3 从变化率积分反推 N(t)" }
      ],
      summary: "今天直接拿到了公式 $N = N_0 e^{kt}$；在第 5、6 章学完微积分后，你还会明白这个公式为什么恰好满足 $\\frac{dN}{dt} = kN$！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（读懂题眼）",
        promptEn: R`In the model $M = 120e^{-0.05t}$ for the mass of a radioactive substance, what is the initial mass and is the mass increasing or decreasing?`,
        promptZh: "在放射性物质质量模型 $M = 120e^{-0.05t}$ 中，初始质量是多少？质量在增加还是减少？",
        options: [
          R`Initial mass $= 120$, decreasing`,
          R`Initial mass $= 120$, increasing`,
          R`Initial mass $= -0.05$, decreasing`,
          R`Initial mass $= 0$, decreasing`
        ],
        correctIndex: 0,
        feedbackCorrect: R`完全正确！令 $t = 0$ 得 $M(0) = 120e^0 = 120$；指数上的系数 $-0.05 < 0$，所以随着时间推移质量不断衰变减少。`,
        feedbackWrong: R`提示：把 $t = 0$ 代入就是初始质量（$e^0 = 1$）；而指数项为负次方 $-0.05t$，随 $t$ 增大越来越小。`
      },
      stage2: {
        title: "基础模仿练（解衰变时间）",
        promptEn: R`The mass $M$ (in mg) of a drug remaining in the bloodstream $t$ hours after injection is $M = 80e^{-0.2t}$. Find $t$ when $M = 20$, correct to $3$ significant figures.`,
        promptZh: "注射药物 $t$ 小时后血液中剩余药量 $M = 80e^{-0.2t}$（mg）。求当 $M = 20$ 时的时间 $t$（准确至 3 位有效数字）。",
        type: "input",
        acceptedAnswers: ["6.93", "6.931", "6.9315"],
        inputPlaceholder: "输入数值，例如 6.93",
        hints: [
          R`提示 1：代入 $M = 20$，先两边除以 $80$ 得 $e^{-0.2t} = 0.25 = \frac{1}{4}$。`,
          R`提示 2：两边取 $\ln$：$-0.2t = \ln(0.25) = -\ln 4$，于是 $t = \frac{\ln 4}{0.2} = 5\ln 4$，按计算器取 3 位有效数字！`
        ],
        solutionHtml: R`
          <p>$$20 = 80e^{-0.2t} \implies e^{-0.2t} = \frac{1}{4}$$</p>
          <p>$$-0.2t = \ln\left(\frac{1}{4}\right) = -\ln 4$$</p>
          <p>$$t = \frac{\ln 4}{0.2} = 5\ln 4 \approx 6.93 \text{ (corr. to 3 sig. fig.)}$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`The value $\$V$ of a car $t$ years after purchase is modelled by $V = 240000e^{-kt}$. After $5$ years, its value drops to $\$120000$. Find its value after $8$ years, correct to the nearest $\$100$.`,
        promptZh: "一辆汽车购买 $t$ 年后的价值为 $V = 240000e^{-kt}$（港元）。5 年后价值跌至 $120000$ 港元。求 8 年后的价值（准确至最接近的 $100$ 港元）。",
        type: "input",
        acceptedAnswers: ["79200", "79,200"],
        inputPlaceholder: "输入最接近百位的整数，如 79200",
        hints: [
          R`提示 1 (1M)：代入 $t=5, V=120000$ 得 $e^{-5k} = \frac{1}{2}$，所以 $k = \frac{\ln 2}{5}$（保留精确形式，不要过早取两位小数！）。`,
          R`提示 2 (1M + 1A)：代入 $t=8$，$V = 240000 \cdot e^{-8k} = 240000 \cdot (e^{-5k})^{8/5} = 240000 \times (0.5)^{1.6} \approx 79170.5$，四舍五入至最接近百位！`
        ],
        solutionHtml: R`
          <p>When $t = 5$, $V = 120000$:</p>
          <p>$$120000 = 240000e^{-5k} \implies e^{-5k} = 0.5 \implies k = \frac{\ln 2}{5} \quad \text{(1M)}$$</p>
          <p>When $t = 8$:</p>
          <p>$$V = 240000e^{-8 \cdot \frac{\ln 2}{5}} = 240000 (0.5)^{8/5} \approx 79170.47 \quad \text{(1M)}$$</p>
          <p>$$\approx \$79200 \text{ (corr. to the nearest } \$100\text{)} \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["2.4"] = {
    id: "2.4",
    chapterId: "ch2",
    titleZh: "2.4 非线性数据的线性化（化曲为直）",
    titleEn: "Linearization of Non-linear Relations",
    objectives: [
      "学会利用自然对数 $\\ln$（或常用对数 $\\log$）把指数关系 $y = ab^x$ 和幂关系 $y = ax^k$ 转换成直线方程 $Y = mX + c$；",
      "能看懂图像坐标轴标签（如纵轴是 $\\ln y$、横轴是 $x$ 或 $\\ln x$），从斜率与截距准确反推出原参数 $a, b, k$；",
      "掌握 HKDSE 考卷中“由直线图像两点求指数模型参数”的标准解题格式。"
    ],
    intuition: {
      title: "生活场景直觉：为什么科学家总喜欢把曲线“掰直”成一条直线？",
      storyHtml: R`
        <p>在物理或生物实验里，我们测出来的数据点往往沿着一条弯弯曲曲的指数曲线 $y = ab^x$ 爬升。人眼看曲线根本分不清它到底是指数还是抛物线，更没法直接拿尺子量出 $a$ 和 $b$。</p>
        <p>但如果给纵坐标数据统一戴上一副“对数眼镜”——把每个 $y$ 换成 $\ln y$，再画到方格纸上，神奇的事情发生了：<strong>原本弯曲的指数曲线，瞬间被掰成了一根笔直的直线！</strong></p>
        <p>直线只需要看两个数字：<strong>斜率（Slope）</strong>和<strong>纵轴截距（y-intercept）</strong>，就能把藏在幕后的参数 $a$ 和 $b$ 抓出来！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、两大经典变形套路对比</h4>
      <p>核心方法永远只有一招：<strong>两边同时取自然对数 $\ln$</strong>，然后对着初中直线方程 $Y = mX + c$ 一一配对：</p>
      <ul>
        <li><strong>类型 A（指数型 $y = ab^x$）</strong>：<br>
          取对数得 $\ln y = \ln a + (\ln b) x$。对比 $Y = mX + c$：<br>
          纵轴 $Y = \ln y$，横轴 $X = x$；<br>
          <strong>斜率 $m = \ln b \implies b = e^m$</strong>；<strong>截距 $c = \ln a \implies a = e^c$</strong>。
        </li>
        <li><strong>类型 B（幂函数型 $y = ax^k$）</strong>：<br>
          取对数得 $\ln y = \ln a + k\ln x$。对比 $Y = mX + c$：<br>
          纵轴 $Y = \ln y$，横轴 $X = \ln x$；<br>
          <strong>斜率 $m = k$</strong>（直接就是斜率，不用取 $e$！）；<strong>截距 $c = \ln a \implies a = e^c$</strong>。
        </li>
      </ul>
      <p>同样方法也完全适用于底数为 $e$ 的关系（如 $y = ae^{kx} \implies \ln y = kx + \ln a$，斜率直接就是 $k$！）。</p>
    `,
    formulas: [
      {
        label: "类型 A：指数关系线性化",
        latex: R`$$y = ab^x \iff \ln y = (\ln b)x + \ln a \qquad \text{（纵轴 } \ln y \text{ 对横轴 } x\text{）}$$`,
        note: "若题干用常用对数 $\\log_{10} y$（简写 $\\log y$），则把公式里的 $e^m, e^c$ 换成 $10^m, 10^c$！"
      },
      {
        label: "类型 B：幂函数关系线性化",
        latex: R`$$y = ax^k \iff \ln y = k\ln x + \ln a \qquad \text{（纵轴 } \ln y \text{ 对横轴 } \ln x\text{）}$$`,
        note: "⚠️ 看图第一秒必看坐标轴写的究竟是 $x$ 还是 $\\ln x$，以及纵轴是 $\\ln y$ 还是 $\\log y$！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 题目画的是 $\ln y$ 对 $x$ 的直线，算出截距为 $1.2$ 后直接写 $a = 1.2$。`,
        right: R`✅ 直线方程是 $\ln y = mx + c$，截距 $c$ 等于 $\ln a$ 而不是 $a$！必须写 $\ln a = 1.2 \implies a = e^{1.2} \approx 3.32$。`
      },
      {
        wrong: R`❌ 没看清图上底数是 $\log_{10} y$ 还是 $\ln y$，一律用 $e^{\text{截距}}$ 反解。`,
        right: R`✅ 看到 $\\ln$ 用底数 $e$，看到 $\\log$（即 $\\log_{10}$）必须用底数 $10$！`
      }
    ],
    examples: [
      {
        title: "Example 1 · 从直线图像上的两点还原指数模型参数",
        promptEn: R`Variables $x$ and $y$ are related by $y = ab^x$, where $a$ and $b$ are constants. The graph of $\ln y$ against $x$ is a straight line passing through $(0, 1.2)$ and $(4, 3.2)$. Find $a$ and $b$, correct to $3$ significant figures.`,
        promptZh: "变量 $x$ 与 $y$ 满足 $y = ab^x$。已知 $\\ln y$ 对 $x$ 的直线图像经过 $(0, 1.2)$ 与 $(4, 3.2)$，求 $a$ 与 $b$（准确至 3 位有效数字）。",
        steps: [
          {
            math: R`$$y = ab^x \implies \ln y = \ln(ab^x) = (\ln b)x + \ln a$$`,
            why: "先对原式两边取 $\\ln$，整理成线性形式 $Y = mX + c$。"
          },
          {
            math: R`$$\text{Slope } = \ln b = \frac{3.2 - 1.2}{4 - 0} = 0.5 \implies b = e^{0.5} \approx 1.65$$`,
            why: "用两点斜率公式算出斜率等于 $0.5$，它对应 $\\ln b$，故 $b = e^{0.5}$。"
          },
          {
            math: R`$$\text{Vertical intercept } = \ln a = 1.2 \implies a = e^{1.2} \approx 3.32$$`,
            why: "点 $(0, 1.2)$ 刚好在纵轴上，所以纵轴截距 $\\ln a = 1.2$，进而 $a = e^{1.2}$。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "2.2", label: "2.2 对数运算法则" }, { id: "2.3", label: "2.3 增长衰变模型" }],
      next: [{ id: "3.1", label: "3.1 步入第 3 章：函数的极限" }],
      summary: "第 2 章完美收官！现在我们手握多项式、二项展式、$e^x$ 与 $\\ln x$ 全部工具，正式开启第 3 章——微积分（Calculus）的世界！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（不死算，先配对）",
        promptEn: R`Given $y = ax^k$, if we plot a straight line graph of $\ln y$ against $\ln x$, what does the slope of the line represent?`,
        promptZh: "已知 $y = ax^k$，若绘制 $\\ln y$ 对 $\\ln x$ 的直线图像，该直线的斜率代表什么？",
        options: [R`$k$`, R`$\ln k$`, R`$e^k$`, R`$\ln a$`],
        correctIndex: 0,
        feedbackCorrect: R`太准了！取对数得到 $\ln y = k(\ln x) + \ln a$，对比 $Y = mX + c$（这里 $X = \ln x$），斜率 $m$ 直接就是 $k$！`,
        feedbackWrong: R`写一下变换结果：$\ln y = \ln a + k\ln x$。因为横轴是 $\ln x$，乘在横轴前面充当斜率的常数就是 $k$。`
      },
      stage2: {
        title: "基础模仿练（由对数直线反写原方程）",
        promptEn: R`The graph of $\ln y$ against $\ln x$ is a straight line with slope $2.5$ and vertical intercept $\ln 3$. Express $y$ in terms of $x$.`,
        promptZh: "已知 $\\ln y$ 对 $\\ln x$ 的直线斜率为 $2.5$，纵轴截距为 $\\ln 3$，试用 $x$ 表示 $y$。",
        type: "mcq",
        options: [
          R`$y = 3x^{2.5}$`,
          R`$y = (\ln 3)x^{2.5}$`,
          R`$y = 3 \cdot (2.5)^x$`,
          R`$y = e^{2.5} x^3$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：根据直线斜截式写出方程：$\ln y = 2.5\ln x + \ln 3$。`,
          R`提示 2：利用对数法则把 $2.5$ 搬回指数并合并：$\ln y = \ln(x^{2.5}) + \ln 3 = \ln(3x^{2.5})$。`
        ],
        solutionHtml: R`
          <p>$$\ln y = 2.5\ln x + \ln 3$$</p>
          <p>$$\ln y = \ln(x^{2.5}) + \ln 3 = \ln(3x^{2.5})$$</p>
          <p>$$\therefore y = 3x^{2.5}$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`The variables $P$ and $t$ satisfy $P = ab^t$. The graph of $\ln P$ against $t$ is a straight line with slope $-0.4$ and vertical intercept $5$. Find the exact value of $P$ when $t = 5$ in terms of $e$.`,
        promptZh: "变量 $P$ 与 $t$ 满足 $P = ab^t$。$\\ln P$ 对 $t$ 的直线图像斜率为 $-0.4$，纵轴截距为 $5$。求当 $t = 5$ 时 $P$ 的精确值（以 $e$ 表示）。",
        type: "mcq",
        options: [R`$e^3$`, R`$e^7$`, R`$5e^{-2}$`, R`$e^{-2}$`],
        correctIndex: 0,
        hints: [
          R`提示 1 (2M)：写对数直线 $\ln P = (\ln b)t + \ln a$，对比斜率与截距：$\ln b = -0.4 \implies b = e^{-0.4}$，$\ln a = 5 \implies a = e^5$。`,
          R`提示 2 (1M + 1A)：直接代进直线算更快！当 $t = 5$ 时，$\ln P = -0.4(5) + 5 = -2 + 5 = 3$，故 $P = e^3$！`
        ],
        solutionHtml: R`
          <p>Taking natural logarithms on both sides of $P = ab^t$:</p>
          <p>$$\ln P = (\ln b)t + \ln a \quad \text{(1M)}$$</p>
          <p>From the graph, $\ln b = -0.4 \implies b = e^{-0.4}$ and $\ln a = 5 \implies a = e^5$. $\quad \text{(1M)}$ </p>
          <p>When $t = 5$: $P = e^5 (e^{-0.4})^5 = e^5 \cdot e^{-2} = e^3$. $\quad \text{(1M + 1A)}$ </p>
        `
      }
    }
  };
})();
