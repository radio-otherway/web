const removeUndefinedProperties = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
export { removeUndefinedProperties };
