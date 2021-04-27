// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  student: {}
};

// Reducer
export default function studentEditReducer(state = initialState, action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_STUDENT_SUCCESS:
      return { ...state, student: action.payload };
    case types.UPDATE_STUDENT_SUCCESS:
      return { ...state, student: action.payload };
    case types.GET_STUDENT_SUCCESS:
      return { ...state, student: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}