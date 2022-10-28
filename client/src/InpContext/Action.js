export const SearchStart = (credentials) => ({
    type: 'SEARCH_START',
});

export const SearchEnd = (input) => ({
    type: 'SEARCH_END',
    payload: input,
});

export const SearchClear = () => ({
    type: 'SEARCH_CLEAR',
});
