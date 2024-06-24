import Swal from "sweetalert2";
import { useState } from "react";
import { createItemService } from "@/Services/itemServices";
import { useAuthContext } from "@/Hook/useAuthContext";


export const CreateProduct = () => {
  const { userPayload, isAuth } = useAuthContext();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuth || !userPayload) {
      setError("Debes de iniciar sesión para crear un producto.");
      return;
    }

    // Validar que todos los campos estén llenos
    if (
      !productName ||
      !description ||
      !price ||
      !category ||
      (!image && !imageUrl)
    ) {
      setError("Por favor, llene todos los campos.");
      return;
    }

    const productData = {
      product_name: productName,
      description,
      price,
      category,
      image: image || imageUrl,
    };

    try {
      await createItemService(productData, localStorage.getItem("token"));
      // alert("Product creado exitosamente!");
      Swal.fire({
        icon: 'success',
        title: 'Producto creado exitosamente!',
        showConfirmButton: false,
        timer: 1500
      })
      setProductName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");
      setImageUrl("");
      setError(null);
    } catch (error) {
      console.error("Error al craer el producto:", error);
      // alert("Error al crear producto.");
      Swal.fire({
        icon: 'error',
        title: 'Error al crear producto',
        text: 'Hubo un problema al intenter creal el producto',
      });
    }
  };

  //Insertamos imagen  desde local
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      setImageUrl("");
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  //Termina

  return (
    <div className="container mt-5" style={{ paddingTop: "40px" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Agregar Producto</h1>
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Nombre del Producto:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descripción:
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Precio:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Categoría:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Imagen del Producto:
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="URL de la imagen"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImage("");
                    }}
                  />

                  {image && (
                    <img
                      src={image}
                      alt="Producto"
                      className="img-fluid mt-3"
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                  {imageUrl && !image && (
                    <img
                      src={imageUrl}
                      alt="Producto"
                      className="img-fluid mt-3"
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Crear Producto
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
