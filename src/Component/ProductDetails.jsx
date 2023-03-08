import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const getUsers = (id) => {
    return fetch("https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products/"+ id)
    .then((res) => res.json());
  };
 export const ProductDetails = () => {
    const [data, setData] = useState([]);
    const params = useParams();

    useEffect(() => {
      getUsers(params.id).then((res) => {
        setData(res.data);
      });
    },[params.id]);
    console.log(data)

  return (
    <div>ProductDetails</div>

  )
}

