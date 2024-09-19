import prisma from "@/lib/db/prisma";

export default async function Page({ params }) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(params?.id),
    }
  });
  let name = user.name

  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}
