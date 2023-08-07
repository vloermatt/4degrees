import {
  Card,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { Game } from "~/utils/types";

export default (): JSX.Element => {
  const rugbyAPIUsage = api.rugby.getAPIUsage.useQuery();
  const rugbyGames = api.rugby.getGames.useQuery({
    leagueID: "85",
    season: "2023",
  });
  let games: Game[] = [];
  let progress = 0;
  if (rugbyAPIUsage.data) {
    progress = rugbyAPIUsage.data;
  }
  if (rugbyGames.data) {
    games = rugbyGames.data.rugbyData;
  }
  return (
    <>
      <Center>
        <VStack>
          <Heading>Rugby</Heading>
          <Flex direction={"column"}>
            {games.map((game) => (
              <Card m={3} key={game.id} padding={5}>
                <Center width={"100%"}>
                  <VStack>
                    <HStack>
                      <Image
                        height={"50px"}
                        width={"50px"}
                        src={game.teams.home.logo}
                      />
                      <Heading>{`${game.teams.home.name} vs ${game.teams.away.name}`}</Heading>
                      <Image
                        height={"50px"}
                        width={"50px"}
                        src={game.teams.away.logo}
                      />
                    </HStack>
                    <Heading
                      fontSize={26}
                    >{`${game.scores.home} vs ${game.scores.away}`}</Heading>
                  </VStack>
                </Center>
              </Card>
            ))}
          </Flex>
        </VStack>
      </Center>
    </>
  );
};
