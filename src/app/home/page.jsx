import { dateTransform } from "@/utils/dateTransform";

async function getData() {
  const res = await fetch("http://localhost:3000/api/users");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function HomePage() {
  const { users } = await getData();

  return (
    <main className="bg-white">
      <table className="text-left border m-[1rem] text-sm font-light bg-white text-black">
      <thead className="border-b border-gray-200 bg-white font-medium shadow-sm">
          <tr className="border-b text-center">
            <th scope="col" className="px-6 py-4">
              Tabla de Usuarios
            </th>
          </tr>

          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              Id
            </th>
            <th scope="col" className="px-6 py-4">
              Email
            </th>
            <th scope="col" className="px-6 py-4">
              Creado
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            const isEven = index % 2 === 0;
            const bg = isEven ? "bg-white" : "bg-gray-50";

            return (
              <tr key={user._id} className={`${bg} border-b font-medium`}>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{user._id}</td>
                <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {dateTransform(user.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
