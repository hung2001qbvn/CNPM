import {
    APRODUCT_LIST_REQUEST,
    APRODUCT_LIST_SUCCESS,
    APRODUCT_LIST_FAIL,
    APRODUCT_DETAILS_REQUEST,
    APRODUCT_DETAILS_SUCCESS,
    APRODUCT_DETAILS_FAIL,
    APRODUCT_SAVE_REQUEST,
    APRODUCT_SAVE_SUCCESS,
    APRODUCT_SAVE_FAIL,
    APRODUCT_DELETE_REQUEST,
    APRODUCT_DELETE_SUCCESS,
    APRODUCT_DELETE_FAIL,
  } from '../constants/aproductConstants';

function aproductListReducer(state = {aproducts: []}, action){
    switch(action.type) {
        case APRODUCT_LIST_REQUEST:
            return {loading: true};
        case APRODUCT_LIST_SUCCESS:
            return {loading: false, aproducts: action.payload};
        case APRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function aproductDetailsReducer(state = {aproduct: {}}, action){
    switch(action.type) {
        case APRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case APRODUCT_DETAILS_SUCCESS:
            return {loading: false, aproduct: action.payload};
        case APRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function aproductDeleteReducer(state = { aproduct: {} }, action) {
    switch (action.type) {
      case APRODUCT_DELETE_REQUEST:
        return { loading: true };
      case APRODUCT_DELETE_SUCCESS:
        return { loading: false, aproduct: action.payload, success: true };
      case APRODUCT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function aproductSaveReducer(state = { aproduct: {} }, action) {
    switch (action.type) {
      case APRODUCT_SAVE_REQUEST:
        return { loading: true };
      case APRODUCT_SAVE_SUCCESS:
        return { loading: false, success: true, aproduct: action.payload };
      case APRODUCT_SAVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

export {aproductListReducer,
        aproductDetailsReducer,
        aproductSaveReducer,
        aproductDeleteReducer,
}