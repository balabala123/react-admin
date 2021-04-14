import { editPage } from "../Type";
export function edit(pages){
    console.log('edit', pages)
    return {
        type: editPage,
        payload: { pages }
    }
}
