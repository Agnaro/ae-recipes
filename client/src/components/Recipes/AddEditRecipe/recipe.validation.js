export function checkName(name) {
  return name !== "";
}

export function checkDesc(desc) {
  return desc.length <= 200;
}

export function checkAll(recipe) {
  return checkName(recipe.name) && checkDesc(recipe.desc);
}
