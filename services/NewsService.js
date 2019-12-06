import axios from "axios";
const key = "4f7267f607c147b88b58f8a20426c6ba";
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
