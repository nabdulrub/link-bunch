import { useFieldArray } from "react-hook-form";
import LinkForm from "../LinkForm";
import Dropdown from "../Dropdown";

const AddLinks = ({ form, remove, fields }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {
      errors: { password, email },
    },
  } = form;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((link, index) => (
        <LinkForm
          key={link.id}
          control={control}
          remove={remove}
          index={index}
        />
      ))}
    </form>
  );
};

export default AddLinks;
