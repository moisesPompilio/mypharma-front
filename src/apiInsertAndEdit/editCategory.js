import { BASE_URL } from "../utils/apiURL";

export async function editCategory(category){
    const data = await fetch(`${BASE_URL}category/${category.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      }).then(response => {
        if(response.ok){
            return {message:"category edited successfully", type: "cert"}
        }else{
            console.log(response.body.message)
            return {message:"edited category failed, check fields, all must be filled in and category name cannot belong to another category", type: "error"}
        }
      }).catch(error => {
        console.error('category edited  failed.', error);
        return {message:"category edited  failed", type: "erro"}
      })
    return data
}