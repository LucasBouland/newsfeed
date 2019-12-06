import { SET_FILTER } from "../actionTypes";
import { READ_FILTERS } from "../../constants";

const initialState = READ_FILTERS.NOT_READ;

const readFilter = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default readFilter;
