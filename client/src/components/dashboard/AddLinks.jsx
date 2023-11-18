import { useState } from "react";
import Toast from "../../Toast";
import Saved from "../../assets/images/icon-changes-saved.svg";
import { useLinks } from "../../context/LinkContext";
import { getToken } from "../../hooks/useAuth";
import Button from "../Button";
import LinkForm from "../LinkForm";

const AddLinks = ({ form, remove, fields }) => {
  const [success, setSuccess] = useState(false);
  const { revalidate } = useLinks();
  const token = getToken();

  const {
    handleSubmit,
    control,
    reset,
    formState: {
      isSubmitting,
      errors: { links },
    },
  } = form;

  const createLinks = async (links) => {
    try {
      await Promise.all(
        links.map(async (link) => {
          const response = await fetch("http://localhost:3000/api/links", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(link),
          });

          if (response.ok) {
            reset();
            await revalidate();
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 3000);
          }
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const newData = await Promise.all(
        data.links.map(async (link) => ({
          link: link.link,
          platform: link.platform,
        }))
      );

      await createLinks(newData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 mb-24  md:mb-20">
        {fields.map((link, index) => (
          <LinkForm
            key={link.id}
            control={control}
            remove={remove}
            index={index}
            errors={links}
          />
        ))}
      </div>
      <div className="md:absolute bottom-0 left-0 w-full">
        <span className="block w-full h-1 bg-gray-100" />
        <div className="px-6 py-3 flex w-full items-center justify-end">
          <Button variant="default" disabled={isSubmitting}>
            Save
          </Button>
        </div>
      </div>
      <Toast
        message={"Your changes have been successfully saved!"}
        show={success}
        icon={<img src={Saved} alt="saved" />}
      />
    </form>
  );
};

export default AddLinks;
