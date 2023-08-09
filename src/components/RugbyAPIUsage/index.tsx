import { api } from "~/utils/api";
import { getBackgroundColor } from "./utils";

export default (): JSX.Element => {
  console.log("rendering api usage...");
  const apiUsagequery = api.rugby.getAPIUsage.useQuery();
  let progress = 0;
  if (apiUsagequery.data) {
    console.log("stuff");
    console.log(apiUsagequery.data);
    progress = apiUsagequery.data;
  }
  return (
    <div>
      <p>Rugby API Usage </p>

      <div className="h-2.5 w-full rounded-full bg-gray-200">
        <div
          className={`h-2.5 rounded-full`}
          style={{
            width: `${progress}%`,
            backgroundColor: getBackgroundColor(progress),
          }}
        />
      </div>
    </div>
  );
};
