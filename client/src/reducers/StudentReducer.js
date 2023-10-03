

const StudentReducer=(state={authData:null , sent:false, loading:false , error:false}, action )=>{
   
    
    switch (action.type) {

        case "AUTH_START":
            return {...state, loading:true, error:false,sent:false}

        case "AUTH_SUCCESS":
            localStorage.setItem("Student", JSON.stringify({...action?.data}))
            return {...state, authData:action.data, loading:false, error:false, sent:false}

        case "AUTH_FAIL":
            return {...state, loading:false, error:false, sent:false}


        case "START":
            return {...state, loading:true, sent:false, error:false}
        case "SCUCCESS":
            localStorage.setItem("Student", JSON.stringify({...action?.data}))
           return {...state, authData:action.data, sent:true ,loading:false, error:false}
        case "FAIL":
            return {...state, loading:false, sent:false, error:true}
      
           case "UPDATING_START":
            return {...state, loading: true , error: false}
          case "UPDATING_SUCCESS":
            localStorage.setItem("studentUpdated", JSON.stringify({...action?.data}));
            return {...state, authData: action.data, loading: false, error: false}
             case "UPDATING_FAIL":
            return {...state, loading: false, error: true}

            default:
                return state
    }
}

export default StudentReducer