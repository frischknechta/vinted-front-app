import { useState } from "react";
import "./PublishPage.css";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Dropzone from "../../components/Dropzone/Dropzone";

const PublishPage = ({ token }) => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);

    for (let i = 0; i < files.length; i++) {
      formData.append("picture", files[i]);
    }

    try {
      const response = await axios.post(
        "https://site--backend-vinted--79sf29g9cmjg.code.run/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Votre annonce a été publiée avec succès!");

      setFiles([]);
      setTitle("");
      setDescription("");
      setBrand("");
      setSize("");
      setColor("");
      setCondition("");
      setCity("");
      setPrice("");
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <div className="publishPage">
      <div className="wrapper publishContainer">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <Dropzone files={files} setFiles={setFiles} className="dropzone" />
          </fieldset>
          <fieldset>
            <label htmlFor="title">
              Titre
              <input
                type="text"
                name="title"
                id="title"
                placeholder="ex: Chemise Hugo Boss bleue"
                required
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </label>
            <label htmlFor="description">
              Décris ton article
              <input
                type="text"
                name="description"
                id="description"
                placeholder="ex: Portée une seule fois, taille petit"
                required
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="brand">
              Marque
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="ex: H&M"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </label>
            <label htmlFor="size">
              Taille
              <input
                type="text"
                name="size"
                id="size"
                placeholder="ex: L / 38 / 11"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </label>
            <label htmlFor="color">
              Couleur
              <input
                type="text"
                name="color"
                id="color"
                placeholder="ex: Violet"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </label>
            <label htmlFor="condition">
              Etat
              <input
                type="text"
                name="condition"
                id="condition"
                placeholder="ex: Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </label>
            <label htmlFor="city">
              Lieu
              <input
                type="text"
                name="city"
                id="city"
                placeholder="ex: Paris"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="price">
              Prix{" "}
              <input
                type="text"
                name="price"
                id="price"
                placeholder="0.00€"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </label>
            <label htmlFor="exchange" className="exchange">
              <input type="checkbox" name="exchange" id="exchange" /> Je suis
              intéressé(e) par les échanges
            </label>
          </fieldset>
          <button className="addButton">Ajouter</button>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default PublishPage;
