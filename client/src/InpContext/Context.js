/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useReducer } from 'react';
import Reducer from './Reducer';

const INITIAL_STATE = {
    input: '',
    isFetching: false,
    error: false,
};

export const InpContext = createContext(INITIAL_STATE);

export const InpContextProvider = ({ children }) => {
    const [state, dispatchh] = useReducer(Reducer, INITIAL_STATE);

    return (
        <InpContext.Provider
            value={{
                input: state.input,
                isFetching: state.isFetching,
                error: state.error,
                dispatchh,
            }}
        >
            {children}
        </InpContext.Provider>
    );
};
