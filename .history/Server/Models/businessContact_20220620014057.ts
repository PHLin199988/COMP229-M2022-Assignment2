// Step 1 - Import Mongoose
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Step 2 - Create a Schema that matches the data
const BusinessContact = new Schema
({
    ContactName: String,
    ContactNumber: String,
    EmailAddress: String,
},
{
    collection: "businessContacts"
});

// Step 3 - Create a Model using the Schema
const Model = mongoose.model("BusinessContacts", BusinessContact);

// Step 4 - Export the Model -> this makes the file a module
export default Model;