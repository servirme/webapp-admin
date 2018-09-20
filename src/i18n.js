import i18n from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import Backend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'
import XHR from 'i18next-xhr-backend'
// import moment from 'moment'
// import 'moment/locale/pt-br'

import isProd from './env'
import reduxStore from './redux'
import { version } from '../package.json'

// moment.locale('pt-br')

const basePath = process.env.PUBLIC_URL || ''
const config = {
  fallbackLng: reduxStore.getState().api.language,

  load: 'currentOnly',

  ns: ['translations'],
  defaultNS: 'translations',

  debug: !isProd,

  react: {
    wait: true,
  },

  backend: {
    backends: [
      LocalStorageBackend,
      XHR,
    ],
    backendOptions: [
      {
        expirationTime: isProd ? 7 * 24 * 60 * 60 * 1000 : false,
        // TODO: read from a "config" file the list of languages
        versions: {
          'pt-BR': version,
          'en-US': version,
        },
      },
      {
        loadPath: `${basePath}/locales/{{lng}}/{{ns}}.json`,
      },
    ],
  },
}

i18n
  .use(Backend)
  .use(reactI18nextModule)
  .init(config)

// i18n.on('languageChanged', (lng) => {
// moment.locale(lng)
// })

export default i18n
