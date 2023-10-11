import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { deletePetById, getPetById, updatePetById } from "../api/pets";
const PetDetail = () => {
  const { petId } = useParams();
  // const [pet, setPet] = useState({});

  // const callApi = async () => {
  //   const res = await getPetById(petId);
  //   setPet(res);
  // };

  // useEffect(() => {
  //   callApi();
  // }, []);

  // const pet = petsData.find((pet) => {
  //   return pet.id == petId;
  // // });
  // if (!pet) {
  //   return <h1>There is no pet with the id: {petId}</h1>;
  // }

  const { data: pet, isLoading } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => getPetById(petId),
  });

  const queryClient = useQueryClient();
  const { mutate: updatePet } = useMutation({
    mutationKey: ["updatePet"],
    mutationFn: () => updatePetById(petId, pet.name, pet.type, pet.image),
    onSuccess: () => queryClient.invalidateQueries(["pet"]),
  });

  const { mutate: DeletePet } = useMutation({
    mutationKey: ["deletePet"],
    mutationFn: () => deletePetById(petId),
    onSuccess: () => queryClient.invalidateQueries(["pet"]),
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="bg-[#F9E3BE] w-screen h-[100vh] flex justify-center items-center">
      <div className="border border-black rounded-md w-[70%] h-[70%] overflow-hidden flex flex-col md:flex-row p-5">
        <div className="h-full w-full md:w-[35%]">
          <img
            src={pet.image}
            alt={pet.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full md:w-[65%] h-full pt-[30px] flex flex-col p-3">
          <h1>Name: {pet.name}</h1>
          <h1>Type: {pet.type}</h1>
          <h1>adopted: {pet.adopted}</h1>

          <button
            className="w-[70px] border border-black rounded-md  hover:bg-green-400 mb-5"
            onClick={updatePet}
          >
            Adopt
          </button>

          <button
            className="w-[70px] border border-black rounded-md  hover:bg-red-400"
            onClick={DeletePet}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
