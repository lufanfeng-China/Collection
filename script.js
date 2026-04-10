const defaultDashboardData = {
  name: "Collection Optimization Leverage AI/Automation",
  summary:
    "The program is focused on collection workflow optimization, cross-team automation enablement, and rollout readiness. Overall momentum is stable, with the main constraints concentrated around integration bandwidth and stakeholder sign-off.",
  duration: "2026.02.01 - 2026.06.30",
  stage: "Assessment",
  owner: "Heather Sun",
  progress: 20,
  health: {
    score: "-",
    note: "The critical path is moving on plan, but the UAT window is compressed. Key business and testing resources should be locked in early.",
  },
  metrics: [
    { label: "Completed Tasks", value: "124", delta: "+12 this week", tone: "good" },
    { label: "Open Issues", value: "18", delta: "3 high priority", tone: "warn" },
    { label: "Budget Burn", value: "68%", delta: "4% under plan", tone: "good" },
    { label: "Milestones Hit", value: "5/6", delta: "Next gate: Apr 12", tone: "warn" },
  ],
  ranges: [
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "quarter", label: "This Quarter" },
  ],
  trendByRange: {
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      actual: [61, 64, 66, 69, 73, 78],
      planned: [62, 65, 68, 71, 74, 77],
      issues: [12, 14, 16, 11, 9, 8],
    },
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      actual: [42, 54, 67, 78],
      planned: [45, 57, 69, 80],
      issues: [26, 22, 18, 12],
    },
    quarter: {
      labels: ["Feb", "Mar", "Apr"],
      actual: [24, 58, 78],
      planned: [26, 61, 82],
      issues: [31, 21, 12],
    },
  },
  phases: [
    { name: "Scope Alignment", progress: 100, note: "The baseline scope is locked and all changes now require approval." },
    { name: "Solution Design", progress: 100, note: "Architecture review is complete and interface standards are published." },
    { name: "Build Execution", progress: 86, note: "The remaining work is concentrated in reporting and role-permission refinements." },
    { name: "Integration Testing", progress: 62, note: "Cross-system data validation needs additional test windows." },
    { name: "Go-live Readiness", progress: 34, note: "Training materials and rollback playbooks are still being completed." },
  ],
  milestones: [
    { date: "Feb 08", title: "Program Kickoff", detail: "Objectives, roles, and milestone breakdown were aligned across the team.", tone: "good" },
    { date: "Feb 28", title: "Design Sign-off", detail: "Core flows, interfaces, and access-control decisions were frozen.", tone: "good" },
    { date: "Mar 25", title: "Core Feature Test Entry", detail: "Primary workflows entered integration testing, with some edge cases still pending.", tone: "warn" },
    { date: "Apr 12", title: "Business UAT Launch", detail: "Final participant list and schedule confirmation are still needed from business owners.", tone: "warn" },
  ],
  tasks: [
    { title: "Order Flow Integration", owner: "Leo Li", detail: "ERP-to-platform mapping is complete and waiting for finance-side regression.", tone: "good", status: "In Progress" },
    { title: "Access Matrix Review", owner: "Queenie Wang", detail: "Approval paths for two exception roles still need to be completed.", tone: "warn", status: "Pending Review" },
    { title: "Training Package Creation", owner: "Frank Chen", detail: "The user guide draft is ready and the screen-recording script will finish this week.", tone: "good", status: "On Track" },
    { title: "Rollback Rehearsal", owner: "Nina Zhao", detail: "The rehearsal window is still pending confirmation from the infrastructure team.", tone: "danger", status: "At Risk" },
  ],
  risks: [
    { tag: "Resource Risk", title: "Integration windows overlap with month-end operations", detail: "Finance and operations teams may have less availability, which could compress the defect-fix cycle.", tone: "warn" },
    { tag: "Scope Risk", title: "Additional reporting requests are still under discussion", detail: "If the definition is not frozen this week, it may affect UAT scope and training content.", tone: "danger" },
  ],
  actions: [
    { title: "Lock the UAT Calendar", detail: "Confirm business owners, testing representatives, and operations windows within the week.", tone: "good" },
    { title: "Stand Up a Daily Defect Board", detail: "Track high-priority issues separately by owner and blocking severity.", tone: "warn" },
    { title: "Prepare Rollout and Rollback Scripts", detail: "Complete at least one end-to-end rehearsal and document elapsed time before launch.", tone: "danger" },
  ],
  businessStatus: {
    columns: ["Step", "ITSC", "AA", "AB Service", "CD Service", "BJBP+CTC", "HK"],
    rows: [
      ["01 准备与客户主数据", "0.27", "0.01", "0.02", "0.01", "0.01", "0.04"],
      ["02 开票与其他支持材料交付", "10.50", "0.09", "0.22", "0.07", "0.02", "0.12"],
      ["03 对账与争议处理", "2.66", "0.21", "0.52", "0.63", "0.09", "0.21"],
      ["04 催收与承诺管理", "10.60", "0.57", "1.08", "1.10", "0.13", "0.72"],
      ["05 到账与核销", "2.22", "0.19", "0.13", "0.19", "0.09", "0.07"],
      ["06 票据/特殊收款", "0.00", "0.00", "0.00", "0.01", "0.00", "0.14"],
      ["07 升级与法律措施", "0.11", "0.01", "0.01", "0.01", "0.01", "-"],
      ["08 Write-off", "0.12", "0.00", "0.00", "0.01", "0.00", "0.02"],
      ["09 报表与持续改进", "0.72", "0.01", "0.02", "0.03", "0.00", "0.02"],
      ["10 其他", "0.24", "0.00", "0.03", "0.07", "0.02", "0.00"],
    ],
    totals: ["Total FTE", "27.44", "1.09", "2.04", "2.12", "0.38", "1.33"],
  },
};

