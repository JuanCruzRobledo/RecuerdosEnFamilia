import { useParams } from 'react-router-dom';

export default function Game() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Juego {id}</h1>
      <p className="mt-4 text-gray-600">Aquí se muestra la lógica del juego.</p>
    </div>
  );
}