/* ==========================================================================
   Chapter 6: Indefinite Integration and Its Applications (不定积分及其应用)
   Units 6.1, 6.2, 6.3 — Strictly aligned with Oxford M1A & HKDSE M1
   ========================================================================== */

(function () {
  const R = String.raw;
  const units = window.M1A_DATA.units;

  units["6.1"] = {
    id: "6.1",
    chapterId: "ch6",
    titleZh: "6.1 原函数与基本不定积分公式",
    titleEn: "Anti-derivatives and Basic Indefinite Integration Formulas",
    objectives: [
      "理解不定积分 <span class=\"term-en\">Indefinite Integration</span> 是微分的逆运算（反求导 <span class=\"term-en\">Anti-differentiation</span>）；",
      "牢记积分常数 <span class=\"term-en\">Constant of Integration</span> $+C$ 的几何含义（整族上下平移的平行曲线）；",
      "掌握幂函数、$\\frac{1}{x}$、$e^{kx}$ 与 $(ax+b)^n$ 的基本积分公式，以及积分前“先乘开、先拆项”的预备规则。"
    ],
    intuition: {
      title: "生活场景直觉：从“踩油门记录仪”倒推汽车走了什么路，为什么会缺一个起点高度？",
      storyHtml: R`
        <p>在第 3–5 章里，我们干的事是：已知一条高度曲线 $y = F(x)$，求它在每一处的斜率 $f(x) = F'(x)$。</p>
        <p>现在把录像带<strong>倒过来放</strong>：假如有个机器人走过一段路，只给你留下了每一步的坡度记录 $f(x) = 2x$，让你猜它原本走的是哪条曲线？</p>
        <p>你立刻猜到：$x^2$ 求导刚好是 $2x$！可是慢着：$x^2 + 5$、$x^2 - 100$、$x^2 + \pi$ 求导<strong>通通也是 $2x$</strong>（因为常数求导会无声无息变成 $0$ 消失掉！）。</p>
        <p>于是逆向还原时，数学家必须用 <strong>$+ C$</strong>（代表“未知的初始上下平移高度”）把整族上下平行的曲线全都包进去，写作 $\int 2x\,dx = x^2 + C$！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、读懂积分符号 $\int f(x)\,dx$</h4>
      <ul>
        <li>拉长的 S 形记号 $\int$ 是积分号（来自求和 <span class="term-en">Sum</span> 的首字母），$f(x)$ 是被积函数（<span class="term-en">Integrand</span>），末尾的 <strong>$dx$</strong> 不可省略，它告诉你“当前是关于变量 $x$ 进行积分”。</li>
        <li>写不定积分答案时，牛津课本标准格式会在末尾写上 <strong>$+ C$</strong>，并在第一次出现时注明 <code>where C is a constant</code>。</li>
      </ul>

      <h4>二、重要提醒：积分<strong>没有</strong>“积法则”和“商法则”！</h4>
      <p>求导看到两项相乘可以直接套积法则，但积分遇到乘积或分式<strong>千万不能各自积分再相乘/除</strong>！对于基本积分，必须先花 5 秒做代数变形：</p>
      <ul>
        <li>遇到括号乘积 $\to$ <strong>先展开成多项式相加减</strong>；</li>
        <li>遇到单项分母 $\to$ <strong>先拆成几项幂函数之和</strong>（例如 $\frac{x^3 + 2x - 5}{x} = x^2 + 2 - \frac{5}{x}$）。</li>
      </ul>
    `,
    formulas: [
      {
        label: "幂函数与 1/x 不定积分",
        latex: R`$$\int x^n\,dx = \frac{x^{n+1}}{n+1} + C \;\; (n \neq -1), \qquad \int \frac{1}{x}\,dx = \ln|x| + C$$`,
        note: "幂积分口诀：<strong>“指数加 1，再除以新指数”</strong>！但 $n = -1$ 时分母会变 0，它专门对应 $\\ln|x| + C$（注意绝对值符号 $|x|$ 保障负数也有意义）。"
      },
      {
        label: "指数函数与一次复合线性积分",
        latex: R`$$\int e^x\,dx = e^x + C, \qquad \int e^{kx}\,dx = \frac{1}{k}e^{kx} + C, \qquad \int (ax+b)^n\,dx = \frac{(ax+b)^{n+1}}{a(n+1)} + C \;\;(n\neq -1)$$`,
        note: "反着链式法则想就绝不会错：求导时要乘 $k$（或 $a$），所以积分反过来就得<strong>除以 $k$（或 $a$）</strong>！另外 $\\int a^x\\,dx = \\frac{a^x}{\\ln a} + C$。"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 算 $\int x^3\,dx$ 或 $\int e^{2x}\,dx$ 忘记写 $+ C$，或者对 $\int e^{2x}\,dx$ 写成了 $2e^{2x} + C$（把积分当成求导乘 2 了）。`,
        right: R`✅ 不定积分末尾<strong>必须写 $+ C$</strong>；并且时刻用“把答案再求导回去验算”大法检验：$\left(\frac{1}{2}e^{2x}\right)' = \frac{1}{2}(2e^{2x}) = e^{2x}$ 才对！`
      },
      {
        wrong: R`❌ 直接对分式分子分母各自积分：$\int \frac{x^2 + 1}{x}\,dx = \frac{\frac{1}{3}x^3 + x}{\frac{1}{2}x^2}$。`,
        right: R`✅ <strong>绝对禁止分子分母分别积分！</strong>先拆成 $\int \left(x + \frac{1}{x}\right)\,dx = \frac{1}{2}x^2 + \ln|x| + C$。`
      }
    ],
    syllabusGuard: "HKDSE M1 考纲边界：M1 的积分主要涵盖基本积分表与 6.2 节的代换积分法（Integration by substitution）；<strong>不考</strong> M2 才学的分部积分法（Integration by parts）及三角函数积分。",
    examples: [
      {
        title: "Example 1 · 分式拆项与根式/指数混合不定积分",
        promptEn: R`Find the following indefinite integrals:<br>(a) $\displaystyle\int \left(6x^2 - \frac{4}{x} + \frac{1}{\sqrt{x}}\right) dx$<br>(b) $\displaystyle\int \frac{(x + 1)^2}{x^2}\,dx$`,
        promptZh: "求下列不定积分（先整理成基本幂形式再积分）。",
        steps: [
          {
            math: R`$$\text{(a) } = \int \left(6x^2 - 4\cdot\frac{1}{x} + x^{-\frac{1}{2}}\right) dx$$`,
            why: "把 $\\frac{1}{\\sqrt{x}}$ 写成 $x^{-1/2}$，而 $\\frac{4}{x}$ 保留 $4 \\cdot \\frac{1}{x}$ 提醒自己它积分变 $\\ln|x|$。"
          },
          {
            math: R`$$= 6\cdot\frac{x^3}{3} - 4\ln|x| + \frac{x^{\frac{1}{2}}}{\frac{1}{2}} + C = 2x^3 - 4\ln|x| + 2\sqrt{x} + C$$`,
            why: "指数加 $1$ 再除以新指数（除以 $\\frac{1}{2}$ 就是乘以 $2$），最后千万补上 $+ C$（where $C$ is a constant）。"
          },
          {
            math: R`$$\text{(b) } \int \frac{x^2 + 2x + 1}{x^2}\,dx = \int \left(1 + \frac{2}{x} + x^{-2}\right) dx$$`,
            why: "先展开分子 $(x+1)^2$，再每一项除以 $x^2$ 拆开！"
          },
          {
            math: R`$$= x + 2\ln|x| + \frac{x^{-1}}{-1} + C = x + 2\ln|x| - \frac{1}{x} + C$$`,
            why: "逐项积分，$1$ 的原函数是 $x$，$\\frac{2}{x}$ 变 $2\\ln|x|$，$x^{-2}$ 指数加 1 变 $x^{-1}$ 除以 $-1$。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [
        { id: "3.3", label: "3.3 幂法则求导" },
        { id: "4.3", label: "4.3 指数与对数求导" }
      ],
      next: [
        { id: "6.2", label: "6.2 代换积分法（针对复杂复合函数）" },
        { id: "6.3", label: "6.3 用边界条件确定常数 C" }
      ],
      summary: "如果遇上 $(x^2+1)^5$ 或者乘了外面一坨无法直接展开的积分（比如 $x(x^2+1)^4$），就需要请出下一节的万能钥匙——代换积分法！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（防幂公式 n=-1 踩坑）",
        promptEn: R`Why doesn't the power rule $\displaystyle\int x^n\,dx = \frac{x^{n+1}}{n+1} + C$ work for $\displaystyle\int \frac{1}{x}\,dx$?`,
        promptZh: "为什么求 $\\int \\frac{1}{x}\\,dx$ 时不能套用幂积分公式 $\\frac{x^{n+1}}{n+1}$？它真正的结果是什么？",
        options: [
          R`Because $n = -1$ makes the denominator $n + 1 = 0$; the integral is $\ln|x| + C$`,
          R`Because $x^{-1}$ has no anti-derivative at all`,
          R`Because $\int x^{-1}\,dx = -x^{-2} + C$`,
          R`Because $\int \frac{1}{x}\,dx = \frac{x^0}{0} + C = 0$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`一针见血！$n = -1$ 时套公式分母会变成 $0$，而反过来想“谁求导等于 $\frac{1}{x}$？”，答案正是 $\ln|x| + C$！`,
        feedbackWrong: R`检查一下指数：$\frac{1}{x} = x^{-1}$，若硬代进 $\frac{x^{n+1}}{n+1}$ 分母变成 $-1+1=0$ 会炸掉！记住特例：$\int \frac{1}{x}\,dx = \ln|x| + C$。`
      },
      stage2: {
        title: "基础模仿练（指数与一次幂混合积分）",
        promptEn: R`Find $\displaystyle\int \left(e^{3x} - 4x\right) dx$.`,
        promptZh: "求不定积分 $\\int (e^{3x} - 4x)\\,dx$。",
        type: "mcq",
        options: [
          R`$\dfrac{1}{3}e^{3x} - 2x^2 + C$`,
          R`$3e^{3x} - 2x^2 + C$`,
          R`$\dfrac{1}{3}e^{3x} - 4x^2 + C$`,
          R`$e^{3x} - 2x^2 + C$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：利用 $\int e^{kx}\,dx = \frac{1}{k}e^{kx} + C$，积分时指数系数 $3$ 要除出来！`,
          R`提示 2：验证一下——把选项 A 求导：$\frac{1}{3}(3e^{3x}) - 2(2x) = e^{3x} - 4x$，完全吻合！`
        ],
        solutionHtml: R`
          <p>$$\int \left(e^{3x} - 4x\right) dx = \frac{1}{3}e^{3x} - 4 \cdot \frac{x^2}{2} + C = \frac{1}{3}e^{3x} - 2x^2 + C$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Find $\displaystyle\int \frac{x^3 + 2x - 5}{x}\,dx$ ($x > 0$).`,
        promptZh: "求不定积分 $\\int \\frac{x^3 + 2x - 5}{x}\\,dx$（$x > 0$）。",
        type: "mcq",
        options: [
          R`$\dfrac{x^3}{3} + 2x - 5\ln x + C$`,
          R`$\dfrac{x^3}{3} + 2x + \dfrac{5}{x^2} + C$`,
          R`$\dfrac{\frac{1}{4}x^4 + x^2 - 5x}{\frac{1}{2}x^2} + C$`,
          R`$x^2 - \dfrac{5}{x^2} + C$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1 (1M)：先别积分，把分子三项各自除以分母 $x$，化简成 $\int (x^2 + 2 - \frac{5}{x})\,dx$。`,
          R`提示 2 (1M + 1A)：因为题干已给 $x > 0$，所以 $\ln|x|$ 可直接写为 $\ln x$，逐项积分别漏 $+C$！`
        ],
        solutionHtml: R`
          <p>$$\int \frac{x^3 + 2x - 5}{x}\,dx = \int \left(x^2 + 2 - \frac{5}{x}\right) dx \quad \text{(1M)}$$</p>
          <p>$$= \frac{x^3}{3} + 2x - 5\ln x + C \quad \text{(1M + 1A, since } x > 0\text{)}$$</p>
        `
      }
    }
  };

  units["6.2"] = {
    id: "6.2",
    chapterId: "ch6",
    titleZh: "6.2 代换积分法（换元法）",
    titleEn: "Integration by Substitution",
    objectives: [
      "看懂代换积分法 <span class=\"term-en\">Integration by Substitution</span> 实质就是第 4 章链式法则的“倒带版”；",
      "学会精准锁定内层核心表达式 $u = g(x)$，并写出完整规范的换元步骤 <code>Let u = ...</code>、<code>du = ... dx</code>；",
      "掌握 HKDSE 高频三大换元结构：幂括号型、指数复合型，以及万金油对数分式 $\\int \\frac{f'(x)}{f(x)}\\,dx = \\ln|f(x)| + C$。"
    ],
    intuition: {
      title: "生活场景直觉：用“打包箱 u”把怪兽级积分一口打包变简单！",
      storyHtml: R`
        <p>遇到 $\int x(x^2 + 3)^4\,dx$，括号外面粘着个 $x$，里面又是 $4$ 次方。如果全部展开能累哭人！</p>
        <p>但是敏锐的你马上发现一个秘密：括号里面 $x^2 + 3$ 的导数是 <strong>$2x$</strong>——正好只跟外面的 $x$ 差一个常数倍 $2$！</p>
        <p>于是我们拿一个标签叫 <strong>$u$</strong> 的纸箱，把最麻烦的内核装起来：<code>Let u = x² + 3</code>。接着算它的小尾巴：<code>du = 2x dx</code>（也就是 $x\,dx = \frac{1}{2}\,du$）。</p>
        <p>把这两条塞进原积分，奇迹发生了：<strong>所有的 $x$ 和 $dx$ 全部消失</strong>，变成小学生级的基本积分 $\frac{1}{2}\int u^4\,du$！算完再把 $u$ 拆箱换回 $x^2+3$，完事！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、换元法“如何一眼找准 $u$”的三大黄金信号</h4>
      <ol>
        <li><strong>信号 A（括号/根号/指数的肚子）</strong>：看到 $(x^2+3)^4$、$\sqrt{x^3+1}$ 或 $e^{x^2}$，优先设肚子里的表达式为 $u$，看看外面是不是刚好乘着它的导数（差个常数倍没关系，常数可以随时凑）！</li>
        <li><strong>信号 B（分母型对数结构）</strong>：看到分式 $\int \frac{\text{分子}}{\text{分母}}\,dx$，先测一测“分母的导数”是不是跟分子长得几乎一模一样？若是，直接设 <code>u = 分母</code>，一秒变 $\int \frac{1}{u}\,du = \ln|u| + C$！</li>
        <li><strong>信号 C（顽固一次根式代换）</strong>：遇到 $\int x\sqrt{x + 2}\,dx$，设 $u = x + 2$ 后外面还多一个 $x$？别急！从 $u = x + 2$ 反解出 <strong>$x = u - 2$</strong> 代进去，根号里变单字母 $u^{1/2}$，外面变 $(u-2)$，一乘开就能积分了！</li>
      </ol>
    `,
    formulas: [
      {
        label: "代换积分法基本模式 (Substitution Rule)",
        latex: R`$$\int f\bigl(g(x)\bigr) g'(x)\,dx = \int f(u)\,du \qquad \text{where } u = g(x),\; du = g'(x)\,dx$$`,
        note: "切记：在不定积分的中间步一旦换成了 $u$，表达式里<strong>绝对不能同时混出现 $x$ 和 $u$</strong>！并且最终答案必须把 $u$ 换回 $x$！"
      },
      {
        label: "HKDSE 高频速认黄金式",
        latex: R`$$\int \frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + C, \qquad \int f'(x)\,e^{f(x)}\,dx = e^{f(x)} + C$$`,
        note: "即使能一眼看出结果，考试仍建议老老实实写出 <code>Let u = ...</code> 换元步骤，稳稳拿到过程分 <code>(1M)</code>！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 设了 $u = x^2 + 3$ 后直接把 $dx$ 改写成 $du$，忘记除以导数 $2x$（即漏掉 $du = 2x\,dx$ 带来的系数 $\frac{1}{2}$）！`,
        right: R`✅ 每次设完 $u$，第一步必须写 $\frac{du}{dx} = g'(x) \implies du = g'(x)\,dx$，严格把 $dx$ 替换干净，常数因子就会自动浮现！`
      },
      {
        wrong: R`❌ 算完 $\frac{1}{10}u^5 + C$ 就直接交卷了，忘记把 $u$ 换回原变量 $x$。`,
        right: R`✅ 不定积分题目原来是用 $x$ 问的，答案末尾必须还原回 $x$：$\frac{1}{10}(x^2 + 3)^5 + C$！`
      }
    ],
    examples: [
      {
        title: "Example 1 · 经典换元法与线性反代换技巧",
        promptEn: R`Evaluate:<br>(a) $\displaystyle\int x(x^2 + 3)^4\,dx$<br>(b) $\displaystyle\int x\sqrt{x + 2}\,dx$`,
        promptZh: "利用代换积分法求下列不定积分。",
        steps: [
          {
            math: R`$$\text{(a) Let } u = x^2 + 3. \quad \text{Then } \frac{du}{dx} = 2x \implies x\,dx = \frac{1}{2}\,du$$`,
            why: "观察到 $(x^2+3)' = 2x$ 与外面的 $x$ 匹配，写出标准 $u$ 与 $du$ 转换。"
          },
          {
            math: R`$$\int x(x^2 + 3)^4\,dx = \int u^4 \left(\frac{1}{2}\,du\right) = \frac{1}{2}\cdot\frac{u^5}{5} + C = \frac{1}{10}(x^2 + 3)^5 + C$$`,
            why: "把常数 $\\frac{1}{2}$ 提出来，积分成 $\\frac{u^5}{5}$ 后，把 $u$ 换回 $x^2+3$。"
          },
          {
            math: R`$$\text{(b) Let } u = x + 2. \quad \text{Then } x = u - 2 \text{ and } dx = du$$`,
            why: "遇到根号内部是一次式 $x+2$，设 $u = x+2$ 并反解出外面的 $x = u - 2$！"
          },
          {
            math: R`$$\int (u - 2)u^{\frac{1}{2}}\,du = \int \left(u^{\frac{3}{2}} - 2u^{\frac{1}{2}}\right) du = \frac{2}{5}(x+2)^{\frac{5}{2}} - \frac{4}{3}(x+2)^{\frac{3}{2}} + C$$`,
            why: "括号乘进去拆成两项幂函数积分，最后把 $u$ 还原为 $(x+2)$。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "4.2", label: "4.2 链式法则" }, { id: "6.1", label: "6.1 基本积分公式" }],
      next: [
        { id: "6.3", label: "6.3 还原变化率函数" },
        { id: "7.1", label: "7.1 定积分换元记得“同步换上下限”！" }
      ],
      summary: "今天学到的 <code>Let u = ...</code> 到了第 7 章 7.1 节算定积分时还有一个更省力的超级特权：换元的同时把上下限也换成 $u$ 的值，算完直接代值，连换回 $x$ 都省了！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（选对换元对象 u）",
        promptEn: R`To evaluate $\displaystyle\int \frac{2x + 1}{x^2 + x + 7}\,dx$, which substitution works best?`,
        promptZh: "计算 $\\int \\frac{2x + 1}{x^2 + x + 7}\\,dx$ 时，最巧妙的代换选择是设哪一部分为 $u$？",
        options: [
          R`Let $u = x^2 + x + 7$`,
          R`Let $u = 2x + 1$`,
          R`Let $u = x^2$`,
          R`Let $u = \frac{1}{x^2 + x + 7}$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`太有眼光了！因为分母 $x^2+x+7$ 求导正好是分子 $2x+1$，设 $u = x^2+x+7$ 后整个积分瞬间变成 $\int \frac{1}{u}\,du = \ln|u|+C$！`,
        feedbackWrong: R`看看分母的导数是什么：$(x^2 + x + 7)' = 2x + 1$，居然一字不差地坐在分子位置！所以设 $u = x^2 + x + 7$ 最妙！`
      },
      stage2: {
        title: "基础模仿练（幂复合换元）",
        promptEn: R`Find $\displaystyle\int 6x(x^2 + 1)^4\,dx$.`,
        promptZh: "利用代换法求 $\\int 6x(x^2 + 1)^4\\,dx$。",
        type: "mcq",
        options: [
          R`$\dfrac{3}{5}(x^2 + 1)^5 + C$`,
          R`$\dfrac{6}{5}(x^2 + 1)^5 + C$`,
          R`$3(x^2 + 1)^5 + C$`,
          R`$\dfrac{1}{5}(x^2 + 1)^5 + C$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：设 $u = x^2 + 1$，则 $du = 2x\,dx$。`,
          R`提示 2：外面的 $6x\,dx$ 恰好等于 $3 \cdot (2x\,dx) = 3\,du$！所以原式化为 $\int 3u^4\,du$。`
        ],
        solutionHtml: R`
          <p>Let $u = x^2 + 1$. Then $du = 2x\,dx \implies 6x\,dx = 3\,du$.</p>
          <p>$$\int 6x(x^2 + 1)^4\,dx = \int 3u^4\,du = \frac{3}{5}u^5 + C = \frac{3}{5}(x^2 + 1)^5 + C$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Find $\displaystyle\int \frac{e^{2x}}{e^{2x} + 3}\,dx$.`,
        promptZh: "求不定积分 $\\int \\frac{e^{2x}}{e^{2x} + 3}\\,dx$。",
        type: "mcq",
        options: [
          R`$\dfrac{1}{2}\ln(e^{2x} + 3) + C$`,
          R`$\ln(e^{2x} + 3) + C$`,
          R`$2\ln(e^{2x} + 3) + C$`,
          R`$\dfrac{1}{2}e^{2x}\ln(e^{2x} + 3) + C$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1 (1M)：设分母 $u = e^{2x} + 3$，注意复合导数 $du = 2e^{2x}\,dx$（别漏了这个 $2$！）。`,
          R`提示 2 (1M + 1A)：于是 $e^{2x}\,dx = \frac{1}{2}\,du$，原积分化为 $\frac{1}{2}\int \frac{1}{u}\,du$；因为 $e^{2x}+3 > 0$，可省去绝对值号。`
        ],
        solutionHtml: R`
          <p>Let $u = e^{2x} + 3$. Then $\frac{du}{dx} = 2e^{2x} \implies e^{2x}\,dx = \frac{1}{2}\,du$. $\quad \text{(1M)}$ </p>
          <p>$$\int \frac{e^{2x}}{e^{2x} + 3}\,dx = \frac{1}{2}\int \frac{1}{u}\,du \quad \text{(1M)}$$</p>
          <p>$$= \frac{1}{2}\ln|u| + C = \frac{1}{2}\ln(e^{2x} + 3) + C \quad \text{(1A, since } e^{2x}+3 > 0\text{)}$$</p>
        `
      }
    }
  };

  units["6.3"] = {
    id: "6.3",
    chapterId: "ch6",
    titleZh: "6.3 不定积分的应用：由变化率还原原函数",
    titleEn: "Applications: Recovering Functions from Rates of Change",
    objectives: [
      "能根据导函数 $\\frac{dy}{dx}$ 与曲线上某一点 $(x_0, y_0)$，用积分并解出积分常数 $C$，唯一确定曲线方程；",
      "学会解商业与科学建模应用题：由边际成本 $\\frac{dC}{dx}$、人口增长率 $\\frac{dP}{dt}$ 积分还原总函数；",
      "避开“直接假设 $C$ 一定等于初始值 $f(0)$”的经典大坑（指数函数在 $t=0$ 时不等于 0！）。"
    ],
    intuition: {
      title: "生活场景直觉：只靠坡度还原山脉高度，再给你“山脚海拔”，就能锁定唯一的一座山！",
      storyHtml: R`
        <p>前面我们知道，光靠坡度函数 $f'(x)$ 积分还原出来的曲线是一整族“上下浮动 $+C$ 的平行曲线”。就像你知道了整条登山步道的坡度变化，但不知道起点是在海平面还是在海拔 500 米。</p>
        <p>只要题干多给你<strong>一个坐标锚点</strong>——比如“曲线经过 $(2, 5)$”或者“开店初期（$x=0$）固定成本是 100 元”——你就能瞬间把浮动常数 $C$ 钉死，锁定全世界唯一的那条函数曲线！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、常见“已知变化率求原量”应用题三步曲</h4>
      <ol>
        <li><strong>不定积分得通式</strong>：写 $P(t) = \int \frac{dP}{dt}\,dt = \cdots + C$；</li>
        <li><strong>代入初始条件（Boundary / Initial Condition）求 $C$</strong>：将已知点 $(t_0, P_0)$ 代入算出具体数值 $C$；</li>
        <li><strong>回写完整函数并预测</strong>：把求出的 $C$ 填回表达式，再代入题目想预测的时间或产量。</li>
      </ol>
      <p>⚠️ <strong>高危警告</strong>：遇到 $\int 6e^{0.2t}\,dt = 30e^{0.2t} + C$ 时，把 $t = 0$ 代入得 $30e^0 + C = 30 + C$，而不是 $0 + C$！<strong>永远老老实实代入 $t=0$ 解方程求 $C$，千万别猜 $C = P(0)$！</strong></p>
    `,
    formulas: [
      {
        label: "由变化率与边界点还原函数",
        latex: R`$$y = \int \frac{dy}{dx}\,dx = F(x) + C, \qquad \text{Substitute } (x_0, y_0) \implies C = y_0 - F(x_0)$$`,
        note: "商业高频术语：Marginal Cost（边际成本）$\\frac{dC}{dx}$ $\\xrightarrow{\\text{积分}}$ Total Cost（总成本）$C(x)$；固定成本（Fixed cost）对应 $x = 0$ 时的成本 $C(0)$。"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 题目说“最初人口为 50 千（$P(0)=50$）”，算完 $P(t) = 30e^{0.2t} + C$ 后不代值，直接把 $C$ 当成 $50$。`,
        right: R`✅ $e^0 = 1$ 而不是 $0$！必须把 $t = 0, P = 50$ 老实代入：$50 = 30(1) + C \implies C = 20$，所以 $P(t) = 30e^{0.2t} + 20$！`
      }
    ],
    examples: [
      {
        title: "Example 1 · 曲线方程还原 + 人口增长率逆推（含 $t=0$ 陷阱破解）",
        promptEn: R`(a) The slope of a curve at any point $(x, y)$ is $\dfrac{dy}{dx} = 3x^2 - 4x$. If the curve passes through $(2, 5)$, find its equation.<br>(b) The rate of growth of a town's population $P$ (in thousands) is $\dfrac{dP}{dt} = 6e^{0.2t}$. Initially ($t = 0$), the population is $50$ thousand. Express $P$ in terms of $t$.`,
        promptZh: "（a）已知斜率公式及过点 $(2, 5)$ 求曲线方程。（b）已知人口增长率及初始值 $P(0)=50$ 求 $P(t)$。",
        steps: [
          {
            math: R`$$\text{(a) } y = \int (3x^2 - 4x)\,dx = x^3 - 2x^2 + C$$`,
            why: "先对导数求不定积分，得到带 $+C$ 的通式。"
          },
          {
            math: R`$$\text{Since } (2, 5) \text{ lies on the curve: } 5 = 2^3 - 2(2)^2 + C \implies C = 5 \implies y = x^3 - 2x^2 + 5$$`,
            why: "代入 $(2, 5)$ 解出 $C = 5$ 并写出最终方程。"
          },
          {
            math: R`$$\text{(b) } P = \int 6e^{0.2t}\,dt = \frac{6}{0.2}e^{0.2t} + C = 30e^{0.2t} + C$$`,
            why: "对增长率积分：除以指数系数 $0.2$ 相当于乘 $5$，得到 $30e^{0.2t} + C$。"
          },
          {
            math: R`$$\text{When } t = 0,\; P = 50: \quad 50 = 30e^0 + C = 30 + C \implies C = 20 \implies P = 30e^{0.2t} + 20$$`,
            why: "关键一步！代入 $t = 0$ 时 $e^0 = 1$，算出 $C = 20$ 而不是 $50$！"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "6.1", label: "6.1 基本积分与 +C" }, { id: "6.2", label: "6.2 代换积分法" }],
      next: [{ id: "7.1", label: "7.1 第 7 章：加入上下限，无需求 C 直接算净变化！" }],
      summary: "第 6 章让我们学会了求单个原函数；第 7 章加上了积分上下限 $a$ 和 $b$ 后，你会惊喜地发现 $C$ 会自己正负抵消掉，并直接解锁“曲线下面积”与“梯形法则”！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（防 C = 初始值误区）",
        promptEn: R`If $f(t) = 10e^{2t} + C$ and $f(0) = 25$, what is the value of $C$?`,
        promptZh: "如果积分后得到 $f(t) = 10e^{2t} + C$，且初始条件 $f(0) = 25$，那么积分常数 $C$ 等于多少？",
        options: [R`$15$`, R`$25$`, R`$35$`, R`$2.5$`],
        correctIndex: 0,
        feedbackCorrect: R`满分警觉！把 $t=0$ 代进去得 $10e^0 + C = 10 + C = 25$，所以 $C = 15$，千万别直接照抄 25！`,
        feedbackWrong: R`把 $t = 0$ 代进函数：$f(0) = 10e^0 + C = 10(1) + C$。令它等于 $25$，所以 $C = 25 - 10 = 15$！`
      },
      stage2: {
        title: "基础模仿练（求曲线方程）",
        promptEn: R`A curve passes through $(1, 6)$ and its slope at any point $(x, y)$ is $\dfrac{dy}{dx} = 4x - 1$. Find the equation of the curve.`,
        promptZh: "一条曲线经过 $(1, 6)$，且任意一点切线斜率为 $\\frac{dy}{dx} = 4x - 1$，求该曲线方程。",
        type: "mcq",
        options: [
          R`$y = 2x^2 - x + 5$`,
          R`$y = 2x^2 - x + 6$`,
          R`$y = 4x^2 - x + 3$`,
          R`$y = 2x^2 - x + 1$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：积分得 $y = 2x^2 - x + C$。`,
          R`提示 2：代入点 $(1, 6)$：$6 = 2(1)^2 - 1 + C \implies C = 5$。`
        ],
        solutionHtml: R`
          <p>$$y = \int (4x - 1)\,dx = 2x^2 - x + C$$</p>
          <p>Since the curve passes through $(1, 6)$, $6 = 2(1)^2 - 1 + C \implies C = 5$.</p>
          <p>Thus $y = 2x^2 - x + 5$.</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`The marginal cost (in dollars per unit) of producing $x$ items is $\dfrac{dC}{dx} = 20 + \dfrac{60}{(x + 2)^2}$. Given that the fixed cost (when $x = 0$) is $\$100$, find the total cost of producing $8$ items (in dollars).`,
        promptZh: "生产 $x$ 件商品的边际成本为 $\\frac{dC}{dx} = 20 + \\frac{60}{(x + 2)^2}$（元/件）。已知 $x = 0$ 时的固定成本为 $100$ 元，求生产 $8$ 件商品的总成本（元）。",
        type: "input",
        acceptedAnswers: ["284"],
        inputPlaceholder: "输入总成本金额（纯数字）",
        hints: [
          R`提示 1 (1M)：把 $\frac{60}{(x+2)^2}$ 写成 $60(x+2)^{-2}$ 积分：$C(x) = 20x - \frac{60}{x+2} + k$（用 $k$ 区分成本字母 $C$！）。`,
          R`提示 2 (2M)：代入 $x = 0, C = 100$：$100 = 0 - \frac{60}{2} + k \implies k = 130$；最后再代入 $x = 8$ 算总成本！`
        ],
        solutionHtml: R`
          <p>$$C(x) = \int \left(20 + 60(x + 2)^{-2}\right) dx = 20x - \frac{60}{x + 2} + k \quad \text{(1M)}$$</p>
          <p>When $x = 0$, $C = 100$: $100 = 0 - \frac{60}{2} + k \implies k = 130$. $\quad \text{(1M)}$ </p>
          <p>So $C(x) = 20x - \frac{60}{x + 2} + 130$.</p>
          <p>When $x = 8$: $C(8) = 20(8) - \frac{60}{10} + 130 = 160 - 6 + 130 = \$284$. $\quad \text{(1A)}$ </p>
        `
      }
    }
  };
})();
