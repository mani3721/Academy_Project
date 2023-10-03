
import * as AuthApi  from '../api/AuthRequest'

export const signUp=(formData)=>async (dispatch)=>{
    dispatch({type:"AUTH_START"})

    try {
        const {data}= await AuthApi.signUp(formData)

        dispatch({ type: "AUTH_SUCCESS", data: data });
        return data 
    } catch (error) {
        dispatch({ type: "AUTH_FAIL" });
        return error
    }
}

export const logIn=(formData)=> async (dispatch)=>{
     
    dispatch({type:"AUTH_START"})
     try {
        const {data}= await AuthApi.logIn(formData)

        console.log(data);

        dispatch({ type: "AUTH_SUCCESS", data: data });

        return data
        
     } catch (error) {

         dispatch({ type: "AUTH_FAIL" });
        return error
     }

}