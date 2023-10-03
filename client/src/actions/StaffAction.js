import * as StaffApi from '../api/StaffRequest'

export const addStaff=(formData)=> async (dispatch)=>{
    dispatch({type:"START"})

    try {

        const {data}= await StaffApi.addStaff(formData)

        dispatch({type:"SCUCCESS",data:data})

        return data
    } catch (error) {

        dispatch({type:"FAIL"})

        return error
    }

}

export const updateStaff=(id, formData)=> async (dispatch)=>{
    dispatch({type:"START"})

     try {

        const {data}= await StaffApi.updateStaffData(id, formData)

        dispatch({type:"SCUCCESS",data:data})

        return data
        
     } catch (error) {
        dispatch({type:"FAIL"})

        return error
     }
}