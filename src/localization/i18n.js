import i18n from "i18next"
//import LanguageDetector from "i18next-browser-languagedetector"
//import { initReactI18next } from "react-i18next"
//import resources from './translations'

i18n
  .init({
    //resources: resources,
    resources: {
      fi: {
        translation: { 
          task: "Taski",
          tasks: "Taskit",
          about: "Tietoja",
          add: "Lisää",
          edit: "Muokkaa",
          description: "Kuvaus",
          startsAt: "Alkaa",
          endsAt: "Loppuu",
          duration: "Kestoaika",
          cancel: "Peruuta",
          save: "Tallenna",
          madeBy: "Tehnyt:",
          new: "uusi"
        }
      },
      en: {
        translation: { 
          task: "Task",
          tasks: "Tasks",
          about: "About",
          add: "Add",
          edit: "Edit",
          description: "Description",
          startsAt: "Starts",
          endsAt: "Ends",
          duration: "Duration",
          cancel: "Cancel",
          save: "Save",
          madeBy: "Made by:",
          new: "new",
        },
      }
    },
    lng: "fi",
    fallbackLng: "fi",
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }, function(err, t) {

    }
  });

  export default i18n