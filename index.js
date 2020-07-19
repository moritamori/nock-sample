const axios = require('axios')
const url = "https://qiita.com/api/v2/items";

module.exports.getData = function() {
  return axios.get(url)
}
