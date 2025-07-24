export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración - Llantas Bot</h1>
      <p className="text-lg">Bienvenido al panel de gestión multi-tenant para llanteras.</p>
      <p>Aquí podrás administrar clientes, inventarios y configuraciones del bot.</p>
      {/* TODO: Agregar componentes para lista de clientes, etc. */}
    </div>
  );
}