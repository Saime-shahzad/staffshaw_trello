import { useNavigate } from "react-router-dom";


    export const useRoutFunction  = () => {
     
    const navigate = useNavigate();

    const RoutFunction = (route , data) => {
        
        if (route && data) {
            navigate(route  , { state: data && data });
        }
        else{
            navigate(route);

        }
    };

    return RoutFunction;
};





