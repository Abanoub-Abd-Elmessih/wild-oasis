import supabase from "./supabase";

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
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();
  handleSupabaseError(error, "Cabins could not be created");
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  handleSupabaseError(error, "Cabins could not be deleted");
  return data;
}
