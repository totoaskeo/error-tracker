import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, DropdownItem, DropdownMenu, Dropdown, DropdownToggle } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { actionCreators } from '../store/Users';
import './NavMenu.css';
import { bindActionCreators } from 'redux';

class NavMenu extends React.Component {
  constructor (props) {
    super(props);
    autoBind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }

  toggleCollapse () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDropdown () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  logout () {
    localStorage.removeItem('user');
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
          <Container>
            <NavbarBrand tag={Link} to="/">ErrorTrackerApp</NavbarBrand>
            <NavbarToggler onClick={this.toggleCollapse} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
              {this.props.user.token ? ( // authorized navs
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">На главную</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/error-card">Создать ошибку</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/users">Просмотр пользователей</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/list">Просмотр ошибок</NavLink>
                  </NavItem>
                  <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle nav caret>{this.props.user.login}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag={Link} to={`/user/${this.props.user.id}`}>Профиль</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.logout}>Выйти</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ul>
              ) : ( // unauthorized navs
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">На главную</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/login-or-signup">Войти</NavLink>
                  </NavItem>
                </ul>
              )}
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(connect(
  state => ({ user: state.users.user }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(NavMenu));
