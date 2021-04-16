import { editPage, addPage, delPage } from "../Type";
export function edit(pages){
    return {
        type: editPage,
        payload: { pages }
    }
}
export function add({key, title}){
    return {
        type: addPage,
        payload: { key, title }
    }
}
export function del({key, toKey}){
    return {
        type: delPage,
        payload: { key, toKey }
    }
}
