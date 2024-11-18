import React from 'react';
import { Link } from 'react-router-dom';
import categoryData from '../../utils/categoryData';
import styles from './Categories.module.css';

// Categories functional component
const Categories = () => {

  return (

    // Main container for the categories
    <div className={styles.categories_container}>
      <div className={styles.categories}>

        {/* Looping through the category data to dynamically generate category cards */}
        {categoryData.map((data) => (
          <Link to={`/category/${data.name}`} key={data.id} className={styles.category}>
            <p className={styles.category_title}>{data.title}</p>
            <img src={data.image} alt="category" />
            <p className={styles.category_text}>Shop now</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories