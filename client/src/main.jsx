import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Profile from "./pages/Profile.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LayoutSecond from "./pages/LayoutSecond.jsx";
import Blogs from "./pages/Blogs.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<App/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<Register/>} />
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/profile" element={<Profile/>} />
                    </Route>
                    <Route path="/blogs" element={<Blogs/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);

{/* <Route path="/" element={<Layout/>}>
<Route index element={
    // <ProtectedRoute>
        <App/>
    // </ProtectedRoute> 
} />
<Route path="/register" element={<Register/>} />
<Route path="/login" element={<Login/>} />
<Route path="/blogs" element={<Blogs/>} />
<Route element={<LayoutSecond/>}>
    <Route path="/profile" element={
        // <ProtectedRoute>
            <Profile/>
        // </ProtectedRoute>
    } />
</Route>
</Route> */}