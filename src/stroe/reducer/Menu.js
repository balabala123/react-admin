import { changeMenuIndex, changeOpenKeys } from "../Type";
const stateData = {
    openKeys: [],
    selectedKeys: []
}

const tabPagesReducer = function(state = stateData, action) {
    switch(action.type){
        case changeOpenKeys:
            return {...state, openKeys: [...action.payload.openKeys]};
        case changeMenuIndex: 
            return {...action.payload.menu}
        default:
            return state;
    }
}
export default tabPagesReducer;