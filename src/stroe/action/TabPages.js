import { editPage } from "../Type";
export function edit(pages){
    return {
        type: editPage,
        payload: { pages }
    }
}
