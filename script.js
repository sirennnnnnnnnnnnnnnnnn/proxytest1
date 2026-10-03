const form = document.getElementById("searchForm");
const input = document.getElementById("urlInput");
const clearBtn = document.getElementById("clearBtn");
const luckyBtn = document.getElementById("luckyBtn");
const status = document.getElementById("status");

function normalize(value) {
  value = value.trim();
  if (!value) return "";

  if (/^(https?:\/\/|\/\/)/i.test(value)) {
    return value.startsWith("//") ? "https:" + value : value;
  }

  if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(value)) {
    return "https://" + value;
  }

  return "https://www.google.com/search?q=" + encodeURIComponent(value);
}

async function setupUV() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("This browser does not support service workers.");
  }

  // UV requires the service worker to control /service/.
  await navigator.serviceWorker.register("/sw.js", {
    scope: "/service/"
  });

  const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
  const wispUrl =
    (location.protocol === "https:" ? "wss" : "ws") +
    "://" + location.host + "/wisp/";

  await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);

  await navigator.serviceWorker.ready;
}

function openThroughUV(target) {
  window.location.href =
    __uv$config.prefix + __uv$config.encodeUrl(target);
}

input.addEventListener("input", () => {
  clearBtn.style.display = input.value ? "block" : "none";
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  clearBtn.style.display = "none";
  input.focus();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const target = normalize(input.value);
  if (!target) return;

  status.textContent = "Starting Ultraviolet…";

  try {
    await setupUV();
    openThroughUV(target);
  } catch (error) {
    console.error(error);
    status.textContent =
      "Ultraviolet could not start. Check the server console and make sure you are using HTTPS when deployed.";
  }
});

luckyBtn.addEventListener("click", () => form.requestSubmit());

input.focus();
