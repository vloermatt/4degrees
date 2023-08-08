const axios = require("axios");

const doThings = async () => {
  const response = {
    data: {
      response: [
        {
          id: "1",
          name: "Matt",
        },
        {
          id: "2",
          name: "Stink",
        },
        {
          id: "3",
          name: "Fokken Erg",
        },
      ],
    },
  };
  console.log(response.data);
};

doThings();
