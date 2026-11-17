/* ==========================================================================
   Chapter 5: Applications of Differentiation (微分法的应用)
   Units 5.1 – 5.6 — Strictly aligned with Oxford M1A & HKDSE M1
   ========================================================================== */

(function () {
  const R = String.raw;
  const units = window.M1A_DATA.units;

  units["5.1"] = {
    id: "5.1",
    chapterId: "ch5",
    titleZh: "5.1 曲线的切线与法线方程",
    titleEn: "Equations of Tangents and Normals",
    objectives: [
      "明确切线 <span class=\"term-en\">Tangent</span> 斜率就是函数在该点的导数值 $m_T = \\left.\\frac{dy}{dx}\\right|_{x=x_0}$；",
      "理解法线 <span class=\"term-en\">Normal</span> 与切线在切点处互相垂直，斜率满足负倒数关系 $m_N = -\\frac{1}{m_T}$；",
      "用点斜式 $y - y_0 = m(x - x_0)$ 写出标准直线方程，并能处理“切线与某直线平行”的反求切点题。"
    ],
    intuition: {
      title: "生活场景直觉：过山车脱轨飞出去的方向 vs 垂直支撑钢柱",
      storyHtml: R`
        <p>想象过山车在轨道曲线 $y = f(x)$ 的某一点 $(x_0, y_0)$ 疾驰而过：</p>
        <ul>
          <li>如果这一瞬间车轮脱轨沿着惯性直直飞出去，飞行的直线就是该点的<strong>切线（Tangent）</strong>，它的倾斜方向（斜率）恰好由导数 $f'(x_0)$ 决定。</li>
          <li>而从这一点竖立一根严格垂直于轨道面的支撑力臂，就是<strong>法线（Normal）</strong>！两条互相垂直的直线斜率之积等于 $-1$，所以只要把切线斜率“倒过来加个负号”，法线斜率瞬间到手！</li>
        </ul>
      `
    },
    conceptsHtml: R`
      <h4>一、求切线与法线的四步流水线</h4>
      <ol>
        <li><strong>找齐坐标 $(x_0, y_0)$</strong>：如果题干只给了 $x_0$，先代入原曲线 $y = f(x)$ 算出 $y_0$（千万别代进导数里算 $y_0$！）；</li>
        <li><strong>算切线斜率 $m_T$</strong>：求导 $\frac{dy}{dx}$ 后代入 $x = x_0$ 得出一个具体数字 $m_T$；</li>
        <li><strong>写切线方程</strong>：套用点斜式 $y - y_0 = m_T(x - x_0)$；</li>
        <li><strong>写法线方程</strong>：当 $m_T \neq 0$ 时，法线斜率 $m_N = -\frac{1}{m_T}$，再过同一点 $(x_0, y_0)$ 写 $y - y_0 = m_N(x - x_0)$。</li>
      </ol>
      <p><em>特殊情况提醒</em>：如果算出切线斜率 $m_T = 0$，切线是一条水平线 $y = y_0$，而法线是一条竖直线 $x = x_0$（此时不能用点斜式写 $-\frac{1}{0}$！）。</p>
    `,
    formulas: [
      {
        label: "切线斜率与方程 (Tangent at (x₀, y₀))",
        latex: R`$$m_T = f'(x_0) = \left.\frac{dy}{dx}\right|_{x=x_0}, \qquad y - y_0 = m_T(x - x_0)$$`,
        note: "最终答案写成 $y = mx + c$ 或一般式 $Ax + By + C = 0$ 均可。"
      },
      {
        label: "法线斜率与方程 (Normal at (x₀, y₀))",
        latex: R`$$m_T \cdot m_N = -1 \implies m_N = -\frac{1}{m_T} \;\; (m_T \neq 0), \qquad y - y_0 = m_N(x - x_0)$$`,
        note: "注意切线与法线经过的是同一个切点 $(x_0, y_0)$！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 直接把函数式 $f'(x) = 2x - 4$ 写进点斜式：$y - 2 = (2x - 4)(x - 3)$，写出一条根本不是直线的二次方程！`,
        right: R`✅ <strong>直线方程的斜率 $m$ 必须是代入 $x = x_0$ 后算出来的纯数字！</strong>务必先代入 $x = 3$ 算出 $m_T = 2$，再写 $y - 2 = 2(x - 3)$。`
      },
      {
        wrong: R`❌ 题干问“平行于直线 $2x - y + 7 = 0$”时，直接读系数 $2$ 或 $-1$，没先把直线改写为 $y = mx + c$。`,
        right: R`✅ 求直线斜率先把 $y$ 孤立出来：$y = 2x + 7 \implies$ 斜率 $m = 2$；若问垂直，则切线斜率等于 $-\frac{1}{2}$。`
      }
    ],
    examples: [
      {
        title: "Example 1 · 同时求切线与法线方程",
        promptEn: R`Find the equations of the tangent and the normal to the curve $y = x^2 - 4x + 5$ at the point where $x = 3$.`,
        promptZh: "求曲线 $y = x^2 - 4x + 5$ 在 $x = 3$ 处的切线方程与法线方程。",
        steps: [
          {
            math: R`$$\text{When } x = 3,\; y = 3^2 - 4(3) + 5 = 2 \implies \text{Point is } (3, 2)$$`,
            why: "第一步先代入原函数求出切点纵坐标 $y_0 = 2$。"
          },
          {
            math: R`$$\frac{dy}{dx} = 2x - 4 \implies m_T = \left.\frac{dy}{dx}\right|_{x=3} = 2(3) - 4 = 2$$`,
            why: "第二步求导并代入 $x = 3$ 得到切线斜率 $m_T = 2$。"
          },
          {
            math: R`$$\text{Tangent: } y - 2 = 2(x - 3) \implies 2x - y - 4 = 0 \;\; (\text{or } y = 2x - 4)$$`,
            why: "套用点斜式写出切线方程。"
          },
          {
            math: R`$$\text{Normal: } m_N = -\frac{1}{2}, \quad y - 2 = -\frac{1}{2}(x - 3) \implies x + 2y - 7 = 0$$`,
            why: "取负倒数 $m_N = -\\frac{1}{2}$ 写出法线方程并两边乘 $2$ 整理。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "3.3", label: "3.3 幂法则求导" }, { id: "4.3", label: "4.3 eˣ/ln x 求导" }],
      next: [{ id: "5.2", label: "5.2 切线斜率正负号决定函数上升还是下降" }],
      summary: "掌握单点切线斜率后，下一节把视野放大到整段区间：只要整段路切线都在往上翘（$f'(x) > 0$），曲线就一定在爬坡！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（切线与法线斜率关系）",
        promptEn: R`If the tangent to a curve at point $P$ has slope $3$, what is the slope of the normal at $P$?`,
        promptZh: "若曲线在 $P$ 点的切线斜率为 $3$，那么过 $P$ 点的法线斜率是多少？",
        options: [R`$-\frac{1}{3}$`, R`$\frac{1}{3}$`, R`$-3$`, R`$3$`],
        correctIndex: 0,
        feedbackCorrect: R`又快又准！因为 $m_T \cdot m_N = -1$，所以 $m_N = -\frac{1}{3}$。`,
        feedbackWrong: R`记住垂直条件：$m_T \times m_N = -1$。所以法线斜率既要取倒数（变 $\frac{1}{3}$），又要变号（变负），等于 $-\frac{1}{3}$！`
      },
      stage2: {
        title: "基础模仿练（指数曲线切线方程）",
        promptEn: R`Find the equation of the tangent to the curve $y = e^{2x}$ at $x = 0$.`,
        promptZh: "求曲线 $y = e^{2x}$ 在 $x = 0$ 处的切线方程。",
        type: "mcq",
        options: [
          R`$y = 2x + 1$`,
          R`$y = x + 1$`,
          R`$y = 2x$`,
          R`$y = -\frac{1}{2}x + 1$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：当 $x = 0$ 时，$y = e^0 = 1$，切点是 $(0, 1)$。`,
          R`提示 2：$\frac{dy}{dx} = 2e^{2x}$，代入 $x = 0$ 得切线斜率 $m_T = 2$，然后套用 $y - 1 = 2(x - 0)$。`
        ],
        solutionHtml: R`
          <p>When $x = 0$, $y = e^0 = 1$, so the point of contact is $(0, 1)$.</p>
          <p>$$\frac{dy}{dx} = 2e^{2x} \implies m_T = 2e^0 = 2$$</p>
          <p>Equation of tangent: $y - 1 = 2(x - 0) \implies y = 2x + 1$.</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`The tangent to the curve $y = x^3 - 3x^2 + 5x$ at point $P$ is parallel to the line $2x - y + 7 = 0$. Find the $x$-coordinate of $P$.`,
        promptZh: "曲线 $y = x^3 - 3x^2 + 5x$ 在点 $P$ 处的切线平行于直线 $2x - y + 7 = 0$，求点 $P$ 的 $x$ 坐标。",
        type: "input",
        acceptedAnswers: ["1"],
        inputPlaceholder: "输入 x 坐标",
        hints: [
          R`提示 1 (1M)：先把直线写成 $y = 2x + 7$，读出斜率为 $2$；平行意味着切线斜率 $\frac{dy}{dx} = 2$。`,
          R`提示 2 (1M + 1A)：求导得 $3x^2 - 6x + 5 = 2$，移项化简得 $3(x-1)^2 = 0$。`
        ],
        solutionHtml: R`
          <p>Slope of the line $y = 2x + 7$ is $2$. Since the tangent is parallel to this line, $m_T = 2$. $\quad \text{(1M)}$ </p>
          <p>$$\frac{dy}{dx} = 3x^2 - 6x + 5 = 2 \quad \text{(1M)}$$</p>
          <p>$$3x^2 - 6x + 3 = 0 \implies 3(x - 1)^2 = 0 \implies x = 1 \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["5.2"] = {
    id: "5.2",
    chapterId: "ch5",
    titleZh: "5.2 函数的单调性与增减区间",
    titleEn: "Increasing and Decreasing Functions",
    objectives: [
      "建立核心直觉：$f'(x) > 0$ 代表函数图像在往右上走（<span class=\"term-en\">Increasing</span>），$f'(x) < 0$ 代表往右下走（<span class=\"term-en\">Decreasing</span>）；",
      "学会解导数不等式，并用“临界点分段测试表”准确找出严格递增和递减区间；",
      "善用 $e^{kx} > 0$ 与完全平方式 $\\ge 0$ 判定某些函数“全程递增”或“全程递减”。"
    ],
    intuition: {
      title: "生活场景直觉：用徒步指南针看曲线是在“上坡”还是“下坡”",
      storyHtml: R`
        <p>想象一位登山者从左向右沿着函数曲线 $y = f(x)$ 徒步：</p>
        <ul>
          <li>只要脚下每一步的斜坡角度是<strong>正的（$f'(x) > 0$）</strong>，他就在一步步往高处爬（函数严格递增 <span class="term-en">Increasing</span>）；</li>
          <li>只要脚下的斜坡变成<strong>负的（$f'(x) < 0$）</strong>，他就在往山谷里走（函数严格递减 <span class="term-en">Decreasing</span>）。</li>
        </ul>
        <p>想不画图就看清一座山哪一段在上坡、哪一段在下坡？只需要解出 $f'(x) = 0$ 的“平地拐角点”，然后检查每一段区间里 $f'(x)$ 的正负号就行了！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、找单调区间的“三步符号表法”</h4>
      <ol>
        <li>求导并尽量<strong>因式分解</strong> $f'(x)$；</li>
        <li>解方程 $f'(x) = 0$（同时留意分母等于 $0$ 等无定义点），把数轴切成几段连续区间；</li>
        <li>在每一段里随便挑一个好算的试探数代入 $f'(x)$ 看正负号：正号区即为递增区间，负号区即为递减区间。</li>
      </ol>
      <p><em>指数函数福利</em>：因为对任何实数 $x$ 都有 <strong>$e^{kx} > 0$</strong>，在解带有 $e^{kx}$ 的不等式（如 $(1-x)e^{-x} > 0$）时，可以直接把永远为正的 $e^{-x}$ 放心约掉，不等号方向完全不变！</p>
    `,
    formulas: [
      {
        label: "一阶导数与函数增减性判定",
        latex: R`$$\begin{aligned} f'(x) > 0 \text{ on an interval} &\implies f(x) \text{ is strictly increasing on that interval} \\ f'(x) < 0 \text{ on an interval} &\implies f(x) \text{ is strictly decreasing on that interval} \end{aligned}$$`,
        note: "牛津课本提示：若要求 $f(x)$ 在区间内递增，也常见写成 $f'(x) > 0$（求严格递增区间时通常不含令 $f'(x)=0$ 的孤立点，或按题目是否写“increasing”包含端点）。"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 误以为“$f'(x) > 0$ 说明图像全部画在 $x$ 轴上方（$y > 0$）”。`,
        right: R`✅ <strong>切勿混淆 $f(x)$ 和 $f'(x)$！</strong>$f'(x) > 0$ 只管曲线“往右上爬坡”，曲线完全可以是在 $x$ 轴下方（$y = -100$ 到 $y = -50$）往上爬！`
      },
      {
        wrong: R`❌ 解二次不等式 $(x - 3)(x + 1) > 0$ 时直接写成 $-1 < x < 3$。`,
        right: R`✅ 大于号取两边（开口向上抛物线在两侧高于 0）：$x < -1$ 或 $x > 3$；小于号 $(x-3)(x+1) < 0$ 才夹在中间 $-1 < x < 3$！`
      }
    ],
    examples: [
      {
        title: "Example 1 · 求三次多项式函数的递增与递减区间",
        promptEn: R`Find the intervals where $f(x) = x^3 - 3x^2 - 9x + 5$ is:<br>(a) increasing, $\quad$ (b) decreasing.`,
        promptZh: "求 $f(x) = x^3 - 3x^2 - 9x + 5$ 的递增区间与递减区间。",
        steps: [
          {
            math: R`$$f'(x) = 3x^2 - 6x - 9 = 3(x^2 - 2x - 3) = 3(x + 1)(x - 3)$$`,
            why: "先求一阶导数，并提取公因数 $3$ 后分解因式。"
          },
          {
            math: R`$$f'(x) = 0 \implies x = -1 \text{ or } x = 3$$`,
            why: "找到使斜率为 0 的两个分界点 $-1$ 和 $3$，它们把实数轴切成三段：$x<-1$、$-1<x<3$、$x>3$。"
          },
          {
            math: R`$$\begin{aligned} &x < -1 \text{ (e.g. } x=-2): & f'(-2) = 3(-1)(-5) > 0 \\ &-1 < x < 3 \text{ (e.g. } x=0): & f'(0) = 3(1)(-3) < 0 \\ &x > 3 \text{ (e.g. } x=4): & f'(4) = 3(5)(1) > 0 \end{aligned}$$`,
            why: "每段挑一个简单数字试算正负号，一目了然！"
          },
          {
            math: R`$$\text{(a) Increasing for } x < -1 \text{ or } x > 3; \qquad \text{(b) Decreasing for } -1 < x < 3$$`,
            why: "用简洁清晰的英文区间写出最终结论（也可以包含端点写成 $\\le / \\ge$，牛津 M1A 教材中严格开区间写法最清晰）。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "5.1", label: "5.1 导数即切线斜率" }],
      next: [{ id: "5.3", label: "5.3 由增变减正是山顶！驻点与极值判别" }],
      summary: "能看懂哪段上坡、哪段下坡后，下一节 5.3 就水到渠成：上坡切换到下坡的交界处必然是山峰（Local Maximum）！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（分清 f 与 f'）",
        promptEn: R`On the interval $2 < x < 5$, suppose $f'(x) < 0$ everywhere. Which statement MUST be true?`,
        promptZh: "如果在区间 $2 < x < 5$ 上处处满足 $f'(x) < 0$，那么下列哪句话<strong>一定成立</strong>？",
        options: [
          R`As $x$ increases from $2$ to $5$, $f(x)$ decreases`,
          R`$f(x) < 0$ for all $x$ between $2$ and $5$`,
          R`The graph is concave downwards between $2$ and $5$`,
          R`$f(5) > f(2)$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`完全透彻！$f'(x) < 0$ 只保证图像从左往右越来越低（即 $f(x)$ 严格递减），函数值本身完全可以是正的！`,
        feedbackWrong: R`小心区分原函数和导数！$f'(x) < 0$ 代表切线斜率是负的，说明曲线在走下坡，因此随 $x$ 变大，$f(x)$ 会越来越小。`
      },
      stage2: {
        title: "基础模仿练（二次函数递增区间）",
        promptEn: R`Find the interval of $x$ for which $f(x) = x^2 - 6x + 11$ is strictly increasing.`,
        promptZh: "求函数 $f(x) = x^2 - 6x + 11$ 严格递增的 $x$ 取值范围。",
        type: "mcq",
        options: [R`$x > 3$`, R`$x < 3$`, R`$x > 2$`, R`$x > -3$`],
        correctIndex: 0,
        hints: [
          R`提示 1：求导得 $f'(x) = 2x - 6$。`,
          R`提示 2：严格递增要求 $f'(x) > 0$，解 $2x - 6 > 0$ 即可。`
        ],
        solutionHtml: R`
          <p>$$f'(x) = 2x - 6$$</p>
          <p>For $f(x)$ to be strictly increasing, $f'(x) > 0 \implies 2x - 6 > 0 \implies x > 3$.</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Find the range of values of $x$ for which the function $y = x e^{-x}$ is strictly increasing.`,
        promptZh: "求函数 $y = x e^{-x}$ 严格递增的 $x$ 取值范围。",
        type: "mcq",
        options: [R`$x < 1$`, R`$x > 1$`, R`$0 < x < 1$`, R`$x < 0$`],
        correctIndex: 0,
        hints: [
          R`提示 1 (1M)：用积法则求导：$\frac{dy}{dx} = x(-e^{-x}) + e^{-x}(1) = (1 - x)e^{-x}$。`,
          R`提示 2 (1M + 1A)：因为对任何 $x$ 均有 $e^{-x} > 0$，所以 $\frac{dy}{dx} > 0 \iff 1 - x > 0$！注意解不等式别弄反符号！`
        ],
        solutionHtml: R`
          <p>$$\frac{dy}{dx} = x(-e^{-x}) + e^{-x}(1) = (1 - x)e^{-x} \quad \text{(1M)}$$</p>
          <p>Since $e^{-x} > 0$ for all real $x$, $\frac{dy}{dx} > 0 \iff 1 - x > 0 \quad \text{(1M)}$.</p>
          <p>$$\therefore x < 1 \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["5.3"] = {
    id: "5.3",
    chapterId: "ch5",
    titleZh: "5.3 驻点、转向点与一阶导数判别法",
    titleEn: "Stationary Points and First Derivative Test",
    objectives: [
      "分清驻点 <span class=\"term-en\">Stationary Point</span>（$f'(x)=0$）与转向点 <span class=\"term-en\">Turning Point</span>（极大/极小点）的区别；",
      "规范画出 HKDSE 满分标准的一阶导数符号判别表（First Derivative Test Table）；",
      "准确写出局部极大点/极大值 <span class=\"term-en\">Local Maximum</span> 与局部极小点/极小值 <span class=\"term-en\">Local Minimum</span>。"
    ],
    intuition: {
      title: "生活场景直觉：爬山过山顶时，脚下必然有那么一瞬间“踩在平地上”",
      storyHtml: R`
        <p>把曲线想象成连绵山脉。当你从山坡往上爬，在最高点翻越山峰的那一瞬间，脚底的坡度必然从正（上坡）变成 $0$（平地），然后再变成负（下坡）。</p>
        <p>这种<strong>切线水平（$f'(x) = 0$）的点</strong>，在数学上叫做<strong>驻点（Stationary point）</strong>。</p>
        <p>⚠️ 但“踩到平地”就一定是山顶或谷底吗？不一定！就像 $y = x^3$ 在原点 $(0, 0)$ 处，前面一直在上坡，到了原点歇了一小步变平，之后又继续往上爬——这种“歇脚平台”是驻点，但<strong>既不是极大也不是极小</strong>（它叫水平拐点）！</p>
        <p>所以找到 $f'(x) = 0$ 之后，必须看看它左右两边的斜率到底有没有变号！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、一阶导数判别法 <span class="term-en">First Derivative Test</span> 的三种结局</h4>
      <p>假设在 $x = a$ 处有 $f'(a) = 0$，观察紧邻 $a$ 左右两边 $f'(x)$ 的符号变化：</p>
      <ul>
        <li><strong>左正右负（$+ \to 0 \to -$）</strong>：先上升后下降，像山峰 $\land$ $\implies$ <strong>局部极大点 <span class="term-en">Local maximum point</span></strong>；</li>
        <li><strong>左负右正（$- \to 0 \to +$）</strong>：先下降后上升，像谷底 $\lor$ $\implies$ <strong>局部极小点 <span class="term-en">Local minimum point</span></strong>；</li>
        <li><strong>左右同号（$+ \to 0 \to +$ 或 $- \to 0 \to -$）</strong>：斜率没改变增减趋势 $\implies$ <strong>非转向点（水平拐点）</strong>。</li>
      </ul>

      <h4>二、读题审字：问 “maximum point” 还是 “maximum value”？</h4>
      <p>HKDSE 极其看重字眼精准度：问 <strong>local maximum point</strong> 时必须答坐标 <strong>$(x_0, y_0)$</strong>；问 <strong>local maximum value</strong> 时则只答纵坐标值 <strong>$y_0$</strong>！</p>
    `,
    formulas: [
      {
        label: "驻点条件 (Stationary Point Condition)",
        latex: R`$$f'(x_0) = 0 \quad \text{（或 } \frac{dy}{dx} = 0\text{）}$$`,
        note: "注意区分：所有转向点（Turning points）都是驻点，但驻点不一定都是转向点！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 算完 $f'(x) = 0$ 解出 $x = 1$ 和 $x = 3$ 后，不写任何检验步骤，直接猜一个叫极大、一个叫极小。`,
        right: R`✅ <strong>无检验不给分！</strong>HKDSE 评分标准（Marking Scheme）明确要求必须通过<strong>一阶导数符号表</strong>或<strong>二阶导数 $f''(x)$</strong> 证明极值性质，否则扣掉关键方法分和结论分！`
      },
      {
        wrong: R`❌ 混淆 Local maximum（局部极大，允许比更远的地方矮）和 Global maximum（全局最大）。`,
        right: R`✅ 局部极大/极小只要求比“自己左右紧邻的一小段”高或低；如果一个三次函数有山峰又有山谷，局部极小值完全可以比更远处的某一点高！`
      }
    ],
    examples: [
      {
        title: "Example 1 · 用一阶导数符号表找并分类全部驻点",
        promptEn: R`Find the stationary points of $f(x) = x^3 - 6x^2 + 9x + 2$ and determine their nature using the first derivative test.`,
        promptZh: "求 $f(x) = x^3 - 6x^2 + 9x + 2$ 的全部驻点，并用一阶导数判别法判断它们的类型。",
        steps: [
          {
            math: R`$$f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$$`,
            why: "求一阶导并因式分解。"
          },
          {
            math: R`$$f'(x) = 0 \implies x = 1 \text{ or } x = 3$$`,
            why: "令 $f'(x) = 0$ 找到驻点横坐标。"
          },
          {
            math: R`$$f(1) = 1 - 6 + 9 + 2 = 6; \qquad f(3) = 27 - 54 + 27 + 2 = 2$$`,
            why: "代入原函数算出对应纵坐标：两个驻点分别为 $(1, 6)$ 与 $(3, 2)$。"
          },
          {
            math: R`$$\begin{array}{c|ccccc} x & x < 1 & 1 & 1 < x < 3 & 3 & x > 3 \\ \hline f'(x) & + & 0 & - & 0 & + \end{array}$$`,
            why: "列出标准的牛津课本符号测试表！$(1, 6)$ 处由 $+$ 变 $-$ 为局部极大点；$(3, 2)$ 处由 $-$ 变 $+$ 为局部极小点。"
          }
        ]
      }
    ],
    labId: "lab_concavity",
    connections: {
      prereq: [{ id: "5.2", label: "5.2 增减区间符号判断" }],
      next: [
        { id: "5.4", label: "5.4 更快捷的二阶导数判别法与凹凸性" },
        { id: "5.5", label: "5.5 全局最值与实际应用优化" }
      ],
      summary: "去下方实验室拖动扫描线！你会看到当蓝线（$f'(x)$）穿过水平轴变号时，上方的原函数恰好稳稳停在山顶或谷底！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（识别“伪山顶”歇脚平台）",
        promptEn: R`Suppose $f'(2) = 0$, $f'(x) > 0$ for $x < 2$, and $f'(x) > 0$ for $x > 2$. What is $(2, f(2))$?`,
        promptZh: "若 $f'(2) = 0$，且在 $x = 2$ 左右两侧均有 $f'(x) > 0$，那么点 $(2, f(2))$ 是什么点？",
        options: [
          R`A stationary point that is neither a local maximum nor a local minimum`,
          R`A local maximum point`,
          R`A local minimum point`,
          R`Not a stationary point`
        ],
        correctIndex: 0,
        feedbackCorrect: R`洞察满分！左右两边都在上坡（$f'>0$），只在 $x=2$ 喘了口气（$f'=0$），它依然是驻点，但既非极大也非极小（是个水平拐点）！`,
        feedbackWrong: R`因为 $f'(2) = 0$，它满足驻点定义；但因为 $x=2$ 前后斜率都是正号（先上坡后继续上坡），没有“转向”，所以既不是极大也不是极小。`
      },
      stage2: {
        title: "基础模仿练（找极小点横坐标）",
        promptEn: R`Find the $x$-coordinate of the local minimum point of $y = x^2 - 8x + 15$.`,
        promptZh: "求抛物线 $y = x^2 - 8x + 15$ 局部极小点的 $x$ 坐标。",
        type: "input",
        acceptedAnswers: ["4"],
        inputPlaceholder: "输入 x 坐标",
        hints: [
          R`提示 1：求导 $\frac{dy}{dx} = 2x - 8$，令其等于 $0$。`,
          R`提示 2：解得 $x = 4$；检验左侧 $x < 4$ 时导数 $< 0$，右侧 $x > 4$ 时导数 $> 0$，确认为极小点。`
        ],
        solutionHtml: R`
          <p>$$\frac{dy}{dx} = 2x - 8 = 0 \implies x = 4$$</p>
          <p>When $x < 4$, $\frac{dy}{dx} < 0$; when $x > 4$, $\frac{dy}{dx} > 0$. Thus $x = 4$ gives a local minimum.</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Let $f(x) = x^3 - 12x + 1$. Find the local maximum value of $f(x)$.`,
        promptZh: "设 $f(x) = x^3 - 12x + 1$，求 $f(x)$ 的局部极大值（Local maximum value）。",
        type: "input",
        acceptedAnswers: ["17"],
        inputPlaceholder: "输入局部极大值",
        hints: [
          R`提示 1 (1M)：先求驻点：$f'(x) = 3x^2 - 12 = 3(x - 2)(x + 2) = 0 \implies x = -2$ 或 $2$。`,
          R`提示 2 (1M + 1A)：列表检查 $x = -2$（左正右负 $\to$ 极大！）和 $x = 2$（左负右正 $\to$ 极小），把 $x = -2$ 代入原式 $f(x)$ 算值！`
        ],
        solutionHtml: R`
          <p>$$f'(x) = 3x^2 - 12 = 3(x + 2)(x - 2) \quad \text{(1M)}$$</p>
          <p>$$f'(x) = 0 \implies x = -2 \text{ or } x = 2$$</p>
          <p>For $x < -2$, $f'(x) > 0$; for $-2 < x < 2$, $f'(x) < 0$; for $x > 2$, $f'(x) > 0$. $\quad \text{(1M)}$ </p>
          <p>Hence $f(x)$ attains a local maximum at $x = -2$:</p>
          <p>$$\text{Local maximum value} = f(-2) = (-2)^3 - 12(-2) + 1 = -8 + 24 + 1 = 17 \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["5.4"] = {
    id: "5.4",
    chapterId: "ch5",
    titleZh: "5.4 凹凸性、拐点与二阶导数判别法",
    titleEn: "Concavity, Points of Inflexion and Second Derivative Test",
    objectives: [
      "看懂二阶导数 $f''(x)$ 揭示的曲线弯曲方向：凹向上 <span class=\"term-en\">Concave upwards</span> 与凹向下 <span class=\"term-en\">Concave downwards</span>；",
      "熟练运用二阶导数判别法 <span class=\"term-en\">Second Derivative Test</span> 秒判极大/极小点，并知晓 $f''(a)=0$ 失效时的退路；",
      "学会求拐点 <span class=\"term-en\">Point of Inflexion</span>（必须验证 $f''(x)$ 在该点前后变号！），为第 7 章梯形法则埋下伏笔。"
    ],
    intuition: {
      title: "生活场景直觉：笑脸碗（能盛水） vs 哭脸拱桥（会漏水）",
      storyHtml: R`
        <p>一阶导数只能看“往哪边斜”，而二阶导数 $f''(x)$ 让我们看清曲线<strong>往哪边弯</strong>：</p>
        <ul>
          <li><strong>$f''(x) > 0$（凹向上 <span class="term-en">Concave upwards</span>）</strong>：斜率越往右越大，曲线弯成一只向上的<strong>笑脸大碗 $\smile$</strong>（能盛水）。如果在碗底恰好有一点切线平了（$f'(a)=0$），用脚趾头想都知道它必是<strong>局部极小值</strong>！</li>
          <li><strong>$f''(x) < 0$（凹向下 <span class="term-en">Concave downwards</span>）</strong>：斜率越往右越小，曲线弯成一座向下的<strong>拱桥 $\frown$</strong>。如果桥顶恰好平了（$f'(a)=0$），那它必是<strong>局部极大值</strong>！</li>
        </ul>
        <p>而连接“拱桥”与“笑脸碗”中间那个<strong>弯曲方向突然翻转的扭转点</strong>，就是<strong>拐点（Point of inflexion）</strong>！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、二阶导数判别法 <span class="term-en">Second Derivative Test</span>（比列表更快！）</h4>
      <p>找到驻点 $f'(a) = 0$ 后，如果 $f''(x)$ 好求，直接把 $x = a$ 代入 $f''(x)$：</p>
      <ul>
        <li>若 <strong>$f''(a) < 0$</strong>（倒扣拱桥）$\implies$ <strong>局部极大点（Local maximum）</strong>；</li>
        <li>若 <strong>$f''(a) > 0$</strong>（向上大碗）$\implies$ <strong>局部极小点（Local minimum）</strong>；</li>
        <li>若 <strong>$f''(a) = 0$</strong> $\implies$ <strong>测试失效（Inconclusive）</strong>！此时有可能是极大、极小也可能是拐点，必须立刻退回 5.3 节的一阶导数符号表！</li>
      </ul>

      <h4>二、如何确认拐点 <span class="term-en">Point of Inflexion</span>？</h4>
      <p>解出 $f''(c) = 0$ 只是“候选人”！还必须检查在 $x = c$ 左右两侧，$f''(x)$ 是否真的<strong>由正变负或由负变正</strong>（变号才能叫拐点，就像 $y = x^4$ 在 $x=0$ 虽然 $f''(0)=0$，但两侧 $12x^2 > 0$ 一直是碗状，所以 $(0,0)$ 不是拐点！）。</p>
    `,
    formulas: [
      {
        label: "凹凸性与拐点判别",
        latex: R`$$f''(x) > 0 \implies \text{Concave upwards } (\smile); \qquad f''(x) < 0 \implies \text{Concave downwards } (\frown)$$`,
        note: "第 7 章 7.3 节王炸剧透：凹向上时梯形弦在线上方（高估）；凹向下时梯形弦在线下方（低估）！"
      },
      {
        label: "二阶导数极值判别法",
        latex: R`$$f'(a) = 0 \text{ and } \begin{cases} f''(a) < 0 \implies \text{Local maximum at } x = a \\ f''(a) > 0 \implies \text{Local minimum at } x = a \\ f''(a) = 0 \implies \text{Inconclusive (use 1st derivative test)} \end{cases}$$`,
        note: "记法防反：负号是拱桥 $\\frown$ 有山顶（极大）；正号是笑脸碗 $\\smile$ 有谷底（极小）！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 算到 $f''(a) < 0$ 就以为是“极小值”（看到小于 0 下意识联想到 minimum）。`,
        right: R`✅ <strong>千万别按字面正负号猜大小！</strong>想一下“负号 $\to$ 垂头拱桥 $\frown$ $\to$ 顶点在上面”，所以 $f''(a) < 0$ 对应的是 <strong>Local maximum</strong>！`
      },
      {
        wrong: R`❌ 解出 $f''(x) = 0$ 就直接宣布它是拐点，不检验 $f''(x)$ 是否变号。`,
        right: R`✅ 必须写一句检验：例如 $x < 1$ 时 $f''(x) < 0$ 且 $x > 1$ 时 $f''(x) > 0$（符号发生改变），才能断定 $(1, f(1))$ 是 point of inflexion。`
      }
    ],
    examples: [
      {
        title: "Example 1 · 二阶导判别极值 + 寻找拐点与凹凸区间",
        promptEn: R`For the curve $y = x^3 - 3x^2 + 4$, find:<br>(a) the turning points using the second derivative test,<br>(b) the point of inflexion and the interval where the curve is concave upwards.`,
        promptZh: "对于曲线 $y = x^3 - 3x^2 + 4$：（a）用二阶导数判别法找转向点；（b）求拐点与凹向上的区间。",
        steps: [
          {
            math: R`$$\frac{dy}{dx} = 3x^2 - 6x = 3x(x - 2) = 0 \implies x = 0 \text{ or } x = 2$$`,
            why: "先求一阶导数并令其等于 $0$，找出驻点横坐标。"
          },
          {
            math: R`$$\frac{d^2y}{dx^2} = 6x - 6$$`,
            why: "继续求二阶导数。"
          },
          {
            math: R`$$\begin{aligned} &x = 0: \quad y = 4,\; \left.\frac{d^2y}{dx^2}\right|_{x=0} = -6 < 0 \implies (0, 4) \text{ is a local maximum point.} \\ &x = 2: \quad y = 0,\; \left.\frac{d^2y}{dx^2}\right|_{x=2} = 6 > 0 \implies (2, 0) \text{ is a local minimum point.} \end{aligned}$$`,
            why: "把 $x = 0$ 和 $x = 2$ 代入二阶导，不用列表一秒定胜负！"
          },
          {
            math: R`$$\frac{d^2y}{dx^2} = 0 \implies 6x - 6 = 0 \implies x = 1,\; y = 2$$`,
            why: "令 $y'' = 0$ 找到拐点候选 $x = 1$：在 $x<1$ 时 $y'' < 0$（凹向下），在 $x>1$ 时 $y'' > 0$（凹向上），符号确实改变，所以 $(1, 2)$ 是拐点，且 $x > 1$ 时凹向上！"
          }
        ]
      }
    ],
    labId: "lab_concavity",
    connections: {
      prereq: [{ id: "4.4", label: "4.4 二阶导数计算" }, { id: "5.3", label: "5.3 驻点与极值" }],
      next: [
        { id: "5.5", label: "5.5 最值优化应用题" },
        { id: "7.3", label: "7.3 凹凸性判定梯形法则高估/低估" }
      ],
      summary: "在下方交互实验室把滑块切换到三次函数，观察 $f''(x)$ 绿线穿零那一瞬间，曲线是如何从 $\\frown$ 优雅扭转成 $\\smile$ 的！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（二阶导为 0 怎么办？）",
        promptEn: R`Suppose $f'(0) = 0$ and $f''(0) = 0$. What can you conclude from the second derivative test?`,
        promptZh: "假设在 $x = 0$ 处有 $f'(0) = 0$ 且 $f''(0) = 0$，你从二阶导数判别法能得出什么结论？",
        options: [
          R`The test is inconclusive; we must check the sign change of $f'(x)$ around $x = 0$`,
          R`$(0, f(0))$ is definitely a point of inflexion`,
          R`$(0, f(0))$ is definitely a local maximum`,
          R`$(0, f(0))$ cannot be a turning point`
        ],
        correctIndex: 0,
        feedbackCorrect: R`非常严谨！$y = x^4$ 在 $x=0$ 满足 $f''(0)=0$ 却是极小点，而 $y = x^3$ 也是 $f''(0)=0$ 却是拐点！所以二阶导为 0 时绝对不能下定论，必须退回一阶导数判别！`,
        feedbackWrong: R`小心反例：$y = x^4$ 和 $y = x^3$ 在 $x = 0$ 都满足 $f'(0)=0$ 且 $f''(0)=0$，但一个是极小值、一个是拐点！所以测试失效（Inconclusive），必须用一阶导符号变化判断。`
      },
      stage2: {
        title: "基础模仿练（用二阶导判凹凸方向）",
        promptEn: R`Determine the concavity of the curve $y = e^{2x} - 3x$ for all real values of $x$.`,
        promptZh: "判断曲线 $y = e^{2x} - 3x$ 在全体实数上的凹凸性。",
        type: "mcq",
        options: [
          R`Always concave upwards since $\dfrac{d^2y}{dx^2} = 4e^{2x} > 0$ for all $x$`,
          R`Always concave downwards since $\dfrac{d^2y}{dx^2} = 4e^{2x} - 3$`,
          R`Concave upwards for $x > 0$ and concave downwards for $x < 0$`,
          R`Always concave downwards since $-3 < 0$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：求一阶导 $\frac{dy}{dx} = 2e^{2x} - 3$，常数 $-3$ 再求导会消失！`,
          R`提示 2：$\frac{d^2y}{dx^2} = 4e^{2x}$，而指数函数 $e^{2x}$ 对所有实数 $x$ 永远严格大于 $0$。`
        ],
        solutionHtml: R`
          <p>$$\frac{dy}{dx} = 2e^{2x} - 3 \implies \frac{d^2y}{dx^2} = 4e^{2x}$$</p>
          <p>Since $e^{2x} > 0$ for all $x \in \mathbb{R}$, $\frac{d^2y}{dx^2} > 0$ everywhere. Hence the curve is always concave upwards.</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Find the coordinates of the point of inflexion of the curve $y = x^3 - 6x^2 + 5x + 10$.`,
        promptZh: "求曲线 $y = x^3 - 6x^2 + 5x + 10$ 的拐点坐标（格式如 (2, 4)）。",
        type: "input",
        acceptedAnswers: ["(2, 4)", "(2,4)"],
        inputPlaceholder: "输入坐标，例如 (2, 4)",
        hints: [
          R`提示 1 (1M)：先算 $\frac{dy}{dx} = 3x^2 - 12x + 5$，再算 $\frac{d^2y}{dx^2} = 6x - 12$。`,
          R`提示 2 (1M + 1A)：令 $6x - 12 = 0$ 得 $x = 2$，检查左右二阶导变号（$- \to +$），最后把 $x = 2$ 代回原方程求 $y$！`
        ],
        solutionHtml: R`
          <p>$$\frac{dy}{dx} = 3x^2 - 12x + 5 \implies \frac{d^2y}{dx^2} = 6x - 12 \quad \text{(1M)}$$</p>
          <p>Put $\frac{d^2y}{dx^2} = 0 \implies x = 2$. When $x < 2$, $\frac{d^2y}{dx^2} < 0$; when $x > 2$, $\frac{d^2y}{dx^2} > 0$. $\quad \text{(1M)}$ </p>
          <p>When $x = 2$, $y = 2^3 - 6(2)^2 + 5(2) + 10 = 8 - 24 + 10 + 10 = 4$.</p>
          <p>Therefore, the point of inflexion is $(2, 4)$. $\quad \text{(1A)}$ </p>
        `
      }
    }
  };

  units["5.5"] = {
    id: "5.5",
    chapterId: "ch5",
    titleZh: "5.5 全局最值与实际优化应用题",
    titleEn: "Global Extrema and Optimization Problems",
    objectives: [
      "分清闭区间 $[a, b]$ 上求全局最大值/最小值 <span class=\"term-en\">Global Maximum / Minimum</span> 时<strong>必须同时检验端点</strong>；",
      "学会把商业利润、包装盒用料、围栏面积等文字应用题，转化为单变量函数 $S(x)$ 或 $A(x)$；",
      "掌握应用题拿满分的“最后一步检验”：求完驻点后务必用二阶导数或一阶导表证明它确实是最大/最小。"
    ],
    intuition: {
      title: "生活场景直觉：用最少的铝皮，装下刚好 330 mL 的可乐罐！",
      storyHtml: R`
        <p>为什么超市里卖的易拉罐高度大约是直径的 2 倍，既不做成“细长金箍棒”也不做成“扁平大圆盘”？</p>
        <p>如果你把罐子做得太高太细，侧面铁皮面积很大；做得太扁太胖，上下两个圆盖子面积又暴涨！总有一个恰到好处的半径 $r$，能在固定容积 $V = 330\text{ cm}^3$ 的前提下，让总表面积 $S(r)$ 降到<strong>全局最低点</strong>！</p>
        <p>工业界节省一分钱铁皮乘以十亿罐就是几千万利润——这就是微分学里最赚钱的应用：<strong>最优化建模（Optimization）</strong>。</p>
      `
    },
    conceptsHtml: R`
      <h4>一、闭区间 $[a, b]$ 上的全局最值（千万别漏端点！）</h4>
      <p>如果题目限定了自变量在闭区间 $a \le x \le b$ 内取值，那么全局最大/最小值只可能出现在两类候选点中：</p>
      <ol>
        <li>区间<strong>内部</strong>的所有驻点（令 $f'(x) = 0$ 且落在 $(a, b)$ 内）；</li>
        <li>区间的两个<strong>端点</strong> $x = a$ 和 $x = b$。</li>
      </ol>
      <p>把这些候选点的 $f(x)$ 全部算出来一比大小，最大的是 Global maximum，最小的是 Global minimum！</p>

      <h4>二、应用题文字建模五步口诀</h4>
      <ol>
        <li><strong>画草图设变量</strong>：标记长宽高或半径，列出约束方程（比如体积 $x^2 h = 32$）；</li>
        <li><strong>消元变单变量</strong>：把多余字母消掉（$h = \frac{32}{x^2}$），把要最优化的目标写成只含 $x$ 的函数，并标出合理范围（$x > 0$）；</li>
        <li><strong>求导解驻点</strong>：令导数等于 $0$ 解出合理的正数解；</li>
        <li><strong>证明最值性质</strong>：用 $S''(x)$ 判定符号（或者说明唯一驻点）；</li>
        <li><strong>看清问法作答</strong>：问的是尺寸 $x$ 还是最小表面积 $S$ 本身？别忘了带单位！</li>
      </ol>
    `,
    formulas: [
      {
        label: "闭区间全局最值比较法",
        latex: R`$$\text{Global Max on } [a, b] = \max\bigl\{f(a),\; f(b),\; f(c_1), \dots\bigr\} \quad \text{where } f'(c_i)=0,\; c_i\in(a,b)$$`,
        note: "若驻点落在 $[a, b]$ 外面，直接舍去不参与比较！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 算闭区间 $[0, 2]$ 最值时，直接求 $f'(x)=0$ 得出局部极小值 $-1$ 就交卷，完全忘记算区间端点 $f(0)$ 和 $f(2)$。`,
        right: R`✅ 切记：很多山坡最高的山崖恰恰在端点处！一定要列出 $f(a), f(b)$ 与内部驻点逐一比大小。`
      },
      {
        wrong: R`❌ 优化应用题解出 $x = 4$ 就直接写“Therefore, $S$ is minimum when $x = 4$”，没有任何检验步骤。`,
        right: R`✅ HKDSE 对应用题有固定 <strong>1 分检验分</strong>：务必算 $S''(4) > 0$（或检查一阶导左右正负变化），正式说明它确实是极小（且在唯一驻点即全局最小）。`
      }
    ],
    examples: [
      {
        title: "Example 1 · 闭区间最值 + 无盖长方体省料设计",
        promptEn: R`(a) Find the global maximum and minimum values of $f(x) = x^3 - 3x + 1$ on $[0, 2]$.<br>(b) An open-top rectangular box with a square base of side $x\text{ cm}$ has a fixed volume of $32\text{ cm}^3$. Find $x$ such that its total surface area $S$ is minimized.`,
        promptZh: "（a）求 $f(x) = x^3 - 3x + 1$ 在 $[0, 2]$ 上的全局最大与最小值。（b）底面为边长 $x$ 的正方形、容积为 $32\\text{ cm}^3$ 的无盖盒子，求使总表面积最小的 $x$。",
        steps: [
          {
            math: R`$$\text{(a) } f'(x) = 3x^2 - 3 = 0 \implies x = 1 \text{ or } x = -1 \text{ (outside } [0, 2]\text{)}$$`,
            why: "先找出落在 $[0, 2]$ 内的驻点 $x = 1$（舍去区间外的 $-1$）。"
          },
          {
            math: R`$$f(0) = 1,\qquad f(1) = 1 - 3 + 1 = -1,\qquad f(2) = 8 - 6 + 1 = 3$$`,
            why: "将驻点与两个端点同时代入比较：Global max $= 3$（在端点 $x=2$ 取得！），Global min $= -1$（在 $x=1$ 取得）。"
          },
          {
            math: R`$$\text{(b) } x^2 h = 32 \implies h = \frac{32}{x^2}; \qquad S(x) = x^2 + 4xh = x^2 + \frac{128}{x} \;\; (x > 0)$$`,
            why: "无盖盒子只有 1 个底面 ($x^2$) 和 4 个侧面 ($4xh$)，用体积关系消去高 $h$。"
          },
          {
            math: R`$$S'(x) = 2x - \frac{128}{x^2} = 0 \implies 2x^3 = 128 \implies x = 4; \qquad S''(4) = 2 + \frac{256}{4^3} = 6 > 0$$`,
            why: "求导令 $0$ 解得 $x = 4$，再用二阶导 $S''(4) = 6 > 0$ 正式证明此处取得全局最小表面积（此时高 $h = 2$ 恰好等于底边一半！）。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "5.3", label: "5.3 驻点判别" }, { id: "5.4", label: "5.4 二阶导判别法" }],
      next: [{ id: "5.6", label: "5.6 动态变化率问题" }],
      summary: "5.5 找的是“静止画面里的最高最低点”；下一节 5.6 我们让画面动起来，用导数算漏水速度、气球膨胀与利润增速！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（抓准闭区间规则）",
        promptEn: R`To find the global maximum of $f(x)$ on the closed interval $[a, b]$, which values must be compared?`,
        promptZh: "要在闭区间 $[a, b]$ 上找 $f(x)$ 的全局最大值，必须比较哪些点？",
        options: [
          R`All stationary points inside $(a, b)$ AND the endpoints $f(a), f(b)$`,
          R`Only the points inside $(a, b)$ where $f'(x) = 0$`,
          R`Only the two endpoints $f(a)$ and $f(b)$`,
          R`Only the points where $f''(x) = 0$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`绝对正确！闭区间的最高点既可能在山顶（内部驻点），也可能恰好卡在边界悬崖（端点 $a$ 或 $b$），一个都不能漏！`,
        feedbackWrong: R`想一想斜坡 $y = 2x$ 在 $[0, 3]$ 上根本没有 $f'(x)=0$ 的驻点，但它最大值 $6$ 就在右端点 $x=3$！所以内部驻点和两个端点必须一起比！`
      },
      stage2: {
        title: "基础模仿练（闭区间全局最大值）",
        promptEn: R`Find the global maximum value of $f(x) = -x^2 + 4x + 1$ on $[0, 5]$.`,
        promptZh: "求 $f(x) = -x^2 + 4x + 1$ 在闭区间 $[0, 5]$ 上的全局最大值。",
        type: "input",
        acceptedAnswers: ["5"],
        inputPlaceholder: "输入最大数值",
        hints: [
          R`提示 1：求导 $f'(x) = -2x + 4 = 0 \implies x = 2$（在 $[0, 5]$ 内）。`,
          R`提示 2：比较 $f(0) = 1$、$f(2) = 5$、$f(5) = -4$，挑出最大的！`
        ],
        solutionHtml: R`
          <p>$$f'(x) = -2x + 4 = 0 \implies x = 2 \in [0, 5]$$</p>
          <p>$$f(0) = 1, \quad f(2) = -4 + 8 + 1 = 5, \quad f(5) = -25 + 20 + 1 = -4$$</p>
          <p>$$\therefore \text{Global maximum value} = 5$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`A farmer uses $60\text{ m}$ of fencing to enclose a rectangular garden against a straight wall (fencing is needed on only 3 sides: two widths of $x\text{ m}$ each and one length opposite the wall). Find the maximum possible area of the garden (in $\text{m}^2$).`,
        promptZh: "农夫用 $60\\text{ m}$ 篱笆靠一面直墙围建长方形菜园（只需围 3 条边：两条宽各为 $x\\text{ m}$，一条长靠外侧）。求菜园可能达到的最大面积（单位：$\\text{m}^2$）。",
        type: "input",
        acceptedAnswers: ["450"],
        inputPlaceholder: "输入最大面积数值（不用写单位）",
        hints: [
          R`提示 1 (1M)：三条篱笆总长 $60$，所以长度 $y = 60 - 2x$，面积 $A(x) = x(60 - 2x) = 60x - 2x^2$。`,
          R`提示 2 (2M)：求导 $A'(x) = 60 - 4x = 0 \implies x = 15$，检查 $A''(15) = -4 < 0$（确为极大），代入算 $A(15)$！`
        ],
        solutionHtml: R`
          <p>Length $= 60 - 2x$. Area $A(x) = x(60 - 2x) = 60x - 2x^2$ ($0 < x < 30$). $\quad \text{(1M)}$ </p>
          <p>$$A'(x) = 60 - 4x = 0 \implies x = 15 \quad \text{(1M)}$$</p>
          <p>$$A''(x) = -4 < 0 \implies A(x) \text{ attains its maximum at } x = 15.$$</p>
          <p>$$\text{Maximum area} = 15(60 - 30) = 450\text{ m}^2 \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["5.6"] = {
    id: "5.6",
    chapterId: "ch5",
    titleZh: "5.6 变化率与关联变化率",
    titleEn: "Rates of Change and Related Rates",
    objectives: [
      "理解导数对时间 $t$ 的物理与商业含义（速度 $v = \\frac{ds}{dt}$、加速度 $a = \\frac{dv}{dt}$、边际变化率）；",
      "运用链式法则搭建关联变化率 <span class=\"term-en\">Related Rates</span> 桥梁：$\\frac{dV}{dt} = \\frac{dV}{dh} \\cdot \\frac{dh}{dt}$；",
      "养成“先求导、后代入瞬时数值”的铁律，区分“增加（正号）”与“减少（负号）”。"
    ],
    intuition: {
      title: "生活场景直觉：为什么往圆柱水桶里匀速倒水，水面上升速度却刚好恒定？如果是圆锥漏斗呢？",
      storyHtml: R`
        <p>向水桶倒水时，水流进来的速度是体积变化率 $\frac{dV}{dt}$，而你肉眼盯着看的却是水面高度爬升的速度 $\frac{dh}{dt}$。</p>
        <p>只要水桶是直上直下的圆柱（截面积固定为 $\pi r^2$），水体积和高度满足 $V = \pi r^2 h$，用链式法则对时间 $t$ 求导：</p>
        <p>$$\frac{dV}{dt} = \pi r^2 \frac{dh}{dt}$$</p>
        <p>水越多底面积越不变，$\frac{dh}{dt}$ 也是匀速的！但如果换成上宽下窄的圆锥漏斗，截面积 $\pi r^2$ 会随高度变大，倒水越往后水面升得越慢——链式法则完美把这两个“同步变化的速度”绑在了一起！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、常见“变化率”英文考题关键词翻译</h4>
      <ul>
        <li><code>rate of change of P with respect to t</code> $\longrightarrow$ $\frac{dP}{dt}$；</li>
        <li><code>increases at a rate of 5 cm/s</code> $\longrightarrow$ 变化率为 <strong>$+5$</strong>；</li>
        <li><code>decreases / leaks at a rate of 3 cm³/s</code> $\longrightarrow$ 变化率为 <strong>$-3$</strong>（负号至关重要！）；</li>
        <li>运动学：位置 $s(t)$ $\xrightarrow{\frac{d}{dt}}$ 速度 $v(t) = \frac{ds}{dt}$ $\xrightarrow{\frac{d}{dt}}$ 加速度 $a(t) = \frac{dv}{dt} = \frac{d^2s}{dt^2}$。</li>
      </ul>

      <h4>二、关联变化率铁律：“静止数字最后代！”</h4>
      <p>题目常常问：“When radius $r = 3\text{ cm}$, find $\frac{dV}{dt}$.” 千万不要在第一行就把 $r = 3$ 塞进 $V = \frac{4}{3}\pi r^3$！那样 $V$ 会被变成常数，求导立刻归零！</p>
      <p><strong>正确顺序</strong>：先把关系式保留字母全部写好 $\to$ 两边用链式法则对时间 $t$ 求导 $\to$ <strong>求导完成之后</strong>再把瞬时值 $r = 3$ 代进去！</p>
    `,
    formulas: [
      {
        label: "关联变化率链式桥 (Related Rates Chain Rule)",
        latex: R`$$\frac{dV}{dt} = \frac{dV}{dr} \cdot \frac{dr}{dt}, \qquad \frac{dy}{dt} = \frac{dy}{dx} \cdot \frac{dx}{dt}$$`,
        note: "对于时间变量 $t$，求导时所有会随时间改变的字母（如 $r, h, x$）都要当作关于 $t$ 的函数乘上 $\\frac{dr}{dt}, \\frac{dh}{dt}, \\frac{dx}{dt}$！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 题目说“水面下降速度”或“气球漏气减少”，却把已知变化率写成正数。`,
        right: R`✅ <strong>“Decreases / drops / leaks” 必须给变化率加负号！</strong>如果题干问“rate of decrease（下降速率）”，则把负号转为正数语言作答（如“decreases at $2\text{ cm/s}$”）。`
      },
      {
        wrong: R`❌ 求导之前就把 $r = 3$ 代入公式算出一个常数体积，导致求导变 $0$。`,
        right: R`✅ 在未求导之前，所有动态变量（$r, h, V$）必须以字母身份活到导数公式写出来之后！`
      }
    ],
    examples: [
      {
        title: "Example 1 · 气球膨胀关联变化率（标准三步式）",
        promptEn: R`A spherical balloon is inflated so that its radius $r$ increases at a constant rate of $0.5\text{ cm/s}$. Find the rate of increase of its volume $V = \frac{4}{3}\pi r^3$ when $r = 3\text{ cm}$. Leave your answer in terms of $\pi$.`,
        promptZh: "向球形气球充气使其半径 $r$ 以 $0.5\\text{ cm/s}$ 的恒定速率增大。求当 $r = 3\\text{ cm}$ 时，气球体积 $V = \\frac{4}{3}\\pi r^3$ 的增加速率（答案保留 $\\pi$）。",
        steps: [
          {
            math: R`$$V = \frac{4}{3}\pi r^3 \implies \frac{dV}{dr} = 4\pi r^2$$`,
            why: "先算体积 $V$ 关于半径 $r$ 的导数（暂时不代入 $r=3$！）。"
          },
          {
            math: R`$$\frac{dV}{dt} = \frac{dV}{dr} \cdot \frac{dr}{dt} = 4\pi r^2 \frac{dr}{dt}$$`,
            why: "用链式法则把体积对时间的变化率与半径对时间的变化率接起来。"
          },
          {
            math: R`$$\text{When } r = 3 \text{ and } \frac{dr}{dt} = 0.5: \quad \frac{dV}{dt} = 4\pi (3)^2 (0.5) = 18\pi\text{ cm}^3/\text{s}$$`,
            why: "求完导再安全代入瞬间数值 $r = 3$ 与 $\\frac{dr}{dt} = 0.5$，带上单位 $\\text{cm}^3/\\text{s}$。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "4.2", label: "4.2 链式法则" }, { id: "5.5", label: "5.5 几何与经济建模" }],
      next: [{ id: "6.1", label: "6.1 第 6 章倒带开始：已知变化率，反求原总量！" }],
      summary: "至此微分学全篇大功告成！5.6 节教你从“原总量”求“变化率”；从第 6 章开始，我们把录像带倒过来放——给你“变化率”，反推“原总量”！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（先后顺序不能乱）",
        promptEn: R`In a related rates problem asking for $\dfrac{dV}{dt}$ at the instant when $r = 5$, when should we substitute $r = 5$?`,
        promptZh: "在关联变化率题目中，要求“当 $r = 5$ 那一瞬间 $\\frac{dV}{dt}$ 的值”，应该什么时候代入 $r = 5$？",
        options: [
          R`After differentiating with respect to $t$`,
          R`Before differentiating, directly into the formula for $V$`,
          R`Either before or after gives the same answer`,
          R`We never substitute $r = 5$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`牢记铁律！如果先代入 $r=5$，$V$ 就变成不动的一个死数字，求导直接变 0！必须先留着字母对 $t$ 求导，最后一步才代入 $r=5$！`,
        feedbackWrong: R`试试看：如果先把 $r=5$ 代进体积公式，$V$ 就成常数了，一求导就会归零！一定要等求导完毕之后再代入瞬时数值。`
      },
      stage2: {
        title: "基础模仿练（边际利润变化率）",
        promptEn: R`The profit $P$ (in thousand dollars) from selling $x$ units of a product is $P(x) = 20x - 0.5x^2$. Find the rate of change of profit with respect to $x$ when $x = 12$.`,
        promptZh: "销售 $x$ 件产品的利润为 $P(x) = 20x - 0.5x^2$（千元）。求当 $x = 12$ 时利润关于 $x$ 的变化率。",
        type: "input",
        acceptedAnswers: ["8"],
        inputPlaceholder: "输入数值结果",
        hints: [
          R`提示 1：利润关于 $x$ 的变化率就是导数 $P'(x) = 20 - x$。`,
          R`提示 2：代入 $x = 12$ 得 $20 - 12 = 8$。`
        ],
        solutionHtml: R`
          <p>$$P'(x) = 20 - 2(0.5)x = 20 - x$$</p>
          <p>$$P'(12) = 20 - 12 = 8 \text{ (thousand dollars per unit)}$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Water is poured into a cylindrical tank of base radius $4\text{ m}$ at a constant rate of $8\pi\text{ m}^3/\text{min}$. Find the rate of increase of the depth $h$ of water in the tank (in $\text{m/min}$).`,
        promptZh: "将水以 $8\\pi\\text{ m}^3/\\text{min}$ 的恒定速率注入底面半径为 $4\\text{ m}$ 的圆柱形水箱。求水箱内水深 $h$ 的上升速率（单位：$\\text{m/min}$）。",
        type: "input",
        acceptedAnswers: ["0.5", "1/2"],
        inputPlaceholder: "输入小数如 0.5 或分数 1/2",
        hints: [
          R`提示 1 (1M)：圆柱半径 $r = 4$ 是固定常数！水体积公式直接写成 $V = \pi (4)^2 h = 16\pi h$。`,
          R`提示 2 (1M + 1A)：两边对 $t$ 求导得 $\frac{dV}{dt} = 16\pi \frac{dh}{dt}$，代入 $\frac{dV}{dt} = 8\pi$ 解出 $\frac{dh}{dt}$！`
        ],
        solutionHtml: R`
          <p>Since the tank is a cylinder of fixed radius $4\text{ m}$, volume of water is:</p>
          <p>$$V = \pi (4)^2 h = 16\pi h \quad \text{(1M)}$$</p>
          <p>Differentiating both sides with respect to $t$:</p>
          <p>$$\frac{dV}{dt} = 16\pi \frac{dh}{dt} \quad \text{(1M)}$$</p>
          <p>$$8\pi = 16\pi \frac{dh}{dt} \implies \frac{dh}{dt} = 0.5\text{ m/min} \quad \text{(1A)}$$</p>
        `
      }
    }
  };
})();
