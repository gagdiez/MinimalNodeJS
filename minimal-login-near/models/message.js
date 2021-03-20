const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model
const Message = new Schema({
  text:String,
  creator:String
})

const MessageModel = mongoose.model('messages', Message)


// Functions to interact with DB
function callback(error, success_answer, resolve){
  if(error){
    return resolve({success:false, error:error, response:null})
  }else{
    return resolve({success:true, error:null, response:success_answer})
  }
}

async function add_message(message){
  // Add a new message to the database
  return new Promise((resolve, reject)=>{  
    MessageModel.create(message, (e,s) => {callback(e, s, resolve)})
  })
}

async function get_message_with_id(id){
  // Get project with ID
  return new Promise((resolve, reject)=>{  
    MessageModel.find({_id:id}, (e,s) => {callback(e, s, resolve)})
  })
}

async function get_all_messages(){
  // Get all the existing messages
  return new Promise((resolve, reject)=>{  
    MessageModel.find({}, (e,s) => {callback(e, s, resolve)})
  })
}

async function delete_by_id(id){
  // Remove message by id
  return new Promise((resolve, reject)=>{
    MessageModel.findByIdAndRemove(id, (e,s) => {callback(e, s, resolve)})
  })
}

MessageModel.add_message = add_message
MessageModel.get_message_with_id = get_message_with_id
MessageModel.get_all_messages = get_all_messages
MessageModel.delete_by_id = delete_by_id

module.exports = MessageModel 
