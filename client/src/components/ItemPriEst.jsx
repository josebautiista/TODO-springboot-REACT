const ItemPriEst = ({ estado }) => {
  return (
    <li
      key={estado.id}
      className={`mb-2 flex justify-between items-center rounded p-4`}
      style={{
        backgroundColor: estado.color || "#fff",
        color: getContrastingTextColor(estado.color),
      }}
    >
      <div>{estado.nombre}</div>
      <div className="flex items-center space-x-2">
        <button
          className={`text-white hover:text-gray-200 focus:outline-none rounded-md p-2 bg-green-600`}
          onClick={() => openModalActualizar(estado)}
        >
          Actualizar
        </button>
        <button
          className={`text-white hover:text-gray-200 focus:outline-none rounded-md p-2 bg-red-600`}
          onClick={() => openModalDelete()}
        >
          Eliminar
        </button>
      </div>
      {modalDelete && (
        <ModalDelete
          id={estado.id}
          eliminar={eliminarEstado}
          cancelar={closeModalDelete}
          objeto={"este estado"}
        />
      )}
    </li>
  );
};

export default ItemPriEst;
