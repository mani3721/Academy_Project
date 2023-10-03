import * as AdminApi from '../api/AdminRequest'

export const adminLogin=(formdata)=> async (dispatch)=>{
  
    dispatch({type:"AUTH_START"})
    
    try {

        const {data} = await AdminApi.adminlogin(formdata)

        dispatch({ type: "AUTH_SUCCESS", data: data });

        return data
        
    } catch (error) {
        dispatch({ type: "AUTH_FAIL" });
        return error
    }
}