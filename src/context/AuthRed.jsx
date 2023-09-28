const Authred = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { currentLogin: action.payload };
    }
    case "LOGOUT": {
      return { currentLogin: null };
    }
  }
};

export default Authred;
