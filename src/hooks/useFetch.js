import { useEffect, useReducer } from 'react';

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error'
}

const initialState = {
  data: [],
  loading: false,
  error: null
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.MAKE_REQUEST:
      return { ...state, loading: true }
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, data: payload.data }
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: payload.error }
    default:
      return state
  }
}

export default function useFetch(url, options) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        const res = await fetch(url, options)
        const data = await res.json()
        dispatch({ type: ACTIONS.GET_DATA, payload: { data: data.data } })
      } catch (error) {
        dispatch({ type: ACTIONS.ERROR, payload: { error } })
      }
    }
    fetchData()
  }, [url, options])
  return state;
}