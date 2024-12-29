import supabase, { supabaseUrl } from "./supabase";

function handleSupabaseError(error, message) {
  if (error) {
    throw new Error(message);
    
  }
}

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  handleSupabaseError(error, "Cabins could not be loaded");
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    handleSupabaseError(error, "Cabins could not be created");
  // Upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
    }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  handleSupabaseError(error, "Cabins could not be deleted");
  return data;
}
