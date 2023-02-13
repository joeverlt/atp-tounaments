import { Navbar, Row, Text } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import { Switch, useTheme } from '@nextui-org/react';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

export default function NavigationBar() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  return (
    <Navbar variant="floating" isBordered>
      <Navbar.Brand>
        <Row justify="center" align="center">
          <Text b color="inherit">
            ATP
          </Text>
          <Text b color="gray">
            TOUNAMENTS
          </Text>
        </Row>
      </Navbar.Brand>
      <Navbar.Content>
        {type == 'dark' && <IoMdSunny />}
        {type == 'light' && <IoMdMoon />}
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
      </Navbar.Content>
    </Navbar>
  );
}
