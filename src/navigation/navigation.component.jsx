import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CartIcon from '../components/cart-icon/cart-icon.component';
import CartDropdown from '../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as EljhLogo } from '../assets/crown.svg';
import './navigation.styles.scss'

import { UserContext } from '../contexts/user.context'
import {signOutUser} from '../utils/firebase/firebase.utils'

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <EljhLogo className='logo' />
                </Link>
                <div className='links-container'>

                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutUser}>
                                SIGN OUT
                            </span>
                        ) : (
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link>)
                    }
                    <CartIcon className='cart-icon-container' />
                </div>
              <CartDropdown/>
            </div>
            <Outlet />
        </Fragment>
    )
};

export default Navigation;