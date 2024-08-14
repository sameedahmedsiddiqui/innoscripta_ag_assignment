import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FeedFilterState } from "../../utils/interfaces"

const initialState: FeedFilterState = {
    query: '',
    fromDate: '',
    toDate: '',
    category: '',
    source: '',
}

export const FeedFilterSlice = createSlice({
    name: 'feedFilter',
    initialState,
    reducers: {
        setFeedFilters: (state, action) => {
            state.query = action.payload?.query
            state.fromDate = action.payload?.fromDate
            state.toDate = action.payload?.toDate
            state.source = action.payload?.source
            state.category = action.payload?.category
        }
    }
})

export const {setFeedFilters} = FeedFilterSlice.actions

export default FeedFilterSlice.reducer