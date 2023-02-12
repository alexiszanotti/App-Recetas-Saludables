import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SearchBar.css";
import {
  fetchAllRecipes,
  fetchDiets,
  filterByDiet,
  orderByName,
  orderByRank,
  searchRecipeByName,
} from "../../Redux/slice";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const diet = useSelector(state => state.recipes.diets);

  const [name, setName] = useState("");

  function handleClick() {
    dispatch(fetchAllRecipes());
  }

  function handleFilterDiet(e) {
    dispatch(filterByDiet(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
  }

  function handleRank(e) {
    dispatch(orderByRank(e.target.value));
    setCurrentPage(1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchRecipeByName(name));
    setName("");
    setCurrentPage(1);
  }

  useEffect(() => {
    diet.length === 0 && dispatch(fetchDiets());
  }, [dispatch, diet]);

  return (
    <div className='container-nav'>
      <button className='button-search' onClick={handleClick}>
        <i className='fas fa-sync-alt'></i>
      </button>
      <form className='form' onClick={e => handleSubmit(e)}>
        <input
          className='input-search'
          onChange={e => setName(e.target.value)}
          value={name}
          type='text'
          placeholder='Search recipe...'
        />

        <button type='submit' className='button-search'>
          <i className='fas fa-search'></i>
        </button>
      </form>
      <select className='input-search' onChange={e => handleFilterDiet(e)}>
        <option value='all'>Diets</option>
        {diet?.map(el => {
          return (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          );
        })}
      </select>

      <select className='input-search' onChange={e => handleSort(e)}>
        <option value='all'>Order by </option>
        <option value='asc'>A - Z </option>
        <option value='des'>Z - A</option>
      </select>
      <select className='input-search' onChange={e => handleRank(e)}>
        <option value=''>Order by </option>
        <option value='all'>Score -</option>
        <option value='score'>Score +</option>
      </select>

      <Link className='link' to='/recipe'>
        Create your recipe
      </Link>
    </div>
  );
}
