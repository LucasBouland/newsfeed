import { READ_FILTERS } from "../constants";

export const getNewsState = store => store.news;

export const getNewsList = store =>
  getNewsState(store) ? getNewsState(store).allIds : [];

export const getNewsById = (store, id) =>
  getNewsState(store) ? { ...getNewsState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getNews = store =>
  getNewsList(store).map(id => getNewsById(store, id));

export const getNewsByReadFilter = (store, readFilter) => {
  const allNews = getNews(store.news);
  switch (readFilter) {
    case READ_FILTERS.READ:
      return allNews.filter(news => news.completed);
    case READ_FILTERS.NOT_READ:
      return allNews.filter(news => !news.completed);
    case READ_FILTERS.ALL:
    default:
      return allNews;
  }
};
