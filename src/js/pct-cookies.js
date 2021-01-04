let pctCookies = {
    init: function () {
        this.initConfig();
        this.initServices();
    },
    initConfig: function() {
        var me = this;
        let pctCookiesConfigScript = document.querySelector("#pctCookiesConfig");

        if (pctCookiesConfigScript !== null) {
            Object.keys(pctCookiesConfigScript.dataset).forEach(function (attribute) {
                let value = pctCookiesConfigScript.dataset[attribute];
                pctCookiesConfig[attribute] = me.setValueWithType(value);
            });
        }
    },
    initServices: function() {
        var me = this;
        let pctCookiesServices = document.querySelectorAll('link[type="text/plain"], script[type="text/plain"]');

        if (pctCookiesServices.length > 0) {
            pctCookiesConfig.services = [];

            pctCookiesServices.forEach(function (element) {
                let service = {};
                Object.keys(element.dataset).forEach(function (attribute) {
                    let value = element.dataset[attribute];
                    service[attribute] = me.setValueWithType(value);
                });
                if (typeof pctCookiesCallback !== 'undefined' && typeof pctCookiesCallback[service.name] === 'function') {
                    service.callback = pctCookiesCallback[service.name];
                }
                pctCookiesConfig.services.push(service);
            });
        }
    },
    setValueWithType: function(value) {
        if (!isNaN(value)) {
            return parseInt(value);
        }
        else if (value === 'true' || value === 'false') {
            return (value === 'true');
        }
        else if (value !== '' && value[0] === '[') {
            return value.substr(1, value.length - 2).split(',');
        }
        else {
            return value;
        }
    }
};

pctCookiesConfig = {
    // You can customize the ID of the DIV element that Klaro will create
    // when starting up. If undefined, Klaro will use 'klaro'.
    elementID: 'pctCookies',

    // Setting this to true will render the descriptions of the consent
    // modal and consent notice are HTML. Use with care.
    htmlTexts: false,

    // Setting 'embedded' to true will render the Klaro modal and notice without
    // the modal background, allowing you to e.g. embed them into a specific element
    // of your website, such as your privacy notice.
    embedded: false,

    // You can group services by their purpose in the modal. This is advisable
    // if you have a large number of services. Users can then enable or disable
    // entire groups of services instead of having to enable or disable every service.
    groupByPurpose: true,

    // How Klaro should store the user's preferences. It can be either 'cookie'
    // (the default) or 'localStorage'.
    storageMethod: 'cookie',

    // You can customize the name of the cookie that Klaro uses for storing
    // user consent decisions. If undefined, Klaro will use 'klaro'.
    cookieName: 'pct_cookies',

    // You can also set a custom expiration time for the Klaro cookie.
    // By default, it will expire after 120 days.
    cookieExpiresAfterDays: 365,

    // Defines the default state for services (true=enabled by default).
    default: false,

    // If "mustConsent" is set to true, Klaro will directly display the consent
    // manager modal and not allow the user to close it before having actively
    // consented or declines the use of third-party services.
    mustConsent: false,

    // Show "accept all" to accept all services instead of "ok" that only accepts
    // required and "default: true" services
    acceptAll: true,

    // replace "decline" with cookie manager modal
    hideDeclineAll: false,

    // hide "learnMore" link
    hideLearnMore: false,

    // show cookie notice as modal
    noticeAsModal: false,

    disablePoweredBy: true,

    // you can specify an additional class (or classes) that will be added to the Klaro `div`
    additionalClass: 'pct-cookies',

    // You can define the UI language directly here. If undefined, Klaro will
    // use the value given in the global "lang" variable. If that does
    // not exist, it will use the value given in the "lang" attribute of your
    // HTML tag. If that also doesn't exist, it will use 'en'.
    //lang: 'en',
};

// Example config that shows how to overwrite translations:
// https://github.com/KIProtect/klaro/blob/master/src/configs/i18n.js
pctCookiesConfig.translations = {

};

pctCookies.init();