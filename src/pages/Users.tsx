import React, { useEffect, useState } from "react";
import Table from "../components/TableComponent";

type user = {
  username: string;
  email: number;
  city: number;
  actions: action[];
};
type action = {
  id: string;
  name: string;
}



const Users: React.FC = () => {

const [result, setResult] = useState<user[]>([]);

const columns = [
  {
    key: "username" as const,
    title: "Bathrooms",
  },
  {
    key: "email" as const,
    title: "Bedrooms",
  },
  {
    key: "city" as const,
    title: "Floor Number",
  },
  {
    key: "actions" as const,
    title: "Actions",
    render: (currentRow: user) =>  <>
    {currentRow.actions.map((action) => (
      <button key={action.id}>{action.name}</button>
    ))}
  </>
  },
]

useEffect(() => {
  const api = async () => {
    const data = await fetch("http://localhost:3002/guests", {
      method: "GET"
    });
    const jsonData = await data.json();
    setResult(jsonData);
  };

  api();
}, []);
return (

  <Table columns={columns} data={result}></Table>
)}

export default Users;