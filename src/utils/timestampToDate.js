export default key => {
    // eslint-disable-next-line no-prototype-builtins
    if (key && key.hasOwnProperty('seconds')) {
      const t = new Date(key.seconds * 1000);
      return t.toLocaleString();
    }
    return key;
  };