const cleanRelationIds = (input, relations = []) => {
  if (Array.isArray(input)) {
    return input.map((item) => cleanSingle(item, relations));
  }

  return cleanSingle(input, relations);
};

const cleanSingle = (data, relations) => {
  const jsonData = data.toJSON ? data.toJSON() : data;
  const cleaned = { ...jsonData };

  relations.forEach((relation) => {
    const key = `${relation}_id`;
    if (key in cleaned) {
      delete cleaned[key];
    }
  });

  return cleaned;
};

module.exports = { cleanRelationIds };
