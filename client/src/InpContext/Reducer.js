const Reducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH_START':
            return {
                input: '',
                isFetching: true,
                error: false,
            };
        case 'SEARCH_END':
            return {
                input: action.payload,
                isFetching: false,
                error: false,
            };
        case 'SEARCH_CLEAR':
            return {
                input: '',
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};

export default Reducer;
