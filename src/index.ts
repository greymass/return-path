/**
 * Generate a return url that Anchor will redirect back to w/o reload.
 * @returns The return_path string.
 */

// For reference, a lot of the regex strings are taken from https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts

export function detectReturnPath() {
    if (isChromeiOS()) {
        // google chrome on iOS will always open new tab so we just ask it to open again as a workaround
        return 'googlechrome://'
    }
    if (isFirefoxiOS()) {
        // same for firefox
        return 'firefox:://'
    }
    if (isAppleHandheld() && isBrave()) {
        // and brave ios
        return 'brave://'
    }
    if (isAppleHandheld()) {
        // return url with unique fragment required for iOS safari to trigger the return url
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let rv = window.location.href.split('#')[0] + '#'
        for (let i = 0; i < 8; i++) {
            rv += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        }
        return rv
    }

    if (isAndroid() && isFirefox()) {
        return 'android-intent://org.mozilla.firefox'
    }

    if (isAndroid() && isEdge()) {
        return 'android-intent://com.microsoft.emmx'
    }

    if (isAndroid() && isOpera()) {
        return 'android-intent://com.opera.browser'
    }

    if (isAndroid() && isBrave()) {
        return 'android-intent://com.brave.browser'
    }

    if (isAndroid() && isSamsung()) {
        return 'android-intent://com.sec.android.app.sbrowser'
    }

    if (isAndroid() && isDuckDuckGo()) {
        return 'android-intent://com.duckduckgo.mobile.android'
    }

    if (isAndroid() && isAndroidWebView()) {
        return 'android-intent://webview'
    }

    if (isAndroid() && isChromeMobile()) {
        return 'android-intent://com.android.chrome'
    }

    return window.location.href
}

function isAppleHandheld() {
    return /iP(ad|od|hone)/i.test(navigator.userAgent)
}

function isChromeiOS() {
    return /CriOS/.test(navigator.userAgent)
}

function isChromeMobile() {
    return /Chrome\/[.0-9]* Mobile/i.test(navigator.userAgent)
}

function isFirefox() {
    return /Firefox/i.test(navigator.userAgent)
}

function isFirefoxiOS() {
    return /FxiOS/.test(navigator.userAgent)
}

function isOpera() {
    return /OPR/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent)
}

function isEdge() {
    return /Edge\/([0-9._]+)/.test(navigator.userAgent)
}

function isBrave() {
    return navigator['brave'] && typeof navigator['brave'].isBrave === 'function'
}

function isSamsung() {
    return /SamsungBrowser\/([0-9.]+)/.test(navigator.userAgent)
}

function isDuckDuckGo() {
    return /DuckDuckGo/.test(navigator.userAgent)
}

function isAndroid() {
    return /Android/.test(navigator.userAgent)
}

function isAndroidWebView() {
    return /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/.test(navigator.userAgent)
}