const statusToneMap = {
  good: "good",
  warn: "warn",
  danger: "danger",
};

const state = {
  range: "month",
  owner: "all",
  presenterMode: false,
  actionSystem: "all",
  actionStep: "all",
  actionStatus: "all",
  actionType: "all",
  actionSort: "status-default",
  processThreshold: 0.1,
};

const actionStatusOrder = {
  待评估: 0,
  评估中: 1,
  待报价: 2,
  待审批: 3,
  已审批: 4,
  取消: 5,
};

let dashboardData = structuredClone(defaultDashboardData);

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setBanner(message, tone = "default") {
  const banner = document.getElementById("status-banner");
  banner.textContent = message;
  banner.classList.toggle("is-success", tone === "success");
}

function formatMetricDelta(metric) {
  return metric.delta;
}

function createStatusPill(text, tone) {
  const pill = document.createElement("span");
  pill.className = "status-pill";
  pill.dataset.tone = statusToneMap[tone] || "warn";
  pill.textContent = text;
  return pill;
}

function renderMetrics(metrics) {
  const grid = document.getElementById("metric-grid");
  grid.innerHTML = "";

  metrics.forEach((metric) => {
    const card = document.createElement("article");
    card.className = "metric-card";
    card.innerHTML = `
      <span class="metric-label">${metric.label}</span>
      <strong class="metric-value">${metric.value}</strong>
      <span class="metric-delta is-${metric.tone}">${formatMetricDelta(metric)}</span>
    `;
    grid.appendChild(card);
  });
}

function formatStructuredLines(text) {
  if (!text) {
    return ["-"];
  }

  const normalized = String(text).replace(/\r/g, "\n").trim();
  const numberedParts = normalized
    .replace(/\n+/g, "\n")
    .split(/(?=(?:^|\n|\s)\d+\.\s)/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (numberedParts.length > 1) {
    return numberedParts;
  }

  const lineParts = normalized
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);

  return lineParts.length ? lineParts : [normalized];
}

function toNumeric(value) {
  if (value === "-" || value === "" || value == null) {
    return 0;
  }

  return Number.parseFloat(value) || 0;
}

function formatFteValue(value) {
  if (value === "-" || value === "" || value == null) {
    return "-";
  }

  const num = Number(value);
  if (!Number.isFinite(num)) {
    return value;
  }

  return num.toFixed(3);
}

function formatCostValue(value) {
  if (value === "-" || value === "" || value == null) {
    return "-";
  }

  const num = Number(value);
  if (!Number.isFinite(num)) {
    return value;
  }

  return `￥${num.toLocaleString("en-US")}`;
}

function formatCompactCurrency(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return "-";
  }

  if (Math.abs(num) >= 1000000) {
    return `￥${(num / 1000000).toFixed(1)}M`;
  }

  if (Math.abs(num) >= 1000) {
    return `￥${(num / 1000).toFixed(0)}K`;
  }

  return `￥${num.toFixed(0)}`;
}

