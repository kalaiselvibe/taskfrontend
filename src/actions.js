export const updateHeader = (newHeaderData) => ({
    type: 'UPDATE_HEADER',
    payload: newHeaderData,
  });
  
  export const addRow = (newRowData) => ({
    type: 'ADD_ROW',
    payload: newRowData,
  });
  export const updateRow = (index, fieldName, value) => ({
    type: 'UPDATE_ROW',
    payload: { index, fieldName, value },
  });
  
  export const removeRow = (index) => ({
    type: 'REMOVE_ROW',
    payload: index,
  });
  