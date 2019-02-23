module.exports = {
  client: {
    service: {
      name: 'bts',
      url: 'http://localhost:3000/graphql',
      // optional headers
      headers: {
        // authorization: 'Bearer lkjfalkfjadkfjeopknavadf',
      },
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};
