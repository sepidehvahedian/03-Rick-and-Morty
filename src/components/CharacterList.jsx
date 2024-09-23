import { EyeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Loader from "./loader";

function CharacterList({ characters, isLoading, error }) {
  if (isLoading)
    return (
      <div className="characters-list">
        <Loader />
      </div>
    );

  if (error) {
    return (
      <div className="characters-list">
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CharacterList;

const Character = ({ item }) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      <button className="icon red">
        <EyeIcon />
      </button>
    </div>
  );
};

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender == "Male" ? "👨" : "👩"}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status == "Dead" ? "red" : ""}`}></span>
      <span> {item.status} </span>
      <span> - {item.species}</span>
    </div>
  );
}
