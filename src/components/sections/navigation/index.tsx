import { default as UserHorizontal } from './user/horizontal';
import { default as UserVertical } from './user/vertical';
import { default as GuestHorizontal } from './guest/horizontal';

const Navbar = {
  User: {
    Horizontal: UserHorizontal,
    Vertical: UserVertical
  },
  Guest: {
    Horizontal: GuestHorizontal
  }
};

export default Navbar;
