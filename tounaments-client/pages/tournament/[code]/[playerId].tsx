import Page from '@/layouts/Page';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

interface Player {
  id: string;
  name: string;
  lastTournamentWon: string;
  locationOfLastTournamentWon: string;
  dateOfLastTournamentWon: Date;
}

export default function Tournament({
  name,
  lastTournamentWon,
  dateOfLastTournamentWon,
  locationOfLastTournamentWon,
}: Player) {
  const [dateOfLastVictory, setDateOfLastVictory] = useState('');
  useEffect(() => {
    const date = new Date(dateOfLastTournamentWon).toDateString();
    setDateOfLastVictory(date);
  }, []);
  return (
    <Page>
      <Grid.Container gap={1} justify="center">
        <Grid xs={12} md={5} sm={7}>
          <Link href="/">
            <Text h6 size={15} color="gray">
              <IoIosArrowBack /> Back
            </Text>
          </Link>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={1} justify="center">
        <Grid xs={12} md={5} sm={7}>
          <Card variant="flat" isPressable>
            <Card.Body>
              <Row justify="space-between" align="center">
                <Text h6 size={15} color="gray">
                  Winner:
                </Text>
                <Text size={15} color="gray">
                  {name}
                </Text>
              </Row>
              <Row justify="space-between" align="center">
                <Text h6 size={15} color="gray">
                  Tourney:
                </Text>
                <Text size={15} color="gray">
                  {lastTournamentWon}
                </Text>
              </Row>
              <Row justify="space-between" align="center">
                <Text h6 size={15} color="gray">
                  Location:
                </Text>
                <Text size={15} color="gray">
                  {locationOfLastTournamentWon}
                </Text>
              </Row>
              <Row justify="space-between" align="center">
                <Text h6 size={15} color="gray">
                  Date of the last victory:
                </Text>
                <Text size={15} color="gray">
                  {dateOfLastVictory}
                </Text>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Page>
  );
}

export async function getStaticPaths() {
  const result = await fetch(`${process.env.API_URL}/tournaments`, {
    headers: {
      'auth-token': process.env.API_KEY,
    },
  } as any);
  const data = await result.json();
  const paths = data.map((item: any) => {
    return {
      params: { code: item.code, playerId: item.winnerId },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { code, playerId } = params;

  try {
    const result = await fetch(
      `${process.env.API_URL}/tournament-by-player/${code}/${playerId}`,
      {
        headers: {
          'auth-token': process.env.API_KEY,
        },
      } as any
    );
    const data = await result.json();
    return {
      props: {
        ...data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
