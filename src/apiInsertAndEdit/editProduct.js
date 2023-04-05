import { BASE_URL } from "../utils/apiURL";

export async function editProduct(product){
    const data = await fetch(`${BASE_URL}product/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }).then(response => {
        if(response.ok){
            return {message:"Product edited successfully", type: "cert"}
        }else{
            return {message:"edited Product failed, check fields, all must be filled in and Product name cannot belong to another Product", type: "error"}
        }
      }).catch(error => {
        console.error('Product edited  failed.', error);
        return {message:"Product edited  failed", type: "erro"}
      })
    return data
}