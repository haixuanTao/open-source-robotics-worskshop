/* ============================================================
   Community poll — multi-platform aggregator.
   The site is the single rendering point: people vote on X, Reddit,
   Mastodon, … and the tallies are pooled here. Results come from
   assets/data/poll.json (edited by hand, or rewritten on a schedule
   by a GitHub Action for platforms with an open API, e.g. Mastodon).
   ============================================================ */
(function () {
  "use strict";

  var host = document.getElementById("poll-card");
  if (!host) return;

  function render(data) {
    var qs = (data && data.questions) || [];
    host.innerHTML = "";

    qs.forEach(function (q) {
      var opts = q.options || [];
      var plats = q.platforms || [];
      var totals = opts.map(function (_, i) {
        return plats.reduce(function (s, p) { return s + ((p.votes && p.votes[i]) || 0); }, 0);
      });
      var grand = totals.reduce(function (a, b) { return a + b; }, 0);
      var maxv = Math.max.apply(null, totals.concat([0]));

      var bars = opts.map(function (o, i) {
        var share = grand ? Math.round(totals[i] / grand * 100) : 0;
        var lead = grand > 0 && totals[i] === maxv ? " is-lead" : "";
        return '<div class="poll-bar' + lead + '">' +
            '<div class="poll-bar__top"><span>' + o + "</span>" +
            '<span class="poll-bar__n">' + share + "% · " + totals[i].toLocaleString() + "</span></div>" +
            '<div class="poll-bar__track"><div class="poll-bar__fill" data-w="' + share + '"></div></div>' +
          "</div>";
      }).join("");

      var enabled = plats.filter(function (p) { return p.url; });
      var votes;
      if (enabled.length) {
        votes = '<div class="poll-votes">' + plats.map(function (p) {
          var dis = !p.url;
          return '<a class="poll-vote' + (dis ? " is-disabled" : "") + '"' +
            (dis ? ' aria-disabled="true"' : ' href="' + p.url + '" target="_blank" rel="noopener"') +
            ">Vote on " + p.name + " &#8599;</a>";
        }).join("") + "</div>";
      } else {
        var names = plats.map(function (p) { return p.name; }).join(" · ");
        votes = '<p class="poll__note" style="margin-top:0">Vote links (' + (names || "social") +
          ") appear here once the polls go live.</p>";
      }

      var totalLine = grand
        ? '<p class="poll-total">' + grand.toLocaleString() + " votes pooled across " + enabled.length + " platform" + (enabled.length === 1 ? "" : "s") + "</p>"
        : "";

      var block = document.createElement("div");
      block.className = "poll-q";
      block.innerHTML = '<p class="poll__q">' + q.q + "</p>" +
        '<div class="poll-bars">' + bars + "</div>" + totalLine + votes;
      host.appendChild(block);
    });

    var foot = document.createElement("p");
    foot.className = "poll__note";
    foot.innerHTML = "Results pooled from independent public polls" +
      (data && data.updated ? " · updated " + data.updated : "") +
      ". An informal cross-platform tally, not a scientific survey.";
    host.appendChild(foot);

    requestAnimationFrame(function () {
      host.querySelectorAll(".poll-bar__fill").forEach(function (el) {
        el.style.width = (el.getAttribute("data-w") || 0) + "%";
      });
    });
  }

  function load() {
    fetch("assets/data/poll.json?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(render)
      .catch(function () {
        host.innerHTML = '<p class="poll__note">Community poll is being set up.</p>';
      });
  }

  load();
  setInterval(load, 60000); /* refresh while the page stays open */
})();
