const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  } = require("./contacts");
  const argv = require("yargs").argv;
  async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "list":
        const contactsList = await listContacts();
        return console.log(contactsList);
        break;
  
      case "get":
        const contact = await getContactById(id);
        return console.log(contact);
        break;
  
      case "add":
        const addedContact = await addContact(name, email, phone);
        return console.log(addedContact);
        break;
  
      case "remove":
        const removedContact = await removeContact(id);
        return console.log(removedContact);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }
  
  invokeAction(argv);
  