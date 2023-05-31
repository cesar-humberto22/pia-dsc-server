
export const removeId = (data: any): any => {
    if(Array.isArray(data)){
        return data.map((t) => removeId(t))
    }else if(typeof data === "object"){
        if(data["_id"]){
            data["id"] = data["_id"].toString()
            delete data["_id"];
        }
        return data;
    } 
    return data;
}

export const BeautyReturn = (code: number, response: any) => {
    /*if(code !== 200)
        console.log(response)*/

    return {
        status: code === 200? "success": "failed",
        ret: code,
        response: removeId(response)
    }
}