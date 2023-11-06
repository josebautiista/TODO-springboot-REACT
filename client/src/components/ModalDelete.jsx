/* eslint-disable react/prop-types */
const ModalDelete = ({ id, eliminar, cancelar, objeto }) => {
  console.log(id);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60">
      <div className="bg-white rounded shadow-lg p-8 w-64">
        <h2 className="text-xl font-bold mb-4 text-center text-black">
          Confirmación de eliminación
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          ¿Estás seguro de que deseas eliminar {objeto}?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => eliminar(id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Eliminar
          </button>
          <button
            onClick={cancelar}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
