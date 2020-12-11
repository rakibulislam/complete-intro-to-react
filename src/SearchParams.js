import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import { connect } from "react-redux";
import useDropdown from "./useDropdown";
import Results from "./Results";

import changeLocation from "./actionCreator/changeLocation";
import changeTheme from "./actionCreator/changeTheme";
import changeTextBackgroundColor from "./actionCreator/changeTextBackgroundColor";

const SearchParams = ({ theme, location, textBackgroundColor, setTheme, updateLocation, setTextBackgroundColor }) => {
  // const SearchParams = (props) => {
  const [breeds, updateBreeds] = useState([]);
  const [pets, setPets] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    console.log("animals", animals);

    setPets(animals || []);
  }

  useEffect(() => {
    updateBreeds([]);
    updateBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      updateBreeds(breedStrings);
    }, console.error);
  }, [animal]);

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="location">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>

      <label htmlFor="text background color">
          Pick text background color:
          <select
            value={textBackgroundColor}
            onChange={e => setTextBackgroundColor(e.target.value)}
            onBlur={e => setTextBackgroundColor(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>

      <div style={{ backgroundColor: textBackgroundColor }}>
        Hello, Redux!
      </div>

      <Results pets={pets} />
    </div>
  );
};

// props.location, props.textBackgroundColor
const mapStateToProps = ({ theme, location, textBackgroundColor }) => ({
  theme,
  location,
  textBackgroundColor
});

// setting data to redux store
const mapDispatchToProps = dispatch => ({
  updateLocation: location => dispatch(changeLocation(location)), // { type: 'XYZ', payload: 'blue' }
  setTheme: theme => dispatch(changeTheme(theme)),
  setTextBackgroundColor: textBackgroundColor => dispatch(changeTextBackgroundColor(textBackgroundColor)) // { type: "CHANGE_TEXT_BACKGROUND_COLOR", payload: 'darkblue' }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchParams);
