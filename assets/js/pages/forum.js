// assets/js/pages/forum.js
// Integrasi widget diskusi umum GitHub Discussions melalui Giscus

import { getCurrentTheme } from "../app.js";
import { ProgressStore } from "../progress-store.js";

function initGiscusForum() {
  const container = document.getElementById("giscus-forum-container");
  if (!container) return;
  container.innerHTML = "";

  ProgressStore.unlockAchievement("community-voice");

  const resolvedTheme = document.documentElement.getAttribute("data-theme") || getCurrentTheme();
  const giscusTheme = resolvedTheme === "dark" ? "dark_dimmed" : "light";

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", "RIT-Base/RIT-Academy");
  script.setAttribute("data-repo-id", "R_kgDOU9z4yg");
  script.setAttribute("data-category", "General");
  script.setAttribute("data-category-id", "DIC_kwDOU9z4ys4DHJz-");
  script.setAttribute("data-mapping", "specific");
  script.setAttribute("data-term", "RIT Academy General Community Forum");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", giscusTheme);
  script.setAttribute("data-lang", "id");
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;

  container.appendChild(script);
}

document.addEventListener("DOMContentLoaded", initGiscusForum);