function formatRevenueValue(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return "-";
  }

  return `￥${num.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function buildActionCardMarkup(item, includeStep = false) {
  const remarkLines = formatStructuredLines(item.remark);
  const tone = item.status === "取消" ? "danger" : item.status === "待报价" || item.status === "待审批" ? "warn" : "good";

  return `
    <article class="action-summary-card" data-tone="${tone}">
      <div class="action-card-top">
        <h3>${item.changePoint || "-"}</h3>
        <div class="action-card-tags">
          <span class="action-tag">${item.system || "Unknown System"}</span>
          ${item.type ? `<span class="action-tag">${item.type}</span>` : ""}
          <span class="status-pill" data-tone="${tone}">${item.status || "-"}</span>
        </div>
      </div>
      <div class="meta-row">
        <p class="meta-line"><strong>${includeStep ? "Step" : "Type"}:</strong> ${includeStep ? item.step || "-" : item.type || "-"}</p>
        <p class="meta-line"><strong>FTE:</strong> ${formatFteValue(item.fte)}</p>
        <p class="meta-line"><strong>Cost:</strong> ${formatCostValue(item.cost)}</p>
      </div>
      <div class="action-remark-list">
        ${remarkLines.map((line) => `<p>${line}</p>`).join("")}
      </div>
    </article>
  `;
}

function sortActionItems(items) {
  return [...items].sort((left, right) => {
    if (state.actionSort === "fte-desc") {
      return toNumeric(right.fte) - toNumeric(left.fte);
    }
    if (state.actionSort === "fte-asc") {
      return toNumeric(left.fte) - toNumeric(right.fte);
    }
    if (state.actionSort === "cost-desc") {
      return toNumeric(right.cost) - toNumeric(left.cost);
    }
    if (state.actionSort === "cost-asc") {
      return toNumeric(left.cost) - toNumeric(right.cost);
    }

    const leftRank = actionStatusOrder[left.status] ?? 99;
    const rightRank = actionStatusOrder[right.status] ?? 99;
    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }

    return toNumeric(right.fte) - toNumeric(left.fte);
  });
}

function openActionItemsModal(titleText, items, includeStep = false) {
  const modal = document.getElementById("action-modal");
  const title = document.getElementById("modal-title");
  const grid = document.getElementById("modal-card-grid");
  const sortedItems = sortActionItems(items);

  title.textContent = titleText;
  grid.innerHTML = "";

  if (!sortedItems.length) {
    grid.innerHTML = `
      <article class="overview-panel">
        <strong>No linked action items</strong>
        <p>No matching records were found for the selected step.</p>
      </article>
    `;
    modal.hidden = false;
    return;
  }

  sortedItems.forEach((item) => {
    grid.insertAdjacentHTML("beforeend", buildActionCardMarkup(item, includeStep));
  });

  modal.hidden = false;
}

function renderProcessMap() {
  const container = document.getElementById("process-map");
  const thresholdInput = document.getElementById("process-threshold-input");
  if (!container) {
    return;
  }

  if (thresholdInput) {
    if (document.activeElement !== thresholdInput) {
      thresholdInput.value = Number(state.processThreshold).toFixed(2);
    }

    thresholdInput.onchange = (event) => {
      const normalized = String(event.target.value).trim();
      const nextValue = Number(normalized);
      state.processThreshold = Number.isFinite(nextValue) && nextValue >= 0 ? nextValue : 0;
      renderDashboard();
    };

    thresholdInput.onblur = (event) => {
      const normalized = String(event.target.value).trim();
      const nextValue = Number(normalized);
      state.processThreshold = Number.isFinite(nextValue) && nextValue >= 0 ? nextValue : 0;
      renderDashboard();
    };
  }

  const groups = window.DISCUSSION_SUMMARY?.groups || [];
  const sourceItems = groups.flatMap((group) =>
    (group.items || []).map((item) => ({
      band: item.h || group.h || group.l1 || item.l1 || "",
      step: item.l2 || "",
      total: toNumeric(item.total),
    }))
  );

  const actionItems = window.ACTION_SUMMARY?.items || [];
  const actionStepTotals = new Map();

  actionItems.forEach((item) => {
    const processStep =
      item.processStep ||
      item.stepDetail ||
      item.stepL2 ||
      item.i ||
      item.step ||
      "";
    if (!processStep) {
      return;
    }
    actionStepTotals.set(processStep, (actionStepTotals.get(processStep) || 0) + toNumeric(item.fte));
  });

  const items = [];
  const itemMap = new Map();

  sourceItems.forEach((item) => {
    const bandKey = item.band || "Other";
    const stepKey = item.step || "Undefined";
    const key = `${bandKey}__${stepKey}`;
    if (!itemMap.has(key)) {
      const merged = {
        band: bandKey,
        step: stepKey,
        total: 0,
      };
      itemMap.set(key, merged);
      items.push(merged);
    }
    itemMap.get(key).total += item.total;
  });

  const threshold = Number(state.processThreshold) || 0;
  const filteredItems = items.filter((item) => item.total + Number.EPSILON >= threshold);

  container.innerHTML = "";

  if (!filteredItems.length) {
    container.innerHTML = `
      <article class="overview-panel">
        <strong>No summary rows available</strong>
        <p>The discussion summary workbook did not return any process rows.</p>
      </article>
    `;
    return;
  }

  const maxTotal = Math.max(...filteredItems.map((item) => item.total), 0.001);
  const bandsMeta = [];
  let cursor = 0;
  let currentBand = "";

  filteredItems.forEach((item) => {
    if (item.band !== currentBand) {
      currentBand = item.band;
      bandsMeta.push({
        name: currentBand,
        start: cursor,
        span: 1,
      });
    } else {
      bandsMeta[bandsMeta.length - 1].span += 1;
    }
    cursor += 1;
  });

  const labels = document.createElement("div");
  labels.className = "process-label-row";
  labels.style.gridTemplateColumns = `repeat(${filteredItems.length}, minmax(0, 1fr))`;

  filteredItems.forEach((item) => {
    const label = document.createElement("div");
    label.className = "process-label-slot";
    const text = document.createElement("span");
    text.className = "process-label";
    text.textContent = item.step;
    label.appendChild(text);
    labels.appendChild(label);
  });

  const bands = document.createElement("div");
  bands.className = "process-band-row";
  bands.style.gridTemplateColumns = `repeat(${filteredItems.length}, minmax(0, 1fr))`;

  bandsMeta.forEach((stage, index) => {
    const band = document.createElement("div");
    band.className = "process-band";
    band.style.gridColumn = `${stage.start + 1} / span ${stage.span}`;
    band.dataset.tone = index % 2 === 0 ? "accent" : "soft";
    band.textContent = stage.name;
    bands.appendChild(band);
  });

  const bars = document.createElement("div");
  bars.className = "process-bar-row";
  bars.style.gridTemplateColumns = `repeat(${filteredItems.length}, minmax(0, 1fr))`;

  filteredItems.forEach((item) => {
    const column = document.createElement("div");
    column.className = "process-bar-col";

    const bar = document.createElement("div");
    bar.className = "process-bar";
    const linkedActionFte = actionStepTotals.get(item.step) || 0;
    if (linkedActionFte > 0) {
      bar.classList.add("is-linked");
      bar.tabIndex = 0;
      bar.setAttribute("role", "button");
      bar.setAttribute("aria-label", `${item.step} linked actions`);
      bar.addEventListener("click", () => {
        const matchedItems = actionItems.filter((actionItem) => {
          const processStep =
            actionItem.processStep ||
            actionItem.stepDetail ||
            actionItem.stepL2 ||
            actionItem.i ||
            actionItem.step ||
            "";
          return processStep === item.step;
        });
        openActionItemsModal(`${item.step} Linked Actions`, matchedItems, true);
      });
      bar.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          bar.click();
        }
      });
    }
    bar.style.height = `${Math.max((item.total / maxTotal) * 210, item.total > 0 ? 10 : 2)}px`;

    const value = document.createElement("span");
    value.className = "process-value";
    value.textContent = Number(item.total).toFixed(1);

    column.append(bar, value);
    bars.appendChild(column);
  });

  container.append(labels, bands, bars);
}

function renderBusinessStatus(businessStatus) {
  const table = document.getElementById("business-table");
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");

  thead.innerHTML = `
    <tr>
      ${businessStatus.columns
        .map((column, index) =>
          index === 0
            ? `<th>${column}</th>`
            : `<th><button type="button" class="service-header-button" data-service="${column}">${column}</button></th>`
        )
        .join("")}
    </tr>
  `;

  tbody.innerHTML = businessStatus.rows
    .map((row) => {
      const cells = row.map((cell, index) => {
        if (index === 0) {
          const linkedCount = (window.ACTION_SUMMARY?.items || []).filter((item) => item.step === row[0]).length;
          const countMarkup =
            linkedCount > 0
              ? `<a class="step-action-link" href="#" data-step="${row[0]}">${linkedCount}</a>`
              : "";
          return `<td><div class="step-cell"><span>${cell}</span>${countMarkup}</div></td>`;
        }

        if (index === 1 && cell !== "0.00" && cell !== "-") {
          const href = `./discussion-detail.html?step=${encodeURIComponent(row[0])}&service=ITSC`;
          return `<td><a class="business-link" href="${href}" target="_blank" rel="noreferrer">${cell}</a></td>`;
        }

        return `<td>${cell}</td>`;
      });

      return `
        <tr>
          ${cells.join("")}
        </tr>
      `;
    })
    .join("");

  const totalRow = document.createElement("tr");
  totalRow.className = "total-row";
  totalRow.innerHTML = businessStatus.totals.map((cell) => `<td>${cell}</td>`).join("");
  tbody.appendChild(totalRow);

  const totalFte = businessStatus.totals
    .slice(1)
    .reduce((sum, value) => sum + toNumeric(value), 0);

  const actionItems = window.ACTION_SUMMARY?.items || [];
  const targetFte = totalFte * 0.2;
  const assessmentFte = actionItems
    .filter((item) => item.status === "评估中")
    .reduce((sum, item) => sum + toNumeric(item.fte), 0);
  const approvalFte = actionItems
    .filter((item) => item.status === "待审批")
    .reduce((sum, item) => sum + toNumeric(item.fte), 0);
  const approvedFte = actionItems
    .filter((item) => item.status === "已审批")
    .reduce((sum, item) => sum + toNumeric(item.fte), 0);
  const quoteFte = actionItems
    .filter((item) => item.status === "待报价")
    .reduce((sum, item) => sum + toNumeric(item.fte), 0);
  const fcstFte = assessmentFte + approvalFte + approvedFte + quoteFte;

  setText("business-total-fte", formatFteValue(totalFte));
  setText("business-target-fte", formatFteValue(targetFte));
  setText("business-fcst-fte", formatFteValue(fcstFte));
  setText("business-fcst-assessment", formatFteValue(assessmentFte));
  setText("business-fcst-approval", formatFteValue(approvalFte));
  setText("business-fcst-approved", formatFteValue(approvedFte));
  setText("business-fcst-quote", formatFteValue(quoteFte));

  tbody.querySelectorAll(".step-action-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openActionModal(link.dataset.step);
    });
  });

  thead.querySelectorAll(".service-header-button").forEach((button) => {
    button.addEventListener("click", () => {
      openServiceModal(button.dataset.service, businessStatus);
    });
  });
}

function renderActionFilters(items) {
  const systemSelect = document.getElementById("action-system-filter");
  const stepSelect = document.getElementById("action-step-filter");
  const statusSelect = document.getElementById("action-status-filter");
  const typeSelect = document.getElementById("action-type-filter");
  const sortSelect = document.getElementById("action-sort-filter");
  const systems = ["all", ...new Set(items.map((item) => item.system).filter(Boolean))];
  const steps = ["all", ...new Set(items.map((item) => item.step).filter(Boolean))];
  const statuses = ["all", ...new Set(items.map((item) => item.status).filter(Boolean))];
  const types = ["all", ...new Set(items.map((item) => item.type).filter(Boolean))];

  systemSelect.innerHTML = systems
    .map((system) => `<option value="${system}">${system === "all" ? "All Systems" : system}</option>`)
    .join("");
  stepSelect.innerHTML = steps.map((step) => `<option value="${step}">${step === "all" ? "All Steps" : step}</option>`).join("");
  statusSelect.innerHTML = statuses
    .map((status) => `<option value="${status}">${status === "all" ? "All Statuses" : status}</option>`)
    .join("");
  typeSelect.innerHTML = types
    .map((type) => `<option value="${type}">${type === "all" ? "All Types" : type}</option>`)
    .join("");

  if (!systems.includes(state.actionSystem)) {
    state.actionSystem = "all";
  }
  if (!steps.includes(state.actionStep)) {
    state.actionStep = "all";
  }
  if (!statuses.includes(state.actionStatus)) {
    state.actionStatus = "all";
  }
  if (!types.includes(state.actionType)) {
    state.actionType = "all";
  }

  systemSelect.value = state.actionSystem;
  stepSelect.value = state.actionStep;
  statusSelect.value = state.actionStatus;
  typeSelect.value = state.actionType;
  sortSelect.value = state.actionSort;

  systemSelect.onchange = (event) => {
    state.actionSystem = event.target.value;
    renderDashboard();
  };
  stepSelect.onchange = (event) => {
    state.actionStep = event.target.value;
    renderDashboard();
  };
  statusSelect.onchange = (event) => {
    state.actionStatus = event.target.value;
    renderDashboard();
  };
  typeSelect.onchange = (event) => {
    state.actionType = event.target.value;
    renderDashboard();
  };
  sortSelect.onchange = (event) => {
    state.actionSort = event.target.value;
    renderDashboard();
  };
}

function renderActionCards() {
  const grid = document.getElementById("action-card-grid");
  const items = window.ACTION_SUMMARY?.items || [];
  renderActionFilters(items);

  const filtered = items.filter((item) => {
    const systemMatch = state.actionSystem === "all" || item.system === state.actionSystem;
    const stepMatch = state.actionStep === "all" || item.step === state.actionStep;
    const statusMatch = state.actionStatus === "all" || item.status === state.actionStatus;
    const typeMatch = state.actionType === "all" || item.type === state.actionType;
    return systemMatch && stepMatch && statusMatch && typeMatch;
  });
  const sorted = sortActionItems(filtered);

  grid.innerHTML = "";

  if (!sorted.length) {
      grid.innerHTML = `
        <article class="overview-panel">
        <strong>No matched improvement points</strong>
        <p>Try another system or status filter.</p>
      </article>
    `;
    return;
  }

  sorted.forEach((item) => {
    grid.insertAdjacentHTML("beforeend", buildActionCardMarkup(item));
  });
}

function renderSystemOpportunityView() {
  const grid = document.getElementById("system-summary-grid");
  if (!grid) {
    return;
  }

  const items = window.ACTION_SUMMARY?.items || [];
  const grouped = new Map();

  items.forEach((item) => {
    const key = item.system || "Unknown";
    if (!grouped.has(key)) {
      grouped.set(key, { system: key, fte: 0, cost: 0, itemCount: 0, items: [] });
    }

    const current = grouped.get(key);
    current.fte += toNumeric(item.fte);
    current.cost += toNumeric(item.cost);
    if (item.status !== "取消") {
      current.itemCount += 1;
    }
    current.items.push(item);
  });

  const systems = [...grouped.values()].sort((a, b) => b.fte - a.fte || b.cost - a.cost);
  grid.innerHTML = "";

  if (!systems.length) {
    grid.innerHTML = `
      <article class="overview-panel">
        <strong>No system-level action data</strong>
        <p>The Action sheet did not return any grouped system records.</p>
      </article>
    `;
    return;
  }

  systems.forEach((system) => {
    const share = Math.max(...systems.map((item) => item.fte), 0.001);
    const percent = Math.max((system.fte / share) * 100, system.fte > 0 ? 12 : 4);

    grid.insertAdjacentHTML(
      "beforeend",
      `
        <article class="system-card">
          <div class="system-card-head">
            <h3>${system.system}</h3>
            <a href="#" class="action-tag action-tag-link" data-system="${system.system}">${system.itemCount} actions</a>
          </div>
          <div class="system-metric-row">
            <div>
              <span class="meta-label">FTE</span>
              <strong>${formatFteValue(system.fte)}</strong>
            </div>
            <div>
              <span class="meta-label">Cost</span>
              <strong>${formatCostValue(system.cost)}</strong>
            </div>
          </div>
          <div class="system-bar-track">
            <div class="system-bar-fill" style="width:${percent}%"></div>
          </div>
        </article>
      `
    );
  });

  grid.querySelectorAll(".action-tag-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const systemName = link.dataset.system;
      const matchedItems = items.filter(
        (item) => (item.system || "Unknown") === systemName && item.status !== "取消"
      );
      openActionItemsModal(`${systemName} Actions`, matchedItems, true);
    });
  });
}

function renderThirdPartyOverview() {
  const overview = document.getElementById("third-party-overview");
  const grid = document.getElementById("third-party-card-grid");
  if (!overview || !grid) {
    return;
  }

  const payload = window.THIRD_PARTY_SUMMARY || {};
  const rows = payload.rows || [];
  const totalRow = rows.find((row) => String(row.A).trim().toLowerCase() === "total");
  const platforms = rows.filter((row) => String(row.A).trim().toLowerCase() !== "total");

  overview.innerHTML = "";
  grid.innerHTML = "";

  if (!rows.length) {
    overview.innerHTML = `
      <article class="overview-panel">
        <strong>No 3rd-party platform data</strong>
        <p>The workbook sheet did not return any platform records.</p>
      </article>
    `;
    return;
  }

  if (totalRow) {
    overview.innerHTML = `
      <article class="third-party-total-card">
        <span class="meta-label">Platform Footprint</span>
        <div class="third-party-total-grid">
          <div>
            <span class="meta-label">Platforms</span>
            <strong>${platforms.length}</strong>
          </div>
          <div>
            <span class="meta-label">Customers</span>
            <strong>${Number(totalRow.B || 0).toLocaleString("en-US")}</strong>
          </div>
          <div>
            <span class="meta-label">Transactions</span>
            <strong>${Number(totalRow.C || 0).toLocaleString("en-US")}</strong>
          </div>
          <div>
            <span class="meta-label">Revenue</span>
            <strong>${formatCompactCurrency(totalRow.D)}</strong>
          </div>
          <div>
            <span class="meta-label">FTE</span>
            <strong>${Number(totalRow.E || 0).toFixed(1)}</strong>
          </div>
        </div>
      </article>
    `;
  }

  platforms
    .sort((a, b) => toNumeric(b.D) - toNumeric(a.D))
    .forEach((row) => {
      grid.insertAdjacentHTML(
        "beforeend",
        `
          <article class="third-party-card">
            <div class="third-party-card-head">
              <h3>${row.A || "-"}</h3>
              <span class="action-tag">${Number(row.E || 0).toFixed(1)} FTE</span>
            </div>
            <div class="third-party-card-grid-inner">
              <div>
                <span class="meta-label">Customers</span>
                <strong>${Number(row.B || 0).toLocaleString("en-US")}</strong>
              </div>
              <div>
                <span class="meta-label">Transactions</span>
                <strong>${Number(row.C || 0).toLocaleString("en-US")}</strong>
              </div>
              <div>
                <span class="meta-label">Revenue</span>
                <strong>${formatRevenueValue(row.D)}</strong>
              </div>
              <div>
                <span class="meta-label">One-time Cost</span>
                <strong>${formatCostValue(row.F)}</strong>
              </div>
              <div>
                <span class="meta-label">Ops Cost</span>
                <strong>${formatCostValue(row.G)}</strong>
              </div>
            </div>
          </article>
        `
      );
    });
}

function openActionModal(step) {
  const items = (window.ACTION_SUMMARY?.items || []).filter((item) => item.step === step);
  openActionItemsModal(`${step} Linked Actions`, items, true);
}

function drawServiceChart(service, businessStatus) {
  const canvas = document.getElementById("service-chart");
  const context = canvas.getContext("2d");
  const width = canvas.parentElement.clientWidth - 36;
  const height = 360;
  const dpr = window.devicePixelRatio || 1;
  const serviceIndex = businessStatus.columns.indexOf(service);
  const points = businessStatus.rows.map((row) => ({
    label: row[0].split(" ")[0],
    value: toNumeric(row[serviceIndex]),
  }));
  const maxValue = Math.max(...points.map((item) => item.value), 1);
  const padding = { top: 24, right: 20, bottom: 48, left: 52 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const barWidth = chartWidth / points.length - 10;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);

  context.strokeStyle = "rgba(17,17,17,0.10)";
  context.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (chartHeight / 4) * i;
    context.beginPath();
    context.moveTo(padding.left, y);
    context.lineTo(width - padding.right, y);
    context.stroke();
  }

  points.forEach((point, index) => {
    const x = padding.left + index * (chartWidth / points.length) + 5;
    const barHeight = (point.value / maxValue) * chartHeight;
    const y = padding.top + chartHeight - barHeight;

    context.fillStyle = "#2c8f67";
    context.fillRect(x, y, barWidth, barHeight);

    context.fillStyle = "rgba(17,17,17,0.78)";
    context.font = '12px "Noto Sans SC"';
    context.textAlign = "center";
    context.fillText(point.label, x + barWidth / 2, height - 18);

    context.fillStyle = "#2c8f67";
    context.font = '11px "Space Grotesk"';
    context.fillText(formatFteValue(point.value), x + barWidth / 2, y - 8);
  });
}

function openServiceModal(service, businessStatus) {
  const modal = document.getElementById("service-modal");
  const serviceIndex = businessStatus.columns.indexOf(service);
  const total = businessStatus.rows.reduce((sum, row) => sum + toNumeric(row[serviceIndex]), 0);
  const topStep = businessStatus.rows
    .map((row) => ({ step: row[0], value: toNumeric(row[serviceIndex]) }))
    .sort((a, b) => b.value - a.value)[0];

  setText("service-modal-title", `${service} Step Distribution`);
  setText("service-modal-service", service);
  setText(
    "service-modal-summary",
    `${formatFteValue(total)} total FTE across Step 1â€“10. Highest concentration: ${topStep.step} (${formatFteValue(topStep.value)}).`
  );

  modal.hidden = false;
  requestAnimationFrame(() => drawServiceChart(service, businessStatus));
}

function renderPhases(phases) {
  const list = document.getElementById("phase-list");
  list.innerHTML = "";

  phases.forEach((phase) => {
    const item = document.createElement("article");
    item.className = "phase-item";
    item.innerHTML = `
      <header>
        <h3>${phase.name}</h3>
        <strong>${phase.progress}%</strong>
      </header>
      <div class="phase-bar">
        <div class="phase-fill" style="width: ${phase.progress}%"></div>
      </div>
      <p class="phase-note">${phase.note}</p>
    `;
    list.appendChild(item);
  });
}

function renderTimeline(items) {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  items.forEach((item) => {
    const block = document.createElement("article");
    block.className = "timeline-item";
    block.innerHTML = `
      <header>
        <h3>${item.title}</h3>
        <span class="timeline-date">${item.date}</span>
      </header>
      <p>${item.detail}</p>
    `;
    timeline.appendChild(block);
  });
}

function renderTasks(tasks) {
  const board = document.getElementById("task-board");
  board.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("article");
    item.className = "task-item";

    const header = document.createElement("header");
    const title = document.createElement("h3");
    title.textContent = task.title;
    header.appendChild(title);
    header.appendChild(createStatusPill(task.status, task.tone));

    const owner = document.createElement("span");
    owner.className = "task-owner";
    owner.textContent = task.owner;

    const detail = document.createElement("p");
    detail.textContent = task.detail;

    item.append(header, owner, detail);
    board.appendChild(item);
  });
}

function renderRangeChips(ranges) {
  const container = document.getElementById("range-chips");
  container.innerHTML = "";

  ranges.forEach((range) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip-button${state.range === range.id ? " is-active" : ""}`;
    button.textContent = range.label;
    button.addEventListener("click", () => {
      state.range = range.id;
      renderDashboard();
    });
    container.appendChild(button);
  });
}

