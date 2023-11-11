import { useState } from "react";
import Button from "../Button";
import AddLinks from "./AddLinks";
import NoLinks from "./NoLinks";
import { useFieldArray, useForm } from "react-hook-form";

const Links = () => {
  const [isAdding, setIsAdding] = useState(false);

  const form = useForm({
    defaultValues: {
      links: [
        {
          platform: "",
          link: "",
        },
      ],
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  return (
    <div className="h-full flex-1 rounded-xl bg-white">
      <div className="p-2 md:p-10 flex flex-col gap-6">
        <div className="flex flex-col gap-10 md:gap-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <p className="text-2xl md:text-4xl font-bold">
              Customize your links
            </p>
            <p className="text-gray-500">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>
          <Button
            variant="outline"
            className={"w-full justify-center text-xl md:text-base"}
            onClick={append}
          >
            + Add new link
          </Button>
        </div>
        <AddLinks remove={remove} form={form} fields={fields} />
        {/* <NoLinks /> */}
      </div>
      <span className="block w-full h-1 bg-gray-100" />
      <div className="px-6 py-3 flex w-full items-center justify-end">
        <Button variant="default" disabled>
          Save
        </Button>
      </div>
    </div>
  );
};

export default Links;
