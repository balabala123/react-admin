import { changeMenuIndex, changeOpenKeys } from "../Type";
export function changeMenu(menu){
    return {
        type: changeMenuIndex,
        payload: {menu}
    }
}
export function changeKeys(openKeys){
    return {
        type: changeOpenKeys,
        payload: {openKeys}
    }
}
