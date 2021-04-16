import { editPage, addPage, delPage } from "../Type";
import { setTabs, getTabs } from "@/utils/session";
const tabs = getTabs();
const stateData = {
    tabPages: tabs ? JSON.parse(tabs) : {}
}

const tabPagesReducer = function(state = stateData, action) {
    switch(action.type){
        case editPage: {
            setTabs(JSON.stringify(action.payload.pages));
            return {
                ...state,
                tabPages: action.payload.pages
            }
        }
        case addPage: {
            const {key, title} = action.payload;
            const pages = {...state.tabPages};
            if (pages[key]) {
                pages[key].checked = true;
            } else {
                pages[key] = {checked: true, title}
            }
            for (let tabKey in pages) {
                if (tabKey !== key) pages[tabKey].checked = false;
            }
            return {
                ...state,
                tabPages: pages
            }
        }
        case delPage: {
            const {key, toKey} = action.payload;
            let pages = {};
            for (let tkey in state.tabPages) {
                if (key !== tkey) {
                    pages[tkey] = {...state.tabPages[tkey], checked: tkey === toKey}
                }
            }
            return {
                ...state,
                tabPages: pages
            }
        }
        default:
            return state;
    }
}
export default tabPagesReducer;