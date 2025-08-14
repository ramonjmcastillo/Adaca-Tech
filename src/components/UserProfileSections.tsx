import { Tag } from "primereact/tag";
import { Fieldset } from "primereact/fieldset";
import type { User } from "../types/user";

export function UserContact({ user }: { user: User }) {
  return (
    <>
      <Tag value="Contact" severity="info" />
      <Fieldset
        className="mb-3"
        legend={<span className="hidden">Contact</span>}
        toggleable={false}
      >
        <Tag icon="pi pi-envelope" value={user?.email} className="mr-2" />
        <Tag icon="pi pi-phone" value={user?.phone} className="mr-2" />
        <Tag icon="pi pi-globe" value={user?.website} />
      </Fieldset>
    </>
  );
}

export function UserCompany({ user }: { user: User }) {
  return (
    <>
      <Tag value="Company" severity="info" />
      <Fieldset
        legend={<span className="hidden">Company</span>}
        toggleable={false}
      >
        <span>{user?.company?.catchPhrase}</span>
        <span className="text-sm text-color-secondary">
          {user?.company?.bs}
        </span>
      </Fieldset>
    </>
  );
}

export function UserAddress({ user }: { user: User }) {
  return (
    <>
      <Tag value="Address" severity="info" />
      <Fieldset
        legend={<span className="hidden">Address</span>}
        toggleable={false}
      >
        {user?.address?.street}, {user?.address?.suite},<br />
        {user?.address?.city}, {user?.address?.zipcode}
      </Fieldset>
    </>
  );
}
