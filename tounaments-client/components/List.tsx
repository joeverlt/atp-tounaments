import Item from './TournamentItem';
import { useEffect, useState } from 'react';
import { Grid } from '@nextui-org/react';
import { Pagination } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';

interface ListProps {
  items: any[];
}

export default function List({ items }: ListProps) {
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debounce = (callback: any, timeout: number = 500) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), timeout);
    };
  };

  const onChange = (
    page: number,
    filteredItems: any | undefined = undefined
  ) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    let paginated, pages;
    if (filteredItems) {
      paginated = filteredItems.slice(startIndex, endIndex);
      pages = Math.ceil(filteredItems.length / limit);
    } else {
      paginated = items.slice(startIndex, endIndex);
      pages = Math.ceil(items.length / limit);
    }

    setCurrentPage(page);
    setPaginatedItems(paginated as never[]);
    setTotalPages(pages);
  };

  const onInput = (event: any) => {
    const search = debounce((value: string) => {
      const filter = ({ tourney, winner }: any) => {
        return (
          tourney.toLowerCase().includes(value.toLowerCase()) ||
          winner.toLowerCase().includes(value.toLowerCase())
        );
      };

      if (value) onChange(1, items.filter(filter));
      else onChange(1, items);
    }, 1000);
    search(event.target.value);
  };

  useEffect(() => {
    onChange(1);
  }, []);

  return (
    <Grid.Container gap={1} justify="center">
      <Grid xs={12} css={{ mb: 8 }}>
        <Input
          clearable
          contentLeft={<CiSearch />}
          contentLeftStyling={false}
          css={{
            w: '100%',
            '& .nextui-input-content--left': {
              h: '100%',
              ml: '$4',
              dflex: 'center',
            },
          }}
          onInput={onInput}
          placeholder="Search..."
          aria-label="Search input"
        />
      </Grid>
      {paginatedItems.length > 0 &&
        paginatedItems.map((item: any) => (
          <Grid xs={12} key={item.code}>
            <Item data={item} />
          </Grid>
        ))}
      <Grid xs={12} css={{ mt: 8 }} justify="center">
        <Pagination
          loop
          noMargin
          size="md"
          siblings={1}
          total={totalPages}
          initialPage={currentPage}
          onChange={onChange}
        />
      </Grid>
    </Grid.Container>
  );
}
