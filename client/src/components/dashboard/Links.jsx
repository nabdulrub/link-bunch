import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useLinks } from "../../context/LinkContext";
import Button from "../Button";
import AddLinks from "./AddLinks";
import CurrentLinks from "./CurrentLinks";
import NoLinks from "./NoLinks";

const Links = () => {
  const { links } = useLinks();
  const [hasLinks, setHasLinks] = useState(false);

  const form = useForm({
    defaultValues: {
      links: [],
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  useEffect(() => {
    links?.length || fields.length >= 1
      ? setHasLinks(true)
      : setHasLinks(false);
  }, [links, fields]);

  return (
    <div className="min-h-full flex-1 rounded-xl bg-white relative">
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
            className={"w-full justify-center text-md md:text-base"}
            onClick={() => {
              append();
              setHasLinks(true);
            }}
          >
            + Add new link
          </Button>
        </div>
        {hasLinks ? (
          <>
            <CurrentLinks links={links} />
            <AddLinks remove={remove} form={form} fields={fields} />
          </>
        ) : (
          <NoLinks />
        )}
      </div>
    </div>
  );
};

export default Links;
