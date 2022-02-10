import profilsReducer from '../features/profils'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {

        profils: profilsReducer,

    },
})