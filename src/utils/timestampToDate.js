/* eslint-disable no-prototype-builtins */
export default key => {
    if (key && key.hasOwnProperty('seconds')) {
      const t = new Date(key.seconds * 1000);
      return t.toLocaleString();
    }

    if (key && key.hasOwnProperty('_seconds')) {
      const t = new Date(key._seconds * 1000);
      return t.toLocaleString();
    }
    return key;
  };