import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOneItemService } from "@/Services/itemServices";
import Swal from "sweetalert2";




const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await getOneItemService(id);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.log("Error fetching product data", error);
      }
    };

    fetchProductData();
  }, [id]);

 



  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="container mt-5" style={{ paddingTop: "78px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={product.image}
                  alt={product.product_name}
                  className="img-fluid rounded-start"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="card-text">Descripción: {product.description}</p>
                  <p className="card-text">Marca: {product.brand}</p>
                  <p className="card-text">Categoría: {product.category}</p>
                  <p className="card-text">
                    <small className="text-muted">Precio: ${product.price}.00</small>
                  </p>
                  <div className="text-end">
                  {redirecting ? (
                    <div>
                      cargando...
                    </div>
                    
                  ): (
                  <Link to="/"
                  className="btn btn-primary me-2"
                  
                  >
                    Volver
                  </Link>
                  )}
                  
                  <button
                  className="btn btn-primary"
                  >
                    Agregar al carrito</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default Product;