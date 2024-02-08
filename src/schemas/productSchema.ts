import * as Yup from 'yup'
import { TypedRequest } from '../util/typedRequest'

export const productSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  value: Yup.number().required('Valor é obrigatório'),
  amount: Yup.number().required('Quantidade é obrigatória').default(0),
  description: Yup.string().required('Descrição é obrigatória'),
  photo: Yup.string(),
})

export namespace CreateProducts {
  export type BodyType = TypedRequest<typeof productSchema>
  export const schema = Yup.object().shape({ body: productSchema })
}
