/* eslint-disable @typescript-eslint/no-explicit-any */
import { contacts } from "./contacts";

export default function ListContacts({
  loggedInContact,
  setLoggedInContact,
}: any) {
  return (
    <div className="flex flex-col flex-grow h-full overflow-auto">
      {contacts.map(
        ({ avatar, message, name }) =>
          loggedInContact.avatar !== avatar && (
            <div
              key={avatar}
              className={`p-3 hover:bg-primary-medium-dark cursor-pointer`}
            >
              <div
                className="flex items-center space-x-3"
                onClick={() => setLoggedInContact({ name, avatar, message })}
              >
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
  );
}
