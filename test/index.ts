import jsdom from 'jsdom-global'

import {assert} from 'chai'

import { generateReturnUrl } from '../src/index'

suite('index', function () {
    suite('generateUrl', function () {
        jsdom()

        test('chrome on iOS', function () {
            assertDetection(
                "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
                "googlechrome://"
            )
        })

        test('chrome on Android', function () {
            assertDetection(
                "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
            "android-intent://com.android.chrome"
            )
        })

        test('webview on Android', function () {
            assertDetection(
                "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36",
                "android-intent://webview"
            )
        })
    })
})

function assertDetection(uaString, expectedDetection) {
    navigator ={
        ...window.navigator,
        userAgent: uaString
    }

    assert.equal(generateReturnUrl(), expectedDetection)
}
