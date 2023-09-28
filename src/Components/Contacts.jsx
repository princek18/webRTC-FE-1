/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Contact } from "./Contact";
import { Chat } from "./Chat";
import { ContactsHeader } from "./ContactsHeader";
import { AppDataProvider } from "../Context/AppContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AddContactsModal } from "./AddContactsModal";

export const Contacts = () => {
  const { useContacts, useSelectedChat, useAddContactModel } =
    useContext(AppDataProvider);
  const [contacts] = useContacts;
  const [selectedChat, setSelectedChat] = useSelectedChat;
  const [_, setOpenAddContactModel] = useAddContactModel;

  const openChat = (data) => {
    setSelectedChat(data);
  };

  const handleAddContact = () => {
    setOpenAddContactModel(true);
  };

  return (
    <div id="contacts-wrapper">
      <div id="contacts">
        <ContactsHeader />
        <IoIosAddCircleOutline onClick={handleAddContact} id="contacts-add" />
        <div id="contact-cards">
          {
            contacts &&
              contacts.length > 0 &&
              contacts.map((contact, indx) => {
                return (
                  <Contact openChat={openChat} data={contact} key={indx} />
                );
              })
            // <div style={{ width: "1000px" }}></div>
          }
        </div>
      </div>
      <div id="chat">
        <Chat data={selectedChat} />
      </div>
      <AddContactsModal />
    </div>
  );
};
