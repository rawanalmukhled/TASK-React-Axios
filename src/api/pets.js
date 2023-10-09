import instance from ".";

const getAllPets = async () => {
  const res = await instance.get("/pets"); // https://pets-react-query-backen.herokuapp.com + /pets
  return res.data;
};

const getPetById = async (petId) => {
  const res = await instance.get(`/pets/${petId}`);
  return res.data;
};

const createPet = async (name, type, image, adopted) => {
  const res = await instance.post("/pets", {
    name: name,
    type: type,
    image: image,
    adopted: adopted,
  });
  return res.data;
};

export { getAllPets, getPetById, createPet };
