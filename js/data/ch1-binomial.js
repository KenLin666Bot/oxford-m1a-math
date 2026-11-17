/* ==========================================================================
   Chapter 1: Binomial Expansion (二项展式)
   Units 1.1, 1.2, 1.3 — Strictly aligned with Oxford M1A & HKDSE M1
   ========================================================================== */

(function () {
  const R = String.raw;
  const units = window.M1A_DATA.units;

  units["1.1"] = {
    id: "1.1",
    chapterId: "ch1",
    titleZh: "1.1 阶乘记号与组合数",
    titleEn: "Factorial Notation and Combinations",
    objectives: [
      "理解阶乘 <span class=\"term-en\">Factorial</span> ($n!$) 的连乘意义与 $0! = 1$ 的规定；",
      "掌握牛津课本标准组合记号 <span class=\"term-en\">Combination</span> $C_r^n$ 的计算与化简；",
      "认识帕斯卡三角形 <span class=\"term-en\">Pascal's Triangle</span> 与组合数对称性质 $C_r^n = C_{n-r}^n$。"
    ],
    intuition: {
      title: "生活场景直觉：从选珍珠奶茶加料到“只选不排”的组合数",
      storyHtml: R`
        <p>想象你去买珍珠奶茶，柜台有 5 种不同配料（珍珠、椰果、布丁、仙草、红豆），店员说“任选 2 种加料免费”。</p>
        <p>第一份加料有 5 种选择，第二份剩下 4 种选择，似乎有 $5 \times 4 = 20$ 种点法？不对！“珍珠＋布丁”和“布丁＋珍珠”放进同一杯里<strong>根本是同一杯奶茶</strong>！所以我们要除以 2 份配料重复的排列数 $2! = 2 \times 1$，真正不同的搭配只有 $\frac{5 \times 4}{2 \times 1} = 10$ 种。</p>
        <p>这种<strong>“只选出来、不管先后顺序”</strong>的挑选方式，就是数学里的<strong>组合</strong> <span class="term-en">Combination</span>，也是我们接下来展开高次括号 $(a+b)^n$ 系数秘密的钥匙！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、阶乘 <span class="term-en">Factorial Notation</span></h4>
      <p>对于正整数 $n$，从 $n$ 一路连乘到 $1$ 的结果记作 $n!$（读作 <span class="term-en">n factorial</span>）：</p>
      <p>$5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$。它满足一个超好用的“拆包”规律：$n! = n \times (n-1)!$。例如 $8! = 8 \times 7 \times 6!$，这样在分式上下约分时可以瞬间秒杀！</p>
      <p>为了保证公式自洽，数学特别规定：$0! = 1$（可理解为“什么都不选只有 1 种方案”）。</p>

      <h4>二、组合数 <span class="term-en">Combination</span> 与牛津课本记号</h4>
      <p>从 $n$ 个不同物品中选出 $r$ 个（不计顺序，$0 \le r \le n$），方案数在牛津 M1A 课本中写作 $C_r^n$（也常在计算器上看到 <code>nCr</code>，或在一些高阶文献写作 $\binom{n}{r}$，HKDSE 考评局全部认可，但在做校内及 M1A 练习时优先习惯课本标准的 $C_r^n$）。</p>
      <p>观察它的<strong>对称性质</strong>：从 5 种配料中“选 2 种要加的”，等价于“选 3 种不加的”，因此 $C_2^5 = C_3^5 = 10$。这解释了为什么二项展开式的系数总是前后对称！</p>
    `,
    formulas: [
      {
        label: "阶乘定义 (Factorial)",
        latex: R`$$n! = n(n-1)(n-2)\cdots 2 \cdot 1, \qquad 0! = 1$$`,
        note: "常用约分技巧：$(n+1)! = (n+1) \cdot n!$"
      },
      {
        label: "组合数公式 (Combination)",
        latex: R`$$C_r^n = \frac{n!}{r!(n-r)!} = \frac{n(n-1)\cdots(n-r+1)}{r!}$$`,
        note: "性质：$C_0^n = C_n^n = 1$，$C_1^n = n$，$C_r^n = C_{n-r}^n$"
      },
      {
        label: "帕斯卡恒等式 (Pascal's Identity)",
        latex: R`$$C_r^n + C_{r+1}^n = C_{r+1}^{n+1}$$`,
        note: "帕斯卡三角形中，上一行相邻两数之和等于下一行正下方的数。"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 误以为 $0! = 0$，导致计算 $C_0^5 = \frac{5!}{0!\cdot 5!}$ 时分母变成 0。`,
        right: R`✅ 永远记住 $0! = 1$，因此 $C_0^n = \frac{n!}{1\cdot n!} = 1$。`
      },
      {
        wrong: R`❌ 把 $C_2^n$ 硬背成 $\frac{n(n-1)}{2}$ 却忘了除以 $r!$（算 $C_3^n$ 时漏乘 $\frac{1}{6}$）。`,
        right: R`✅ $C_3^n = \frac{n(n-1)(n-2)}{3!} = \frac{n(n-1)(n-2)}{6}$，分母一定要有 $r!$。`
      }
    ],
    syllabusGuard: "记号提醒：牛津 M1A 课本及本地学校最常用 $C_r^n$（上标 $n$、下标 $r$）；考评局（HKEAA）评分指引同时接受 $C_r^n$ 与 $\\binom{n}{r}$。考试可直接使用计算器上的 <code>nCr</code> 键核对纯数字组合。",
    examples: [
      {
        title: "Example 1 · 阶乘约分与组合方程求解",
        promptEn: R`(a) Simplify $\dfrac{(n+1)!}{(n-1)!}$ without leaving factorial signs.<br>(b) Solve the equation $C_2^n = 15$ for a positive integer $n$.`,
        promptZh: "（a）化简分式 $\\frac{(n+1)!}{(n-1)!}$。（b）求正整数 $n$ 使得 $C_2^n = 15$。",
        steps: [
          {
            math: R`$$\text{(a) } \frac{(n+1)!}{(n-1)!} = \frac{(n+1)\cdot n \cdot (n-1)!}{(n-1)!} = n(n+1)$$`,
            why: "把较大的阶乘 $(n+1)!$ 往外拆两步到 $(n-1)!$，上下直接消掉 $(n-1)!$。"
          },
          {
            math: R`$$\text{(b) } C_2^n = 15 \implies \frac{n(n-1)}{2!} = 15$$`,
            why: "展开 $C_2^n$：分子从 $n$ 往下连乘 2 个数，分母是 $2! = 2$。"
          },
          {
            math: R`$$n(n-1) = 30 \implies n^2 - n - 30 = 0$$`,
            why: "两边同乘 $2$ 整理成标准一元二次方程。"
          },
          {
            math: R`$$(n - 6)(n + 5) = 0 \implies n = 6 \quad \text{or} \quad n = -5 \text{ (rejected)}$$`,
            why: "因为 $n$ 必须是正整数且 $n \ge 2$，舍去负根 $-5$，最后得出 $n = 6$。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [],
      next: [
        { id: "1.2", label: "1.2 二项式定理" },
        { id: "1.3", label: "1.3 通项与系数求解" }
      ],
      summary: "今天学到的组合数 $C_r^n$，就是下一节展开 $(a+b)^n$ 时每一项前面的“神秘系数”！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（不死算，先判断）",
        promptEn: R`Which of the following is equal to $C_7^{10}$?`,
        promptZh: "下列哪一个组合数一定与 $C_7^{10}$ 相等？",
        options: [R`$C_3^{10}$`, R`$C_7^3$`, R`$C_3^7$`, R`$10! / 7!$`],
        correctIndex: 0,
        feedbackCorrect: R`太棒了！利用组合数的对称性 $C_r^n = C_{n-r}^n$，从 10 个里选 7 个等于选出 3 个不拿，所以 $C_7^{10} = C_3^{10}$。手算时算 $C_3^{10}$ 快多了！`,
        feedbackWrong: R`再想想奶茶加料的对称逻辑：从 10 个中选 7 个留下，等价于挑出 $10 - 7 = 3$ 个淘汰，所以应该等于 $C_3^{10}$。`
      },
      stage2: {
        title: "基础模仿练（计算组合数）",
        promptEn: R`Evaluate $C_3^8$ without using a calculator's nCr button.`,
        promptZh: "不使用计算器 <code>nCr</code> 键，手算 $C_3^8$ 的值。",
        type: "input",
        acceptedAnswers: ["56"],
        inputPlaceholder: "输入一个整数，例如 56",
        hints: [
          R`提示 1：使用简化公式 $C_3^8 = \frac{8 \times 7 \times 6}{3 \times 2 \times 1}$。`,
          R`提示 2：分母 $3 \times 2 \times 1 = 6$，正好和分子里的 $6$ 约掉！`
        ],
        solutionHtml: R`
          <p>$$C_3^8 = \frac{8!}{3!\,5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 8 \times 7 = 56$$</p>
          <p class="formula-note">中文解析：先把 $8!$ 和 $5!$ 约分，只留分子最前面的 3 个连续整数 $8 \times 7 \times 6$，再约去分母 $3! = 6$。</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`If $C_2^n = 28$, find the value of $n$.`,
        promptZh: "若 $C_2^n = 28$，求正整数 $n$ 的值。",
        type: "input",
        acceptedAnswers: ["8"],
        inputPlaceholder: "输入 n 的值",
        hints: [
          R`提示 1 (1M)：把 $C_2^n$ 改写为代数分式 $\frac{n(n-1)}{2} = 28$。`,
          R`提示 2 (1A)：解出 $n(n-1) = 56$（两个相邻整数相乘等于 56），记得写出舍去负解！`
        ],
        solutionHtml: R`
          <p>$$C_2^n = 28$$</p>
          <p>$$\frac{n(n-1)}{2} = 28 \quad \text{(1M)}$$</p>
          <p>$$n^2 - n - 56 = 0$$</p>
          <p>$$(n - 8)(n + 7) = 0$$</p>
          <p>$$n = 8 \quad \text{or} \quad n = -7 \text{ (rejected)} \quad \text{(1A)}$$</p>
          <p class="formula-note">得分要点：必须写出舍去负数解 <code>(rejected)</code>，避免无谓失分。</p>
        `
      }
    }
  };

  units["1.2"] = {
    id: "1.2",
    chapterId: "ch1",
    titleZh: "1.2 正整数指数二项式定理",
    titleEn: "Binomial Theorem for Positive Integral Indices",
    objectives: [
      "理解为什么 $(a+b)^n$ 展开后的系数恰好是组合数 $C_r^n$；",
      "熟练运用二项式定理 <span class=\"term-en\">Binomial Theorem</span> 按升幂 <span class=\"term-en\">ascending powers</span> 或降幂展开；",
      "避开负号与括号遗漏陷阱，解决含未知指数 $n$ 或系数 $k$ 的问题。"
    ],
    intuition: {
      title: "生活场景直觉：从“选括号里的 b”看懂二项式定理",
      storyHtml: R`
        <p>为什么 $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$？把 $(a+b)^3$ 写成 3 个一模一样的袋子排排站：</p>
        <p>$(a+b)(a+b)(a+b)$。展开时，你必须从<strong>每个袋子</strong>里各摸出一个字母乘在一起：</p>
        <ul>
          <li>全摸 $a$（从 3 个袋子里挑 0 个袋子摸 $b$）：有 $C_0^3 = 1$ 种方案 $\to 1\cdot a^3$；</li>
          <li>摸出 2 个 $a$ 和 1 个 $b$（挑 1 个袋子摸 $b$）：有 $C_1^3 = 3$ 种方案 $\to 3a^2b$；</li>
          <li>摸出 1 个 $a$ 和 2 个 $b$（挑 2 个袋子摸 $b$）：有 $C_2^3 = 3$ 种方案 $\to 3ab^2$；</li>
          <li>全摸 $b$（挑 3 个袋子摸 $b$）：有 $C_3^3 = 1$ 种方案 $\to 1\cdot b^3$。</li>
        </ul>
        <p>看！<strong>组合数 $C_r^n$ 的真正含义，就是“从 $n$ 个括号里挑出 $r$ 个括号交出 $b$，其余 $n-r$ 个括号交出 $a$”的方案数！</strong></p>
      `
    },
    conceptsHtml: R`
      <h4>一、正整数指数二项式定理 <span class="term-en">Binomial Theorem</span></h4>
      <p>当 $n$ 为正整数（<span class="term-en">Positive Integral Index</span>）时，$(a+b)^n$ 的完整展开式共有 $n + 1$ 项。随着项数推进，$a$ 的指数从 $n$ 每次减 $1$ 降到 $0$，$b$ 的指数从 $0$ 每次加 $1$ 升到 $n$，而每一项的指数和永远等于 $n$。</p>

      <h4>二、升幂排列 <span class="term-en">Ascending Powers of x</span> 与降幂排列 <span class="term-en">Descending Powers of x</span></h4>
      <p>HKDSE 考题非常喜欢在题干里写：<em>“Expand $(2 - 3x)^4$ in ascending powers of $x$ up to the term in $x^2$.”</em></p>
      <ul>
        <li><strong>按 $x$ 的升幂排列</strong>：让含 $x$ 的那一项站在公式的 $b$ 位（也就是从 $x^0, x^1, x^2, \dots$ 越往后次方越高）。</li>
        <li><strong>按 $x$ 的降幂排列</strong>：让含 $x$ 的那一项站在公式的 $a$ 位（次方从最高次往下降）。</li>
      </ul>
    `,
    formulas: [
      {
        label: "二项式定理标准形式 (Binomial Theorem)",
        latex: R`$$(a+b)^n = a^n + C_1^n a^{n-1}b + C_2^n a^{n-2}b^2 + \cdots + C_r^n a^{n-r}b^r + \cdots + b^n$$`,
        note: "用求和符号简写：$(a+b)^n = \\sum_{r=0}^n C_r^n a^{n-r}b^r$（$n \\in \\mathbb{Z}^+$）。"
      },
      {
        label: "最常用的 (1 + x)ⁿ 形式",
        latex: R`$$(1+x)^n = 1 + C_1^n x + C_2^n x^2 + C_3^n x^3 + \cdots + x^n$$`,
        note: "因为 $1$ 的任何次方都是 $1$，计算和代数化简超快！若题目是 $(2+x)^n$，可先看清是否需要展开或直接套 $(a+b)^n$。"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 展开 $(2 - 3x)^4$ 时忘记把负号和系数 3 一起括号平方：写成 $C_2^4 (2)^2 \cdot 3x^2$。`,
        right: R`✅ 把减号看作“加上 $(-3x)$”，整块括起来再乘方：$C_2^4 (2)^2 (-3x)^2 = 6 \times 4 \times 9x^2 = 216x^2$。`
      },
      {
        wrong: R`❌ 遇到 $(1 + 2x)^n$ 的 $x^2$ 系数时直接写 $C_2^n$，忘记乘上 $(2)^2 = 4$。`,
        right: R`✅ “二项式系数”才只是 $C_2^n$；题干问“$x^2$ 的系数 <span class="term-en">coefficient of x²</span>”必须把 $2^2$ 乘进去，即 $C_2^n \cdot 2^2 = 2n(n-1)$。`
      }
    ],
    syllabusGuard: "HKDSE M1 考纲红线：M1 的二项式定理<strong>严格限定于正整数指数（$n$ 是正整数）</strong>。不会考查负指数或分数指数（如 $(1+x)^{-2}$ 或 $\\sqrt{1+x}$ 的无限级数展开）。",
    examples: [
      {
        title: "Example 1 · 完整展开带负号与系数的二项式",
        promptEn: R`Expand $(2 - 3x)^4$ in ascending powers of $x$.`,
        promptZh: "按 $x$ 的升幂完全展开 $(2 - 3x)^4$。",
        steps: [
          {
            math: R`$$(2 - 3x)^4 = [2 + (-3x)]^4$$`,
            why: "先在脑海里把减号打包进第二项 $b = -3x$，令 $a = 2$，$n = 4$。"
          },
          {
            math: R`$$= 2^4 + C_1^4(2)^3(-3x) + C_2^4(2)^2(-3x)^2 + C_3^4(2)(-3x)^3 + (-3x)^4$$`,
            why: "套用二项式定理写出全部 $4 + 1 = 5$ 项，每一块务必用括号包住。"
          },
          {
            math: R`$$= 16 + 4(8)(-3x) + 6(4)(9x^2) + 4(2)(-27x^3) + 81x^4$$`,
            why: "先分别算出组合数 $C_r^4$ 和乘方，注意奇次幂保持负号、偶次幂变正号。"
          },
          {
            math: R`$$= 16 - 96x + 216x^2 - 216x^3 + 81x^4$$`,
            why: "最后把数字乘开。小技巧：代入 $x = 1$ 验算，$(2-3)^4 = 1$，而 $16-96+216-216+81 = 1$，完全正确！"
          }
        ]
      },
      {
        title: "Example 2 · 由系数反推未知指数 n（HKDSE 高频题型）",
        promptEn: R`In the expansion of $(1 + 2x)^n$, where $n$ is a positive integer, the coefficient of $x^2$ is $60$. Find the value of $n$.`,
        promptZh: "在 $(1 + 2x)^n$（$n$ 为正整数）的展开式中，$x^2$ 的系数为 $60$，求 $n$ 的值。",
        steps: [
          {
            math: R`$$(1 + 2x)^n = 1 + C_1^n(2x) + C_2^n(2x)^2 + \cdots$$`,
            why: "展开前几项到 $x^2$ 即可，不必浪费时间写完所有项。"
          },
          {
            math: R`$$\text{Term in } x^2 = C_2^n (2x)^2 = \frac{n(n-1)}{2} \cdot 4x^2 = 2n(n-1)x^2$$`,
            why: "提取 $x^2$ 的系数，注意 $(2x)^2 = 4x^2$。"
          },
          {
            math: R`$$2n(n-1) = 60 \implies n^2 - n - 30 = 0$$`,
            why: "令系数等于题目给出的 $60$，整理成二次方程。"
          },
          {
            math: R`$$(n - 6)(n + 5) = 0 \implies n = 6 \quad \text{or} \quad n = -5 \text{ (rejected)}$$`,
            why: "因为 $n$ 为正整数，舍去 $-5$，得到 $n = 6$。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [{ id: "1.1", label: "1.1 阶乘与组合数" }],
      next: [
        { id: "1.3", label: "1.3 通项与乘积展开" },
        { id: "2.1", label: "2.1 从二项式极限导出自然常数 e" }
      ],
      summary: "不仅能展开多项式，在下一章 2.1 中，我们将让 $(1 + \\frac{1}{n})^n$ 的 $n$ 冲向无穷大，亲眼见证自然常数 $e$ 的诞生！"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（不死算，先判断）",
        promptEn: R`How many terms are there in the full expansion of $(3x - 2y)^7$?`,
        promptZh: "$(3x - 2y)^7$ 完全展开并合并同类项后，一共有多少项？",
        options: ["7 terms", "8 terms", "6 terms", "14 terms"],
        correctIndex: 1,
        feedbackCorrect: R`完全正确！因为 $r$ 可以从 $0$ 取到 $n=7$，所以 $(a+b)^n$ 展开后共有 $n + 1 = 8$ 项！`,
        feedbackWrong: R`注意 $r$ 是从 $0$ 开始数的（$r = 0, 1, 2, \dots, 7$），所以一共有 $7 + 1 = 8$ 项，不是 7 项哦。`
      },
      stage2: {
        title: "基础模仿练（写出前四项）",
        promptEn: R`Expand $(1 - 2x)^5$ in ascending powers of $x$ up to the term in $x^3$.`,
        promptZh: "按 $x$ 的升幂展开 $(1 - 2x)^5$ 至 $x^3$ 项。",
        type: "mcq",
        options: [
          R`$1 - 10x + 40x^2 - 80x^3$`,
          R`$1 - 10x - 40x^2 - 80x^3$`,
          R`$1 + 10x + 40x^2 + 80x^3$`,
          R`$1 - 5x + 20x^2 - 40x^3$`
        ],
        correctIndex: 0,
        hints: [
          R`提示 1：写出前三项与第四项结构：$1 + C_1^5(-2x) + C_2^5(-2x)^2 + C_3^5(-2x)^3$。`,
          R`提示 2：其中 $C_1^5=5$，$C_2^5=10$，$C_3^5=10$；特别留意 $(-2x)^2 = +4x^2$（负负得正）而 $(-2x)^3 = -8x^3$！`
        ],
        solutionHtml: R`
          <p>$$(1 - 2x)^5 = 1 + C_1^5(-2x) + C_2^5(-2x)^2 + C_3^5(-2x)^3 + \cdots$$</p>
          <p>$$= 1 + 5(-2x) + 10(4x^2) + 10(-8x^3) + \cdots$$</p>
          <p>$$= 1 - 10x + 40x^2 - 80x^3 + \cdots$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`In the expansion of $(1 + 3x)^n$, where $n$ is a positive integer, the coefficient of $x^2$ is $135$. Find the value of $n$.`,
        promptZh: "在 $(1 + 3x)^n$（$n \\in \\mathbb{Z}^+$）的展开式中，$x^2$ 的系数为 $135$，求 $n$。",
        type: "input",
        acceptedAnswers: ["6"],
        inputPlaceholder: "输入正整数 n",
        hints: [
          R`提示 1 (1M)：写出 $x^2$ 项为 $C_2^n (3x)^2 = \frac{n(n-1)}{2} \cdot 9x^2$。`,
          R`提示 2 (1M + 1A)：令 $\frac{9n(n-1)}{2} = 135$，两边先除以 $9$ 得 $\frac{n(n-1)}{2} = 15$，解方程并舍去负根！`
        ],
        solutionHtml: R`
          <p>The term in $x^2$ is $C_2^n (3x)^2 = 9C_2^n x^2$. $\quad \text{(1M)}$</p>
          <p>$$9 \cdot \frac{n(n-1)}{2} = 135 \quad \text{(1M)}$$</p>
          <p>$$n(n-1) = 30 \implies n^2 - n - 30 = 0$$</p>
          <p>$$(n-6)(n+5) = 0 \implies n = 6 \text{ or } n = -5 \text{ (rejected)} \quad \text{(1A)}$$</p>
        `
      }
    }
  };

  units["1.3"] = {
    id: "1.3",
    chapterId: "ch1",
    titleZh: "1.3 通项公式与指定项系数",
    titleEn: "General Term and Finding Specific Coefficients",
    objectives: [
      "能熟练写出任意 $(a+b)^n$ 的通项公式 <span class=\"term-en\">General Term</span> $T_{r+1}$；",
      "学会合并 $x$ 的指数，精确锁定指定次幂或常数项 <span class=\"term-en\">Constant Term</span>；",
      "掌握 HKDSE 经典“两个括号相乘”型展开式（如 $(p + qx)(1 + kx)^n$）抓取特定项系数的配对法。"
    ],
    intuition: {
      title: "生活场景直觉：用“狙击枪通项”代替全部展开",
      storyHtml: R`
        <p>假如考试让你找 $\left(2x - \frac{1}{x^2}\right)^{12}$ 中的常数项，如果你把 13 项全部手写展开，半场考试就过去了！</p>
        <p>通项公式 $T_{r+1} = C_r^n a^{n-r} b^r$ 就像一把带坐标瞄准镜的狙击枪：先用未知数 $r$ 把“第 $r+1$ 项长什么样”写成一个代数模板，然后把所有 $x$ 的次方合并到一起，最后看题目要 $x^3$ 还是常数项（$x^0$），直接解方程求出唯一对应的 $r$，精准打击！</p>
      `
    },
    conceptsHtml: R`
      <h4>一、通项公式 <span class="term-en">General Term</span> 的下标奥秘</h4>
      <p>注意公式左下角写的是 $T_{r+1}$ 而不是 $T_r$！原因是第一项对应 $r = 0$（一个 $b$ 都不选），第二项对应 $r = 1$，以此类推。所以求第 4 项时，要代 $r = 3$ 而不是 $r = 4$。</p>

      <h4>二、双括号相乘求系数的“门当户对”配对法</h4>
      <p>在 HKDSE M1 考卷中，常出现如 $(2 - x)(1 + 3x)^5$ 求 $x^2$ 系数的题目。千万别把 $(1 + 3x)^5$ 全展开，只需要展开到 $x^2$ 项即可！</p>
      <p>左边括号的每一项，去右边寻找能跟自己凑成 $x^2$ 的搭档：</p>
      <ul>
        <li>左边的常数 $2$ $\times$ 右边的 $x^2$ 项 $\longrightarrow$ 贡献一个 $x^2$ 项；</li>
        <li>左边的 $-x$ $\times$ 右边的 $x^1$ 项 $\longrightarrow$ 贡献另一个 $x^2$ 项；</li>
      </ul>
      <p>把这两对相乘的结果加起来就是总答案，干净利落，绝不写废话！</p>
    `,
    formulas: [
      {
        label: "二项展式通项公式 (General Term)",
        latex: R`$$T_{r+1} = C_r^n a^{n-r} b^r \quad (r = 0, 1, 2, \dots, n)$$`,
        note: "做题四步法：① 写 $T_{r+1}$；② 把数字系数与 $x$ 的幂分开；③ 令 $x$ 的指数等于目标幂次解 $r$；④ 回代算出该项或系数。"
      },
      {
        label: "常数项条件 (Constant Term)",
        latex: R`$$\text{Power of } x = 0$$`,
        note: "若解出的 $r$ 不是 $0$ 到 $n$ 之间的整数（比如得出小数或负数），说明展开式中<strong>不存在</strong>该项！"
      }
    ],
    pitfalls: [
      {
        wrong: R`❌ 问“$x^2$ 的系数 <span class="term-en">coefficient of x²</span>”，最后答成 $165x^2$。`,
        right: R`✅ <strong>Coefficient（系数）只是纯数字</strong>，必须答 $165$，不能把 $x^2$ 写进答案！只有问“term in $x^2$”才带 $x^2$。`
      },
      {
        wrong: R`❌ 化简 $\left(-\frac{1}{x^2}\right)^r$ 时弄错指数运算法则，写成 $-x^{-2r}$。`,
        right: R`✅ 把数字与 $x$ 彻底分离：$\left(-x^{-2}\right)^r = (-1)^r \cdot x^{-2r}$，正负号由 $(-1)^r$ 决定，切勿直接放外面！`
      }
    ],
    examples: [
      {
        title: "Example 1 · 求含分式的二项展式常数项",
        promptEn: R`Find the constant term in the expansion of $\left(2x - \dfrac{1}{x^2}\right)^6$.`,
        promptZh: "求 $\\left(2x - \\frac{1}{x^2}\\right)^6$ 展开式中的常数项。",
        steps: [
          {
            math: R`$$T_{r+1} = C_r^6 (2x)^{6-r} \left(-\frac{1}{x^2}\right)^r$$`,
            why: "套用通项公式 $T_{r+1} = C_r^n a^{n-r} b^r$。"
          },
          {
            math: R`$$= C_r^6 \cdot 2^{6-r} (-1)^r \cdot x^{6-r} \cdot x^{-2r} = C_r^6 2^{6-r} (-1)^r x^{6-3r}$$`,
            why: "把所有纯数字放左边，把 $x$ 的指数利用同底数幂相加合并为 $x^{6-3r}$。"
          },
          {
            math: R`$$\text{For the constant term, } 6 - 3r = 0 \implies r = 2$$`,
            why: "常数项不含 $x$（即 $x^0$），令 $x$ 的指数为 $0$ 解得 $r = 2$。"
          },
          {
            math: R`$$\therefore \text{Constant term} = C_2^6 \cdot 2^{6-2} (-1)^2 = 15 \times 16 \times 1 = 240$$`,
            why: "将 $r = 2$ 代回数字部分，得出常数项为 $240$。"
          }
        ]
      },
      {
        title: "Example 2 · 双括号乘积展开求指定项系数",
        promptEn: R`Find the coefficient of $x^2$ in the expansion of $(2 - x)(1 + 3x)^5$.`,
        promptZh: "求 $(2 - x)(1 + 3x)^5$ 展开式中 $x^2$ 的系数。",
        steps: [
          {
            math: R`$$(1 + 3x)^5 = 1 + C_1^5(3x) + C_2^5(3x)^2 + \cdots = 1 + 15x + 90x^2 + \cdots$$`,
            why: "先将 $(1+3x)^5$ 展开至 $x^2$ 项（后续高次项不会参与构成 $x^2$，写省略号即可）。"
          },
          {
            math: R`$$(2 - x)(1 + 3x)^5 = (2 - x)(1 + 15x + 90x^2 + \cdots)$$`,
            why: "把两个括号排好，准备按幂次配对。"
          },
          {
            math: R`$$\text{Coefficient of } x^2 = 2(90) + (-1)(15) = 180 - 15 = 165$$`,
            why: "配对法则：左边 $2$ 乘右边 $90x^2$，加上左边 $-x$ 乘右边 $15x$，结果只保留数字系数 $165$。"
          }
        ]
      }
    ],
    labId: null,
    connections: {
      prereq: [
        { id: "1.1", label: "1.1 组合数" },
        { id: "1.2", label: "1.2 二项式定理" }
      ],
      next: [{ id: "2.1", label: "2.1 eˣ 级数与二项展式的联合考法" }],
      summary: "双括号配对法是 HKDSE M1 必考绝技！在第 2 章 2.1 节学完 $e^{kx}$ 的展式后，你将会用一模一样的配对法解决 $(1+ax)^n e^{bx}$ 的系数题。"
    },
    quiz: {
      stage1: {
        title: "直觉微提问（不死算，先判断）",
        promptEn: R`To find the coefficient of $x^3$ in $(4 + 5x^2)(1 - 2x)^7$, which terms of $(1 - 2x)^7$ do we actually need?`,
        promptZh: "要求 $(4 + 5x^2)(1 - 2x)^7$ 展开式中 $x^3$ 的系数，我们真正需要把 $(1 - 2x)^7$ 展开到哪些项？",
        options: [
          R`Only the $x$ and $x^3$ terms (i.e. expand up to $x^3$)`,
          R`Only the constant term and the $x^2$ term`,
          R`All 8 terms from $x^0$ to $x^7$`,
          R`Only the $x^3$ term`
        ],
        correctIndex: 0,
        feedbackCorrect: R`眼光精准！左边的 $4$ 需要配右边的 $x^3$，左边的 $5x^2$ 需要配右边的 $x$ 才凑得出 $x^3$，所以展开 $(1-2x)^7$ 到 $x^3$ 就够了！`,
        feedbackWrong: R`检查一下左边的两项：$4$（即 $x^0$）要凑成 $x^3$ 需要配右边的 $x^3$；$5x^2$ 要凑成 $x^3$ 需要配右边的 $x$。所以右边需要 $x$ 和 $x^3$ 项。`
      },
      stage2: {
        title: "基础模仿练（锁定常数项）",
        promptEn: R`Find the constant term in the expansion of $\left(x^2 + \dfrac{2}{x}\right)^6$.`,
        promptZh: "求 $\\left(x^2 + \\frac{2}{x}\\right)^6$ 展开式中的常数项。",
        type: "input",
        acceptedAnswers: ["240"],
        inputPlaceholder: "输入常数项的值",
        hints: [
          R`提示 1：写出通项 $T_{r+1} = C_r^6 (x^2)^{6-r} (2x^{-1})^r = C_r^6 2^r x^{12 - 2r - r}$。`,
          R`提示 2：令 $12 - 3r = 0$ 得 $r = 4$，再计算 $C_4^6 \cdot 2^4$。`
        ],
        solutionHtml: R`
          <p>$$T_{r+1} = C_r^6 (x^2)^{6-r} \left(\frac{2}{x}\right)^r = C_r^6 2^r x^{12 - 3r}$$</p>
          <p>Put $12 - 3r = 0 \implies r = 4$.</p>
          <p>$$\text{Constant term} = C_4^6 \cdot 2^4 = 15 \times 16 = 240$$</p>
        `
      },
      stage3: {
        title: "课本综合 / HKDSE 实战题",
        promptEn: R`Find the coefficient of $x^2$ in the expansion of $(3 + 2x)(1 - 2x)^6$.`,
        promptZh: "求 $(3 + 2x)(1 - 2x)^6$ 展开式中 $x^2$ 的系数。",
        type: "input",
        acceptedAnswers: ["156"],
        inputPlaceholder: "输入 x² 的纯数字系数",
        hints: [
          R`提示 1 (1M)：先把 $(1-2x)^6$ 展开至 $x^2$：$1 + C_1^6(-2x) + C_2^6(-2x)^2 = 1 - 12x + 60x^2 + \cdots$。`,
          R`提示 2 (1M + 1A)：配对相乘：系数 $= 3 \times 60 + 2 \times (-12)$，千万别漏掉负号！`
        ],
        solutionHtml: R`
          <p>$$(1 - 2x)^6 = 1 + C_1^6(-2x) + C_2^6(-2x)^2 + \cdots = 1 - 12x + 60x^2 + \cdots \quad \text{(1M)}$$</p>
          <p>$$(3 + 2x)(1 - 2x)^6 = (3 + 2x)(1 - 12x + 60x^2 + \cdots)$$</p>
          <p>$$\text{Coefficient of } x^2 = 3(60) + 2(-12) = 180 - 24 = 156 \quad \text{(1M + 1A)}$$</p>
        `
      }
    }
  };
})();
