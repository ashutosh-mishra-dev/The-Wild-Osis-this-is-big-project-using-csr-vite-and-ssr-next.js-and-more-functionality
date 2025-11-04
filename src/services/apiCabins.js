import supabase from "./supabase";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// 1. fetch all data from database
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// 2. insert and update data
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // unique image name (avoid folder creation due to '/')
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // bucket URL + image name
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Query Builder (insert or update)
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  else query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  //  Common Select + Error Handling
  const { data, error } = await query.select().single();
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(
      id ? "Cabin could not be updated" : "Cabin could not be inserted"
    );
  }

  // — Upload Image Only If It’s New
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error("Storage upload failed:", storageError);
      throw new Error(
        "Cabin image could not be uploaded, and cabin was not created."
      );
    }
  }
  return data;
}

//3. delete data in to database via cabin id
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
