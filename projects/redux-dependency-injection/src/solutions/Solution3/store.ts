import { createSlice, configureStore } from '@reduxjs/toolkit'
import { config } from 'process';

const timezoneSlice = createSlice({
  name: 'timezone',
  initialState: {
    value: null
  },
  reducers: {
    setPreferredTimezone: (state, action) => {

      state.value = action.payload; 
    },

  }
})


export const store = configureStore({
    reducer: timezoneSlice.reducer
}); 



export const createSetPreferredTimezoneAction = timezoneSlice.actions.setPreferredTimezone; 

export const selectPreferredTimezone = (store : any) => {
    return store.value
}; 