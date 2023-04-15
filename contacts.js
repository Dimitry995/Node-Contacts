//const fs = require('fs').promises;
//const path = require('path').promises;
//const info = msg => {
//    console.log(`Info: ${msg}`);
//  };
//  
//  const log = msg => {
//    console.log(`Log: ${msg}`);
//  };
//  
//  module.exports = {
//    info,
//    log,
//  };
// let contactsPath = require('./db/contacts.json');
// function listContacts() {
//    contactsPath.map(users => user {
//        return (
//            <section className="list">
//            <ul>
//            <li>
//            <h1>{user.id}</h1>
//            <h2>{user.name}</h2>
//            <h3>{user.email}</h3>
//            <h4>{user.phone}</h4>
//            </li>
//            </ul>
//            </section>
//        )
//    })
//  }
//  
//  function getContactById(contactId) {
//    // ...твой код
//  }
//  
//  function removeContact(contactId) {
//    // ...твой код
//  }
//  
//  function addContact(name, email, phone) {
//    // ...твой код
//  }
//
  const fs = require("fs/promises");
const { contactsPath } = require("./db");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const contact = contactList.find((item) => item.id === contactId.toString());
  return contact || null;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const rcindex = contactList.findIndex(
    (item) => item.id === contactId.toString()
  );
  if (rcindex === -1) return null;
  const [res] = contactList.splice(rcindex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return res;
};

const addContact = async (name, email, phone) => {
  const contactList = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};