import { editPage } from "../Type";
const stateData = {
    tabPages: {}
}

const tabPagesReducer = function(state = stateData, action) {
    switch(action.type){
        case editPage: {
            return {
                ...state,
                tabPages: action.payload.pages
            }
        }
        default:
            return state;
    }
}
export default tabPagesReducer;