import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { getToken } from "../hooks/useAuth";

const UpdateInfo = ({ user, revalidate }) => {
  const [formError, setFormError] = useState(null);
  const token = getToken();

  const {
    handleSubmit,
    control,
    reset,
    formState: {
      errors: { firstname, lastname, email },
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      firstname: user?.firstname ? user.firstname : "",
      lastname: user?.lastname ? user.lastname : "",
      email: user?.email ? user.email : "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setFormError("");
      const response = await fetch("/api/profile/info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        await revalidate();
      }

      if (!response.ok) {
        setFormError("Error submitting form");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset({
      firstname: user?.firstname ? user.firstname : "",
      lastname: user?.lastname ? user.lastname : "",
      email: user?.email ? user.email : "",
    });
  }, [user, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 bg-gray-50 rounded-lg p-5 mb-20">
        <div className="flex justify-between lg:gap-44 md:flex-row flex-col">
          <label className="text-gray-500 flex-1 lg:flex-none md:text-base text-sm">
            First name*
          </label>

          <Input
            control={control}
            name={"firstname"}
            nolabel
            className={"w-full"}
            placeholder={"e.g. John"}
            type={"text"}
            error={firstname?.message}
          />
        </div>
        <div className="flex justify-between lg:gap-44 md:flex-row flex-col">
          <label className="text-gray-500 md:text-base lg:flex-none text-sm flex-1">
            Last name*
          </label>
          <Input
            control={control}
            name={"lastname"}
            nolabel
            placeholder={"e.g. Appleseed"}
            type={"text"}
            error={lastname?.message}
          />
        </div>
        <div className="flex justify-between lg:gap-[13.5rem] md:flex-row flex-col">
          <label className="text-gray-500 md:text-base lg:flex-none text-sm flex-1">
            Email
          </label>
          <Input
            control={control}
            name={"email"}
            nolabel
            placeholder={"e.g. alex@email.com"}
            type={"text"}
            error={email?.message}
          />
        </div>
        {formError && <p className="text-red-500 font-sm">{formError}</p>}
      </div>
      <div className="md:absolute bottom-0 left-0 w-full">
        <span className="block w-full h-1 bg-gray-100" />
        <div className="px-6 py-3 flex w-full items-center justify-end">
          <Button type={"submit"} variant="default" disabled={isSubmitting}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateInfo;
