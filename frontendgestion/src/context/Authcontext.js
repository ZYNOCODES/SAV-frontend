import { createContext,useReducer, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthReducer = (state,action) => {
    switch(action.type){
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null}
        default:
            return state;
        }
}

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer,{
        user: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user?.token){
            const decodedToken = jwtDecode(user?.token.toString());
            //make a request to the server to check if the token is still valid
            const authentification = async () => {
                const response = await fetch(process.env.REACT_APP_URL_BASE+`/User/${decodedToken._id}`, {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                    },
                });
            
                if (response.ok && user && decodedToken.exp * 1000 > Date.now()) {
                    dispatch({type: 'LOGIN',payload: user});
                }else{
                    dispatch({type: 'LOGOUT',payload: user});
                }
            };
            authentification();
        }else{
            dispatch({type: 'LOGOUT',payload: user});
        }
        
    },[]);

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}