import { BASE_URL } from "../utils/apiURL";

export async function creatCategory(category){
    const data = await fetch(`${BASE_URL}category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      }).then(response => {
        if(response.ok){
            return {message:"category create successfully", type: "cert"}
        }else{
            console.log(response.body.message)
            return {message:"create category failed, check fields, all must be filled in and category name cannot belong to another category", type: "error"}
        }
      }).catch(error => {
        console.error('category create  failed.', error);
        return {message:"category create  failed", type: "erro"}
      })
    return data
}