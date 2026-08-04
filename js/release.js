const owner = "Hammad-hab";
const repo = "Vantum";
const container = document.getElementById("releases");

function formatBytes(bytes){
  if(!bytes) return "";
  const units = ["B","KB","MB","GB"];
  let i = 0, n = bytes;
  while(n >= 1024 && i < units.length - 1){ n /= 1024; i++; }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

function relativeTime(dateStr){
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const day = 86400000;
  const days = Math.floor(diffMs / day);
  if(days < 1) return "today";
  if(days === 1) return "yesterday";
  if(days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if(months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

function renderError(message){
  container.className = "state";
  container.innerHTML = `
    <div class="error-box">
      <div class="head">✕ Couldn't load releases</div>
      <p>${message} Make sure the repository exists and is public, then try again.</p>
      <button class="retry-btn" id="retryBtn">Retry</button>
    </div>
  `;
  document.getElementById("retryBtn").addEventListener("click", loadReleases);
}

async function loadReleases(){
  container.className = "state";
  container.innerHTML = `
    <div class="skeleton-item">
      <div class="skeleton-dot"></div>
      <div class="skeleton-body">
        <div class="skel-line w1"></div>
        <div class="skel-line w2"></div>
        <div class="skel-line w3"></div>
      </div>
    </div>
  `;

  try{
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`);

    if(!response.ok){
      throw new Error(`GitHub returned HTTP ${response.status}.`);
    }

    const releases = await response.json();

    if(!Array.isArray(releases) || releases.length === 0){
      container.className = "state";
      container.innerHTML = `<p class="empty">No releases have been published yet.</p>`;
      return;
    }

    const timeline = document.createElement("div");
    timeline.className = "timeline";

    releases.forEach((release, idx) => {
      const entry = document.createElement("div");
      entry.className = "entry" + (idx === 0 ? " latest" : "");

      const assetsHtml = release.assets && release.assets.length
        ? `<div class="assets">${
            release.assets.map(asset => `
              <a class="asset" href="${asset.browser_download_url}" target="_blank" rel="noopener">
                ⬇ ${asset.name}${asset.size ? `<span class="size">${formatBytes(asset.size)}</span>` : ""}
              </a>
            `).join("")
          }</div>`
        : `<div class="no-assets">No downloadable assets for this release.</div>`;

      entry.innerHTML = `
        <div class="node"></div>
        <div class="entry-head">
          ${assetsHtml}
          <span class="tag">${release.tag_name || "untagged"}</span>
          ${idx === 0 ? `<span class="latest-pill">Latest</span>` : ""}
          ${release.name && release.name !== release.tag_name ? `<span class="rname">${release.name}</span>` : ""}
        </div>
        <div class="date">
          ${release.published_at ? `${relativeTime(release.published_at)} · ${new Date(release.published_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}` : "Unpublished draft"}
        </div>
        <div class="panel">
          <div class="markdown">${marked.parse(release.body || "_No release notes provided._")}</div>
        </div>
      `;

      timeline.appendChild(entry);
    });

    container.className = "";
    container.innerHTML = "";
    container.appendChild(timeline);

  }catch(err){
    renderError(err.message || "Something went wrong while fetching releases.");
    console.error(err);
  }
}

loadReleases();