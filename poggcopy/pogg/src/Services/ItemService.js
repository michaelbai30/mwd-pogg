import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */
//For the Item parse object

// READ operation - get item by itemno
export const getById = (itemno) => {
  const Item = Parse.Object.extend("Item");
  const query = new Parse.Query(Item);
  return query.get(itemno).then((result) => {
    // return Lesson object with objectId: id
    return result;
  });
};

// READ operation - get all lessons in Parse class Item
export const getAllLessons = () => {
  const Item = Parse.Object.extend("Item");
  const query = new Parse.Query(Item);
  return query.find().then((results) => {
    // returns array of Item objects
    return results;
  });
};
