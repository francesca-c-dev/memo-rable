'use client'

import i18n from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import { initReactI18next } from "react-i18next"

i18n
.use(initReactI18next)
.use(resourcesToBackend((language)=> import(`./dictionaries/${language}.json`)))
.init({
    lng:"en",
    returnNull:false,
    interpolation:{
        escapeValue:false
    },
    preload:["it", "en"]
}) 
