import List from '@/components/List';
import Page from '@/layouts/Page';
import { Grid } from '@nextui-org/react';

export default function Home({ items }: any) {
  return (
    <Page>
      <Grid.Container gap={1} justify="center">
        <Grid xs={12} md={5} sm={7}>
          <List items={items} />
        </Grid>
      </Grid.Container>
    </Page>
  );
}

export async function getStaticProps() {
  try {
    const result = await fetch(`${process.env.API_URL}/tournaments`, {
      headers: {
        'auth-token': process.env.API_KEY,
      },
    } as any);
    const data = await result.json();

    if (data?.error) throw new Error(data?.error);
    return {
      props: {
        items: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        items: [],
      },
    };
  }
}
