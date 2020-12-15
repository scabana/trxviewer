import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const dateTimeFormats = {
    'en': {
        short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        },
        long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
        }
    },
    'fr': {
        short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        },
        long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
        }
    }
};

const i18n = new VueI18n({
    locale: document.documentElement.lang
    , // set locale
    fallbackLocale: "en",
    missing: (locale, key, vm, values) => {

        if (Array.isArray(values)) {
            for (const item of values) {
                if (item['fallback']) {
                    return item['fallback'];
                }
            }
        }

        if (values['fallback']) {
            return values['fallback'];
        }
        return key;
    },
    dateTimeFormats
});

export default i18n;
