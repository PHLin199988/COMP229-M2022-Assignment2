"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BusinessContact = new Schema({
    ContactName: String,
    ContactNumber: String,
    EmailAddress: String,
}, {
    collection: "businessContacts"
});
const Model = mongoose_1.default.model("BusinessContacts", BusinessContact);
exports.default = Model;
//# sourceMappingURL=businessContact.js.map