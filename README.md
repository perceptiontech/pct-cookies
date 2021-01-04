# pct-cookies

###### A simple cookie consent manager plugin based in Klaro!

## **Using PCT Cookies via NPM**

PCT Cookies is also available as a Node.js module via npm:

`npm install @perceptiontech/pct-cookies`

## **Getting started**

Add the following scripts to the end of the document (before closing the `</body>` tag).

The execution order of each javascript is important, do not change this order.

```html
<!-- Main pct cookies script (Important: Add pctCookiesConfig id attribute) -->
<script id="pctCookiesConfig" type="text/javascript" src="node_modules/pct-cookies/dist/js/pct-cookies.js"></script>

<!-- Translations for the site -->
<script type="text/javascript" src="node_modules/pct-cookies/dist/i18n/ca.js"></script>
<script type="text/javascript" src="node_modules/pct-cookies/dist/i18n/es.js"></script>
<script type="text/javascript" src="node_modules/pct-cookies/dist/i18n/en.js"></script>

<!-- Original Klaro! plugin script -->
<script defer type="text/javascript" src="node_modules/klaro/dist/klaro.js"></script>
```

## **Customize plugin**

To customize the plugin you can put the following data attributes in the script with the id "pctCookiesConfig":
- **`data-testing='false'`** Setting `data-testing` to `true` will cause Klaro to not show the consent notice or
                             modal by default, except if a special hash tag is appended to the URL (#klaro-
                             testing). This makes it possible to test Klaro on your live website without
                             affecting normal visitors.
                           
- **`data-storage-method='cookie'`** You can customize how Klaro persists consent information in the browser. Specify
                                     either `cookie` (the default) or `localStorage`.
                                   
- **`data-html-texts='false'`** If set to `true`, Klaro will render the texts given in the
                                `consentModal.description` and `consentNotice.description` translations as HTML.
                                This enables you to e.g. add custom links or interactive content.
                                                           
- **`data-cookie-domain='.example.com'`** You can change the cookie domain for the consent manager itself. Use this if you
                                          want to get consent once for multiple matching domains. By default, Klaro will
                                          use the current domain. Only relevant if `data-storage-method` is set to `cookie`.

- **`data-cookie-expires-after-days='365'`** You can also set a custom expiration time for the Klaro cookie. By default, it
                                             will expire after 30 days. Only relevant if `data-storage-method` is set to `cookie`.

- **`data-default='false'`** Defines the default state for services in the consent modal (`true` = enabled by
                             default). You can override this setting in each service.

- **`data-must-consent='false'`** If `mustConsent` is set to `true`, Klaro will directly display the consent
                                  manager modal and not allow the user to close it before having actively
                                  consented or declined the use of third-party services.

- **`data-accept-all='true'`** Setting `data-accept-all` to `true` will show an "accept all" button in the notice and
                                modal, which will enable all third-party services if the user clicks on it. If
                                set to `false`, there will be an "accept" button that will only enable the
                                services that are enabled in the consent modal.

- **`data-hide-decline-all='false'`** Setting `data-hide-decline-all` to `true` will hide the "decline" button in the consent
                                      modal and force the user to open the modal in order to change his/her consent or
                                      disable all third-party services. We strongly advise you to not use this
                                      feature, as it opposes the "privacy by default" and "privacy by design"
                                      principles of the GDPR (but might be acceptable in other legislations such as
                                      under the CCPA).

- **`data-hide-learn-more='false'`** Setting `data-hide-learn-more` to `true` will hide the "learn more / customize" link in
                                     the consent notice. We strongly advise against using this under most
                                     circumstances, as it keeps the user from customizing his/her consent choices.

#### Example

```html
<!-- PCT Cookies with  -->
<script
    id="pctCookiesConfig"
    type="text/javascript"
    src="node_modules/pct-cookies/dist/js/pct-cookies.js"
    data-accept-all="true"
    data-cookie-expires-after-days="365"
    data-privacy-policy="https://www.example.com/privacy-policy.html"
>
</script>
```

## **Add cookies**

Change the `type` attribute of each `<script>` or `<link>` to `text/plain` and add the `data-type` attribute with the original type.

Add a unique `data-name` attribute to each cookie to identify it.

You can add the following data attributes to personalize the content of the cookie:

- `data-default='false'` Indicates the cookie is checked by default.
- `data-title=''` Title of the cookie shown.
- `data-purposes='[analytics]'` Array of possible purposes: `necessary,analytics,statistics,security,livechat,advertising,styling` (no blanks between purposes).
- `data-required='false'` If `data-required` is set to `true` the user cannot uncheck the option
- `data-description=''` Description of the cookie shown.

#### Example
```html
<!-- Bootstrap css example -->
<link type="text/plain" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      data-type="text/css"
      data-name="bootstrap"
      data-default="true"
      data-title="Bootstrap styles"
      data-purposes="[analytics,styling]"
      data-required="false"
      data-description="This cookie is for web styles"
>
```

## **Cookie accept/reject callback**

To define a callback when the user has accepted or rejected a cookie, a function with the name of the cookie can be added in `pctCookiesCallback` object.

#### Example

```html
<!-- Example with 'bootstrap' cookie name callback with boolean consent parameter -->
<script>
    var pctCookiesCallback = {};

    pctCookiesCallback.bootstrap = function (consent, service) {
        console.log(
            'User consent for service ' + service.name + ': consent=' + consent
        );
    }
</script>
```

## **Translations**

The plugin language is loaded automatically according to the lang attribute of the html tag.

It is necessary to add the script with the current language of the website.

#### Example

If the website has the language iso code 'es':

```html
<!-- Translations for the site -->
<script type="text/javascript" src="node_modules/pct-cookies/dist/i18n/es.js"></script>
```