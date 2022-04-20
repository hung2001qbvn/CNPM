import axios from "axios";
import Axios from "axios"
import { APRODUCT_DETAILS_FAIL, 
         APRODUCT_DETAILS_REQUEST, 
         APRODUCT_DETAILS_SUCCESS, 
         APRODUCT_LIST_FAIL, 
         APRODUCT_LIST_REQUEST, 
         APRODUCT_LIST_SUCCESS,
         APRODUCT_SAVE_REQUEST,
         APRODUCT_SAVE_SUCCESS,
         APRODUCT_SAVE_FAIL,
         APRODUCT_DELETE_SUCCESS,
         APRODUCT_DELETE_FAIL,
         APRODUCT_DELETE_REQUEST,
} from "../constants/aproductConstants"

const listaProducts = () => async (dispatch) => {
    try {
        dispatch({type:APRODUCT_LIST_REQUEST});
        const {data} = await axios.get("/api/aproducts");
        dispatch({type:APRODUCT_LIST_SUCCESS, payload: data});
    }
    catch (error) {
        dispatch({type:APRODUCT_LIST_FAIL, payload: error.message});
    }
}

const detailsaProduct = (aproductId) => async (dispatch) => {
    try {
        dispatch({type:APRODUCT_DETAILS_REQUEST, payload: aproductId});
        const {data} = await axios.get("/api/aproducts/" + aproductId);
        dispatch({type:APRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type:APRODUCT_DETAILS_FAIL, payload: error.message});
    }
}

const saveaProduct = (aproduct) => async (dispatch, getState) => {
    try {
      dispatch({ type: APRODUCT_SAVE_REQUEST, payload: aproduct });
      const {
        userSignin: { userInfo },
      } = getState();
      if (!aproduct._id) {
        const { data } = await Axios.post('/api/aproducts', aproduct, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
        dispatch({ type: APRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await Axios.put(
          "/api/aproducts/" + aproduct._id,
          aproduct,
          {
            headers: {
              Authorization: 'Bearer ' + userInfo.token,
            },
          }
        );
        dispatch({ type: APRODUCT_SAVE_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: APRODUCT_SAVE_FAIL, payload: error.message });
    }
  };

  const deleteaProduct = (aproductId) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: APRODUCT_DELETE_REQUEST, payload: aproductId });
      const { data } = await axios.delete("/api/aproducts/" + aproductId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: APRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: APRODUCT_DELETE_FAIL, payload: error.message });
    }
  };  

export {
    listaProducts, 
    detailsaProduct,
    saveaProduct,
    deleteaProduct,
};