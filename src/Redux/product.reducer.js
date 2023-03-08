import { PRODUCT_ERROR, PRODUCT_FILTER, PRODUCT_LOADING, PRODUCT_SEARCH, PRODUCT_SUCESS, SINGLE } from "./product.action.type"

const initData = {
    fetchedData: [],
    loading: false,
    error: false,
    filterData: [],
    singledata:[],
}
export const productReducer = (state = initData, { type, payload }) => {
    switch (type) {
        case PRODUCT_LOADING: return { ...state, loading: true }
        case PRODUCT_SUCESS: return { ...state, fetchedData: [...payload], filterData: [...payload], error: false, loading: false }
        case PRODUCT_ERROR: return { ...state, loading: false, error: true }
        case PRODUCT_FILTER: return { ...state, filterData: [...filterHandler(state.fetchedData, payload)] }
        case PRODUCT_SEARCH: return { ...state, filterData: [...searchDataHandler(state.fetchedData, payload)] }
        case SINGLE:
            {
              console.log("SINGLE CASE CALLED ")
              let newedata = state.fetchedData.filter((el) => el.id == payload);
              console.log("reducer", newedata);
              return {
                ...state,
                singledata: newedata,
                isLoading: false,
                isError: false,
              };
            }
        default: return state
    }

}

const filterHandler = (data, selectedValues) => {
    let arr=[]
    let result = data.filter((el) => {
        
        if (selectedValues.includes("lth")) {

            return (el.price.sort((a,b)=>b-a) )
        }
        else if (selectedValues.includes("htl")) {

            return (el.price.sort((a,b)=>a-b) )
        }
       

    })
    console.log("filtered data" , arr.push(result))
    return result
}

const searchDataHandler = (data, inputValues) => {

    let search_result = data.filter((el) => {
        if ((el.brand == inputValues[0] && el.type == inputValues[1])) {
            return el
        }

    });
    console.log("searced data", search_result)
    return search_result.length ? search_result : data

}