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

export default function useFetch(url) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST })
    fetch(url)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { data: data.data } })
      })
      .catch(error => {
        dispatch({ type: ACTIONS.ERROR, payload: { error } })
      })
  }, [url])
  return state;
}