import empty from "../../assets/images/illustration-empty.svg";

const NoLinks = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-gray-50 rounded-lg p-5 py-14">
      <img src={empty} alt="empty" />
      <div className="flex flex-col items-center justify-center gap-6">
        <p className="text-4xl font-bold">Let&apos;s get you started</p>
        <p className="max-w-[480px] text-center text-gray-500">
          Use the &quot;Add new link&quot; button to get started. Once you have
          more than one link, you can reorder and edit them. We&apos;re here to
          help you share your profiles with everyone!
        </p>
      </div>
    </div>
  );
};

export default NoLinks;
