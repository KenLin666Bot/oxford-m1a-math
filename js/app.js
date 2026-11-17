/* ==========================================================================
   Oxford Mathematics for the New Century (M1A) — Main Application Controller
   ========================================================================== */

(function () {
  window.renderMathInElementSafe = function (el) {
    if (!el || typeof window.renderMathInElement !== "function") return;
    try {
      window.renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false }
        ],
        throwOnError: false,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
      });
    } catch (err) {
      console.warn("KaTeX render warning:", err);
    }
  };

  const state = {
    topView: "learn", // "learn" | "map" | "labs" | "formulas" | "notebook"
    activeUnitId: "overview", // "overview" | "1.1" ... "7.3"
    sidebarFilter: "",
    collapsedChapters: {},
    formulaFilter: "all",
    glossaryFilter: ""
  };

  const orderedUnitIds = [];
  window.M1A_DATA.chapters.forEach((ch) => {
    ch.unitIds.forEach((uid) => orderedUnitIds.push(uid));
  });

  const dom = {
    shell: document.getElementById("app-shell"),
    sidebar: document.getElementById("app-sidebar"),
    main: document.getElementById("app-main"),
    backdrop: document.getElementById("sidebar-backdrop"),
    menuBtn: document.getElementById("mobile-menu-btn"),
    progressPill: document.getElementById("global-progress-pill"),
    navTabs: document.querySelectorAll(".nav-tab")
  };

  function closeMobileDrawer() {
    dom.sidebar.classList.remove("open");
    dom.backdrop.classList.remove("visible");
  }

  function openMobileDrawer() {
    dom.sidebar.classList.add("open");
    dom.backdrop.classList.add("visible");
  }

  function updateProgressPill() {
    let doneCount = 0;
    orderedUnitIds.forEach((uid) => {
      if (window.M1A_QUIZ.isUnitDone(uid) === "done") doneCount++;
    });
    const pct = Math.round((doneCount / orderedUnitIds.length) * 100);
    dom.progressPill.textContent = `学习进度：${doneCount}/${orderedUnitIds.length} 讲 (${pct}%)`;
  }

  function syncNavTabs() {
    dom.navTabs.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.topView === state.topView);
    });
    const showSidebar = state.topView === "learn";
    dom.sidebar.classList.toggle("hidden-in-mode", !showSidebar);
    dom.shell.classList.toggle("full-width", !showSidebar);
    if (!showSidebar) closeMobileDrawer();
  }

  function navigateTo(topView, unitId = null) {
    state.topView = topView;
    if (unitId) state.activeUnitId = unitId;
    syncNavTabs();
    renderSidebar();
    renderMain();
    closeMobileDrawer();
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const hash = topView === "learn" ? (state.activeUnitId === "overview" ? "#overview" : `#unit/${state.activeUnitId}`) : `#${topView}`;
      history.replaceState(null, "", hash);
    } catch (e) {}
  }

  function renderSidebar() {
    if (state.topView !== "learn") return;
    const data = window.M1A_DATA;
    const q = state.sidebarFilter.trim().toLowerCase();

    const chaptersHtml = data.chapters
      .map((ch) => {
        const matchedUnits = ch.unitIds.filter((uid) => {
          const u = data.units[uid];
          if (!u) return false;
          if (!q) return true;
          return (
            u.id.toLowerCase().includes(q) ||
            u.titleZh.toLowerCase().includes(q) ||
            u.titleEn.toLowerCase().includes(q) ||
            ch.titleZh.toLowerCase().includes(q) ||
            ch.titleEn.toLowerCase().includes(q)
          );
        });

        if (q && matchedUnits.length === 0) return "";
        const isCollapsed = !q && Boolean(state.collapsedChapters[ch.id]);

        const unitsHtml = matchedUnits
          .map((uid) => {
            const u = data.units[uid];
            const status = window.M1A_QUIZ.isUnitDone(uid);
            const dotChar = status === "done" ? "✓" : status === "partial" ? "…" : "";
            const dotCls = status === "done" ? "done" : status === "partial" ? "partial" : "";
            return `
              <li>
                <button type="button" class="unit-btn ${state.activeUnitId === uid ? "active" : ""}" data-unit-id="${uid}">
                  <span class="unit-btn-label">
                    ${u.titleZh}
                    <span class="unit-btn-en">${u.titleEn}</span>
                  </span>
                  <span class="unit-status-dot ${dotCls}" title="${status === "done" ? "已完成" : status === "partial" ? "进行中" : "未开始"}">${dotChar}</span>
                </button>
              </li>
            `;
          })
          .join("");

        return `
          <div class="chapter-group ${isCollapsed ? "collapsed" : ""}" data-ch-id="${ch.id}">
            <button type="button" class="chapter-group-header" data-toggle-ch="${ch.id}">
              <span class="chapter-badge" style="background:${ch.color};">${ch.num}</span>
              <span class="chapter-group-title">
                ${ch.titleZh}
                <small>${ch.titleEn}</small>
              </span>
              <span style="font-size:0.75rem;color:var(--text-muted);">${isCollapsed ? "▶" : "▼"}</span>
            </button>
            <ul class="unit-list">${unitsHtml}</ul>
          </div>
        `;
      })
      .join("");

    dom.sidebar.innerHTML = `
      <div class="sidebar-search-wrap">
        <input type="search" id="sidebar-search-input" class="sidebar-search" placeholder="🔍 搜章节或知识点（如 链式 / 7.3）" value="${state.sidebarFilter.replace(/"/g, "&quot;")}" />
      </div>
      <button type="button" id="sidebar-overview-btn" class="sidebar-overview-btn ${state.activeUnitId === "overview" ? "active" : ""}">
        <span>🏠 全书导览与学习路线</span>
        <span>${orderedUnitIds.length} 讲</span>
      </button>
      ${chaptersHtml}
      <div class="m1b-sidebar-card">
        <strong>📦 M1B 下册统计篇（架构已预留）</strong>
        Ch. 8–13 条件概率、二项/泊松/正态分布与置信区间可通过数据插件无缝接入。
      </div>
    `;

    const searchInput = dom.sidebar.querySelector("#sidebar-search-input");
    searchInput.addEventListener("input", (e) => {
      state.sidebarFilter = e.target.value;
      const pos = e.target.selectionStart;
      renderSidebar();
      const refreshed = dom.sidebar.querySelector("#sidebar-search-input");
      refreshed.focus();
      refreshed.setSelectionRange(pos, pos);
    });

    dom.sidebar.querySelector("#sidebar-overview-btn").addEventListener("click", () => {
      navigateTo("learn", "overview");
    });

    dom.sidebar.querySelectorAll("[data-toggle-ch]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chId = btn.dataset.toggleCh;
        state.collapsedChapters[chId] = !state.collapsedChapters[chId];
        renderSidebar();
      });
    });

    dom.sidebar.querySelectorAll("[data-unit-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigateTo("learn", btn.dataset.unitId);
      });
    });
  }

  /* ========================================================================
     Render Overview Landing Page
     ======================================================================== */
  function renderOverview() {
    const data = window.M1A_DATA;

    const cardsHtml = data.chapters
      .map((ch) => {
        const chips = ch.unitIds
          .map((uid) => {
            const u = data.units[uid];
            const st = window.M1A_QUIZ.isUnitDone(uid);
            const icon = st === "done" ? "✅ " : st === "partial" ? "🟡 " : "";
            return `<button type="button" class="unit-chip" data-go-unit="${uid}">${icon}${u.titleZh}</button>`;
          })
          .join("");

        return `
          <div class="chapter-overview-card" style="border-top: 4px solid ${ch.color};">
            <div>
              <span class="chapter-badge" style="background:${ch.color};">${ch.num}</span>
              <h3>${ch.titleZh}</h3>
              <div class="chapter-overview-en">${ch.titleEn}</div>
              <p class="chapter-overview-desc">${ch.summary}</p>
            </div>
            <div class="chapter-unit-chips">${chips}</div>
          </div>
        `;
      })
      .join("");

    dom.main.innerHTML = `
      <section class="hero-banner">
        <div>
          <span class="hero-tag">Oxford Mathematics for the New Century · 2023 Edition</span>
          <h1>牛津 M1A 微积分与代数全景精讲站</h1>
          <p>
            专为 HKDSE M1 初学与同步跟课打造：用听得懂的生活案例建立直觉，严格对齐牛津课本标准公式与英文解题步骤，搭配 <strong>4 大交互可视化实验室</strong> 与 <strong>三阶渐进闯关提问</strong>。
          </p>
          <div class="hero-actions">
            <button type="button" class="btn btn-amber" id="hero-start-btn">🚀 从第 1.1 讲开始学习</button>
            <button type="button" class="btn btn-ghost-light" id="hero-map-btn">🕸️ 先看全书知识关系图谱</button>
            <button type="button" class="btn btn-ghost-light" id="hero-labs-btn">🔬 打开交互微积分实验室</button>
          </div>
        </div>
        <div class="hero-visual-box">
          <svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
            <rect width="320" height="190" rx="10" fill="rgba(15, 23, 42, 0.25)"/>
            <polygon points="180,22 250,126 110,126" fill="rgba(253, 230, 138, 0.16)" stroke="rgba(253, 230, 138, 0.45)" stroke-width="2"/>
            <!-- Trapezoidal strips echoing the Oxford M1A cover -->
            <polygon points="44,158 44,98 86,74 86,158" fill="rgba(245, 158, 11, 0.35)" stroke="#fde68a" stroke-width="1.4"/>
            <polygon points="86,158 86,74 128,70 128,158" fill="rgba(245, 158, 11, 0.30)" stroke="#fde68a" stroke-width="1.4"/>
            <polygon points="128,158 128,70 170,92 170,158" fill="rgba(245, 158, 11, 0.25)" stroke="#fde68a" stroke-width="1.4"/>
            <polygon points="170,158 170,92 212,116 212,158" fill="rgba(245, 158, 11, 0.20)" stroke="#fde68a" stroke-width="1.4"/>
            <!-- Axes & curve y=f(x) -->
            <line x1="26" y1="158" x2="294" y2="158" stroke="#fff" stroke-width="1.6"/>
            <line x1="34" y1="168" x2="34" y2="20" stroke="#fff" stroke-width="1.6"/>
            <path d="M 34 108 Q 100 42, 170 92 T 268 78" fill="none" stroke="#fef3c7" stroke-width="3"/>
            <circle cx="44" cy="98" r="3.5" fill="#fff"/>
            <circle cx="212" cy="116" r="3.5" fill="#fff"/>
            <text x="48" y="88" fill="#fef3c7" font-size="11" font-weight="bold">P₀</text>
            <text x="216" y="108" fill="#fef3c7" font-size="11" font-weight="bold">Pₙ</text>
            <text x="200" y="64" fill="#fde68a" font-size="13" font-style="italic" font-weight="bold">y = f(x)</text>
            <text x="36" y="176" fill="#fef3c7" font-size="10">a = x₀</text>
            <text x="196" y="176" fill="#fef3c7" font-size="10">xₙ = b</text>
          </svg>
          <div class="hero-visual-caption">向牛津 M1A 封面致敬：曲线 $y=f(x)$、$\\Delta$ 增量与梯形分割</div>
        </div>
      </section>

      <div class="card" style="background:var(--info-soft);border-color:var(--info-border);">
        <h3 style="margin:0 0 8px;color:var(--oxford-navy);">🎯 为什么学 M1A 不该死背公式？（30 秒看懂全书设计逻辑）</h3>
        <p style="margin:0;color:var(--text-secondary);font-size:0.94rem;">
          整本 <strong>M1A（Ch. 1 – Ch. 7）共 26 讲</strong> 由一条主线串到底：<strong>Ch.1–2</strong> 打好二项式与 $e^x / \\ln x$ 地基 → <strong>Ch.3–4</strong> 学会算函数瞬时斜率（导数） → <strong>Ch.5</strong> 用一阶/二阶导看穿图像极值与凹凸性 → <strong>Ch.6–7</strong> 逆向积分算面积，并用第 5 章的 $f''(x)$ 判断梯形法则误差！点击下方任意小节卡片即可进入学习。
        </p>
      </div>

      <div class="overview-grid">${cardsHtml}</div>
    `;

    dom.main.querySelector("#hero-start-btn").addEventListener("click", () => navigateTo("learn", "1.1"));
    dom.main.querySelector("#hero-map-btn").addEventListener("click", () => navigateTo("map"));
    dom.main.querySelector("#hero-labs-btn").addEventListener("click", () => navigateTo("labs"));
    dom.main.querySelectorAll("[data-go-unit]").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo("learn", btn.dataset.goUnit));
    });
    window.renderMathInElementSafe(dom.main);
  }

  /* ========================================================================
     Render Individual Micro-Unit Lesson (5-Step Loop)
     ======================================================================== */
  function renderUnit(unitId) {
    const data = window.M1A_DATA;
    const unit = data.units[unitId];
    if (!unit) return renderOverview();

    const ch = data.chapters.find((c) => c.id === unit.chapterId);
    const st = window.M1A_QUIZ.loadState();
    const isSaved = st.bookmarks.includes(unitId);
    const isCompleted = st.completedUnits.includes(unitId);

    const idx = orderedUnitIds.indexOf(unitId);
    const prevId = idx > 0 ? orderedUnitIds[idx - 1] : null;
    const nextId = idx >= 0 && idx < orderedUnitIds.length - 1 ? orderedUnitIds[idx + 1] : null;

    const formulasHtml = (unit.formulas || [])
      .map(
        (f) => `
      <div class="formula-card">
        <div class="formula-card-label"><span>📐 ${f.label}</span></div>
        <div class="formula-math-box">${f.latex}</div>
        <p class="formula-note">${f.note}</p>
      </div>
    `
      )
      .join("");

    const pitfallsHtml = (unit.pitfalls || [])
      .map(
        (p) => `
      <div class="pitfall-item">
        <div class="pitfall-wrong">${p.wrong}</div>
        <div class="pitfall-right">${p.right}</div>
      </div>
    `
      )
      .join("");

    const examplesHtml = (unit.examples || [])
      .map(
        (ex) => `
      <div class="example-box">
        <div class="example-question">
          <div class="example-question-tag">${ex.title}</div>
          <div class="example-en-prompt">${ex.promptEn}</div>
          <div class="example-zh-translation">🇨🇳 <strong>中文翻译：</strong>${ex.promptZh}</div>
        </div>
        <div class="solution-rows">
          ${ex.steps
            .map(
              (s) => `
            <div class="solution-row">
              <div class="solution-math">${s.math}</div>
              <div class="solution-why">💡 ${s.why}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
      )
      .join("");

    const prereqBtns =
      unit.connections.prereq && unit.connections.prereq.length
        ? unit.connections.prereq
            .map((c) => `<button type="button" class="conn-link-btn" data-jump-unit="${c.id}">⬅️ ${c.label}</button>`)
            .join("")
        : `<span style="font-size:0.84rem;color:var(--text-muted);">本讲为起点基础，零前置要求！</span>`;

    const nextBtns =
      unit.connections.next && unit.connections.next.length
        ? unit.connections.next
            .map((c) => `<button type="button" class="conn-link-btn" data-jump-unit="${c.id}">➡️ ${c.label}</button>`)
            .join("")
        : `<button type="button" class="conn-link-btn" id="jump-to-map-end">🕸️ 查看通往 M1B 下册的知识地图</button>`;

    dom.main.innerHTML = `
      <!-- Unit Header -->
      <div class="unit-header-card" style="border-top-color:${ch.color};">
        <div class="unit-breadcrumb">
          <span>${ch.num} · ${ch.titleZh} (${ch.titleEn})</span>
          <span>第 ${idx + 1} / ${orderedUnitIds.length} 讲</span>
        </div>
        <div class="unit-header-title-row">
          <div>
            <h1>${unit.titleZh}</h1>
            <div class="unit-en-subtitle">${unit.titleEn}</div>
          </div>
          <div class="unit-actions-bar">
            <button type="button" id="unit-bookmark-btn" class="btn btn-outline btn-sm bookmark-btn ${isSaved ? "saved" : ""}">
              ${isSaved ? "⭐ 已收藏至复习本" : "☆ 收藏本讲"}
            </button>
            <button type="button" id="unit-complete-btn" class="btn btn-outline btn-sm complete-btn ${isCompleted ? "completed" : ""}">
              ${isCompleted ? "✅ 已标为掌握" : "○ 标记本讲已掌握"}
            </button>
          </div>
        </div>
        <div class="unit-objectives">
          <strong>🎯 本讲学习目标：</strong>
          <ul style="margin:6px 0 0;padding-left:20px;">
            ${unit.objectives.map((o) => `<li>${o}</li>`).join("")}
          </ul>
        </div>
      </div>

      <!-- Step 1: Real-life Intuition -->
      <div class="card">
        <div class="card-title-row">
          <span class="section-badge" style="background:var(--amber-soft);color:var(--amber);">Step 1 · 先建立生活直觉</span>
        </div>
        <div class="intuition-box" style="margin-bottom:0;">
          <h4>💡 ${unit.intuition.title}</h4>
          ${unit.intuition.storyHtml}
        </div>
      </div>

      <!-- Step 2: Bilingual Concepts, Formulas & Pitfalls -->
      <div class="card">
        <div class="card-title-row">
          <div>
            <span class="section-badge" style="background:var(--oxford-navy-soft);color:var(--oxford-navy);">Step 2 · 双语精讲与课本标准公式</span>
            <h3 class="section-heading" style="margin-top:6px;">核心概念、课本公式与避坑对照</h3>
          </div>
        </div>
        <div>${unit.conceptsHtml}</div>
        <div class="formula-grid">${formulasHtml}</div>
        <h4 style="margin:18px 0 8px;color:var(--oxford-navy);">🚦 常见易错点正误对照</h4>
        <div class="pitfall-list">${pitfallsHtml}</div>
        ${unit.syllabusGuard ? `<div class="syllabus-guard">🛡️ <strong>考纲与课本规范护栏：</strong>${unit.syllabusGuard}</div>` : ""}
      </div>

      <!-- Optional Embedded Interactive Calculus Lab -->
      <div id="unit-lab-slot"></div>

      <!-- Step 3: Bilingual Worked Examples -->
      <div class="card">
        <div class="card-title-row">
          <div>
            <span class="section-badge" style="background:#eef2ff;color:#4338ca;">Step 3 · 英文例题 + 中文逐行旁批</span>
            <h3 class="section-heading" style="margin-top:6px;">跟着标准步骤写，考试稳拿方法分 (1M / 1A)</h3>
          </div>
        </div>
        ${examplesHtml}
      </div>

      <!-- Step 4: Knowledge Connections -->
      <div class="card">
        <div class="card-title-row">
          <div>
            <span class="section-badge" style="background:var(--success-soft);color:var(--success);">Step 4 · 知识点来龙去脉</span>
            <h3 class="section-heading" style="margin-top:6px;">这一讲从哪里来，又要用到哪里去？</h3>
          </div>
        </div>
        <p style="margin-top:0;color:var(--text-secondary);">${unit.connections.summary}</p>
        <div class="connections-grid">
          <div class="conn-pill-card">
            <h5>⬅️ 前置地基 (Prerequisites)</h5>
            <div>${prereqBtns}</div>
          </div>
          <div class="conn-pill-card">
            <h5>➡️ 后续应用 (Leads To)</h5>
            <div>${nextBtns}</div>
          </div>
        </div>
      </div>

      <!-- Step 5: 3-Stage Progressive Quiz -->
      <div id="unit-quiz-slot"></div>

      <!-- Bottom Prev / Next Unit Navigation -->
      <div class="unit-footer-nav">
        ${prevId
          ? `<button type="button" class="btn btn-outline" id="footer-prev-btn">⬅️ 上一讲：${data.units[prevId].titleZh}</button>`
          : `<button type="button" class="btn btn-outline" id="footer-home-btn">🏠 返回全书导览</button>`}
        ${nextId
          ? `<button type="button" class="btn btn-primary" id="footer-next-btn">下一讲：${data.units[nextId].titleZh} ➡️</button>`
          : `<button type="button" class="btn btn-amber" id="footer-map-btn">🎉 M1A 完结！查看全书关系图谱</button>`}
      </div>
    `;

    // Mount Lab if assigned to this unit
    if (unit.labId) {
      window.M1A_LABS.mount(unit.labId, dom.main.querySelector("#unit-lab-slot"));
    }

    // Mount 3-Stage Progressive Quiz
    window.M1A_QUIZ.renderStepper(dom.main.querySelector("#unit-quiz-slot"), unit, () => {
      updateProgressPill();
      renderSidebar();
    });

    // Bind bookmark & complete buttons
    dom.main.querySelector("#unit-bookmark-btn").addEventListener("click", () => {
      window.M1A_QUIZ.toggleBookmark(unitId);
      renderUnit(unitId);
    });

    dom.main.querySelector("#unit-complete-btn").addEventListener("click", () => {
      window.M1A_QUIZ.toggleCompleted(unitId);
      updateProgressPill();
      renderSidebar();
      renderUnit(unitId);
    });

    // Bind connection jump links & footer buttons
    dom.main.querySelectorAll("[data-jump-unit]").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo("learn", btn.dataset.jumpUnit));
    });

    const mapEndBtn = dom.main.querySelector("#jump-to-map-end");
    if (mapEndBtn) mapEndBtn.addEventListener("click", () => navigateTo("map"));

    const prevBtn = dom.main.querySelector("#footer-prev-btn");
    if (prevBtn && prevId) prevBtn.addEventListener("click", () => navigateTo("learn", prevId));
    const homeBtn = dom.main.querySelector("#footer-home-btn");
    if (homeBtn) homeBtn.addEventListener("click", () => navigateTo("learn", "overview"));
    const nextBtn = dom.main.querySelector("#footer-next-btn");
    if (nextBtn && nextId) nextBtn.addEventListener("click", () => navigateTo("learn", nextId));
    const endMapBtn = dom.main.querySelector("#footer-map-btn");
    if (endMapBtn) endMapBtn.addEventListener("click", () => navigateTo("map"));

    window.renderMathInElementSafe(dom.main);
  }

  /* ========================================================================
     Render Dedicated Interactive Labs Hub
     ======================================================================== */
  function renderLabsHub() {
    dom.main.innerHTML = `
      <div class="card">
        <div class="card-title-row">
          <div>
            <span class="section-badge" style="background:var(--amber-soft);color:var(--amber);">Interactive Calculus Labs</span>
            <h2 class="section-heading" style="margin-top:6px;">牛津 M1A 四大交互式微积分可视化实验室</h2>
          </div>
        </div>
        <p style="margin:0;color:var(--text-secondary);">
          不用死记硬背抽象符号！拖动下面每个实验室的滑块，亲眼看懂 $e$ 的由来、$\\Delta x \\to 0$ 的切线本质、二阶导数如何控制凹凸方向，以及教材封面上“梯形法则误差”从何而来。
        </p>
      </div>
      <div id="hub-lab-1"></div>
      <div id="hub-lab-2"></div>
      <div id="hub-lab-3"></div>
      <div id="hub-lab-4"></div>
    `;

    window.M1A_LABS.mount("lab_exp_e", dom.main.querySelector("#hub-lab-1"));
    window.M1A_LABS.mount("lab_secant", dom.main.querySelector("#hub-lab-2"));
    window.M1A_LABS.mount("lab_concavity", dom.main.querySelector("#hub-lab-3"));
    window.M1A_LABS.mount("lab_trapezoid", dom.main.querySelector("#hub-lab-4"));
    window.renderMathInElementSafe(dom.main);
  }

  /* ========================================================================
     Render Formulas & Bilingual Glossary View
     ======================================================================== */
  function renderFormulasAndGlossary() {
    const data = window.M1A_DATA;
    const chTabs = [{ id: "all", num: "全部", titleZh: "全部公式" }].concat(data.chapters);

    const filteredSheets = data.formulaSheet.filter(
      (s) => state.formulaFilter === "all" || s.chapterId === state.formulaFilter
    );

    const gq = state.glossaryFilter.trim().toLowerCase();
    const filteredGlossary = data.glossary.filter((g) => {
      if (!gq) return true;
      return (
        g.en.toLowerCase().includes(gq) ||
        g.zh.toLowerCase().includes(gq) ||
        g.ch.toLowerCase().includes(gq) ||
        g.desc.toLowerCase().includes(gq)
      );
    });

    dom.main.innerHTML = `
      <div class="card">
        <div class="card-title-row">
          <div>
            <span class="section-badge" style="background:var(--oxford-navy-soft);color:var(--oxford-navy);">Oxford M1A Formula Sheet</span>
            <h2 class="section-heading" style="margin-top:6px;">牛津 M1A 课本标准公式速查卡（考前必背）</h2>
          </div>
        </div>
        <div class="syllabus-guard" style="margin-top:0;margin-bottom:14px;">
          🛡️ <strong>HKDSE M1 考纲红线提示：</strong>M1 <strong>不考</strong>有理/负指数二项展式、<strong>不考</strong>三角函数微积分（sin/cos/tan 求导积分属于 M2）、<strong>不考</strong>分部积分法与旋转体体积。本站所有公式均已严格过滤，可直接作为标准考试记号使用！
        </div>
        <div class="filter-bar">
          ${chTabs
            .map(
              (c) => `
            <button type="button" class="lab-seg-btn ${state.formulaFilter === c.id ? "active" : ""}" data-f-filter="${c.id}">
              ${c.num} ${c.id === "all" ? "" : c.titleZh}
            </button>
          `
            )
            .join("")}
        </div>
        ${filteredSheets
          .map(
            (sec) => `
          <h4 style="margin:18px 0 10px;color:var(--oxford-navy);">${sec.chapterName}</h4>
          <div class="formula-grid">
            ${sec.items
              .map(
                (item) => `
              <div class="formula-card">
                <div class="formula-card-label"><span>${item.name}</span></div>
                <div class="formula-math-box">${item.formula}</div>
                <p class="formula-note">${item.note}</p>
              </div>
            `
              )
              .join("")}
          </div>
        `
          )
          .join("")}
      </div>

      <div class="card">
        <div class="card-title-row">
          <div>
            <span class="section-badge" style="background:var(--amber-soft);color:var(--amber);">Bilingual Glossary</span>
            <h2 class="section-heading" style="margin-top:6px;">中英双语核心数学术语词典（共 ${data.glossary.length} 词）</h2>
          </div>
        </div>
        <div class="filter-bar">
          <input type="search" id="glossary-search-input" class="filter-input" placeholder="🔍 搜索英文或中文术语（如 Stationary / 梯形 / 拐点）..." value="${state.glossaryFilter.replace(/"/g, "&quot;")}" />
        </div>
        <div style="overflow-x:auto;">
          <table class="glossary-table">
            <thead>
              <tr>
                <th style="width:24%;">英文术语 (English)</th>
                <th style="width:20%;">中文译名</th>
                <th style="width:10%;">章节</th>
                <th>含义与课本用法</th>
              </tr>
            </thead>
            <tbody>
              ${filteredGlossary
                .map(
                  (g) => `
                <tr>
                  <td><strong>${g.en}</strong></td>
                  <td>${g.zh}</td>
                  <td><span class="chapter-badge" style="background:var(--oxford-navy);">${g.ch}</span></td>
                  <td>${g.desc}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    dom.main.querySelectorAll("[data-f-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.formulaFilter = btn.dataset.fFilter;
        renderFormulasAndGlossary();
      });
    });

    const gInput = dom.main.querySelector("#glossary-search-input");
    gInput.addEventListener("input", (e) => {
      state.glossaryFilter = e.target.value;
      const pos = e.target.selectionStart;
      renderFormulasAndGlossary();
      const refreshed = dom.main.querySelector("#glossary-search-input");
      refreshed.focus();
      refreshed.setSelectionRange(pos, pos);
    });

    window.renderMathInElementSafe(dom.main);
  }

  /* ========================================================================
     Render Personal Review Notebook & Progress Dashboard
     ======================================================================== */
  function renderNotebook() {
    const data = window.M1A_DATA;
    const st = window.M1A_QUIZ.loadState();

    let doneUnits = 0;
    let totalQuizSolved = 0;
    orderedUnitIds.forEach((uid) => {
      if (window.M1A_QUIZ.isUnitDone(uid) === "done") doneUnits++;
      const qs = st.quizSolved[uid] || {};
      totalQuizSolved += ["stage1", "stage2", "stage3"].filter((k) => qs[k]).length;
    });

    const totalQuizzes = orderedUnitIds.length * 3;
    const mistakeKeys = Object.keys(st.mistakes).filter((k) => st.mistakes[k] > 0);

    const bookmarksHtml = st.bookmarks.length
      ? st.bookmarks
          .map((uid) => {
            const u = data.units[uid];
            if (!u) return "";
            return `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border:1px solid var(--border-light);border-radius:10px;background:#fff;">
                <div>
                  <strong>${u.titleZh}</strong>
                  <div style="font-size:0.8rem;color:var(--text-muted);">${u.titleEn}</div>
                </div>
                <button type="button" class="btn btn-primary btn-sm" data-open-unit="${uid}">复习这一讲 →</button>
              </div>
            `;
          })
          .join("")
      : `<p style="color:var(--text-muted);margin:0;">暂无收藏微单元。在任意一讲顶部点击 <strong>“☆ 收藏本讲”</strong>，就会自动出现在这里！</p>`;

    const mistakesHtml = mistakeKeys.length
      ? mistakeKeys
          .map((k) => {
            const [uid, stageKey] = k.split(":");
            const u = data.units[uid];
            if (!u) return "";
            const stageLabel = stageKey === "stage1" ? "Stage 1 直觉题" : stageKey === "stage2" ? "Stage 2 模仿练" : "Stage 3 实战题";
            return `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border:1px solid var(--danger-border);border-radius:10px;background:var(--danger-soft);">
                <div>
                  <strong>${u.titleZh} · ${stageLabel}</strong>
                  <div style="font-size:0.8rem;color:#991b1b;">曾做错 ${st.mistakes[k]} 次 · 建议回去重做一遍巩固！</div>
                </div>
                <button type="button" class="btn btn-outline btn-sm" data-open-unit="${uid}">去重练 →</button>
              </div>
            `;
          })
          .join("")
      : `<p style="color:var(--text-muted);margin:0;">目前错题本干干净净！做错题时系统会自动收录到这里，方便考前精准查漏补缺。</p>`;

    dom.main.innerHTML = `
      <div class="card">
        <div class="card-title-row">
          <div>
            <span class="section-badge" style="background:var(--success-soft);color:var(--success);">Personal Study Dashboard</span>
            <h2 class="section-heading" style="margin-top:6px;">我的 M1A 学习进度与错题复习本</h2>
          </div>
          <button type="button" class="btn btn-outline btn-sm" id="reset-progress-btn">🗑️ 清空本地进度记录</button>
        </div>

        <div class="lab-readout-grid" style="grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));margin-bottom:14px;">
          <div class="lab-metric">
            <div class="lab-metric-label">已掌握微单元</div>
            <div class="lab-metric-val">${doneUnits} / ${orderedUnitIds.length} 讲</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">闯关题过关总数</div>
            <div class="lab-metric-val">${totalQuizSolved} / ${totalQuizzes} 关</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">已收藏重点章节</div>
            <div class="lab-metric-val">${st.bookmarks.length} 讲</div>
          </div>
          <div class="lab-metric">
            <div class="lab-metric-label">待复习错题记录</div>
            <div class="lab-metric-val">${mistakeKeys.length} 题</div>
          </div>
        </div>
        <p style="margin:0;font-size:0.84rem;color:var(--text-muted);">
          💾 所有学习记录均自动保存在当前设备的浏览器本地存储（LocalStorage）中，无需注册账号，随时打开都能接着学。
        </p>
      </div>

      <div class="card">
        <h3 class="section-heading" style="margin-bottom:12px;">⭐ 我收藏的重点单元</h3>
        <div style="display:grid;gap:10px;">${bookmarksHtml}</div>
      </div>

      <div class="card">
        <h3 class="section-heading" style="margin-bottom:12px;">🎯 错题精准回炉本</h3>
        <div style="display:grid;gap:10px;">${mistakesHtml}</div>
      </div>
    `;

    dom.main.querySelectorAll("[data-open-unit]").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo("learn", btn.dataset.openUnit));
    });

    dom.main.querySelector("#reset-progress-btn").addEventListener("click", () => {
      if (window.confirm("确定要清空所有已完成标记、闯关进度、收藏与错题记录吗？")) {
        window.M1A_QUIZ.clearAllProgress();
        updateProgressPill();
        renderNotebook();
      }
    });
  }

  /* ========================================================================
     Master View Dispatcher & Initialization
     ======================================================================== */
  function renderMain() {
    if (state.topView === "learn") {
      if (state.activeUnitId === "overview") renderOverview();
      else renderUnit(state.activeUnitId);
    } else if (state.topView === "map") {
      window.M1A_GRAPH.render(dom.main, (uid) => navigateTo("learn", uid));
    } else if (state.topView === "labs") {
      renderLabsHub();
    } else if (state.topView === "formulas") {
      renderFormulasAndGlossary();
    } else if (state.topView === "notebook") {
      renderNotebook();
    }
  }

  function initFromHash() {
    const h = window.location.hash || "";
    if (h.startsWith("#unit/")) {
      const uid = h.replace("#unit/", "").trim();
      if (window.M1A_DATA.units[uid]) {
        state.topView = "learn";
        state.activeUnitId = uid;
      }
    } else if (["#map", "#labs", "#formulas", "#notebook"].includes(h)) {
      state.topView = h.slice(1);
    }
  }

  dom.navTabs.forEach((btn) => {
    btn.addEventListener("click", () => navigateTo(btn.dataset.topView));
  });

  dom.menuBtn.addEventListener("click", openMobileDrawer);
  dom.backdrop.addEventListener("click", closeMobileDrawer);

  initFromHash();
  updateProgressPill();
  syncNavTabs();
  renderSidebar();
  renderMain();
})();
