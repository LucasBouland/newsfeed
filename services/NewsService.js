import axios from "axios";
const key = "a20b31ac48b04fa399e1b38500a0f4fc";
const url = `https://newsapi.org/v2/top-headlines?apiKey=${key}`;

class NewsService {
  getNewsByCategory(keyword = "general") {
    console.log(`${url}&category=${keyword}`);
    return axios.get(`${url}&category=${keyword}`);
  }
}

export default NewsService;
