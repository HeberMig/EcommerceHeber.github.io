import { useState, useEffect, useContext } from "react";
import { getAllItemsService } from "@/Services/itemServices";
import { getUserService } from "../Services/userServices";
import { SearchContext } from "../Context/SearchContext";
import { useAuthContext } from "@/Hook/useAuthContext";
import "@/styles/card.css";
import { NavLink } from "react-router-dom";
import { CategoriesContext } from "../Context/CategoriesContex";

const Home = () => {
  const [itemList, setItemList] = useState([]); // llenamos el estado de productos
  const { searchQuery } = useContext(SearchContext); // Add const
  const { categoryFilter } = useContext(CategoriesContext); //Obt cat selecc del contexto
    const [userData, setUserData] = useState({})
    const token = localStorage.getItem("token");
  

    const { logout, isAuth, isAdmin } = useAuthContext();

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await getAllItemsService();
        if (response.status === 200) {
          setItemList(response.data);
        }
      } catch (error) {
        console.log("Ocurrio un error en Home", error);
      }
    };
    fetchItemData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserService(token);
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        console.log("Ocurrio un error en Dashboard", error);
      }
    };
    fetchUserData();
  }, [token]);

  // const filteredItems = itemList.filter((item) =>
  //   item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  // Filtra los productos por categoría y término de búsqueda
  const filteredItems = itemList.filter(
    (item) =>
      item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "" || item.category === categoryFilter)
  );

  return (
    <>
      <div className="saludo" style={{ paddingTop: "78px" }}>
        {isAuth ? (
          <h1 className="text-center">
            {userData.first_name + " " + userData.last_name} Bienvenido a tu
            ecommerce
          </h1>
        ) : (
          <div className="saludo2">
            <h1 className="text-center"> Bienvenid(a) a tu ecoomerce</h1>
          </div>
        )}
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-center mt-3" >
        {/* Si itemsData no esta vacio, recorro el arreglo con Map, y creo una card de bootstrap para cada elemento (producto/item) */}
        {/* {filteredItems && */}
          {filteredItems.map((product) => (
            <div
              className="card shadow border m-2"
              style={{ width: "18rem" }}
              key={product.id}
            >
              <img
                className="card-img-top img-fluid"
                style={{ maxHeight: "300px", objectFit: "cover", padding: "2px", backgroundColor: "yellow" }}
                src={product.image}
                alt={product.product_name}
              />
              <div className="card-body d-flex flex-column">
                <p className="card-text flex-grow-1 end">{product.category}</p>
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text flex-grow-1">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text flex-grow-1">${product.price}</p>
                  {/* Aquí no se implementa el boton, pero basta con sustituir <a> </a> por <NavLink> </NavLink>  react-router-dom y la ruta del enlace indicar el componente que mostrará la información de un solo producto, seguido del id del producto */}
                  {/* <a href="#" className="btn btn-primary align-self-end">
                    {" "}
                    comprar{" "}
                  </a> */}
                  <NavLink
                    href="#"
                    className="btn btn-primary"
                    to={`/product/${product.id}`}
                  >
                    Ver
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
