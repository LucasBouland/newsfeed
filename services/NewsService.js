import axios from "axios";
const key = "afa08958bafc4cde80805363337a1f30";
const url = `https://newsapi.org/v2/top-headlines?apiKey=${key}&country=us`;
const urlAll = `https://newsapi.org/v2/everything?apiKey=${key}`;
class NewsService {
    getNewsByCategory(keyword = "general") {
        console.log(`${url}&category=${keyword}`);
        return axios.get(`${url}&category=${keyword}`);
    }

    getNewsByTitle(title) {
        console.log(`${urlAll}&q=${title}`);
        return axios.get(`${urlAll}&q=${title}`);
    }
}

export default NewsService;
