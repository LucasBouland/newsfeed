import axios from 'axios';
const key = 'a20b31ac48b04fa399e1b38500a0f4fc';
const url = `https://newsapi.org/v2/top-headlines?apiKey=${key}`;

class NewsService {
    getNewsByKeyword(keyword = 'general') {
        console.log(`${url}&category=${keyword}`);
        return axios.get(`${url}&q=${keyword}`);
    }
}

export default NewsService;