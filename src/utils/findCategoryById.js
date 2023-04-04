export const findCategoryById = (categories, id) => {
   const category = categories.find(c => c.id === id);   
   return category === undefined? {name: "category"}: category;
}
