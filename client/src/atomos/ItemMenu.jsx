/* eslint-disable react/prop-types */
const ItemMenu = ({ title, children }) => {
  return (
    <div className="w-full py-2 px-5 hover:bg-ripe-plum-700 hover:cursor-pointer rounded-xl flex items-center justify-start gap-3">
      {children}
      <h3 className="text-xl">{title}</h3>
    </div>
  );
};

export default ItemMenu;
