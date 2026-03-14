
export const fetchDogs = async () => {
  const response = await fetch(
    "https://dog.ceo/api/breeds/image/random"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dog");
  }

  const data = await response.json();

  const imageUrl: string = data.message;

  // Extract breed from URL
  const rawBreed = imageUrl.split("/breeds/")[1].split("/")[0];

  // Format breed name
  const breed = rawBreed
    .split("-")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return {
    image: imageUrl,
    breed,
  };
};
