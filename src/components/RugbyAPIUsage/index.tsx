import { Card, Progress, Text } from "@chakra-ui/react";
import { colors } from "~/theme/styles";
import { api } from "~/utils/api";

export default (): JSX.Element => {
  const apiUsagequery = api.rugby.getAPIUsage.useQuery();
  let progress = 0;
  if (apiUsagequery.data) {
    progress = apiUsagequery.data;
  }
  return (
    <Card padding={2} backgroundColor={colors.secondary[600]} width={"100%"}>
      <Text>Rugby API Usage </Text>
      <Progress hasStripe value={progress} colorScheme="red" />
    </Card>
  );
};
