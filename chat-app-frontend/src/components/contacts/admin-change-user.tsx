/* eslint-disable @typescript-eslint/no-explicit-any */
import ListContacts from "./list-contact";

export default function ChangeLoggedInUser({
  loggedInContact,
  setLoggedInContact,
}: any) {
  return (
    <div className="flex-grow border-l border-gray-600 h-full w-full flex flex-col overflow-hidden">
      <ListContacts
        loggedInContact={loggedInContact}
        setLoggedInContact={setLoggedInContact}
      />
    </div>
  );
}
