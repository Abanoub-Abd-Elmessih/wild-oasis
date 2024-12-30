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

export async function createEditCabin(newCabin, id) {
  const hasImagePath =newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath =hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // Create
  if (!id) query= query.insert([{ ...newCabin, image: imagePath }]);

  // Edit
  if (id)
    query= query
      .update({ ...newCabin, image: imagePath})
      .eq("id", id)
      .select();
  const { data, error } = await query.select().single();
  handleSupabaseError(error, "Cabins could not be created");

  // Upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  handleSupabaseError(error, "Cabins could not be deleted");
  return data;
}
