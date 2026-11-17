/* ==========================================================================
   Interactive Concept Relationship Map Component (全书知识关系图谱组件)
   Visualizes prerequisites, cross-chapter derivations & M1B extension bridge
   ========================================================================== */

window.M1A_GRAPH = (function () {
  function getNodeCenter(node) {
    return { x: node.x + node.w / 2, y: node.y + node.h / 2 };
  }

  function render(container, onNavigateUnit) {
    const data = window.M1A_DATA;
    const nodesById = {};
    data.graphNodes.forEach((n) => (nodesById[n.id] = n));

    let selectedId = "ch7"; // Default highlight the famous Ch.5 <-> Ch.7 closure!

    function drawView() {
      const selectedNode = nodesById[selectedId];
      const relatedEdges = data.graphEdges.filter(
        (e) => e.from === selectedId || e.to === selectedId
      );

      const edgesSvg = data.graphEdges
        .map((edge, idx) => {
          const from = nodesById[edge.from];
          const to = nodesById[edge.to];
          if (!from || !to) return "";
          const c1 = getNodeCenter(from);
          const c2 = getNodeCenter(to);

          // Compute clean edge anchor offsets on box perimeter
          const dx = c2.x - c1.x;
          const dy = c2.y - c1.y;
          const angle = Math.atan2(dy, dx);
          const x1 = c1.x + Math.cos(angle) * (from.w * 0.48);
          const y1 = c1.y + Math.sin(angle) * (from.h * 0.5);
          const x2 = c2.x - Math.cos(angle) * (to.w * 0.52);
          const y2 = c2.y - Math.sin(angle) * (to.h * 0.54);

          const isHighlighted = edge.from === selectedId || edge.to === selectedId;
          const stroke = isHighlighted ? "#b45309" : edge.dashed ? "#94a3b8" : "#64748b";
          const sw = isHighlighted ? 3 : 1.8;
          const dash = edge.dashed ? 'stroke-dasharray="6 5"' : "";
          const marker = isHighlighted ? "url(#arrow-highlight)" : "url(#arrow-normal)";

          // Slight curve for long cross-links so lines never collide with cards
          let pathD;
          if (edge.from === "ch4" && edge.to === "ch6") {
            const sx = from.x + 28, sy = from.y + from.h;
            const ex = to.x + to.w - 28, ey = to.y + to.h;
            pathD = `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${(sx + ex) / 2} ${(sy + 68).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
          } else {
            const mx = (x1 + x2) / 2 + (edge.from === "ch2" && edge.to === "ch4" ? 36 : 0);
            const my = (y1 + y2) / 2 + (edge.from === "ch5" && edge.to === "ch7" ? 0 : -12);
            pathD = `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
          }

          return `
            <g class="graph-edge" data-edge-idx="${idx}">
              <path d="${pathD}"
                    fill="none" stroke="${stroke}" stroke-width="${sw}" ${dash} marker-end="${marker}" opacity="${isHighlighted ? 1 : 0.72}" />
            </g>
          `;
        })
        .join("");

      const nodesSvg = data.graphNodes
        .map((node) => {
          const isSelected = node.id === selectedId;
          const isM1B = node.id.startsWith("m1b_");
          return `
            <g class="graph-node" data-node-id="${node.id}" transform="translate(${node.x}, ${node.y})">
              <rect width="${node.w}" height="${node.h}" rx="12" ry="12"
                    fill="${node.bg}"
                    stroke="${isSelected ? "#b45309" : node.color}"
                    stroke-width="${isSelected ? 3.5 : 1.8}"
                    ${isM1B ? 'stroke-dasharray="5 4"' : ""} />
              <text x="14" y="23" font-size="11" font-weight="800" fill="${node.color}">${node.badge}</text>
              <text x="14" y="45" font-size="15.5" font-weight="800" fill="#0f172a">${node.titleZh}</text>
              <text x="14" y="64" font-size="11.5" font-weight="600" fill="#475569">${node.titleEn}</text>
              ${node.firstUnit
                ? `<text x="${node.w - 12}" y="${node.h - 11}" text-anchor="end" font-size="11" font-weight="700" fill="${node.color}">点击查关联 →</text>`
                : `<text x="${node.w - 12}" y="${node.h - 11}" text-anchor="end" font-size="10.5" font-weight="600" fill="#64748b">下册预留接口</text>`}
            </g>
          `;
        })
        .join("");

      container.innerHTML = `
        <div class="card">
          <div class="card-title-row">
            <div>
              <span class="section-badge" style="background: var(--oxford-navy-soft); color: var(--oxford-navy);">M1A 知识全景地图</span>
              <h2 class="section-heading" style="margin-top: 6px;">牛津 M1A 全书知识点关系拓扑图（点击任意章节卡片查看脉络）</h2>
            </div>
          </div>
          <p style="margin-top:0;color:var(--text-secondary);font-size:0.93rem;">
            很多同学学微积分会觉得“章节零散、公式太多”，其实 M1A 是一条逻辑极其严密的<strong>链条</strong>：从第 1 章组合展式导出第 2 章的 $e$；从第 3–4 章学会算斜率变化，再到第 5 章看懂图像凹凸拐点，最后在第 6–7 章把变化“倒放累积”算面积，并用第 5 章的 $f''(x)$ 反过来检验梯形估算误差！
          </p>

          <div class="graph-wrapper">
            <svg class="graph-svg" viewBox="0 0 980 615" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Oxford M1A 知识关系图谱">
              <defs>
                <marker id="arrow-normal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
                <marker id="arrow-highlight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#b45309" />
                </marker>
              </defs>
              ${edgesSvg}
              ${nodesSvg}
            </svg>
          </div>

          <div class="graph-detail-panel" id="graph-detail-panel">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
              <div>
                <span class="section-badge" style="background:#fff;color:${selectedNode.color};border:1px solid ${selectedNode.color};">${selectedNode.badge}</span>
                <h3 style="margin:8px 0 4px;font-size:1.2rem;color:var(--oxford-navy);">${selectedNode.titleZh}（${selectedNode.titleEn}）</h3>
                <p style="margin:0 0 10px;color:var(--text-secondary);">${selectedNode.role}</p>
              </div>
              ${selectedNode.firstUnit
                ? `<button type="button" class="btn btn-primary" id="graph-goto-btn">📖 进入 ${selectedNode.titleZh} 第一讲 (${selectedNode.firstUnit})</button>`
                : ""}
            </div>
            <div class="formula-math-box" style="margin:8px 0 14px;text-align:left;">
              <strong>代表核心公式：</strong> ${selectedNode.keyFormula}
            </div>
            <h4 style="margin:0 0 8px;color:var(--oxford-navy);">🔗 与其他章节的逻辑连线（${relatedEdges.length} 条）：</h4>
            <div style="display:grid;gap:8px;">
              ${relatedEdges
                .map((e) => {
                  const isOut = e.from === selectedId;
                  const peer = nodesById[isOut ? e.to : e.from];
                  return `
                    <div style="background:#fff;padding:10px 14px;border-radius:8px;border:1px solid var(--border-light);font-size:0.9rem;">
                      <strong>${isOut ? "➡️ 输送给" : "⬅️ 来源于"}【${peer.titleZh}】</strong> ·
                      <span style="color:var(--amber);font-weight:700;">${e.label}</span>
                      <div style="color:var(--text-secondary);margin-top:4px;">${e.desc}</div>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        </div>

        <div class="card" style="background:var(--m1b-soft);border-style:dashed;">
          <div class="card-title-row">
            <div>
              <span class="section-badge" style="background:#fff;color:var(--m1b-color);">M1B Extension Ready</span>
              <h3 class="section-heading" style="margin-top:6px;">${data.m1bPreview.title}</h3>
            </div>
          </div>
          <p style="color:var(--text-secondary);font-size:0.92rem;">${data.m1bPreview.description}</p>
          <div class="overview-grid" style="margin-bottom:0;">
            ${data.m1bPreview.plannedChapters
              .map(
                (ch) => `
              <div style="background:#fff;border:1px solid var(--border-light);border-radius:10px;padding:14px;">
                <strong style="color:var(--oxford-navy);">${ch.code} · ${ch.zh}</strong>
                <div style="font-size:0.8rem;color:var(--text-muted);margin:2px 0 6px;">${ch.en}</div>
                <div style="font-size:0.82rem;color:var(--amber);font-weight:600;">${ch.linkFrom}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;

      container.querySelectorAll(".graph-node").forEach((el) => {
        el.addEventListener("click", () => {
          selectedId = el.dataset.nodeId;
          drawView();
        });
      });

      const gotoBtn = container.querySelector("#graph-goto-btn");
      if (gotoBtn && selectedNode.firstUnit && onNavigateUnit) {
        gotoBtn.addEventListener("click", () => onNavigateUnit(selectedNode.firstUnit));
      }

      if (window.renderMathInElementSafe) window.renderMathInElementSafe(container);
    }

    drawView();
  }

  return { render };
})();
