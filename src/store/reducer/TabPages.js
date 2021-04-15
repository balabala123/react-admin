import { editPage } from "../Type";
const stateData = {
    tabPages: {}
}

const tabPagesReducer = function(state = stateData, action) {
    switch(action.type){
        case editPage: {
            sessionStorage.setItem('tab-pages', JSON.stringify(action.payload.pages));
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