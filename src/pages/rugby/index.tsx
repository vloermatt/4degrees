import {
  Button,
  Card,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { League } from "~/utils/types";

export default (): JSX.Element => {
  const toast = useToast();
  const leaguesQuery = api.rugby.getLeagues.useQuery({
    country: "World",
    season: "2023",
  });
  let leagues: League[] = [];
  if (leaguesQuery.data) {
    leagues = leaguesQuery.data;
  }
  useEffect(() => {
    if (leaguesQuery.error) {
      toast({
        title: "Error Fetching League Data",
        description: String(leaguesQuery.error),
        isClosable: true,
        position: "top-right",
      });
    }
  }, [leaguesQuery.error]);
  return (
    <Flex flexDirection={"column"} width={"100%"} padding={5}>
      <Flex marginBottom={5}>
        <Heading>World Rugby Leagues</Heading>
      </Flex>
      {leaguesQuery.isLoading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={3}>
          {leagues.map((league) => (
            <Card key={league.id} alignItems={"start"} margin={2} padding={5}>
              <Flex
                flexDirection={"row"}
                alignItems={"center"}
                height={"100%"}
                width="100%"
              >
                <Image height={"50px"} width={"50px"} src={league.logo} />
                <Heading fontSize={20}>{league.name}</Heading>
                <Text
                  marginLeft={"auto"}
                  alignSelf={"flex-start"}
                  right={"5%"}
                  fontWeight={600}
                >
                  {league.seasons[0]?.season}
                </Text>
              </Flex>
              <Button>Show more</Button>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};