function renderOwnerFilter(tasks) {
  const select = document.getElementById("owner-filter");
  const owners = ["all", ...new Set(tasks.map((task) => task.owner))];
  select.innerHTML = "";

  owners.forEach((owner) => {
    const option = document.createElement("option");
    option.value = owner;
    option.textContent = owner === "all" ? "All" : owner;
    select.appendChild(option);
  });

  if (!owners.includes(state.owner)) {
    state.owner = "all";
  }

  select.value = state.owner;
  select.onchange = (event) => {
    state.owner = event.target.value;
    renderDashboard();
  };
}

function getFilteredTasks(tasks) {
  if (state.owner === "all") {
    return tasks;
  }

  return tasks.filter((task) => task.owner === state.owner);
}

function drawTrendChart(data) {
  const canvas = document.getElementById("trend-chart");
  const context = canvas.getContext("2d");
  const parentWidth = canvas.parentElement.clientWidth;
  const height = 280;
  const dpr = window.devicePixelRatio || 1;

  canvas.width = parentWidth * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${parentWidth}px`;
  canvas.style.height = `${height}px`;
  context.scale(dpr, dpr);
  context.clearRect(0, 0, parentWidth, height);

  const padding = { top: 20, right: 18, bottom: 40, left: 32 };
  const chartWidth = parentWidth - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.actual, ...data.planned, ...data.issues);
  const minValue = 0;

  context.strokeStyle = "rgba(17,17,17,0.12)";
  context.lineWidth = 1;

  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (chartHeight / 4) * i;
    context.beginPath();
    context.moveTo(padding.left, y);
    context.lineTo(parentWidth - padding.right, y);
    context.stroke();
  }

  function getX(index) {
    return padding.left + (chartWidth / Math.max(data.labels.length - 1, 1)) * index;
  }

  function getY(value) {
    const ratio = (value - minValue) / (maxValue - minValue || 1);
    return padding.top + chartHeight - ratio * chartHeight;
  }

  function drawSeries(values, color) {
    context.beginPath();
    values.forEach((value, index) => {
      const x = getX(index);
      const y = getY(value);
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.strokeStyle = color;
    context.lineWidth = 3;
    context.stroke();

    values.forEach((value, index) => {
      const x = getX(index);
      const y = getY(value);
      context.beginPath();
      context.arc(x, y, 4, 0, Math.PI * 2);
      context.fillStyle = color;
      context.fill();
    });
  }

  drawSeries(data.planned, "rgba(17, 17, 17, 0.34)");
  drawSeries(data.actual, "#c96a3d");
  drawSeries(data.issues, "#a64036");

  context.fillStyle = "rgba(17,17,17,0.58)";
  context.font = '12px "Noto Sans SC"';
  context.textAlign = "center";
  data.labels.forEach((label, index) => {
    context.fillText(label, getX(index), height - 12);
  });

  const legends = [
    { label: "Planned", color: "rgba(17, 17, 17, 0.34)" },
    { label: "Actual", color: "#c96a3d" },
    { label: "Issues", color: "#a64036" },
  ];

  legends.forEach((item, index) => {
    const x = padding.left + index * 100;
    context.fillStyle = item.color;
    context.fillRect(x, 0, 18, 4);
    context.fillStyle = "rgba(17,17,17,0.72)";
    context.textAlign = "left";
    context.fillText(item.label, x + 24, 8);
  });
}

function renderHighlights(data, tasks) {
  const riskiestPhase = [...data.phases].sort((a, b) => a.progress - b.progress)[0];
  const riskyTask = tasks.find((task) => task.tone === "danger") || tasks[0] || data.tasks[0];
  const delayedGap = data.trendByRange[state.range].planned.at(-1) - data.trendByRange[state.range].actual.at(-1);

  setText("phase-highlight", `${riskiestPhase.name} ${riskiestPhase.progress}%`);
  setText("phase-highlight-note", riskiestPhase.note);
  setText("focus-highlight", riskyTask.title);
  setText("focus-highlight-note", `${riskyTask.owner} owns this item and the current status is "${riskyTask.status}."`);
  setText("pace-highlight", delayedGap <= 2 ? "Tracking Close to Plan" : `${delayedGap}% Behind Plan`);
  setText(
    "pace-highlight-note",
    delayedGap <= 2
      ? "The gap between actual progress and the target line is manageable. Continue compressing high-priority issues."
      : "Add tighter follow-up on critical-path tasks to avoid impact on the next milestone."
  );
}

function renderRiskSection(targetId, items) {
  const container = document.getElementById(targetId);
  container.innerHTML = "";

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = targetId === "action-list" ? "action-item" : "risk-item";

    const header = document.createElement("header");
    const title = document.createElement("h3");
    title.textContent = item.title;
    header.appendChild(title);

    if (item.tag) {
      const tag = document.createElement("span");
      tag.className = "risk-tag";
      tag.textContent = item.tag;
      header.appendChild(tag);
    } else {
      header.appendChild(createStatusPill("Action Item", item.tone));
    }

    const detail = document.createElement("p");
    detail.textContent = item.detail;

    article.append(header, detail);
    container.appendChild(article);
  });
}

function renderDashboard() {
  renderBusinessStatus(dashboardData.businessStatus);
  renderSystemOpportunityView();
  renderThirdPartyOverview();
  renderProcessMap();
  renderActionCards();
}

function validateDashboardData(data) {
  const requiredKeys = ["name", "summary", "duration", "stage", "owner", "progress", "health", "metrics", "ranges", "trendByRange", "phases", "milestones", "tasks", "risks", "actions", "businessStatus"];
  return requiredKeys.every((key) => key in data);
}

function syncRange() {
  const rangeIds = dashboardData.ranges.map((range) => range.id);
  if (!rangeIds.includes(state.range)) {
    state.range = dashboardData.ranges[0]?.id || "month";
  }
}

function exportData() {
  const blob = new Blob([JSON.stringify(dashboardData, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "project-dashboard-data.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

function bindActions() {
  const modal = document.getElementById("action-modal");
  const serviceModal = document.getElementById("service-modal");
  document.getElementById("modal-close").addEventListener("click", () => {
    modal.hidden = true;
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.hidden = true;
    }
  });
  document.getElementById("service-modal-close").addEventListener("click", () => {
    serviceModal.hidden = true;
  });
  serviceModal.addEventListener("click", (event) => {
    if (event.target === serviceModal) {
      serviceModal.hidden = true;
    }
  });
}

function initDashboard(data) {
  setText("project-name", data.name);
  setText("project-summary", data.summary);
  setText("project-duration", data.duration);
  setText("project-stage", data.stage);
  setText("project-owner", data.owner);
  setText("overall-progress", `${data.progress}%`);
  renderDashboard();
}

bindActions();
initDashboard(dashboardData);

