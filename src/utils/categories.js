//import i18n from '../plugins/i18n'

function categories(i18n){return [
  {
    key: "groceries",
    get displayName(){ return i18n.t("categories.groceries")},
    icon: "mdi-cart-outline"
  },
  {
    key: "washing",
    displayName: i18n.t("categories.washing"),
    icon: "mdi-washing-machine"
  },
  {
    key: "babysitting",
    displayName: i18n.t("categories.babysitting"),
    icon: "mdi-baby-bottle"
  },
  {
    key: "transport",
    displayName: i18n.t("categories.transport"),
    icon: "mdi-car-hatchback"
  },
  {
    key: "loneliness",
    displayName: i18n.t("categories.loneliness"),
    icon: "mdi-emoticon-sad"
  },
  {
    key: "childcare",
    displayName: i18n.t("categories.childcare"),
    icon: "mdi-human-female-girl"
  },
  {
    key: "pets",
    displayName: i18n.t("categories.pets"),
    icon: "mdi-dog-side"
  },
  {
    key: "else",
    displayName: i18n.t("categories.other"),
    icon: "mdi-help"
  }
]}

export default categories;