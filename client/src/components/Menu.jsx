import ItemMenu from "../atomos/ItemMenu";
import { Link } from "react-router-dom";
import { BiNotepad } from "react-icons/bi";
import { MdLowPriority } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Menu = () => {
  return (
    <div className=" w-1/6 bg-ripe-plum-900 text-ripe-plum-50 min-w-min box-border p-10 h-screen ">
      <div className=" mb-16">
        <h2 className="text-3xl font-bold font-cursive">QuickNotes</h2>
      </div>

      <div className="flex flex-col gap-4">
        <Link to="/">
          <ItemMenu title={"Notas"}>
            <BiNotepad size={20} />
          </ItemMenu>
        </Link>
        <Link to="/prioridad">
          <ItemMenu title={"Prioridades"}>
            <MdLowPriority size={20} />
          </ItemMenu>
        </Link>
        <Link to="/estados">
          <ItemMenu title={"Estados"}>
            <BsFillCheckCircleFill size={20} />
          </ItemMenu>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
