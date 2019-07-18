

import mongoose from "mongoose";
import { ObjectID } from "mongodb";
import { FieldBase } from "protobufjs";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const ChildSchema = new Schema({
  id: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
      type: String,
      required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  streetAddress: {
    type: String,
    required: false
  },
  parentOrGuardian: [ String ]
});

export default mongoose.model("Child", ChildSchema);
