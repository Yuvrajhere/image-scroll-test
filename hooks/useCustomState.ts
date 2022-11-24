import { useRef, useState } from "react"

const useCutomState = (initialState: any) => {
    const [_state, _setState] = useState(initialState);

    const state = useRef(_state);

    const setState = (newState: any) => {
        state.current = newState;
        _setState(newState)
    }

    return [state.current, setState];
}

export default useCutomState