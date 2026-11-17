/* ==========================================================================
   Chapter 7: Definite Integration and Its Applications (定积分及其应用)
   Units 7.1, 7.2, 7.3 — Strictly aligned with Oxford M1A & HKDSE M1
   ========================================================================== */

(function () {
  const R = String.raw;
  const units = window.M1A_DATA.units;

  units["7.1"] = {
    id: "7.1",
    chapterId: "ch7",
    titleZh: "7.1 定积分、微积分基本定理与性质",
    titleEn: "Definite Integrals and Fundamental Theorem of Calculus",
    objectives: [
      "掌握微积分基本定理 <span class=\"term-en\">Fundamental Theorem of Calculus</span>：$\\int_a^b f(x)\\,dx = [F(x)]_a^b = F(b) - F(a)$；",
      "理解为什么定积分是一个<strong>具体数值</strong>且不再需要 $+C$（上下限相减时 $C - C = 0$）；",
      "熟练掌握定积分区间性质，以及用代换法算定积分时<strong>“同步更换上下限”</strong>的高效规范写法。"
    ],
    intuition: {
      title: "生活场景直觉：为什么算“从第 1 小时到第 3 小时一共走了多远”不用管起点在哪里？",
      storyHtml: R`
        <p>在 6.1 节里，如果你只知道汽车速度 $v(t)$，积分求出来的路程位置 $s(t) + C$ 必须知道起点海拔 $C$ 才定得下来。</p>
        <p>但假如现在问你：<strong>“汽车从第 1 小时到第 3 小时之间净开了多少公里？”</strong>那根本不需要知道起点在哪儿——用第 3 小时的里程表读数减去第 1 小时的读数就行了：$(F(3) + C) - (F(1) + C) = F(3) - F(1)$，讨厌的 $C$ 自动一笔勾销！</p>
        <p>这就是连接微分和定积分的伟大桥梁——<strong>微积分基本定理</strong>！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、定积分计算的标准化格式：$[F(x)]_a^b$</h4>
      <p>算出原函数 $F(x)$ 后，把它放进方括号里并在右下方写下限 $a$、右上方写上限 $b$：$\Bigl[F(x)\Bigr]_a^b = F(b) - F(a)$。</p>
      <p><strong>记住永远是“上限代值 减去 下限代值”</strong>！另外留意，即使被积函数长得一样，只要积分变量换成 $t$ 或 $u$，结果依然一模一样（积分变量只是哑变量 <span class="term-en">Dummy variable</span>）：$\int_a^b f(x)\,dx = \int_a^b f(t)\,dt$。</p>

      <h4>二、定积分换元法黄金法则：“换元同时换上下限！”</h4>
      <p>在第 6 章用代换法 <code>Let u = g(x)</code> 时，算完后必须把 $u$ 换回 $x$。但到了定积分，有一招帅气十倍的做法：<strong>把旧的 $x$ 上下限（$x=a, x=b$）直接代进 $u = g(x)$ 算出新的 $u$ 上下限！</strong></p>
      <p>这样整个积分完全变成一个关于 $u$ 的新定积分，算出 $u$ 的原函数后<strong>直接代入 $u$ 的上下限就得出最终数字</strong>，连换回 $x$ 那一步都省掉了！</p>
    `,
    formulas: [
      {
        label: "微积分基本定理 (Fundamental Theorem of Calculus)",
        latex: R`$$\int_a^b f(x)\,dx = \Bigl[F(x)\Bigr]_a^b = F(b) - F(a) \qquad \text{where } F'(x) = f(x)$$`,
        note: "定积分的结果是一个具体实数，<strong>不要在里面写 $+ C$</strong>！"
      },
      {
        label: "定积分四大核心性质 (Properties of Definite Integrals)",
        latex: R`$$\int_a^a f(x)\,dx = 0, \qquad \int_b^a f(x)\,dx = -\int_a^b f(x)\,dx, \qquad \int_a^b f(x)\,dx = \int_a^c f(x)\,dx + \int_c^b f(x)\,dx$$`,
        note: "记忆：上下限对调，前面立刻多一个负号！还有线性性质：$\\int_a^b [kf(x) \\pm g(x)]\\,dx = k\\int_a^b f(x)\\,dx \\pm \\int_a^b g(x)\\,dx$。"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 算 $\int_0^2 e^{2x}\,dx$ 时套进 $\left[\frac{1}{2}e^{2x}\right]_0^2$ 后以为 $x=0$ 那一项直接等于 0，漏掉 $-\frac{1}{2}e^0$！`,
        right: R`✅ <strong>代入下限 $0$ 时务必老老实实写出来算！</strong>$e^0 = 1$（不是 0！），$\cos 0 = 1$，所以结果是 $\frac{1}{2}e^4 - \frac{1}{2}(1) = \frac{1}{2}(e^4 - 1)$！`
      },
      {
        wrong: R`❌ 用代换法 $u = x^2 + 16$ 时把 $\int_0^3$ 原封不动抄成了 $\int_0^3 \frac{1}{2}u^{1/2}\,du$（旧的 $x$ 限配上新的 $u$ 变量）！`,
        right: R`✅ <strong>换元不换限，扣分一瞬间！</strong>只要把积分号里的变量变成 $u$，就必须在旁边写明：<code>When x = 0, u = 16; when x = 3, u = 25</code>，同步把积分上下限改写成 $\int_{16}^{25}$！`
      }
    ],
    examples: [
      {
        title: "Example 1 · 多项式定积分 + 换元同步换限标准步骤",
        promptEn: R`Evaluate:<br>(a) $\displaystyle\int_1^3 (3x^2 - 4x + 5)\,dx$<br>(b) $\displaystyle\int_0^3 x\sqrt{x^2 + 16}\,dx$`,
        promptZh: "计算下列两个定积分。",
        steps: [
          {
            math: R`$$\text{(a) } \int_1^3 (3x^2 - 4x + 5)\,dx = \Bigl[x^3 - 2x^2 + 5x\Bigr]_1^3$$`,
            why: "先求出原函数放进方括号，标好上下限。"
          },
          {
            math: R`$$= \bigl(3^3 - 2(3)^2 + 5(3)\bigr) - \bigl(1^3 - 2(1)^2 + 5(1)\bigr) = (27 - 18 + 15) - (1 - 2 + 5) = 24 - 4 = 20$$`,
            why: "上限代入值减去下限代入值（下限整个用括号包住以免减号变号出错）。"
          },
          {
            math: R`$$\text{(b) Let } u = x^2 + 16. \quad du = 2x\,dx \implies x\,dx = \frac{1}{2}\,du$$`,
            why: "设根号内部为 $u$，写出微分变换。"
          },
          {
            math: R`$$\text{When } x = 0,\; u = 16; \quad \text{when } x = 3,\; u = 25$$`,
            why: "核心得分步：同步换算出 $u$ 的新下限与新上限！"
          },
          {
            math: R`$$\int_{16}^{25} \frac{1}{2}u^{\frac{1}{2}}\,du = \frac{1}{2}\left[\frac{2}{3}u^{\frac{3}{2}}\right]_{16}^{25} = \frac{1}{3}\bigl(25^{\frac{3}{2}} - 16^{\frac{3}{2}}\bigr) = \frac{1}{3}(125 - 64) = \frac{61}{3}$$`,
            why: "直接用新上下限 $[16, 25]$ 计算（$25^{3/2} = 5^3 = 125$，$16^{3/2} = 4^3 = 64$），干脆利落！"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "6.1", label: "6.1 基本积分" }, { id: "6.2", label: "6.2 代换积分法" }],
      next: [
        { id: "7.2", label: "7.2 定积分算曲线围成的面积" },
        { id: "7.3", label: "7.3 梯形法则近似定积分" }
      ],
      summary: "有了精准计算定积分的能力后，7.2 节我们立刻把它转化为几何武器——求各种曲线与直线围出来的面积！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（定积分区间性质）",
        promptEn: R`Given that $\displaystyle\int_1^4 f(x)\,dx = 10$ and $\displaystyle\int_1^7 f(x)\,dx = 28$, find $\displaystyle\int_7^4 f(x)\,dx$.`,
        promptZh: "已知 $\\int_1^4 f(x)\\,dx = 10$ 且 $\\int_1^7 f(x)\\,dx = 28$，问 $\\int_7^4 f(x)\\,dx$ 等于多少？",
        options: [R`$-18$`, R`$18$`, R`$38$`, R`$-38$`],
        correctIndex: 0,
        feedbackCorrect: R`反应神速！先用区间可加性算出 $\int_4^7 f(x)\,dx = 28 - 10 = 18$；注意题目问的是上下限倒过来的 $\int_7^4$，所以加负号变成 $-18$！`,
        feedbackWrong: R`分两步看：首先 $\int_1^7 = \int_1^4 + \int_4^7 \implies \int_4^7 f(x)\,dx = 28 - 10 = 18$；然后仔细看题目上下限是从 $7$ 到 $4$（倒着写！），所以 $\int_7^4 = -\int_4^7 = -18$！`
      },
      stage2: {
        title: "基础模仿练（指数定积分与下限代 0 检验）",
        promptEn: R`Evaluate $\displaystyle\int_0^2 e^{2x}\,dx$ in exact form in terms of $e$.`,
        promptZh: "计算定积分 $\\int_0^2 e^{2x}\\,dx$，结果以含 $e$ 的精确形式表示。",
        type: "mcq",
        options: [
          R`$\dfrac{1}{2}(e^4 - 1)$`,
          R`$\dfrac{1}{2}e^4$`,
          R`$2(e^4 - 1)$`,
          R`$e^4 - 1$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：原函数是 $\frac{1}{2}e^{2x}$。`,
          R`提示 2：代入上限 $2$ 与下限 $0$：$\frac{1}{2}e^4 - \frac{1}{2}e^0$，千万记得 $e^0 = 1$ 而不是 $0$！`
        ],
        solutionHtml: R`
          <p>$$\int_0^2 e^{2x}\,dx = \left[\frac{1}{2}e^{2x}\right]_0^2 = \frac{1}{2}e^4 - \frac{1}{2}e^0 = \frac{1}{2}(e^4 - 1)$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Using substitution, evaluate $\displaystyle\int_0^1 \frac{6x}{x^2 + 1}\,dx$. Express your answer in the form $k\ln 2$.`,
        promptZh: "用代换法计算 $\\int_0^1 \\frac{6x}{x^2 + 1}\\,dx$，答案写成 $k\\ln 2$ 的形式。",
        type: "mcq",
        options: [R`$3\ln 2$`, R`$6\ln 2$`, R`$\frac{3}{2}\ln 2$`, R`$\ln 2$`],
        correctIndex: 0,
        hints: [
          R`提示 1 (1M)：设 $u = x^2 + 1$，则 $du = 2x\,dx \implies 6x\,dx = 3\,du$。`,
          R`提示 2 (1M + 1A)：换上下限：$x=0 \implies u=1$；$x=1 \implies u=2$。积分变为 $\int_1^2 \frac{3}{u}\,du = [3\ln u]_1^2 = 3(\ln 2 - \ln 1)$！`
        ],
        solutionHtml: R`
          <p>Let $u = x^2 + 1$. Then $du = 2x\,dx \implies 6x\,dx = 3\,du$. $\quad \text{(1M)}$ </p>
          <p>When $x = 0$, $u = 1$; when $x = 1$, $u = 2$.</p>
          <p>$$\int_0^1 \frac{6x}{x^2 + 1}\,dx = \int_1^2 \frac{3}{u}\,du = \Bigl[3\ln u\Bigr]_1^2 \quad \text{(1M)}$$</p>
          <p>$$= 3(\ln 2 - \ln 1) = 3\ln 2 \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["7.2"] = {
    id: "7.2",
    chapterId: "ch7",
    titleZh: "7.2 定积分的几何应用：曲线围成的面积",
    titleEn: "Applications: Area Bounded by Curves and Lines",
    objectives: [
      "分清“带正负号的有向积分值 <span class=\"term-en\">Signed Area</span>”与“真正的几何面积 <span class=\"term-en\">Area</span>”（面积永远非负！）；",
      "学会处理曲线落在 $x$ 轴下方或跨过 $x$ 轴的情况（分段拆开，下方部分前面加负号）；",
      "熟练掌握求两条曲线之间封闭面积的黄金口诀：<strong>先求交点定上下限，再用“上曲线减下曲线”积分</strong> $\\int_a^b [f_{\\text{upper}}(x) - g_{\\text{lower}}(x)]\\,dx$。"
    ],
    intuition: {
      title: "生活场景直觉：为什么算面积不能闭着眼直接把积分上下限一写就完事？",
      storyHtml: R`
        <p>想象你在给一块波浪形花坛刷油漆：如果花坛在公路（$x$ 轴）上方有 $5\text{ m}^2$，在公路下方有 $3\text{ m}^2$。</p>
        <p>如果你闭着眼睛直接把整个区间 $[0, 4]$ 丢进定积分 $\int_0^4 f(x)\,dx$，定积分就像个严格的会计，会把下方的高度 $y < 0$ 当成“亏空”，算出 $5 + (-3) = 2$！</p>
        <p>但刷油漆可不管你在公路上面还是下面，<strong>两块加起来总共要刷 $5 + 3 = 8\text{ m}^2$！</strong>所以遇到曲线跑到 $x$ 轴下方时，必须先把穿过 $x$ 轴的交点找出来分段，在下方那段前面加上负号把面积掰正！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、求平面区域面积的三类经典图形</h4>
      <ol>
        <li><strong>曲线全部在 $x$ 轴上方（$f(x) \ge 0$）</strong>：$\text{Area} = \int_a^b f(x)\,dx$。</li>
        <li><strong>曲线落在 $x$ 轴下方（$f(x) \le 0$）</strong>：直接积出来是负数，必须在积分号前面加负号：$\text{Area} = -\int_a^b f(x)\,dx = \int_a^b \bigl[-f(x)\bigr]\,dx$。</li>
        <li><strong>两条曲线 $y = f(x)$ 与 $y = g(x)$ 夹出来的封闭面积</strong>：
          <ul>
            <li><strong>Step 1</strong>：联立方程 $f(x) = g(x)$ 解出交点横坐标 $x = a$ 和 $x = b$；</li>
            <li><strong>Step 2</strong>：画草图或代中点试探，判断在 $[a, b]$ 内哪条曲线在<strong>上面（Upper）</strong>、哪条在<strong>下面（Lower）</strong>；</li>
            <li><strong>Step 3</strong>：套用公式 $\text{Area} = \int_a^b (\text{上函数} - \text{下函数})\,dx$。（只要写对了上减下，哪怕图形部分在 $x$ 轴下方也不必操心，因为“上减去下”的竖条高度永远是正的！）</li>
          </ul>
        </li>
      </ol>
    `,
    formulas: [
      {
        label: "曲线下面积与双曲线间面积 (Area Formulas)",
        latex: R`$$\text{Below } x\text{-axis: } A = -\int_a^b f(x)\,dx; \qquad \text{Between curves: } A = \int_a^b \bigl[f_{\text{upper}}(x) - g_{\text{lower}}(x)\bigr]\,dx$$`,
        note: "实用小技巧：计算面积的最终数值<strong>绝对不可能是负数或零</strong>！如果算出来是负数，99% 是“上减下写反”或者“漏了在 $x$ 轴下方加负号”！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 算 $y = x^2 - 4$ 在 $[0, 3]$ 上与 $x$ 轴围成的总面积时，直接算一个大积分 $\int_0^3 (x^2 - 4)\,dx$。`,
        right: R`✅ 先解 $x^2 - 4 = 0$ 发现它在 $x = 2$ 穿过了 $x$ 轴！在 $[0, 2]$ 位于下方（加负号），在 $[2, 3]$ 位于上方（正号），必须拆成两段积分相加：$\int_0^2 (4 - x^2)\,dx + \int_2^3 (x^2 - 4)\,dx$！`
      },
      {
        wrong: R`❌ 求两曲线围成面积时忘记先联立求交点，或者搞错哪条线在上面。`,
        right: R`✅ 在考试草稿纸上永远随手画个简易草图标明交点和上下位置！`
      }
    ],
    syllabusGuard: "HKDSE M1 考纲边界：M1 的定积分几何应用<strong>只考查二维平面图形面积</strong>，<strong>不考</strong>绕坐标轴旋转形成的立体旋转体体积（Volume of revolution）！",
    examples: [
      {
        title: "Example 1 · $x$ 轴下方区域 + 抛物线与直线围成面积",
        promptEn: R`(a) Find the area bounded by $y = x^2 - 4$, the $x$-axis, and the lines $x = 0$ and $x = 2$.<br>(b) Find the area of the region enclosed by the curve $y = 6 - x^2$ and the line $y = x$.`,
        promptZh: "（a）求 $y = x^2 - 4$ 在 $[0, 2]$ 与 $x$ 轴围成区域的面积。（b）求曲线 $y = 6 - x^2$ 与直线 $y = x$ 围成的封闭区域面积。",
        steps: [
          {
            math: R`$$\text{(a) For } 0 \le x \le 2,\; x^2 - 4 \le 0 \implies \text{Area} = -\int_0^2 (x^2 - 4)\,dx = \int_0^2 (4 - x^2)\,dx$$`,
            why: "检查区间 $[0, 2]$ 内曲线全在 $x$ 轴下方，所以在积分前加负号保证面积为正。"
          },
          {
            math: R`$$= \left[4x - \frac{x^3}{3}\right]_0^2 = \left(8 - \frac{8}{3}\right) - 0 = \frac{16}{3}$$`,
            why: "计算定积分得出面积为 $\\frac{16}{3}$。"
          },
          {
            math: R`$$\text{(b) } 6 - x^2 = x \implies x^2 + x - 6 = 0 \implies (x + 3)(x - 2) = 0 \implies x = -3 \text{ or } 2$$`,
            why: "第一步联立两方程，找到两个交点 $x = -3$ 与 $x = 2$。"
          },
          {
            math: R`$$\text{Area} = \int_{-3}^2 \bigl[(6 - x^2) - x\bigr]\,dx = \left[6x - \frac{x^3}{3} - \frac{x^2}{2}\right]_{-3}^2 = \frac{22}{3} - \left(-\frac{27}{2}\right) = \frac{125}{6}$$`,
            why: "试探 $x=0$ 可知开口向下的抛物线 $6-x^2=6$ 在直线 $y=0$ 上方，于是用上减下积分得 $\\frac{125}{6}$。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "7.1", label: "7.1 微积分基本定理" }],
      next: [{ id: "7.3", label: "7.3 算不出原函数面积时：梯形法则救场！" }],
      summary: "学会求面积后，你可能会遇到有些真实世界的曲线（比如 $y = e^{x^2}$ 或正态分布钟形曲线）根本积不出来原函数！别急，7.3 节“梯形法则”正式压轴登场！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（分清定积分与总面积）",
        promptEn: R`In the graph of $y = f(x)$, the area above the $x$-axis on $[0, 2]$ is $5$, and the area below the $x$-axis on $[2, 4]$ is $3$. What are $\displaystyle\int_0^4 f(x)\,dx$ and the total enclosed area on $[0, 4]$?`,
        promptZh: "已知 $y = f(x)$ 在 $[0, 2]$ 位于 $x$ 轴上方面积为 $5$，在 $[2, 4]$ 位于 $x$ 轴下方面积为 $3$。那么 $\\int_0^4 f(x)\\,dx$ 与总面积分别是多少？",
        options: [
          R`Integral $= 2$, Total area $= 8$`,
          R`Integral $= 8$, Total area $= 8$`,
          R`Integral $= 2$, Total area $= 2$`,
          R`Integral $= -2$, Total area $= 8$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`概念彻底通透！直接算大积分会正负抵消（$5 - 3 = 2$）；而算总面积要把两块几何面积相加（$5 + 3 = 8$）！`,
        feedbackWrong: R`记住：定积分是“代数净和”（$x$ 轴上方算正 $+5$，下方算负 $-3$，合计 $2$）；而几何面积永远都是正的相加（$5 + 3 = 8$）。`
      },
      stage2: {
        title: "基础模仿练（指数曲线下面积）",
        promptEn: R`Find the area of the region bounded by the curve $y = e^x$, the $x$-axis, and the vertical lines $x = 0$ and $x = \ln 3$.`,
        promptZh: "求曲线 $y = e^x$、$x$ 轴以及竖直线 $x = 0$ 和 $x = \\ln 3$ 所围成区域的面积。",
        type: "input",
        acceptedAnswers: ["2"],
        inputPlaceholder: "输入面积数值",
        hints: [
          R`提示 1：因为 $e^x > 0$ 全程在 $x$ 轴上方，面积直接等于 $\int_0^{\ln 3} e^x\,dx$。`,
          R`提示 2：原函数还是 $e^x$，利用恒等式 $e^{\ln 3} = 3$ 与 $e^0 = 1$！`
        ],
        solutionHtml: R`
          <p>$$\text{Area} = \int_0^{\ln 3} e^x\,dx = \Bigl[e^x\Bigr]_0^{\ln 3} = e^{\ln 3} - e^0 = 3 - 1 = 2$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Find the area of the finite region enclosed by the curve $y = x^2$ and the straight line $y = 2x$.`,
        promptZh: "求抛物线 $y = x^2$ 与直线 $y = 2x$ 所围成封闭图形的面积。",
        type: "input",
        acceptedAnswers: ["4/3"],
        inputPlaceholder: "输入最简分数，如 4/3",
        hints: [
          R`提示 1 (1M)：先联立 $x^2 = 2x$ 求交点，解得 $x = 0$ 和 $x = 2$。`,
          R`提示 2 (1M + 1A)：取 $x = 1$ 一看，$2x = 2 > x^2 = 1$，所以直线在上、抛物线在下！计算 $\int_0^2 (2x - x^2)\,dx$。`
        ],
        solutionHtml: R`
          <p>Solving $x^2 = 2x \implies x(x - 2) = 0 \implies x = 0 \text{ or } x = 2$. $\quad \text{(1M)}$ </p>
          <p>For $0 \le x \le 2$, $2x \ge x^2$ (upper curve minus lower curve):</p>
          <p>$$\text{Area} = \int_0^2 (2x - x^2)\,dx = \left[x^2 - \frac{x^3}{3}\right]_0^2 \quad \text{(1M)}$$</p>
          <p>$$= \left(4 - \frac{8}{3}\right) - 0 = \frac{4}{3} \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["7.3"] = {
    id: "7.3",
    chapterId: "ch7",
    titleZh: "7.3 梯形法则与高估/低估深度闭环（课本封面同款！）",
    titleEn: "Trapezoidal Rule and Over- / Under-estimate Analysis",
    objectives: [
      "理解为什么某些函数（如 $e^{x^2}$）需要用梯形法则 <span class=\"term-en\">Trapezoidal Rule</span> 进行数值近似；",
      "精准区分<strong>子区间个数 $n$（<span class=\"term-en\">sub-intervals</span>）</strong>与<strong>纵坐标点个数 $n+1$（<span class=\"term-en\">ordinates</span>）</strong>，熟记课本公式；",
      "打通全书终极闭环：结合第 5 章的二阶导数 $f''(x)$ 凹凸性，严密判断梯形法则是高估（<span class=\"term-en\">Over-estimate</span>）还是低估（<span class=\"term-en\">Under-estimate</span>）。"
    ],
    intuition: {
      title: "生活场景直觉：把这本 M1A 课本封面拿在手里看！封面画的正是这一节！",
      storyHtml: R`
        <p>快低头看看你的牛津 M1A 教材封面：上面那条橙黄色的曲线 $y = f(x)$ 下方，从 $a = x_0$ 到 $x_n = b$ 被垂直切成了好几根细长的<strong>竖直梯形条</strong>！</p>
        <p>为什么要用梯形去拼面积？因为在现实世界与下册 M1B 正态分布中，有很多重要积分（比如 $\int e^{x^2}\,dx$ 或 $\int e^{-x^2/2}\,dx$）在数学上<strong>根本找不到初等原函数</strong>！既然算不出精确解析式，我们就把 $[a, b]$ 切成 $n$ 等份窄条，把顶部弯弯的曲线近似看成一条直斜边，算出 $n$ 个梯形的面积加起来！</p>
        <p>而且你一眼就能看出来：<strong>如果曲线像笑脸碗一样向上凹（$f''(x) > 0$），拉直的梯形顶边就会搭在曲线“上方”，面积算多了（高估）；如果曲线像拱桥一样向下凹（$f''(x) < 0$），梯形顶边就会缩在曲线“里面”，面积算少了（低估）！</strong></p>
      `
    },
    conceptsHtml: R`
      <h4>一、为什么公式里“首尾乘 1，中间全乘 2”？</h4>
      <p>把每条小梯形（宽 $h = \frac{b-a}{n}$）的面积公式 $\frac{1}{2}(\text{上底}+\text{下底})\times h$ 排排队加起来：</p>
      <p>$$\frac{h}{2}(y_0+y_1) + \frac{h}{2}(y_1+y_2) + \frac{h}{2}(y_2+y_3) + \cdots + \frac{h}{2}(y_{n-1}+y_n)$$</p>
      <p>看！最左边的 $y_0$ 和最右边的 $y_n$ 各自只当了 1 次边，而夹在中间的所有内部分割线 $y_1, y_2, \dots, y_{n-1}$ 既当左边梯形的下底、又当右边梯形的上底，被算了 <strong>2 次</strong>！合起来就是课本里的优美公式！</p>

      <h4>二、HKDSE 压轴闭环：用 $f''(x)$ 解释 Over-estimate / Under-estimate</h4>
      <p>在公开考试中，算完梯形估计值之后紧接着必考问：<em>“Is your estimate an over-estimate or an under-estimate? Explain your answer.”</em> 标准满分解答模板必须包含三个元素：</p>
      <ol>
        <li>计算并判定区间 $[a, b]$ 上 <strong>$f''(x)$ 的正负号</strong>；</li>
        <li>说出曲线在该区间上的<strong>凹凸性</strong>（<code>concave upwards</code> / <code>concave downwards</code>）；</li>
        <li>得出结论是 <code>over-estimate</code> 还是 <code>under-estimate</code>！</li>
      </ol>
    `,
    formulas: [
      {
        label: "牛津课本标准梯形法则公式 (Trapezoidal Rule)",
        latex: R`$$\int_a^b f(x)\,dx \approx \frac{h}{2}\Bigl[y_0 + y_n + 2(y_1 + y_2 + \cdots + y_{n-1})\Bigr], \quad \text{where } h = \frac{b - a}{n}$$`,
        note: "其中 $n$ 是<strong>子区间（strips / sub-intervals）的个数</strong>，$x_i = a + ih$，$y_i = f(x_i)$。"
      },
      {
        label: "高估 / 低估判定铁律 (Concavity Error Rule)",
        latex: R`$$\begin{aligned} f''(x) > 0 \text{ on } [a, b] &\implies \text{concave upwards} \implies \text{Over-estimate (近似值} > \text{真实值)} \\ f''(x) < 0 \text{ on } [a, b] &\implies \text{concave downwards} \implies \text{Under-estimate (近似值} < \text{真实值)} \end{aligned}$$`,
        note: "⚠️ <strong>绝对不能用 $f'(x)$ 的增减性来判断高估低估！</strong>上升的曲线可以是凹向上的（如 $e^x$，高估），也可以是凹向下的（如 $\\ln x$，低估）！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 题目说“with 4 sub-intervals”，却错把 $n$ 搞成点的个数（或者只算 4 个 $y$ 值），或者用错 $h$ 写成 $\frac{b-a}{n-1}$。`,
        right: R`✅ <strong>$4$ sub-intervals = 切成 4 块 = 有 $4 + 1 = 5$ 个节点（$x_0, x_1, x_2, x_3, x_4$）</strong>，每步宽度永远是 $h = \frac{b - a}{n}$！`
      },
      {
        wrong: R`❌ 看到曲线递增（$f'(x) > 0$）就乱答“所以梯形法则是高估”。`,
        right: R`✅ 高估还是低估<strong>只看曲线弯曲方向 $f''(x)$</strong>，跟它上升还是下降（$f'(x)$）毫无关系！请去下方实验室切换 $e^{0.5x}$（凹向上）和 $\\ln(x+2)$（凹向下），两条都在上升，结果正好相反！`
      }
    ],
    examples: [
      {
        title: "Example 1 · 梯形法则估算 + 二阶导数判高估（完整 HKDSE 压轴格式）",
        promptEn: R`Let $f(x) = e^{0.5x^2}$.<br>(a) Use the trapezoidal rule with $4$ sub-intervals to estimate $\displaystyle\int_0^2 e^{0.5x^2}\,dx$, correct to $3$ decimal places.<br>(b) Determine whether the estimate in (a) is an over-estimate or an under-estimate. Explain your answer.`,
        promptZh: "设 $f(x) = e^{0.5x^2}$。（a）用含 4 个子区间的梯形法则估算 $\\int_0^2 e^{0.5x^2}\\,dx$（准确至 3 位小数）。（b）判断该估计是高估还是低估，并给出理由。",
        steps: [
          {
            math: R`$$h = \frac{2 - 0}{4} = 0.5; \quad x_0=0,\; x_1=0.5,\; x_2=1,\; x_3=1.5,\; x_4=2$$`,
            why: "先算步长 $h = 0.5$，列齐所有 $4 + 1 = 5$ 个分点。"
          },
          {
            math: R`$$\begin{aligned} &y_0 = e^0 = 1, \quad y_1 = e^{0.125} \approx 1.133148, \quad y_2 = e^{0.5} \approx 1.648721, \\ &y_3 = e^{1.125} \approx 3.080217, \quad y_4 = e^2 \approx 7.389056 \end{aligned}$$`,
            why: "中间计算多保留几位小数（至少 5–6 位），避免提前四舍五入造成累积误差。"
          },
          {
            math: R`$$\int_0^2 e^{0.5x^2}\,dx \approx \frac{0.5}{2}\Bigl[1 + 7.389056 + 2(1.133148 + 1.648721 + 3.080217)\Bigr] \approx 5.028 \text{ (corr. to 3 d.p.)}$$`,
            why: "代入梯形法则公式，首尾乘 1、中间三个乘 2，再乘以 $\\frac{h}{2} = 0.25$。"
          },
          {
            math: R`$$f'(x) = x e^{0.5x^2}, \qquad f''(x) = x(x e^{0.5x^2}) + e^{0.5x^2} = (x^2 + 1)e^{0.5x^2}$$`,
            why: "用积法则算出二阶导数 $f''(x)$。"
          },
          {
            math: R`$$\text{Since } (x^2+1)>0 \text{ and } e^{0.5x^2}>0 \text{ for } 0 \le x \le 2,\; f''(x) > 0.$$`,
            why: "标准英语结论：Since $f''(x) > 0$ on $[0, 2]$, the curve is concave upwards. Therefore, the estimate in (a) is an <strong>over-estimate</strong>."
          }
        ]
      }
    ],
    labId: "lab_trapezoid",
    connections: {
      prereq: [
        { id: "5.4", label: "5.4 凹凸性与二阶导数 f''(x)" },
        { id: "7.2", label: "7.2 定积分即曲线下面积" }
      ],
      next: [],
      summary: "🎉 恭喜！这是全本 M1A 最精彩的收官闭环——你在第 5 章学到的 $f''(x)$ 与第 7 章的定积分在课本封面的梯形图中完美汇合！接下来就将自然衔接下册 M1B（概率与统计）的连续分布曲线下面积！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（子区间数与节点数陷阱）",
        promptEn: R`To apply the trapezoidal rule with $6$ sub-intervals on $[1, 4]$, what is $h$ and how many $y$-values ($y_0, y_1, \dots$) do you need to compute?`,
        promptZh: "在区间 $[1, 4]$ 上使用包含 $6$ 个子区间的梯形法则时，步长 $h$ 是多少？需要计算多少个 $y$ 值？",
        options: [
          R`$h = 0.5$, and $7$ $y$-values ($y_0$ to $y_6$)`,
          R`$h = 0.5$, and $6$ $y$-values ($y_0$ to $y_5$)`,
          R`$h = 0.6$, and $6$ $y$-values`,
          R`$h = 0.5$, and $5$ $y$-values`
        ],
        correctIndex: 0,
        feedbackCorrect: R`太稳了！$h = \frac{4 - 1}{6} = 0.5$，而 6 个区间一共有 $6 + 1 = 7$ 条竖线（从 $y_0$ 数到 $y_6$），绝对不会数错！`,
        feedbackWrong: R`拿手指比划一下：切 1 刀分成 2 段需要 3 个端点（左、中、右）；所以分成 6 个子区间就需要 $6 + 1 = 7$ 个纵坐标值！步长 $h = \frac{4 - 1}{6} = 0.5$。`
      },
      stage2: {
        title: "基础模仿练（纯手算梯形法则）",
        promptEn: R`Use the trapezoidal rule with $2$ sub-intervals to estimate $\displaystyle\int_1^3 \frac{1}{x}\,dx$. Give your answer as an exact fraction.`,
        promptZh: "使用包含 $2$ 个子区间的梯形法则估算 $\\int_1^3 \\frac{1}{x}\\,dx$，结果写成分数形式。",
        type: "input",
        acceptedAnswers: ["7/6"],
        inputPlaceholder: "输入最简分数，如 7/6",
        hints: [
          R`提示 1：$h = \frac{3 - 1}{2} = 1$，三个分点为 $x_0 = 1, x_1 = 2, x_2 = 3$。`,
          R`提示 2：算出 $y_0 = 1, y_1 = \frac{1}{2}, y_2 = \frac{1}{3}$，代入 $\frac{1}{2}\bigl[1 + \frac{1}{3} + 2(\frac{1}{2})\bigr]$！`
        ],
        solutionHtml: R`
          <p>$$h = \frac{3 - 1}{2} = 1; \quad y_0 = 1,\; y_1 = \frac{1}{2},\; y_2 = \frac{1}{3}$$</p>
          <p>$$\int_1^3 \frac{1}{x}\,dx \approx \frac{1}{2}\left[1 + \frac{1}{3} + 2\left(\frac{1}{2}\right)\right] = \frac{1}{2}\left(\frac{7}{3}\right) = \frac{7}{6}$$</p>
          <p class="formula-note">拓展思考：因为 $f''(x) = \frac{2}{x^3} > 0$，所以 $\frac{7}{6} \approx 1.167$ 略大于精确值 $\ln 3 \approx 1.099$（Over-estimate）！</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Consider $\displaystyle\int_0^2 \ln(x + 2)\,dx$. Using the trapezoidal rule with $4$ sub-intervals (correct to $3$ decimal places) and the second derivative $f''(x)$ of $f(x) = \ln(x+2)$, which conclusion is completely correct?`,
        promptZh: "用含 $4$ 个子区间的梯形法则估算 $\\int_0^2 \\ln(x + 2)\\,dx$（取 3 位小数），并结合 $f(x) = \\ln(x+2)$ 的二阶导数判断高估或低估，选出完全正确的一项：",
        type: "mcq",
        options: [
          R`$\approx 2.154$; under-estimate because $f''(x) = -\dfrac{1}{(x+2)^2} < 0$ (concave downwards)`,
          R`$\approx 2.154$; over-estimate because $f''(x) = -\dfrac{1}{(x+2)^2} < 0$`,
          R`$\approx 2.154$; over-estimate because $f'(x) = \dfrac{1}{x+2} > 0$ (increasing)`,
          R`$\approx 4.307$; under-estimate because $f''(x) < 0$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1 (2M)：$h = 0.5$，$y_0=\ln 2, y_1=\ln 2.5, y_2=\ln 3, y_3=\ln 3.5, y_4=\ln 4$，代入公式乘以 $\frac{h}{2} = 0.25$ 得 $2.15369\dots \approx 2.154$（选项 D 忘了除以 2！）。`,
          R`提示 2 (2M)：$f'(x) = \frac{1}{x+2} \implies f''(x) = -\frac{1}{(x+2)^2} < 0$，说明曲线凹向下（concave downwards），梯形顶边缩在曲线下面 $\implies$ <strong>under-estimate</strong>（别被 $f'(x) > 0$ 递增迷惑！）。`
        ],
        solutionHtml: R`
          <p>(a) $h = \frac{2-0}{4} = 0.5$. Evaluating at $x = 0, 0.5, 1, 1.5, 2$:</p>
          <p>$$\text{Estimate} = \frac{0.5}{2}\Bigl[\ln 2 + \ln 4 + 2(\ln 2.5 + \ln 3 + \ln 3.5)\Bigr] \approx 2.154 \quad \text{(2M)}$$</p>
          <p>(b) $f'(x) = \frac{1}{x + 2} \implies f''(x) = -\frac{1}{(x + 2)^2} < 0$ for all $0 \le x \le 2$. $\quad \text{(1M)}$ </p>
          <p>Since $f''(x) < 0$ on $[0, 2]$, the curve is concave downwards. Therefore, the estimate is an <strong>under-estimate</strong>. $\quad \text{(1A)}$ </p>
        `
      }
    }
  };
})();
