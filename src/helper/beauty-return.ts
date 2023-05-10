export const BeautyReturn = (code: number, response: any) => {
    if(code !== 200)
        console.log(response)

    return {
        status: code === 200? "success": "failed",
        ret: code,
        response
    }
}