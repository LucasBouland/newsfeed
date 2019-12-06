import axios from "axios";
const key = "56d42e2807154cbe967fbb3c6645ebb2";
const url = `https://newsapi.org/v2/top-headlines?apiKey=${key}`;

class NewsService {
  getNewsByCategory(keyword = "general") {
    console.log(`${url}&category=${keyword}`);
    return axios.get(`${url}&category=${keyword}`);
  }
}

export default NewsService;
