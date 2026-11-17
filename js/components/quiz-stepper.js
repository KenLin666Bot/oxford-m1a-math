/* ==========================================================================
   3-Stage Progressive Practice & Local Mastery Tracker
   ========================================================================== */

window.M1A_QUIZ = (function () {
  const STORAGE_KEY = "oxford_m1a_study_progress_v1";

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          quizSolved: parsed.quizSolved || {},
          completedUnits: parsed.completedUnits || [],
          bookmarks: parsed.bookmarks || [],
          mistakes: parsed.mistakes || {}
        };
      }
    } catch (e) {
      // Fallback if localStorage is blocked
    }
    return { quizSolved: {}, completedUnits: [], bookmarks: [], mistakes: {} };
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Ignore storage quota errors
    }
  }

  function normalizeAns(str) {
    return String(str || "")
      .trim()
      .toLowerCase()
      .replace(/\$|hk\$|rmb/gi, "")
      .replace(/\s+/g, "");
  }

  function isUnitDone(unitId) {
    const st = loadState();
    if (st.completedUnits.includes(unitId)) return "done";
    const qs = st.quizSolved[unitId];
    if (!qs) return "none";
    const count = [qs.stage1, qs.stage2, qs.stage3].filter(Boolean).length;
    if (count === 3) return "done";
    if (count > 0) return "partial";
    return "none";
  }

  function toggleBookmark(unitId) {
    const st = loadState();
    const idx = st.bookmarks.indexOf(unitId);
    if (idx >= 0) st.bookmarks.splice(idx, 1);
    else st.bookmarks.push(unitId);
    saveState(st);
    return idx < 0;
  }

  function toggleCompleted(unitId) {
    const st = loadState();
    const idx = st.completedUnits.indexOf(unitId);
    if (idx >= 0) st.completedUnits.splice(idx, 1);
    else st.completedUnits.push(unitId);
    saveState(st);
    return idx < 0;
  }

  function markStageSolved(unitId, stageKey) {
    const st = loadState();
    st.quizSolved[unitId] = st.quizSolved[unitId] || {};
    st.quizSolved[unitId][stageKey] = true;
    saveState(st);
  }

  function recordMistake(unitId, stageKey) {
    const st = loadState();
    const k = `${unitId}:${stageKey}`;
    st.mistakes[k] = (st.mistakes[k] || 0) + 1;
    saveState(st);
  }

  function clearAllProgress() {
    saveState({ quizSolved: {}, completedUnits: [], bookmarks: [], mistakes: {} });
  }

  function renderStepper(container, unit, onProgressChanged) {
    let activeStage = "stage1";
    let showZh = false;
    let hintStep = 0;
    let showSolution = false;
    let lastAttempt = null; // { ok: bool, msg: string, chosenIdx?: number }

    const stages = [
      { key: "stage1", kicker: "Stage 1 · 零负担起跳", label: unit.quiz.stage1.title },
      { key: "stage2", kicker: "Stage 2 · 紧扣例题模仿", label: unit.quiz.stage2.title },
      { key: "stage3", kicker: "Stage 3 · 英文实战过关", label: unit.quiz.stage3.title }
    ];

    function render() {
      const st = loadState();
      const solvedMap = st.quizSolved[unit.id] || {};
      const q = unit.quiz[activeStage];
      const letters = ["A", "B", "C", "D"];

      const stageTabsHtml = stages
        .map((s) => {
          const isSolved = Boolean(solvedMap[s.key]);
          return `
            <button type="button" class="quiz-stage-btn ${activeStage === s.key ? "active" : ""} ${isSolved ? "solved" : ""}" data-stage="${s.key}">
              <div class="quiz-stage-kicker">
                <span>${s.kicker}</span>
                <span>${isSolved ? "✅ 已过关" : "○ 待闯关"}</span>
              </div>
              <div class="quiz-stage-name">${s.label}</div>
            </button>
          `;
        })
        .join("");

      let interactionHtml = "";
      if (activeStage === "stage1" || q.type === "mcq") {
        interactionHtml = `
          <div class="quiz-options">
            ${q.options
              .map((opt, idx) => {
                let cls = "quiz-option-btn";
                if (lastAttempt) {
                  if (idx === q.correctIndex && (lastAttempt.ok || lastAttempt.chosenIdx !== undefined)) {
                    if (lastAttempt.ok) cls += " correct";
                  }
                  if (!lastAttempt.ok && lastAttempt.chosenIdx === idx) cls += " wrong";
                }
                return `
                  <button type="button" class="${cls}" data-opt-idx="${idx}">
                    <span class="quiz-option-letter">${letters[idx]}</span>
                    <span>${opt}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        `;
      } else {
        interactionHtml = `
          <div class="quiz-input-row">
            <input type="text" class="quiz-text-input" id="quiz-answer-input" placeholder="${q.inputPlaceholder || "输入答案"}" autocomplete="off" />
            <button type="button" class="btn btn-primary" id="quiz-submit-input">提交核对</button>
          </div>
        `;
      }

      const hintsList = q.hints || [];
      const shownHintsHtml =
        hintStep > 0 && hintsList.length > 0
          ? hintsList
              .slice(0, hintStep)
              .map((h) => `<div class="quiz-hint-card">${h}</div>`)
              .join("")
          : "";

      const feedbackHtml = lastAttempt
        ? `<div class="quiz-feedback ${lastAttempt.ok ? "success" : "error"}">${lastAttempt.msg}</div>`
        : "";

      const solutionHtml =
        showSolution && q.solutionHtml
          ? `<div class="quiz-solution-box">
               <div style="font-weight:800;color:var(--oxford-navy);margin-bottom:6px;">📘 课本标准英文作答步骤 (Standard Solution)</div>
               ${q.solutionHtml}
             </div>`
          : "";

      container.innerHTML = `
        <div class="card">
          <div class="card-title-row">
            <div>
              <span class="section-badge" style="background: var(--amber-soft); color: var(--amber);">Step 5 · 循序渐进闯关提问</span>
              <h3 class="section-heading" style="margin-top:6px;">三阶梯练习：直觉 $\\to$ 模仿 $\\to$ 英文实战</h3>
            </div>
          </div>

          <div class="quiz-stage-tabs">${stageTabsHtml}</div>

          <div class="quiz-panel">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
              <span style="font-size:0.82rem;font-weight:800;color:var(--oxford-navy);">ENGLISH QUESTION PROMPT</span>
              <button type="button" class="btn btn-outline btn-sm" id="quiz-toggle-zh">
                ${showZh ? "隐藏中文审题辅助" : "🇨🇳 查看中文审题翻译"}
              </button>
            </div>

            <div class="quiz-prompt-en">${q.promptEn}</div>
            ${showZh ? `<div class="quiz-zh-box"><strong>中文审题：</strong>${q.promptZh}</div>` : ""}

            ${interactionHtml}

            <div class="quiz-toolbar">
              ${hintsList.length > 0 && hintStep < hintsList.length
                ? `<button type="button" class="btn btn-outline btn-sm" id="quiz-next-hint">💡 给我一步提示 (${hintStep}/${hintsList.length})</button>`
                : ""}
              ${q.solutionHtml
                ? `<button type="button" class="btn btn-outline btn-sm" id="quiz-toggle-sol">${showSolution ? "收起标准解答" : "📘 查看完整英文标准解答"}</button>`
                : ""}
              ${activeStage !== "stage3" && lastAttempt && lastAttempt.ok
                ? `<button type="button" class="btn btn-amber btn-sm" id="quiz-next-stage">下一阶挑战 →</button>`
                : ""}
            </div>

            ${shownHintsHtml}
            ${feedbackHtml}
            ${solutionHtml}
          </div>
        </div>
      `;

      // Bind stage switching
      container.querySelectorAll(".quiz-stage-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeStage = btn.dataset.stage;
          hintStep = 0;
          showSolution = false;
          lastAttempt = null;
          render();
        });
      });

      container.querySelector("#quiz-toggle-zh").addEventListener("click", () => {
        showZh = !showZh;
        render();
      });

      const hintBtn = container.querySelector("#quiz-next-hint");
      if (hintBtn) {
        hintBtn.addEventListener("click", () => {
          hintStep = Math.min(hintStep + 1, hintsList.length);
          render();
        });
      }

      const solBtn = container.querySelector("#quiz-toggle-sol");
      if (solBtn) {
        solBtn.addEventListener("click", () => {
          showSolution = !showSolution;
          render();
        });
      }

      const nextStageBtn = container.querySelector("#quiz-next-stage");
      if (nextStageBtn) {
        nextStageBtn.addEventListener("click", () => {
          activeStage = activeStage === "stage1" ? "stage2" : "stage3";
          hintStep = 0;
          showSolution = false;
          lastAttempt = null;
          render();
        });
      }

      // MCQ click handler
      container.querySelectorAll(".quiz-option-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const chosen = Number(btn.dataset.optIdx);
          const ok = chosen === q.correctIndex;
          if (ok) {
            markStageSolved(unit.id, activeStage);
            lastAttempt = {
              ok: true,
              chosenIdx: chosen,
              msg: q.feedbackCorrect || "🎉 答对啦！思维非常清晰，已为你记录本阶过关！"
            };
            if (q.solutionHtml) showSolution = true;
          } else {
            recordMistake(unit.id, activeStage);
            lastAttempt = {
              ok: false,
              chosenIdx: chosen,
              msg: q.feedbackWrong || "差一点点！点上方 💡 提示再检查一遍符号与条件，或者再试一次！"
            };
          }
          render();
          if (onProgressChanged) onProgressChanged();
        });
      });

      // Input submit handler
      const inputEl = container.querySelector("#quiz-answer-input");
      const submitBtn = container.querySelector("#quiz-submit-input");
      if (inputEl && submitBtn) {
        const handleInputCheck = () => {
          const val = normalizeAns(inputEl.value);
          if (!val) return;
          const accepted = (q.acceptedAnswers || []).map(normalizeAns);
          const ok = accepted.includes(val);
          if (ok) {
            markStageSolved(unit.id, activeStage);
            showSolution = true;
            lastAttempt = {
              ok: true,
              msg: "🎉 精确命中！已自动展开课本标准步骤，记得对照看看自己书写过程是否也能拿满步骤分！"
            };
          } else {
            recordMistake(unit.id, activeStage);
            lastAttempt = {
              ok: false,
              msg: "结果还不太对哦！检查一下正负号、分数约分或小数有效数字位数，点 💡 提示看看卡在哪一步。"
            };
          }
          render();
          if (onProgressChanged) onProgressChanged();
        };
        submitBtn.addEventListener("click", handleInputCheck);
        inputEl.addEventListener("keydown", (e) => {
          if (e.key === "Enter") handleInputCheck();
        });
      }

      if (window.renderMathInElementSafe) window.renderMathInElementSafe(container);
    }

    render();
  }

  return {
    loadState,
    isUnitDone,
    toggleBookmark,
    toggleCompleted,
    clearAllProgress,
    renderStepper
  };
})();
