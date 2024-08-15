import { createSlice } from "@reduxjs/toolkit"

export interface CounterState {
    loading: boolean
}

const initialState: CounterState = {
    loading: false
}

export const ConfigSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {setLoading} = ConfigSlice.actions

export default ConfigSlice.reducer