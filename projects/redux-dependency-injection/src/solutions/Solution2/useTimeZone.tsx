import {useDispatch, useSelector} from "react-redux"; 
import { selectPreferredTimezone, createSetPreferredTimezoneAction } from "./store";




export const useTimezone = () => {

    const dispatch = useDispatch(); 
    const preferredTz = useSelector(selectPreferredTimezone);

    return {
        setPreferredTimezone: (newTz: string) => dispatch(createSetPreferredTimezoneAction(newTz)), 
        preferredTimezone: preferredTz
    }
}