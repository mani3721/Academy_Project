import * as MeetinglinkApi from '../api/meetingRequest'

export const sendmeetinglink=(formdata)=>async(dispatch)=>{
    dispatch({type:"START"})
    try {
        const {data}= await MeetinglinkApi.sendmeetinglink(formdata)
        dispatch({type:"SCUCCESS",data:data})
        return data
    } catch (error) {
        dispatch({type:"FAIL"})
        return error
    }
}