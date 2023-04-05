import { BASE_URL } from "../utils/apiURL";

export async function deleteCategory (categoryId){
    const data = await fetch(`${BASE_URL}category/${categoryId}`, {
        method: 'DELETE'
      }).then(response => {
        if(response.ok){
            return {message:"category deleted successfully", type: "cert"}
        }else{
            return {message:"category deleted failed", type: "error"}
        }
      }).catch(error => {
        console.error('Ocorreu um erro ao excluir os dados.', error);
        return {message:"category deleted failed", type: "erro"}
      })
    return data
}