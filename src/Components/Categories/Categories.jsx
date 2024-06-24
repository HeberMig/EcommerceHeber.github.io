// import React, { useState, useEffect, useContext } from "react";
// // import { useParams } from "react-router-dom";
// import axios from "axios"; // Importa axios para usarlo en este archivo
// import { CategoriesContext } from "../../Context/CategoriesContex";
// // import { useAuthContext } from "@/Hook/useAuthContext";
// // import { NavLink } from "react-router-dom";

// const BASE_URL = 'https://ecommerce-json-jwt.onrender.com';

// export const Categories = () => {
//   const [itemList, setItemList] = useState([]);
//   const { categoryFilter, setCategoryFilter } = useContext(CategoriesContext);
//   // const { id } = useParams(); // Obtener el parámetro id de la URL
//   // const { logout, isAuth, isAdmin } = useAuthContext();

//   useEffect(() => {
//     const fetchItemData = async () => {
//       try {
//         let url = `${BASE_URL}/items`;
//         if (categoryFilter) {
//           url += `?category=${categoryFilter}`;
//         }
//         const response = await axios.get(url);
//         if (response.status === 200) {
//           setItemList(response.data);
//         }
//       } catch (error) {
//         console.log("Ocurrió un error", error);
//       }
//     };
//     fetchItemData();
//   }, [categoryFilter]); // Ajusta las dependencias del efecto

//   const handleCategorySelect = (event) => {
//     const selectedCategory = event.target.value;
//     setCategoryFilter(selectedCategory);
//   };

//   // Obtener las categorías únicas de los productos
//   const categories = [...new Set(itemList.map((item) => item.category))];

//   return (
//     <div className="categories">
//       <select className="btn btn-secondary dropdown-toggle" value={categoryFilter} onChange={handleCategorySelect}>
//         <option value="">Todo</option>
//         {categories.map((category) => (
//           <option key={category} value={category}>
//             {category}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Categories;


import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CategoriesContext } from "../../Context/CategoriesContex";

const BASE_URL = 'https://ecommerce-json-jwt.onrender.com';

const Categories = () => {
  const [localItemList, setLocalItemList] = useState([]);
  const { categoryFilter, setCategoryFilter } = useContext(CategoriesContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items`);
        if (response.status === 200) {
          const data = response.data;
          setLocalItemList(data);
        }
      } catch (error) {
        console.log("Ocurrió un error", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (event) => {
    const selectedCategory = event.target.value;
    setCategoryFilter(selectedCategory);
  };

  const categories = [...new Set(localItemList.map((item) => item.category))];

  return (
    <div className="categories">
      <select className="btn btn-secondary dropdown-toggle" value={categoryFilter} onChange={handleCategorySelect}>
        <option value="">Todo</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categories;
