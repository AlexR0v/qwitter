import {bindActionCreators} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {actionCreators} from '../redux/actionsCreators'

export const useActions = () => {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(actionCreators, dispatch), [dispatch])
}