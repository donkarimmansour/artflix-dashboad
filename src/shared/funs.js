import { ApiEndpoints, Host } from "../common/apiEndPoints"



//ImageLink
const ImageVIEW = (img) => {
    return `${Host.BACKEND}${ApiEndpoints.FileEndpoints.route}${ApiEndpoints.FileEndpoints.getSingleFileView}/${img}/view`
}

const ImageDOWNLOAD = (img) => {
    return `${Host.BACKEND}${ApiEndpoints.FileEndpoints.route}${ApiEndpoints.FileEndpoints.getSingleFileDownload}/${img}/download`
}




const extractDesk = (desk , length) => {
    if(desk.length > length){
         return desk.substr(0 , length) + "..."
    }else {
        return desk
    }
}


export {ImageVIEW  , ImageDOWNLOAD  , extractDesk}  