/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChangeEvent, useRef, useState } from "react";
import { contacts } from "./contacts";

type ChatType = "All" | "Unread" | "Groups";
type SearchArrow = "search" | "arrow_back";

const chatTypes: ChatType[] = ["All", "Unread", "Groups"];
export default function ChatHome({
  activeContact,
  setActiveContact,
  loggedInContact,
}: any) {
  const [chatType, setChatType] = useState<ChatType>("All");

  const [searchOrRightArrow, setSearchOrRightArrow] =
    useState<SearchArrow>("search");
  const [filteredContacts, setFilteredContacts] = useState<null | any[]>(null);
  const [allContacts, setAllContacts] = useState([...contacts]);

  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchContacts = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value.length) {
      setFilteredContacts(null);
      setAllContacts([...contacts]);
      return;
    }

    const searchResult = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredContacts(searchResult);
  };

  return (
    <div className="flex-grow border-l border-gray-600 h-full w-full flex flex-col overflow-hidden">
      <div className="flex w-full justify-between">
        <h1 className="ml-10 mt-4 font-extrabold text-2xl">Chats</h1>
        <div className="px-10 space-x-8 mt-4">
          <span className="material-symbols-rounded">add_box</span>
          <span className="material-symbols-rounded">more_vert</span>
        </div>
      </div>

      <div className="mt-3 w-full p-3">
        <div className="bg-primary flex rounded-md">
          <span
            className={`ml-4 mt-2 material-symbols-rounded hover:cursor-pointer ${
              searchOrRightArrow === "arrow_back" && "text-light-green"
            }`}
            onClick={() => {
              if (isFocused) {
                inputRef.current?.blur();
              } else {
                setSearchOrRightArrow("arrow_back");
                inputRef.current?.focus();
              }
            }}
          >
            {searchOrRightArrow}
          </span>
          <input
            ref={inputRef}
            onFocus={() => {
              setSearchOrRightArrow("arrow_back");
              setIsFocused(true);
            }}
            onBlur={() => {
              setSearchOrRightArrow("search");
              setIsFocused(false);
            }}
            className="px-8 h-10 w-full bg-transparent focus:outline-none"
            placeholder="Search"
            onChange={handleSearchContacts}
          />
        </div>
      </div>

      <div className="h-16 w-full flex space-x-3 px-3.5">
        {chatTypes.map((type) => (
          <div key={type}>
            <button
              onClick={() => setChatType(type)}
              className={`${
                chatType === type
                  ? "bg-dark-green text-light-green"
                  : "bg-primary"
              } h-10 w-20 rounded-3xl`}
            >
              {type}
            </button>
          </div>
        ))}
      </div>

      {/* Contact listing */}
      <div className="flex flex-col flex-grow h-full overflow-auto">
        {filteredContacts
          ? filteredContacts.map(({ avatar, message, name }) => (
              <div
                key={avatar}
                className={`${
                  activeContact.name === name && "bg-primary-charcoal"
                } p-3 hover:bg-primary-medium-dark cursor-pointer`}
                onClick={() => setActiveContact({ avatar, message, name })}
              >
                <div className="flex items-center space-x-3">
                  <img
                    className="h-14 w-14 rounded-full"
                    src={avatar}
                    alt="avatar"
                  />
                  <div>
                    <h1 className="font-extrabold text-xl">{name}</h1>
                    <p className="text-gray-400">{message}</p>
                  </div>
                </div>
              </div>
            ))
          : allContacts.map(
              ({ avatar, message, name, conversations }) =>
                loggedInContact.avatar !== avatar && (
                  <div
                    key={avatar}
                    className={`${
                      activeContact.name === name && "bg-primary-charcoal"
                    } p-3 hover:bg-primary-medium-dark cursor-pointer`}
                    onClick={() =>
                      setActiveContact({ avatar, message, name, conversations })
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        className="h-14 w-14 rounded-full"
                        src={avatar}
                        alt="selected avatar"
                      />
                      <div>
                        <h1 className="font-extrabold text-xl">{name}</h1>
                        <p className="text-gray-400">{message}</p>
                      </div>
                    </div>
                  </div>
                )
            )}
      </div>
    </div>
  );
}
