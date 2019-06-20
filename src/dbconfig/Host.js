

import mongoose from "mongoose";
import { ObjectID } from "mongodb";
import { FieldBase } from "protobufjs";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const HostSchema = new Schema({
  id: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
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
  }
});

export default mongoose.model("Host", HostSchema);
