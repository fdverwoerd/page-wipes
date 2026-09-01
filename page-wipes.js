const TYPES = [
  "wipe-horizontal",
  "wipe-vertical",
  "wipe-diagonal",
  "wipe-iris",
  "wipe-clock",
  "wipe-shape",
];

const DEFAULTS = {
  mode: "cycle",
  storageKey: "page-wipes-index",
  types: TYPES,
};

let started = false;

function currentIndex(storageKey, types) {
  const raw = sessionStorage.getItem(storageKey);
  const index = Number(raw);
  return Number.isInteger(index) && index >= 0 ? index % types.length : 0;
}

function pickType({ mode, storageKey, types }, advance) {
  if (!advance) {
    return types[currentIndex(storageKey, types)];
  }

  if (mode === "random") {
    const last = sessionStorage.getItem(storageKey);
    let next = Math.floor(Math.random() * types.length);
    if (types.length > 1 && String(next) === last) {
      next = (next + 1) % types.length;
    }
    sessionStorage.setItem(storageKey, String(next));
    return types[next];
  }

  const raw = sessionStorage.getItem(storageKey);
  const index = raw == null ? 0 : (Number(raw) + 1) % types.length;
  sessionStorage.setItem(storageKey, String(index));
  return types[index];
}

function applyType(viewTransition, type) {
  if (!viewTransition || !type) {
    return;
  }
  viewTransition.types.add(type);
  document.documentElement.dataset.pageTransition = type;
}

export function initPageWipes(options = {}) {
  if (started || typeof window === "undefined") {
    return;
  }

  const config = {
    ...DEFAULTS,
    ...options,
    types: options.types?.length ? options.types : DEFAULTS.types,
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  started = true;

  window.addEventListener("pageswap", (event) => {
    if (!event.viewTransition) {
      return;
    }
    applyType(event.viewTransition, pickType(config, true));
  });

  window.addEventListener("pagereveal", (event) => {
    if (!event.viewTransition) {
      return;
    }
    applyType(event.viewTransition, pickType(config, false));
  });
}

export { TYPES };

queueMicrotask(() => {
  if (!started) {
    initPageWipes(globalThis.pageWipes ?? {});
  }
});
