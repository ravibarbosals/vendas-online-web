export const InsertMaksInCEP = (cep: string) => {
  return cep.replace(/(\d{5})(\d)/g, '$1-$2');
};
