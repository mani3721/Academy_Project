import * as StudentDataApi from '../api/StudentRequest'

export const StudentData=(formData)=> async(dispatch)=>{

    dispatch({type:"START"})

      try {

        const {data}= await StudentDataApi.StudentData(formData)

        dispatch({type:"SCUCCESS",data:data})

      return data
        
      } catch (error) {
          console.log(error)

          dispatch({type:"FAIL"})

        return error
      }
   
}


export const updatestudent=(id, formData)=>async(dispatch)=>{
   dispatch({type:"UPDATING_START"})

   try {

    const {data}= await StudentDataApi.updateStudentData(id, formData)

    dispatch({type: "UPDATING_SUCCESS", data: data})

    return data
    
   } catch (error) {
    dispatch({type: "UPDATING_FAIL"})
   }
}

//card data

export const DashboardData=(formData)=>async(dispatch)=>{

  dispatch({type:"START"})

  try {
      const {data}= await StudentDataApi.DashData(formData)

      dispatch({type:"SCUCCESS",data:data})

      return data
  } catch (error) {
    dispatch({type:"FAIL"})
  }
}