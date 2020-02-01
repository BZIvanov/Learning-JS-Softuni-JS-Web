function Nav(props) {
  const {className, children, replaceAll} = props;
  const navItems = replaceAll
    ? (children)
    : [<a href="/">Home</a>, children];

  return (
    <nav className={className}>
      {navItems}
    </nav>
  );
}

function Footer(props) {
  const footerClass = 'footer';
  const footerNavClass = `${footerClass}-navigation`;

  return (
    <footer>
      <Nav className={footerNavClass} />
    </footer>
  );
}

function Header(props) {
  const headerClass = 'header';
  const headerNavClass = `${headerClass}-navigation`;

  return (
    <header>
      <Nav className={headerNavClass} replaceAll={true}>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </Nav>
    </header>
  );
}

function HeaderAndFooter() {
  return (
    <Fragment>
      <Header />
      <Footer />
    </Fragment>
  );
}

function NavWithString(props) {
  const { items } = props;

  if (!items) {
    return null;
  }

  return (
    <nav>
      <ul>
        {items.map(item => <li><a href="#">{item}</a></li>)}
      </ul>
    </nav>
  );
}

ReactDOM.render(
    <NavWithString items={['Home', 'About', 'Contact']} />,
    document.getElementById('root')
);