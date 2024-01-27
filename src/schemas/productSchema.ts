import * as yup from 'yup';  

export const productSchema = yup.object({
    Name: yup.string().required('Nome é obrigatório'),
    Value: yup.number().required('Valor é obrigatório'),
    Amount: yup.number().required('Quantidade é obrigatória').default(0),
    Description: yup.string().required('Descrição é obrigatória'),
    Photo: yup.string(),
  });