const initialState = {
    headerData: { vr_no: '', vr_date: '', ac_name: '', ac_amt: 0, status: '' },
    detailData: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_HEADER':
        return { ...state, headerData: { ...state.headerData, ...action.payload } };
      case 'ADD_ROW':
        return { ...state, detailData: [...state.detailData, action.payload] };
      case 'REMOVE_ROW':
        return { ...state, detailData: state.detailData.filter((_, index) => index !== action.payload) };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  