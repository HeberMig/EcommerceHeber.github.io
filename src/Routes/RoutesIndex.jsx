// Implementar react-router-dom
import { Routes, Route } from "react-router-dom";
import Categories from "@/Components/Categories";
import { Home, Dashboard, Login, Secret, Signup, Product, CreateProduct, NotFound } from "@/Pages";
import { useAuthContext } from "@/Hook/useAuthContext";

const RoutesIndex = () => {
  const { isAuth, isAdmin } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/secret" element={isAuth ? <Secret /> : <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="categories/:id" element={<Categories/>} />
      {isAdmin && <Route path="/create-product" element={<CreateProduct />} />}
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  );
};

export default RoutesIndex;
