import React from 'react';
import {Route} from "react-router-dom"
import LoginAdmin from './loginAdmin';
import UsersList from './users/usersList';
import CategoriesList from './categories/categoriesList';
import AddCategoryForm from './categories/addCategoryForm';
import EditCategory from './categories/editCategory';
import FoodsList from './foods/foodsList';


export const adminRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/admin" element={<LoginAdmin />} />
      <Route path="/admin/users" element={<UsersList />} />
      <Route path="/admin/categories" element={<CategoriesList />} />
      <Route path="/admin/addCategory" element={<AddCategoryForm />} />
      <Route path="/admin/editCategory/:id" element={<EditCategory />} />
      <Route path="/admin/foods" element={<FoodsList />} />
    </React.Fragment>
  )
}