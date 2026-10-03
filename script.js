const form = document.getElementById("searchForm");
const input = document.getElementById("urlInput");
const clearBtn = document.getElementById("clearBtn");
const luckyBtn = document.getElementById("luckyBtn");

function normalize(value) {
  value = value.trim();
  if (!value) return "";

  // Treat normal domains/URLs as URLs.
  if (/^(https?:\/\/|\/\/)/i.test(value)) {
    return value.startsWith("//") ? "https:" + value : value;
  }

  if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(value)) {
    return "https://" + value;
  }

  // Otherwise use a search query for now.
  return "https://www.google.com/search?q=" + encodeURIComponent(value);
}

input.addEventListener("input", () => {
  clearBtn.style.display = input.value ? "block" : "none";
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  clearBtn.style.display = "none";
  input.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = normalize(input.value);
  if (!target) return;

  /*
    UV integration goes here once the Ultraviolet server is installed.
    Typical UV routing is handled by the UV service worker and encodeUrl().
  */
  window.location.href = target;
});

luckyBtn.addEventListener("click", () => {
  form.requestSubmit();
});

input.focus();
