export const ADNEXA_ANDROID_PACKAGE = "art.adnexa.app";
export const ADNEXA_APK_URL = "/adnexa.apk";

export const OPEN_INSTALL_PROMPT_EVENT = "adnexa:open-install-prompt";
export const INSTALL_STATE_CHANGED_EVENT = "adnexa:install-state-changed";

const INSTALLED_STORAGE_KEY = "adnexa:android-app-installed";
const NEXT_PROMPT_STORAGE_KEY = "adnexa:install-prompt-next-at";

export const INSTALL_PROMPT_DELAY_MS = 1400;
export const LATER_REMINDER_DELAY_MS = 3 * 24 * 60 * 60 * 1000;
export const DOWNLOAD_REMINDER_DELAY_MS = 7 * 24 * 60 * 60 * 1000;

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

export const isAndroidBrowser = () => {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
};

export const isIosBrowser = () => {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/i.test(navigator.userAgent);
};

export const isRunningAsInstalledApp = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const standaloneDisplay = window.matchMedia(
    "(display-mode: standalone)",
  ).matches;
  const iosStandalone = Boolean(
    (navigator as NavigatorWithStandalone).standalone,
  );
  const androidAppReferrer = document.referrer.startsWith("android-app://");
  const launchedByTwa =
    new URL(window.location.href).searchParams.get("source") === "twa";

  return standaloneDisplay || iosStandalone || androidAppReferrer || launchedByTwa;
};

export const isAppMarkedInstalled = () => {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(INSTALLED_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

export const markAppInstalled = () => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(INSTALLED_STORAGE_KEY, "true");
    window.localStorage.removeItem(NEXT_PROMPT_STORAGE_KEY);
  } catch {
    // Runtime detection still prevents prompts inside the installed TWA.
  }

  window.dispatchEvent(new Event(INSTALL_STATE_CHANGED_EVENT));
};

export const getNextInstallPromptAt = () => {
  if (typeof window === "undefined") return 0;

  try {
    const storedValue = Number(
      window.localStorage.getItem(NEXT_PROMPT_STORAGE_KEY) || 0,
    );
    return Number.isFinite(storedValue) ? storedValue : 0;
  } catch {
    return 0;
  }
};

export const delayInstallPrompt = (delayMs: number) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      NEXT_PROMPT_STORAGE_KEY,
      String(Date.now() + delayMs),
    );
  } catch {
    // Storage can be unavailable in restrictive browser privacy modes.
  }
};

export const openInstallPrompt = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_INSTALL_PROMPT_EVENT));
};
