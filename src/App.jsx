import { BrowserRouter } from "react-router-dom";
import RoutesIndex from "@/Routes/RoutesIndex";
import Header from "@/Components/Header";
import { AuthProvider } from "@/Context/AuthContext";
import { SearchProvider } from "./Context/SearchContext";
import { CategoriesProvider } from "./Context/CategoriesContex";
// import Categories from "./Components/Categories";


function App() {
  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <CategoriesProvider>
          <BrowserRouter>
            <Header />
            {/* <Categories/> */}
            <RoutesIndex />
          </BrowserRouter>
          </CategoriesProvider>
        </SearchProvider>
      </AuthProvider>
    </>
  );
}

export default App;
