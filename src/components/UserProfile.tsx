import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Panel } from "primereact/panel";
import { UserContact, UserCompany, UserAddress } from "./UserProfileSections";

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
        subTitle={<span>{user.username}</span>}
      >
        <Divider align="left">
          <UserContact user={user} />
        </Divider>
        <Divider align="left">
          <UserCompany user={user} />
        </Divider>
        <Panel header={user.company.name} className="mb-3"></Panel>
        <Divider align="left">
          <UserAddress user={user} />
        </Divider>
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
