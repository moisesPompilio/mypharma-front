import { BASE_URL } from "../utils/apiURL";

export async function creatProduct(product){
    console.log(JSON.stringify(product))
    const data = await fetch(`${BASE_URL}product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }).then(response => {
        if(response.ok){
            return {message:"Product create successfully", type: "cert"}
        }else{
            return {message:"create Product failed, check fields, all must be filled in and Product name cannot belong to another Product", type: "error"}
        }
      }).catch(error => {
        console.error('Product create  failed.', error);
        return {message:"Product create  failed", type: "erro"}
      })
    return data
}