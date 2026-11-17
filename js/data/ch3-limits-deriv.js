/* ==========================================================================
   Chapter 3: Derivatives of Functions (函数的导数)
   Units 3.1, 3.2, 3.3 — Strictly aligned with Oxford M1A & HKDSE M1
   ========================================================================== */

(function () {
  const R = String.raw;
  const units = window.M1A_DATA.units;

  units["3.1"] = {
    id: "3.1",
    chapterId: "ch3",
    titleZh: "3.1 极限的直观概念与代数求值",
    titleEn: "Intuitive Concept of Limits",
    objectives: [
      "理解极限 <span class=\"term-en\">Limit</span> $\\lim_{x \\to a} f(x)$ 描述的是“$x$ 无限逼近 $a$ 时的趋势”（而非 $x = a$ 当点的取值）；",
      "掌握 $\\frac{0}{0}$ 不定型的三大消去零因子绝招：因式分解 <span class=\"term-en\">Factorization</span> 与有理化 <span class=\"term-en\">Rationalization</span>；",
      "掌握无穷大极限 $\\lim_{x \\to \\infty} f(x)$ 的“同除以 $x$ 最高次幂”法则。"
    ],
    intuition: {
      title: "生活场景直觉：桥面恰好在正中央缺了一块砖，你站在旁边看它本该在多高？",
      storyHtml: R`
        <p>想象一条平坦滑梯在 $x = 2$ 的位置挖掉了一个微小的孔。如果直接问你“站在 $x = 2$ 上有多高？”，你会一脚踩空（对应分母为 0 变成 $\frac{0}{0}$ 无意义）。</p>
        <p>但如果你从左边走到 $1.9, 1.99, 1.999$，或者从右边走到 $2.1, 2.01, 2.001$，你会发现两边脚步逼近的目标高度<strong>稳稳指向同一个数字</strong>——这就是极限 $\lim_{x \to 2} f(x)$！</p>
        <p><strong>极限只关心你“往哪儿逼近”，不在乎目的地那一个点本身有没有被挖空。</strong></p>
      `
    },
    conceptsHtml: R`
      <h4>一、求 $\lim_{x \to a} f(x)$ 的“先代后拆”流程</h4>
      <ol>
        <li><strong>第一步：直接代入尝试</strong>。只要分母不为 $0$，直接代入 $x = a$ 得出的数字就是极限！</li>
        <li><strong>第二步：遇到 $\frac{0}{0}$ 时“消去零因子”</strong>。若分子分母同时变 $0$，说明它们共同藏着祸首 $(x - a)$：
          <ul>
            <li>多项式分式 $\to$ <strong>因式分解</strong>，把 $(x - a)$ 上下约掉再代入；</li>
            <li>带根号的分式 $\to$ <strong>分子/分母有理化</strong>（利用平方差 $(A-B)(A+B) = A^2 - B^2$ 把根号打开）。</li>
          </ul>
        </li>
      </ol>

      <h4>二、当 $x \to \infty$（无穷大）时的“抓大放小”法则</h4>
      <p>当 $x$ 变得极大时，$\frac{1}{x}, \frac{5}{x^2}$ 全部趋近于 $0$！因此处理有理分式 $\lim_{x \to \infty} \frac{P(x)}{Q(x)}$ 时，标准做法是<strong>分子分母同时除以分母中 $x$ 的最高次幂</strong>：</p>
      <ul>
        <li>若分子最高次 $=$ 分母最高次 $\to$ 极限就是<strong>最高次项系数之比</strong>；</li>
        <li>若分子最高次 $<$ 分母最高次 $\to$ 极限为 $0$。</li>
      </ul>
    `,
    formulas: [
      {
        label: "极限基本性质与无穷倒数",
        latex: R`$$\lim_{x \to \infty} \frac{c}{x^k} = 0 \quad (k > 0), \qquad \lim_{x \to \infty} a^x = 0 \quad (0 < a < 1)$$`,
        note: "特别是处理 $e^{-x} = \\frac{1}{e^x}$ 时：当 $x \\to +\\infty$，$e^{-x} \\to 0$！"
      },
      {
        label: "消去 0/0 不定型的两大核心代数变形",
        latex: R`$$a^2 - b^2 = (a-b)(a+b), \qquad (\sqrt{A}-\sqrt{B})(\sqrt{A}+\sqrt{B}) = A - B$$`,
        note: "千万记得：写出 $\\lim_{x \\to a}$ 直到你真正把 $a$ 代入并去掉极限号的那一步为止！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 算 $\lim_{x \to 2} \frac{x^2 - 4}{x - 2}$ 时直接把 $x = 2$ 代进去写“$= \frac{0}{0}$ = 不存在”。`,
        right: R`✅ $\frac{0}{0}$ 不是最终答案，而是“还有公因子 $(x-2)$ 没约掉”的信号！约掉后得到 $\lim_{x\to 2}(x+2) = 4$。`
      },
      {
        wrong: R`❌ 书写步骤时过早扔掉 $\lim_{x \to \infty}$ 符号，或者代入 $x = 2$ 后还留着 $\lim_{x \to 2}$。`,
        right: R`✅ 只要式子里还有 $x$，前面就必须带着 $\\lim$；一旦代入数值（不再有 $x$），就立刻把 $\\lim$ 去掉。`
      }
    ],
    examples: [
      {
        title: "Example 1 · 因式分解与根式有理化求极限",
        promptEn: R`Evaluate:<br>(a) $\lim_{x \to 2} \dfrac{x^2 - 4}{x - 2}$<br>(b) $\lim_{x \to 0} \dfrac{\sqrt{x + 9} - 3}{x}$<br>(c) $\lim_{x \to \infty} \dfrac{6x^2 - 5x + 1}{2x^2 + 3x - 7}$`,
        promptZh: "计算下列三个典型极限。",
        steps: [
          {
            math: R`$$\text{(a) } \lim_{x \to 2} \frac{x^2 - 4}{x - 2} = \lim_{x \to 2} \frac{(x - 2)(x + 2)}{x - 2} = \lim_{x \to 2} (x + 2) = 4$$`,
            why: "分子用平方差分解出 $(x-2)$ 并上下约分（因为 $x \to 2$ 表示 $x \neq 2$，所以可以安全约去！）。"
          },
          {
            math: R`$$\text{(b) } \lim_{x \to 0} \frac{\sqrt{x+9}-3}{x} \cdot \frac{\sqrt{x+9}+3}{\sqrt{x+9}+3} = \lim_{x \to 0} \frac{(x+9) - 9}{x(\sqrt{x+9}+3)}$$`,
            why: "遇到 $\\frac{0}{0}$ 且带根号，上下同乘共轭式 $\\sqrt{x+9}+3$ 脱掉分子根号。"
          },
          {
            math: R`$$= \lim_{x \to 0} \frac{x}{x(\sqrt{x+9}+3)} = \lim_{x \to 0} \frac{1}{\sqrt{x+9}+3} = \frac{1}{\sqrt{9}+3} = \frac{1}{6}$$`,
            why: "约去公因子 $x$ 后，分母不再为 $0$，放心代入 $x = 0$ 得 $\\frac{1}{6}$。"
          },
          {
            math: R`$$\text{(c) } \lim_{x \to \infty} \frac{6 - \frac{5}{x} + \frac{1}{x^2}}{2 + \frac{3}{x} - \frac{7}{x^2}} = \frac{6 - 0 + 0}{2 + 0 - 0} = 3$$`,
            why: "分子分母同除以分母最高次幂 $x^2$，所有含 $\\frac{1}{x}, \\frac{1}{x^2}$ 的项在 $x\\to\\infty$ 时归零。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "2.1", label: "2.1 e = lim(1+1/n)ⁿ 极限初体验" }],
      next: [{ id: "3.2", label: "3.2 导数的极限定义 (Δx → 0)" }],
      summary: "学会处理 $\\frac{0}{0}$ 型极限绝非做题凑热闹——在下一节 3.2 中，导数的本质正是计算 $\\Delta x \\to 0$ 时的 $\\frac{0}{0}$ 极限！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（不死算，先判断）",
        promptEn: R`Evaluate $\lim_{x \to \infty} \dfrac{3x + 5}{x^2 + 1}$ at a glance.`,
        promptZh: "一眼判断极限 $\\lim_{x \\to \\infty} \\frac{3x + 5}{x^2 + 1}$ 的值是多少？",
        options: [R`$0$`, R`$3$`, R`$5$`, R`$\infty$`],
        correctIndex: 0,
        feedbackCorrect: R`漂亮！分子是一次式（$x^1$），分母是二次式（$x^2$），分母跑得比分子快得多，同除以 $x^2$ 后分子全变 0，分母趋于 1，所以极限是 $0$！`,
        feedbackWrong: R`比一比最高次方：分子最高 $x^1$，分母最高 $x^2$。分母无限变大远远甩开分子，整个分式就会被拉向 $0$。`
      },
      stage2: {
        title: "基础模仿练（因式分解消 0/0）",
        promptEn: R`Evaluate $\lim_{x \to 3} \dfrac{x^2 - 9}{x^2 - 3x}$.`,
        promptZh: "计算极限 $\\lim_{x \\to 3} \\frac{x^2 - 9}{x^2 - 3x}$。",
        type: "input",
        acceptedAnswers: ["2"],
        inputPlaceholder: "输入数值结果",
        hints: [
          R`提示 1：代入 $x = 3$ 发现是 $\frac{0}{0}$，把分子分解成 $(x-3)(x+3)$，分母提取公因式 $x(x-3)$。`,
          R`提示 2：约掉 $(x-3)$ 后剩下 $\lim_{x\to 3}\frac{x+3}{x}$，代入 $x=3$！`
        ],
        solutionHtml: R`
          <p>$$\lim_{x \to 3} \frac{x^2 - 9}{x^2 - 3x} = \lim_{x \to 3} \frac{(x - 3)(x + 3)}{x(x - 3)}$$</p>
          <p>$$= \lim_{x \to 3} \frac{x + 3}{x} = \frac{3 + 3}{3} = 2$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Evaluate $\lim_{x \to \infty} \dfrac{4x^3 + 7x}{8x^3 - 2x^2 + 1}$.`,
        promptZh: "求 $\\lim_{x \\to \\infty} \\frac{4x^3 + 7x}{8x^3 - 2x^2 + 1}$ 的值。",
        type: "input",
        acceptedAnswers: ["0.5", "1/2"],
        inputPlaceholder: "输入分数如 1/2 或小数 0.5",
        hints: [
          R`提示 1 (1M)：标准步骤必须写“分子分母同除以 $x^3$”：$\lim_{x\to\infty}\frac{4 + \frac{7}{x^2}}{8 - \frac{2}{x} + \frac{1}{x^3}}$。`,
          R`提示 2 (1A)：令所有 $\frac{1}{x^k} \to 0$，得 $\frac{4}{8} = \frac{1}{2}$。`
        ],
        solutionHtml: R`
          <p>$$\lim_{x \to \infty} \frac{4x^3 + 7x}{8x^3 - 2x^2 + 1} = \lim_{x \to \infty} \frac{4 + \frac{7}{x^2}}{8 - \frac{2}{x} + \frac{1}{x^3}} \quad \text{(1M)}$$</p>
          <p>$$= \frac{4 + 0}{8 - 0 + 0} = \frac{1}{2} \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["3.2"] = {
    id: "3.2",
    chapterId: "ch3",
    titleZh: "3.2 切线斜率与导数的极限概念",
    titleEn: "Slope of Tangent and Concept of Derivative",
    objectives: [
      "区分平均变化率 <span class=\"term-en\">Average Rate of Change</span>（割线斜率）与瞬时变化率 <span class=\"term-en\">Instantaneous Rate of Change</span>（切线斜率）；",
      "认识牛津 M1A 课本导数定义（基本原理 <span class=\"term-en\">First Principles</span>）与符号 $f'(x)$、$\\frac{dy}{dx}$、$\\Delta x$；",
      "通过动态实验观察 $\\Delta x \\to 0$ 时割线 $PQ$ 如何无缝旋转贴合切线。"
    ],
    intuition: {
      title: "生活场景直觉：高速测速摄像头拍的是“平均时速”还是“瞬间时速”？",
      storyHtml: R`
        <p>假设你爸爸开车 2 小时开了 160 公里，这段路程的<strong>平均速度</strong>是 $\frac{160}{2} = 80\text{ km/h}$——这相当于图上把起点 $P$ 和终点 $Q$ 用直线连起来的<strong>割线（Secant line）斜率 $\frac{\Delta y}{\Delta x}$</strong>。</p>
        <p>可是在路过测速摄像头的那一刹那，仪表盘显示的是 $115\text{ km/h}$！怎么用数学抓出“那一瞬间”的速度？只能把测量时间间隔 $\Delta t$ 缩得越来越小（$1$ 秒 $\to 0.01$ 秒 $\to 0.0001$ 秒 $\to \Delta x \to 0$）！</p>
        <p>当动点 $Q$ 沿着曲线无限滑向定点 $P$ 时，割线就旋转定格成了正好擦过 $P$ 点的<strong>切线（Tangent line）</strong>。这条切线的斜率，就是大名鼎鼎的<strong>导数（Derivative）</strong>！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、基本原理 <span class="term-en">First Principles</span> 与课本符号</h4>
      <p>看一看这本牛津 M1A 书封面上大大的金色 <strong>$\Delta$</strong> 符号——在微积分里，$\Delta x$ 读作 “delta $x$”，代表 $x$ 的微小变化量（增量）；$\Delta y = f(x+\Delta x) - f(x)$ 代表对应 $y$ 的增量。</p>
      <p>当 $\Delta x \to 0$ 时，比值 $\frac{\Delta y}{\Delta x}$ 的极限就是导函数 $f'(x)$，也常写作莱布尼茨记号 $\frac{dy}{dx}$（读作 “d y d x”，注意它是一个整体极限记号，不是简单把 $d$ 约掉！）。</p>

      <h4>二、三种常见且完全等价的导数记号</h4>
      <p>若已知函数 $y = f(x)$，它的导数可以写作：<strong>$f'(x)$</strong>、<strong>$y'$</strong>、或者 <strong>$\frac{dy}{dx}$</strong>。若要表示在特定点 $x = a$ 处的切线斜率，牛津课本标准记作 <strong>$f'(a)$</strong> 或 <strong>$\left.\frac{dy}{dx}\right|_{x=a}$</strong>。</p>
    `,
    formulas: [
      {
        label: "导数定义 / 基本原理 (First Principles)",
        latex: R`$$f'(x) = \frac{dy}{dx} = \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x}$$`,
        note: "等价写法：把 $\\Delta x$ 记作 $h$，即 $f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$；在点 $x = a$ 处为 $f'(a) = \\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$。"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 在极限式 $\lim_{\Delta x \to 0} \frac{f(3+\Delta x) - f(3)}{\Delta x}$ 里直接令 $\Delta x = 0$ 而误以为结果永远不存在。`,
        right: R`✅ 这正是 $f'(3)$ 的定义！它求出的就是函数 $f(x)$ 在 $x = 3$ 处的切线斜率。`
      },
      {
        wrong: R`❌ 混淆平均变化率（Average rate of change）与瞬时变化率（Instantaneous rate of change）。`,
        right: R`✅ 看到“from $x=a$ to $x=b$”算的是<strong>平均</strong>变化率 $\frac{f(b)-f(a)}{b-a}$；看到“at $x=a$”或“rate of change when $t=2$”算的才是<strong>瞬时</strong>导数 $f'(a)$！`
      }
    ],
    syllabusGuard: "HKDSE M1 考纲重要说明：课程发展议会明确规定，M1 学生<strong>只需要认识并理解基本原理的极限定义与几何意义</strong>，公开考试<strong>不要求用基本原理硬推求导</strong>（实际计算一律使用 3.3 节与第 4 章的求导公式！）。",
    examples: [
      {
        title: "Example 1 · 直观体验一次：为什么 x² 的导数恰好是 2x？",
        promptEn: R`Let $f(x) = x^2 + 1$. Find the average rate of change from $x$ to $x + \Delta x$, and hence see what happens as $\Delta x \to 0$.`,
        promptZh: "设 $f(x) = x^2 + 1$，先写出从 $x$ 到 $x+\\Delta x$ 的平均变化率，再观察 $\\Delta x \\to 0$ 时它收敛成什么。",
        steps: [
          {
            math: R`$$\frac{\Delta y}{\Delta x} = \frac{[(x + \Delta x)^2 + 1] - (x^2 + 1)}{\Delta x}$$`,
            why: "代入 $f(x+\\Delta x)$ 和 $f(x)$ 计算割线斜率。"
          },
          {
            math: R`$$= \frac{x^2 + 2x\Delta x + (\Delta x)^2 + 1 - x^2 - 1}{\Delta x} = \frac{2x\Delta x + (\Delta x)^2}{\Delta x} = 2x + \Delta x$$`,
            why: "展开平方项，$x^2$ 与 $1$ 完美消去，再上下约掉零因子 $\\Delta x$。"
          },
          {
            math: R`$$f'(x) = \lim_{\Delta x \to 0} (2x + \Delta x) = 2x$$`,
            why: "令 $\\Delta x \\to 0$，于是 $x^2 + 1$ 在任意位置 $x$ 的切线斜率竟然就是简单的 $2x$！在 $x = 3$ 处斜率为 $6$。"
          }
        ]
      }
    ],
    labId: "lab_secant",
    connections: {
      prereq: [{ id: "3.1", label: "3.1 消去 0/0 极限" }],
      next: [{ id: "3.3", label: "3.3 告别繁琐极限：直接用幂法则求导" }],
      summary: "在下方实验室拖动 $\\Delta x$ 滑块，亲眼看着动点 $Q$ 滑向 $P$、割线斜率变成切线斜率。接下来 3.3 节我们就用高速公式彻底告别每次写极限！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（读懂极限定义记号）",
        promptEn: R`If $f'(4) = -7$, what is the value of $\lim_{\Delta x \to 0} \dfrac{f(4 + \Delta x) - f(4)}{\Delta x}$?`,
        promptZh: "若已知 $f'(4) = -7$，那么极限 $\\lim_{\\Delta x \\to 0} \\frac{f(4 + \\Delta x) - f(4)}{\\Delta x}$ 等于多少？",
        options: [R`$-7$`, R`$4$`, R`$0$`, R`Cannot be determined`],
        correctIndex: 0,
        feedbackCorrect: R`秒杀！$\lim_{\Delta x \to 0} \frac{f(4 + \Delta x) - f(4)}{\Delta x}$ 本身就是 $f'(4)$ 的定义写法，直接等于 $-7$！`,
        feedbackWrong: R`对比一下导数定义公式：$f'(a) = \lim_{\Delta x \to 0}\frac{f(a+\Delta x)-f(a)}{\Delta x}$。这里 $a = 4$，所以这个极限就是 $f'(4) = -7$。`
      },
      stage2: {
        title: "基础模仿练（平均速度 vs 瞬时速度）",
        promptEn: R`The distance $s$ (in m) travelled by a runner after $t$ seconds is $s(t) = 3t^2$. Find the average speed of the runner from $t = 2$ to $t = 2.1$.`,
        promptZh: "一名跑者 $t$ 秒后的路程为 $s(t) = 3t^2$（米）。求他在 $t = 2$ 到 $t = 2.1$ 这段时间的平均速度（单位：m/s）。",
        type: "input",
        acceptedAnswers: ["12.3"],
        inputPlaceholder: "输入小数，例如 12.3",
        hints: [
          R`提示 1：平均速度 $=$ 平均变化率 $= \frac{s(2.1) - s(2)}{2.1 - 2}$。`,
          R`提示 2：$s(2.1) = 3 \times 4.41 = 13.23$，$s(2) = 3 \times 4 = 12$，相减再除以 $0.1$。`
        ],
        solutionHtml: R`
          <p>$$\text{Average speed} = \frac{s(2.1) - s(2)}{2.1 - 2} = \frac{3(2.1)^2 - 3(2)^2}{0.1}$$</p>
          <p>$$= \frac{13.23 - 12}{0.1} = 12.3 \text{ m/s}$$</p>
          <p class="formula-note">直观对比：如果继续把时间间隔缩到 $0.001$ 秒，你会看到它逼近 $t=2$ 时的瞬时速度 $s'(2) = 6(2) = 12\text{ m/s}$！</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Given that $f(x) = x^2 - 4x$, use the definition of derivative to simplify $\dfrac{f(x + \Delta x) - f(x)}{\Delta x}$ ($\Delta x \neq 0$), and hence write down $f'(x)$ and the slope of the tangent to $y = f(x)$ at $x = 5$.`,
        promptZh: "设 $f(x) = x^2 - 4x$，化简差商 $\\frac{f(x+\\Delta x)-f(x)}{\\Delta x}$，从而写出 $f'(x)$ 及曲线在 $x = 5$ 处的切线斜率。",
        type: "mcq",
        options: [
          R`$f'(x) = 2x - 4$, slope at $x = 5$ is $6$`,
          R`$f'(x) = 2x + 4$, slope at $x = 5$ is $14$`,
          R`$f'(x) = x - 4$, slope at $x = 5$ is $1$`,
          R`$f'(x) = 2x - 4$, slope at $x = 5$ is $5$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1 (1M)：$f(x+\Delta x) - f(x) = [(x+\Delta x)^2 - 4(x+\Delta x)] - (x^2 - 4x) = 2x\Delta x + (\Delta x)^2 - 4\Delta x$。`,
          R`提示 2 (1M + 1A)：除以 $\Delta x$ 得 $2x + \Delta x - 4$，令 $\Delta x \to 0$ 得 $f'(x) = 2x - 4$，代入 $x = 5$ 得斜率 $6$。`
        ],
        solutionHtml: R`
          <p>$$\frac{f(x+\Delta x) - f(x)}{\Delta x} = \frac{(x^2 + 2x\Delta x + (\Delta x)^2 - 4x - 4\Delta x) - (x^2 - 4x)}{\Delta x} \quad \text{(1M)}$$</p>
          <p>$$= \frac{2x\Delta x + (\Delta x)^2 - 4\Delta x}{\Delta x} = 2x - 4 + \Delta x \quad \text{(1M)}$$</p>
          <p>$$f'(x) = \lim_{\Delta x \to 0}(2x - 4 + \Delta x) = 2x - 4$$</p>
          <p>Slope at $x = 5$ is $f'(5) = 2(5) - 4 = 6$. $\quad \text{(1A)}$</p>
        `
      }
    }
  };

  units["3.3"] = {
    id: "3.3",
    chapterId: "ch3",
    titleZh: "3.3 基础求导公式与幂法则",
    titleEn: "Basic Differentiation Rules and Power Rule",
    objectives: [
      "熟记常数求导法则、幂法则 <span class=\"term-en\">Power Rule</span>、常数倍与加减法则；",
      "学会“先改写成负指数或分数指数、先拆括号或分式”，再一步套用幂法则求导；",
      "识别考卷最爱挖坑的“常数陷阱”（如 $e^2, \\ln 5, \\pi$ 对 $x$ 求导全部是 $0$！）。"
    ],
    intuition: {
      title: "生活场景直觉：把“斜率机器”升级成一秒出结果的快捷按钮",
      storyHtml: R`
        <p>上一节用基本原理算个 $x^2$ 就要写三行代数。数学家们帮我们把所有 $x^n$ 的极限都提前算好了，总结成一句超顺口的口诀——<strong>“指数搬下来乘在前面，原来的指数减 1”</strong>！</p>
        <p>比如 $y = x^5$：把 $5$ 搬到前面，指数变成 $5 - 1 = 4$，一秒得到 $\frac{dy}{dx} = 5x^4$！</p>
        <p>那根号 $\sqrt{x}$ 和倒数 $\frac{1}{x^2}$ 怎么办？别慌——先给它们“换件马甲”，写成 $x^{1/2}$ 和 $x^{-2}$，照样直接套同一个口诀！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、幂法则 <span class="term-en">Power Rule</span> 对所有实数指数都成立</h4>
      <p>无论是正整数（$x^3$）、负整数（$x^{-2}$）还是分数指数（$x^{1/2}, x^{-3/2}$），规则完全统一：$\frac{d}{dx}(x^n) = nx^{n-1}$。</p>

      <h4>二、求导前的“整形预处理”三板斧</h4>
      <p>看到根式、分母里的 $x$、或乘在一起的多项式时，<strong>求导之前先花 5 秒做代数整理</strong>，能让你少掉 90% 的计算失误：</p>
      <ol>
        <li>根式变分数指数：$\sqrt{x} = x^{\frac{1}{2}}$，$\sqrt[3]{x^2} = x^{\frac{2}{3}}$；</li>
        <li>分母里的 $x$ 翻上去变负指数：$\frac{5}{x^3} = 5x^{-3}$，$\frac{1}{\sqrt{x}} = x^{-\frac{1}{2}}$；</li>
        <li>分母是单项式的多项式分式先拆开：$\frac{x^2 - 4}{\sqrt{x}} = \frac{x^2}{x^{1/2}} - \frac{4}{x^{1/2}} = x^{\frac{3}{2}} - 4x^{-\frac{1}{2}}$。</li>
      </ol>
    `,
    formulas: [
      {
        label: "常数求导与幂法则 (Constant & Power Rules)",
        latex: R`$$\frac{d}{dx}(c) = 0, \qquad \frac{d}{dx}(x) = 1, \qquad \frac{d}{dx}(x^n) = nx^{n-1} \;\; (n \in \mathbb{R})$$`,
        note: "特别记住：任何不含 $x$ 的纯数字（哪怕长得吓人，比如 $e^3, \\ln 7, \\pi^2$），对 $x$ 的导数通通等于 <strong>$0$</strong>！"
      },
      {
        label: "线性法则 (Constant Multiple & Sum/Difference Rules)",
        latex: R`$$\frac{d}{dx}[cf(x)] = cf'(x), \qquad \frac{d}{dx}[f(x) \pm g(x)] = f'(x) \pm g'(x)$$`,
        note: "加减号隔开的每一项，各自独立求导再按原加减号连起来即可。"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 对 $y = e^3 + 2x$ 求导时，把 $e^3$ 套幂法则写成 $3e^2 + 2$。`,
        right: R`✅ $e^3$ 里面根本没有自变量 $x$，它就是一个普通常数！所以 $\frac{d}{dx}(e^3 + 2x) = 0 + 2 = 2$。`
      },
      {
        wrong: R`❌ 对 $\frac{5}{x^2}$ 求导时直接在分母套幂法则，错写成 $\frac{5}{2x}$。`,
        right: R`✅ 必须先翻到分子写成 $5x^{-2}$，再求导得 $5(-2)x^{-2-1} = -10x^{-3} = -\frac{10}{x^3}$！（负指数减 1 变成更负的 $-3$，不是 $-1$！）`
      }
    ],
    examples: [
      {
        title: "Example 1 · 混合负指数与根式求导标准步骤",
        promptEn: R`Find $\dfrac{dy}{dx}$ for each of the following:<br>(a) $y = 4x^3 - \dfrac{5}{x^2} + 6\sqrt{x} - 7$<br>(b) $y = \dfrac{(x - 2)^2}{\sqrt{x}}$`,
        promptZh: "求下列各函数的导数 $\\frac{dy}{dx}$。",
        steps: [
          {
            math: R`$$\text{(a) } y = 4x^3 - 5x^{-2} + 6x^{\frac{1}{2}} - 7$$`,
            why: "第一行先不急着求导，先把分式和根式改写成指数形式 $x^n$。"
          },
          {
            math: R`$$\frac{dy}{dx} = 4(3x^2) - 5(-2x^{-3}) + 6\left(\frac{1}{2}x^{-\frac{1}{2}}\right) - 0 = 12x^2 + \frac{10}{x^3} + \frac{3}{\sqrt{x}}$$`,
            why: "逐项套用幂法则：注意 $-5 \times (-2) = +10$，常数 $-7$ 的导数为 $0$。"
          },
          {
            math: R`$$\text{(b) } y = \frac{x^2 - 4x + 4}{x^{\frac{1}{2}}} = x^{\frac{3}{2}} - 4x^{\frac{1}{2}} + 4x^{-\frac{1}{2}}$$`,
            why: "先展开分子 $(x-2)^2$，再逐项除以 $x^{1/2}$（同底数幂相除，指数相减）。"
          },
          {
            math: R`$$\frac{dy}{dx} = \frac{3}{2}x^{\frac{1}{2}} - 4\left(\frac{1}{2}x^{-\frac{1}{2}}\right) + 4\left(-\frac{1}{2}x^{-\frac{3}{2}}\right) = \frac{3}{2}\sqrt{x} - \frac{2}{\sqrt{x}} - \frac{2}{x^{\frac{3}{2}}}$$`,
            why: "再逐项使用幂法则，算起来丝般顺滑！"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "3.2", label: "3.2 导数的极限概念" }],
      next: [
        { id: "4.1", label: "4.1 乘积与商的求导法则" },
        { id: "4.2", label: "4.2 复合函数链式法则" }
      ],
      summary: "幂法则搞定了单项和加减，但如果遇到两个括号相乘、或者 $(3x^2+1)^{10}$ 这种“包了好几层”的函数怎么办？欢迎进入第 4 章升级求导工具箱！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（防常数陷阱）",
        promptEn: R`Find $\dfrac{d}{dx}\left(e^3 + \ln 5 + 4x\right)$.`,
        promptZh: "求 $e^3 + \\ln 5 + 4x$ 关于 $x$ 的导数。",
        options: [
          R`$4$`,
          R`$3e^2 + \frac{1}{5} + 4$`,
          R`$e^3 + \frac{1}{5} + 4$`,
          R`$e^3 + \ln 5 + 4$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`满分警觉！$e^3$ 和 $\ln 5$ 虽然长着指数和对数的脸，但里面半个 $x$ 都没有，纯属常数！求导全变 $0$，最后只剩 $4$。`,
        feedbackWrong: R`掉进出题人设的小陷阱啦！仔细看 $e^3$ 和 $\ln 5$：它们里面包含变量 $x$ 吗？不包含！所以对 $x$ 来说它们都是固定数字，导数都是 $0$！`
      },
      stage2: {
        title: "基础模仿练（负指数求导）",
        promptEn: R`If $y = 2x^4 - \dfrac{3}{x} + 8$, find $\dfrac{dy}{dx}$.`,
        promptZh: "若 $y = 2x^4 - \\frac{3}{x} + 8$，求 $\\frac{dy}{dx}$。",
        type: "mcq",
        options: [
          R`$8x^3 + \dfrac{3}{x^2}$`,
          R`$8x^3 - \dfrac{3}{x^2}$`,
          R`$8x^3 + 3\ln x$`,
          R`$8x^3 - 3x^{-2} + 8$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：先把 $-\frac{3}{x}$ 改写成 $-3x^{-1}$。`,
          R`提示 2：$-3(-1)x^{-1-1} = +3x^{-2} = +\frac{3}{x^2}$，负负得正且常数 $8$ 消失！`
        ],
        solutionHtml: R`
          <p>$$y = 2x^4 - 3x^{-1} + 8$$</p>
          <p>$$\frac{dy}{dx} = 8x^3 - 3(-1)x^{-2} + 0 = 8x^3 + \frac{3}{x^2}$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Let $f(x) = \dfrac{x^2 - 4}{\sqrt{x}}$ ($x > 0$). Find $f'(4)$.`,
        promptZh: "设 $f(x) = \\frac{x^2 - 4}{\\sqrt{x}}$（$x > 0$），求 $f'(4)$ 的精确数值。",
        type: "input",
        acceptedAnswers: ["3.25", "13/4"],
        inputPlaceholder: "输入小数如 3.25 或分数 13/4",
        hints: [
          R`提示 1 (1M)：先拆成分数指数形式：$f(x) = x^{2 - \frac{1}{2}} - 4x^{-\frac{1}{2}} = x^{\frac{3}{2}} - 4x^{-\frac{1}{2}}$。`,
          R`提示 2 (1M + 1A)：求导得 $f'(x) = \frac{3}{2}x^{\frac{1}{2}} + 2x^{-\frac{3}{2}}$，再把 $x = 4$ 代入（记住 $4^{1/2}=2$，$4^{-3/2} = \frac{1}{8}$）。`
        ],
        solutionHtml: R`
          <p>$$f(x) = \frac{x^2}{x^{1/2}} - \frac{4}{x^{1/2}} = x^{\frac{3}{2}} - 4x^{-\frac{1}{2}} \quad \text{(1M)}$$</p>
          <p>$$f'(x) = \frac{3}{2}x^{\frac{1}{2}} + 2x^{-\frac{3}{2}} \quad \text{(1M)}$$</p>
          <p>$$f'(4) = \frac{3}{2}(4)^{\frac{1}{2}} + 2(4)^{-\frac{3}{2}} = \frac{3}{2}(2) + 2\left(\frac{1}{8}\right) = 3 + \frac{1}{4} = \frac{13}{4} \; (3.25) \quad \text{(1A)}$$</p>
        `
      }
    }
  };
})();
