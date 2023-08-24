import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default (): JSX.Element => {
  const router = useRouter();
  const getTallyBoardsQuery = api.tallyBoard.getTallyBoards.useQuery({});
  const handleRoute = (id: string) => {
    router.push(`/rugby/tally/board/${id}`);
  };
  return (
    <div>
      <h1>Tally Board</h1>
      <div className="m-auto grid w-screen grid-cols-10 gap-5 p-5">
        {getTallyBoardsQuery.data?.map((tallyBoard) => (
          <div
            onClick={() => {
              handleRoute(tallyBoard.id);
            }}
            className="cursor-pointer rounded-md bg-green-500 p-10"
          >
            <h1>{tallyBoard.id}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
