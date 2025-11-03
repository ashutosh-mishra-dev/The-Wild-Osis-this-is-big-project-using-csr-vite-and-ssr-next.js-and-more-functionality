import supabase from "./supabase";

// fetch all data from database
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// insert new  data in database
export async function CreateCabin(newCabin) {
  console.log("check in api :", newCabin.image.name);

  // agar kisi image name me / (slash) aa jaye (ex. house/001/2.jpg) to supabase ko / milte hi vo house name se folder bna dega.
  // to uska solution h replaceAll("/"," ") matlab jha slash / mile vha kuch bhi mat karo
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // ham ab yha image ka path banayenge supabase database ke table aur jo storage ke andar bucket banaya h vha save karne ke liye

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //${supabaseUrl}/storage/v1/object/public/cabin-images/ ye supabase ka bucket ka url hai

  //1. create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be inserted");
  }

  //2. upload image in supabase storage/cabin-image bucket.
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. delete cabin : ab ye yha es liye kiya ja rha h kyuki kisi karan bas image upload nhi hua bucket me to upar jo data insert kra rhe h vo bina image ke data insert ho jayega lekin aisa hona chahiye nhi bina image upload ke to esliye yha phir se delete operation ko perform karenge.

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded, and cabin was not created."
    );
  }
  return data;
}

//delete data in to database via cabin id
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
