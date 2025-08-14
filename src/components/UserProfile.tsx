import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { Panel } from "primereact/panel";
import { Fieldset } from "primereact/fieldset";
import type { User } from "../types/user";
import { fetchUserById } from "../api/user";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchUserById(id)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <Panel
        header="Loading..."
        className="mx-auto mt-5 w-full sm:w-8 md:w-6 lg:w-4"
      />
    );
  if (error)
    return (
      <Panel
        header="Error"
        className="mx-auto mt-5 w-full sm:w-8 md:w-6 lg:w-4 text-red-600"
      >
        {error}
      </Panel>
    );
  if (!user)
    return (
      <Panel
        header="No user found"
        className="mx-auto mt-5 w-full sm:w-8 md:w-6 lg:w-4"
      />
    );

  return (
    <div className="w-full sm:w-8 md:w-6 lg:w-4 mx-auto mt-5">
      <Card
        title={user.name}
        className="mb-3"
        subTitle={<Tag value={user.username} severity="info" />}
      >
        <Divider align="left">
          <Tag value="Contact" severity="info" />
        </Divider>
        <Fieldset
          className="mb-3"
          legend={<span className="hidden">Contact</span>}
          toggleable={false}
        >
          <Tag icon="pi pi-envelope" value={user.email} className="mr-2" />
          <Tag icon="pi pi-phone" value={user.phone} className="mr-2" />
          <Tag icon="pi pi-globe" value={user.website} />
        </Fieldset>
        <Divider align="left">
          <Tag value="Company" severity="info" />
        </Divider>
        <Panel header={user.company.name} className="mb-3">
          <Fieldset
            legend={<span className="hidden">Company</span>}
            toggleable={false}
          >
            <span>{user.company.catchPhrase}</span>
            <span className="text-sm text-color-secondary">
              {user.company.bs}
            </span>
          </Fieldset>
        </Panel>
        <Divider align="left">
          <Tag value="Address" severity="info" />
        </Divider>
        <Panel className="mb-3">
          <Fieldset
            legend={<span className="hidden">Address</span>}
            toggleable={false}
          >
            {user.address.street}, {user.address.suite},<br />
            {user.address.city}, {user.address.zipcode}
          </Fieldset>
        </Panel>
      </Card>
      <Button
        label="Back to User List"
        icon="pi pi-arrow-left"
        onClick={() => navigate("/users")}
      />
    </div>
  );
};

export default UserProfile;
