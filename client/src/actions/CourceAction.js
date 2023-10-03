import * as CourceApi from '../api/CourceRequest'

export const addcource=(formdata)=>async(dispatch)=>{
    dispatch({type:"START"})
    try {
        const {data}= await CourceApi.addcource(formdata)
        dispatch({type:"SCUCCESS",data:data})
        return data
    } catch (error) {
        dispatch({type:"FAIL"})
        return error
    }
}

export const editcource=(id,editdata)=>async(dispatch)=>{

    dispatch({type:"START"})
    try {

        const {data}= await CourceApi.editcourcedata(id,editdata)
        dispatch({type:"SCUCCESS",data:data})
        return data

    } catch (error) {
        dispatch({type:"FAIL"})
        return error
    }
}