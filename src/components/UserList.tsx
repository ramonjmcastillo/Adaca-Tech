import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";
import { fetchAllUsers } from "../api/users";
import { DataTable } from "primereact/datatable";
import type { DataTableRowEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Card
        className="mt-5 w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full mx-auto"
        title="Loading..."
      />
    );
  if (error)
    return (
      <Card
        className="mt-5 w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full mx-auto text-red-600"
        title="Error"
      >
        {error}
      </Card>
    );

  return (
    <Card className="mt-5 w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full mx-auto">
      <Divider align="left">
        <Tag value="User List" severity="info" />
      </Divider>
      <DataTable
        value={users}
        paginator
        rows={5}
        stripedRows
        onRowClick={(e: DataTableRowEvent) =>
          navigate(`/users/${(e.data as User).id}`)
        }
        className="cursor-pointer"
      >
        <Column field="id" header="ID" sortable style={{ width: "80px" }} />
        <Column field="name" header="Name" sortable />
        <Column field="username" header="Username" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="phone" header="Phone" />
        <Column field="website" header="Website" />
        <Column field="company.name" header="Company" />
      </DataTable>
    </Card>
  );
};

export default UserList;
