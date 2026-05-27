/* ============================================================
   Charts for the academic "evidence" section.
   Fig 1: hardware cost frontier (Chart.js scatter, filterable)
   Fig 2: cumulative open-data growth (Chart.js stepped line)
   Fig 3: hardware gap, class by class (custom dumbbell + hover)
   All three show per-point detail on hover.
   ============================================================ */
(function () {
  "use strict";

  var C = {
    open:    "#1a7f37",
    partial: "#b07400",
    closed:  "#cf2e3f",
    ink:     "#1f3a5f",
    grid:    "#ece9e1",
    tick:    "#767a82",
    card:    "#ffffff",
    line:    "#d6d2c6"
  };
  var OPEN_LABEL = { open: "Open hardware", partial: "Partly open (open SDK, closed HW)", closed: "Closed / commercial" };
  var f$ = function (v) { return "$" + v.toLocaleString("en-US"); };
  var compact = function (v) {
    if (v >= 1e6) return (v / 1e6).toFixed(v % 1e6 === 0 ? 0 : 1) + "M";
    if (v >= 1e3) return (v / 1e3).toFixed(v % 1e3 === 0 ? 0 : 1) + "k";
    return "" + v;
  };
  var fSize = function (gb) { return gb >= 1000 ? "~" + (gb / 1000).toFixed(gb % 1000 ? 1 : 0) + " TB" : "~" + gb + " GB"; };

  if (typeof Chart !== "undefined") {
    Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = C.tick;
  }

  /* shared cursor feedback for Chart.js point hover */
  var pointerOnHover = function (e, els) {
    if (e.native && e.native.target) e.native.target.style.cursor = els.length ? "pointer" : "default";
  };

  function tooltipStyle(extra) {
    return Object.assign({
      backgroundColor: "#16181d", borderColor: C.line, borderWidth: 1,
      titleColor: "#fff", bodyColor: "#d7d4cc", padding: 12, cornerRadius: 8,
      titleFont: { family: "'Newsreader', serif", size: 14 },
      bodyFont: { size: 12.5 }, bodySpacing: 4, displayColors: false,
      caretSize: 6, intersect: true, mode: "nearest"
    }, extra || {});
  }

  function domainOf(cat) {
    if (/hand/.test(cat)) return "hand";
    if (/quadruped/.test(cat)) return "quadruped";
    if (/humanoid/.test(cat)) return "humanoid";
    if (/drone/.test(cat)) return "drone";
    if (/mobile base/.test(cat)) return "mobile";
    if (/desktop/.test(cat)) return "other"; /* e.g. Reachy Mini — not a humanoid; shows only under "All types" */
    return "arm";
  }

  /* ---------------- Fig 1: cost frontier ---------------- */
  (function () {
    var el = document.getElementById("robotsChart");
    if (!el || !window.ROBOTS || typeof Chart === "undefined") return;

    var rows = window.ROBOTS.map(function (r) {
      return { x: r.x, y: r.cost, name: r.name, maker: r.maker, cat: r.cat, open: r.open, dom: domainOf(r.cat) };
    });
    var order = [["closed", C.closed], ["open", C.open]];

    function build(dom) {
      return order.map(function (g) {
        return {
          label: g[0] === "closed" ? "Closed / commercial" : "Open hardware",
          backgroundColor: g[1] + "cc", borderColor: g[1], borderWidth: 1.2,
          pointRadius: 5, pointHoverRadius: 8, pointHoverBorderWidth: 2,
          data: rows.filter(function (r) { return r.open === g[0] && (dom === "all" || r.dom === dom); })
        };
      });
    }

    var chart = new Chart(el, {
      type: "scatter",
      data: { datasets: build("all") },
      options: {
        responsive: true, maintainAspectRatio: false, onHover: pointerOnHover,
        interaction: { mode: "nearest", intersect: true },
        scales: {
          x: { type: "linear", min: 2004, max: 2027,
               title: { display: true, text: "Release year", color: C.tick },
               ticks: { stepSize: 3, callback: function (v) { return Math.round(v); } },
               grid: { color: C.grid } },
          y: { type: "logarithmic", min: 80, max: 400000,
               title: { display: true, text: "Unit cost — USD, log scale", color: C.tick },
               ticks: { callback: function (v) { return [100, 1000, 10000, 100000].indexOf(v) >= 0 ? f$(v) : ""; } },
               grid: { color: C.grid } }
        },
        plugins: {
          legend: { labels: { usePointStyle: true, pointStyle: "circle", padding: 16, color: "#16181d" } },
          tooltip: tooltipStyle({ callbacks: {
            title: function (i) { return i[0].raw.name; },
            label: function (i) { return f$(i.raw.y) + "  ·  " + Math.floor(i.raw.x); },
            afterLabel: function (i) { return [i.raw.maker, i.raw.cat, OPEN_LABEL[i.raw.open]]; }
          } })
        }
      }
    });

    var box = document.getElementById("robotFilters");
    if (box) {
      [["all", "All types"], ["arm", "Arms"], ["quadruped", "Quadrupeds"], ["humanoid", "Humanoids"],
       ["hand", "Hands"], ["drone", "Drones"], ["mobile", "Mobile bases"]].forEach(function (f, idx) {
        var b = document.createElement("button");
        b.className = "filter-btn" + (idx === 0 ? " active" : "");
        b.textContent = f[1];
        b.addEventListener("click", function () {
          box.querySelectorAll(".filter-btn").forEach(function (x) { x.classList.remove("active"); });
          b.classList.add("active");
          chart.data.datasets = build(f[0]);
          chart.update();
        });
        box.appendChild(b);
      });
    }
  })();

  /* ---------------- Fig 2: cumulative open-data growth ---------------- */
  (function () {
    var el = document.getElementById("datasetsGrowthChart");
    if (!el || !window.DATASETS || typeof Chart === "undefined") return;

    var seq = window.DATASETS
      .filter(function (d) { return d.method !== "Aggregated"; })
      .slice().sort(function (a, b) { return a.x - b.x; });
    var cum = 0;
    var line = seq.map(function (d) { cum += d.ep; return { x: d.x, y: cum, name: d.name, add: d.ep, method: d.method, sizeGB: d.sizeGB }; });

    new Chart(el, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Cumulative open demonstrations",
            data: line, stepped: true, borderColor: C.ink, borderWidth: 2,
            backgroundColor: "rgba(31,58,95,.08)", fill: true,
            pointBackgroundColor: C.ink, pointRadius: 3, pointHoverRadius: 6, tension: 0
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false, onHover: pointerOnHover,
        interaction: { mode: "nearest", intersect: true },
        scales: {
          x: { type: "linear", min: 2019, max: 2026.3,
               title: { display: true, text: "Release date", color: C.tick },
               ticks: { stepSize: 1, callback: function (v) { return Math.round(v); } },
               grid: { color: C.grid } },
          y: { type: "linear", min: 0,
               title: { display: true, text: "Cumulative episodes / trajectories", color: C.tick },
               ticks: { callback: function (v) { return compact(v); } },
               grid: { color: C.grid } }
        },
        plugins: {
          legend: { labels: { usePointStyle: true, pointStyle: "circle", padding: 16, color: "#16181d", boxHeight: 7 } },
          tooltip: tooltipStyle({ callbacks: {
            title: function (i) { return i[0].raw.name; },
            label: function (i) {
              var r = i.raw, out;
              if (r.add !== undefined) {
                out = ["+" + Number(r.add).toLocaleString() + " episodes", "cumulative: " + Number(r.y).toLocaleString(), r.method];
              } else {
                out = ["~" + Number(r.y).toLocaleString() + " episodes", r.note];
              }
              if (r.sizeGB) out.push("size: " + fSize(r.sizeGB));
              return out;
            }
          } })
        }
      }
    });
  })();

  /* ---------------- Fig 3: where open wins — capability × price ---------------- */
  (function () {
    var el = document.getElementById("gapChart");
    if (!el || !window.GAP || typeof Chart === "undefined") return;

    var wins = window.GAP.filter(function (d) { return d.arm; });

    /* one open + one closed point per class at the SAME DOF → vertical gap link */
    var pairs = wins.map(function (d) {
      return [
        { x: d.oDof, y: d.open,   name: d.oN, dof: d.oDof, cls: d.cls, kind: "open" },
        { x: d.cDof, y: d.closed, name: d.cN, dof: d.cDof, cls: d.cls, kind: "closed" }
      ];
    });
    var all = pairs.reduce(function (a, p) { return a.concat(p); }, []);

    var openData = all.filter(function (p) { return p.kind === "open"; });
    var closedData = all.filter(function (p) { return p.kind === "closed"; });

    var fmtGap = function (v) { return v >= 1000 ? "$" + (v / 1000).toFixed(v % 1000 ? 1 : 0) + "k" : "$" + v; };
    var connectors = {
      id: "gapConnectors",
      beforeDatasetsDraw: function (chart) {
        var ctx = chart.ctx, xs = chart.scales.x, ys = chart.scales.y;
        ctx.save();
        pairs.forEach(function (pr) {
          var px = xs.getPixelForValue(pr[0].x);
          var oy = ys.getPixelForValue(pr[0].y), cy = ys.getPixelForValue(pr[1].y);
          /* dashed gap line */
          ctx.strokeStyle = "rgba(118,122,130,.5)";
          ctx.setLineDash([4, 3]);
          ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, cy); ctx.stroke();
          /* dollar gap, left of the line at its midpoint */
          ctx.setLineDash([]);
          ctx.fillStyle = C.open;
          ctx.font = "600 11.5px 'Inter', sans-serif";
          ctx.textAlign = "right"; ctx.textBaseline = "middle";
          ctx.fillText(fmtGap(pr[1].y - pr[0].y) + " cheaper", px - 10, (oy + cy) / 2);
        });
        ctx.restore();
      }
    };

    var labels = {
      id: "gapLabels",
      afterDatasetsDraw: function (chart) {
        var ctx = chart.ctx, xs = chart.scales.x, ys = chart.scales.y, area = chart.chartArea;
        ctx.save();
        ctx.font = "600 11px 'Inter', sans-serif";
        ctx.textBaseline = "middle";
        all.forEach(function (p) {
          var px = xs.getPixelForValue(p.x), py = ys.getPixelForValue(p.y);
          ctx.fillStyle = p.kind === "open" ? C.open : C.closed;
          var tw = ctx.measureText(p.name).width;
          if (px + 11 + tw < area.right) { ctx.textAlign = "left"; ctx.fillText(p.name, px + 10, py); }
          else { ctx.textAlign = "right"; ctx.fillText(p.name, px - 10, py); }
        });
        ctx.restore();
      }
    };

    new Chart(el, {
      type: "scatter",
      data: {
        datasets: [
          { label: "Closed / commercial", data: closedData, backgroundColor: C.closed + "cc", borderColor: C.closed, borderWidth: 1.2, pointRadius: 6, pointHoverRadius: 9 },
          { label: "Open hardware", data: openData, backgroundColor: C.open + "cc", borderColor: C.open, borderWidth: 1.2, pointRadius: 6, pointHoverRadius: 9 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false, onHover: pointerOnHover,
        interaction: { mode: "nearest", intersect: true },
        layout: { padding: { right: 104, top: 8 } },
        scales: {
          x: {
            type: "linear", min: 4.5, max: 7.5,
            title: { display: true, text: "Degrees of freedom", color: C.tick },
            afterBuildTicks: function (axis) { axis.ticks = [5, 6, 7].map(function (v) { return { value: v }; }); },
            ticks: { callback: function (v) { return v + " DOF"; } },
            grid: { color: C.grid }
          },
          y: {
            type: "logarithmic", min: 90, max: 15000,
            title: { display: true, text: "Price — USD, log scale", color: C.tick },
            ticks: { callback: function (v) { return [100, 1000, 10000].indexOf(v) >= 0 ? f$(v) : ""; } },
            grid: { color: C.grid }
          }
        },
        plugins: {
          legend: { labels: { usePointStyle: true, pointStyle: "circle", padding: 16, color: "#16181d" } },
          tooltip: tooltipStyle({ callbacks: {
            title: function (i) { return i[0].raw.name; },
            label: function (i) { return f$(i.raw.y) + "  ·  " + i.raw.dof + " DOF"; },
            afterLabel: function (i) { return i.raw.cls + " · " + (i.raw.kind === "open" ? "Open hardware" : "Closed / commercial"); }
          } })
        }
      },
      plugins: [connectors, labels]
    });
  })();
})();
