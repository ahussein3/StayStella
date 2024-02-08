import React, { useEffect, useState } from "react";
import Table from "../components/TableComponent";


type property = {
  propertyID: string;
  bedrooms: number;
  floorNumber: number;
  bathrooms: number;
  url: url;
  img: string;
};
type url = {
  address: string;
  text: string;
}



const Hotels: React.FC = () => {
const [result, setResult] = useState<property[]>([]);

const columns = [
  {
    key: "propertyID" as const,
    title: "Property ID",
    render: (currentRow: property) => (
      <a href={currentRow.propertyID}>{currentRow.propertyID}</a>
    ),
  },
  {
    key: "bathrooms" as const,
    title: "Bathrooms",
  },
  {
    key: "bedrooms" as const,
    title: "Bedrooms",
  },
  {
    key: "floorNumber" as const,
    title: "Floor Number",
  },
  {
    key: "url" as const,
    title: "Url",
    render: (currentRow: property) => (
      <a href={currentRow.url.address}>{currentRow.url.text}</a>
    ),
  },
  {
    key: "img" as const,
    title: "Picture",
    render: (currentRow: property) => (
      <img width={100} height={50} src={currentRow.img}/>
    ),
  },
]

useEffect(() => {
  const api = async () => {
    const data = await fetch("http://localhost:3002/properties", {
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

export default Hotels;