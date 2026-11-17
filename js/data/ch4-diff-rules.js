/* ==========================================================================
   Chapter 4: Differentiation (微分法)
   Units 4.1, 4.2, 4.3, 4.4 — Strictly aligned with Oxford M1A & HKDSE M1
   ========================================================================== */

(function () {
  const R = String.raw;
  const units = window.M1A_DATA.units;

  units["4.1"] = {
    id: "4.1",
    chapterId: "ch4",
    titleZh: "4.1 乘积法则与商法则",
    titleEn: "Product Rule and Quotient Rule",
    objectives: [
      "理解为什么两个函数相乘求导<strong>不能</strong>直接各自求导相乘；",
      "熟练背诵并应用积法则 <span class=\"term-en\">Product Rule</span> 与商法则 <span class=\"term-en\">Quotient Rule</span>；",
      "学会提取公因式化简分子，为第 5 章求驻点解 $f'(x) = 0$ 打好基础。"
    ],
    intuition: {
      title: "生活场景直觉：为什么长方形面积的增长率不是“长增长率 × 宽增长率”？",
      storyHtml: R`
        <p>想象一块长 $u$、宽 $v$ 的可伸缩矩形画布（面积 $A = u \cdot v$）。如果长增加了微小的一条 $\Delta u$，宽也增加了微小的一条 $\Delta v$，那么新面积多出来的部分主要由<strong>两条长条</strong>组成：</p>
        <ul>
          <li>保持原长 $u$ 不变，宽度拉伸 $\Delta v$ 贡献的窄条：$u \cdot \Delta v$；</li>
          <li>保持原宽 $v$ 不变，长度拉伸 $\Delta u$ 贡献的窄条：$v \cdot \Delta u$；</li>
          <li>（角落极小的一块 $\Delta u \cdot \Delta v$ 在极限中微不足道直接归零！）</li>
        </ul>
        <p>所以乘积的变化率等于<strong>“第一个不动 $\times$ 第二个的导数 ＋ 第二个不动 $\times$ 第一个的导数”</strong>——这就是大名鼎鼎的积法则！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、积法则 <span class="term-en">Product Rule</span>：“左留右导 ＋ 右留左导”</h4>
      <p>当 $y = u \cdot v$（其中 $u, v$ 都是关于 $x$ 的函数）时，口诀非常简单：<strong>轮流求导一次，再相加</strong>。因为加法满足交换律，谁先谁后都不怕出错！</p>

      <h4>二、商法则 <span class="term-en">Quotient Rule</span>：“底乘顶导 － 顶乘底导，除以底平方”</h4>
      <p>当 $y = \frac{u}{v}$（$u$ 是分子“顶”，$v$ 是分母“底”）时，分子变成了<strong>减法</strong>，顺序绝对不能反！记忆锚点：<strong>永远让分母 $v$ 站在最前面做领头羊</strong>，先写 $v \frac{du}{dx}$，再减去 $u \frac{dv}{dx}$，最后分母整体平方 $v^2$。</p>
      <p><em>偷懒小提示</em>：如果分子或分母只是一个纯常数（例如 $\frac{5}{x^2+1}$ 或 $\frac{x^2+1}{5}$），别杀鸡用牛刀套商法则——分母是常数就直接除以 $5$；分子是常数可看作 $5(x^2+1)^{-1}$ 用链式法则更快！</p>
    `,
    formulas: [
      {
        label: "积法则 (Product Rule)",
        latex: R`$$\frac{d}{dx}(uv) = u\frac{dv}{dx} + v\frac{du}{dx}$$`,
        note: "简写记忆：$(uv)' = u v' + v u'$"
      },
      {
        label: "商法则 (Quotient Rule)",
        latex: R`$$\frac{d}{dx}\left(\frac{u}{v}\right) = \frac{v\frac{du}{dx} - u\frac{dv}{dx}}{v^2}$$`,
        note: "简写记忆：$\\left(\\frac{u}{v}\\right)' = \\frac{v u' - u v'}{v^2}$（注意分母 $v^2$ 通常保留括号平方即可，不要手痒展开！）"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 误以为 $\frac{d}{dx}(u \cdot v) = \frac{du}{dx} \cdot \frac{dv}{dx}$（例如认为 $(x^2 \cdot x^3)' = (2x)(3x^2) = 6x^3$，其实正确答案是 $5x^4$！）。`,
        right: R`✅ 必须套用积法则：$(x^2)(3x^2) + (x^3)(2x) = 3x^4 + 2x^4 = 5x^4$。`
      },
      {
        wrong: R`❌ 商法则分子相减写反成 $\frac{u v' - v u'}{v^2}$，或者减去第二项时忘记加括号分配负号！`,
        right: R`✅ 牢记“先底后顶”（$v u' - u v'$），并且减号后面的多项式一定要套上一整层括号再展开负号！`
      }
    ],
    examples: [
      {
        title: "Example 1 · 积法则与商法则标准示范",
        promptEn: R`Find $\dfrac{dy}{dx}$ for:<br>(a) $y = (x^2 + 3)(2x - 5)$<br>(b) $y = \dfrac{3x - 1}{x^2 + 4}$`,
        promptZh: "分别利用积法则与商法则求导数 $\\frac{dy}{dx}$。",
        steps: [
          {
            math: R`$$\text{(a) } \frac{dy}{dx} = (x^2 + 3)\frac{d}{dx}(2x - 5) + (2x - 5)\frac{d}{dx}(x^2 + 3)$$`,
            why: "运用积法则：先留住 $(x^2+3)$ 对 $(2x-5)$ 求导，再留住 $(2x-5)$ 对 $(x^2+3)$ 求导。"
          },
          {
            math: R`$$= (x^2 + 3)(2) + (2x - 5)(2x) = 2x^2 + 6 + 4x^2 - 10x = 6x^2 - 10x + 6$$`,
            why: "展开并合并同类项。如果先乘开原式再求导也会得到完全相同的 $6x^2 - 10x + 6$！"
          },
          {
            math: R`$$\text{(b) } \frac{dy}{dx} = \frac{(x^2 + 4)\frac{d}{dx}(3x - 1) - (3x - 1)\frac{d}{dx}(x^2 + 4)}{(x^2 + 4)^2}$$`,
            why: "套用商法则：分母 $(x^2+4)$ 领头乘以分子的导数，减去分子乘以分母的导数。"
          },
          {
            math: R`$$= \frac{(x^2 + 4)(3) - (3x - 1)(2x)}{(x^2 + 4)^2} = \frac{3x^2 + 12 - (6x^2 - 2x)}{(x^2 + 4)^2} = \frac{-3x^2 + 2x + 12}{(x^2 + 4)^2}$$`,
            why: "特别留意减号后面先用括号保住 $(6x^2-2x)$ 再变号，分母保留 $(x^2+4)^2$ 不必展开。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "3.3", label: "3.3 幂法则与基础求导" }],
      next: [{ id: "4.2", label: "4.2 链式法则（处理嵌套复合函数）" }],
      summary: "乘除解决“并排关系”的两个函数；但如果遇到括号外面再套高次方（比如 $(x^2+4)^5$）这种“套娃关系”，就要请出 4.2 节的王牌——链式法则！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（识别规则边界）",
        promptEn: R`Which of the following is the correct first step to differentiate $y = \dfrac{x^3}{2x + 1}$?`,
        promptZh: "对 $y = \\frac{x^3}{2x + 1}$ 求导时，以下哪一个商法则算式是完全正确的？",
        options: [
          R`$\dfrac{(2x + 1)(3x^2) - x^3(2)}{(2x + 1)^2}$`,
          R`$\dfrac{x^3(2) - (2x + 1)(3x^2)}{(2x + 1)^2}$`,
          R`$\dfrac{3x^2}{2}$`,
          R`$\dfrac{(2x + 1)(3x^2) + x^3(2)}{(2x + 1)^2}$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`非常规范！底 $(2x+1)$ 乘顶导 $3x^2$，减去顶 $x^3$ 乘底导 $2$，再除以底的平方 $(2x+1)^2$！`,
        feedbackWrong: R`检查商法则口诀：“底乘顶导减顶乘底导，除以底平方”，且中间是减号不是加号，绝对不能分子分母各自求导相除！`
      },
      stage2: {
        title: "基础模仿练（分式求导化简）",
        promptEn: R`Differentiate $y = \dfrac{x + 2}{x - 1}$ with respect to $x$.`,
        promptZh: "求 $y = \\frac{x + 2}{x - 1}$ 关于 $x$ 的导数 $\\frac{dy}{dx}$。",
        type: "mcq",
        options: [
          R`$\dfrac{-3}{(x - 1)^2}$`,
          R`$\dfrac{3}{(x - 1)^2}$`,
          R`$\dfrac{2x + 1}{(x - 1)^2}$`,
          R`$1$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：套用商法则，分子写成 $(x-1)\cdot 1 - (x+2)\cdot 1$。`,
          R`提示 2：展开括号时记住负号分配：$x - 1 - x - 2 = -3$！`
        ],
        solutionHtml: R`
          <p>$$\frac{dy}{dx} = \frac{(x - 1)(1) - (x + 2)(1)}{(x - 1)^2} = \frac{x - 1 - x - 2}{(x - 1)^2} = \frac{-3}{(x - 1)^2}$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Let $f(x) = \dfrac{2x^2 + 1}{x + 1}$. Find the exact value of $f'(1)$.`,
        promptZh: "设 $f(x) = \\frac{2x^2 + 1}{x + 1}$，求 $f'(1)$ 的精确值。",
        type: "input",
        acceptedAnswers: ["1.25", "5/4"],
        inputPlaceholder: "输入分数如 5/4 或小数 1.25",
        hints: [
          R`提示 1 (1M)：用商法则求出 $f'(x) = \frac{(x+1)(4x) - (2x^2+1)(1)}{(x+1)^2}$。`,
          R`提示 2 (1A)：化简分子为 $2x^2 + 4x - 1$（或直接把 $x=1$ 代入上式），得出 $\frac{2(4) - 3}{2^2} = \frac{5}{4}$。`
        ],
        solutionHtml: R`
          <p>$$f'(x) = \frac{(x + 1)(4x) - (2x^2 + 1)(1)}{(x + 1)^2} \quad \text{(1M)}$$</p>
          <p>$$= \frac{4x^2 + 4x - 2x^2 - 1}{(x + 1)^2} = \frac{2x^2 + 4x - 1}{(x + 1)^2}$$</p>
          <p>$$f'(1) = \frac{2(1)^2 + 4(1) - 1}{(1 + 1)^2} = \frac{5}{4} \; (1.25) \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["4.2"] = {
    id: "4.2",
    chapterId: "ch4",
    titleZh: "4.2 链式法则（剥洋葱模型）",
    titleEn: "The Chain Rule",
    objectives: [
      "建立复合函数 <span class=\"term-en\">Composite Function</span> 的“外层函数 + 内层函数”分层眼光；",
      "熟练运用链式法则 <span class=\"term-en\">Chain Rule</span>：$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$；",
      "攻克“积法则 + 链式法则”或“商法则 + 链式法则”混合求导并学会抽取最低次幂公因式。"
    ],
    intuition: {
      title: "生活场景直觉：齿轮传动与“一层一层剥洋葱”",
      storyHtml: R`
        <p>想象两个咬合的齿轮：小齿轮 $x$ 每转 1 圈，中齿轮 $u$ 转 3 圈（$\frac{du}{dx} = 3$）；而中齿轮 $u$ 每转 1 圈，大齿轮 $y$ 转 5 圈（$\frac{dy}{du} = 5$）。问 $x$ 转 1 圈时 $y$ 转几圈？很简单，把传动比相乘：$5 \times 3 = 15$ 圈！</p>
        <p>求复合函数如 $y = (3x^2 + 1)^5$ 的导数就像剥洋葱：</p>
        <ol>
          <li><strong>先剥外皮</strong>：把括号里那坨整块当作一个大字母 $u$，对 $u^5$ 求导得 $5u^4$（记住：此时括号里面的内容原封不动抄下来！）；</li>
          <li><strong>再剥内芯</strong>：在末尾补乘上“括号里面的导数”$(3x^2+1)' = 6x$。</li>
        </ol>
        <p>把外层导数与内层导数乘在一起：$5(3x^2+1)^4 \cdot 6x = 30x(3x^2+1)^4$，瞬间搞定！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、链式法则 <span class="term-en">Chain Rule</span> 的两种书写思维</h4>
      <ul>
        <li><strong>分步设 $u$ 法（初学最稳）</strong>：设 $u = g(x)$，原式变 $y = f(u)$，分别算出 $\frac{dy}{du}$ 和 $\frac{du}{dx}$ 相乘，最后把 $u$ 换回 $x$ 的表达式。</li>
        <li><strong>直接剥洋葱口诀（熟练后秒杀）</strong>：<code>外层求导（内层照抄） × 内层求导</code>。</li>
      </ul>

      <h4>二、必杀化简技：遇到带分式指数（如 $\sqrt{x^2+3}$）的混合求导</h4>
      <p>当题目把<strong>积法则</strong>和<strong>链式法则</strong>混在一起（例如 $y = x\sqrt{x^2+3}$），求完导会出现两项加在一起，而且一项带 $(x^2+3)^{-1/2}$、另一项带 $(x^2+3)^{1/2}$。标准化简做法是：<strong>通分母把 $\sqrt{x^2+3}$ 放到下面</strong>，或者直接提出较低次幂公因式 $(x^2+3)^{-1/2}$，分子瞬间变成非常干净的多项式！</p>
    `,
    formulas: [
      {
        label: "链式法则标准式 (Chain Rule)",
        latex: R`$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$$`,
        note: "幂次复合最常用特例：$\\frac{d}{dx}[f(x)]^n = n[f(x)]^{n-1} \cdot f'(x)$"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 剥外皮的时候顺手把里面也求导了：把 $(3x^2 + 1)^5$ 错写成 $5(6x)^4$。`,
        right: R`✅ <strong>外层求导时，括号里面的内层函数必须原封不动照抄！</strong>然后再在外面乘以内层导数：$5(3x^2 + 1)^4 \cdot 6x$。`
      },
      {
        wrong: R`❌ 忘记最后乘上内层导数 $f'(x)$（尤其是一次括号 $(2x + 7)^5$，常常忘了乘 $2$！）。`,
        right: R`✅ 养成肌肉记忆：只要括号里面不是单独一个 $x$，求完外导后灵魂必问一句“我乘以里面的导数了吗？”`
      }
    ],
    examples: [
      {
        title: "Example 1 · 剥洋葱求导 + 积链混合化简",
        promptEn: R`Find $\dfrac{dy}{dx}$ for:<br>(a) $y = \dfrac{4}{\sqrt{2x + 7}}$<br>(b) $y = x^2\sqrt{1 + 3x}$`,
        promptZh: "求下列含根式的复合函数导数，并将结果化为最简分式。",
        steps: [
          {
            math: R`$$\text{(a) } y = 4(2x + 7)^{-\frac{1}{2}}$$`,
            why: "先将分母根号翻到分子变成负分数指数。"
          },
          {
            math: R`$$\frac{dy}{dx} = 4\left(-\frac{1}{2}\right)(2x + 7)^{-\frac{3}{2}} \cdot \frac{d}{dx}(2x + 7) = -2(2x + 7)^{-\frac{3}{2}} \cdot 2 = -\frac{4}{(2x + 7)^{\frac{3}{2}}}$$`,
            why: "外层指数 $-\\frac{1}{2}$ 搬下来并减 $1$ 得 $-\\frac{3}{2}$（内层 $2x+7$ 照抄），最后别忘补乘内层导数 $2$！"
          },
          {
            math: R`$$\text{(b) } \frac{dy}{dx} = x^2 \cdot \frac{1}{2}(1 + 3x)^{-\frac{1}{2}}(3) + (1 + 3x)^{\frac{1}{2}} \cdot (2x)$$`,
            why: "先识别整体结构是 $x^2$ 乘 $\\sqrt{1+3x}$（积法则），对后者求导时套用链式法则乘上内层导数 $3$。"
          },
          {
            math: R`$$= \frac{3x^2}{2\sqrt{1+3x}} + 2x\sqrt{1+3x} = \frac{3x^2 + 4x(1 + 3x)}{2\sqrt{1 + 3x}} = \frac{x(15x + 4)}{2\sqrt{1 + 3x}}$$`,
            why: "用公共分母 $2\\sqrt{1+3x}$ 通分，分子中的 $\\sqrt{1+3x} \\cdot \\sqrt{1+3x}$ 刚好消掉根号变成 $(1+3x)$！"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "4.1", label: "4.1 积法则与商法则" }],
      next: [
        { id: "4.3", label: "4.3 链式法则用在 eᵘ 与 ln u 上" },
        { id: "5.6", label: "5.6 关联变化率 dV/dt = (dV/dh)(dh/dt)" },
        { id: "6.2", label: "6.2 逆向链式法则：代换积分法" }
      ],
      summary: "链式法则是整个微积分最核心的引擎——第 5 章的关联变化率直接把 $\\frac{dy}{dx} = \\frac{dy}{du}\\frac{du}{dx}$ 拿来用；第 6 章的代换积分法更是链式法则的“倒带”！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（检查是否忘了乘内层导数）",
        promptEn: R`What is $\dfrac{d}{dx}(3x - 5)^4$?`,
        promptZh: "使用链式法则求 $(3x - 5)^4$ 的导数，结果是哪一个？",
        options: [
          R`$12(3x - 5)^3$`,
          R`$4(3x - 5)^3$`,
          R`$4(3)^3$`,
          R`$3(3x - 5)^3$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`漂亮！外层 $4(3x-5)^3$ 乘以内层 $(3x-5)' = 3$，合起来就是 $12(3x-5)^3$！`,
        feedbackWrong: R`小心漏掉内层导数！外层求导得 $4(3x-5)^3$，之后千万别忘记乘以括号内部 $(3x-5)$ 的导数 $3$！`
      },
      stage2: {
        title: "基础模仿练（根式复合求导代值）",
        promptEn: R`If $y = \sqrt{4x + 1}$, find the value of $\dfrac{dy}{dx}$ when $x = 2$.`,
        promptZh: "若 $y = \\sqrt{4x + 1}$，求当 $x = 2$ 时 $\\frac{dy}{dx}$ 的值。",
        type: "input",
        acceptedAnswers: ["2/3"],
        inputPlaceholder: "输入最简分数，如 2/3",
        hints: [
          R`提示 1：改写为 $y = (4x+1)^{\frac{1}{2}}$，链式法则得 $\frac{dy}{dx} = \frac{1}{2}(4x+1)^{-\frac{1}{2}} \cdot 4 = \frac{2}{\sqrt{4x+1}}$。`,
          R`提示 2：把 $x = 2$ 代入得 $\frac{2}{\sqrt{9}}$。`
        ],
        solutionHtml: R`
          <p>$$y = (4x + 1)^{\frac{1}{2}}$$</p>
          <p>$$\frac{dy}{dx} = \frac{1}{2}(4x + 1)^{-\frac{1}{2}} \cdot 4 = \frac{2}{\sqrt{4x + 1}}$$</p>
          <p>$$\left.\frac{dy}{dx}\right|_{x=2} = \frac{2}{\sqrt{4(2) + 1}} = \frac{2}{3}$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Let $y = x\sqrt{x^2 + 3}$. Find $\dfrac{dy}{dx}$ and evaluate $\left.\dfrac{dy}{dx}\right|_{x=1}$.`,
        promptZh: "设 $y = x\\sqrt{x^2 + 3}$，求 $\\frac{dy}{dx}$ 并计算其在 $x = 1$ 处的值。",
        type: "input",
        acceptedAnswers: ["2.5", "5/2"],
        inputPlaceholder: "输入小数如 2.5 或分数 5/2",
        hints: [
          R`提示 1 (2M)：用积法则 + 链式法则：$\frac{dy}{dx} = x \cdot \frac{1}{2}(x^2+3)^{-\frac{1}{2}}(2x) + (x^2+3)^{\frac{1}{2}}(1)$。`,
          R`提示 2 (1A)：化简成 $\frac{x^2}{\sqrt{x^2+3}} + \sqrt{x^2+3} = \frac{2x^2 + 3}{\sqrt{x^2 + 3}}$，代入 $x = 1$ 得 $\frac{5}{2}$。`
        ],
        solutionHtml: R`
          <p>$$\frac{dy}{dx} = x \cdot \frac{1}{2}(x^2 + 3)^{-\frac{1}{2}}(2x) + \sqrt{x^2 + 3} \cdot 1 \quad \text{(2M)}$$</p>
          <p>$$= \frac{x^2}{\sqrt{x^2 + 3}} + \sqrt{x^2 + 3} = \frac{2x^2 + 3}{\sqrt{x^2 + 3}}$$</p>
          <p>$$\left.\frac{dy}{dx}\right|_{x=1} = \frac{2(1)^2 + 3}{\sqrt{1^2 + 3}} = \frac{5}{2} \; (2.5) \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["4.3"] = {
    id: "4.3",
    chapterId: "ch4",
    titleZh: "4.3 指数函数与对数函数的导数",
    titleEn: "Derivatives of Exponential and Logarithmic Functions",
    objectives: [
      "熟记并惊叹于 $e^x$ 导数等于自身（$\\frac{d}{dx}(e^x) = e^x$）及 $\\frac{d}{dx}(\\ln x) = \\frac{1}{x}$ 的优美性质；",
      "用链式法则自如计算 $e^{u}$、$a^x$、$\\ln u$、$\\log_a x$ 的导数；",
      "掌握考卷省力王牌技：<strong>先用对数法则拆分 $\\ln(\\text{复杂乘除})$，再求导</strong>！"
    ],
    intuition: {
      title: "生活场景直觉：宇宙中唯一“增长速度恰好等于自己身高”的函数",
      storyHtml: R`
        <p>为什么第 2 章费尽心机要定义古怪的无理数 $e \approx 2.71828$，而不是用好算的 $2$ 或 $10$？谜底终于在微积分里揭晓！</p>
        <p>如果你去测量 $y = 2^x$ 在每一点的切线斜率，会发现斜率永远是函数值乘以一个讨厌的常数 $\ln 2 \approx 0.693$；测量 $y = 10^x$ 会多出一个 $\ln 10 \approx 2.303$。<strong>唯有把底数选成 $e$ 时，由于 $\ln e = 1$，斜率与高度之比恰好等于 $1$！</strong></p>
        <p>换句话说，$y = e^x$ 的导数就是它自己：$e^x$ 在 $x=2$ 处的高度是 $e^2$，切线斜率也正好是 $e^2$！它就是微积分世界里的“免检通行证”！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、指数与对数求导双子星（配合链式法则）</h4>
      <ul>
        <li><strong>自然指数求导 $\frac{d}{dx}(e^u) = e^u \cdot \frac{du}{dx}$</strong>：口诀是<strong>“$e$ 的什么次方照抄一遍，再乘上指数的导数”</strong>！如果底数不是 $e$ 而是任意正数 $a$（如 $5^x$），多乘一个 $\ln a$ 即可：$\frac{d}{dx}(a^x) = a^x \ln a$。</li>
        <li><strong>自然对数求导 $\frac{d}{dx}(\ln u) = \frac{1}{u} \cdot \frac{du}{dx} = \frac{u'}{u}$</strong>：口诀是<strong>“把 $\ln$ 后面的真数整个踢到分母，分子放真数的导数”</strong>！如果底数是 $a$（如 $\log_{10} x$），分母多乘一个 $\ln a$：$\frac{d}{dx}(\log_a x) = \frac{1}{x \ln a}$。</li>
      </ul>

      <h4>二、必杀省力大招：“对数求导先拆再算”</h4>
      <p>如果题干让你求 $y = \ln\left(\frac{x^3\sqrt{x+1}}{(2x-1)^4}\right)$ 的导数，千万别直接套 $\frac{u'}{u}$ 硬套商法则+积法则+链式法则！</p>
      <p><strong>先花 5 秒用第 2 章的对数法则拆开</strong>：$y = 3\ln x + \frac{1}{2}\ln(x+1) - 4\ln(2x-1)$，然后每一小块心算两秒直接出答案！</p>
    `,
    formulas: [
      {
        label: "指数函数求导公式 (Exponential Derivatives)",
        latex: R`$$\frac{d}{dx}(e^x) = e^x, \quad \frac{d}{dx}(e^u) = e^u \frac{du}{dx}, \quad \frac{d}{dx}(a^x) = a^x \ln a$$`,
        note: "提醒：对于 $a^{f(x)}$，同样先改写或套链式：$\\frac{d}{dx}(a^{f(x)}) = a^{f(x)} (\\ln a) f'(x)$。"
      },
      {
        label: "对数函数求导公式 (Logarithmic Derivatives)",
        latex: R`$$\frac{d}{dx}(\ln x) = \frac{1}{x}, \quad \frac{d}{dx}(\ln u) = \frac{1}{u}\frac{du}{dx}, \quad \frac{d}{dx}(\log_a x) = \frac{1}{x \ln a}$$`,
        note: "特别巧合：$\\frac{d}{dx}\\ln(kx) = \\frac{k}{kx} = \\frac{1}{x}$，常数倍 $k$ 求导后居然直接消失了！（因为 $\\ln(kx) = \\ln k + \\ln x$）"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 拿幂法则去硬套 $e^x$ 或 $2^x$：把 $\frac{d}{dx}(e^x)$ 错写成 $x e^{x-1}$，或者把 $\frac{d}{dx}(2^x)$ 错写成 $x 2^{x-1}$。`,
        right: R`✅ <strong>幂法则（$x^n$）的变量在底数，指数函数（$a^x$）的变量在指数！</strong>指数函数求导绝对不降次：$(e^x)' = e^x$，$(2^x)' = 2^x \ln 2$。`
      },
      {
        wrong: R`❌ 对 $\ln(x^2+1)$ 求导只写成 $\frac{1}{x^2+1}$，忘记分子要乘内层导数 $2x$。`,
        right: R`✅ 牢记口诀“真数放分母，<strong>真数的导数放分子</strong>”：$\frac{d}{dx}\ln(x^2+1) = \frac{2x}{x^2+1}$。`
      }
    ],
    examples: [
      {
        title: "Example 1 · 混合 eˣ 与先拆对数再求导示范",
        promptEn: R`Find $\dfrac{dy}{dx}$ for:<br>(a) $y = x^2 e^{-2x}$<br>(b) $y = \ln\left(\dfrac{x^3\sqrt{x + 1}}{(2x - 1)^4}\right)$ $\quad (x > \frac{1}{2})$`,
        promptZh: "求下列含指数与对数函数的导数。",
        steps: [
          {
            math: R`$$\text{(a) } \frac{dy}{dx} = x^2 \frac{d}{dx}(e^{-2x}) + e^{-2x}\frac{d}{dx}(x^2) = x^2(-2e^{-2x}) + e^{-2x}(2x)$$`,
            why: "积法则 + 链式法则：$e^{-2x}$ 求导照抄一遍再乘 $(-2x)' = -2$。"
          },
          {
            math: R`$$= 2x(1 - x)e^{-2x}$$`,
            why: "考试好习惯：把永远为正的公因式 $e^{-2x}$ 提取到外面，为第 5 章令 $f'(x) = 0$ 做好准备！"
          },
          {
            math: R`$$\text{(b) } y = 3\ln x + \frac{1}{2}\ln(x + 1) - 4\ln(2x - 1)$$`,
            why: "绝招登场：求导前先用对数法则把乘除和根号拆成加减与系数！"
          },
          {
            math: R`$$\frac{dy}{dx} = \frac{3}{x} + \frac{1}{2(x + 1)} - \frac{4 \cdot 2}{2x - 1} = \frac{3}{x} + \frac{1}{2(x + 1)} - \frac{8}{2x - 1}$$`,
            why: "对每一项单独套用 $\\frac{u'}{u}$：注意第三项内层 $(2x-1)' = 2$，所以分子是 $4 \\times 2 = 8$。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [
        { id: "2.2", label: "2.2 eˣ 与对数运算法则" },
        { id: "4.2", label: "4.2 链式法则" }
      ],
      next: [
        { id: "4.4", label: "4.4 二阶导数" },
        { id: "6.1", label: "6.1 逆向思考：∫ eˣ dx 与 ∫ (1/x) dx" }
      ],
      summary: "记住这组公式后，第 6 章的积分简直等于反着读一遍：既然 $(\\ln u)' = \\frac{u'}{u}$，那么看见分母是 $u$、分子刚好凑出 $u'$ 的积分，答案必然就是 $\\ln|u| + C$！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（分清 eˣ 与常数）",
        promptEn: R`Find $\dfrac{d}{dx}\left(e^{5x} + e^5\right)$.`,
        promptZh: "求 $e^{5x} + e^5$ 关于 $x$ 的导数。",
        options: [
          R`$5e^{5x}$`,
          R`$5e^{5x} + 5e^4$`,
          R`$e^{5x} + e^5$`,
          R`$5e^{5x} + e^5$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`滴水不漏！$e^{5x}$ 求导照抄乘 5 得 $5e^{5x}$；而 $e^5$ 不含 $x$，是个纯常数，导数为 $0$！`,
        feedbackWrong: R`检查两部分：第一项 $e^{5x}$ 套链式法则得 $5e^{5x}$；第二项 $e^5$ 是一个具体数值（约 $148.4$），导数为 $0$ 哦！`
      },
      stage2: {
        title: "基础模仿练（对数复合求导）",
        promptEn: R`Differentiate $y = \ln(3x^2 + 4)$ with respect to $x$.`,
        promptZh: "求 $y = \\ln(3x^2 + 4)$ 的导数 $\\frac{dy}{dx}$。",
        type: "mcq",
        options: [
          R`$\dfrac{6x}{3x^2 + 4}$`,
          R`$\dfrac{1}{3x^2 + 4}$`,
          R`$\dfrac{1}{6x}$`,
          R`$\dfrac{6x}{\ln(3x^2 + 4)}$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：令 $u = 3x^2 + 4$，应用 $\frac{d}{dx}(\ln u) = \frac{u'}{u}$。`,
          R`提示 2：分母直接照抄 $3x^2 + 4$，分子放它的导数 $(3x^2+4)' = 6x$。`
        ],
        solutionHtml: R`
          <p>$$\frac{dy}{dx} = \frac{1}{3x^2 + 4} \cdot \frac{d}{dx}(3x^2 + 4) = \frac{6x}{3x^2 + 4}$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Let $y = \ln\left(\dfrac{(x + 1)^2}{x + 3}\right)$ for $x > -1$. Find the value of $\left.\dfrac{dy}{dx}\right|_{x=1}$.`,
        promptZh: "设 $y = \\ln\\left(\\frac{(x + 1)^2}{x + 3}\\right)$（$x > -1$），求 $\\left.\\frac{dy}{dx}\\right|_{x=1}$ 的值。",
        type: "input",
        acceptedAnswers: ["0.75", "3/4"],
        inputPlaceholder: "输入分数如 3/4 或小数 0.75",
        hints: [
          R`提示 1 (1M)：先别直接套商法则！利用对数法则改写为 $y = 2\ln(x+1) - \ln(x+3)$。`,
          R`提示 2 (1M + 1A)：求导得 $\frac{dy}{dx} = \frac{2}{x+1} - \frac{1}{x+3}$，再把 $x = 1$ 代入计算 $1 - \frac{1}{4}$。`
        ],
        solutionHtml: R`
          <p>Using the laws of logarithms:</p>
          <p>$$y = 2\ln(x + 1) - \ln(x + 3) \quad \text{(1M)}$$</p>
          <p>$$\frac{dy}{dx} = \frac{2}{x + 1} - \frac{1}{x + 3} \quad \text{(1M)}$$</p>
          <p>$$\left.\frac{dy}{dx}\right|_{x=1} = \frac{2}{1 + 1} - \frac{1}{1 + 3} = 1 - \frac{1}{4} = \frac{3}{4} \; (0.75) \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["4.4"] = {
    id: "4.4",
    chapterId: "ch4",
    titleZh: "4.4 二阶导数",
    titleEn: "Second Derivative",
    objectives: [
      "理解二阶导数 <span class=\"term-en\">Second Derivative</span> 的定义与课本标准记号 $f''(x)$、$\\frac{d^2y}{dx^2}$；",
      "能够先化简一阶导数（如提取指数公因式），再高效计算二阶导数；",
      "了解二阶导数的物理意义（加速度）与几何伏笔（曲线弯曲方向——第 5 章凹凸性）。"
    ],
    intuition: {
      title: "生活场景直觉：位置 $\\to$ 速度（一阶导）$\\to$ 踩油门的推背感（二阶导）",
      storyHtml: R`
        <p>开车时，如果你记录每一秒的<strong>位置</strong> $s(t)$：</p>
        <ul>
          <li>位置变化有多快？是<strong>速度</strong> $v(t) = s'(t)$（一阶导数）。</li>
          <li>速度本身变化有多快（你踩油门或刹车的猛烈程度）？就是<strong>加速度</strong> $a(t) = v'(t) = s''(t)$（二阶导数）！</li>
        </ul>
        <p>在图像上也一样：一阶导数告诉你“斜坡有多陡”，而<strong>二阶导数告诉你“坡度是在变陡（向上翘）还是在变缓（向下弯）”</strong>——这正是下一章和第 7 章梯形法则压轴题的核心武器！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、二阶导数的牛津课本标准记号</h4>
      <p>将一阶导函数 $f'(x)$ 视作一个普通新函数，对它<strong>再求一次导数</strong>，就是二阶导数：</p>
      <p>$$f''(x) = \frac{d}{dx}\bigl[f'(x)\bigr] \qquad \text{或} \qquad \frac{d^2y}{dx^2} = \frac{d}{dx}\left(\frac{dy}{dx}\right)$$</p>
      <p>注意记号细节：分子上的平方写在 $d$ 上面（$d^2y$），分母上的平方写在 $x$ 上面（$dx^2$），读作 “d squared y over d x squared”。</p>

      <h4>二、算二阶导的黄金铁律：“先整理化简 $y'$，再动手算 $y''$”</h4>
      <p>千万不要对着一团乱麻似的 $f'(x)$ 直接二阶求导！例如算出 $y' = x(2e^{2x}) + e^{2x}$ 后，先合并提取公因式写成 $y' = (2x + 1)e^{2x}$，然后再用一次积法则算 $y''$，计算量能直接减半！</p>
    `,
    formulas: [
      {
        label: "二阶导数记号与含义",
        latex: R`$$f''(x) = y'' = \frac{d^2y}{dx^2} = \frac{d}{dx}\left(\frac{dy}{dx}\right)$$`,
        note: "在 $x = a$ 处的二阶导数值记为 $f''(a)$ 或 $\\left.\\frac{d^2y}{dx^2}\\right|_{x=a}$。"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 望文生义，以为 $\frac{d^2y}{dx^2}$ 等于一阶导数的平方 $\left(\frac{dy}{dx}\right)^2$！`,
        right: R`✅ $\frac{d^2y}{dx^2}$ 的含义是连续做两次 $\frac{d}{dx}$ 运算（求导两次），绝不是把 $\frac{dy}{dx}$ 平方！例如 $y = x^2$ 时，$\left(\frac{dy}{dx}\right)^2 = 4x^2$，而 $\frac{d^2y}{dx^2} = 2$。`
      }
    ],
    examples: [
      {
        title: "Example 1 · 含指数与分式的二阶导数标准计算",
        promptEn: R`(a) Given $y = x e^{2x}$, find $\dfrac{dy}{dx}$ and $\dfrac{d^2y}{dx^2}$.<br>(b) Let $f(x) = \ln(x^2 + 1)$. Find $f''(1)$.`,
        promptZh: "（a）求 $y = xe^{2x}$ 的一阶导与二阶导。（b）设 $f(x) = \\ln(x^2+1)$，求 $f''(1)$。",
        steps: [
          {
            math: R`$$\text{(a) } \frac{dy}{dx} = x(2e^{2x}) + e^{2x}(1) = (2x + 1)e^{2x}$$`,
            why: "用积法则算出 $y'$ 后，先顺手提取 $e^{2x}$ 整理好，再做下一步。"
          },
          {
            math: R`$$\frac{d^2y}{dx^2} = (2x + 1)(2e^{2x}) + e^{2x}(2) = (4x + 2 + 2)e^{2x} = 4(x + 1)e^{2x}$$`,
            why: "对 $(2x+1)e^{2x}$ 再套一次积法则，并继续合并提取 $e^{2x}$。"
          },
          {
            math: R`$$\text{(b) } f'(x) = \frac{2x}{x^2 + 1}$$`,
            why: "第一阶：套用 $\\frac{d}{dx}\\ln u = \\frac{u'}{u}$。"
          },
          {
            math: R`$$f''(x) = \frac{(x^2 + 1)(2) - 2x(2x)}{(x^2 + 1)^2} = \frac{2 - 2x^2}{(x^2 + 1)^2} \implies f''(1) = \frac{2 - 2(1)^2}{(1 + 1)^2} = 0$$`,
            why: "第二阶对分式使用商法则，整理分子后代入 $x = 1$ 得 $0$。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "4.1", label: "4.1 积/商法则" }, { id: "4.3", label: "4.3 指数对数求导" }],
      next: [
        { id: "5.4", label: "5.4 二阶导数看凹凸性与二阶导判别法" },
        { id: "7.3", label: "7.3 用 f''(x) 判定梯形法则高估或低估" }
      ],
      summary: "第 4 章求导工具箱已全套配齐！带着一阶导与二阶导这两把透视镜，我们马上进入第 5 章，把曲线的秘密一眼看穿！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（防记号误解）",
        promptEn: R`If $y = x^3$, what is $\dfrac{d^2y}{dx^2}$ vs $\left(\dfrac{dy}{dx}\right)^2$?`,
        promptZh: "若 $y = x^3$，则二阶导数 $\\frac{d^2y}{dx^2}$ 与一阶导数的平方 $\\left(\\frac{dy}{dx}\\right)^2$ 分别是什么？",
        options: [
          R`$\frac{d^2y}{dx^2} = 6x$ and $\left(\frac{dy}{dx}\right)^2 = 9x^4$`,
          R`Both are equal to $9x^4$`,
          R`Both are equal to $6x$`,
          R`$\frac{d^2y}{dx^2} = 3x^2$ and $\left(\frac{dy}{dx}\right)^2 = 6x$`
        ],
        correctIndex: 0,
        feedbackCorrect: R`概念极其清晰！$\frac{dy}{dx} = 3x^2$，再求导一次得 $\frac{d^2y}{dx^2} = 6x$；而一阶导数的平方是 $(3x^2)^2 = 9x^4$，两者完全不同！`,
        feedbackWrong: R`自己动手算一次就明白了：$\frac{dy}{dx} = 3x^2$，继续求导得 $6x$（这是 $\frac{d^2y}{dx^2}$）；而把 $3x^2$ 平方是 $9x^4$。`
      },
      stage2: {
        title: "基础模仿练（多项式二阶导代值）",
        promptEn: R`If $f(x) = x^4 - 6x^2 + 5x - 1$, find $f''(2)$.`,
        promptZh: "若 $f(x) = x^4 - 6x^2 + 5x - 1$，求 $f''(2)$。",
        type: "input",
        acceptedAnswers: ["36"],
        inputPlaceholder: "输入数值结果",
        hints: [
          R`提示 1：先求一阶导 $f'(x) = 4x^3 - 12x + 5$。`,
          R`提示 2：再求二阶导 $f''(x) = 12x^2 - 12$，代入 $x = 2$。`
        ],
        solutionHtml: R`
          <p>$$f'(x) = 4x^3 - 12x + 5$$</p>
          <p>$$f''(x) = 12x^2 - 12$$</p>
          <p>$$f''(2) = 12(2)^2 - 12 = 48 - 12 = 36$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Let $y = (x + 3)e^{-x}$. Find $\dfrac{d^2y}{dx^2}$ and evaluate $\left.\dfrac{d^2y}{dx^2}\right|_{x=0}$.`,
        promptZh: "设 $y = (x + 3)e^{-x}$，求二阶导数 $\\frac{d^2y}{dx^2}$ 及其在 $x = 0$ 处的值。",
        type: "input",
        acceptedAnswers: ["1"],
        inputPlaceholder: "输入在 x=0 处的数值",
        hints: [
          R`提示 1 (1M)：先算一阶导并提取公因式：$y' = (x+3)(-e^{-x}) + e^{-x}(1) = -(x+2)e^{-x}$。`,
          R`提示 2 (1M + 1A)：再算二阶导 $y'' = -(x+2)(-e^{-x}) + e^{-x}(-1) = (x+1)e^{-x}$，最后令 $x = 0$！`
        ],
        solutionHtml: R`
          <p>$$\frac{dy}{dx} = (x + 3)(-e^{-x}) + e^{-x}(1) = -(x + 2)e^{-x} \quad \text{(1M)}$$</p>
          <p>$$\frac{d^2y}{dx^2} = -(x + 2)(-e^{-x}) + e^{-x}(-1) = (x + 2 - 1)e^{-x} = (x + 1)e^{-x} \quad \text{(1M)}$$</p>
          <p>$$\left.\frac{d^2y}{dx^2}\right|_{x=0} = (0 + 1)e^0 = 1 \quad \text{(1A)}$$</p>
        `
      }
    }
  };
})();
