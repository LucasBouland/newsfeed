import { READ_NEWS } from "./actionTypes";

let nextNewsId = 0;

export const addNews = content => ({
  type: READ_NEWS,
  payload: {
    id: ++nextNewsId,
    content
  }
});
