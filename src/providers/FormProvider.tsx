import type { CSSProperties, ReactNode } from "react";
// form
import { FormProvider as Form, } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: () => void;
  style?: CSSProperties;
  id?: string;
  className?: string
};

const FormProvider = ({ children, className, onSubmit, methods, style, id }: Props) => (
  <Form {...methods}>
    <form {...{ className }} {...{ id }} {...{ style }} onSubmit={onSubmit}>
      {children}
    </form>
  </Form>
);

export default FormProvider;
