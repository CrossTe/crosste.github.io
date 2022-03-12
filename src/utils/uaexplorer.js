export default UAExplorer;
const _UAExplorer = UAExplorer;
export { _UAExplorer as UAExplorer };

const mobileRE =
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;

const tabletRE =
  /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b|android|\bWindows(?:.+)ARM\b|ipad|playbook|silk|tablet/i;

const osList = [
  "Windows Phone",
  "Android",
  "CentOS",
  { label: "Chrome OS", pattern: "CrOS" },
  "Debian",
  "Fedora",
  "FreeBSD",
  "Gentoo",
  "Haiku",
  "Kubuntu",
  "Linux Mint",
  "OpenBSD",
  "Red Hat",
  "SuSE",
  "Ubuntu",
  "Xubuntu",
  "Cygwin",
  "Symbian OS",
  "hpwOS",
  "webOS ",
  "webOS",
  "Tablet OS",
  "Tizen",
  "Linux",
  "Mac OS X",
  "Macintosh",
  "Mac",
  "Windows 98;",
  "Windows ",
];

function UAExplorer(userAgent) {
  if (typeof userAgent !== "string") return false;
  const isMobile = mobileRE.test(userAgent);

  return {
    isMobile: isMobile,
    isTablet: !isMobile && tabletRE.test(userAgent),
    userAgent: userAgent,
    platform: getPlatform(userAgent),
    os: getOS(userAgent),
    browser: getBrowser(userAgent),
  };
}

function isAndroid(ua) {
  const android = /Android/i;
  return android.test(ua);
}

function isApple(ua) {
  const apple = /ip(hone|od|ad)/i;
  return apple.test(ua);
}

function isWindows(ua) {
  const windows = /windows/i;
  return windows.test(ua);
}

function isLinux(ua) {
  const windows = /Linux/i;
  return windows.test(ua);
}

function isBlackBerry(ua) {
  const bb = /b(lackberry|b10)/i;
  return bb.test(ua);
}

function isBrowserOpera(ua) {
  const opera = /Opera M(ob|in)i/i;
  return opera.test(ua);
}

function isBrowserChrome(ua) {
  const chrome = /\b(CriOS|Chrome)(?:.+)Mobile|chrome/i;
  return chrome.test(ua);
}

export function isBrowserFirefox(ua) {
  const firefox = /(Mobile|Tablet)(?:.+)Firefox\b|firefox/i;
  return firefox.test(ua);
}

function getBrowser(ua) {
  if (isBrowserOpera(ua)) {
    return "Opera";
  } else if (isBrowserChrome(ua)) {
    return "Chrome";
  } else if (isBrowserFirefox(ua)) {
    return "Firefox";
  } else {
    return "Unknown";
  }
}

function getPlatform(ua) {
  if (isAndroid(ua)) {
    return "Android";
  } else if (isApple(ua)) {
    return "Apple";
  } else if (isWindows(ua)) {
    return "Windows";
  } else if (isBlackBerry(ua)) {
    return "BlackBerry";
  } else if (isLinux(ua)) {
    return "Linux";
  } else {
    return "Unknown";
  }
}

function getOS(ua) {
  for (let i = 0; i < osList.length; i++) {
    const os = osList[i];
    const pattern = os.pattern || String(os).replace(/([ -])(?!$)/g, "$1?");
    const ck = RegExp("\\b" + pattern + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(ua);

    if (ck) {
      return cleanupOS(ck, pattern, os.label || os);
    }
  }
}

function cleanupOS(os, pattern, label) {
  // Platform tokens are defined at:
  // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
  // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
  let data = {
    "10.0": "10",
    6.4: "10 Technical Preview",
    6.3: "8.1",
    6.2: "8",
    6.1: "Server 2008 R2 / 7",
    "6.0": "Server 2008 / Vista",
    5.2: "Server 2003 / XP 64-bit",
    5.1: "XP",
    5.01: "2000 SP1",
    "5.0": "2000",
    "4.0": "NT",
    "4.90": "ME",
  };
  // Detect Windows version from platform tokens.
  if (
    pattern &&
    label &&
    /^Win/i.test(os) &&
    !/^Windows Phone /i.test(os) &&
    (data = data[/[\d.]+$/.exec(os)])
  ) {
    os = "Windows " + data;
  }
  // Correct character case and cleanup string.
  os = String(os);

  if (pattern && label) {
    os = os.replace(RegExp(pattern, "i"), label);
  }

  os = format(
    os
      .replace(/ ce$/i, " CE")
      .replace(/\bhpw/i, "web")
      .replace(/\bMacintosh\b/, "Mac OS")
      .replace(/_PowerPC\b/i, " OS")
      .replace(/\b(OS X) [^ \d]+/i, "$1")
      .replace(/\bMac (OS X)\b/, "$1")
      .replace(/\/(\d)/, " $1")
      .replace(/_/g, ".")
      .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "")
      .replace(/\bx86\.64\b/gi, "x86_64")
      .replace(/\b(Windows Phone) OS\b/, "$1")
      .replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1")
      .split(" on ")[0]
  );

  return os;
}

function format(string) {
  string = string.trim();
  return /^(?:webOS|i(?:OS|P))/.test(string)
    ? string
    : string.charAt(0).toUpperCase() + string.slice(1);
}
