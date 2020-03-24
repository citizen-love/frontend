
export const name = "HelpRequestWizardState";

export function getPlainState() {
  return {
    title: undefined,
    description: undefined,
    country: undefined,
    community: undefined,
    location: undefined,
    email: undefined,
    phone: undefined,
    category: [],
    customCategory: undefined,
    customNotRelevantInformation: undefined,
  }
}


export const module = {
  strict: true,
  namespaced: true,
  state: getPlainState(),
  mutations: {
    set(state, payload) {
      Object.entries(payload).forEach(([prop, val]) => {
        state[prop] = val;
      });
    },
  },
  actions: {}
};