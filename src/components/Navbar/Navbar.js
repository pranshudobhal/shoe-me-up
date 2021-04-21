import { NavbarDesktop } from './NavbarDesktop/NavbarDesktop';
import { NavbarMobile } from './NavbarMobile/NavbarMobile';

export function Navbar() {
  return (
    <>
      <NavbarMobile />
      <NavbarDesktop />
    </>
  );
}
