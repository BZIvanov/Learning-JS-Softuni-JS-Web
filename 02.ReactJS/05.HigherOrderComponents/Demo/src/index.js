import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const defaultTheme = {
  theme: 'light',
  changeTheme() {},
};
const {
  Consumer: ThemeConsumer,
  Provider: ThemeProvider,
} = React.createContext(defaultTheme);

const defaultLang = 'en';
const { Consumer: LangConsumer, Provider: LangProvider } = React.createContext(
  defaultLang
);

const userSettings = {};
const {
  Consumer: UserSettingsConsumer,
  Provider: UserSettingsProvider,
} = React.createContext(userSettings);

const Nav = ({ items = [], theme }) => (
  <nav className={theme}>
    {items.map((item) => (
      <a href="#" key={item.id}>
        {item.name}
      </a>
    ))}
  </nav>
);

const NavConsumer = (props) => (
  <ThemeConsumer>
    {(theme) => (
      <Nav {...props} theme={theme.theme} changeTheme={theme.changeTheme} />
    )}
  </ThemeConsumer>
);

const PhoneBook = ({ contacts = [], theme, lang, changeTheme }) => (
  <div
    className={theme}
    style={{ backgroundColor: theme === 'dark' ? 'darkblue' : 'lightblue' }}
  >
    {contacts.map((contact) => (
      <div key={contact.id}>
        <h4>Name: {contact.name}</h4>
        <h4>Telephone: {contact.tel}</h4>
      </div>
    ))}
    <button onClick={changeTheme}>Change theme</button>
  </div>
);

const PhoneBookConsumer = (props) => (
  <ThemeConsumer>
    {(theme) => (
      <LangConsumer>
        {(lang) => (
          <PhoneBook
            {...props}
            theme={theme.theme}
            changeTheme={theme.changeTheme}
            lang={lang}
          />
        )}
      </LangConsumer>
    )}
  </ThemeConsumer>
);

class App extends Component {
  state = {
    contacts: [
      { id: 'pesho', name: 'Pesho', tel: '08882313123' },
      { id: 'gosho', name: 'Gosho', tel: '08882334223' },
      { id: 'rosho', name: 'Rosho', tel: '08882346763' },
    ],
    items: [
      { id: 'home', name: 'Home' },
      { id: 'about', name: 'About' },
      { id: 'contact', name: 'Contact' },
    ],
    theme: 'light',
  };

  handleThemeChange = () => {
    this.setState({ theme: 'dark' });
  };

  componentDidMount() {
    const hours = new Date().getHours();

    if (hours > 18) {
      setTimeout(() => {
        this.setState({ theme: 'dark' });
      }, 5000);
    }
  }

  render() {
    const { items, contacts, theme } = this.state;
    const { lang } = this.props;

    return (
      <div>
        <LangProvider lang={lang}>
          <ThemeProvider value={{ theme, changeTheme: this.handleThemeChange }}>
            <header>
              <NavConsumer items={items} />
            </header>
            <PhoneBookConsumer contacts={contacts} />
          </ThemeProvider>
        </LangProvider>
        <button>Toggle theme</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App lang={window.language} />,
  document.getElementById('root')
);
