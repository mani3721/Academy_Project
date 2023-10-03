
import * as addbatchApi from '../api/addbatchRequest'
export const addbatch=(formdata)=>async  (dispatch)=>{
   
    dispatch({type:"START"})
    try {
        const {data}= await addbatchApi.addbatch(formdata)
        dispatch({type:"SCUCCESS",data:data})
        return data
    } catch (error) {
        dispatch({type:"FAIL"})
        return error
    }

}