/* ==========================================================================
   Interactive Calculus Visualization Labs (四大微积分交互实验室)
   High-DPI HTML5 Canvas engines for Labs 1–4
   ========================================================================== */

window.M1A_LABS = (function () {
  const LAB_META = {
    lab_exp_e: {
      id: "lab_exp_e",
      badge: "Lab 1 · Ch. 2",
      titleZh: "实验室 1：复利极限 → e 与指数级数 / 对数镜像对称探索器",
      descZh: "拖动滑块亲眼观察 $(1 + \\frac{1}{n})^n$ 如何稳步逼近 $2.71828\\dots$，并探索指数级数贴合与 $e^x / \\ln x$ 关于 $y = x$ 的镜像关系。"
    },
    lab_secant: {
      id: "lab_secant",
      badge: "Lab 2 · Ch. 3",
      titleZh: "实验室 2：Δx → 0 割线旋转逼近切线显微镜",
      descZh: "拖动增量 $\\Delta x$ 滑块让动点 $Q$ 沿曲线滑向 $P$，观察牛津封面同款 $\\Delta x$、$\\Delta y$ 三角形如何收缩并收敛为切线斜率 $f'(x_0)$。"
    },
    lab_concavity: {
      id: "lab_concavity",
      badge: "Lab 3 · Ch. 5",
      titleZh: "实验室 3：f(x)、f'(x)、f''(x) 三图联动凹凸与极值扫描仪",
      descZh: "拖动垂直扫描线，同步对照原函数曲线形状、一阶导正负号（增减性）与二阶导正负号（凹凸性与拐点）。"
    },
    lab_trapezoid: {
      id: "lab_trapezoid",
      badge: "Lab 4 · Ch. 7（教材封面同款）",
      titleZh: "实验室 4：梯形法则分割与高估/低估误差放大镜",
      descZh: "调节子区间数 $n$ 与不同凹凸性曲线，放大查看梯形斜边与真实曲线之间的缝隙，直观印证为何 $f''(x) > 0$ 必为 Over-estimate！"
    }
  };

  function setupCanvas(canvas, cssW, cssH) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.aspectRatio = cssW + " / " + cssH;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    return { ctx, w: cssW, h: cssH };
  }

  function makeCoordMapper(w, h, xMin, xMax, yMin, yMax, pad = { l: 46, r: 20, t: 20, b: 36 }) {
    const plotW = w - pad.l - pad.r;
    const plotH = h - pad.t - pad.b;
    const toX = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * plotW;
    const toY = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * plotH;
    return { toX, toY, pad, plotW, plotH, xMin, xMax, yMin, yMax };
  }

  function drawAxesAndGrid(ctx, m, xStep = 1, yStep = 1) {
    ctx.save();
    ctx.strokeStyle = "#eef2f6";
    ctx.lineWidth = 1;

    for (let x = Math.ceil(m.xMin / xStep) * xStep; x <= m.xMax + 1e-9; x += xStep) {
      const px = m.toX(x);
      ctx.beginPath();
      ctx.moveTo(px, m.pad.t);
      ctx.lineTo(px, m.pad.t + m.plotH);
      ctx.stroke();
    }
    for (let y = Math.ceil(m.yMin / yStep) * yStep; y <= m.yMax + 1e-9; y += yStep) {
      const py = m.toY(y);
      ctx.beginPath();
      ctx.moveTo(m.pad.l, py);
      ctx.lineTo(m.pad.l + m.plotW, py);
      ctx.stroke();
    }

    // Main axes
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.4;
    if (m.yMin <= 0 && m.yMax >= 0) {
      const y0 = m.toY(0);
      ctx.beginPath();
      ctx.moveTo(m.pad.l, y0);
      ctx.lineTo(m.pad.l + m.plotW, y0);
      ctx.stroke();
    }
    if (m.xMin <= 0 && m.xMax >= 0) {
      const x0 = m.toX(0);
      ctx.beginPath();
      ctx.moveTo(x0, m.pad.t);
      ctx.lineTo(x0, m.pad.t + m.plotH);
      ctx.stroke();
    }

    // Tick labels
    ctx.fillStyle = "#64748b";
    ctx.font = "11px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    const xAxisY = m.yMin <= 0 && m.yMax >= 0 ? Math.min(m.toY(0) + 14, m.pad.t + m.plotH + 14) : m.pad.t + m.plotH + 14;
    for (let x = Math.ceil(m.xMin / xStep) * xStep; x <= m.xMax + 1e-9; x += xStep) {
      const val = Math.abs(x) < 1e-6 ? 0 : Number(x.toFixed(2));
      ctx.fillText(String(val), m.toX(x), xAxisY);
    }
    ctx.textAlign = "right";
    const yAxisX = m.xMin <= 0 && m.xMax >= 0 ? Math.max(m.toX(0) - 6, m.pad.l - 6) : m.pad.l - 6;
    for (let y = Math.ceil(m.yMin / yStep) * yStep; y <= m.yMax + 1e-9; y += yStep) {
      const val = Math.abs(y) < 1e-6 ? 0 : Number(y.toFixed(2));
      ctx.fillText(String(val), yAxisX, m.toY(y) + 4);
    }
    ctx.restore();
  }

  function plotCurve(ctx, m, fn, color, width = 2.6, dashed = false, xStart = m.xMin, xEnd = m.xMax) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(m.pad.l, m.pad.t, m.plotW, m.plotH);
    ctx.clip();

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    if (dashed) ctx.setLineDash([6, 4]);
    ctx.beginPath();
    const steps = 220;
    let started = false;
    for (let i = 0; i <= steps; i++) {
      const x = xStart + ((xEnd - xStart) * i) / steps;
      const y = fn(x);
      if (!Number.isFinite(y) || y < m.yMin - 10 || y > m.yMax + 10) {
        started = false;
        continue;
      }
      const px = m.toX(x);
      const py = m.toY(y);
      if (!started) {
        ctx.moveTo(px, py);
        started = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawDot(ctx, px, py, color, r = 5, label = "") {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
    if (label) {
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(label, px + 8, py - 8);
    }
    ctx.restore();
  }

  /* ========================================================================
     LAB 1: Number e, Exponential Series & Mirror Symmetry
     ======================================================================== */
  function renderLabExpE(container) {
    const state = { mode: "series", nComp: 12, deg: 2, tVal: 0.8 };

    container.innerHTML = `
      <div class="lab-card" data-lab-root="lab_exp_e">
        <div class="card-title-row">
          <div>
            <span class="section-badge" style="background: var(--ch2-soft); color: var(--ch2-color);">${LAB_META.lab_exp_e.badge}</span>
            <h3 class="section-heading" style="margin-top: 6px;">${LAB_META.lab_exp_e.titleZh}</h3>
          </div>
          <div class="lab-seg-buttons">
            <button type="button" class="lab-seg-btn active" data-mode="series">① 复利极限与 eˣ 级数贴合</button>
            <button type="button" class="lab-seg-btn" data-mode="mirror">② eˣ 与 ln x 镜像对称</button>
          </div>
        </div>
        <div class="lab-layout">
          <div class="lab-canvas-wrap">
            <canvas class="lab-canvas"></canvas>
          </div>
          <div class="lab-controls"></div>
        </div>
      </div>
    `;

    const canvas = container.querySelector("canvas");
    const controlsEl = container.querySelector(".lab-controls");
    const modeBtns = container.querySelectorAll("[data-mode]");

    function fact(k) {
      let res = 1;
      for (let i = 2; i <= k; i++) res *= i;
      return res;
    }

    function taylorExp(x, deg) {
      let sum = 0;
      for (let k = 0; k <= deg; k++) sum += Math.pow(x, k) / fact(k);
      return sum;
    }

    function draw() {
      const { ctx, w, h } = setupCanvas(canvas, 560, 340);
      if (state.mode === "series") {
        const m = makeCoordMapper(w, h, -2.2, 2.2, -0.5, 6.5);
        drawAxesAndGrid(ctx, m, 1, 1);

        plotCurve(ctx, m, (x) => Math.exp(x), "#162d59", 3, false);
        plotCurve(ctx, m, (x) => taylorExp(x, state.deg), "#d97706", 2.5, true);

        // Legend
        ctx.fillStyle = "#162d59";
        ctx.font = "bold 12px -apple-system, sans-serif";
        ctx.fillText("━━ 真实 y = eˣ", m.pad.l + 12, m.pad.t + 18);
        ctx.fillStyle = "#d97706";
        ctx.fillText("┈ ┈ " + state.deg + " 次级数多项式近似", m.pad.l + 12, m.pad.t + 36);

        drawDot(ctx, m.toX(0), m.toY(1), "#0f766e", 5, "(0, 1)");
      } else {
        const m = makeCoordMapper(w, h, -2.5, 5.5, -2.5, 5.5);
        drawAxesAndGrid(ctx, m, 1, 1);

        plotCurve(ctx, m, (x) => x, "#94a3b8", 1.5, true);
        plotCurve(ctx, m, (x) => Math.exp(x), "#0f766e", 2.8, false);
        plotCurve(ctx, m, (x) => (x > 0.01 ? Math.log(x) : NaN), "#d97706", 2.8, false, 0.02, 5.5);

        const t = state.tVal;
        const et = Math.exp(t);
        if (et <= 5.5) {
          ctx.save();
          ctx.strokeStyle = "#64748b";
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(m.toX(t), m.toY(et));
          ctx.lineTo(m.toX(et), m.toY(t));
          ctx.stroke();
          ctx.restore();
          drawDot(ctx, m.toX(t), m.toY(et), "#0f766e", 5, `(${t.toFixed(1)}, ${et.toFixed(2)})`);
          drawDot(ctx, m.toX(et), m.toY(t), "#d97706", 5, `(${et.toFixed(2)}, ${t.toFixed(1)})`);
        }

        ctx.fillStyle = "#0f766e";
        ctx.font = "bold 12px -apple-system, sans-serif";
        ctx.fillText("y = eˣ", m.toX(1.3), m.toY(4.5));
        ctx.fillStyle = "#d97706";
        ctx.fillText("y = ln x", m.toX(4.2), m.toY(1.8));
        ctx.fillStyle = "#64748b";
        ctx.fillText("y = x", m.toX(4.3), m.toY(4.7));
      }
    }

    function renderControls() {
      if (state.mode === "series") {
        const compVal = Math.pow(1 + 1 / state.nComp, state.nComp);
        controlsEl.innerHTML = `
          <div class="lab-control-group">
            <label><span>复利计息频率 n</span><span>n = ${state.nComp}</span></label>
            <input type="range" class="lab-range" id="exp-n-range" min="1" max="500" value="${state.nComp}" />
          </div>
          <div class="lab-readout-grid">
            <div class="lab-metric">
              <div class="lab-metric-label">(1 + 1/n)ⁿ 实测值</div>
              <div class="lab-metric-val">${compVal.toFixed(5)}</div>
            </div>
            <div class="lab-metric">
              <div class="lab-metric-label">自然常数 e 真值</div>
              <div class="lab-metric-val">2.71828</div>
            </div>
          </div>
          <div class="lab-control-group">
            <label><span>级数展开最高次幂 k</span><span>展开至 x^${state.deg}</span></label>
            <input type="range" class="lab-range" id="exp-deg-range" min="0" max="5" step="1" value="${state.deg}" />
          </div>
          <div class="lab-insight">
            <strong>观察发现：</strong>展开次数 $k$ 越大，橙色虚线越像吸铁石一样贴住蓝色 $e^x$ 曲线！在 M1A 中，我们最常用到 $x^2$ 或 $x^3$ 项（即 $1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!}$）。
          </div>
        `;
        controlsEl.querySelector("#exp-n-range").addEventListener("input", (e) => {
          state.nComp = Number(e.target.value);
          renderControls();
          draw();
        });
        controlsEl.querySelector("#exp-deg-range").addEventListener("input", (e) => {
          state.deg = Number(e.target.value);
          renderControls();
          draw();
        });
      } else {
        const et = Math.exp(state.tVal);
        controlsEl.innerHTML = `
          <div class="lab-control-group">
            <label><span>移动对称测试点 t</span><span>t = ${state.tVal.toFixed(2)}</span></label>
            <input type="range" class="lab-range" id="exp-t-range" min="-1.6" max="1.6" step="0.1" value="${state.tVal}" />
          </div>
          <div class="lab-readout-grid">
            <div class="lab-metric">
              <div class="lab-metric-label">指数曲线上 (t, eᵗ)</div>
              <div class="lab-metric-val">(${state.tVal.toFixed(1)}, ${et.toFixed(2)})</div>
            </div>
            <div class="lab-metric">
              <div class="lab-metric-label">对数曲线上 (eᵗ, t)</div>
              <div class="lab-metric-val">(${et.toFixed(2)}, ${state.tVal.toFixed(1)})</div>
            </div>
          </div>
          <div class="lab-insight">
            <strong>镜像规律：</strong>每当 $y = e^x$ 上有一个点 $(a, b)$，交换横纵坐标得到的 $(b, a)$ 必定落在 $y = \\ln x$ 上！所以 $y = e^x$ 过 $(0, 1)$，而 $y = \\ln x$ 必过 $(1, 0)$。
          </div>
        `;
        controlsEl.querySelector("#exp-t-range").addEventListener("input", (e) => {
          state.tVal = Number(e.target.value);
          renderControls();
          draw();
        });
      }
      if (window.renderMathInElementSafe) window.renderMathInElementSafe(controlsEl);
    }

    modeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        modeBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.mode = btn.dataset.mode;
        renderControls();
        draw();
      });
    });

    renderControls();
    draw();
  }

  /* ========================================================================
     LAB 2: Secant -> Tangent Limit (Δx -> 0)
     ======================================================================== */
  function renderLabSecant(container) {
    const curves = {
      quad: {
        name: "f(x) = 0.4x² + 0.5",
        fn: (x) => 0.4 * x * x + 0.5,
        df: (x) => 0.8 * x
      },
      cubic: {
        name: "f(x) = 0.18x³ - 0.5x + 2",
        fn: (x) => 0.18 * x * x * x - 0.5 * x + 2,
        df: (x) => 0.54 * x * x - 0.5
      },
      exp: {
        name: "f(x) = e^(0.5x)",
        fn: (x) => Math.exp(0.5 * x),
        df: (x) => 0.5 * Math.exp(0.5 * x)
      }
    };

    const state = { curveKey: "quad", x0: 1.2, dx: 1.3 };

    container.innerHTML = `
      <div class="lab-card" data-lab-root="lab_secant">
        <div class="card-title-row">
          <div>
            <span class="section-badge" style="background: var(--ch3-soft); color: var(--ch3-color);">${LAB_META.lab_secant.badge}</span>
            <h3 class="section-heading" style="margin-top: 6px;">${LAB_META.lab_secant.titleZh}</h3>
          </div>
          <div class="lab-seg-buttons">
            <button type="button" class="lab-seg-btn active" data-curve="quad">二次抛物线</button>
            <button type="button" class="lab-seg-btn" data-curve="cubic">三次曲线</button>
            <button type="button" class="lab-seg-btn" data-curve="exp">指数曲线 e^(0.5x)</button>
          </div>
        </div>
        <div class="lab-layout">
          <div class="lab-canvas-wrap">
            <canvas class="lab-canvas"></canvas>
          </div>
          <div class="lab-controls"></div>
        </div>
      </div>
    `;

    const canvas = container.querySelector("canvas");
    const controlsEl = container.querySelector(".lab-controls");
    const curveBtns = container.querySelectorAll("[data-curve]");

    function draw() {
      const { ctx, w, h } = setupCanvas(canvas, 560, 340);
      const m = makeCoordMapper(w, h, -1.5, 4.0, -0.5, 6.0);
      drawAxesAndGrid(ctx, m, 1, 1);

      const c = curves[state.curveKey];
      const x0 = state.x0;
      const y0 = c.fn(x0);
      const effDx = Math.abs(state.dx) < 0.03 ? (state.dx >= 0 ? 0.03 : -0.03) : state.dx;
      const x1 = x0 + effDx;
      const y1 = c.fn(x1);
      const secSlope = (y1 - y0) / effDx;
      const tanSlope = c.df(x0);

      // True tangent line (dashed amber)
      plotCurve(ctx, m, (x) => y0 + tanSlope * (x - x0), "#d97706", 2.2, true);
      // Secant line PQ (solid blue)
      plotCurve(ctx, m, (x) => y0 + secSlope * (x - x0), "#2563eb", 2.2, false);
      // Function curve
      plotCurve(ctx, m, c.fn, "#162d59", 3, false);

      // Δx, Δy right-triangle Legs
      const px0 = m.toX(x0), py0 = m.toY(y0);
      const px1 = m.toX(x1), py1 = m.toY(y1);
      ctx.save();
      ctx.strokeStyle = "#dc2626";
      ctx.lineWidth = 1.6;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(px0, py0);
      ctx.lineTo(px1, py0);
      ctx.lineTo(px1, py1);
      ctx.stroke();

      ctx.fillStyle = "#dc2626";
      ctx.font = "bold 12px -apple-system, sans-serif";
      ctx.fillText("Δx", (px0 + px1) / 2 - 8, py0 + (y1 >= y0 ? 15 : -8));
      ctx.fillText("Δy", px1 + 6, (py0 + py1) / 2 + 4);
      ctx.restore();

      drawDot(ctx, px0, py0, "#d97706", 6, "P");
      drawDot(ctx, px1, py1, "#2563eb", 5.5, "Q");

      ctx.fillStyle = "#162d59";
      ctx.font = "bold 12px -apple-system, sans-serif";
      ctx.fillText("━━ y = f(x)   ━━ 割线 PQ   ┈ ┈ P点真切线", m.pad.l + 10, m.pad.t + 18);
    }

    function renderControls() {
      const c = curves[state.curveKey];
      const effDx = Math.abs(state.dx) < 0.03 ? (state.dx >= 0 ? 0.03 : -0.03) : state.dx;
      const dy = c.fn(state.x0 + effDx) - c.fn(state.x0);
      const secSlope = dy / effDx;
      const tanSlope = c.df(state.x0);
      const diff = Math.abs(secSlope - tanSlope);

      controlsEl.innerHTML = `
        <div class="lab-control-group">
          <label><span>定点 P 的横坐标 x₀</span><span>x₀ = ${state.x0.toFixed(2)}</span></label>
          <input type="range" class="lab-range" id="sec-x0" min="-0.5" max="2.5" step="0.1" value="${state.x0}" />
        </div>
        <div class="lab-control-group">
          <label><span>横向增量 Δx（往 0 拖动！）</span><span>Δx = ${effDx.toFixed(2)}</span></label>
          <input type="range" class="lab-range" id="sec-dx" min="-1.2" max="1.6" step="0.02" value="${state.dx}" />
        </div>
        <div class="lab-readout-grid">
          <div class="lab-metric">
            <div class="lab-metric-label">割线斜率 Δy / Δx</div>
            <div class="lab-metric-val" style="color:#2563eb;">${secSlope.toFixed(4)}</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">真切线斜率 f'(x₀)</div>
            <div class="lab-metric-val" style="color:#b45309;">${tanSlope.toFixed(4)}</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">纵向增量 Δy</div>
            <div class="lab-metric-val">${dy.toFixed(4)}</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">斜率误差 |割线 - 切线|</div>
            <div class="lab-metric-val">${diff.toFixed(4)}</div>
          </div>
        </div>
        <div class="lab-insight">
          ${diff < 0.06
            ? "🎯 <strong>无限贴合！</strong>当 $\\Delta x$ 缩向 0，蓝色的割线几乎完全重合到金色切线上，这就是 $\\lim_{\\Delta x \\to 0}\\frac{\\Delta y}{\\Delta x} = f'(x_0)$！"
            : "💡 试试把 <strong>Δx 滑块向左拖到靠近 0</strong>（正负两侧都可以试！），看蓝线如何稳稳旋转贴合金色虚线。"}
        </div>
      `;

      controlsEl.querySelector("#sec-x0").addEventListener("input", (e) => {
        state.x0 = Number(e.target.value);
        renderControls();
        draw();
      });
      controlsEl.querySelector("#sec-dx").addEventListener("input", (e) => {
        state.dx = Number(e.target.value);
        renderControls();
        draw();
      });
      if (window.renderMathInElementSafe) window.renderMathInElementSafe(controlsEl);
    }

    curveBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        curveBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.curveKey = btn.dataset.curve;
        renderControls();
        draw();
      });
    });

    renderControls();
    draw();
  }

  /* ========================================================================
     LAB 3: f(x), f'(x), f''(x) Triple-Graph Scanner
     ======================================================================== */
  function renderLabConcavity(container) {
    const models = {
      cubic: {
        label: "f(x) = x³/3 - x² + 1",
        f: (x) => (x * x * x) / 3 - x * x + 1,
        df: (x) => x * x - 2 * x,
        ddf: (x) => 2 * x - 2,
        yRanges: [[-2.5, 2.5], [-2, 4], [-5, 5]]
      },
      inflect: {
        label: "f(x) = x³/4 + 0.5 (水平拐点特例)",
        f: (x) => (x * x * x) / 4 + 0.5,
        df: (x) => 0.75 * x * x,
        ddf: (x) => 1.5 * x,
        yRanges: [[-2, 3], [-1, 4], [-4, 4]]
      },
      expCombo: {
        label: "f(x) = (x - 1)e^(0.7x)",
        f: (x) => (x - 1) * Math.exp(0.7 * x),
        df: (x) => (0.7 * x + 0.3) * Math.exp(0.7 * x),
        ddf: (x) => (0.49 * x + 0.91) * Math.exp(0.7 * x),
        yRanges: [[-2, 4], [-2, 5], [-3, 6]]
      }
    };

    const state = { key: "cubic", xScan: 0.5 };

    container.innerHTML = `
      <div class="lab-card" data-lab-root="lab_concavity">
        <div class="card-title-row">
          <div>
            <span class="section-badge" style="background: var(--ch5-soft); color: var(--ch5-color);">${LAB_META.lab_concavity.badge}</span>
            <h3 class="section-heading" style="margin-top: 6px;">${LAB_META.lab_concavity.titleZh}</h3>
          </div>
          <div class="lab-seg-buttons">
            <button type="button" class="lab-seg-btn active" data-model="cubic">标准三次曲线（有极值+拐点）</button>
            <button type="button" class="lab-seg-btn" data-model="inflect">水平拐点 x³/4（f''(0)=0 失效警示）</button>
            <button type="button" class="lab-seg-btn" data-model="expCombo">指数乘积 (x-1)e^(0.7x)</button>
          </div>
        </div>
        <div class="lab-layout">
          <div class="lab-canvas-wrap">
            <canvas class="lab-canvas"></canvas>
          </div>
          <div class="lab-controls"></div>
        </div>
      </div>
    `;

    const canvas = container.querySelector("canvas");
    const controlsEl = container.querySelector(".lab-controls");
    const modelBtns = container.querySelectorAll("[data-model]");

    function draw() {
      const { ctx, w, h } = setupCanvas(canvas, 560, 420);
      const md = models[state.key];
      const xMin = -1.5, xMax = 3.2;
      const bandH = h / 3;

      const panels = [
        { title: "原函数 y = f(x)", fn: md.f, color: "#162d59", yr: md.yRanges[0], top: 0 },
        { title: "一阶导 y = f'(x)（正=递增，负=递减）", fn: md.df, color: "#2563eb", yr: md.yRanges[1], top: bandH },
        { title: "二阶导 y = f''(x)（正=凹向上⌣，负=凹向下⌢）", fn: md.ddf, color: "#059669", yr: md.yRanges[2], top: bandH * 2 }
      ];

      panels.forEach((p, idx) => {
        const m = makeCoordMapper(w, bandH, xMin, xMax, p.yr[0], p.yr[1], {
          l: 46, r: 18, t: p.top + 22, b: idx === 2 ? 22 : 12
        });
        // Fix map to absolute canvas Y using top offset
        m.toY = (y) => (p.top + 22) + ((p.yr[1] - y) / (p.yr[1] - p.yr[0])) * (bandH - 34);
        m.pad = { l: 46, r: 18, t: p.top + 22, b: 12 };
        m.plotH = bandH - 34;

        drawAxesAndGrid(ctx, m, 1, Math.max(1, Math.round((p.yr[1] - p.yr[0]) / 3)));

        // Concavity shading on top panel
        if (idx === 0) {
          const steps = 70;
          const dx = (xMax - xMin) / steps;
          for (let i = 0; i < steps; i++) {
            const xm = xMin + (i + 0.5) * dx;
            const d2 = md.ddf(xm);
            ctx.fillStyle = d2 >= 0 ? "rgba(5, 150, 105, 0.07)" : "rgba(217, 119, 6, 0.08)";
            ctx.fillRect(m.toX(xMin + i * dx), m.pad.t, m.toX(xMin + (i + 1) * dx) - m.toX(xMin + i * dx), m.plotH);
          }
        }

        plotCurve(ctx, m, p.fn, p.color, 2.5, false);

        // Scan line
        const sx = m.toX(state.xScan);
        ctx.save();
        ctx.strokeStyle = "#dc2626";
        ctx.lineWidth = 1.4;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(sx, m.pad.t);
        ctx.lineTo(sx, m.pad.t + m.plotH);
        ctx.stroke();
        ctx.restore();

        const sy = p.fn(state.xScan);
        if (sy >= p.yr[0] && sy <= p.yr[1]) {
          drawDot(ctx, sx, m.toY(sy), "#dc2626", 4.5);
        }

        ctx.fillStyle = p.color;
        ctx.font = "bold 12px -apple-system, sans-serif";
        ctx.fillText(p.title, m.pad.l + 6, p.top + 15);
      });
    }

    function renderControls() {
      const md = models[state.key];
      const x = state.xScan;
      const y = md.f(x);
      const y1 = md.df(x);
      const y2 = md.ddf(x);

      const mono = Math.abs(y1) < 0.06 ? "切线水平 Stationary (f'≈0)" : y1 > 0 ? "递增 Increasing (f'>0)" : "递减 Decreasing (f'<0)";
      const conc = Math.abs(y2) < 0.08 ? "凹凸转换点 Inflexion (f''≈0)" : y2 > 0 ? "凹向上 Concave Up (f''>0)" : "凹向下 Concave Down (f''<0)";

      controlsEl.innerHTML = `
        <div class="lab-control-group">
          <label><span>同步扫描线位置 x</span><span>x = ${x.toFixed(2)}</span></label>
          <input type="range" class="lab-range" id="conc-x" min="-1.4" max="3.0" step="0.05" value="${x}" />
        </div>
        <div class="lab-readout-grid">
          <div class="lab-metric">
            <div class="lab-metric-label">原函数 f(x)</div>
            <div class="lab-metric-val">${y.toFixed(3)}</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">一阶导 f'(x)</div>
            <div class="lab-metric-val" style="color:#2563eb;">${y1.toFixed(3)}</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">二阶导 f''(x)</div>
            <div class="lab-metric-val" style="color:#059669;">${y2.toFixed(3)}</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">背景底色提示</div>
            <div class="lab-metric-val" style="font-size:0.78rem;">绿=凹向上 / 橙=凹向下</div>
          </div>
        </div>
        <div class="lab-insight">
          <strong>当前位置实时诊断：</strong><br>
          • 增减性：<strong>${mono}</strong><br>
          • 弯曲度：<strong>${conc}</strong>
        </div>
      `;
      controlsEl.querySelector("#conc-x").addEventListener("input", (e) => {
        state.xScan = Number(e.target.value);
        renderControls();
        draw();
      });
    }

    modelBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        modelBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.key = btn.dataset.model;
        renderControls();
        draw();
      });
    });

    renderControls();
    draw();
  }

  /* ========================================================================
     LAB 4: Trapezoidal Rule & Over-/Under-estimate Lab (M1A Cover Replica)
     ======================================================================== */
  function renderLabTrapezoid(container) {
    const funcs = {
      expUp: {
        name: "f(x) = 0.7 e^(0.65x) [Concave Up]",
        fn: (x) => 0.7 * Math.exp(0.65 * x),
        exact: (a, b) => (0.7 / 0.65) * (Math.exp(0.65 * b) - Math.exp(0.65 * a)),
        ddfSign: +1,
        reasonZh: "因为 $f''(x) = 0.29575 e^{0.65x} > 0$，曲线像碗一样<strong>凹向上（Concave upwards）</strong>，梯形斜边永远搭在曲线<strong>上方</strong>，所以是 <strong>Over-estimate（高估）</strong>！",
        yMax: 3.2
      },
      logDown: {
        name: "f(x) = 1.8 ln(x + 1.5) [Concave Down]",
        fn: (x) => 1.8 * Math.log(x + 1.5),
        exact: (a, b) => {
          const F = (t) => 1.8 * ((t + 1.5) * Math.log(t + 1.5) - (t + 1.5));
          return F(b) - F(a);
        },
        ddfSign: -1,
        reasonZh: "因为 $f''(x) = -\\frac{1.8}{(x+1.5)^2} < 0$，曲线像拱桥一样<strong>凹向下（Concave downwards）</strong>，梯形斜边缩在曲线<strong>下方</strong>，所以是 <strong>Under-estimate（低估）</strong>！",
        yMax: 2.8
      },
      quadUp: {
        name: "f(x) = 0.5x² + 0.5 [Concave Up]",
        fn: (x) => 0.5 * x * x + 0.5,
        exact: (a, b) => {
          const F = (t) => (t * t * t) / 6 + 0.5 * t;
          return F(b) - F(a);
        },
        ddfSign: +1,
        reasonZh: "因为 $f''(x) = 1 > 0$，曲线严格<strong>凹向上（Concave upwards）</strong>，每条梯形斜边都多包了上面一弯窄条 $\\implies$ <strong>Over-estimate（高估）</strong>！",
        yMax: 3.0
      }
    };

    const state = { key: "expUp", n: 4, showGap: true };

    container.innerHTML = `
      <div class="lab-card" data-lab-root="lab_trapezoid">
        <div class="card-title-row">
          <div>
            <span class="section-badge" style="background: var(--ch7-soft); color: var(--ch7-color);">${LAB_META.lab_trapezoid.badge}</span>
            <h3 class="section-heading" style="margin-top: 6px;">${LAB_META.lab_trapezoid.titleZh}</h3>
          </div>
          <div class="lab-seg-buttons">
            <button type="button" class="lab-seg-btn active" data-fn="expUp">指数凹向上 (高估)</button>
            <button type="button" class="lab-seg-btn" data-fn="logDown">对数凹向下 (低估)</button>
            <button type="button" class="lab-seg-btn" data-fn="quadUp">抛物线凹向上 (高估)</button>
          </div>
        </div>
        <div class="lab-layout">
          <div class="lab-canvas-wrap">
            <canvas class="lab-canvas"></canvas>
          </div>
          <div class="lab-controls"></div>
        </div>
      </div>
    `;

    const canvas = container.querySelector("canvas");
    const controlsEl = container.querySelector(".lab-controls");
    const fnBtns = container.querySelectorAll("[data-fn]");

    function computeTrap(fObj, a, b, n) {
      const h = (b - a) / n;
      let sum = fObj.fn(a) + fObj.fn(b);
      for (let i = 1; i < n; i++) {
        sum += 2 * fObj.fn(a + i * h);
      }
      return (h / 2) * sum;
    }

    function draw() {
      const fObj = funcs[state.key];
      const a = 0, b = 2;
      const { ctx, w, h } = setupCanvas(canvas, 560, 350);
      const m = makeCoordMapper(w, h, -0.25, 2.3, -0.2, fObj.yMax);
      drawAxesAndGrid(ctx, m, 0.5, 0.5);

      const n = state.n;
      const step = (b - a) / n;

      // Draw filled trapezoids
      for (let i = 0; i < n; i++) {
        const x0 = a + i * step;
        const x1 = a + (i + 1) * step;
        const y0 = fObj.fn(x0);
        const y1 = fObj.fn(x1);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(m.toX(x0), m.toY(0));
        ctx.lineTo(m.toX(x0), m.toY(y0));
        ctx.lineTo(m.toX(x1), m.toY(y1));
        ctx.lineTo(m.toX(x1), m.toY(0));
        ctx.closePath();
        ctx.fillStyle = "rgba(217, 119, 6, 0.16)";
        ctx.fill();
        ctx.strokeStyle = "#b45309";
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.restore();

        // Highlight error gap between chord and true curve
        if (state.showGap) {
          ctx.save();
          ctx.beginPath();
          const subSteps = 20;
          ctx.moveTo(m.toX(x0), m.toY(y0));
          for (let s = 1; s <= subSteps; s++) {
            const xt = x0 + (step * s) / subSteps;
            ctx.lineTo(m.toX(xt), m.toY(fObj.fn(xt)));
          }
          ctx.lineTo(m.toX(x0), m.toY(y0));
          ctx.closePath();
          ctx.fillStyle = fObj.ddfSign > 0 ? "rgba(220, 38, 38, 0.35)" : "rgba(5, 150, 105, 0.35)";
          ctx.fill();
          ctx.restore();
        }
      }

      // True curve on top
      plotCurve(ctx, m, fObj.fn, "#162d59", 3, false, -0.15, 2.2);

      // Node points P_0 ... P_n
      for (let i = 0; i <= n; i++) {
        const xi = a + i * step;
        const label = i === 0 ? "P₀" : i === n ? "Pₙ" : "";
        drawDot(ctx, m.toX(xi), m.toY(fObj.fn(xi)), "#162d59", 4, label);
      }

      ctx.fillStyle = "#162d59";
      ctx.font = "bold 12px -apple-system, sans-serif";
      ctx.fillText(
        fObj.ddfSign > 0 ? "红色缝隙 = 梯形多算出来的面积 (Over-estimate)" : "绿色缝隙 = 梯形漏掉没算进的面积 (Under-estimate)",
        m.pad.l + 8,
        m.pad.t + 16
      );
    }

    function renderControls() {
      const fObj = funcs[state.key];
      const a = 0, b = 2;
      const hStep = (b - a) / state.n;
      const approx = computeTrap(fObj, a, b, state.n);
      const exact = fObj.exact(a, b);
      const err = approx - exact;
      const pctErr = (Math.abs(err) / exact) * 100;

      controlsEl.innerHTML = `
        <div class="lab-control-group">
          <label><span>子区间数 n (Sub-intervals)</span><span>n = ${state.n}（共 ${state.n + 1} 个纵坐标）</span></label>
          <input type="range" class="lab-range" id="trap-n" min="1" max="16" step="1" value="${state.n}" />
        </div>
        <div class="lab-readout-grid">
          <div class="lab-metric">
            <div class="lab-metric-label">步长 h = (2 - 0) / n</div>
            <div class="lab-metric-val">${hStep.toFixed(4)}</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">梯形法则近似值</div>
            <div class="lab-metric-val" style="color:#b45309;">${approx.toFixed(4)}</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">真实定积分值</div>
            <div class="lab-metric-val">${exact.toFixed(4)}</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">绝对/相对误差</div>
            <div class="lab-metric-val">${err >= 0 ? "+" : ""}${err.toFixed(4)} (${pctErr.toFixed(2)}%)</div>
          </div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;font-size:0.86rem;font-weight:600;cursor:pointer;">
          <input type="checkbox" id="trap-gap" ${state.showGap ? "checked" : ""} />
          放大标出梯形顶边与曲线间的误差缝隙
        </label>
        <div class="lab-insight">
          ${fObj.reasonZh}<br>
          <small>试着把 $n$ 拖大到 16，观察误差百分比如何瞬间缩小！</small>
        </div>
      `;

      controlsEl.querySelector("#trap-n").addEventListener("input", (e) => {
        state.n = Number(e.target.value);
        renderControls();
        draw();
      });
      controlsEl.querySelector("#trap-gap").addEventListener("change", (e) => {
        state.showGap = e.target.checked;
        draw();
      });
      if (window.renderMathInElementSafe) window.renderMathInElementSafe(controlsEl);
    }

    fnBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        fnBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.key = btn.dataset.fn;
        renderControls();
        draw();
      });
    });

    renderControls();
    draw();
  }

  function mount(labId, container) {
    if (!container) return;
    if (labId === "lab_exp_e") return renderLabExpE(container);
    if (labId === "lab_secant") return renderLabSecant(container);
    if (labId === "lab_concavity") return renderLabConcavity(container);
    if (labId === "lab_trapezoid") return renderLabTrapezoid(container);
  }

  return {
    META: LAB_META,
    mount
  };
})();
