import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';


function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>A cozy welcome to the Pet Haven Hotel</h2>
      <p>Luxury and comfort meet here for your cherished companions. Here, every detail is crafted to ensure a serene and tranquil retreat, allowing your pets to relax in a sophisticated environment. We’re honored to be their home away from home.</p>
     
      <h3>Choose a Spa Package:</h3>
      {categories.map((item) => (
        <button 
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    
      <div>
       
      </div>
    </div>


  );
}

export default CategoryMenu;
