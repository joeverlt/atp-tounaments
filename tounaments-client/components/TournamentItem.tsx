import Link from 'next/link';
import { Card, Text, Row, Col, Grid } from '@nextui-org/react';

interface ItemProps {
  data: any;
}

export default function Item({ data }: ItemProps) {
  return (
    <Grid.Container gap={0} justify="center">
      <Grid xs={8} css={{ m: 0 }}>
        <Card
          variant="flat"
          css={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Card.Body>
            <Text h6 size={15} color="gray" css={{ m: 0 }}>
              {data.code} {data.tourney}
            </Text>
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={4} css={{ m: 0 }}>
        <Card
          variant="flat"
          isPressable
          css={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            backgroundColor: '$gray700',
          }}
        >
          <Link href={`/tournament/${data.code}/${data.winnerId}`}>
            <Card.Body>
              <Row justify="flex-end" align="center">
                <Text
                  h6
                  size={15}
                  color="$gray100"
                  css={{ m: 0, textAlign: 'right' }}
                >
                  {data.winner}
                </Text>
              </Row>
            </Card.Body>
          </Link>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
